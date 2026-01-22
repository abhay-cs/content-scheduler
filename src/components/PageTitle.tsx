"use client"
import { ReactNode } from "react"
import { useTheme } from "@/context/ThemeContext"
import { cn } from "@/lib/utils"

interface PageTitleProps {
  children: ReactNode
  description?: string
  action?: ReactNode
}

export function PageTitle({ children, description, action }: PageTitleProps) {
  const { darkMode } = useTheme()

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 pb-10">
      <div>
        <h2
          className={cn(
            "text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight mb-2",
            darkMode ? "text-white" : "text-gray-900"
          )}
        >
          {children}
        </h2>
        {description && (
          <p
            className={cn(
              "text-base sm:text-lg",
              darkMode ? "text-zinc-400" : "text-gray-600"
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
