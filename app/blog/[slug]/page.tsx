import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/blog-data"

/**
 * Individual blog post page component
 * Features:
 * - Simple HTML rendering of blog content
 * - Cover image
 * - Category badges
 * - Back to blog link
 * - Publication date
 *
 * @param params - URL parameters including the blog post slug
 * @returns Blog post page with rendered content
 */
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Find the blog post by slug
  const post = blogPosts.find((post) => post.slug === params.slug)

  // If post not found, return 404
  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to blog
          </Link>
        </Button>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">{post.title}</h1>

        <p className="text-muted-foreground mb-8">
          Published on{" "}
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {post.coverImage && (
          <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
            <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <article className="prose prose-lg dark:prose-invert max-w-none">
          {/* Render the markdown content as HTML */}
          <div dangerouslySetInnerHTML={{ __html: formatMarkdown(post.content) }} />
        </article>
      </div>
    </div>
  )
}

/**
 * Simple function to format markdown to HTML
 * This is a basic implementation that handles common markdown elements
 *
 * @param markdown - Markdown content string
 * @returns HTML string
 */
function formatMarkdown(markdown: string): string {
  // Handle headings
  let html = markdown
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^#### (.*$)/gm, "<h4>$1</h4>")
    .replace(/^##### (.*$)/gm, "<h5>$1</h5>")
    .replace(/^###### (.*$)/gm, "<h6>$1</h6>")

  // Handle paragraphs
  html = html.replace(/^\s*(\n)?(.+)/gm, (m) =>
    /<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : "<p>" + m + "</p>",
  )

  // Handle bold and italic
  html = html.replace(/\*\*(.*)\*\*/gm, "<strong>$1</strong>").replace(/\*(.*)\*/gm, "<em>$1</em>")

  // Handle lists
  html = html
    .replace(/^\s*\n\*/gm, "<ul>\n*")
    .replace(/^(\*.+)\s*\n([^*])/gm, "$1\n</ul>\n\n$2")
    .replace(/^\*(.+)/gm, "<li>$1</li>")

  // Handle links
  html = html.replace(/\[([^\]]+)\]$$([^)]+)$$/gm, '<a href="$2">$1</a>')

  // Handle code blocks
  html = html.replace(/```([\s\S]*?)```/gm, "<pre><code>$1</code></pre>")

  // Handle inline code
  html = html.replace(/`([^`]+)`/gm, "<code>$1</code>")

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/gm, "")

  return html
}
