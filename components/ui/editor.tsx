"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Save,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface EditorProps {
  initialContent?: string
  onSave?: (content: string, title: string) => void
  onClose?: () => void
  className?: string
  title?: string
}

export function NotionEditor({
  initialContent = "",
  onSave,
  onClose,
  className,
  title: initialTitle = "",
}: EditorProps) {
  const [content, setContent] = useState(initialContent)
  const [title, setTitle] = useState(initialTitle)
  const [isEditing, setIsEditing] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content
    }
  }, [])

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave(content, title)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
    }
  }

  const insertBlock = (type: string) => {
    const selection = window.getSelection()
    if (!selection || !editorRef.current) return

    let blockHtml = ""
    switch (type) {
      case "heading1":
        blockHtml = "<h1>Heading 1</h1>"
        break
      case "heading2":
        blockHtml = "<h2>Heading 2</h2>"
        break
      case "heading3":
        blockHtml = "<h3>Heading 3</h3>"
        break
      case "paragraph":
        blockHtml = "<p>Type something...</p>"
        break
      case "quote":
        blockHtml =
          '<blockquote style="border-left: 4px solid #6366f1; padding-left: 16px; margin: 16px 0; font-style: italic;">Quote</blockquote>'
        break
      case "code":
        blockHtml =
          '<pre style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; font-family: monospace;"><code>Code block</code></pre>'
        break
      case "divider":
        blockHtml = '<hr style="border: none; border-top: 1px solid rgba(255,255,255,0.2); margin: 24px 0;">'
        break
    }

    document.execCommand("insertHTML", false, blockHtml)
    handleContentChange()
  }

  return (
    <div
      className={cn("flex flex-col h-full bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-4 flex-1">
          <Input
            ref={titleRef}
            value={title}
            onChange={handleTitleChange}
            placeholder="Untitled"
            className="text-xl font-semibold bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0 focus:border-none p-0 h-auto"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleSave}
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          {onClose && (
            <Button onClick={onClose} size="sm" variant="ghost" className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center space-x-1 p-3 border-b border-white/10 flex-wrap gap-2">
        {/* Text Formatting */}
        <div className="flex items-center space-x-1 border-r border-white/10 pr-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCommand("bold")}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCommand("italic")}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCommand("underline")}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <Underline className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCommand("strikeThrough")}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <Strikethrough className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCommand("formatBlock", "code")}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <Code className="w-4 h-4" />
          </Button>
        </div>

        {/* Block Types */}
        <div className="flex items-center space-x-1 border-r border-white/10 pr-3">
          <Select onValueChange={insertBlock}>
            <SelectTrigger className="w-32 h-8 bg-transparent border-white/20 text-gray-300">
              <SelectValue placeholder="Block" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/20">
              <SelectItem value="paragraph">Paragraph</SelectItem>
              <SelectItem value="heading1">Heading 1</SelectItem>
              <SelectItem value="heading2">Heading 2</SelectItem>
              <SelectItem value="heading3">Heading 3</SelectItem>
              <SelectItem value="quote">Quote</SelectItem>
              <SelectItem value="code">Code Block</SelectItem>
              <SelectItem value="divider">Divider</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lists */}
        <div className="flex items-center space-x-1 border-r border-white/10 pr-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCommand("insertUnorderedList")}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCommand("insertOrderedList")}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
        </div>

        {/* Alignment */}
        <div className="flex items-center space-x-1 border-r border-white/10 pr-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCommand("justifyLeft")}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCommand("justifyCenter")}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCommand("justifyRight")}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <AlignRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Undo/Redo */}
        <div className="flex items-center space-x-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCommand("undo")}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCommand("redo")}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-6 overflow-auto">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleContentChange}
          className="min-h-full text-white focus:outline-none prose prose-invert max-w-none"
          style={{
            lineHeight: "1.6",
            fontSize: "16px",
          }}
          suppressContentEditableWarning={true}
        >
          {!content && <p className="text-gray-400">Start typing or use the toolbar above to add content blocks...</p>}
        </div>
      </div>
    </div>
  )
}
