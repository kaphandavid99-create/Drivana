"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Fuel, Users, Zap, ArrowLeft, Trash2, CarFront, Star } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useWishlist } from "../contexts/WishlistContext";
import { localCars } from "../../data/carData";

type Car = {
  id: number;
  name: string;
  type: string;
  year: number;
  price: number;
  listingType: "rent" | "sell";
  image: string;
  seats: number;
  fuel: string;
  transmission: string;
  features: string[];
  rating?: number;
  reviews?: number;
};

const toyotaCars: Car[] = [
  {
    id: 1,
    name: "Toyota Camry",
    type: "Sedan",
    year: 2024,
    price: 51000,
    listingType: "rent",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80",
    seats: 5,
    fuel: "Hybrid",
    transmission: "Automatic",
    features: ["Bluetooth", "Backup Camera", "Cruise Control", "Lane Assist", "Leather Seats"],
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 2,
    name: "Toyota RAV4",
    type: "SUV",
    year: 2024,
    price: 32500000,
    listingType: "sell",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80",
    seats: 5,
    fuel: "Hybrid",
    transmission: "Automatic",
    features: ["AWD", "Apple CarPlay", "Sunroof", "Navigation", "Safety Suite"],
    rating: 4.8,
    reviews: 234,
  },
  {
    id: 3,
    name: "Toyota Corolla",
    type: "Sedan",
    year: 2024,
    price: 39000,
    listingType: "rent",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&q=80",
    seats: 5,
    fuel: "Gasoline",
    transmission: "Automatic",
    features: ["Lane Assist", "USB Ports", "Keyless Entry", "Bluetooth", "Backup Camera"],
    rating: 4.5,
    reviews: 189,
  },
];

function formatPrice(price: number, listingType: "rent" | "sell") {
  if (price > 100000) {
    return `${(price / 1000000).toFixed(1)}M FCFA`;
  }
  return `${price.toLocaleString()} FCFA`;
}

function priceSuffix(listingType: "rent" | "sell") {
  return listingType === "rent" ? "per day" : "total price";
}

export default function WishlistPage() {
  const { resolvedTheme } = useTheme();
  const { wishlist, removeFromWishlist } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const allCars = [...toyotaCars, ...(localCars as unknown as Car[])];
  const wishlistCars = allCars.filter((car) => wishlist.includes(car.id));

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 ${
        resolvedTheme === "dark" ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <Link href="/cars" className="inline-flex items-center gap-2">
              <span
                className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border-2 ${
                  resolvedTheme === "dark"
                    ? "bg-slate-900 border-slate-800 hover:border-red-500/60"
                    : "bg-white border-slate-200 hover:border-red-400/60"
                }`}
              >
                <ArrowLeft className={resolvedTheme === "dark" ? "text-slate-200" : "text-slate-700"} />
              </span>
            </Link>
            <div>
              <h1
                className={`text-4xl md:text-5xl font-bold tracking-tight ${
                  resolvedTheme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                My Wishlist
              </h1>
              <p
                className={`text-sm mt-1 ${
                  resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {wishlistCars.length} {wishlistCars.length === 1 ? "car" : "cars"} saved
              </p>
            </div>
          </div>
        </motion.div>

        {/* Empty State */}
        {wishlistCars.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`rounded-3xl border-2 border-dashed p-16 text-center ${
              resolvedTheme === "dark"
                ? "bg-slate-900/50 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-100"
              }`}
            >
              <Heart
                className={`w-10 h-10 ${
                  resolvedTheme === "dark" ? "text-slate-600" : "text-slate-400"
                }`}
              />
            </div>
            <h2
              className={`text-2xl font-bold mb-3 ${
                resolvedTheme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Your wishlist is empty
            </h2>
            <p
              className={`mb-8 ${
                resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Start adding cars you love by clicking the heart icon on any car card
            </p>
            <Link href="/cars">
              <button
                className={`px-8 py-3 rounded-xl font-bold transition-all border-2 ${
                  resolvedTheme === "dark"
                    ? "bg-sky-500 hover:bg-sky-600 border-sky-400 text-white"
                    : "bg-sky-500 hover:bg-sky-600 border-sky-400 text-white"
                }`}
              >
                Browse Cars
              </button>
            </Link>
          </motion.div>
        ) : (
          /* Cars Grid */
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {wishlistCars.map((car) => (
              <motion.div
                key={car.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className={`group rounded-3xl overflow-hidden border-2 transition-all duration-500 h-full flex flex-col ${
                  resolvedTheme === "dark"
                    ? "bg-slate-900/80 border-slate-800 hover:border-red-500/60 hover:shadow-2xl hover:shadow-red-900/30"
                    : "bg-white border-slate-200 hover:border-red-400/60 hover:shadow-2xl hover:shadow-red-500/20"
                } backdrop-blur-xl`}
              >
                {/* Image Container */}
                <div className="relative h-48 bg-slate-800 overflow-hidden">
                  <Link href={`/cars/${car.id}`} className="absolute inset-0 z-0">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      priority
                    />
                  </Link>
                  {/* Overlay Gradient */}
                  <div
                    className={`absolute inset-0 ${
                      resolvedTheme === "dark"
                        ? "bg-gradient-to-t from-slate-900 via-transparent to-transparent"
                        : "bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"
                    }`}
                  />

                  {/* Badges Container */}
                  <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
                    {/* Type & Year Badges */}
                    <div className="flex gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md border ${
                          car.listingType === "rent"
                            ? "bg-emerald-500/80 border-emerald-400 text-white"
                            : "bg-red-500/80 border-red-400 text-white"
                        }`}
                      >
                        {car.listingType === "rent" ? "RENT" : "SALE"}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md border ${
                          resolvedTheme === "dark"
                            ? "bg-slate-800/80 border-slate-700 text-slate-300"
                            : "bg-white/80 border-slate-300 text-slate-800"
                        }`}
                      >
                        {car.year}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromWishlist(car.id)}
                      className={`p-2 rounded-full backdrop-blur-md border-2 transition-all hover:scale-110 ${
                        resolvedTheme === "dark"
                          ? "bg-red-500/80 border-red-400 shadow-lg shadow-red-500/50"
                          : "bg-red-500/80 border-red-400 shadow-lg shadow-red-500/50"
                      }`}
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div
                  className={`p-4 flex flex-col flex-grow ${
                    resolvedTheme === "dark" ? "bg-slate-900" : "bg-white"
                  }`}
                >
                  {/* Title & Rating */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3
                        className={`text-base font-bold line-clamp-1 tracking-tight ${
                          resolvedTheme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {car.name}
                      </h3>
                      <p
                        className={`text-[10px] font-medium tracking-wide ${
                          resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"
                        }`}
                      >
                        {car.type}
                      </p>
                    </div>
                    {/* Rating */}
                    {car.rating && (
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                          resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-100"
                        }`}
                      >
                        <Star className={`w-3 h-3 fill-amber-500 text-amber-500`} />
                        <span
                          className={`text-[10px] font-bold ${
                            resolvedTheme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {car.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div
                    className={`mb-3 pb-3 border-b ${
                      resolvedTheme === "dark" ? "border-slate-800" : "border-slate-200"
                    }`}
                  >
                    <p
                      className={`text-lg font-bold ${
                        resolvedTheme === "dark" ? "text-red-400" : "text-red-600"
                      }`}
                    >
                      {formatPrice(car.price)}
                    </p>
                    <p
                      className={`text-[10px] ${
                        resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {priceSuffix(car.listingType)}
                    </p>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {/* Seats */}
                    <div
                      className={`flex flex-col items-center p-1.5 rounded-lg border-2 transition-all ${
                        resolvedTheme === "dark"
                          ? "bg-slate-800/50 border-slate-700 hover:border-red-600"
                          : "bg-slate-50 border-slate-200 hover:border-red-400"
                      }`}
                    >
                      <Users
                        className={`w-3 h-3 mb-1 ${
                          resolvedTheme === "dark" ? "text-red-400" : "text-red-600"
                        }`}
                      />
                      <span
                        className={`text-[9px] font-bold ${
                          resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        {car.seats}
                      </span>
                    </div>

                    {/* Fuel */}
                    <div
                      className={`flex flex-col items-center p-1.5 rounded-lg border-2 transition-all ${
                        resolvedTheme === "dark"
                          ? "bg-slate-800/50 border-slate-700 hover:border-red-600"
                          : "bg-slate-50 border-slate-200 hover:border-red-400"
                      }`}
                    >
                      <Fuel
                        className={`w-3 h-3 mb-1 ${
                          resolvedTheme === "dark" ? "text-red-400" : "text-red-600"
                        }`}
                      />
                      <span
                        className={`text-[9px] font-bold ${
                          resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        {car.fuel}
                      </span>
                    </div>

                    {/* Transmission */}
                    <div
                      className={`flex flex-col items-center p-1.5 rounded-lg border-2 transition-all ${
                        resolvedTheme === "dark"
                          ? "bg-slate-800/50 border-slate-700 hover:border-red-600"
                          : "bg-slate-50 border-slate-200 hover:border-red-400"
                      }`}
                    >
                      <Zap
                        className={`w-3 h-3 mb-1 ${
                          resolvedTheme === "dark" ? "text-red-400" : "text-red-600"
                        }`}
                      />
                      <span
                        className={`text-[9px] font-bold ${
                          resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        {car.transmission === "Automatic" ? "Auto" : "Manual"}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href={`/cars/${car.id}`} className="mt-auto">
                    <button
                      className={`w-full py-2 rounded-xl font-bold text-xs transition-all border-2 tracking-wide ${
                        resolvedTheme === "dark"
                          ? "bg-red-700 hover:bg-red-600 border-red-600 hover:border-red-500 text-white shadow-lg shadow-red-900/40 hover:shadow-red-900/60"
                          : "bg-red-500 hover:bg-red-600 border-red-400 hover:border-red-500 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
                      }`}
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
