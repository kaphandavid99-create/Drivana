 "use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../contexts/ThemeContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { Heart, Fuel, Users, Zap, Star, ArrowLeft, CarFront, Shield, Clock, MapPin, Calendar, Check, Share2, Phone, Mail } from "lucide-react";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { localCars } from "../../../data/carData";

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

type Props = {
  carId: string;
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

export default function CarDetailClient({ carId }: Props) {
  const { resolvedTheme } = useTheme();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const allCars = useMemo(() => [...toyotaCars, ...localCars], []);
  const car = useMemo(() => {
    const idNum = Number(carId);
    return allCars.find((c) => c.id === idNum);
  }, [allCars, carId]);

  if (!car) {
    return (
      <div
        className={`min-h-screen py-16 px-4 sm:px-6 lg:px-10 ${
          resolvedTheme === "dark" ? "bg-slate-950" : "bg-slate-50"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border-2 border-dashed p-10 text-center">
            <h1 className="text-3xl font-black">
              Car not found
            </h1>
            <p className="mt-3 font-bold">
              We couldn't find a vehicle for ID: {carId}.
            </p>
            <div className="mt-6">
              <Link
                href="/cars"
                className="inline-flex items-center justify-center px-6 py-3 rounded-2xl border-2 font-black"
              >
                Back to Cars
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(car.id);

  const images = [car.image, car.image, car.image]; // In real app, you'd have multiple images

  return (
    <div
      className={`min-h-screen ${
        resolvedTheme === "dark" ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          resolvedTheme === "dark" ? "bg-sky-500" : "bg-sky-400"
        } animate-pulse`} />
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          resolvedTheme === "dark" ? "bg-red-500" : "bg-red-400"
        } animate-pulse delay-1000`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back + Wishlist + Share */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between gap-4 mb-8"
        >
          <Link href="/cars" className="inline-flex items-center gap-2 group">
            <span
              className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl border-2 transition-all duration-300 group-hover:scale-110 ${
                resolvedTheme === "dark"
                  ? "bg-slate-900 border-slate-800 hover:border-sky-500/60"
                  : "bg-white border-slate-200 hover:border-sky-400/60"
              }`}
            >
              <ArrowLeft className={resolvedTheme === "dark" ? "text-slate-200" : "text-slate-700"} />
            </span>
            <span className={`font-bold text-lg ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>Back to Cars</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className={`p-3 rounded-full border-2 backdrop-blur-md transition-all hover:scale-110 ${
                  resolvedTheme === "dark"
                    ? "bg-slate-900/50 border-slate-700 hover:bg-slate-800/80"
                    : "bg-white/80 border-slate-300 hover:bg-white"
                }`}
                aria-label="Share"
              >
                <Share2 className={resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"} />
              </button>
              <AnimatePresence>
                {showShareMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className={`absolute right-0 top-full mt-2 w-48 rounded-2xl border-2 p-2 z-50 ${
                      resolvedTheme === "dark"
                        ? "bg-slate-900 border-slate-800"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <button className="w-full px-4 py-2 text-left rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold text-sm">
                      Copy Link
                    </button>
                    <button className="w-full px-4 py-2 text-left rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold text-sm">
                      Share on WhatsApp
                    </button>
                    <button className="w-full px-4 py-2 text-left rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold text-sm">
                      Share on Facebook
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={toggleWishlist}
              className={`p-3 rounded-full border-2 backdrop-blur-md transition-all hover:scale-110 ${
                isWishlisted
                  ? "bg-red-500/80 border-red-400 shadow-lg shadow-red-500/50"
                  : resolvedTheme === "dark"
                    ? "bg-slate-900/50 border-slate-700 hover:bg-slate-800/80"
                    : "bg-white/80 border-slate-300 hover:bg-white"
              }`}
              aria-label="Add to wishlist"
            >
              <Heart
                className={
                  isWishlisted
                    ? "fill-white text-white"
                    : resolvedTheme === "dark"
                      ? "text-slate-400"
                      : "text-slate-600"
                }
              />
            </button>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden border-2 border-slate-200/70 aspect-video"
            >
              <Image
                src={images[activeImageIndex]}
                alt={car.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
              <div
                className={`absolute inset-0 ${
                  resolvedTheme === "dark"
                    ? "bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"
                    : "bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"
                }`}
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold border-2 backdrop-blur-md ${
                    car.listingType === "rent"
                      ? resolvedTheme === "dark"
                        ? "bg-emerald-500/80 border-emerald-400 text-white"
                        : "bg-emerald-500/80 border-emerald-500 text-white"
                      : resolvedTheme === "dark"
                        ? "bg-red-500/80 border-red-400 text-white"
                        : "bg-red-500/80 border-red-500 text-white"
                  }`}
                >
                  {car.listingType === "rent" ? "FOR RENT" : "FOR SALE"}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold border-2 backdrop-blur-md ${
                    resolvedTheme === "dark"
                      ? "bg-slate-900/80 border-slate-700 text-white"
                      : "bg-white/80 border-slate-300 text-slate-800"
                  }`}
                >
                  {car.year}
                </motion.span>
              </div>

              {/* Rating */}
              {car.rating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`absolute bottom-4 right-4 flex items-center gap-2 rounded-2xl border-2 px-4 py-3 backdrop-blur-md ${
                    resolvedTheme === "dark" ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200"
                  }`}
                >
                  <Star className="text-amber-500" fill="currentColor" size={20} />
                  <div className={`${resolvedTheme === "dark" ? "text-white" : "text-slate-900"} font-black`}>
                    {car.rating}{" "}
                    <span className={`${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"} font-bold text-sm`}>
                      ({car.reviews} reviews)
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative rounded-2xl overflow-hidden border-2 aspect-video transition-all duration-300 hover:scale-105 ${
                    activeImageIndex === idx
                      ? "border-sky-500 ring-2 ring-sky-500/50"
                      : "border-slate-200/70"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${car.name} view ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 22vw"
                  />
                  {activeImageIndex === idx && (
                    <div className="absolute inset-0 bg-sky-500/20" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Car Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`rounded-3xl border-2 p-6 ${
                resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <h2 className={`text-2xl font-black mb-6 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                Vehicle Specifications
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <Users className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} size={24} />
                  <div className={`mt-2 text-2xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {car.seats}
                  </div>
                  <div className={`text-xs font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Seats
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <Fuel className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} size={24} />
                  <div className={`mt-2 text-2xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {car.fuel}
                  </div>
                  <div className={`text-xs font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Fuel Type
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <Zap className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} size={24} />
                  <div className={`mt-2 text-2xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {car.transmission === "Automatic" ? "Auto" : "Manual"}
                  </div>
                  <div className={`text-xs font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Transmission
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <CarFront className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} size={24} />
                  <div className={`mt-2 text-2xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {car.type}
                  </div>
                  <div className={`text-xs font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Body Type
                  </div>
                </motion.div>
              </div>

              <div className="mt-6">
                <h3 className={`text-lg font-black mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Premium Features
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {car.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + (idx * 0.05) }}
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                        resolvedTheme === "dark"
                          ? "bg-slate-950/30 border-slate-800 text-slate-200"
                          : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    >
                      <Check className="text-sky-500" size={16} />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Why You'll Love It */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`rounded-3xl border-2 p-6 ${
                resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <h2 className={`text-2xl font-black mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                Why You'll Love This Vehicle
              </h2>
              <ul className={`space-y-3 text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-200" : "text-slate-700"}`}>
                <li className="flex items-start gap-3">
                  <Shield className="text-sky-500 flex-shrink-0 mt-0.5" size={20} />
                  <span>Clean, reliable spec with well-rounded comfort for daily driving</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="text-sky-500 flex-shrink-0 mt-0.5" size={20} />
                  <span>Built for everyday commuting or weekend escapes</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-sky-500 flex-shrink-0 mt-0.5" size={20} />
                  <span>Loaded with premium features to match your lifestyle</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="text-sky-500 flex-shrink-0 mt-0.5" size={20} />
                  <span>Perfect for city driving and long-distance journeys</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`rounded-3xl border-2 p-6 sticky top-6 ${
                resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              {/* Car Name */}
              <div className="mb-6">
                <h1 className={`text-3xl font-black tracking-tight ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {car.name}
                </h1>
                <p className={`mt-1 text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {car.year} • {car.type}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b-2">
                <div className={`text-4xl font-black ${resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"}`}>
                  {formatPrice(car.price, car.listingType)}
                </div>
                <div className={`mt-1 text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {priceSuffix(car.listingType)}
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    Pick-up Date
                  </label>
                  <div className="relative">
                    <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`} size={18} />
                    <input
                      type="date"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                        resolvedTheme === "dark"
                          ? "bg-slate-950/30 border-slate-800 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    Return Date
                  </label>
                  <div className="relative">
                    <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`} size={18} />
                    <input
                      type="date"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                        resolvedTheme === "dark"
                          ? "bg-slate-950/30 border-slate-800 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`} size={18} />
                    <input
                      type="text"
                      placeholder="Enter city or airport"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 font-bold text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                        resolvedTheme === "dark"
                          ? "bg-slate-950/30 border-slate-800 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link href={car.listingType === "rent" ? "/cars" : "/cars"} className="block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-2xl font-black text-lg border-2 tracking-wide transition-all ${
                    resolvedTheme === "dark"
                      ? "bg-sky-600 hover:bg-sky-500 border-sky-500 hover:border-sky-400 text-white shadow-lg shadow-sky-900/40 hover:shadow-sky-900/60"
                      : "bg-sky-500 hover:bg-sky-600 border-sky-400 hover:border-sky-500 text-white shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50"
                  }`}
                >
                  {car.listingType === "rent" ? "Rent This Car" : "Buy This Car"}
                </motion.button>
              </Link>

              {/* Contact Options */}
              <div className="mt-6 pt-6 border-t-2 space-y-3">
                <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-bold transition-all hover:scale-105 ${
                  resolvedTheme === "dark"
                    ? "bg-slate-950/30 border-slate-800 text-slate-200 hover:bg-slate-800"
                    : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
                }`}>
                  <Phone size={18} />
                  Call Us
                </button>
                <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-bold transition-all hover:scale-105 ${
                  resolvedTheme === "dark"
                    ? "bg-slate-950/30 border-slate-800 text-slate-200 hover:bg-slate-800"
                    : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
                }`}>
                  <Mail size={18} />
                  Email Us
                </button>
              </div>

              {/* Info */}
              <div className="mt-6 text-xs font-bold leading-relaxed">
                <div className={resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}>
                  ✓ Free cancellation up to 24 hours before pickup
                </div>
                <div className={resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}>
                  ✓ Includes insurance and roadside assistance
                </div>
                <div className={resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}>
                  ✓ No hidden fees or charges
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
