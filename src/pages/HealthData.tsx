
import React from 'react'
import { Heart, Thermometer, Activity, Droplets, TrendingUp, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { HealthChart } from '@/components/charts/HealthChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useHealthMetrics } from '@/hooks/useHealthMetrics'

const HealthData: React.FC = () => {
  const { metrics, loading, getLatestMetrics, getMetricsForPeriod, calculateAverages } = useHealthMetrics()
  
  const latestMetrics = getLatestMetrics()
  const last7Days = getMetricsForPeriod(7)
  const last30Days = getMetricsForPeriod(30)
  
  const weeklyAverages = calculateAverages(last7Days)
  const monthlyAverages = calculateAverages(last30Days)

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
      <div className="flex items-center space-x-3">
        <Heart className="h-8 w-8 text-cyan-600" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Health Data</h1>
      </div>

      {/* Current Metrics */}
      {latestMetrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-cyan-600" />
                <span>Current Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 7-Day Trends */}
      {last7Days.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-cyan-600" />
                <span>7-Day Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HealthChart
                data={last7Days}
                metrics={['heart_rate', 'blood_oxygen', 'temperature']}
                height={400}
              />
              {weeklyAverages && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Heart Rate</p>
                    <p className="text-2xl font-bold text-red-600">{weeklyAverages.heart_rate} bpm</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Blood Oxygen</p>
                    <p className="text-2xl font-bold text-blue-600">{weeklyAverages.blood_oxygen}%</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Temperature</p>
                    <p className="text-2xl font-bold text-yellow-600">{weeklyAverages.temperature}°C</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Monthly Averages */}
      {monthlyAverages && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-cyan-600" />
                <span>Monthly Averages</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-xl">
                  <Heart className="h-8 w-8 mx-auto text-red-600 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Heart Rate</p>
                  <p className="text-3xl font-bold text-red-600">{monthlyAverages.heart_rate}</p>
                  <p className="text-xs text-gray-500">bpm average</p>
                  <p className="text-xs text-gray-500 mt-1">Healthy: 60-100</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl">
                  <Droplets className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Blood Oxygen</p>
                  <p className="text-3xl font-bold text-blue-600">{monthlyAverages.blood_oxygen}</p>
                  <p className="text-xs text-gray-500">% average</p>
                  <p className="text-xs text-gray-500 mt-1">Healthy: 95-100%</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-xl">
                  <Thermometer className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Temperature</p>
                  <p className="text-3xl font-bold text-yellow-600">{monthlyAverages.temperature}</p>
                  <p className="text-xs text-gray-500">°C average</p>
                  <p className="text-xs text-gray-500 mt-1">Healthy: 36.1-37.2°C</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl">
                  <Activity className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Activity Level</p>
                  <p className="text-3xl font-bold text-green-600">{monthlyAverages.activity_level}</p>
                  <p className="text-xs text-gray-500">% average</p>
                  <p className="text-xs text-gray-500 mt-1">Healthy: 20-80%</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
                No Health Data Available
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Start collecting health metrics to see your trends and analytics here.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}

export default HealthData
