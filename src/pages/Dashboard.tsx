
import React from 'react'
import { Heart, Thermometer, Activity, Droplets } from 'lucide-react'
import { motion } from 'framer-motion'
import { WelcomeCard } from '@/components/dashboard/WelcomeCard'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { HealthChart } from '@/components/charts/HealthChart'
import { HealthTable } from '@/components/dashboard/HealthTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useHealthMetrics } from '@/hooks/useHealthMetrics'

const Dashboard: React.FC = () => {
  const { metrics, loading, getLatestMetrics } = useHealthMetrics()
  
  const latestMetrics = getLatestMetrics()
  const recentMetrics = metrics.slice(0, 24) // Last 24 readings

  const checkHealthy = (value: number, min: number, max: number) => {
    return value >= min && value <= max
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <WelcomeCard />

      {latestMetrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          <MetricCard
            title="Heart Rate"
            value={latestMetrics.heart_rate}
            unit="bpm"
            icon={Heart}
            healthyRange="60-100 bpm"
            isHealthy={checkHealthy(latestMetrics.heart_rate, 60, 100)}
          />
          <MetricCard
            title="Blood Oxygen"
            value={latestMetrics.blood_oxygen}
            unit="%"
            icon={Droplets}
            healthyRange="95-100%"
            isHealthy={checkHealthy(latestMetrics.blood_oxygen, 95, 100)}
          />
          <MetricCard
            title="Temperature"
            value={latestMetrics.temperature}
            unit="°C"
            icon={Thermometer}
            healthyRange="36.1-37.2°C"
            isHealthy={checkHealthy(latestMetrics.temperature, 36.1, 37.2)}
          />
          <MetricCard
            title="Activity Level"
            value={latestMetrics.activity_level}
            unit="%"
            icon={Activity}
            healthyRange="20-80%"
            isHealthy={checkHealthy(latestMetrics.activity_level, 20, 80)}
          />
        </motion.div>
      )}

      {recentMetrics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Health Trends (Last 24 Hours)</CardTitle>
            </CardHeader>
            <CardContent>
              <HealthChart
                data={recentMetrics}
                metrics={['heart_rate', 'blood_oxygen', 'temperature']}
                height={400}
              />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {metrics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <HealthTable metrics={metrics} />
        </motion.div>
      )}

      {metrics.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="text-center py-12">
              <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No Health Data Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Your health metrics will appear here once data starts being collected.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Dashboard
