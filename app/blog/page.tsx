"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";
import { blogPosts, type BlogPost } from "@/data/blogData";
import { motion } from "framer-motion";
import { Search, ChevronRight, Clock, User, Tag, Calendar } from "lucide-react";

const categories = [
  "All",
  "Travel Tips",
  "Sustainability",
  "Cost Saving",
  "Insurance",
  "Vehicle Reviews",
  "Business",
];

export default function BlogPage() {
  const { resolvedTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Get featured posts (first 3)
  const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 3);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        resolvedTheme === "dark" ? "bg-slate-950" : "bg-white"
      }`}
    >
      {/* Header Section */}
      <section className={`pt-32 pb-16 px-4 sm:px-6 lg:px-8 ${
        resolvedTheme === 'dark'
          ? 'bg-gradient-to-b from-slate-900 to-slate-950'
          : 'bg-gradient-to-b from-white to-slate-50'
      }`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className={`text-5xl sm:text-6xl font-black mb-6 tracking-tight ${
            resolvedTheme === 'dark'
              ? 'text-white'
              : 'text-slate-900'
          }`}>
            Discover Auto <span className="text-red-500">Insights</span>
          </h1>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${
            resolvedTheme === 'dark'
              ? 'text-slate-400'
              : 'text-slate-600'
          }`}>
            Expert tips, industry trends, and everything you need to know about car rental, driving, and automotive lifestyle.
          </p>

          {/* Search Bar */}
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              resolvedTheme === 'dark' ? 'text-amber-500' : 'text-amber-600'
            }`} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-6 py-4 text-lg rounded-2xl border-2 outline-none transition-all font-medium ${
                resolvedTheme === 'dark'
                  ? 'bg-slate-800/50 border-amber-700/40 text-white placeholder-slate-500 focus:border-amber-500'
                  : 'bg-slate-50 border-amber-300/40 text-slate-900 placeholder-slate-600 focus:border-amber-500'
              }`}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Posts Section */}
      {filteredPosts.length === blogPosts.length && (
        <section className={`py-16 px-4 sm:px-6 lg:px-8 ${
          resolvedTheme === 'dark' ? 'bg-slate-950' : 'bg-white'
        }`}>
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-4xl font-bold mb-12 flex items-center gap-3 ${
                resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              <span className="w-1 h-10 bg-amber-500 rounded-full"></span>
              Featured Stories
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {featuredPosts.map((post, index) => (
                <Link href={`/blog/${post.id}`} key={post.id}>
                  <motion.article
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                    className={`group rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:scale-105 h-full flex flex-col ${
                      resolvedTheme === 'dark'
                        ? 'bg-slate-800 border-slate-700 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/20'
                        : 'bg-slate-50 border-slate-200 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-400/20'
                    }`}
                  >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      resolvedTheme === 'dark'
                        ? 'bg-amber-700/90 text-white'
                        : 'bg-amber-500/90 text-white'
                    }`}>
                      Featured
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className={`text-xs font-bold mb-2 tracking-widest ${
                      resolvedTheme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                    }`}>
                      {post.category}
                    </div>
                    <h3 className={`text-xl font-bold mb-3 line-clamp-2 transition-colors duration-300 ${
                      resolvedTheme === 'dark'
                        ? 'text-white group-hover:text-amber-400'
                        : 'text-slate-900 group-hover:text-amber-600'
                    }`}>
                      {post.title}
                    </h3>
                    <p className={`text-sm mb-4 line-clamp-2 ${
                      resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className={`flex items-center gap-4 text-xs mb-4 pb-4 border-b ${
                      resolvedTheme === 'dark' ? 'border-slate-700' : 'border-slate-200'
                    }`}>
                      <div className="flex items-center gap-1">
                        <Clock className={`w-3 h-3 ${
                          resolvedTheme === 'dark' ? 'text-amber-500' : 'text-amber-600'
                        }`} />
                        <span className={resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                          {post.readTime} min
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className={`w-3 h-3 ${
                          resolvedTheme === 'dark' ? 'text-amber-500' : 'text-amber-600'
                        }`} />
                        <span className={resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                          {post.date}
                        </span>
                      </div>
                    </div>

                    {/* Author & Read More */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className={`w-3 h-3 ${
                          resolvedTheme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                        }`} />
                        <span className={`text-xs ${
                          resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {post.author}
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-2 ${
                        resolvedTheme === 'dark' ? 'text-amber-500' : 'text-amber-600'
                      }`} />
                    </div>
                  </div>
                </motion.article>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className={`py-12 px-4 sm:px-6 lg:px-8 border-b ${
        resolvedTheme === 'dark'
          ? 'bg-slate-950 border-slate-800'
          : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-3 items-center"
          >
            <span className={`text-sm font-bold tracking-widest ${
              resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              FILTER BY:
            </span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${
                  selectedCategory === category
                    ? resolvedTheme === 'dark'
                      ? 'bg-amber-700 border-amber-600 text-white'
                      : 'bg-amber-500 border-amber-400 text-white'
                    : resolvedTheme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-slate-400 hover:border-amber-600'
                    : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-amber-400'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${
        resolvedTheme === 'dark' ? 'bg-slate-950' : 'bg-white'
      }`}>
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`text-2xl font-bold mb-12 flex items-center gap-3 ${
                  resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                <span className="w-1 h-8 bg-amber-500 rounded-full"></span>
                All Articles {filteredPosts.length > 0 && `(${filteredPosts.length})`}
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {filteredPosts.map((post) => (
                  <Link href={`/blog/${post.id}`} key={post.id}>
                    <motion.article
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                      }}
                      className={`group rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:scale-105 h-full flex flex-col ${
                        resolvedTheme === 'dark'
                          ? 'bg-slate-800 border-slate-700 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/20'
                          : 'bg-slate-50 border-slate-200 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-400/20'
                      }`}
                    >
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`text-xs font-bold tracking-widest ${
                          resolvedTheme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                        }`}>
                          {post.category}
                        </div>
                        <div className={`text-xs flex items-center gap-1 ${
                          resolvedTheme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {post.readTime} min
                        </div>
                      </div>

                      <h3 className={`text-lg font-bold mb-3 line-clamp-2 transition-colors duration-300 ${
                        resolvedTheme === 'dark'
                          ? 'text-white group-hover:text-amber-400'
                          : 'text-slate-900 group-hover:text-amber-600'
                      }`}>
                        {post.title}
                      </h3>

                      <p className={`text-sm mb-6 line-clamp-3 ${
                        resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {post.excerpt}
                      </p>

                      {/* Footer */}
                      <div className={`flex items-center justify-between pt-4 border-t ${
                        resolvedTheme === 'dark' ? 'border-slate-700' : 'border-slate-200'
                      }`}>
                        <div className={`flex items-center gap-2 text-xs ${
                          resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          <User className="w-3 h-3" />
                          {post.author}
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-2 ${
                          resolvedTheme === 'dark' ? 'text-amber-500' : 'text-amber-600'
                        }`} />
                      </div>
                    </div>
                  </motion.article>
                  </Link>
                ))}
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-16 ${
                resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              <p className="text-xl font-semibold mb-2">No articles found</p>
              <p>Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
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
              Stay Updated with <span className="text-amber-500">Drivana Insights</span>
            </h2>
            <p className={`text-lg mb-8 ${
              resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Subscribe to our newsletter for the latest automotive tips, travel guides, and exclusive offers.
            </p>

            {/* Newsletter Form */}
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-6 py-4 rounded-2xl outline-none transition-all font-medium ${
                  resolvedTheme === 'dark'
                    ? 'bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500'
                    : 'bg-white border-2 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-amber-500'
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
