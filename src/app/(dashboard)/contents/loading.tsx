"use client"
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      <span className="ml-2 text-gray-700">Loading...</span>
    </div>
  )
}
