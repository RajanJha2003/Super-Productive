import Sidebar from '@/components/sidebar/Sidebar'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex h-0 min-h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="relative p-4 md:p-6 lg:px-10 flex-grow flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-background">
              {children}
            </div>
          </div>
  )
}

export default layout