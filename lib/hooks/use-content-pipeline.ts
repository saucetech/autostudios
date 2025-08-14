"use client"

import { useState, useEffect, useCallback } from "react"
import { ContentService, type ContentItem } from "@/lib/services/content-service"

export function useContentPipeline() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const contentService = new ContentService()

  const loadItems = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await contentService.getContentItems()
      setItems(data)
    } catch (err) {
      console.error("Error fetching content items:", err)
      setError("Failed to load content items")
      // Fallback to empty array since we're not using external APIs
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const createItem = async (data: Partial<ContentItem>): Promise<ContentItem> => {
    try {
      const newItem = await contentService.createItem(data)
      setItems((prev) => [newItem, ...prev])
      return newItem
    } catch (err) {
      console.error("Error creating content item:", err)
      throw new Error("Failed to create content item")
    }
  }

  const updateItem = useCallback(
    async (id: string, data: Partial<ContentItem>): Promise<ContentItem> => {
      // Store original item for potential rollback
      const originalItem = items.find((item) => item.id === id)

      // Optimistic update - update UI immediately
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)))

      try {
        const updatedItem = await contentService.updateItem(id, data)
        // Update with server response to ensure consistency
        setItems((prev) => prev.map((item) => (item.id === id ? updatedItem : item)))
        return updatedItem
      } catch (err) {
        console.error("Error updating content item:", err)

        if (originalItem) {
          setItems((prev) => prev.map((item) => (item.id === id ? originalItem : item)))
        }

        throw new Error("Failed to update content item")
      }
    },
    [items],
  )

  const deleteItem = async (id: string): Promise<void> => {
    try {
      await contentService.deleteItem(id)
      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.error("Error deleting content item:", err)
      throw new Error("Failed to delete content item")
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  return {
    items,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    refresh: loadItems,
  }
}
