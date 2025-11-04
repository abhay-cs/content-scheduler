// pages/index.tsx
"use client"
import { useState } from "react";
import Image from "next/image";
import {
    Menu as Bars3Icon,
    ChevronDown,
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
import { useTheme } from "@/context/ThemeContext";

const stats = [
    {
        id: 1,
        title: "Total Ads Scheduled",
        value: "124",
        icon: <Megaphone className="h-6 w-6 text-zinc-400" />,
        change: "+5.2% vs last month",
        changeClass: "text-emerald-500",
    },
    {
        id: 2,
        title: "Top Performing Content",
        value: "Big Game Highlights",
        icon: <ChartBarIcon className="h-6 w-6 text-zinc-400" />,
        change: "+12% engagement",
        changeClass: "text-emerald-500",
    },
    {
        id: 3,
        title: "Audience Engagement",
        value: "82%",
        icon: <User className="h-6 w-6 text-zinc-400" />,
        change: "-1.5% vs last week",
        changeClass: "text-red-500",
    },
    {
        id: 4,
        title: "Upcoming Content",
        value: "Trivia Night Promo",
        icon: <Calendar className="h-6 w-6 text-zinc-400" />,
        change: "Today at 7:00 PM",
        changeClass: "text-zinc-400",
    },
];

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <div className="flex-1 flex flex-col min-h-screen">
            {/* Header */}
            <header className={`sticky top-0 z-10 flex h-16 items-center justify-between ${darkMode ? 'border-white/10 bg-[#0a0a0a]/80 text-white' : 'border-gray-200 bg-white/80 text-gray-900'} border px-4 backdrop-blur-xl sm:px-6`}>
                <div className="flex items-center gap-4">
                    <button
                        className={`lg:hidden flex items-center justify-center ${darkMode ? 'text-white' : 'text-gray-900'}`}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Toggle menu"
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                    <h1 className={`text-lg font-semibold leading-tight tracking-tight flex-1`}>
                        Dashboard
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        className={`flex h-10 w-10 items-center justify-center bg-transparent ${darkMode ? 'text-white' : 'text-gray-900'}`}
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
                        <Image
                            src="file.svg"
                            alt="User avatar"
                            width={40}
                            height={40}
                            className="object-cover"
                        />
                        <div className="hidden sm:flex flex-col">
                            <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Alex Morgan
                            </span>
                            <span className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                                Manager
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <main className={`p-4 sm:p-8 flex-1 overflow-auto ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                {/* Header Section */}
                <div className="flex flex-wrap items-center justify-between gap-6 pb-10">
                    <h2 className={`text-[24px] sm:text-[32px] font-semibold leading-[1.3] text-left ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Welcome back, Alex!
                    </h2>
                    <button className="flex min-w-[84px] max-w-[480px] items-center justify-center h-10 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white gap-2 text-sm font-semibold tracking-wide hover:opacity-90 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transform hover:-translate-y-0.5">
                        <Plus className="h-5 w-5" />
                        <span className="truncate">Schedule New Content</span>
                    </button>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map(({ id, title, value, icon, change, changeClass }) => (
                        <div
                            key={id}
                            className={`flex flex-col gap-3 p-6 ${darkMode ? 'bg-[#1a1a1a]/80 backdrop-blur-xl border-white/10' : 'bg-gray-50 backdrop-blur-xl border-gray-200'} border shadow-lg hover:shadow-xl hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5`}
                        >
                            <div className="flex items-center justify-between">
                                <p className={`text-[14px] font-medium ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                                    {title}
                                </p>
                                {icon}
                            </div>
                            <p className={`text-[24px] font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} leading-[1.4] font-mono tabular-nums`}>
                                {value}
                            </p>
                            <p className={`${changeClass} text-[14px] font-medium leading-[1.5]`}>
                                {change}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Data Visualization Section */}
                <section className={`mt-10 border ${darkMode ? 'border-white/10 bg-[#1a1a1a]/80' : 'border-gray-200 bg-gray-50'} backdrop-blur-xl p-6 shadow-lg`}>
                    <h3 className={`text-[20px] font-semibold leading-[1.4] ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Weekly Engagement Trends
                    </h3>
                    <p className={`text-[14px] ${darkMode ? 'text-zinc-400' : 'text-gray-500'} mb-6`}>
                        Audience engagement over the past 7 days.
                    </p>
                    <div className={`h-72 w-full ${darkMode ? 'bg-[#222222]' : 'bg-gray-100'} flex items-center justify-center`}>
                        <p className={`${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Chart visualization will go here</p>
                    </div>
                </section>
            </main>
        </div>
    );
}
