"use client"
import { useState, useEffect } from "react"
import { useTheme } from "@/context/ThemeContext"
import { cn } from "@/lib/utils"
import { getSchedules, deleteSchedule } from "@/app/(dashboard)/scheduler/actions"
import { Trash2, Calendar, Clock } from "lucide-react"

export function SimpleScheduleList({ onRefresh }: { onRefresh?: number }) {
	const { darkMode } = useTheme()
	const [schedules, setSchedules] = useState<any[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadSchedules = async () => {
			try {
				const data = await getSchedules()
				setSchedules(data)
			} catch (error) {
				console.error("Failed to load schedules:", error)
			} finally {
				setLoading(false)
			}
		}
		loadSchedules()
	}, [onRefresh])

	const handleDelete = async (id: string) => {
		if (!confirm("Delete this schedule?")) return
		try {
			await deleteSchedule(id)
			setSchedules(schedules.filter(s => s.id !== id))
		} catch (error: any) {
			alert(error.message || "Failed to delete")
		}
	}

	const formatTime = (timeStr: string) => {
		if (!timeStr) return ""
		const [hours, mins] = timeStr.split(":")
		const hour = parseInt(hours)
		const period = hour >= 12 ? "PM" : "AM"
		const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
		return `${displayHour}:${mins} ${period}`
	}

	if (loading) {
		return (
			<div className={cn(
				"p-8 text-center rounded-xl border",
				darkMode ? "bg-[#1a1a1a]/80 border-white/10" : "bg-gray-50 border-gray-200"
			)}>
				<p className={cn(darkMode ? "text-zinc-400" : "text-gray-600")}>
					Loading schedules...
				</p>
			</div>
		)
	}

	if (schedules.length === 0) {
		return (
			<div className={cn(
				"p-12 text-center rounded-xl border",
				darkMode ? "bg-[#1a1a1a]/80 border-white/10" : "bg-gray-50 border-gray-200"
			)}>
				<Calendar className={cn(
					"h-12 w-12 mx-auto mb-4",
					darkMode ? "text-zinc-500" : "text-gray-400"
				)} />
				<p className={cn(
					"text-lg font-medium mb-2",
					darkMode ? "text-white" : "text-gray-900"
				)}>
					No schedules yet
				</p>
				<p className={cn(darkMode ? "text-zinc-400" : "text-gray-600")}>
					Click "Add Schedule" to schedule your first content
				</p>
			</div>
		)
	}

	return (
		<div className="space-y-4">
			{schedules.map((schedule) => (
				<div
					key={schedule.id}
					className={cn(
						"p-6 rounded-xl border transition-all",
						"hover:shadow-lg hover:-translate-y-0.5",
						darkMode
							? "bg-[#1a1a1a]/80 border-white/10 hover:border-white/20"
							: "bg-white border-gray-200 hover:border-gray-300"
					)}
				>
					<div className="flex items-start justify-between">
						<div className="flex-1">
							<h3 className={cn(
								"text-lg font-semibold mb-2",
								darkMode ? "text-white" : "text-gray-900"
							)}>
								{schedule.content?.title || "Untitled"}
							</h3>
							<div className="flex flex-wrap gap-4 text-sm">
								<div className="flex items-center gap-2">
									<Calendar className={cn(
										"h-4 w-4",
										darkMode ? "text-zinc-400" : "text-gray-500"
									)} />
									<span className={cn(
										"capitalize",
										darkMode ? "text-zinc-400" : "text-gray-600"
									)}>
										{schedule.day}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Clock className={cn(
										"h-4 w-4",
										darkMode ? "text-zinc-400" : "text-gray-500"
									)} />
									<span className={cn(darkMode ? "text-zinc-400" : "text-gray-600")}>
										{formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
									</span>
								</div>
							</div>
						</div>
						<button
							onClick={() => handleDelete(schedule.id)}
							className={cn(
								"p-2 rounded-lg transition-colors",
								darkMode
									? "hover:bg-red-500/20 text-red-400"
									: "hover:bg-red-50 text-red-600"
							)}
							aria-label="Delete schedule"
						>
							<Trash2 className="h-5 w-5" />
						</button>
					</div>
				</div>
			))}
		</div>
	)
}
