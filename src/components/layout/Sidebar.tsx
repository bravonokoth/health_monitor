
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Heart, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Health Data', href: '/health-data', icon: Heart },
  { name: 'Profile', href: '/profile', icon: User },
]

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation()

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-r border-gray-200 dark:border-gray-700",
          "lg:translate-x-0 lg:static lg:inset-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                HealthMonitor
              </span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 p-6">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.href
                const Icon = item.icon

                return (
                  <motion.li key={item.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      <Icon className={cn("h-5 w-5", isActive && "text-cyan-600 dark:text-cyan-400")} />
                      <span>{item.name}</span>
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
          </nav>
        </div>
      </motion.aside>
    </>
  )
}
