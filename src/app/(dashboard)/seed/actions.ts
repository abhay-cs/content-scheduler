"use server"
import { supabase } from "@/lib/supabase"

// Helper: Convert minutes (from 5 PM) to time string
function minutesToTime(minutes: number): string {
	const roundedMinutes = Math.round(minutes)
	const totalMinutes = 17 * 60 + roundedMinutes
	const hours = Math.floor(totalMinutes / 60)
	const mins = Math.round(totalMinutes % 60)
	return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:00`
}

export async function seedDatabase() {
	try {
		// Check for existing data to prevent duplicates
		const { data: existingContent } = await supabase
			.from("content")
			.select("title")
			.limit(1)

		// If content exists, check if our seed data already exists
		if (existingContent && existingContent.length > 0) {
			const { data: checkContent } = await supabase
				.from("content")
				.select("title")
				.eq("title", "Big Game Highlights")
				.limit(1)

			if (checkContent && checkContent.length > 0) {
				throw new Error("Seed data already exists. Please clear existing data first or use SQL cleanup script.")
			}
		}

		// 1. Seed Content Items
		const contentItems = [
			{
				title: "Big Game Highlights",
				description: "Top plays from this week's games",
				type: "ad",
				media_url: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800",
				status: "published",
			},
			{
				title: "Trivia Night Promo",
				description: "Join us every Tuesday for trivia night",
				type: "trivia",
				media_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
				status: "scheduled",
			},
			{
				title: "Summer Sale",
				description: "50% off all drinks this weekend",
				type: "promo",
				media_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
				status: "published",
			},
			{
				title: "Happy Hour Special",
				description: "Half-price appetizers 5-7 PM daily",
				type: "promo",
				media_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
				status: "published",
			},
			{
				title: "Sports Bar Ad",
				description: "Watch all games on our 20+ screens",
				type: "ad",
				media_url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800",
				status: "published",
			},
			{
				title: "Weekend Brunch",
				description: "Saturday & Sunday 10 AM - 2 PM",
				type: "promo",
				media_url: "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=800",
				status: "scheduled",
			},
			{
				title: "Monday Night Football",
				description: "Watch the game with us every Monday",
				type: "ad",
				media_url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
				status: "published",
			},
			{
				title: "Loyalty Program",
				description: "Join our rewards program today",
				type: "promo",
				media_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",
				status: "draft",
			},
			{
				title: "Game Day Trivia",
				description: "Test your sports knowledge",
				type: "trivia",
				media_url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800",
				status: "published",
			},
			{
				title: "Live Music Friday",
				description: "Live bands every Friday night",
				type: "promo",
				media_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
				status: "scheduled",
			},
		]

		const { data: insertedContent, error: contentError } = await supabase
			.from("content")
			.insert(contentItems)
			.select("*")

		if (contentError) {
			throw new Error(`Failed to insert content: ${contentError.message}`)
		}

		if (!insertedContent || insertedContent.length === 0) {
			throw new Error("No content was inserted")
		}

		// 2. Seed Schedules
		// Monday schedules
		const mondaySchedules = [
			{
				content_id: insertedContent[6].id, // Monday Night Football
				day: "monday",
				start_time: minutesToTime(0), // 5:00 PM
				end_time: minutesToTime(60), // 6:00 PM
				color: "primary",
			},
			{
				content_id: insertedContent[2].id, // Summer Sale
				day: "monday",
				start_time: minutesToTime(90), // 6:30 PM
				end_time: minutesToTime(120), // 7:00 PM
				color: "emerald",
			},
			{
				content_id: insertedContent[3].id, // Happy Hour Special
				day: "monday",
				start_time: minutesToTime(150), // 7:30 PM
				end_time: minutesToTime(180), // 8:00 PM
				color: "amber",
			},
		]

		// Tuesday schedules
		const tuesdaySchedules = [
			{
				content_id: insertedContent[1].id, // Trivia Night Promo
				day: "tuesday",
				start_time: minutesToTime(30), // 5:30 PM
				end_time: minutesToTime(90), // 6:30 PM
				color: "primary",
			},
			{
				content_id: insertedContent[0].id, // Big Game Highlights
				day: "tuesday",
				start_time: minutesToTime(120), // 7:00 PM
				end_time: minutesToTime(180), // 8:00 PM
				color: "emerald",
			},
		]

		// Wednesday schedules
		const wednesdaySchedules = [
			{
				content_id: insertedContent[4].id, // Sports Bar Ad
				day: "wednesday",
				start_time: minutesToTime(0), // 5:00 PM
				end_time: minutesToTime(45), // 5:45 PM
				color: "primary",
			},
			{
				content_id: insertedContent[2].id, // Summer Sale
				day: "wednesday",
				start_time: minutesToTime(90), // 6:30 PM
				end_time: minutesToTime(150), // 7:30 PM
				color: "emerald",
			},
		]

		// Thursday schedules
		const thursdaySchedules = [
			{
				content_id: insertedContent[3].id, // Happy Hour Special
				day: "thursday",
				start_time: minutesToTime(0), // 5:00 PM
				end_time: minutesToTime(60), // 6:00 PM
				color: "amber",
			},
			{
				content_id: insertedContent[8].id, // Game Day Trivia
				day: "thursday",
				start_time: minutesToTime(120), // 7:00 PM
				end_time: minutesToTime(180), // 8:00 PM
				color: "primary",
			},
		]

		// Friday schedules
		const fridaySchedules = [
			{
				content_id: insertedContent[9].id, // Live Music Friday
				day: "friday",
				start_time: minutesToTime(0), // 5:00 PM
				end_time: minutesToTime(90), // 6:30 PM
				color: "emerald",
			},
			{
				content_id: insertedContent[0].id, // Big Game Highlights
				day: "friday",
				start_time: minutesToTime(120), // 7:00 PM
				end_time: minutesToTime(210), // 8:30 PM
				color: "primary",
			},
		]

		// Saturday schedules
		const saturdaySchedules = [
			{
				content_id: insertedContent[5].id, // Weekend Brunch
				day: "saturday",
				start_time: minutesToTime(30), // 5:30 PM
				end_time: minutesToTime(90), // 6:30 PM
				color: "amber",
			},
			{
				content_id: insertedContent[4].id, // Sports Bar Ad
				day: "saturday",
				start_time: minutesToTime(120), // 7:00 PM
				end_time: minutesToTime(180), // 8:00 PM
				color: "primary",
			},
		]

		// Sunday schedules
		const sundaySchedules = [
			{
				content_id: insertedContent[5].id, // Weekend Brunch
				day: "sunday",
				start_time: minutesToTime(0), // 5:00 PM
				end_time: minutesToTime(60), // 6:00 PM
				color: "amber",
			},
			{
				content_id: insertedContent[2].id, // Summer Sale
				day: "sunday",
				start_time: minutesToTime(90), // 6:30 PM
				end_time: minutesToTime(150), // 7:30 PM
				color: "emerald",
			},
			{
				content_id: insertedContent[0].id, // Big Game Highlights
				day: "sunday",
				start_time: minutesToTime(180), // 8:00 PM
				end_time: minutesToTime(240), // 9:00 PM
				color: "primary",
			},
		]

		const allSchedules = [
			...mondaySchedules,
			...tuesdaySchedules,
			...wednesdaySchedules,
			...thursdaySchedules,
			...fridaySchedules,
			...saturdaySchedules,
			...sundaySchedules,
		]

		const { error: scheduleError } = await supabase
			.from("schedule")
			.insert(allSchedules)

		if (scheduleError) {
			throw new Error(`Failed to insert schedules: ${scheduleError.message}`)
		}

		return {
			success: true,
			contentCount: insertedContent.length,
			scheduleCount: allSchedules.length,
		}
	} catch (error: any) {
		console.error("Seed error:", error)
		throw new Error(error.message || "Failed to seed database")
	}
}
