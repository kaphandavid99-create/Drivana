"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Users, Fuel, Gauge, ChevronRight, Star } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useWishlist } from "../contexts/WishlistContext";
import { localCars, rentCars } from "../../data/carData";

// Combine both sell and rent cars for featured section
const allFeaturedCars = [...localCars.slice(0, 2), ...rentCars.slice(0, 2)];
const featuredCars = allFeaturedCars.slice(0, 4);

export default function FeaturedCars() {
  const { resolvedTheme } = useTheme();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const formatPrice = (price: number, listingType?: string) => {
    // For rental prices, use thousands (K) instead of millions (M)
    if (listingType === 'rent') {
      if (price >= 1000) {
        return `${(price / 1000).toFixed(0)}K FCFA`;
      }
      return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} FCFA`;
    }
    // For sale prices, use millions (M)
    if (price > 100000) {
      return `${(price / 1000000).toFixed(1)}M FCFA`;
    }
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} FCFA`;
  };

  return (
    <section className={`pt-20 pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden ${
      resolvedTheme === 'dark' ? 'bg-gray-900' : 'bg-background'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-sky-400">Inventory</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our exclusive collection of premium vehicles available for rent or purchase.
          </p>
        </div>

        {/* Car Grid - Enhanced Design with Larger Images */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {featuredCars.map((car) => (
            <motion.div
              key={car.id}
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
              className={`group relative flex flex-col rounded-3xl overflow-hidden border-2 transition-all duration-500 h-full ${
                resolvedTheme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800 hover:border-sky-500/60 hover:shadow-2xl hover:shadow-sky-900/30'
                  : 'bg-white border-slate-200 hover:border-sky-400/60 hover:shadow-2xl hover:shadow-sky-500/20'
              } backdrop-blur-xl`}
            >
              {/* Image Container - More Visible */}
              <div className="relative z-10 h-40 bg-slate-800 overflow-hidden">
                <Image
                  src={car.images?.exterior || "/placeholder-car.jpg"}
                  alt={car.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-110 contrast-105 saturate-110"
                  priority
                />
                {/* Overlay Gradient */}
                <div className={`absolute inset-0 ${
                  resolvedTheme === 'dark'
                    ? 'bg-gradient-to-t from-slate-900 via-transparent to-transparent'
                    : 'bg-gradient-to-t from-slate-900/60 via-transparent to-transparent'
                }`} />

                {/* Badges Container */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-none">
                  {/* Type & Year Badges */}
                  <div className="flex gap-2 pointer-events-auto">
                    <span className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md border ${
                      car.listingType === 'rent'
                        ? 'bg-emerald-500/80 border-emerald-400 text-white'
                        : 'bg-red-500/80 border-red-400 text-white'
                    }`}>
                      {car.listingType === 'rent' ? 'RENT' : 'SALE'}
                    </span>
                    <span className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md border ${
                      resolvedTheme === 'dark'
                        ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                        : 'bg-white/80 border-slate-300 text-slate-800'
                    }`}>
                      {car.year}
                    </span>
                  </div>

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(car.id);
                    }}
                    className={`p-3 rounded-full backdrop-blur-md border-2 transition-all hover:scale-110 bg-white border-slate-300 pointer-events-auto cursor-pointer ${
                      isWishlisted(car.id) ? 'shadow-lg shadow-red-500/50' : ''
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted(car.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-black'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Content Section */}
              <div className={`relative z-10 p-3 flex flex-col flex-grow ${
                resolvedTheme === 'dark' ? 'bg-slate-900' : 'bg-white'
              }`}>
                {/* Title & Rating */}
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className={`text-lg font-bold line-clamp-1 tracking-tight ${
                      resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      {car.name}
                    </h3>
                    <p className={`text-xs font-medium tracking-wide ${
                      resolvedTheme === 'dark' ? 'text-sky-400' : 'text-sky-600'
                    }`}>
                      {car.type}
                    </p>
                  </div>
                  {/* Rating */}
                  {car.rating && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                      resolvedTheme === 'dark'
                        ? 'bg-slate-800'
                        : 'bg-slate-100'
                    }`}>
                      <Star className={`w-3.5 h-3.5 fill-amber-500 text-amber-500`} />
                      <span className={`text-xs font-bold ${
                        resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        {car.rating}
                      </span>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className={`mb-4 pb-4 border-b ${
                  resolvedTheme === 'dark' ? 'border-slate-800' : 'border-slate-200'
                }`}>
                  <p className={`text-xs line-through ${
                    resolvedTheme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    {formatPrice(car.strikingPrice || car.price, car.listingType)}
                  </p>
                  <p className={`text-xl font-bold ${
                    resolvedTheme === 'dark' ? 'text-red-400' : 'text-red-600'
                  }`}>
                    {formatPrice(car.realPrice || car.price, car.listingType)}
                  </p>
                  <p className={`text-xs ${
                    resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {car.listingType === 'rent' ? 'per day' : 'total price'}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {/* Seats */}
                  <div className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${
                    resolvedTheme === 'dark'
                      ? 'bg-slate-800/50 border-slate-700 hover:border-red-600'
                      : 'bg-slate-50 border-slate-200 hover:border-red-400'
                  }`}>
                    <Users className={`w-4 h-4 mb-1 ${
                      resolvedTheme === 'dark' ? 'text-red-400' : 'text-red-600'
                    }`} />
                    <span className={`text-[10px] font-bold ${
                      resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {car.seats}
                    </span>
                  </div>

                  {/* Fuel */}
                  <div className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${
                    resolvedTheme === 'dark'
                      ? 'bg-slate-800/50 border-slate-700 hover:border-red-600'
                      : 'bg-slate-50 border-slate-200 hover:border-red-400'
                  }`}>
                    <Fuel className={`w-4 h-4 mb-1 ${
                      resolvedTheme === 'dark' ? 'text-red-400' : 'text-red-600'
                    }`} />
                    <span className={`text-[10px] font-bold ${
                      resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {car.fuel}
                    </span>
                  </div>

                  {/* Transmission */}
                  <div className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${
                    resolvedTheme === 'dark'
                      ? 'bg-slate-800/50 border-slate-700 hover:border-red-600'
                      : 'bg-slate-50 border-slate-200 hover:border-red-400'
                  }`}>
                    <Gauge className={`w-4 h-4 mb-1 ${
                      resolvedTheme === 'dark' ? 'text-red-400' : 'text-red-600'
                    }`} />
                    <span className={`text-[10px] font-bold ${
                      resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {car.transmission === 'Automatic' ? 'Auto' : 'Manual'}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-2">
                  <div className="flex flex-wrap gap-1.5">
                    {car.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded text-[10px] font-medium ${
                          resolvedTheme === 'dark'
                            ? 'bg-slate-800 text-slate-300 border border-slate-700'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                    {car.features.length > 3 && (
                      <span className={`px-2 py-1 rounded text-[10px] font-medium ${
                        resolvedTheme === 'dark'
                          ? 'bg-slate-800 text-slate-400 border border-slate-700'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        +{car.features.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <Link href={`/cars/${car.id}`}>
                    <button
                      type="button"
                      className={`w-full py-2 rounded-xl font-bold text-sm transition-all border-2 tracking-wide ${
                        resolvedTheme === 'dark'
                          ? 'bg-red-700 hover:bg-red-600 border-red-600 hover:border-red-500 text-white shadow-lg shadow-red-900/40 hover:shadow-red-900/60'
                          : 'bg-red-500 hover:bg-red-600 border-red-400 hover:border-red-500 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50'
                      }`}
                    >
                      {car.listingType === 'rent' ? 'Rent Now' : 'Buy Now'}
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Cars Link */}
        <div className="text-center mt-12">
          <Link href="/cars">
            <button className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 flex items-center justify-center gap-3 mx-auto group ${
              resolvedTheme === 'dark'
                ? 'bg-black hover:bg-slate-900 border-sky-500 text-white shadow-lg shadow-sky-900/40 hover:shadow-sky-900/60'
                : 'bg-black hover:bg-slate-900 border-sky-400 text-white shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50'
            }`}>
              Start Your Journey
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
