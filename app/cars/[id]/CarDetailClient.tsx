 "use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "../../contexts/ThemeContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { useUser } from "@clerk/nextjs";
import { FaHeart, FaGasPump, FaUsers, FaBolt, FaStar, FaArrowLeft, FaArrowUp, FaCar, FaShieldAlt, FaClock, FaMapMarkerAlt, FaCalendar, FaCheck, FaShareAlt, FaPhone, FaEnvelope, FaCamera, FaTachometerAlt, FaCog, FaPalette, FaExpand, FaTimes, FaChevronLeft, FaChevronRight, FaEye, FaInfoCircle, FaAward, FaBluetooth, FaMap, FaMobileAlt, FaSnowflake, FaWind, FaVolumeUp, FaWifi, FaUser, FaComment, FaThumbsUp, FaDollarSign, FaFileAlt, FaCheckCircle, FaExclamationCircle, FaCreditCard, FaBuilding, FaWrench, FaSync } from "react-icons/fa";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { localCars, rentCars } from "../../../data/carData";

type Car = {
  id: number;
  name: string;
  type: string;
  year: number;
  price: number;
  listingType: "rent" | "sell";
  images?: {
    exterior: string;
    interior: string;
    dashboard: string;
    engine: string;
  };
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

function formatPrice(price: number, listingType: "rent" | "sell") {
  if (price > 100000) {
    return `${(price / 1000000).toFixed(1)}M FCFA`;
  }
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} FCFA`;
}

function priceSuffix(listingType: "rent" | "sell") {
  return listingType === "rent" ? "per day" : "total price";
}

export default function CarDetailClient({ carId }: Props) {
  const { resolvedTheme } = useTheme();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeView, setActiveView] = useState<'exterior' | 'interior' | 'dashboard' | 'engine'>('exterior');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const allCars = useMemo(() => [...localCars, ...rentCars], []);
  const car = useMemo(() => {
    console.log('=== Car Lookup Debug ===');
    console.log('carId received:', carId);
    console.log('carId type:', typeof carId);
    console.log('allCars count:', allCars.length);
    console.log('Available car IDs:', allCars.map(c => c.id));

    if (!carId || carId === 'undefined' || carId === '') {
      console.log('ERROR: carId is empty or invalid');
      return null;
    }

    const idNum = Number(carId);
    console.log('Converted idNum:', idNum, 'type:', typeof idNum);

    const foundCar = allCars.find((c) => c.id === idNum || String(c.id) === carId);
    console.log('Found car:', foundCar ? foundCar.name : 'NOT FOUND');

    return foundCar;
  }, [allCars, carId]);

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return (
      <div className={`min-h-screen py-16 px-4 sm:px-6 lg:px-10 flex items-center justify-center ${
        resolvedTheme === "dark" ? "bg-slate-950" : "bg-slate-50"
      }`}>
        <div className="max-w-md w-full rounded-3xl border-2 p-10 text-center">
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
            resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-200"
          }`}>
            <FaUser className={`text-4xl ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`} />
          </div>
          <h1 className="text-3xl font-black mb-4">Sign In Required</h1>
          <p className={`mb-8 font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
            You need to sign in to view car details
          </p>
          <div className="space-y-3">
            <Link
              href="/sign-in"
              className="block w-full py-3 px-6 rounded-2xl font-black text-base border-2 tracking-wide transition-all bg-sky-500 hover:bg-sky-600 border-sky-400 hover:border-sky-500 text-white shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50"
            >
              Sign In
            </Link>
            <Link
              href="/cars"
              className="block w-full py-3 px-6 rounded-2xl font-black text-base border-2 tracking-wide transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Back to Cars
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get current image based on active view
  const allImages = car?.images ? Object.values(car.images) : ['/Cars/2007 camaro concept/exterior.jpeg'];
  const currentImage = allImages[activeImageIndex];

  const colors = [
    { name: 'Midnight Black', hex: '#1a1a1a' },
    { name: 'Pearl White', hex: '#f5f5f5' },
    { name: 'Silver Metallic', hex: '#c0c0c0' },
    { name: 'Ocean Blue', hex: '#1e3a5f' },
    { name: 'Ruby Red', hex: '#8b0000' }
  ];

  if (!car) {
    return (
      <div className={`min-h-screen py-16 px-4 sm:px-6 lg:px-10 ${resolvedTheme === "dark" ? "bg-slate-950" : "bg-slate-50"}`}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border-2 border-dashed p-10 text-center">
            <h1 className="text-3xl font-black">Car not found</h1>
            <p className="mt-3 font-bold">We couldn't find a vehicle for ID: {carId}.</p>
            <div className="mt-6">
              <Link href="/cars" className="inline-flex items-center justify-center px-6 py-3 rounded-2xl border-2 font-black">
                Back to Cars
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 lg:pt-24 ${resolvedTheme === "dark" ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        {/* Back + Wishlist + Share */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between gap-4 mb-4 lg:mb-6"
        >
          <Link href="/cars" className="inline-flex items-center gap-2 group">
            <span
              className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl border-2 transition-all duration-300 group-hover:scale-110 ${
                resolvedTheme === "dark"
                  ? "bg-slate-900 border-slate-800 hover:border-sky-500/60"
                  : "bg-white border-slate-200 hover:border-sky-400/60"
              }`}
            >
              <FaArrowLeft className={resolvedTheme === "dark" ? "text-slate-200" : "text-slate-700"} />
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
                <FaShareAlt className={resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"} />
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
              onClick={() => toggleWishlist(car.id)}
              className={`p-3 rounded-full border-2 backdrop-blur-md transition-all hover:scale-110 ${
                isWishlisted(car.id)
                  ? "bg-red-500/80 border-red-400 shadow-lg shadow-red-500/50"
                  : resolvedTheme === "dark"
                    ? "bg-slate-900/50 border-slate-700 hover:bg-slate-800/80"
                    : "bg-white/80 border-slate-300 hover:bg-white"
              }`}
              aria-label="Add to wishlist"
            >
              <FaHeart
                className={
                  isWishlisted(car.id)
                    ? "text-white"
                    : resolvedTheme === "dark"
                      ? "text-slate-400"
                      : "text-slate-600"
                }
              />
            </button>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Left Column - Images & Views */}
          <div className="lg:col-span-2 space-y-3 lg:space-y-4 pb-20 lg:pb-0">
            {/* View Selector Tabs */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-2xl border-2 p-2 flex flex-wrap gap-2 ${
                resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              {[
                { id: 'exterior' as const, icon: FaCamera, label: 'Exterior' },
                { id: 'interior' as const, icon: FaEye, label: 'Interior' },
                { id: 'dashboard' as const, icon: FaTachometerAlt, label: 'Dashboard' },
                { id: 'engine' as const, icon: FaCog, label: 'Engine' }
              ].map((view) => (
                <motion.button
                  key={view.id}
                  onClick={() => { setActiveView(view.id); setActiveImageIndex(0); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    activeView === view.id
                      ? resolvedTheme === "dark"
                        ? "bg-sky-600 text-white shadow-lg shadow-sky-900/40"
                        : "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                      : resolvedTheme === "dark"
                        ? "text-slate-400 hover:bg-slate-800"
                        : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <view.icon className="text-lg" />
                  {view.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Main Image with Fullscreen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden border-2 border-slate-200/70 aspect-video group"
            >
              <Image
                src={currentImage}
                alt={`${car.name} - ${activeView}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
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
              
              {/* Fullscreen Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFullscreen(true)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border-2 transition-all ${
                  resolvedTheme === "dark"
                    ? "bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800"
                    : "bg-white/80 border-slate-300 text-slate-800 hover:bg-white"
                }`}
              >
                <FaExpand className="text-xl" />
              </motion.button>
              
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
                  <FaStar className="text-amber-500" />
                  <div className={`font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {car.rating}{" "}
                    <span className={`font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"} text-sm`}>
                      ({car.reviews} reviews)
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md border-2 transition-all ${
                      resolvedTheme === "dark"
                        ? "bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800"
                        : "bg-white/80 border-slate-300 text-slate-800 hover:bg-white"
                    }`}
                  >
                    <FaChevronLeft className="text-2xl" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md border-2 transition-all ${
                      resolvedTheme === "dark"
                        ? "bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800"
                        : "bg-white/80 border-slate-300 text-slate-800 hover:bg-white"
                    }`}
                  >
                    <FaChevronRight className="text-2xl" />
                  </motion.button>
                </>
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {allImages.map((img, idx) => (
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
                    alt={`${car.name} ${activeView} view ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 16vw"
                  />
                  {activeImageIndex === idx && (
                    <div className="absolute inset-0 bg-sky-500/20" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Car Basic Information Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`rounded-3xl border-2 p-6 ${
                resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Car Title and Rating */}
                <div className="flex-grow">
                  <h1 className={`text-3xl lg:text-4xl font-black tracking-tight mb-3 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {car.name}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {car.rating && (
                      <div className="flex items-center gap-2">
                        <FaStar className="text-amber-500" />
                        <span className={`font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                          {car.rating}
                        </span>
                        <span className={`font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                          ({car.reviews} reviews)
                        </span>
                      </div>
                    )}
                    <div className={`flex items-center gap-2 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      <FaMapMarkerAlt className="text-lg" />
                      <span className="font-bold">Douala, Cameroon</span>
                    </div>
                  </div>

                  {/* Quick Info Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-2 rounded-xl text-sm font-bold border-2 flex items-center gap-2 ${
                      resolvedTheme === "dark"
                        ? "bg-slate-950/30 border-slate-800 text-slate-300"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}>
                      <FaCar className="text-sky-500" /> {car.type}
                    </span>
                    <span className={`px-3 py-2 rounded-xl text-sm font-bold border-2 flex items-center gap-2 ${
                      resolvedTheme === "dark"
                        ? "bg-slate-950/30 border-slate-800 text-slate-300"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}>
                      <FaGasPump className="text-sky-500" /> {car.fuel}
                    </span>
                    <span className={`px-3 py-2 rounded-xl text-sm font-bold border-2 flex items-center gap-2 ${
                      resolvedTheme === "dark"
                        ? "bg-slate-950/30 border-slate-800 text-slate-300"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}>
                      <FaCog className="text-sky-500" /> {car.transmission}
                    </span>
                    <span className={`px-3 py-2 rounded-xl text-sm font-bold border-2 flex items-center gap-2 ${
                      resolvedTheme === "dark"
                        ? "bg-slate-950/30 border-slate-800 text-slate-300"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}>
                      <FaUsers className="text-sky-500" /> {car.seats} seats
                    </span>
                  </div>
                </div>

                {/* Pricing and CTAs */}
                <div className="flex-shrink-0 lg:text-right">
                  <div className={`text-4xl lg:text-5xl font-black mb-1 ${resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"}`}>
                    {formatPrice(car.price, car.listingType as "rent" | "sell")}
                  </div>
                  <div className={`text-sm font-bold mb-4 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    {priceSuffix(car.listingType as "rent" | "sell")}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/cars" className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-3 px-6 rounded-2xl font-black text-base border-2 tracking-wide transition-all ${
                          resolvedTheme === "dark"
                            ? "bg-sky-600 hover:bg-sky-500 border-sky-500 hover:border-sky-400 text-white shadow-lg shadow-sky-900/40 hover:shadow-sky-900/60"
                            : "bg-sky-500 hover:bg-sky-600 border-sky-400 hover:border-sky-500 text-white shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50"
                        }`}
                      >
                        {car.listingType === "rent" ? "Book Now" : "Buy Now"}
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 py-3 px-6 rounded-2xl font-black text-base border-2 tracking-wide transition-all ${
                        resolvedTheme === "dark"
                          ? "bg-slate-900/50 hover:bg-slate-800 border-slate-700 hover:border-slate-600 text-slate-200"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300 text-slate-800"
                      }`}
                    >
                      Contact Dealer
                    </motion.button>
                  </div>
                  
                  {car.listingType === "rent" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full mt-3 py-3 px-6 rounded-2xl font-black text-base border-2 tracking-wide transition-all ${
                        resolvedTheme === "dark"
                          ? "bg-slate-900/50 hover:bg-slate-800 border-slate-700 hover:border-slate-600 text-slate-200"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300 text-slate-800"
                      }`}
                    >
                      Schedule Test Drive
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Car Description Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`rounded-3xl border-2 p-6 ${
                resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-6">
                <FaFileAlt className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '28px' }} />
                <h2 className={`text-2xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  About This Vehicle
                </h2>
              </div>
              <div className={`space-y-4 leading-relaxed ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                <p className="font-bold">
                  Experience the perfect blend of performance, comfort, and style with this exceptional {car.type}. 
                  Meticulously maintained and featuring premium amenities, this vehicle offers an unparalleled driving experience 
                  that will exceed your expectations.
                </p>
                <p className="font-bold">
                  Whether you're navigating city streets or embarking on a long journey, this {car.name} delivers 
                  reliability and sophistication in equal measure. The spacious interior, advanced technology features, 
                  and smooth {car.transmission} transmission ensure every ride is enjoyable and stress-free.
                </p>
                <p className="font-bold">
                  With its impressive {car.fuel} engine and thoughtful design, this vehicle represents the perfect 
                  choice for those who demand quality and value. Don't miss the opportunity to own or rent this 
                  outstanding {car.type} that combines practicality with premium features.
                </p>
              </div>
            </motion.div>

            {/* Color Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`rounded-3xl border-2 p-6 ${
                resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <FaPalette className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '24px' }} />
                <h3 className={`text-xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Available Colors
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {colors.map((color, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedColor(idx)}
                    className={`relative group`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full border-4 transition-all ${
                        selectedColor === idx
                          ? "border-sky-500 ring-2 ring-sky-500/50"
                          : "border-slate-300 group-hover:border-slate-400"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${
                      resolvedTheme === "dark" ? "bg-slate-800 text-white" : "bg-slate-900 text-white"
                    }`}>
                      {color.name}
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className={`mt-4 text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                Selected: {colors[selectedColor].name}
              </div>
            </motion.div>

            {/* Enhanced Car Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`rounded-3xl border-2 p-3 lg:p-4 ${
                resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-3 lg:mb-4">
                <FaInfoCircle className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '20px' }} />
                <h2 className={`text-lg lg:text-xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Vehicle Specifications
                </h2>
              </div>

              {/* Quick Specs Grid - Premium Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-3 mb-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`flex flex-col items-center p-2 lg:p-3 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <FaTachometerAlt className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '18px' }} />
                  <div className={`mt-1 lg:mt-2 text-sm lg:text-lg font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    12,000 km
                  </div>
                  <div className={`text-xs font-bold mt-1 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Mileage
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`flex flex-col items-center p-2 lg:p-3 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <FaWrench className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '18px' }} />
                  <div className={`mt-1 lg:mt-2 text-sm lg:text-lg font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    V8 Twin Turbo
                  </div>
                  <div className={`text-xs font-bold mt-1 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Engine
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`flex flex-col items-center p-2 lg:p-3 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <FaBolt className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '18px' }} />
                  <div className={`mt-1 lg:mt-2 text-sm lg:text-lg font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {car.transmission === "Automatic" ? "Auto" : "Manual"}
                  </div>
                  <div className={`text-xs font-bold mt-1 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Transmission
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`flex flex-col items-center p-2 lg:p-3 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <FaGasPump className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '18px' }} />
                  <div className={`mt-1 lg:mt-2 text-sm lg:text-lg font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {car.fuel}
                  </div>
                  <div className={`text-xs font-bold mt-1 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Fuel Type
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`flex flex-col items-center p-2 lg:p-3 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <FaPalette className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '18px' }} />
                  <div className={`mt-1 lg:mt-2 text-sm lg:text-lg font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    Matte Black
                  </div>
                  <div className={`text-xs font-bold mt-1 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Color
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`flex flex-col items-center p-2 lg:p-3 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <FaCalendar className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '18px' }} />
                  <div className={`mt-1 lg:mt-2 text-sm lg:text-lg font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {car.year}
                  </div>
                  <div className={`text-xs font-bold mt-1 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Year
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`flex flex-col items-center p-2 lg:p-3 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <FaCar className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '18px' }} />
                  <div className={`mt-1 lg:mt-2 text-sm lg:text-lg font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    AWD
                  </div>
                  <div className={`text-xs font-bold mt-1 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Drive Type
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`flex flex-col items-center p-2 lg:p-3 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <FaTachometerAlt className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '18px' }} />
                  <div className={`mt-1 lg:mt-2 text-sm lg:text-lg font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    280 km/h
                  </div>
                  <div className={`text-xs font-bold mt-1 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Top Speed
                  </div>
                </motion.div>
              </div>

              {/* Detailed Specs */}
              <div className={`rounded-2xl border-2 p-5 mb-6 ${
                resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <h3 className={`text-lg font-black mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Performance & Dimensions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <div className={`text-xs font-bold mb-1 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Engine
                    </div>
                    <div className={`font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {car.fuel === "Electric" ? "Electric Motor" : "2.5L V6"}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs font-bold mb-1 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Horsepower
                    </div>
                    <div className={`font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {car.type === "Sports" ? "450 HP" : "200 HP"}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs font-bold mb-1 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Acceleration
                    </div>
                    <div className={`font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {car.type === "Sports" ? "3.5s" : "8.2s"}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs font-bold mb-1 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Top Speed
                    </div>
                    <div className={`font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {car.type === "Sports" ? "280 km/h" : "180 km/h"}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs font-bold mb-1 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Length
                    </div>
                    <div className={`font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {car.type === "SUV" ? "4.8m" : "4.5m"}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs font-bold mb-1 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Weight
                    </div>
                    <div className={`font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {car.type === "SUV" ? "2,100 kg" : "1,600 kg"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Features with Icons */}
              <div>
                <h3 className={`text-base lg:text-lg font-black mb-3 lg:mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Features & Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-3">
                  {[
                    { icon: FaBluetooth, name: "Bluetooth" },
                    { icon: FaMap, name: "GPS Navigation" },
                    { icon: FaCamera, name: "Reverse Camera" },
                    { icon: FaMobileAlt, name: "Apple CarPlay" },
                    { icon: FaSnowflake, name: "Heated Seats" },
                    { icon: FaWind, name: "Air Conditioning" },
                    { icon: FaVolumeUp, name: "Premium Audio" },
                    { icon: FaWifi, name: "USB Charging" },
                    { icon: FaTachometerAlt, name: "Cruise Control" },
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + (idx * 0.05) }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                        resolvedTheme === "dark"
                          ? "bg-slate-950/30 border-slate-800 text-slate-200"
                          : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    >
                      <feature.icon className="text-sky-500" style={{ fontSize: '18px' }} />
                      {feature.name}
                    </motion.div>
                  ))}
                  {car.features.slice(0, 3).map((feature, idx) => (
                    <motion.div
                      key={`custom-${idx}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.0 + (idx * 0.05) }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                        resolvedTheme === "dark"
                          ? "bg-slate-950/30 border-slate-800 text-slate-200"
                          : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    >
                      <FaCheck className="text-sky-500" style={{ fontSize: '18px' }} />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Why You'll Love It - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className={`rounded-3xl border-2 p-6 ${
                resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-6">
                <FaAward className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '28px' }} />
                <h2 className={`text-2xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Why You'll Love This Vehicle
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className={`p-3 rounded-xl ${resolvedTheme === "dark" ? "bg-sky-900/30" : "bg-sky-100"}`}>
                    <FaShieldAlt className="text-sky-500" style={{ fontSize: '24px' }} />
                  </div>
                  <div>
                    <div className={`font-black mb-1 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                      Safety First
                    </div>
                    <div className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Advanced safety features for peace of mind
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className={`p-3 rounded-xl ${resolvedTheme === "dark" ? "bg-sky-900/30" : "bg-sky-100"}`}>
                    <FaArrowUp className="text-sky-500" style={{ fontSize: '24px' }} />
                  </div>
                  <div>
                    <div className={`font-black mb-1 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                      Great Value
                    </div>
                    <div className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Competitive pricing with premium features
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className={`p-3 rounded-xl ${resolvedTheme === "dark" ? "bg-sky-900/30" : "bg-sky-100"}`}>
                    <FaStar className="text-sky-500" style={{ fontSize: '24px' }} />
                  </div>
                  <div>
                    <div className={`font-black mb-1 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                      Top Rated
                    </div>
                    <div className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      {car.rating} star rating from {car.reviews} reviews
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                    resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className={`p-3 rounded-xl ${resolvedTheme === "dark" ? "bg-sky-900/30" : "bg-sky-100"}`}>
                    <FaClock className="text-sky-500" style={{ fontSize: '24px' }} />
                  </div>
                  <div>
                    <div className={`font-black mb-1 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                      Reliable
                    </div>
                    <div className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Well-maintained and thoroughly inspected
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Car Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className={`rounded-3xl border-2 p-6 ${
                resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-6">
                <FaFileAlt className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '28px' }} />
                <h2 className={`text-2xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  About This Vehicle
                </h2>
              </div>
              <p className={`text-lg font-bold leading-relaxed mb-4 ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                Experience luxury and performance with the {car.year} {car.name}. Perfect for business trips, weddings, vacations, and premium city driving. This {car.type} offers an exceptional blend of comfort, style, and advanced technology.
              </p>
              <p className={`text-base font-bold leading-relaxed ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                Maintained in excellent condition with top-tier comfort and advanced safety technology. Whether you're looking for a daily driver or a special occasion vehicle, this {car.name} delivers an unforgettable experience.
              </p>
            </motion.div>

            {/* Rental Terms / Buying Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className={`rounded-3xl border-2 p-6 ${
                resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-6">
                <FaFileAlt className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '28px' }} />
                <h2 className={`text-2xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {car.listingType === "rent" ? "Rental Terms" : "Buying Information"}
                </h2>
              </div>
              
              {car.listingType === "rent" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                      resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${resolvedTheme === "dark" ? "bg-sky-900/30" : "bg-sky-100"}`}>
                      <FaUser className="text-sky-500" style={{ fontSize: '24px' }} />
                    </div>
                    <div>
                      <div className={`font-black mb-1 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                        Minimum Age
                      </div>
                      <div className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        21 years old
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                      resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${resolvedTheme === "dark" ? "bg-sky-900/30" : "bg-sky-100"}`}>
                      <FaShieldAlt className="text-sky-500" style={{ fontSize: '24px' }} />
                    </div>
                    <div>
                      <div className={`font-black mb-1 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                        Security Deposit
                      </div>
                      <div className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        Required
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                      resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${resolvedTheme === "dark" ? "bg-sky-900/30" : "bg-sky-100"}`}>
                      <FaGasPump className="text-sky-500" style={{ fontSize: '24px' }} />
                    </div>
                    <div>
                      <div className={`font-black mb-1 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                        Fuel Policy
                      </div>
                      <div className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        Full-to-full
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                      resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${resolvedTheme === "dark" ? "bg-sky-900/30" : "bg-sky-100"}`}>
                      <FaTachometerAlt className="text-sky-500" style={{ fontSize: '24px' }} />
                    </div>
                    <div>
                      <div className={`font-black mb-1 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                        Daily Mileage
                      </div>
                      <div className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        250 km limit
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                      resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${resolvedTheme === "dark" ? "bg-sky-900/30" : "bg-sky-100"}`}>
                      <FaCreditCard className="text-sky-500" style={{ fontSize: '24px' }} />
                    </div>
                    <div>
                      <div className={`font-black mb-1 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                        Financing
                      </div>
                      <div className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        Available
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                      resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${resolvedTheme === "dark" ? "bg-sky-900/30" : "bg-sky-100"}`}>
                      <FaAward className="text-sky-500" style={{ fontSize: '24px' }} />
                    </div>
                    <div>
                      <div className={`font-black mb-1 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                        Certification
                      </div>
                      <div className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        Certified Pre-owned
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                      resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${resolvedTheme === "dark" ? "bg-sky-900/30" : "bg-sky-100"}`}>
                      <FaShieldAlt className="text-sky-500" style={{ fontSize: '24px' }} />
                    </div>
                    <div>
                      <div className={`font-black mb-1 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                        Warranty
                      </div>
                      <div className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        Included
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                      resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${resolvedTheme === "dark" ? "bg-sky-900/30" : "bg-sky-100"}`}>
                      <FaCheckCircle className="text-sky-500" style={{ fontSize: '24px' }} />
                    </div>
                    <div>
                      <div className={`font-black mb-1 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                        Inspection
                      </div>
                      <div className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        Thoroughly Inspected
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>

            {/* Dealer / Owner Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className={`rounded-3xl border-2 p-4 lg:p-6 ${
                resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-4 lg:mb-6">
                <FaBuilding className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '24px' }} />
                <h2 className={`text-xl lg:text-2xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Dealer Information
                </h2>
              </div>
              
              <div className={`flex flex-col md:flex-row gap-4 lg:gap-6 p-4 lg:p-6 rounded-2xl border-2 ${
                resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="flex-shrink-0">
                  <div className={`w-16 lg:w-24 h-16 lg:h-24 rounded-full border-4 flex items-center justify-center ${
                    resolvedTheme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-200 border-slate-300"
                  }`}>
                    <FaBuilding className={resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"} style={{ fontSize: '24px' }} />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 lg:gap-3 mb-2">
                    <h3 className={`text-lg lg:text-xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                      Drivana Premium Motors
                    </h3>
                    <FaCheckCircle className="text-sky-500" style={{ fontSize: '16px' }} />
                  </div>
                  <p className={`text-xs lg:text-sm font-bold mb-2 lg:mb-3 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Verified Dealer • {car.reviews} Sales
                  </p>
                  <div className="flex flex-wrap gap-2 lg:gap-4 mb-3 lg:mb-4">
                    <div className={`flex items-center gap-2 text-xs lg:text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      <FaPhone className="text-sm" />
                      +237 123 456 789
                    </div>
                    <div className={`flex items-center gap-2 text-xs lg:text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      <FaEnvelope className="text-sm" />
                      info@drivana.com
                    </div>
                    <div className={`flex items-center gap-2 text-xs lg:text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      <FaClock className="text-sm" />
                      Response: &lt;1 hour
                    </div>
                  </div>
                  <div className="flex gap-2 lg:gap-3">
                    <button className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl font-bold text-xs lg:text-sm border-2 transition-all hover:scale-105 ${
                      resolvedTheme === "dark"
                        ? "bg-sky-600 hover:bg-sky-500 border-sky-500 text-white"
                        : "bg-sky-500 hover:bg-sky-600 border-sky-400 text-white"
                    }`}>
                      <FaComment className="text-sm" />
                      Chat Now
                    </button>
                    <button className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl font-bold text-xs lg:text-sm border-2 transition-all hover:scale-105 ${
                      resolvedTheme === "dark"
                        ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200"
                        : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800"
                    }`}>
                      <FaPhone className="text-sm" />
                      Call
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reviews & Ratings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className={`rounded-3xl border-2 p-4 lg:p-6 ${
                resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-4 lg:mb-6">
                <FaStar className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '24px' }} />
                <h2 className={`text-xl lg:text-2xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Reviews & Ratings
                </h2>
              </div>

              {/* Rating Summary */}
              <div className={`flex flex-col md:flex-row gap-4 lg:gap-6 p-4 lg:p-6 rounded-2xl border-2 mb-6 ${
                resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="flex-shrink-0 text-center">
                  <div className={`text-4xl lg:text-5xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {car.rating}
                  </div>
                  <div className="flex justify-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(car.rating || 0) ? "text-amber-500" : "text-slate-300"}
                        style={{ fontSize: '16px' }}
                      />
                    ))}
                  </div>
                  <div className={`text-sm font-bold mt-2 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    {car.reviews} reviews
                  </div>
                </div>
                <div className="flex-grow space-y-3">
                  {[
                    { label: "5 stars", count: Math.floor((car.reviews || 0) * 0.6), percent: 60 },
                    { label: "4 stars", count: Math.floor((car.reviews || 0) * 0.25), percent: 25 },
                    { label: "3 stars", count: Math.floor((car.reviews || 0) * 0.1), percent: 10 },
                    { label: "2 stars", count: Math.floor((car.reviews || 0) * 0.03), percent: 3 },
                    { label: "1 star", count: Math.floor((car.reviews || 0) * 0.02), percent: 2 },
                  ].map((rating) => (
                    <div key={rating.label} className="flex items-center gap-3">
                      <div className={`w-20 text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        {rating.label}
                      </div>
                      <div className="flex-grow h-3 rounded-full overflow-hidden bg-slate-200">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${rating.percent}%` }}
                          transition={{ duration: 1, delay: 1.3 }}
                          className="h-full bg-sky-500 rounded-full"
                        />
                      </div>
                      <div className={`w-12 text-sm font-bold text-right ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        {rating.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {[
                  { name: "John D.", rating: 5, text: "Amazing experience! The car was in perfect condition and the service was excellent.", avatar: "JD" },
                  { name: "Sarah M.", rating: 4, text: "Very clean vehicle and smooth booking process. Would definitely recommend.", avatar: "SM" },
                  { name: "Michael K.", rating: 5, text: "Fast booking process and great communication. The car exceeded my expectations!", avatar: "MK" },
                ].map((review, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + (idx * 0.1) }}
                    className={`p-5 rounded-2xl border-2 ${
                      resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm ${
                        resolvedTheme === "dark" ? "bg-sky-900/30 text-sky-400" : "bg-sky-100 text-sky-600"
                      }`}>
                        {review.avatar}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className={`font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                            {review.name}
                          </h4>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={i < review.rating ? "text-amber-500" : "text-slate-300"}
                                style={{ fontSize: '14px' }}
                              />
                            ))}
                          </div>
                        </div>
                        <p className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Similar Cars Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className={`rounded-3xl border-2 p-4 lg:p-6 ${
                resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-4 lg:mb-6">
                <FaCar className={resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"} style={{ fontSize: '24px' }} />
                <h2 className={`text-xl lg:text-2xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Similar Vehicles
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                {allCars
                  .filter((c) => c.id !== car.id && c.type === car.type)
                  .slice(0, 6)
                  .map((similarCar, idx) => (
                    <motion.div
                      key={similarCar.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5 + (idx * 0.1) }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className={`rounded-2xl border-2 overflow-hidden transition-all cursor-pointer ${
                        resolvedTheme === "dark" ? "bg-slate-950/30 border-slate-800" : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <Link href={`/cars/${similarCar.id}`}>
                        <div className="relative aspect-video">
                          <Image
                            src={'images' in similarCar ? similarCar.images.exterior : '/Cars/2007 camaro concept/exterior.jpeg'}
                            alt={similarCar.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-extrabold backdrop-blur-md border-2 bg-sky-500/80 border-sky-400 text-white">
                            {similarCar.listingType === "rent" ? "RENT" : "SALE"}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className={`font-black text-sm mb-1 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                            {similarCar.name}
                          </h3>
                          <p className={`text-xs font-bold mb-2 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                            {similarCar.year} • {similarCar.type}
                          </p>
                          <div className={`text-lg font-black ${resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"}`}>
                            {formatPrice(similarCar.price, similarCar.listingType as "rent" | "sell")}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </div>

          {/* Mobile Booking Card - Fixed Bottom */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-slate-900 border-t-2 border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-shrink-0">
                <div className={`text-2xl font-black ${resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"}`}>
                  {formatPrice(car.price, car.listingType as "rent" | "sell")}
                </div>
                <div className={`text-xs font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {priceSuffix(car.listingType as "rent" | "sell")}
                </div>
              </div>
              <Link href={car.listingType === "rent" ? "/cars" : "/cars"} className="flex-grow">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-black text-sm border-2 tracking-wide transition-all ${
                    resolvedTheme === "dark"
                      ? "bg-sky-600 hover:bg-sky-500 border-sky-500 hover:border-sky-400 text-white shadow-lg shadow-sky-900/40 hover:shadow-sky-900/60"
                      : "bg-sky-500 hover:bg-sky-600 border-sky-400 hover:border-sky-500 text-white shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50"
                  }`}
                >
                  {car.listingType === "rent" ? "Rent Now" : "Buy Now"}
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`rounded-3xl border-2 p-4 lg:p-6 lg:sticky lg:top-6 ${
                resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              {/* Car Name */}
              <div className="mb-4 lg:mb-6">
                <h1 className={`text-2xl lg:text-3xl font-black tracking-tight ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {car.name}
                </h1>
                <p className={`mt-1 text-xs lg:text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {car.year} • {car.type}
                </p>
              </div>

              {/* Price */}
              <div className="mb-4 lg:mb-6 pb-4 lg:pb-6 border-b-2">
                <div className={`text-3xl lg:text-4xl font-black ${resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"}`}>
                  {formatPrice(car.price, car.listingType as "rent" | "sell")}
                </div>
                <div className={`mt-1 text-xs lg:text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {priceSuffix(car.listingType as "rent" | "sell")}
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                <div>
                  <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    Pick-up Date
                  </label>
                  <div className="relative">
                    <FaCalendar className={`absolute left-3 top-1/2 -translate-y-1/2 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`} style={{ fontSize: '18px' }} />
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
                    <FaCalendar className={`absolute left-3 top-1/2 -translate-y-1/2 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`} style={{ fontSize: '18px' }} />
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
                    <FaMapMarkerAlt className={`absolute left-3 top-1/2 -translate-y-1/2 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`} style={{ fontSize: '18px' }} />
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

              {/* 360 View Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-lg border-2 tracking-wide transition-all ${
                  resolvedTheme === "dark"
                    ? "bg-slate-900/50 hover:bg-slate-800 border-slate-700 hover:border-slate-600 text-slate-200"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300 text-slate-800"
                }`}
              >
                <FaSync className="text-lg" />
                View 360° Tour
              </motion.button>

              {/* Contact Options */}
              <div className="mt-6 pt-6 border-t-2 space-y-3">
                <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-bold transition-all hover:scale-105 ${
                  resolvedTheme === "dark"
                    ? "bg-slate-950/30 border-slate-800 text-slate-200 hover:bg-slate-800"
                    : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
                }`}>
                  <FaPhone className="text-lg" />
                  Call Us
                </button>
                <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-bold transition-all hover:scale-105 ${
                  resolvedTheme === "dark"
                    ? "bg-slate-950/30 border-slate-800 text-slate-200 hover:bg-slate-800"
                    : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
                }`}>
                  <FaEnvelope className="text-lg" />
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

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 transition-all"
            >
              <FaTimes className="text-white" style={{ fontSize: '24px' }} />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-6xl max-h-[90vh] aspect-video"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <Image
                src={allImages[activeImageIndex]}
                alt={`${car.name} fullscreen`}
                fill
                className="object-contain rounded-2xl"
                priority
              />
              
              {allImages.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1)); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 transition-all"
                  >
                    <FaChevronLeft className="text-white" style={{ fontSize: '32px' }} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1)); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 transition-all"
                  >
                    <FaChevronRight className="text-white" style={{ fontSize: '32px' }} />
                  </motion.button>
                </>
              )}
            </motion.div>

            {/* Image Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30"
            >
              <span className="text-white font-black">
                {activeImageIndex + 1} / {allImages.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
