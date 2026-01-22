// Scheduler page
"use client"
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { PageHeader } from "@/components/PageHeader";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/Button";
import { Timeline } from "@/components/timeline";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getContent } from "@/app/(dashboard)/contents/actions";
import { addSchedule } from "./actions";

export default function Scheduler() {
    const { darkMode } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contentItems, setContentItems] = useState<any[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedDay, setSelectedDay] = useState("monday");
    const [formData, setFormData] = useState({
        content_id: "",
        day: "monday",
        start_time: "17:00",
        end_time: "17:30",
        color: "primary",
    });

    useEffect(() => {
        const loadContent = async () => {
            const data = await getContent();
            setContentItems(data);
        };
        loadContent();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Convert time strings to minutes (e.g., "17:30" -> 1050 minutes from 5 PM)
            const [startHour, startMin] = formData.start_time.split(":").map(Number);
            const [endHour, endMin] = formData.end_time.split(":").map(Number);

            const startMinutes = (startHour - 17) * 60 + startMin; // 17:00 = 0 minutes
            const endMinutes = (endHour - 17) * 60 + endMin;

            await addSchedule({
                content_id: formData.content_id,
                day: formData.day,
                start_time: startMinutes,
                end_time: endMinutes,
                color: formData.color,
            });

            setIsModalOpen(false);
            setFormData({
                content_id: "",
                day: "monday",
                start_time: "17:00",
                end_time: "17:30",
                color: "primary",
            });
            setRefreshKey(prev => prev + 1); // Trigger timeline refresh
        } catch (error: any) {
            alert(error.message || "Failed to create schedule");
        }
    };

    return (
        <div className="flex-1 flex flex-col min-h-screen">
            <PageHeader title="Content Scheduler" />

            <main className={`p-4 sm:p-8 flex-1 overflow-auto ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                <div className="max-w-4xl mx-auto w-full">
                    <PageTitle
                        description="Schedule your content for publication"
                        action={
                            <Button onClick={() => setIsModalOpen(true)} size="sm">
                                <Plus className="h-5 w-5" />
                                Add Schedule
                            </Button>
                        }
                    >
                        Schedule Your Content
                    </PageTitle>
                    <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
                        {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={cn(
                                    "px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors",
                                    selectedDay === day
                                        ? darkMode
                                            ? "bg-blue-500 text-white"
                                            : "bg-blue-600 text-white"
                                        : darkMode
                                            ? "bg-[#1a1a1a] text-zinc-300 hover:bg-[#222222]"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                )}
                            >
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                            </button>
                        ))}
                    </div>
                    <Timeline key={refreshKey} selectedDay={selectedDay} />
                </div>
            </main>

            {/* Add Schedule Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div
                        className={cn(
                            "relative rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl",
                            darkMode
                                ? "bg-[#111111] border border-white/10"
                                : "bg-white border border-gray-200"
                        )}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className={cn(
                                    "text-xl font-semibold",
                                    darkMode ? "text-white" : "text-gray-900"
                                )}>
                                    Add New Schedule
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className={cn(
                                        "p-1 rounded-full transition-colors",
                                        darkMode
                                            ? "hover:bg-[#222222] text-zinc-400"
                                            : "hover:bg-gray-100 text-gray-500"
                                    )}
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className={cn(
                                        "block text-sm font-medium mb-2",
                                        darkMode ? "text-zinc-300" : "text-gray-700"
                                    )}>
                                        Content
                                    </label>
                                    <select
                                        name="content_id"
                                        value={formData.content_id}
                                        onChange={handleChange}
                                        required
                                        className={cn(
                                            "w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                                            darkMode
                                                ? "bg-[#0a0a0a] border border-white/10 text-white"
                                                : "bg-gray-50 border border-gray-200 text-gray-900"
                                        )}
                                    >
                                        <option value="">Select content...</option>
                                        {contentItems.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={cn(
                                        "block text-sm font-medium mb-2",
                                        darkMode ? "text-zinc-300" : "text-gray-700"
                                    )}>
                                        Day
                                    </label>
                                    <select
                                        name="day"
                                        value={formData.day}
                                        onChange={handleChange}
                                        required
                                        className={cn(
                                            "w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                                            darkMode
                                                ? "bg-[#0a0a0a] border border-white/10 text-white"
                                                : "bg-gray-50 border border-gray-200 text-gray-900"
                                        )}
                                    >
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                        <option value="saturday">Saturday</option>
                                        <option value="sunday">Sunday</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className={cn(
                                            "block text-sm font-medium mb-2",
                                            darkMode ? "text-zinc-300" : "text-gray-700"
                                        )}>
                                            Start Time
                                        </label>
                                        <input
                                            name="start_time"
                                            type="time"
                                            value={formData.start_time}
                                            onChange={handleChange}
                                            required
                                            className={cn(
                                                "w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                                                darkMode
                                                    ? "bg-[#0a0a0a] border border-white/10 text-white"
                                                    : "bg-gray-50 border border-gray-200 text-gray-900"
                                            )}
                                        />
                                    </div>

                                    <div>
                                        <label className={cn(
                                            "block text-sm font-medium mb-2",
                                            darkMode ? "text-zinc-300" : "text-gray-700"
                                        )}>
                                            End Time
                                        </label>
                                        <input
                                            name="end_time"
                                            type="time"
                                            value={formData.end_time}
                                            onChange={handleChange}
                                            required
                                            className={cn(
                                                "w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                                                darkMode
                                                    ? "bg-[#0a0a0a] border border-white/10 text-white"
                                                    : "bg-gray-50 border border-gray-200 text-gray-900"
                                            )}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={cn(
                                        "block text-sm font-medium mb-2",
                                        darkMode ? "text-zinc-300" : "text-gray-700"
                                    )}>
                                        Color
                                    </label>
                                    <select
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                        className={cn(
                                            "w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                                            darkMode
                                                ? "bg-[#0a0a0a] border border-white/10 text-white"
                                                : "bg-gray-50 border border-gray-200 text-gray-900"
                                        )}
                                    >
                                        <option value="primary">Blue</option>
                                        <option value="emerald">Green</option>
                                        <option value="amber">Amber</option>
                                    </select>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="primary">
                                        Create Schedule
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}