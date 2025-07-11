
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: number | string
  unit: string
  icon: LucideIcon
  trend?: 'up' | 'down' | 'stable'
  healthyRange?: string
  isHealthy?: boolean
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  healthyRange,
  isHealthy
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-500'
      case 'down': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="relative overflow-hidden bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {title}
          </CardTitle>
          <Icon className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {unit}
            </div>
          </div>
          {healthyRange && (
            <div className="mt-2 flex items-center justify-between">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Healthy: {healthyRange}
              </div>
              {isHealthy !== undefined && (
                <Badge 
                  variant={isHealthy ? "default" : "destructive"}
                  className="text-xs"
                >
                  {isHealthy ? "Normal" : "Alert"}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
