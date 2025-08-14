import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getPostBySlug } from "@/lib/posts"
import { Calendar, Tag } from "lucide-react"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) {
    return {
      title: "Post Not Found",
    }
  }
  return {
    title: `${post.title} - Autonomous Studios`,
    description: post.description,
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
        <div className="flex justify-center items-center gap-6 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill objectFit="cover" />
      </div>

      <div
        className="prose prose-invert prose-lg max-w-none
                       prose-headings:font-bold prose-headings:text-white
                       prose-a:text-purple-400 hover:prose-a:text-purple-300
                       prose-strong:text-white
                       prose-ul:list-disc prose-ol:list-decimal
                       prose-li:marker:text-purple-400"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-12 pt-8 border-t border-white/10">
        <div className="flex items-center gap-3 flex-wrap">
          <Tag className="w-5 h-5 text-gray-400" />
          {post.tags.map((tag) => (
            <Link
              href="/library" // In a real app, this would link to a filtered tag page
              key={tag}
              className="inline-block px-3 py-1 glass text-blue-300 rounded-full text-sm font-medium border border-blue-400/20 hover:bg-white/10 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
