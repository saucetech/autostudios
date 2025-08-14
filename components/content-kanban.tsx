"use client"

import { useState, useMemo, useCallback, memo, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ContentEditor } from "./content-editor"
import { useContentPipeline } from "@/lib/hooks/use-content-pipeline"
import {
  Plus,
  Star,
  Flag,
  Clock,
  Eye,
  MessageSquare,
  Share2,
  Edit,
  Copy,
  Trash2,
  MoreHorizontal,
  Sparkles,
  Calendar,
  Video,
} from "lucide-react"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const COLUMNS = [
  {
    id: "ideas",
    title: "💡 Ideas",
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
    limit: 10,
  },
  {
    id: "in-progress",
    title: "✍️ In Progress",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    limit: 5,
  },
  {
    id: "review",
    title: "👀 Review",
    color: "from-orange-500/20 to-yellow-500/20",
    borderColor: "border-orange-500/30",
    limit: 3,
  },
  {
    id: "published",
    title: "🚀 Published",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    limit: null,
  },
]

const PRIORITY_COLORS = {
  low: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  medium: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  high: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  urgent: "bg-red-500/20 text-red-300 border-red-500/30",
}

const TYPE_ICONS = {
  post: "📄",
  script: "📝",
  video: "🎥",
  image: "🖼️",
  audio: "🎵",
}

const ContentCard = memo(
  ({
    item,
    index,
    onEdit,
    onToggleStar,
    onToggleFlag,
    onCopy,
    onDelete,
  }: {
    item: any
    index: number
    onEdit: (item: any) => void
    onToggleStar: (item: any) => void
    onToggleFlag: (item: any) => void
    onCopy: (item: any) => void
    onDelete: (itemId: string) => void
  }) => {
    const randomMetrics = useMemo(
      () => ({
        views: item.views || Math.floor(Math.random() * 1000),
        engagement: item.engagement || Math.floor(Math.random() * 100),
        shares: item.shares || Math.floor(Math.random() * 50),
      }),
      [item.views, item.engagement, item.shares],
    )

    return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer hover:border-white/40 hover:shadow-lg hover:bg-white/15 ${
              snapshot.isDragging ? "shadow-2xl border-white/50 bg-white/20 rotate-2 scale-105" : ""
            }`}
            style={{
              ...provided.draggableProps.style,
            }}
            onClick={() => onEdit(item)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-lg">{TYPE_ICONS[item.type as keyof typeof TYPE_ICONS]}</span>
                  <CardTitle className="text-white text-sm font-medium truncate">{item.title}</CardTitle>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleStar(item)
                    }}
                  >
                    <Star className={`w-3 h-3 ${item.starred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleFlag(item)
                    }}
                  >
                    <Flag className={`w-3 h-3 ${item.flagged ? "fill-red-400 text-red-400" : "text-gray-400"}`} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-white/10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="w-3 h-3 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="glass-dialog" align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onEdit(item)
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onCopy(item)
                        }}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      {(item.type === "script" ||
                        item.type === "video" ||
                        item.type === "audio" ||
                        item.type === "post") &&
                        item.content && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {}} className="text-purple-400 focus:text-purple-300">
                              <Video className="w-4 h-4 mr-2" />
                              Generate AI Avatar
                            </DropdownMenuItem>
                          </>
                        )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete(item.id)
                        }}
                        className="text-red-400 focus:text-red-400"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {/* Priority & Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={`text-xs ${PRIORITY_COLORS[item.priority as keyof typeof PRIORITY_COLORS]}`}>
                  {item.priority}
                </Badge>
                {item.tags?.slice(0, 2).map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-300">
                    {tag}
                  </Badge>
                ))}
                {item.tags && item.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                    +{item.tags.length - 2}
                  </Badge>
                )}
              </div>

              {/* Description */}
              {item.description && <p className="text-gray-300 text-xs line-clamp-2">{item.description}</p>}

              {(item.type === "script" || item.type === "video" || item.type === "audio" || item.type === "post") &&
                item.content && (
                  <Button
                    onClick={() => {}}
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white text-xs font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Video className="w-3 h-3 mr-2" />
                    Generate AI Avatar
                  </Button>
                )}

              {/* Viral Hook */}
              {item.viral_hook && (
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span className="text-xs font-medium text-purple-300">Viral Hook</span>
                  </div>
                  <p className="text-xs text-gray-300 line-clamp-2">{item.viral_hook}</p>
                </div>
              )}

              {/* Performance Metrics (for published content) */}
              {item.status === "published" && (
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Eye className="w-3 h-3 text-blue-400" />
                      <span className="text-xs text-blue-400 font-medium">{randomMetrics.views}</span>
                    </div>
                    <span className="text-xs text-gray-400">Views</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <MessageSquare className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400 font-medium">{randomMetrics.engagement}</span>
                    </div>
                    <span className="text-xs text-gray-400">Likes</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Share2 className="w-3 h-3 text-purple-400" />
                      <span className="text-xs text-purple-400 font-medium">{randomMetrics.shares}</span>
                    </div>
                    <span className="text-xs text-gray-400">Shares</span>
                  </div>
                </div>
              )}

              {/* Engagement Prediction */}
              {item.predicted_engagement && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Engagement Score</span>
                    <span className="text-xs text-green-400 font-medium">{item.predicted_engagement}/10</span>
                  </div>
                  <Progress value={item.predicted_engagement * 10} className="h-1" />
                </div>
              )}

              {/* Timestamps */}
              <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
                {item.scheduled_for && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.scheduled_for).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </Draggable>
    )
  },
)

ContentCard.displayName = "ContentCard"

const KanbanColumn = memo(
  ({
    column,
    items,
    onEdit,
    onToggleStar,
    onToggleFlag,
    onCopy,
    onDelete,
  }: {
    column: (typeof COLUMNS)[0]
    items: any[]
    onEdit: (item: any) => void
    onToggleStar: (item: any) => void
    onToggleFlag: (item: any) => void
    onCopy: (item: any) => void
    onDelete: (itemId: string) => void
  }) => {
    const isOverLimit = column.limit && items.length >= column.limit

    return (
      <div className="space-y-4">
        {/* Column Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white text-lg">{column.title}</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-white/20 text-gray-300">
              {items.length}
              {column.limit && `/${column.limit}`}
            </Badge>
            {isOverLimit && <Badge className="bg-red-500/20 text-red-300 border-red-500/30">WIP Limit</Badge>}
          </div>
        </div>

        {/* Column Content */}
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`min-h-[200px] p-4 rounded-2xl border border-white/10 ${
                snapshot.isDraggingOver
                  ? "bg-white/10 border-white/30 shadow-lg"
                  : "bg-white/5 hover:bg-white/8 hover:border-white/20"
              }`}
              style={{
                transition: snapshot.isDraggingOver ? "none" : "background-color 0.2s ease, border-color 0.2s ease",
              }}
            >
              <div className="space-y-3">
                {items.map((item, index) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    index={index}
                    onEdit={onEdit}
                    onToggleStar={onToggleStar}
                    onToggleFlag={onToggleFlag}
                    onCopy={onCopy}
                    onDelete={onDelete}
                  />
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    )
  },
)

KanbanColumn.displayName = "KanbanColumn"

export function ContentKanban() {
  const { items, loading, createItem, updateItem, deleteItem } = useContentPipeline()
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [localItems, setLocalItems] = useState<any[]>([])

  useEffect(() => {
    setLocalItems(items)
  }, [items])

  const columnsData = useMemo(() => {
    return COLUMNS.map((column) => ({
      ...column,
      items: localItems.filter((item) => item.status === column.id),
    }))
  }, [localItems])

  const handleDragEnd = useCallback(
    async (result: DropResult) => {
      if (!result.destination) return

      const { source, destination, draggableId } = result
      const item = localItems.find((item) => item.id === draggableId)

      if (!item || source.droppableId === destination.droppableId) return

      const destinationColumn = COLUMNS.find((col) => col.id === destination.droppableId)
      const itemsInDestination = localItems.filter((item) => item.status === destination.droppableId)

      if (destinationColumn?.limit && itemsInDestination.length >= destinationColumn.limit) {
        toast.error(`Cannot exceed WIP limit of ${destinationColumn.limit} for ${destinationColumn.title}`)
        return
      }

      const optimisticItems = localItems.map((i) =>
        i.id === draggableId ? { ...i, status: destination.droppableId } : i,
      )

      setLocalItems(optimisticItems)

      try {
        await updateItem(item.id, { status: destination.droppableId })
        toast.success("Content moved successfully!")
      } catch (error) {
        console.error("Failed to move content:", error)
        toast.error("Failed to move content")
        setLocalItems(items)
      }
    },
    [localItems, items, updateItem],
  )

  const handleCreateNew = useCallback(async () => {
    try {
      const newItem = await createItem({
        title: "New Content Idea",
        content: "",
        type: "post",
        status: "ideas",
        priority: "medium",
        tags: [],
        platforms: [],
      })
      setSelectedItem(newItem)
      setIsEditorOpen(true)
    } catch (error) {
      toast.error("Failed to create new content")
    }
  }, [createItem])

  const handleEditItem = useCallback((item: any) => {
    setSelectedItem(item)
    setIsEditorOpen(true)
  }, [])

  const handleSaveContent = useCallback(
    async (content: string, title: string) => {
      if (!selectedItem) return

      try {
        await updateItem(selectedItem.id, { content, title })
        setIsEditorOpen(false)
        setSelectedItem(null)
        toast.success("Content saved successfully!")
      } catch (error) {
        toast.error("Failed to save content")
      }
    },
    [selectedItem, updateItem],
  )

  const handleCloseEditor = useCallback(() => {
    setIsEditorOpen(false)
    setSelectedItem(null)
  }, [])

  const handleCopyItem = useCallback(
    async (item: any) => {
      try {
        await createItem({
          ...item,
          title: `${item.title} (Copy)`,
          status: "ideas",
        })
        toast.success("Content copied successfully!")
      } catch (error) {
        toast.error("Failed to copy content")
      }
    },
    [createItem],
  )

  const handleDeleteItem = useCallback(
    async (itemId: string) => {
      try {
        await deleteItem(itemId)
        toast.success("Content deleted successfully!")
      } catch (error) {
        toast.error("Failed to delete content")
      }
    },
    [deleteItem],
  )

  const handleToggleStar = useCallback(
    async (item: any) => {
      try {
        await updateItem(item.id, { starred: !item.starred })
        toast.success(item.starred ? "Removed from favorites" : "Added to favorites")
      } catch (error) {
        toast.error("Failed to update favorite status")
      }
    },
    [updateItem],
  )

  const handleToggleFlag = useCallback(
    async (item: any) => {
      try {
        await updateItem(item.id, { flagged: !item.flagged })
        toast.success(item.flagged ? "Flag removed" : "Content flagged")
      } catch (error) {
        toast.error("Failed to update flag status")
      }
    },
    [updateItem],
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Content Pipeline</h1>
            <p className="text-gray-300">Manage your content creation workflow with AI-powered assistance</p>
          </div>
          <Button
            onClick={handleCreateNew}
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Content
          </Button>
        </div>

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columnsData.map((columnData) => (
              <KanbanColumn
                key={columnData.id}
                column={columnData}
                items={columnData.items}
                onEdit={handleEditItem}
                onToggleStar={handleToggleStar}
                onToggleFlag={handleToggleFlag}
                onCopy={handleCopyItem}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Content Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-[80vw] w-full h-[80vh] p-0 bg-transparent border-none shadow-none overflow-hidden mx-auto">
          <div className="w-full h-full rounded-xl overflow-hidden">
            {selectedItem && (
              <ContentEditor
                title={selectedItem.title}
                initialContent={selectedItem.content || ""}
                onSave={handleSaveContent}
                onClose={handleCloseEditor}
                metadata={{
                  type: selectedItem.type,
                  status: selectedItem.status,
                  priority: selectedItem.priority,
                  tags: selectedItem.tags || [],
                  viral_hook: selectedItem.viral_hook,
                  predicted_engagement: selectedItem.predicted_engagement,
                  viral_analysis_score: selectedItem.viral_analysis_score,
                  platforms: selectedItem.platforms || [],
                }}
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
