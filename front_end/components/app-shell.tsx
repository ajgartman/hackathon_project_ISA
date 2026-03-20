"use client"

import { Sun } from "lucide-react"

interface AppShellProps {
  children: React.ReactNode
  title?: string
  showBottomBar?: boolean
  bottomBarContent?: React.ReactNode
}

export function AppShell({ 
  children, 
  title = "S. Scholar", 
  showBottomBar = false,
  bottomBarContent 
}: AppShellProps) {
  const now = new Date()
  const timeString = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'short'
  })

  return (
    <div className="flex flex-col h-screen border border-foreground m-2.5 bg-background">
      {/* Top Bar */}
      <header className="grid grid-cols-2 border-b border-foreground h-10">
        <div className="flex items-center px-4 border-r border-foreground font-semibold text-xs">
          {title}
        </div>
        <div className="flex items-center justify-end px-4 gap-2 text-[10px] font-semibold">
          <Sun className="w-3 h-3" />
          {timeString}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      {/* Bottom Bar */}
      {showBottomBar && (
        <footer className="border-t border-foreground h-[50px] bg-background z-10">
          {bottomBarContent}
        </footer>
      )}
    </div>
  )
}
