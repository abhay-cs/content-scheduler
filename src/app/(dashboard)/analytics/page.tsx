// Analytics page
"use client"
import { useState, useEffect } from "react"
import { useTheme } from "@/context/ThemeContext"
import { PageHeader } from "@/components/PageHeader"
import { PageTitle } from "@/components/PageTitle"
import { StatCard } from "@/components/StatCard"
import { getAnalytics } from "./actions"
import { Calendar, Clock, FileText, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Analytics() {
	const { darkMode } = useTheme()
	const [analytics, setAnalytics] = useState<any>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchAnalytics = async () => {
			try {
				const data = await getAnalytics()
				setAnalytics(data)
			} catch (error) {
				console.error("Failed to fetch analytics:", error)
			} finally {
				setLoading(false)
			}
		}
		fetchAnalytics()
	}, [])

	if (loading) {
		return (
			<div className="flex-1 flex flex-col min-h-screen">
				<PageHeader title="Analytics" />
				<main className={`p-4 sm:p-8 flex-1 overflow-auto ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
					<div className="max-w-6xl mx-auto">
						<PageTitle description="View your analytics data and insights">
							Analytics Dashboard
						</PageTitle>
						<div className="mt-8 text-center">
							<p className={cn(darkMode ? "text-zinc-400" : "text-gray-500")}>Loading analytics...</p>
						</div>
					</div>
				</main>
			</div>
		)
	}

	if (!analytics) {
		return (
			<div className="flex-1 flex flex-col min-h-screen">
				<PageHeader title="Analytics" />
				<main className={`p-4 sm:p-8 flex-1 overflow-auto ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
					<div className="max-w-6xl mx-auto">
						<PageTitle description="View your analytics data and insights">
							Analytics Dashboard
						</PageTitle>
						<div className="mt-8 text-center">
							<p className={cn(darkMode ? "text-zinc-400" : "text-gray-500")}>No data available</p>
						</div>
					</div>
				</main>
			</div>
		)
	}

	return (
		<div className="flex-1 flex flex-col min-h-screen">
			<PageHeader title="Analytics" />

			<main className={`p-4 sm:p-8 flex-1 overflow-auto ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
				<div className="max-w-6xl mx-auto w-full">
					<PageTitle description="View your analytics data and insights">
						Analytics Dashboard
					</PageTitle>

					{/* Summary Stats */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
						<StatCard
							title="Total Content"
							value={analytics.totalContent}
							icon={<FileText className="h-5 w-5" />}
						/>
						<StatCard
							title="Total Schedules"
							value={analytics.totalSchedules}
							icon={<Calendar className="h-5 w-5" />}
						/>
						<StatCard
							title="Avg. Per Day"
							value={Math.round(analytics.totalSchedules / 7) || 0}
							icon={<TrendingUp className="h-5 w-5" />}
						/>
						<StatCard
							title="Total Hours"
							value={(
								analytics.coverageByDay.reduce((sum: number, day: any) => sum + day.scheduled, 0) / 60
							).toFixed(1)}
							icon={<Clock className="h-5 w-5" />}
							change="scheduled this week"
							changeClass={darkMode ? "text-zinc-400" : "text-gray-500"}
						/>
					</div>

					{/* Schedule Coverage by Day */}
					<div className={cn(
						"mt-8 p-6 rounded-xl border",
						darkMode
							? "bg-[#1a1a1a]/80 backdrop-blur-xl border-white/10"
							: "bg-gray-50 backdrop-blur-xl border-gray-200"
					)}>
						<h3 className={cn(
							"text-lg font-semibold mb-6",
							darkMode ? "text-white" : "text-gray-900"
						)}>
							Schedule Coverage by Day
						</h3>
						<div className="space-y-4">
							{analytics.coverageByDay.map((day: any) => (
								<div key={day.day}>
									<div className="flex items-center justify-between mb-2">
										<div className="flex items-center gap-3">
											<span className={cn(
												"font-medium text-sm",
												darkMode ? "text-zinc-300" : "text-gray-700"
											)}>
												{day.day}
											</span>
											<span className={cn(
												"text-xs px-2 py-0.5 rounded-full",
												darkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-700"
											)}>
												{day.count} schedules
											</span>
										</div>
										<span className={cn(
											"text-sm font-semibold",
											darkMode ? "text-zinc-300" : "text-gray-700"
										)}>
											{day.percentage}%
										</span>
									</div>
									<div className={cn(
										"h-3 rounded-full overflow-hidden",
										darkMode ? "bg-[#0a0a0a]" : "bg-gray-200"
									)}>
										<div
											className={cn(
												"h-full rounded-full transition-all duration-500",
												day.percentage >= 75
													? "bg-emerald-500"
													: day.percentage >= 50
													? "bg-blue-500"
													: day.percentage >= 25
													? "bg-amber-500"
													: "bg-red-500"
											)}
											style={{ width: `${Math.min(100, day.percentage)}%` }}
										/>
									</div>
									<div className="flex items-center justify-between mt-1 text-xs">
										<span className={cn(darkMode ? "text-zinc-500" : "text-gray-500")}>
											{Math.floor(day.scheduled / 60)}h {day.scheduled % 60}m scheduled
										</span>
										<span className={cn(darkMode ? "text-zinc-500" : "text-gray-500")}>
											{Math.floor(day.available / 60)}h {day.available % 60}m available
										</span>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Content Type Distribution */}
					<div className={cn(
						"mt-8 p-6 rounded-xl border",
						darkMode
							? "bg-[#1a1a1a]/80 backdrop-blur-xl border-white/10"
							: "bg-gray-50 backdrop-blur-xl border-gray-200"
					)}>
						<h3 className={cn(
							"text-lg font-semibold mb-6",
							darkMode ? "text-white" : "text-gray-900"
						)}>
							Content Type Distribution
						</h3>
						{analytics.contentTypes.length > 0 ? (
							<div className="space-y-4">
								{analytics.contentTypes.map((item: any) => (
									<div key={item.type}>
										<div className="flex items-center justify-between mb-2">
											<span className={cn(
												"font-medium text-sm",
												darkMode ? "text-zinc-300" : "text-gray-700"
											)}>
												{item.type}
											</span>
											<span className={cn(
												"text-sm font-semibold",
												darkMode ? "text-zinc-300" : "text-gray-700"
											)}>
												{item.count} ({item.percentage}%)
											</span>
										</div>
										<div className={cn(
											"h-2 rounded-full overflow-hidden",
											darkMode ? "bg-[#0a0a0a]" : "bg-gray-200"
										)}>
											<div
												className={cn(
													"h-full rounded-full transition-all duration-500",
													item.type === "Ad" 
														? "bg-blue-500"
														: item.type === "Promo"
														? "bg-emerald-500"
														: "bg-amber-500"
												)}
												style={{ width: `${item.percentage}%` }}
											/>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className={cn(darkMode ? "text-zinc-400" : "text-gray-500")}>
								No content types scheduled yet
							</p>
						)}
					</div>

					{/* Day-wise Activity */}
					<div className={cn(
						"mt-8 p-6 rounded-xl border",
						darkMode
							? "bg-[#1a1a1a]/80 backdrop-blur-xl border-white/10"
							: "bg-gray-50 backdrop-blur-xl border-gray-200"
					)}>
						<h3 className={cn(
							"text-lg font-semibold mb-6",
							darkMode ? "text-white" : "text-gray-900"
						)}>
							Day-wise Activity
						</h3>
						<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
							{analytics.dayActivity.map((day: any) => {
								const maxCount = Math.max(...analytics.dayActivity.map((d: any) => d.count), 1)
								const height = (day.count / maxCount) * 100
								return (
									<div key={day.day} className="flex flex-col items-center gap-2">
										<div className={cn(
											"w-full rounded-t-lg transition-all duration-500 flex items-end justify-center",
											darkMode ? "bg-[#0a0a0a]" : "bg-gray-200"
										)} style={{ height: "120px" }}>
											<div
												className={cn(
													"w-full rounded-t-lg transition-all duration-500",
													day.count > 0
														? "bg-blue-500"
														: darkMode
														? "bg-zinc-800"
														: "bg-gray-300"
												)}
												style={{ height: `${Math.max(height, day.count > 0 ? 10 : 0)}%` }}
											/>
										</div>
										<div className="text-center">
											<p className={cn(
												"text-xs font-medium",
												darkMode ? "text-zinc-400" : "text-gray-600"
											)}>
												{day.day.slice(0, 3)}
											</p>
											<p className={cn(
												"text-sm font-semibold mt-1",
												darkMode ? "text-white" : "text-gray-900"
											)}>
												{day.count}
											</p>
										</div>
									</div>
								)
							})}
						</div>
					</div>

					{/* Content Type by Duration */}
					{analytics.typeByDuration.length > 0 && (
						<div className={cn(
							"mt-8 p-6 rounded-xl border",
							darkMode
								? "bg-[#1a1a1a]/80 backdrop-blur-xl border-white/10"
								: "bg-gray-50 backdrop-blur-xl border-gray-200"
						)}>
							<h3 className={cn(
								"text-lg font-semibold mb-6",
								darkMode ? "text-white" : "text-gray-900"
							)}>
								Content Type by Duration
							</h3>
							<div className="space-y-3">
								{analytics.typeByDuration.map((item: any) => (
									<div key={item.type} className="flex items-center justify-between">
										<span className={cn(
											"font-medium text-sm",
											darkMode ? "text-zinc-300" : "text-gray-700"
										)}>
											{item.type}
										</span>
										<span className={cn(
											"text-sm font-semibold",
											darkMode ? "text-zinc-300" : "text-gray-700"
										)}>
											{item.hours} hours
										</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</main>
		</div>
	)
}
