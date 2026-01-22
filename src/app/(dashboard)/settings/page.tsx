// Settings page
"use client"
import { useTheme } from "@/context/ThemeContext";
import { PageHeader } from "@/components/PageHeader";
import { PageTitle } from "@/components/PageTitle";
import { Moon, Sun, Bell, User, Shield, Palette } from "lucide-react";

export default function Settings() {
    const { darkMode, setDarkMode } = useTheme();

    const SettingCard = ({ 
        icon, 
        title, 
        description, 
        children 
    }: { 
        icon: React.ReactNode
        title: string
        description: string
        children: React.ReactNode 
    }) => (
        <div className={`p-5 rounded-xl border ${darkMode ? 'bg-[#1a1a1a]/80 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-white'}`}>
                        {icon}
                    </div>
                    <div>
                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{description}</p>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    {children}
                </div>
            </div>
        </div>
    );

    const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
        <button
            onClick={onChange}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                enabled ? 'bg-blue-500' : darkMode ? 'bg-white/20' : 'bg-gray-300'
            }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    );

    return (
        <div className="flex-1 flex flex-col min-h-screen">
            <PageHeader title="Settings" />

            <main className={`p-4 sm:p-8 flex-1 overflow-auto ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                <div className="max-w-2xl mx-auto">
                    <PageTitle description="Manage your account settings and preferences">
                        Settings
                    </PageTitle>

                    <div className="space-y-4">
                        {/* Appearance */}
                        <div className="mb-6">
                            <h2 className={`text-sm font-medium uppercase tracking-wider mb-3 ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                                Appearance
                            </h2>
                            <SettingCard
                                icon={darkMode ? <Moon className="h-5 w-5 text-blue-400" /> : <Sun className="h-5 w-5 text-amber-500" />}
                                title="Dark Mode"
                                description="Switch between light and dark themes"
                            >
                                <Toggle enabled={darkMode} onChange={() => setDarkMode(!darkMode)} />
                            </SettingCard>
                        </div>

                        {/* Notifications */}
                        <div className="mb-6">
                            <h2 className={`text-sm font-medium uppercase tracking-wider mb-3 ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                                Notifications
                            </h2>
                            <div className="space-y-3">
                                <SettingCard
                                    icon={<Bell className="h-5 w-5 text-purple-400" />}
                                    title="Push Notifications"
                                    description="Receive notifications for scheduled content"
                                >
                                    <Toggle enabled={true} onChange={() => {}} />
                                </SettingCard>
                            </div>
                        </div>

                        {/* Account */}
                        <div className="mb-6">
                            <h2 className={`text-sm font-medium uppercase tracking-wider mb-3 ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                                Account
                            </h2>
                            <div className="space-y-3">
                                <SettingCard
                                    icon={<User className="h-5 w-5 text-emerald-400" />}
                                    title="Profile"
                                    description="Manage your profile information"
                                >
                                    <button className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                                        darkMode 
                                            ? 'bg-white/10 text-white hover:bg-white/20' 
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}>
                                        Edit
                                    </button>
                                </SettingCard>
                                <SettingCard
                                    icon={<Shield className="h-5 w-5 text-red-400" />}
                                    title="Security"
                                    description="Password and authentication settings"
                                >
                                    <button className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                                        darkMode 
                                            ? 'bg-white/10 text-white hover:bg-white/20' 
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}>
                                        Manage
                                    </button>
                                </SettingCard>
                            </div>
                        </div>

                        {/* App Info */}
                        <div className={`mt-8 pt-6 border-t text-center ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Palette className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>StreamFlow</span>
                            </div>
                            <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                                Version 1.0.0
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}