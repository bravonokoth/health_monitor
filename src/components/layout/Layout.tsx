
import React, { useState } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex pt-16">
        <div className="hidden lg:block lg:w-72 lg:flex-shrink-0">
          <Sidebar isOpen={true} onClose={() => {}} />
        </div>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
