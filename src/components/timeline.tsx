"use client"
import { useState, useEffect } from "react"
import { ResizableBox } from "react-resizable"
import "react-resizable/css/styles.css"
import { useTheme } from "@/context/ThemeContext"
import { cn } from "@/lib/utils"
import { getSchedules, updateSchedule, deleteSchedule } from "@/app/(dashboard)/scheduler/actions"
import { Trash2 } from "lucide-react"

export interface ScheduleItem {
	id: string
	title: string
	color: string
	start: number
	end: number
}

interface TimelineProps {
	onRefresh?: () => void
	selectedDay?: string
}

export function Timeline({ onRefresh, selectedDay }: TimelineProps) {
	const { darkMode } = useTheme()
	const [items, setItems] = useState<ScheduleItem[]>([])
	const [loading, setLoading] = useState(true)
	const [isMobile, setIsMobile] = useState(false)
	const [deleteModal, setDeleteModal] = useState<{ open: boolean; item: ScheduleItem | null }>({
		open: false,
		item: null,
	})
	const totalMinutes = 240
	// Responsive minute width: smaller on mobile for better fit
	const minuteWidth = isMobile ? 3 : 4

	// Detect mobile on mount and resize
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768)
		}
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	// Fetch items from Supabase
	useEffect(() => {
		const fetchItems = async () => {
			try {
				const data = await getSchedules()
				// Debug: log to see what we're getting
				if (data.length > 0) {
					console.log("All schedules:", data.map((i: any) => ({ id: i.id, day: i.day, title: i.content?.title })))
				}
				// Filter by selected day
				const filteredData = selectedDay 
					? data.filter((i: any) => i.day?.toLowerCase() === selectedDay.toLowerCase()) 
					: data
				console.log(`Filtered for ${selectedDay}:`, filteredData.length, "items")
				setItems(
					filteredData.map((i: any) => {
						// Convert time strings to minutes (from 5 PM)
						const timeToMinutes = (timeStr: string): number => {
							if (!timeStr) return 0
							const [hours, mins] = timeStr.split(":").map(Number)
							const totalMinutes = hours * 60 + mins
							return totalMinutes - (17 * 60) // Subtract 5 PM (17:00)
						}
						
						return {
							id: i.id,
							title: i.content?.title || "Untitled",
							color: i.color || "primary",
							start: timeToMinutes(i.start_time),
							end: timeToMinutes(i.end_time),
						}
					})
				)
			} catch (error) {
				console.error("Failed to fetch schedules:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchItems()
	}, [onRefresh, selectedDay]) // Re-fetch when selectedDay changes

	if (loading) {
		return (
			<div className={cn(
				"relative overflow-x-auto border rounded-xl p-8 text-center",
				darkMode 
					? "bg-[#1a1a1a]/80 border-white/10" 
					: "bg-gray-50 border-gray-200"
			)}>
				<p className={cn(darkMode ? "text-zinc-400" : "text-gray-600")}>
					Loading schedule...
				</p>
			</div>
		)
	}

	if (items.length === 0) {
		return (
			<div className={cn(
				"relative overflow-x-auto border rounded-xl p-12 text-center",
				darkMode 
					? "bg-[#1a1a1a]/80 border-white/10" 
					: "bg-gray-50 border-gray-200"
			)}>
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
		<div className="space-y-2">
			{/* Mobile hint */}
			{isMobile && items.length > 0 && (
				<p className={cn(
					"text-xs text-center",
					darkMode ? "text-zinc-500" : "text-gray-500"
				)}>
					← Swipe to see full timeline →
				</p>
			)}
			<div className={cn(
				"relative border rounded-xl",
				"overflow-x-auto overflow-y-visible",
				"scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent",
				// Smooth scrolling on mobile
				"scroll-smooth",
				darkMode 
					? "bg-[#1a1a1a]/80 border-white/10" 
					: "bg-white border-gray-200"
			)}>
			{/* Time Header - Sticky on mobile for better UX */}
			<div className={cn(
				"flex border-b sticky top-0 z-20 bg-inherit",
				darkMode ? "border-white/10" : "border-gray-200"
			)}>
				{Array.from({ length: totalMinutes / 30 }).map((_, i) => (
					<div
						key={i}
						className={cn(
							// Responsive width: smaller on mobile
							"w-[90px] sm:w-[120px] flex-shrink-0 text-xs font-medium text-center py-2 border-r",
							darkMode 
								? "text-zinc-400 border-white/10" 
								: "text-gray-500 border-gray-200"
						)}
					>
						{/* Shorter format on mobile */}
						<span className="sm:hidden">
							{5 + Math.floor((i * 30) / 60)}:{(i * 30) % 60 === 0 ? "00" : "30"}
						</span>
						<span className="hidden sm:inline">
							{5 + Math.floor((i * 30) / 60)}:{(i * 30) % 60 === 0 ? "00" : "30"} PM
						</span>
					</div>
				))}
			</div>

			{/* Timeline Body */}
			{/* Timeline Body - dynamic height based on number of tracks */}
			{(() => {
				const trackHeight = 72 // block height (60) + vertical gap (12)
				const containerHeight = Math.max(160, items.length * trackHeight + 16)

				return (
					<div className="relative min-w-full" style={{ height: containerHeight, width: totalMinutes * minuteWidth }}>
						{/* Grid overlay: vertical time lines and horizontal track separators */}
						<div className="absolute inset-0 pointer-events-none z-0">
							{Array.from({ length: totalMinutes / 30 }).map((_, i) => (
								<div
									key={`v-${i}`}
									style={{
										position: "absolute",
										left: i * 30 * minuteWidth,
										top: 0,
										height: containerHeight,
										width: 1,
									}}
									className={cn(
										darkMode ? "bg-white/10" : "bg-gray-200"
									)}
								/>
							))}

							{Array.from({ length: Math.max(1, Math.ceil(containerHeight / trackHeight)) }).map((_, i) => (
								<div
									key={`h-${i}`}
									style={{
										position: "absolute",
										left: 0,
										right: 0,
										top: i * trackHeight,
										height: 1,
									}}
									className={cn(
										darkMode ? "bg-white/10" : "bg-gray-200"
									)}
								/>
							))}
						</div>

						{items.map((item, index) => (
							<TimelineBlock
								key={item.id}
								item={item}
								minuteWidth={minuteWidth}
								totalMinutes={totalMinutes}
								trackIndex={index}
								trackHeight={trackHeight}
								isMobile={isMobile}
								onResize={async (newStart, newEnd) => {
									// Update local state optimistically
									setItems((prev) =>
										prev.map((i) =>
											i.id === item.id ? { ...i, start: newStart, end: newEnd } : i
										)
									)
									// Sync back to Supabase
									try {
										await updateSchedule({
											id: item.id,
											start_time: newStart,
											end_time: newEnd,
										})
									} catch (error) {
										console.error("Failed to update schedule:", error)
										// Revert on error
										setItems((prev) =>
											prev.map((i) =>
												i.id === item.id ? { ...i, start: item.start, end: item.end } : i
											)
										)
									}
								}}
								onDelete={() => {
									setDeleteModal({ open: true, item })
								}}
							/>
						))}
					</div>
				)
			})()}
			</div>

			{/* Delete Confirmation Modal */}
			{deleteModal.open && deleteModal.item && (
				<DeleteConfirmModal
					item={deleteModal.item}
					darkMode={darkMode}
					onConfirm={async () => {
						try {
							await deleteSchedule(deleteModal.item!.id)
							setItems((prev) => prev.filter((i) => i.id !== deleteModal.item!.id))
							setDeleteModal({ open: false, item: null })
						} catch (error: any) {
							alert(error.message || "Failed to delete schedule")
						}
					}}
					onCancel={() => setDeleteModal({ open: false, item: null })}
				/>
			)}
		</div>
	)
}

function DeleteConfirmModal({
	item,
	darkMode,
	onConfirm,
	onCancel,
}: {
	item: ScheduleItem
	darkMode: boolean
	onConfirm: () => void
	onCancel: () => void
}) {
	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
			<div
				className={cn(
					"relative rounded-xl w-full max-w-md shadow-2xl",
					darkMode
						? "bg-[#111111] border border-white/10"
						: "bg-white border border-gray-200"
				)}
			>
				<div className="p-6">
					<h3 className={cn(
						"text-xl font-semibold mb-2",
						darkMode ? "text-white" : "text-gray-900"
					)}>
						Delete Schedule?
					</h3>
					<p className={cn(
						"text-sm mb-6",
						darkMode ? "text-zinc-400" : "text-gray-600"
					)}>
						Are you sure you want to delete <span className={cn(
							"font-semibold",
							darkMode ? "text-white" : "text-gray-900"
						)}>"{item.title}"</span>? This action cannot be undone.
					</p>
					<div className="flex justify-end gap-3">
						<button
							onClick={onCancel}
							className={cn(
								"px-4 py-2 rounded-lg font-medium transition-colors",
								darkMode
									? "bg-[#222222] text-zinc-300 hover:bg-[#333333]"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							)}
						>
							Cancel
						</button>
						<button
							onClick={onConfirm}
							className={cn(
								"px-4 py-2 rounded-lg font-medium transition-colors",
								"bg-red-600 text-white hover:bg-red-700"
							)}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

function TimelineBlock({
	item,
	minuteWidth,
	onResize,
	totalMinutes,
	trackIndex,
	trackHeight,
	isMobile,
	onDelete,
}: {
	item: ScheduleItem
	minuteWidth: number
	onResize: (s: number, e: number) => void
	totalMinutes: number
	trackIndex: number
	trackHeight: number
	isMobile: boolean
	onDelete: () => void
}) {
	const minDuration = 5

	// Ensure numeric defaults
	const safeStart = Number(item.start) || 0
	const safeEnd = Number(item.end) || safeStart + 45

	const [leftPos, setLeftPos] = useState(safeStart * minuteWidth)
	const [width, setWidth] = useState((safeEnd - safeStart) * minuteWidth)
	const [currentStart, setCurrentStart] = useState(safeStart)
	const [currentEnd, setCurrentEnd] = useState(safeEnd)

	const { darkMode: blockDarkMode } = useTheme()
	
	const colorMap: Record<string, string> = {
		primary: blockDarkMode 
			? "border-blue-500 bg-blue-500/20 text-blue-400" 
			: "border-blue-500 bg-blue-500/20 text-blue-600",
		emerald: blockDarkMode
			? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
			: "border-emerald-500 bg-emerald-500/20 text-emerald-600",
		amber: blockDarkMode
			? "border-amber-500 bg-amber-500/20 text-amber-400"
			: "border-amber-500 bg-amber-500/20 text-amber-600",
	}

	const formatTime = (minutes: number) => {
		const m = Math.max(0, Math.round(minutes))
		const hour = 5 + Math.floor(m / 60)
		const min = m % 60 === 0 ? "00" : "30"
		return `${hour}:${min} PM`
	}

	useEffect(() => {
		const newStart = leftPos / minuteWidth
		const newEnd = newStart + width / minuteWidth
		setCurrentStart(newStart)
		setCurrentEnd(newEnd)
	}, [leftPos, width, minuteWidth])

	return (
		<ResizableBox
			className={cn(
				"p-2 sm:p-3 text-xs sm:text-sm rounded-lg border-l-4 transition-all group",
				"cursor-ew-resize", // Enable resize on all devices
				colorMap[item.color] || colorMap.primary
			)}
			width={width}
			height={isMobile ? 70 : 60} // Taller on mobile for better touch targets
			axis="x"
			// Enable resize on mobile with larger handles
			resizeHandles={["e", "w"]}
			minConstraints={[minDuration * minuteWidth, 40]}
			style={{ 
				left: leftPos, 
				top: trackIndex * trackHeight + 8, 
				position: "absolute", 
				zIndex: 10,
				minWidth: `${minDuration * minuteWidth}px`, // Ensure minimum width
			}}
			onResize={(e, data) => {
				if (data.handle === "e") {
					setWidth(data.size.width)
				} else if (data.handle === "w") {
					const deltaWidth = width - data.size.width
					setLeftPos(leftPos + deltaWidth)
					setWidth(data.size.width)
				}
			}}
			onResizeStop={() => {
				const newStart = Math.round(leftPos / minuteWidth) // Round to nearest minute
				const newEnd = Math.round(newStart + width / minuteWidth) // Round to nearest minute
				onResize(Math.max(0, newStart), Math.min(totalMinutes, newEnd))
			}}
		>
			<div className="flex items-start justify-between gap-2">
				<div className="flex-1 min-w-0">
					<p className={cn(
						"font-semibold mb-1 truncate",
						blockDarkMode ? "text-white" : "text-gray-900"
					)}>
						{item.title}
					</p>
					<p className={cn(
						"opacity-70 text-xs sm:text-sm",
						blockDarkMode ? "text-zinc-400" : "text-gray-600"
					)}>
						{`${formatTime(currentStart)} → ${formatTime(currentEnd)}`}
					</p>
				</div>
				<button
					onClick={(e) => {
						e.stopPropagation()
						onDelete()
					}}
					className={cn(
						// Always visible on mobile, hover on desktop
						isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100",
						"transition-opacity p-1 rounded",
						"flex-shrink-0",
						blockDarkMode
							? "hover:bg-red-500/20 text-red-400 active:bg-red-500/30"
							: "hover:bg-red-50 text-red-600 active:bg-red-100"
					)}
					aria-label="Delete schedule"
					title="Delete schedule"
				>
					<Trash2 className={cn("h-4 w-4", isMobile && "h-5 w-5")} />
				</button>
			</div>
		</ResizableBox>
	)
}