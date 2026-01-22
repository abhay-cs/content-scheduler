// Settings page
"use client"
import { useTheme } from "@/context/ThemeContext";
import { PageHeader } from "@/components/PageHeader";
import { PageTitle } from "@/components/PageTitle";

export default function Settings() {
    const { darkMode } = useTheme();

    return (
        <div className="flex-1 flex flex-col min-h-screen">
            <PageHeader title="Settings" />

            <main className={`p-4 sm:p-8 flex-1 overflow-auto ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                <div className="max-w-4xl mx-auto">
                    <PageTitle description="Manage your account settings and preferences">
                        Settings
                    </PageTitle>
                </div>
            </main>
        </div>
    );
}