"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Fuel, Users, Zap, ChevronDown, X, MapPin, Calendar, CarFront, Wallet, Search, Star, Shield, CheckCircle2, Maximize2, Phone, Mail, Info, Award, TrendingUp, Check, Clock, RotateCw, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useWishlist } from "../contexts/WishlistContext";
import { localCars, rentCars } from "../../data/carData";

// Use rentCars for rent mode, localCars for buy mode
const allCars = [...localCars, ...rentCars];

export default function CarsPage() {
  const { resolvedTheme } = useTheme();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"rent" | "buy">("rent");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [visibleCars, setVisibleCars] = useState(12);
  const [selectedCar, setSelectedCar] = useState<typeof allCars[0] | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const carTypes = ["all", "Sedan", "SUV", "Sports", "Truck", "Van", "Convertible", "Hybrid"];
  const fuelTypes = ["all", "Gasoline", "Diesel", "Hybrid", "Electric"];

  const filteredCars = allCars.filter((car) => {
    const matchesType = selectedType === "" || car.type.toLowerCase() === selectedType.toLowerCase();
    const matchesFuel = selectedFuel === "all" || car.fuel === selectedFuel;
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMode = mode === "rent" ? car.listingType === "rent" : car.listingType === "sell";
    return matchesType && matchesFuel && matchesSearch && matchesMode;
  });

  const handleSearch = () => {
    // Search is now always active, filters update in real-time
  };

  const formatPrice = (price: number) => {
    if (price > 100000) {
      return `${(price / 1000000).toFixed(1)}M FCFA`;
    }
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} FCFA`;
  };

  const handleCardClick = (car: typeof allCars[0]) => {
    setSelectedCar(car);
    setActiveImageIndex(0);
  };

  const closeModal = () => {
    setSelectedCar(null);
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${
      resolvedTheme === 'dark' 
        ? 'bg-slate-950' 
        : 'bg-slate-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="space-y-4">
            <h1 className={`text-6xl md:text-7xl font-bold tracking-tight ${
              resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Curated Fleet
            </h1>
            <p className={`text-xl ${
              resolvedTheme === 'dark' 
                ? 'text-slate-400' 
                : 'text-slate-600'
            }`}>
              Discover {filteredCars.length} exceptional vehicles tailored for those with discerning taste
            </p>
          </div>
        </motion.div>

        {/* Rent/Buy Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-muted/50 backdrop-blur-md rounded-full p-1.5 border border-border">
              <button
                onClick={() => setMode("rent")}
                className={`px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 ${
                  mode === "rent"
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                    : "bg-sky-500/10 text-white"
                }`}
              >
                Rent
              </button>
              <button
                onClick={() => setMode("buy")}
                className={`px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 ${
                  mode === "buy"
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                    : "bg-sky-500/10 text-white"
                }`}
              >
                Buy
              </button>
            </div>
          </div>
        </motion.div>

        {/* Spectacular Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className={`relative overflow-hidden rounded-3xl border-2 border-sky-300 ${
            resolvedTheme === 'dark'
              ? 'bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90'
              : 'bg-gradient-to-br from-white/90 via-slate-50/90 to-white/90'
          } backdrop-blur-xl shadow-2xl`}>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative p-6 sm:p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${
                  resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {mode === "rent" ? "Find Your Perfect Rental" : "Discover Your Dream Car"}
                </h2>
                <p className={`text-sm ${
                  resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Filter by your preferences and search for available vehicles
                </p>
              </div>

              {mode === "rent" ? (
                /* Rent Search Form */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Location */}
                    <div className="relative group">
                      <label className={`block text-xs font-semibold mb-2 ${
                        resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                          resolvedTheme === 'dark' ? 'text-slate-500 group-focus-within:text-red-500' : 'text-slate-400 group-focus-within:text-red-500'
                        }`} />
                        <input
                          type="text"
                          placeholder="City or airport"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 border-sky-300 transition-all focus:outline-none focus:ring-2 ${
                            resolvedTheme === 'dark'
                              ? 'bg-slate-800/50 focus:border-red-500 focus:ring-red-500/20 text-white placeholder-slate-500'
                              : 'bg-white focus:border-red-500 focus:ring-red-500/20 text-slate-900 placeholder-slate-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Car Type */}
                    <div className="relative group">
                      <label className={`block text-xs font-semibold mb-2 ${
                        resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Car Type
                      </label>
                      <div className="relative">
                        <CarFront className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                          resolvedTheme === 'dark' ? 'text-slate-500 group-focus-within:text-red-500' : 'text-slate-400 group-focus-within:text-red-500'
                        }`} />
                        <select
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 border-sky-300 transition-all focus:outline-none focus:ring-2 appearance-none cursor-pointer text-white ${
                            resolvedTheme === 'dark'
                              ? 'bg-slate-800/50 focus:border-red-500 focus:ring-red-500/20'
                              : 'bg-white focus:border-red-500 focus:ring-red-500/20'
                          }`}
                          style={{ backgroundColor: 'transparent' }}
                        >
                          <option value="">All Types</option>
                          <option value="sedan">Sedan</option>
                          <option value="suv">SUV</option>
                          <option value="sports">Sports Car</option>
                          <option value="luxury">Luxury</option>
                          <option value="electric">Electric</option>
                          <option value="convertible">Convertible</option>
                          <option value="van">Van/Minivan</option>
                        </select>
                      </div>
                    </div>

                    {/* Pick Up Date */}
                    <div className="relative group">
                      <label className={`block text-xs font-semibold mb-2 ${
                        resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Pick Up Date
                      </label>
                      <div className="relative">
                        <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                          resolvedTheme === 'dark' ? 'text-slate-500 group-focus-within:text-red-500' : 'text-slate-400 group-focus-within:text-red-500'
                        }`} />
                        <input
                          type="date"
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 border-sky-300 transition-all focus:outline-none focus:ring-2 ${
                            resolvedTheme === 'dark'
                              ? 'bg-slate-800/50 focus:border-red-500 focus:ring-red-500/20 text-white'
                              : 'bg-white focus:border-red-500 focus:ring-red-500/20 text-slate-900'
                          } [color-scheme:dark]`}
                        />
                      </div>
                    </div>

                    {/* Return Date */}
                    <div className="relative group">
                      <label className={`block text-xs font-semibold mb-2 ${
                        resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Return Date
                      </label>
                      <div className="relative">
                        <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                          resolvedTheme === 'dark' ? 'text-slate-500 group-focus-within:text-red-500' : 'text-slate-400 group-focus-within:text-red-500'
                        }`} />
                        <input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 border-sky-300 transition-all focus:outline-none focus:ring-2 ${
                            resolvedTheme === 'dark'
                              ? 'bg-slate-800/50 focus:border-red-500 focus:ring-red-500/20 text-white'
                              : 'bg-white focus:border-red-500 focus:ring-red-500/20 text-slate-900'
                          } [color-scheme:dark]`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all border-2 flex items-center justify-center gap-3 group ${
                      resolvedTheme === 'dark'
                        ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border-red-500 text-white shadow-lg shadow-red-900/40 hover:shadow-red-900/60'
                        : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 border-red-400 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50'
                    }`}
                  >
                    <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    Search Available Cars
                  </button>
                </div>
              ) : (
                /* Buy Search Form */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Location */}
                    <div className="relative group">
                      <label className={`block text-xs font-semibold mb-2 ${
                        resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                          resolvedTheme === 'dark' ? 'text-slate-500 group-focus-within:text-red-500' : 'text-slate-400 group-focus-within:text-red-500'
                        }`} />
                        <input
                          type="text"
                          placeholder="City or area"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 border-sky-300 transition-all focus:outline-none focus:ring-2 ${
                            resolvedTheme === 'dark'
                              ? 'bg-slate-800/50 focus:border-red-500 focus:ring-red-500/20 text-white placeholder-slate-500'
                              : 'bg-white focus:border-red-500 focus:ring-red-500/20 text-slate-900 placeholder-slate-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="relative group">
                      <label className={`block text-xs font-semibold mb-2 ${
                        resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Price Range (FCFA)
                      </label>
                      <div className="relative">
                        <Wallet className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                          resolvedTheme === 'dark' ? 'text-slate-500 group-focus-within:text-red-500' : 'text-slate-400 group-focus-within:text-red-500'
                        }`} />
                        <select
                          value={priceRange}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 border-sky-300 transition-all focus:outline-none focus:ring-2 appearance-none cursor-pointer text-white ${
                            resolvedTheme === 'dark'
                              ? 'bg-slate-800/50 focus:border-red-500 focus:ring-red-500/20'
                              : 'bg-white focus:border-red-500 focus:ring-red-500/20'
                          }`}
                          style={{ backgroundColor: 'transparent' }}
                        >
                          <option value="" style={{ color: 'white' }}>Any Price</option>
                          <option value="0-10000000" style={{ color: 'white' }}>Under 10M FCFA</option>
                          <option value="10000000-30000000" style={{ color: 'white' }}>10M - 30M FCFA</option>
                          <option value="30000000-60000000" style={{ color: 'white' }}>30M - 60M FCFA</option>
                          <option value="60000000-100000000" style={{ color: 'white' }}>60M - 100M FCFA</option>
                          <option value="100000000+" style={{ color: 'white' }}>100M+ FCFA</option>
                        </select>
                      </div>
                    </div>

                    {/* Car Type */}
                    <div className="relative group">
                      <label className={`block text-xs font-semibold mb-2 ${
                        resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Car Type
                      </label>
                      <div className="relative">
                        <CarFront className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                          resolvedTheme === 'dark' ? 'text-slate-500 group-focus-within:text-red-500' : 'text-slate-400 group-focus-within:text-red-500'
                        }`} />
                        <select
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 border-sky-300 transition-all focus:outline-none focus:ring-2 appearance-none cursor-pointer text-white ${
                            resolvedTheme === 'dark'
                              ? 'bg-slate-800/50 focus:border-red-500 focus:ring-red-500/20'
                              : 'bg-white focus:border-red-500 focus:ring-red-500/20'
                          }`}
                          style={{ backgroundColor: 'transparent' }}
                        >
                          <option value="">All Types</option>
                          <option value="sedan">Sedan</option>
                          <option value="suv">SUV</option>
                          <option value="sports">Sports</option>
                          <option value="luxury">Luxury</option>
                          <option value="electric">Electric</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all border-2 flex items-center justify-center gap-3 group ${
                      resolvedTheme === 'dark'
                        ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border-red-500 text-white shadow-lg shadow-red-900/40 hover:shadow-red-900/60'
                        : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 border-red-400 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50'
                    }`}
                  >
                    <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    {visibleCars === filteredCars.length ? 'Show All Cars' : `Load More Cars (${filteredCars.length - visibleCars} remaining)`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>


        {/* Cars Grid - Enhanced Design */}
        {mounted ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            {filteredCars.slice(0, visibleCars).map((car) => (
              <motion.div
                key={car.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className={`group rounded-3xl overflow-hidden border-2 transition-all duration-500 h-full flex flex-col ${
                  resolvedTheme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 hover:border-red-500/60 hover:shadow-2xl hover:shadow-red-900/30'
                    : 'bg-white border-slate-200 hover:border-red-400/60 hover:shadow-2xl hover:shadow-red-500/20'
                } backdrop-blur-xl`}
              >
                {/* Image Container - Large */}
                <div className="relative h-48 bg-slate-800 overflow-hidden">
                  <Image
                    src={car.images.exterior}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    priority
                  />
                  {/* Overlay Gradient */}
                  <div className={`absolute inset-0 ${
                    resolvedTheme === 'dark'
                      ? 'bg-gradient-to-t from-slate-900 via-transparent to-transparent'
                      : 'bg-gradient-to-t from-slate-900/60 via-transparent to-transparent'
                  }`} />

                  {/* Badges Container */}
                  <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
                    {/* Type & Year Badges */}
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md border ${
                        car.listingType === 'rent'
                          ? 'bg-emerald-500/80 border-emerald-400 text-white'
                          : 'bg-red-500/80 border-red-400 text-white'
                      }`}>
                        {car.listingType === 'rent' ? 'RENT' : 'SALE'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md border ${
                        resolvedTheme === 'dark'
                          ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                          : 'bg-white/80 border-slate-300 text-slate-800'
                      }`}>
                        {car.year}
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(car.id)}
                      className={`p-2 rounded-full backdrop-blur-md border-2 transition-all hover:scale-110 ${
                        isWishlisted(car.id)
                          ? 'bg-red-500/80 border-red-400 shadow-lg shadow-red-500/50'
                          : resolvedTheme === 'dark'
                            ? 'bg-slate-900/50 border-slate-700 hover:bg-slate-800/80'
                            : 'bg-white/80 border-slate-300 hover:bg-white'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted(car.id)
                            ? 'fill-white text-white'
                            : resolvedTheme === 'dark'
                              ? 'text-slate-400'
                              : 'text-slate-600'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className={`p-3 flex flex-col flex-grow ${
                  resolvedTheme === 'dark' ? 'bg-slate-900' : 'bg-white'
                }`}>
                  {/* Title & Rating */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`text-base font-bold line-clamp-1 tracking-tight ${
                        resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        {car.name}
                      </h3>
                      <p className={`text-[10px] font-medium tracking-wide ${
                        resolvedTheme === 'dark' ? 'text-red-400' : 'text-red-600'
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
                        <Star className={`w-3 h-3 fill-amber-500 text-amber-500`} />
                        <span className={`text-[10px] font-bold ${
                          resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}>
                          {car.rating}
                        </span>
                        <span className={`text-[9px] ${
                          resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          ({car.reviews})
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className={`mb-3 pb-3 border-b ${
                    resolvedTheme === 'dark' ? 'border-slate-800' : 'border-slate-200'
                  }`}>
                    <p className={`text-[10px] line-through ${
                      resolvedTheme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {formatPrice((car as any).strikingPrice || car.price)}
                    </p>
                    <p className={`text-lg font-bold ${
                      resolvedTheme === 'dark' ? 'text-red-400' : 'text-red-600'
                    }`}>
                      {formatPrice((car as any).realPrice || car.price)}
                    </p>
                    <p className={`text-[10px] ${
                      resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {car.listingType === 'rent' ? 'per day' : 'total price'}
                    </p>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {/* Seats */}
                    <div className={`flex flex-col items-center p-1.5 rounded-lg border-2 transition-all ${
                      resolvedTheme === 'dark'
                        ? 'bg-slate-800/50 border-slate-700 hover:border-red-600'
                        : 'bg-slate-50 border-slate-200 hover:border-red-400'
                    }`}>
                      <Users className={`w-3 h-3 mb-1 ${
                        resolvedTheme === 'dark' ? 'text-red-400' : 'text-red-600'
                      }`} />
                      <span className={`text-[9px] font-bold ${
                        resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {car.seats}
                      </span>
                    </div>

                    {/* Fuel */}
                    <div className={`flex flex-col items-center p-1.5 rounded-lg border-2 transition-all ${
                      resolvedTheme === 'dark'
                        ? 'bg-slate-800/50 border-slate-700 hover:border-red-600'
                        : 'bg-slate-50 border-slate-200 hover:border-red-400'
                    }`}>
                      <Fuel className={`w-3 h-3 mb-1 ${
                        resolvedTheme === 'dark' ? 'text-red-400' : 'text-red-600'
                      }`} />
                      <span className={`text-[9px] font-bold ${
                        resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {car.fuel}
                      </span>
                    </div>

                    {/* Transmission */}
                    <div className={`flex flex-col items-center p-1.5 rounded-lg border-2 transition-all ${
                      resolvedTheme === 'dark'
                        ? 'bg-slate-800/50 border-slate-700 hover:border-red-600'
                        : 'bg-slate-50 border-slate-200 hover:border-red-400'
                    }`}>
                      <Zap className={`w-3 h-3 mb-1 ${
                        resolvedTheme === 'dark' ? 'text-red-400' : 'text-red-600'
                      }`} />
                      <span className={`text-[9px] font-bold ${
                        resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {car.transmission === 'Automatic' ? 'Auto' : 'Manual'}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {car.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 rounded text-[9px] font-medium ${
                            resolvedTheme === 'dark'
                              ? 'bg-slate-800 text-slate-300 border border-slate-700'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                      {car.features.length > 3 && (
                        <span className={`px-2 py-0.5 rounded text-[9px] font-medium ${
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
                  <Link href={`/cars/${car.id}`} className="mt-auto block">
                    <button 
                      className={`w-full py-2 rounded-xl font-bold text-xs transition-all border-2 tracking-wide ${
                        resolvedTheme === 'dark'
                          ? 'bg-red-700 hover:bg-red-600 border-red-600 hover:border-red-500 text-white shadow-lg shadow-red-900/40 hover:shadow-red-900/60'
                          : 'bg-red-500 hover:bg-red-600 border-red-400 hover:border-red-500 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50'
                      }`}
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : null}

        {/* Load More Button */}
        {mounted && filteredCars.length > visibleCars && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setVisibleCars(prev => prev + 12)}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 flex items-center justify-center gap-3 mx-auto group ${
                resolvedTheme === 'dark'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border-red-500 text-white shadow-lg shadow-red-900/40 hover:shadow-red-900/60'
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 border-red-400 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50'
              }`}
            >
              Load More Cars
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        )}

        {/* No Results */}
        {mounted && filteredCars.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-24 rounded-3xl border-2 border-dashed ${
              resolvedTheme === 'dark'
                ? 'border-slate-700 bg-slate-800/30'
                : 'border-slate-300 bg-slate-100/50'
            }`}
          >
            <div className="flex flex-col items-center gap-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                resolvedTheme === 'dark' ? 'bg-slate-800' : 'bg-white'
              }`}>
                <Search className={`w-10 h-10 ${
                  resolvedTheme === 'dark' ? 'text-slate-600' : 'text-slate-400'
                }`} />
              </div>
              <div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  No Vehicles Found
                </h3>
                <p className={`text-lg ${
                  resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Try adjusting your filter criteria to find more options
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Car Detail Modal */}
      <AnimatePresence>
        {selectedCar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 overflow-y-auto"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25 }}
              className="min-h-screen p-4 sm:p-6 lg:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeModal}
                className="fixed top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 transition-all"
              >
                <X className="text-white" size={24} />
              </motion.button>

              <div className="max-w-7xl mx-auto">
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 aspect-video mb-6">
                  <Image
                    src={selectedCar.image}
                    alt={selectedCar.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-4 py-2 rounded-full text-xs font-extrabold border-2 backdrop-blur-md ${
                      selectedCar.listingType === 'rent'
                        ? 'bg-emerald-500/80 border-emerald-400 text-white'
                        : 'bg-red-500/80 border-red-400 text-white'
                    }`}>
                      {selectedCar.listingType === 'rent' ? 'FOR RENT' : 'FOR SALE'}
                    </span>
                    <span className="px-4 py-2 rounded-full text-xs font-extrabold border-2 backdrop-blur-md bg-white/10 border-white/30 text-white">
                      {selectedCar.year}
                    </span>
                  </div>

                  {/* Rating */}
                  {selectedCar.rating && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-2xl border-2 px-4 py-3 backdrop-blur-md bg-white/10 border-white/30">
                      <Star className="text-amber-500" fill="currentColor" size={20} />
                      <div className="text-white font-black">
                        {selectedCar.rating}{' '}
                        <span className="text-white/70 font-bold text-sm">
                          ({selectedCar.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Details */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Car Name */}
                    <div>
                      <h1 className="text-4xl font-black text-white mb-2">
                        {selectedCar.name}
                      </h1>
                      <p className="text-white/70 font-bold">
                        {selectedCar.year} • {selectedCar.type}
                      </p>
                    </div>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col items-center p-4 rounded-2xl border-2 bg-white/5 border-white/10">
                        <Users className="text-red-400" size={28} />
                        <div className="mt-2 text-2xl font-black text-white">{selectedCar.seats}</div>
                        <div className="text-xs font-bold text-white/60">Seats</div>
                      </div>
                      <div className="flex flex-col items-center p-4 rounded-2xl border-2 bg-white/5 border-white/10">
                        <Fuel className="text-red-400" size={28} />
                        <div className="mt-2 text-2xl font-black text-white">{selectedCar.fuel}</div>
                        <div className="text-xs font-bold text-white/60">Fuel Type</div>
                      </div>
                      <div className="flex flex-col items-center p-4 rounded-2xl border-2 bg-white/5 border-white/10">
                        <Zap className="text-red-400" size={28} />
                        <div className="mt-2 text-2xl font-black text-white">{selectedCar.transmission === 'Automatic' ? 'Auto' : 'Manual'}</div>
                        <div className="text-xs font-bold text-white/60">Transmission</div>
                      </div>
                      <div className="flex flex-col items-center p-4 rounded-2xl border-2 bg-white/5 border-white/10">
                        <CarFront className="text-red-400" size={28} />
                        <div className="mt-2 text-2xl font-black text-white">{selectedCar.type}</div>
                        <div className="text-xs font-bold text-white/60">Body Type</div>
                      </div>
                    </div>

                    {/* Performance Specs */}
                    <div className="rounded-2xl border-2 p-5 bg-white/5 border-white/10">
                      <h3 className="text-lg font-black mb-4 text-white flex items-center gap-2">
                        <Info size={20} className="text-red-400" />
                        Performance & Dimensions
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs font-bold mb-1 text-white/60">Engine</div>
                          <div className="font-black text-white">{selectedCar.fuel === 'Electric' ? 'Electric Motor' : '2.5L V6'}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold mb-1 text-white/60">Horsepower</div>
                          <div className="font-black text-white">{selectedCar.type === 'Sports' ? '450 HP' : '200 HP'}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold mb-1 text-white/60">Acceleration</div>
                          <div className="font-black text-white">{selectedCar.type === 'Sports' ? '3.5s' : '8.2s'}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold mb-1 text-white/60">Top Speed</div>
                          <div className="font-black text-white">{selectedCar.type === 'Sports' ? '280 km/h' : '180 km/h'}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold mb-1 text-white/60">Length</div>
                          <div className="font-black text-white">{selectedCar.type === 'SUV' ? '4.8m' : '4.5m'}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold mb-1 text-white/60">Weight</div>
                          <div className="font-black text-white">{selectedCar.type === 'SUV' ? '2,100 kg' : '1,600 kg'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-lg font-black mb-4 text-white">Premium Features</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedCar.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-bold bg-white/5 border-white/10 text-white">
                            <Check className="text-red-400" size={16} />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Why You'll Love It */}
                    <div className="rounded-2xl border-2 p-6 bg-white/5 border-white/10">
                      <h3 className="text-xl font-black mb-4 text-white flex items-center gap-2">
                        <Award size={24} className="text-red-400" />
                        Why You'll Love This Vehicle
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-4 p-4 rounded-2xl border-2 bg-white/5 border-white/10">
                          <div className="p-3 rounded-xl bg-red-900/30">
                            <Shield className="text-red-400" size={24} />
                          </div>
                          <div>
                            <div className="font-black mb-1 text-white">Safety First</div>
                            <div className="text-sm font-bold text-white/60">Advanced safety features for peace of mind</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-2xl border-2 bg-white/5 border-white/10">
                          <div className="p-3 rounded-xl bg-red-900/30">
                            <TrendingUp className="text-red-400" size={24} />
                          </div>
                          <div>
                            <div className="font-black mb-1 text-white">Great Value</div>
                            <div className="text-sm font-bold text-white/60">Competitive pricing with premium features</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-2xl border-2 bg-white/5 border-white/10">
                          <div className="p-3 rounded-xl bg-red-900/30">
                            <Star className="text-red-400" size={24} />
                          </div>
                          <div>
                            <div className="font-black mb-1 text-white">Top Rated</div>
                            <div className="text-sm font-bold text-white/60">{selectedCar.rating} star rating from {selectedCar.reviews} reviews</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-2xl border-2 bg-white/5 border-white/10">
                          <div className="p-3 rounded-xl bg-red-900/30">
                            <Clock className="text-red-400" size={24} />
                          </div>
                          <div>
                            <div className="font-black mb-1 text-white">Reliable</div>
                            <div className="text-sm font-bold text-white/60">Well-maintained and thoroughly inspected</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Booking Card */}
                  <div className="lg:col-span-1">
                    <div className="rounded-3xl border-2 p-6 bg-white/5 border-white/10 sticky top-6">
                      {/* Price */}
                      <div className="mb-6 pb-6 border-b border-white/10">
                        <div className="text-4xl font-black text-red-400">
                          {formatPrice(selectedCar.price)}
                        </div>
                        <div className="mt-1 text-sm font-bold text-white/60">
                          {selectedCar.listingType === 'rent' ? 'per day' : 'total price'}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full py-4 rounded-2xl font-black text-lg border-2 tracking-wide transition-all bg-red-600 hover:bg-red-500 border-red-500 hover:border-red-400 text-white shadow-lg shadow-red-900/40 mb-4">
                        {selectedCar.listingType === 'rent' ? 'Rent This Car' : 'Buy This Car'}
                      </button>

                      {/* 360 View Button */}
                      <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-lg border-2 tracking-wide transition-all bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30 text-white mb-6">
                        <RotateCw size={20} />
                        View 360° Tour
                      </button>

                      {/* Contact Options */}
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-bold transition-all hover:scale-105 bg-white/5 border-white/10 text-white hover:bg-white/10">
                          <Phone size={18} />
                          Call Us
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-bold transition-all hover:scale-105 bg-white/5 border-white/10 text-white hover:bg-white/10">
                          <Mail size={18} />
                          Email Us
                        </button>
                      </div>

                      {/* Info */}
                      <div className="mt-6 text-xs font-bold leading-relaxed text-white/60">
                        <div>✓ Free cancellation up to 24 hours before pickup</div>
                        <div>✓ Includes insurance and roadside assistance</div>
                        <div>✓ No hidden fees or charges</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}