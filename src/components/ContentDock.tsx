import { useDraggable } from "@dnd-kit/core"

export interface DockItem {
  id: string
  title: string
  color: string
  duration: number // minutes
}

const colorMap: Record<string, string> = {
  primary: "bg-primary text-white",
  emerald: "bg-emerald-500 text-white",
  amber: "bg-amber-500 text-white",
}

export function ContentDock({ items }: { items: DockItem[] }) {
  return (
    <div className="flex gap-4 p-4 border-b bg-slate-50 dark:bg-slate-900">
      {items.map((item) => (
        <DraggableDockItem key={item.id} item={item} />
      ))}
    </div>
  )
}

function DraggableDockItem({ item }: { item: DockItem }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: item.id })
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-2 rounded-lg cursor-grab select-none ${colorMap[item.color]}`}
      style={style}
    >
      {item.title}
    </div>
  )
}