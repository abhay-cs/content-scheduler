// Contents page
"use client"
import { useState } from "react";
import Image from "next/image";
import {
    Menu as Bars3Icon,
    Sun,
    Moon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Contents() {
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
                        Content Library
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
                <div className="max-w-4xl mx-auto">
                    <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Content Library</h2>
                    <p className={`${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>This is where you can manage your content library.</p>
                </div>
            </main>
        </div>
    );
}