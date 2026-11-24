'use client'

import { motion } from 'framer-motion'
import { MessageSquare, ExternalLink, Linkedin } from 'lucide-react'
import { getSiteCopyValue, type SiteCopy } from '@/lib/site-copy'

export interface DisplayPost {
  platform?: 'linkedin' | 'x' | 'reddit'
  url: string
  title?: string
  description?: string
  image?: string
  author?: string
  relativeTime?: string
  timestamp: number
}

export interface PostsClientProps {
  posts: DisplayPost[]
  copy: SiteCopy
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function RedditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.702zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  )
}

function PlatformBadge({ platform, copy }: { platform?: 'linkedin' | 'x' | 'reddit'; copy: SiteCopy }) {
  if (!platform) return null
  if (platform === 'linkedin') {
    const label = getSiteCopyValue(copy, 'post_linkedin_label')
    if (!label) return null
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0A66C2]">
        <Linkedin className="h-4 w-4" />
        {label}
      </span>
    )
  }
  if (platform === 'x') {
    const label = getSiteCopyValue(copy, 'post_x_label')
    if (!label) return null
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
        <XIcon className="h-3.5 w-3.5" />
        {label}
      </span>
    )
  }
  const label = getSiteCopyValue(copy, 'post_reddit_label')
  if (!label) return null
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#FF4500]">
      <RedditIcon className="h-4 w-4" />
      {label}
    </span>
  )
}

export function PostsClient({ posts, copy }: PostsClientProps) {
  if (posts.length === 0) return null
  return (
    <section id="posts" className="py-16 bg-secondary/50 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-2 mb-12">
          <MessageSquare className="h-6 w-6 text-foreground" />
          {getSiteCopyValue(copy, 'posts_heading') && (
            <h2 className="text-3xl font-semibold tracking-tight">{getSiteCopyValue(copy, 'posts_heading')}</h2>
          )}
        </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map((post, index) => {
              return (
                <motion.div
                  key={post.url + index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
                  className="motion-reduce:transform-none motion-reduce:transition-none h-full"
                >
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between h-full rounded-xl border border-border bg-card/90 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-primary/50"
                  >
                    <div>
                      {/* Image preview (only if present) */}
                      {post.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.image}
                          alt={getSiteCopyValue(copy, 'post_preview_alt')?.replace('{title}', post.title ?? '') || ''}
                          className="w-full h-44 object-cover border-b border-border"
                          loading="lazy"
                        />
                      )}

                      <div className="p-5 space-y-3">
                        {/* Header: Platform & Date */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <PlatformBadge platform={post.platform} copy={copy} />
                          {post.relativeTime && <span>{post.relativeTime}</span>}
                        </div>

                        {/* Title (only if present) */}
                        {post.title && (
                          <h3 className="font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                        )}

                        {/* Description (only if present) */}
                        {post.description && (
                          <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                            {post.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Footer link indicator */}
                    <div className="p-5 pt-0 flex items-center justify-end text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                      <span className="flex items-center gap-1">
                        {getSiteCopyValue(copy, 'view_post_label') && (
                          <>
                            {getSiteCopyValue(copy, 'view_post_label')} <ExternalLink className="h-3 w-3" />
                          </>
                        )}
                      </span>
                    </div>
                  </a>
                </motion.div>
              )
            })}
          </div>
      </div>
    </section>
  )
}

