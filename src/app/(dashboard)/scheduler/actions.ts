"use server"
import { supabase } from "@/lib/supabase"

// Helper: Convert time string to minutes (from 5 PM)
function timeToMinutes(timeStr: string): number {
	if (!timeStr) return 0
	const [hours, mins] = timeStr.split(":").map(Number)
	const totalMinutes = hours * 60 + mins
	return totalMinutes - (17 * 60) // Subtract 5 PM (17:00) to get offset
}

export async function getSchedules() {
	const { data, error } = await supabase
		.from("schedule")
		.select("*, content(title, type)")
		.order("start_time", { ascending: true })
	
	if (error) {
		console.error("Supabase error:", error)
		throw new Error(error.message)
	}
	return data || []
}

// Helper: Convert minutes (from 5 PM) to time string
function minutesToTime(minutes: number): string {
	// Round to nearest minute to avoid decimals
	const roundedMinutes = Math.round(minutes)
	const totalMinutes = 17 * 60 + roundedMinutes // 5 PM = 17:00
	const hours = Math.floor(totalMinutes / 60)
	const mins = Math.round(totalMinutes % 60) // Round to ensure integer
	return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:00`
}

export async function addSchedule({
	content_id,
	day,
	start_time,
	end_time,
	color,
}: {
	content_id: string
	day: string
	start_time: number // minutes from 5 PM
	end_time: number // minutes from 5 PM
	color?: string
}) {
	// Convert minutes to time format for database
	const startTimeStr = minutesToTime(start_time)
	const endTimeStr = minutesToTime(end_time)
	
	const { data, error } = await supabase
		.from("schedule")
		.insert([
			{
				content_id,
				day,
				start_time: startTimeStr,
				end_time: endTimeStr,
				color: color || "primary",
			},
		])
		.select("*")
	
	if (error) {
		console.error("Supabase error:", error)
		throw new Error(error.message)
	}
	return data?.[0]
}

export async function updateSchedule({
	id,
	start_time,
	end_time,
}: {
	id: string
	start_time: number // minutes from 5 PM
	end_time: number // minutes from 5 PM
}) {
	// Convert minutes to time format for database
	const startTimeStr = minutesToTime(start_time)
	const endTimeStr = minutesToTime(end_time)
	
	const { data, error } = await supabase
		.from("schedule")
		.update({ 
			start_time: startTimeStr, 
			end_time: endTimeStr 
		})
		.eq("id", id)
		.select("*")
	
	if (error) {
		console.error("Supabase error:", error)
		throw new Error(error.message)
	}
	return data?.[0]
}

export async function deleteSchedule(id: string) {
	const { error } = await supabase.from("schedule").delete().eq("id", id)
	if (error) throw new Error(error.message)
	return true
}
