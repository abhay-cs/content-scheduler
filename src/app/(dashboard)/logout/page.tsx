// Logout page
"use client"
import { useTheme } from "@/context/ThemeContext";
import { PageHeader } from "@/components/PageHeader";
import { PageTitle } from "@/components/PageTitle";

export default function Logout() {
    const { darkMode } = useTheme();

    return (
        <div className="flex-1 flex flex-col min-h-screen">
            <PageHeader title="Logout" />

            <main className={`p-4 sm:p-8 flex-1 overflow-auto ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                <div className="max-w-4xl mx-auto">
                    <PageTitle description="You have been successfully logged out">
                        Logout
                    </PageTitle>
                </div>
            </main>
        </div>
    );
}