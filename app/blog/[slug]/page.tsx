"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, BookOpen, Share2, Twitter, Linkedin } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import { motion } from "framer-motion";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#15100d] via-[#1c1612] to-[#15100d] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-[#f2e9d8]">Blog post not found</h1>
          <Link href="/blog">
            <Button variant="outline" className="border-[#d6a354]/30 text-[#d6a354]">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate reading time
  const wordsPerMinute = 200;
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#15100d] via-[#1c1612] to-[#15100d]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/blog">
            <Button 
              variant="ghost" 
              className="mb-8 text-[#d6a354]/80 hover:text-[#d6a354] hover:bg-[#d6a354]/10 border border-[#d6a354]/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <Badge 
                key={category}
                className="bg-[#d6a354]/10 text-[#d6a354] border border-[#d6a354]/30"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#f2e9d8] via-[#d6a354] to-[#f2e9d8] bg-clip-text text-transparent">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-[#a88455] mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#d6a354]" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#d6a354]" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#d6a354]" />
              <span>{wordCount} words</span>
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-10 border border-[#d6a354]/20"
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15100d]/60 to-transparent" />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-[#1c1612]/80 to-[#201a15]/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#d6a354]/10 shadow-xl"
          >
            <div className="prose-custom">
              {post.content.split('\n').map((paragraph, index) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;
                
                // Handle headers
                if (trimmed.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-3xl font-bold text-[#f2e9d8] mt-8 mb-4">
                      {trimmed.replace('# ', '')}
                    </h1>
                  );
                }
                if (trimmed.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-[#f2e9d8] mt-8 mb-4 border-b border-[#d6a354]/20 pb-2">
                      {trimmed.replace('## ', '')}
                    </h2>
                  );
                }
                if (trimmed.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold text-[#e2c394] mt-6 mb-3">
                      {trimmed.replace('### ', '')}
                    </h3>
                  );
                }
                
                // Handle list items
                if (trimmed.startsWith('- **')) {
                  const match = trimmed.match(/- \*\*(.+?)\*\*: (.+)/);
                  if (match) {
                    return (
                      <div key={index} className="flex items-start gap-3 my-2 ml-4">
                        <span className="text-[#d6a354] mt-1.5">•</span>
                        <p className="text-[#d6c4a8]">
                          <strong className="text-[#e2c394]">{match[1]}</strong>: {match[2]}
                        </p>
                      </div>
                    );
                  }
                }
                if (trimmed.startsWith('- ')) {
                  return (
                    <div key={index} className="flex items-start gap-3 my-2 ml-4">
                      <span className="text-[#d6a354] mt-1.5">•</span>
                      <p className="text-[#d6c4a8]">{trimmed.replace('- ', '')}</p>
                    </div>
                  );
                }
                
                // Regular paragraphs
                return (
                  <p key={index} className="text-[#d6c4a8] leading-relaxed my-4">
                    {trimmed}
                  </p>
                );
              })}
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 p-6 bg-[#1c1612]/50 rounded-xl border border-[#d6a354]/10"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[#a88455]">
                <Share2 className="h-4 w-4 text-[#d6a354]" />
                <span>Share this article</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#d6a354]/10 text-[#d6a354] hover:bg-[#d6a354]/20 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#d6a354]/10 text-[#d6a354] hover:bg-[#d6a354]/20 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* More Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-[#f2e9d8] mb-6">More Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter((p) => p.slug !== slug)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block p-6 rounded-xl bg-[#1c1612]/50 border border-[#d6a354]/10 hover:border-[#d6a354]/30 transition-all"
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      {relatedPost.categories.slice(0, 2).map((cat) => (
                        <span key={cat} className="text-xs px-2 py-1 rounded-full bg-[#d6a354]/10 text-[#d6a354]">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h4 className="font-semibold text-[#f2e9d8] group-hover:text-[#d6a354] transition-colors mb-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-[#a88455] line-clamp-2">{relatedPost.excerpt}</p>
                  </Link>
                ))}
            </div>
          </motion.div>
        </motion.article>
      </div>
    </div>
  );
}
