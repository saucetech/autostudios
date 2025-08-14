"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { posts, getAllTags, type Post } from "@/lib/posts"

function BlogPostCard({ post }: { post: Post }) {
  return (
    <Link href={`/library/${post.slug}`} className="block group">
      <div className="card-border h-full flex flex-col overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
        <div className="relative w-full h-48">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 glass text-blue-300 rounded-full text-xs font-medium border border-blue-400/20"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
            {post.title}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed flex-grow mb-4">{post.description}</p>
          <div className="mt-auto pt-4 border-t border-white/10">
            <p className="text-xs text-white/60">{post.date}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const allTags = useMemo(() => getAllTags(), [])

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true
      return matchesSearch && matchesTag
    })
  }, [searchTerm, selectedTag])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="md:text-6xl text-5xl font-bold tracking-tight mb-6">
          The Autonomous{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Library</span>
        </h1>
        <p className="max-w-3xl text-xl text-gray-300 mx-auto">
          Your resource hub for insights on AI strategy, automation, and business transformation.
        </p>
      </div>

      <div className="mb-12 flex flex-col md:flex-row gap-6 items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              selectedTag === null
                ? "bg-purple-500 text-white"
                : "glass border border-white/10 text-gray-300 hover:bg-white/10"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                selectedTag === tag
                  ? "bg-purple-500 text-white"
                  : "glass border border-white/10 text-gray-300 hover:bg-white/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20 col-span-full">
          <p className="text-2xl font-semibold text-white mb-2">No articles found</p>
          <p className="text-gray-400">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  )
}
