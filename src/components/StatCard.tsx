"use client"
import { ReactNode } from "react"
import { useTheme } from "@/context/ThemeContext"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  change?: string
  changeClass?: string
}

export function StatCard({
  title,
  value,
  icon,
  change,
  changeClass = "text-zinc-400",
}: StatCardProps) {
  const { darkMode } = useTheme()

  return (
    <div
      className={cn(
        "flex flex-col gap-3 p-6 rounded-xl border transition-all duration-300",
        "hover:shadow-xl hover:-translate-y-0.5",
        darkMode
          ? "bg-[#1a1a1a]/80 backdrop-blur-xl border-white/10 hover:border-white/20"
          : "bg-gray-50 backdrop-blur-xl border-gray-200 hover:border-gray-300"
      )}
    >
      <div className="flex items-center justify-between">
        <p
          className={cn(
            "text-sm font-medium",
            darkMode ? "text-zinc-400" : "text-gray-500"
          )}
        >
          {title}
        </p>
        {icon && (
          <div className={cn(darkMode ? "text-zinc-400" : "text-gray-500")}>
            {icon}
          </div>
        )}
      </div>
      <p
        className={cn(
          "text-2xl font-semibold leading-tight font-mono tabular-nums",
          darkMode ? "text-white" : "text-gray-900"
        )}
      >
        {value}
      </p>
      {change && (
        <p className={cn(`${changeClass} text-sm font-medium leading-tight`)}>
          {change}
        </p>
      )}
    </div>
  )
}
