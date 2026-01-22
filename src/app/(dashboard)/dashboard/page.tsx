"use client"
import { useState, useEffect } from "react"
import {
	BarChart as ChartBarIcon,
	Calendar,
	Megaphone,
	User,
} from "lucide-react"
import { useTheme } from "@/context/ThemeContext"
import { PageHeader } from "@/components/PageHeader"
import { PageTitle } from "@/components/PageTitle"
import { StatCard } from "@/components/StatCard"
import { getAnalytics } from "@/app/(dashboard)/analytics/actions"
import { getSchedules } from "@/app/(dashboard)/scheduler/actions"
import { cn } from "@/lib/utils"

export default function Dashboard() {
	const { darkMode } = useTheme()
	const [stats, setStats] = useState<any[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadDashboardData = async () => {
			try {
				const analytics = await getAnalytics()
				const schedules = await getSchedules()

				// Get most scheduled content type
				const typeCounts: Record<string, number> = {}
				schedules.forEach((s: any) => {
					const type = s.content?.type || "unknown"
					typeCounts[type] = (typeCounts[type] || 0) + 1
				})
				const topType = Object.entries(typeCounts)
					.sort(([, a], [, b]) => b - a)[0]?.[0] || "ad"
				const topTypeCount = typeCounts[topType] || 0

				// Get most scheduled content item
				const contentCounts: Record<string, { title: string; count: number }> = {}
				schedules.forEach((s: any) => {
					const title = s.content?.title || "Unknown"
					contentCounts[title] = {
						title,
						count: (contentCounts[title]?.count || 0) + 1,
					}
				})
				const topContent = Object.values(contentCounts)
					.sort((a, b) => b.count - a.count)[0]?.title || "No content scheduled"

				// Get today's day name
				const today = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
				const todaySchedules = schedules.filter((s: any) => s.day === today)
				const nextSchedule = todaySchedules.length > 0
					? todaySchedules[0]
					: schedules.find((s: any) => {
							const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
							const todayIndex = days.indexOf(today)
							return days.slice(todayIndex + 1).includes(s.day)
						})

				// Calculate average engagement (mock calculation based on coverage)
				const avgCoverage = analytics.coverageByDay.reduce((sum: number, day: any) => sum + day.percentage, 0) / 7
				const mockEngagement = Math.round(60 + (avgCoverage * 0.3)) // 60-90% range

				// Format next schedule time
				let nextScheduleText = "No upcoming schedules"
				if (nextSchedule) {
					const startTime = nextSchedule.start_time
					const [hours, mins] = startTime.split(":")
					const hour = parseInt(hours)
					const ampm = hour >= 12 ? "PM" : "AM"
					const displayHour = hour % 12 === 0 ? 12 : hour % 12
					nextScheduleText = `${nextSchedule.content?.title || "Content"} at ${displayHour}:${mins} ${ampm}`
				}

				setStats([
					{
						id: 1,
						title: "Total Schedules",
						value: analytics.totalSchedules.toString(),
						icon: <Megaphone className="h-6 w-6" />,
						change: `${topTypeCount} ${topType}s this week`,
						changeClass: "text-emerald-500",
					},
					{
						id: 2,
						title: "Most Scheduled",
						value: topContent.length > 20 ? topContent.substring(0, 20) + "..." : topContent,
						icon: <ChartBarIcon className="h-6 w-6" />,
						change: `${contentCounts[topContent]?.count || 0} times scheduled`,
						changeClass: "text-emerald-500",
					},
					{
						id: 3,
						title: "Avg. Coverage",
						value: `${Math.round(avgCoverage)}%`,
						icon: <User className="h-6 w-6" />,
						change: `${analytics.coverageByDay.filter((d: any) => d.percentage > 50).length} days >50%`,
						changeClass: avgCoverage > 60 ? "text-emerald-500" : "text-amber-500",
					},
					{
						id: 4,
						title: "Next Schedule",
						value: nextSchedule?.content?.title?.substring(0, 20) || "None",
						icon: <Calendar className="h-6 w-6" />,
						change: nextScheduleText,
						changeClass: "text-zinc-400",
					},
				])
			} catch (error) {
				console.error("Failed to load dashboard data:", error)
				// Fallback to empty stats
				setStats([])
			} finally {
				setLoading(false)
			}
		}

		loadDashboardData()
	}, [])

	return (
		<div className="flex-1 flex flex-col min-h-screen">
			<PageHeader title="Dashboard" />

			<main className={`p-4 sm:p-8 flex-1 overflow-auto ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
				<PageTitle
					description="Here's what's happening with your content today"
				>
					Welcome back!
				</PageTitle>

				{loading ? (
					<div className="mt-8 text-center">
						<p className={cn(darkMode ? "text-zinc-400" : "text-gray-500")}>
							Loading dashboard data...
						</p>
					</div>
				) : stats.length === 0 ? (
					<div className={cn(
						"mt-8 p-6 rounded-xl border text-center",
						darkMode
							? "bg-[#1a1a1a]/80 border-white/10"
							: "bg-gray-50 border-gray-200"
					)}>
						<p className={cn(
							"mb-4",
							darkMode ? "text-zinc-400" : "text-gray-500"
						)}>
							No data available. Seed the database to see dashboard stats.
						</p>
						<a
							href="/seed"
							className={cn(
								"text-sm font-medium underline",
								darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
							)}
						>
							Go to Seed Page
						</a>
					</div>
				) : (
					<>
						{/* Stats Section */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
							{stats.map((stat) => (
								<StatCard
									key={stat.id}
									title={stat.title}
									value={stat.value}
									icon={stat.icon}
									change={stat.change}
									changeClass={stat.changeClass}
								/>
							))}
						</div>

						{/* Data Visualization Section */}
						<section className={`mt-10 border rounded-xl ${darkMode ? 'border-white/10 bg-[#1a1a1a]/80' : 'border-gray-200 bg-gray-50'} backdrop-blur-xl p-6 shadow-lg`}>
							<h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
								Weekly Schedule Overview
							</h3>
							<p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'} mb-6`}>
								Your content scheduling activity across the week.
							</p>
							<div className={`h-72 w-full rounded-lg ${darkMode ? 'bg-[#222222]' : 'bg-gray-100'} flex items-center justify-center`}>
								<p className={`${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
									View detailed analytics in the Analytics page
								</p>
							</div>
						</section>
					</>
				)}
			</main>
		</div>
	)
}
