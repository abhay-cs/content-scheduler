"use client";
import { ReactNode } from "react";
import { 
  Settings as Cog8ToothIcon, 
  LogOut as ArrowRightOnRectangleIcon, 
  BarChart as ChartBarIcon, 
  Calendar, 
  Video, 
  Megaphone, 
  User, 
  Plus, 
  Sun, 
  Moon, 
  Gauge 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { darkMode } = useTheme();

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-[#0a0a0a] text-zinc-200' : 'bg-white text-zinc-800'} font-sans`}>
      {/* Sidebar */}
      <aside className={`hidden lg:flex sticky top-0 flex-col w-64 ${darkMode ? 'bg-[#111111] border-white/10' : 'bg-gray-100 border-gray-200'} p-4 gap-4 border`}>
        <div className="flex items-center gap-2 px-4 pb-2 pt-4">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`text-blue-500 text-3xl ${darkMode ? '' : 'text-blue-600'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            width={24}
            height={24}
          >
            <path strokeLinecap="square" strokeLinejoin="square" d="M14.752 11.168l-6.518-3.759A1 1 0 007 8.348v7.304a1 1 0 001.234.97l6.518-1.888a1 1 0 00.75-.97v-3.588a1 1 0 00-.75-.97z" />
          </svg> */}
          <p className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
            StreamFlow
          </p>
        </div>
        <nav className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className={`flex h-12 items-center gap-4 px-4 font-semibold ${
              pathname === '/dashboard' 
                ? (darkMode ? 'bg-blue-500/20 text-white' : 'bg-blue-500/30 text-gray-900') 
                : (darkMode ? 'text-zinc-300 hover:bg-white/10 hover:text-white' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900') + ' transition-colors'
            }`}
          >
            <Gauge className={pathname === '/dashboard' ? (darkMode ? 'h-6 w-6 text-blue-500' : 'h-6 w-6 text-blue-600') : (darkMode ? 'h-6 w-6 text-zinc-400' : 'h-6 w-6 text-gray-500')} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/contents"
            className={`flex h-12 items-center gap-4 px-4 ${
              pathname === '/contents' 
                ? (darkMode ? 'bg-blue-500/20 text-white' : 'bg-blue-500/30 text-gray-900') 
                : (darkMode ? 'text-zinc-300 hover:bg-white/10 hover:text-white' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900') + ' transition-colors'
            }`}
          >
            <Video className={pathname === '/contents' ? (darkMode ? 'h-6 w-6 text-blue-500' : 'h-6 w-6 text-blue-600') : (darkMode ? 'h-6 w-6 text-zinc-400' : 'h-6 w-6 text-gray-500')} />
            <span>Content Library</span>
          </Link>
          <Link
            href="/scheduler"
            className={`flex h-12 items-center gap-4 px-4 ${
              pathname === '/scheduler' 
                ? (darkMode ? 'bg-blue-500/20 text-white' : 'bg-blue-500/30 text-gray-900') 
                : (darkMode ? 'text-zinc-300 hover:bg-white/10 hover:text-white' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900') + ' transition-colors'
            }`}
          >
            <Calendar className={pathname === '/scheduler' ? (darkMode ? 'h-6 w-6 text-blue-500' : 'h-6 w-6 text-blue-600') : (darkMode ? 'h-6 w-6 text-zinc-400' : 'h-6 w-6 text-gray-500')} />
            <span>Schedule</span>
          </Link>
          <Link
            href="/analytics"
            className={`flex h-12 items-center gap-4 px-4 ${
              pathname === '/analytics' 
                ? (darkMode ? 'bg-blue-500/20 text-white' : 'bg-blue-500/30 text-gray-900') 
                : (darkMode ? 'text-zinc-300 hover:bg-white/10 hover:text-white' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900') + ' transition-colors'
            }`}
          >
            <ChartBarIcon className={pathname === '/analytics' ? (darkMode ? 'h-6 w-6 text-blue-500' : 'h-6 w-6 text-blue-600') : (darkMode ? 'h-6 w-6 text-zinc-400' : 'h-6 w-6 text-gray-500')} />
            <span>Analytics</span>
          </Link>
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          <Link
            href="/settings"
            className={`flex h-12 items-center gap-4 px-4 ${(darkMode ? 'text-zinc-300 hover:bg-white/10 hover:text-white' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900') + ' transition-colors'}`}
          >
            <Cog8ToothIcon className={darkMode ? 'h-6 w-6 text-zinc-400' : 'h-6 w-6 text-gray-500'} />
            <span>Settings</span>
          </Link>
          <Link
            href="/logout"
            className={`flex h-12 items-center gap-4 px-4 ${(darkMode ? 'text-zinc-300 hover:bg-white/10 hover:text-white' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900') + ' transition-colors'}`}
          >
            <ArrowRightOnRectangleIcon className={darkMode ? 'h-6 w-6 text-zinc-400' : 'h-6 w-6 text-gray-500'} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main content - This will render the child page */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}