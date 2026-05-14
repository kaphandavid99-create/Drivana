"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../contexts/ThemeContext";
import { blogPosts, type BlogPost } from "@/data/blogData";
import { motion } from "framer-motion";
import { Clock, Calendar, User, ArrowLeft, Share2, Bookmark, Heart, MessageCircle, Eye, ChevronRight, Tag, Star } from "lucide-react";

export default function BlogPostPage() {
  const { resolvedTheme } = useTheme();
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [mounted, setMounted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setMounted(true);
    const postId = parseInt(params.id as string);
    const foundPost = blogPosts.find((p) => p.id === postId);
    setPost(foundPost || null);
  }, [params.id]);

  if (!mounted || !post) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        resolvedTheme === 'dark' ? 'bg-slate-950' : 'bg-white'
      }`}>
        <div className="text-center">
          <p className={`text-xl ${resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        resolvedTheme === "dark" ? "bg-slate-950" : "bg-white"
      }`}
    >
      {/* Hero Header */}
      <section className={`relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden ${
        resolvedTheme === 'dark'
          ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950'
          : 'bg-gradient-to-b from-white via-slate-50 to-white'
      }`}>
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/blog"
            className={`inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors ${
              resolvedTheme === 'dark'
                ? 'text-slate-400 hover:text-amber-400'
                : 'text-slate-600 hover:text-amber-600'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest ${
                resolvedTheme === 'dark'
                  ? 'bg-red-700/90 text-white'
                  : 'bg-red-500/90 text-white'
              }`}>
                <Tag className="w-3 h-3" />
                {post.category}
              </div>
              {post.featured && (
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest ${
                  resolvedTheme === 'dark'
                    ? 'bg-amber-700/90 text-white'
                    : 'bg-amber-500/90 text-white'
                }`}>
                  <Star className="w-3 h-3" />
                  Featured
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight ${
              resolvedTheme === 'dark'
                ? 'text-white'
                : 'text-slate-900'
            }`}>
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className={`text-xl mb-8 leading-relaxed ${
              resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {post.excerpt}
            </p>

            {/* Author & Meta Info */}
            <div className={`flex flex-wrap items-center justify-between gap-6 p-6 rounded-2xl border-2 ${
              resolvedTheme === 'dark'
                ? 'bg-slate-800/50 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  resolvedTheme === 'dark'
                    ? 'bg-amber-700 text-white'
                    : 'bg-amber-500 text-white'
                }`}>
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className={`font-semibold ${
                    resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {post.author}
                  </div>
                  <div className={`text-sm ${
                    resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {post.date}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className={`flex items-center gap-2 ${
                  resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className={`flex items-center gap-2 ${
                  resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <Eye className="w-4 h-4" />
                  <span>{Math.floor(Math.random() * 5000) + 1000} views</span>
                </div>
              </div>
            </div>

            {/* Engagement Actions */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  liked
                    ? 'bg-red-500 text-white'
                    : resolvedTheme === 'dark'
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span>{liked ? 'Liked' : 'Like'}</span>
              </button>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  bookmarked
                    ? 'bg-amber-500 text-white'
                    : resolvedTheme === 'dark'
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                <span>{bookmarked ? 'Saved' : 'Save'}</span>
              </button>
              <button className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                resolvedTheme === 'dark'
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}>
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                resolvedTheme === 'dark'
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}>
                <MessageCircle className="w-4 h-4" />
                <span>Comment</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className={`px-4 sm:px-6 lg:px-8 ${
        resolvedTheme === 'dark' ? 'bg-slate-950' : 'bg-white'
      }`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${
        resolvedTheme === 'dark' ? 'bg-slate-950' : 'bg-white'
      }`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`prose prose-lg max-w-none ${
              resolvedTheme === 'dark'
                ? 'prose-invert prose-headings:text-white prose-p:text-slate-300 prose-strong:text-red-400 prose-a:text-red-400'
                : 'prose-headings:text-slate-900 prose-p:text-slate-700 prose-strong:text-red-600 prose-a:text-red-600'
            }`}
          >
            <div className={`text-lg leading-relaxed whitespace-pre-line ${
              resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {post.content}
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3 mt-12 pt-8 border-t"
          >
            <span className={`text-sm font-semibold ${
              resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Tags:
            </span>
            {[post.category, 'Car Rental', 'Travel', 'Tips'].map((tag, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  resolvedTheme === 'dark'
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                #{tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Author Bio */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${
        resolvedTheme === 'dark'
          ? 'bg-slate-900 border-y border-slate-800'
          : 'bg-slate-50 border-y border-slate-200'
      }`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-8 rounded-2xl ${
              resolvedTheme === 'dark'
                ? 'bg-slate-800 border border-slate-700'
                : 'bg-white border border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0 ${
                resolvedTheme === 'dark'
                  ? 'bg-amber-700 text-white'
                  : 'bg-amber-500 text-white'
              }`}>
                {post.author.charAt(0)}
              </div>
              <div className="flex-grow">
                <h3 className={`text-2xl font-bold mb-2 ${
                  resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {post.author}
                </h3>
                <p className={`text-sm mb-4 ${
                  resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Automotive enthusiast and travel expert sharing insights about car rentals, driving tips, and exploring the beautiful roads of Cameroon.
                </p>
                <button className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                  resolvedTheme === 'dark'
                    ? 'text-amber-400 hover:text-amber-300'
                    : 'text-amber-600 hover:text-amber-500'
                }`}>
                  View all posts by {post.author}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${
        resolvedTheme === 'dark' ? 'bg-slate-950' : 'bg-white'
      }`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${
              resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              <span className="w-1 h-10 bg-red-500 rounded-full"></span>
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter((p) => p.id !== post.id)
                .slice(0, 4)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className={`group rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:scale-105 h-full flex flex-col ${
                      resolvedTheme === 'dark'
                        ? 'bg-slate-800 border-slate-700 hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/20'
                        : 'bg-slate-50 border-slate-200 hover:border-red-500 hover:shadow-2xl hover:shadow-red-400/20'
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {relatedPost.featured && (
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                          resolvedTheme === 'dark'
                            ? 'bg-amber-700/90 text-white'
                            : 'bg-amber-500/90 text-white'
                        }`}>
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className={`text-xs font-bold mb-2 tracking-widest ${
                        resolvedTheme === 'dark' ? 'text-red-400' : 'text-red-600'
                      }`}>
                        {relatedPost.category}
                      </div>
                      <h3 className={`text-lg font-bold mb-3 line-clamp-2 transition-colors duration-300 ${
                        resolvedTheme === 'dark'
                          ? 'text-white group-hover:text-red-400'
                          : 'text-slate-900 group-hover:text-red-600'
                      }`}>
                        {relatedPost.title}
                      </h3>
                      <div className={`flex items-center gap-4 text-xs mt-auto pt-4 border-t ${
                        resolvedTheme === 'dark' ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-600'
                      }`}>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {relatedPost.readTime} min
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {relatedPost.author}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${
        resolvedTheme === 'dark'
          ? 'bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-800'
          : 'bg-gradient-to-r from-slate-100 to-white border-t border-slate-200'
      }`}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-4xl font-bold mb-6 ${
              resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Stay Updated with <span className="text-red-500">Drivana Insights</span>
            </h2>
            <p className={`text-lg mb-8 ${
              resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Subscribe to our newsletter for the latest automotive tips, travel guides, and exclusive offers.
            </p>

            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-6 py-4 rounded-2xl outline-none transition-all font-medium ${
                  resolvedTheme === 'dark'
                    ? 'bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 focus:border-red-500'
                    : 'bg-white border-2 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-red-500'
                }`}
              />
              <button className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                resolvedTheme === 'dark'
                  ? 'bg-red-700 hover:bg-red-600 text-white shadow-lg shadow-red-900/40 hover:shadow-red-900/60'
                  : 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50'
              }`}>
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
