"use server"
import { supabase } from "@/lib/supabase"

export async function getContent() {
	const { data, error } = await supabase.from("content")
		.select("*")
		.order("created_at", { ascending: false });
	if (error) throw new Error(error.message)

	return data.map((item: any) => ({
		id: item.id,
		title: item.title,
		type: item.type?.charAt(0).toUpperCase() + item.type?.slice(1) || "Unknown",
		status: item.status ?? "draft",
		scheduledDate: item.scheduled_at ? new Date(item.scheduled_at).toISOString() : null,
		views: item.views ?? 0,
		engagement: item.engagement !== null ? `${item.engagement}%` : "0%",
		thumbnail: item.media_url ?? "/vercel.svg",
	}))
}

export async function addContent({
	title,
	description,
	type,
	media_url,
	status,
	scheduled_at, // use the correct column name
}: {
	title: string
	description?: string
	type: string
	media_url?: string
	status: string
	scheduled_at?: string | null
}) {
	const { data, error } = await supabase.from("content").insert([
		{
			title,
			description,
			type,
			media_url,
			status,
			scheduled_at: scheduled_at ? new Date(scheduled_at).toISOString() : null,
		},
	]).select("*")

	if (error) throw new Error(error.message)
	return data?.[0]
}


export async function deleteContent(contentId: string) {
	const { error } = await supabase.from('content').delete().eq("id", contentId);
	if (error) throw new Error(error.message)
	return true;
}