
import { useEffect, useState } from 'react'
import { supabase, HealthMetric } from '@/lib/supabase'
import { useAuth } from './useAuth'

export const useHealthMetrics = () => {
  const [metrics, setMetrics] = useState<HealthMetric[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const fetchMetrics = async () => {
      const { data, error } = await supabase
        .from('health_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(100)

      if (!error && data) {
        setMetrics(data)
      }
      setLoading(false)
    }

    fetchMetrics()

    // Set up real-time subscription
    const subscription = supabase
      .channel('health_metrics')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'health_metrics',
          filter: `user_id=eq.${user.id}`
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMetrics(prev => [payload.new as HealthMetric, ...prev.slice(0, 99)])
          } else if (payload.eventType === 'UPDATE') {
            setMetrics(prev => prev.map(metric => 
              metric.id === payload.new.id ? payload.new as HealthMetric : metric
            ))
          } else if (payload.eventType === 'DELETE') {
            setMetrics(prev => prev.filter(metric => metric.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [user])

  const getLatestMetrics = () => {
    return metrics[0] || null
  }

  const getMetricsForPeriod = (days: number) => {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    
    return metrics.filter(metric => 
      new Date(metric.timestamp) >= cutoffDate
    )
  }

  const calculateAverages = (data: HealthMetric[]) => {
    if (data.length === 0) return null
    
    return {
      heart_rate: Math.round(data.reduce((sum, m) => sum + m.heart_rate, 0) / data.length),
      blood_oxygen: Math.round(data.reduce((sum, m) => sum + m.blood_oxygen, 0) / data.length),
      temperature: Number((data.reduce((sum, m) => sum + m.temperature, 0) / data.length).toFixed(1)),
      activity_level: Math.round(data.reduce((sum, m) => sum + m.activity_level, 0) / data.length)
    }
  }

  return {
    metrics,
    loading,
    getLatestMetrics,
    getMetricsForPeriod,
    calculateAverages
  }
}
