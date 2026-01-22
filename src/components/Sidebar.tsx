"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "@/context/ThemeContext"
import { useSidebar } from "@/context/SidebarContext"
import {
  Settings as Cog8ToothIcon,
  LogOut as ArrowRightOnRectangleIcon,
  BarChart as ChartBarIcon,
  Calendar,
  Video,
  Gauge,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/contents", label: "Content Library", icon: Video },
  { href: "/scheduler", label: "Schedule", icon: Calendar },
  { href: "/analytics", label: "Analytics", icon: ChartBarIcon },
]

const footerItems = [
  { href: "/settings", label: "Settings", icon: Cog8ToothIcon },
  { href: "/logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
]

function NavLink({ href, label, icon: Icon, darkMode, pathname, onClick }: {
  href: string
  label: string
  icon: any
  darkMode: boolean
  pathname: string | null
  onClick?: () => void
}) {
  const isActive = pathname === href
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex h-12 items-center gap-4 px-4 rounded-lg transition-colors",
        isActive
          ? darkMode
            ? "bg-blue-500/20 text-white"
            : "bg-blue-500/30 text-gray-900"
          : darkMode
            ? "text-zinc-300 hover:bg-white/10 hover:text-white"
            : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
      )}
    >
      <Icon
        className={cn(
          "h-6 w-6",
          isActive
            ? darkMode
              ? "text-blue-500"
              : "text-blue-600"
            : darkMode
              ? "text-zinc-400"
              : "text-gray-500"
        )}
      />
      <span>{label}</span>
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const { darkMode } = useTheme()
  const { open, setOpen } = useSidebar()

  const handleLinkClick = () => {
    setOpen(false) // Close mobile sidebar on navigation
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-10",
          "p-4 gap-4 border-r h-full",
          darkMode
            ? "bg-[#111111] border-white/10"
            : "bg-gray-100 border-gray-200"
        )}
      >
        <div className="flex items-center gap-2 px-4 pb-2 pt-4">
          <Image
            src="/timeline.png"
            width={28}
            height={28}
            alt="Picture of the author"
          />
          <p
            className={cn(
              "text-xl font-semibold tracking-tight",
              darkMode ? "text-white" : "text-gray-900"
            )}
          >
            StreamFlow
          </p>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              darkMode={darkMode}
              pathname={pathname}
            />
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          {footerItems.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              darkMode={darkMode}
              pathname={pathname}
            />
          ))}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50",
          "p-4 shadow-xl transform transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          darkMode ? "bg-[#111111] border-white/10" : "bg-white border-gray-200"
        )}
      >
        <div className="flex items-center justify-between px-4 pb-2 pt-4 mb-4">
          <Image
            src="/timeline.png"
            width={28}
            height={28}
            alt="Picture of the author"
          />
          <p
            className={cn(
              "text-xl font-semibold tracking-tight",
              darkMode ? "text-white" : "text-gray-900"
            )}
          >
            StreamFlow
          </p>
          <button
            onClick={() => setOpen(false)}
            className={cn(
              "p-1 rounded-lg",
              darkMode
                ? "hover:bg-white/10 text-zinc-400"
                : "hover:bg-gray-100 text-gray-500"
            )}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              darkMode={darkMode}
              pathname={pathname}
              onClick={handleLinkClick}
            />
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4 pt-4">
          {footerItems.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              darkMode={darkMode}
              pathname={pathname}
              onClick={handleLinkClick}
            />
          ))}
        </div>
      </aside>
    </>
  )
}
