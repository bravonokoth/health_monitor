
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { HealthMetric } from '@/lib/supabase'
import { format } from 'date-fns'

interface HealthChartProps {
  data: HealthMetric[]
  metrics: ('heart_rate' | 'blood_oxygen' | 'temperature')[]
  height?: number
}

export const HealthChart: React.FC<HealthChartProps> = ({ 
  data, 
  metrics, 
  height = 300 
}) => {
  const chartData = data
    .slice()
    .reverse()
    .map(item => ({
      ...item,
      time: format(new Date(item.timestamp), 'MMM dd HH:mm')
    }))

  const colors = {
    heart_rate: '#ef4444',
    blood_oxygen: '#3b82f6',
    temperature: '#f59e0b'
  }

  const names = {
    heart_rate: 'Heart Rate (bpm)',
    blood_oxygen: 'Blood Oxygen (%)',
    temperature: 'Temperature (°C)'
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="time" 
          className="text-xs"
          tick={{ fontSize: 12 }}
        />
        <YAxis className="text-xs" tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Legend />
        {metrics.map(metric => (
          <Line
            key={metric}
            type="monotone"
            dataKey={metric}
            stroke={colors[metric]}
            strokeWidth={2}
            dot={{ fill: colors[metric], strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: colors[metric], strokeWidth: 2 }}
            name={names[metric]}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
