"use server"
import { supabase } from "@/lib/supabase"

// Helper: Convert time string to minutes (from 5 PM)
function timeToMinutes(timeStr: string): number {
	if (!timeStr) return 0
	const [hours, mins] = timeStr.split(":").map(Number)
	const totalMinutes = hours * 60 + mins
	return totalMinutes - (17 * 60) // Subtract 5 PM (17:00) to get offset
}

// Helper: Calculate duration in minutes from time strings
function calculateDuration(startTime: string, endTime: string): number {
	const start = timeToMinutes(startTime)
	const end = timeToMinutes(endTime)
	return Math.max(0, end - start)
}

export async function getAnalytics() {
	// Fetch all schedules with content info
	const { data: schedules, error: scheduleError } = await supabase
		.from("schedule")
		.select("*, content(title, type)")
		.order("day", { ascending: true })
	
	if (scheduleError) {
		console.error("Supabase error:", scheduleError)
		throw new Error(scheduleError.message)
	}

	// Fetch all content
	const { data: content, error: contentError } = await supabase
		.from("content")
		.select("id, type")
	
	if (contentError) {
		console.error("Supabase error:", contentError)
		throw new Error(contentError.message)
	}

	const totalMinutes = 240 // 4 hours (5 PM - 9 PM)
	const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

	// 1. Schedule Coverage per Day
	const coverageByDay = days.map(day => {
		const daySchedules = schedules?.filter((s: any) => s.day === day) || []
		const totalScheduled = daySchedules.reduce((sum: number, s: any) => {
			return sum + calculateDuration(s.start_time, s.end_time)
		}, 0)
		const percentage = Math.round((totalScheduled / totalMinutes) * 100)
		return {
			day: day.charAt(0).toUpperCase() + day.slice(1),
			scheduled: totalScheduled,
			available: totalMinutes - totalScheduled,
			percentage,
			count: daySchedules.length
		}
	})

	// 2. Content Type Distribution
	const typeCounts: Record<string, number> = {}
	schedules?.forEach((s: any) => {
		const type = s.content?.type || "unknown"
		typeCounts[type] = (typeCounts[type] || 0) + 1
	})
	
	const contentTypes = Object.entries(typeCounts).map(([type, count]) => ({
		type: type.charAt(0).toUpperCase() + type.slice(1),
		count,
		percentage: Math.round((count / (schedules?.length || 1)) * 100)
	}))

	// 3. Day-wise Activity (total schedules per day)
	const dayActivity = days.map(day => {
		const count = schedules?.filter((s: any) => s.day === day).length || 0
		return {
			day: day.charAt(0).toUpperCase() + day.slice(1),
			count
		}
	})

	// 4. Total Content Items
	const totalContent = content?.length || 0
	const totalSchedules = schedules?.length || 0

	// 5. Most Scheduled Content Types (by duration)
	const typeDuration: Record<string, number> = {}
	schedules?.forEach((s: any) => {
		const type = s.content?.type || "unknown"
		const duration = calculateDuration(s.start_time, s.end_time)
		typeDuration[type] = (typeDuration[type] || 0) + duration
	})

	const typeByDuration = Object.entries(typeDuration)
		.map(([type, duration]) => ({
			type: type.charAt(0).toUpperCase() + type.slice(1),
			duration,
			hours: (duration / 60).toFixed(1)
		}))
		.sort((a, b) => b.duration - a.duration)

	return {
		coverageByDay,
		contentTypes,
		dayActivity,
		totalContent,
		totalSchedules,
		typeByDuration
	}
}
