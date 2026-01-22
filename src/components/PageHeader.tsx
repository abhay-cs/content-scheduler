"use client"
import { Menu, Sun, Moon, User } from "lucide-react"
import { useTheme } from "@/context/ThemeContext"
import { useSidebar } from "@/context/SidebarContext"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
}

export function PageHeader({ title }: PageHeaderProps) {
  const { toggle } = useSidebar()
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex h-16 items-center justify-between border px-4 backdrop-blur-xl sm:px-6",
        darkMode
          ? "border-white/10 bg-[#0a0a0a]/80 text-white"
          : "border-gray-200 bg-white/80 text-gray-900"
      )}
    >
      <div className="flex items-center gap-4">
        <button
          className={cn(
            "lg:hidden flex items-center justify-center",
            darkMode ? "text-white" : "text-gray-900"
          )}
          onClick={toggle}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold leading-tight tracking-tight flex-1">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          className={cn(
            "flex h-10 w-10 items-center justify-center bg-transparent rounded-lg transition-colors",
            darkMode
              ? "text-white hover:bg-white/10"
              : "text-gray-900 hover:bg-gray-100"
          )}
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
        </button>
        <div className="flex items-center gap-3">
          <User
            className={cn(
              "h-8 w-8",
              darkMode ? "text-zinc-400" : "text-gray-500"
            )}
          />
          <div className="hidden sm:flex flex-col">
            <span
              className={cn(
                "text-sm font-semibold",
                darkMode ? "text-white" : "text-gray-900"
              )}
            >
              Alex Morgan
            </span>
            <span
              className={cn(
                "text-xs",
                darkMode ? "text-zinc-400" : "text-gray-500"
              )}
            >
              Manager
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
