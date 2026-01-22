// Contents page
"use client"
import { useState, useEffect } from "react";
import {
    Plus,
    Calendar,
    Video,
    Megaphone,
    Eye,
    Edit,
    Trash2,
    Clock,
    CheckCircle,
    XCircle,
    X
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { PageHeader } from "@/components/PageHeader";
import { PageTitle } from "@/components/PageTitle";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/Button";
import { getContent, addContent, updateContent, deleteContent } from "./actions"

// get stats card
export function computeContentCards(contentItems: any[]) {
    const totalContent = contentItems.length;
    const published = contentItems.filter(item => item.status === 'published').length.toString();
    const scheduled = contentItems.filter(item => item.status === 'scheduled').length.toString();
    const draft = contentItems.filter(item => item.status === 'draft').length.toString();

    return [
        {
            id: 1,
            title: "Total Content",
            value: totalContent,
            icon: <Video className="h-6 w-6 text-zinc-400" />,
            change: "+3 this week",
            changeClass: "text-emerald-500",
        },
        {
            id: 2,
            title: "Published Content",
            value: published,
            icon: <CheckCircle className="h-6 w-6 text-zinc-400" />,
            change: "+2 this week",
            changeClass: "text-emerald-500",
        },
        {
            id: 3,
            title: "Scheduled Content",
            value: scheduled,
            icon: <Clock className="h-6 w-6 text-zinc-400" />,
            change: "+1 this week",
            changeClass: "text-emerald-500",
        },
        {
            id: 4,
            title: "Draft Content",
            value: draft,
            icon: <Edit className="h-6 w-6 text-zinc-400" />,
            change: "No change",
            changeClass: "text-zinc-400",
        },
    ]

}


export default function Contents() {
    const [content, setContent] = useState<any[]>([]);
    const [stat, setStat] = useState<any[]>([]);
    const { darkMode } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: selectedContent?.title || "",
        type: selectedContent?.type || "Video",
        status: selectedContent?.status || "draft",
        media_url: selectedContent?.media_url || "",
        scheduled_at: selectedContent?.scheduledDate || "",
        description: selectedContent?.description || "",
    })

    useEffect(() => {
        const load = async () => {
            const data = await getContent()
            setContent(data)
            setStat(computeContentCards(data))

        }
        load()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const refreshContent = async () => {
        const data = await getContent()
        setContent(data)
        setStat(computeContentCards(data))
    }

    const handleSave = async () => {
        try {
            if (selectedContent) {
                // Update existing content
                await updateContent(selectedContent.id, formData);
            } else {
                // Add new content
                await addContent(formData);
            }
            await refreshContent();
            closeModal();
        } catch (err: any) {
            alert(err.message || "Failed to save content");
        }
    };

    const openModal = (item: any = null) => {
        setSelectedContent(item);
        if (item) {
            // Edit mode - populate form with item data
            setFormData({
                title: item.title || '',
                type: item.type || 'Video',
                status: item.status || 'draft',
                media_url: item.media_url || '',
                scheduled_at: item.scheduled_at ? item.scheduled_at.slice(0, 16) : '',
                description: item.description || '',
            });
        } else {
            // Add mode - reset form
            setFormData({
                title: '',
                type: 'Video',
                status: 'draft',
                media_url: '',
                scheduled_at: '',
                description: '',
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedContent(null);
        setFormData({
            title: '',
            type: 'Video',
            status: 'draft',
            media_url: '',
            scheduled_at: '',
            description: '',
        });
    };

    type StatusBadgeProps = {
        status?: 'draft' | 'scheduled' | 'published' | string
    }
    // Status badge component
    const StatusBadge = ({ status }: StatusBadgeProps) => {
        let bgColor, textColor, icon;

        switch (status) {
            case 'published':
                bgColor = 'bg-emerald-500/20';
                textColor = 'text-emerald-400';
                icon = <CheckCircle className="h-4 w-4" />;
                break;
            case 'scheduled':
                bgColor = 'bg-blue-500/20';
                textColor = 'text-blue-400';
                icon = <Clock className="h-4 w-4" />;
                break;
            case 'draft':
                bgColor = 'bg-amber-500/20';
                textColor = 'text-amber-400';
                icon = <Edit className="h-4 w-4" />;
                break;
            default:
                bgColor = 'bg-gray-500/20';
                textColor = 'text-gray-400';
                icon = <XCircle className="h-4 w-4" />;
        }

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
                {icon}
                {(status ?? 'unknown').charAt(0).toUpperCase() + (status ?? 'unknown').slice(1)}
            </span>
        );
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteContent(id)
            await refreshContent()
        } catch (err: any) {
            alert(err.message)
        }
    }

    return (
        <div className="flex-1 flex flex-col min-h-screen">
            <PageHeader title="Content Library" />

            <main className={`p-4 sm:p-8 flex-1 overflow-auto ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                <PageTitle
                    description="Manage and organize all your content"
                    action={
                        <Button onClick={() => openModal()} size="sm">
                            <Plus className="h-5 w-5" />
                            Add New Content
                        </Button>
                    }
                >
                    Content Library
                </PageTitle>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stat.map((statItem) => (
                        <StatCard
                            key={statItem.id}
                            title={statItem.title}
                            value={statItem.value}
                            icon={statItem.icon}
                            change={statItem.change}
                            changeClass={statItem.changeClass}
                        />
                    ))}
                </div>

                {/* Content Grid */}
                <div className="mb-6 flex justify-between items-center">
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Content</h3>
                    <div className="flex gap-2">
                        <button className={`px-3 py-1 rounded-lg text-sm ${darkMode ? 'bg-[#1a1a1a] text-zinc-300 hover:bg-[#222222]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
                            All
                        </button>
                        <button className={`px-3 py-1 rounded-lg text-sm ${darkMode ? 'bg-[#1a1a1a] text-zinc-300 hover:bg-[#222222]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
                            Published
                        </button>
                        <button className={`px-3 py-1 rounded-lg text-sm ${darkMode ? 'bg-[#1a1a1a] text-zinc-300 hover:bg-[#222222]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
                            Scheduled
                        </button>
                        <button className={`px-3 py-1 rounded-lg text-sm ${darkMode ? 'bg-[#1a1a1a] text-zinc-300 hover:bg-[#222222]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
                            Draft
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.map((item, index) => (
                        <div
                            key={item.id ?? index}
                            className={` p-5 ${darkMode ? 'bg-[#1a1a1a]/80 backdrop-blur-xl border-white/10' : 'bg-gray-50 backdrop-blur-xl border-gray-200'} border shadow-lg hover:shadow-xl hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    {item.type === 'Video' ? <Video className="h-5 w-5 text-blue-500" /> : <Megaphone className="h-5 w-5 text-purple-500" />}
                                    <span className={`text-sm font-medium ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{item.type}</span>
                                </div>
                                <StatusBadge status={item.status} />
                            </div>

                            <div className="mb-4">
                                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
                                {item.scheduledDate && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className={`h-4 w-4 ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
                                        <span className={`${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                                            {new Date(item.scheduledDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200/20">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Eye className={`h-4 w-4 ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
                                        <span className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{item.views?.toLocaleString() ?? 0}</span>
                                    </div>
                                    <div className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{item.engagement} engagement</div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openModal(item)}
                                        className={`p-2 rounded-lg ${darkMode ? 'hover:bg-[#222222]' : 'hover:bg-gray-100'} transition-colors`}
                                        aria-label="Edit content"
                                    >
                                        <Edit className={`h-4 w-4 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
                                    </button>
                                    <button
                                        className={`p-2 rounded-lg ${darkMode ? 'hover:bg-[#222222]' : 'hover:bg-gray-100'} transition-colors`}
                                        aria-label="Delete content"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <Trash2 className={`h-4 w-4 ${darkMode ? 'text-red-500' : 'text-red-600'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Content Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div
                        className={`relative rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto ${darkMode ? "bg-[#111111] border border-white/10" : "bg-white border border-gray-200"
                            } shadow-2xl`}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                                    {selectedContent ? "Edit Content" : "Add New Content"}
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className={`p-1 rounded-full ${darkMode ? "hover:bg-[#222222] text-zinc-400" : "hover:bg-gray-100 text-gray-500"}`}
                                >
                                    <X />
                                </button>
                            </div>

                            {/* Controlled Form */}
                            <div className="space-y-6">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                        Content Title
                                    </label>
                                    <input
                                        name="title"
                                        type="text"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Enter content title"
                                        className={`w-full p-3 rounded-lg ${darkMode ? "bg-[#0a0a0a] border border-white/10 text-white" : "bg-gray-50 border border-gray-200 text-gray-900"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                            Content Type
                                        </label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className={`w-full p-3 rounded-lg ${darkMode ? "bg-[#0a0a0a] border border-white/10 text-white" : "bg-gray-50 border border-gray-200 text-gray-900"
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        >
                                            <option value="Video">Video</option>
                                            <option value="Promotion">Promotion</option>
                                            <option value="Article">Article</option>
                                            <option value="Image">Image</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className={`w-full p-3 rounded-lg ${darkMode ? "bg-[#0a0a0a] border border-white/10 text-white" : "bg-gray-50 border border-gray-200 text-gray-900"
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="scheduled">Scheduled</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                        Media URL
                                    </label>
                                    <input
                                        name="media_url"
                                        type="url"
                                        value={formData.media_url}
                                        onChange={handleChange}
                                        placeholder="https://example.com/media.mp4"
                                        className={`w-full p-3 rounded-lg ${darkMode ? "bg-[#0a0a0a] border border-white/10 text-white" : "bg-gray-50 border border-gray-200 text-gray-900"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                        Scheduled Date
                                    </label>
                                    <input
                                        name="scheduled_at"
                                        type="datetime-local"
                                        value={formData.scheduled_at}
                                        onChange={handleChange}
                                        className={`w-full p-3 rounded-lg ${darkMode ? "bg-[#0a0a0a] border border-white/10 text-white" : "bg-gray-50 border border-gray-200 text-gray-900"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Enter content description"
                                        className={`w-full p-3 rounded-lg ${darkMode ? "bg-[#0a0a0a] border border-white/10 text-white" : "bg-gray-50 border border-gray-200 text-gray-900"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        onClick={closeModal}
                                        className={`px-5 py-2 rounded-lg font-medium ${darkMode ? "bg-[#222222] text-zinc-300 hover:bg-[#333333]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            } transition-colors`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        {selectedContent ? "Update Content" : "Create Content"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}