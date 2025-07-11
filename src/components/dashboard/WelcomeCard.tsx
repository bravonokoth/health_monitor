
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'

export const WelcomeCard: React.FC = () => {
  const { user } = useAuth()
  
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'
  const currentHour = new Date().getHours()
  
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning'
    if (currentHour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 border-0 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <CardContent className="relative p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {getGreeting()}, {userName}!
              </h1>
              <p className="text-cyan-100 text-lg">
                Here's your health overview for today
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💙</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
