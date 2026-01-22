"use client";
import { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
	children,
}: {
	children: ReactNode;
}) {
	const { darkMode } = useTheme();

	return (
		<div className="flex min-h-screen font-sans">
			<SidebarProvider>
				<Sidebar />
				{/* Main content - accounts for sidebar width */}
				<div className={`flex-1 lg:ml-64 ${darkMode ? 'bg-[#0a0a0a] text-zinc-200' : 'bg-white text-zinc-800'}`}>
					{children}
				</div>
			</SidebarProvider>
		</div>
	);
}