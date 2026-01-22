"use client"
import { useState } from "react"
import { useTheme } from "@/context/ThemeContext"
import { PageHeader } from "@/components/PageHeader"
import { PageTitle } from "@/components/PageTitle"
import { Button } from "@/components/Button"
import { seedDatabase } from "./actions"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SeedPage() {
	const { darkMode } = useTheme()
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

	const handleSeed = async () => {
		setLoading(true)
		setResult(null)
		try {
			const data = await seedDatabase()
			setResult({
				success: true,
				message: `Successfully seeded ${data.contentCount} content items and ${data.scheduleCount} schedules!`,
			})
		} catch (error: any) {
			setResult({
				success: false,
				message: error.message || "Failed to seed database",
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex-1 flex flex-col min-h-screen">
			<PageHeader title="Seed Database" />

			<main className={`p-4 sm:p-8 flex-1 overflow-auto ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
				<div className="max-w-2xl mx-auto">
					<PageTitle description="Populate the database with sample data for demo">
						Seed Database
					</PageTitle>

					<div className={cn(
						"mt-8 p-6 rounded-xl border",
						darkMode
							? "bg-[#1a1a1a]/80 backdrop-blur-xl border-white/10"
							: "bg-gray-50 backdrop-blur-xl border-gray-200"
					)}>
						<p className={cn(
							"mb-6",
							darkMode ? "text-zinc-300" : "text-gray-700"
						)}>
							This will add sample content items and schedules to your database. 
							Existing data will be preserved.
						</p>

						<Button
							onClick={handleSeed}
							disabled={loading}
							variant="primary"
							className="w-full sm:w-auto"
						>
							{loading ? (
								<>
									<Loader2 className="h-4 w-4 mr-2 animate-spin" />
									Seeding...
								</>
							) : (
								"Seed Database"
							)}
						</Button>

						{result && (
							<div className={cn(
								"mt-6 p-4 rounded-lg flex items-start gap-3",
								result.success
									? darkMode
										? "bg-emerald-500/20 border border-emerald-500/30"
										: "bg-emerald-50 border border-emerald-200"
									: darkMode
										? "bg-red-500/20 border border-red-500/30"
										: "bg-red-50 border border-red-200"
							)}>
								{result.success ? (
									<CheckCircle className={cn(
										"h-5 w-5 mt-0.5 flex-shrink-0",
										darkMode ? "text-emerald-400" : "text-emerald-600"
									)} />
								) : (
									<AlertCircle className={cn(
										"h-5 w-5 mt-0.5 flex-shrink-0",
										darkMode ? "text-red-400" : "text-red-600"
									)} />
								)}
								<p className={cn(
									"text-sm",
									result.success
										? darkMode ? "text-emerald-300" : "text-emerald-800"
										: darkMode ? "text-red-300" : "text-red-800"
								)}>
									{result.message}
								</p>
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	)
}
