"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Fuel, Users, Zap, ChevronDown, X, MapPin, Calendar, CarFront, Wallet, Search, Star, Shield, CheckCircle2 } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { localCars } from "../../data/carData";

// Toyota cars data
const toyotaCars = [
  {
    id: 1,
    name: "Toyota Camry",
    type: "Sedan",
    year: 2024,
    price: 51000,
    listingType: "rent",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80",
    seats: 5,
    fuel: "Gasoline",
    transmission: "Automatic",
    features: ["Lane Assist", "USB Ports", "Keyless Entry", "Bluetooth", "Backup Camera"],
    rating: 4.5,
    reviews: 189,
  },
];

const allCars = [...toyotaCars, ...localCars];

export default function CarsPage() {
  const { resolvedTheme } = useTheme();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("all");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"rent" | "buy">("rent");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [visibleCars, setVisibleCars] = useState(12);

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

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]
    );
  };

  const handleSearch = () => {
    // Search is now always active, filters update in real-time
  };

  const formatPrice = (price: number) => {
    if (price > 100000) {
      return `${(price / 1000000).toFixed(1)}M FCFA`;
    }
    return `${price.toLocaleString()} FCFA`;
  };

  return (
    <div className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 ${
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
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 border-sky-300 transition-all focus:outline-none focus:ring-2 appearance-none cursor-pointer ${
                            resolvedTheme === 'dark'
                              ? 'bg-slate-800/50 focus:border-red-500 focus:ring-red-500/20 text-white'
                              : 'bg-white focus:border-red-500 focus:ring-red-500/20 text-slate-900'
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
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 border-sky-300 transition-all focus:outline-none focus:ring-2 appearance-none cursor-pointer ${
                            resolvedTheme === 'dark'
                              ? 'bg-slate-800/50 focus:border-red-500 focus:ring-red-500/20 text-white'
                              : 'bg-white focus:border-red-500 focus:ring-red-500/20 text-slate-900'
                          }`}
                          style={{ backgroundColor: 'transparent' }}
                        >
                          <option value="">Any Price</option>
                          <option value="0-10000000">Under 10M FCFA</option>
                          <option value="10000000-30000000">10M - 30M FCFA</option>
                          <option value="30000000-60000000">30M - 60M FCFA</option>
                          <option value="60000000-100000000">60M - 100M FCFA</option>
                          <option value="100000000+">100M+ FCFA</option>
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
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 border-sky-300 transition-all focus:outline-none focus:ring-2 appearance-none cursor-pointer ${
                            resolvedTheme === 'dark'
                              ? 'bg-slate-800/50 focus:border-red-500 focus:ring-red-500/20 text-white'
                              : 'bg-white focus:border-red-500 focus:ring-red-500/20 text-slate-900'
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
                    Find Cars for Sale
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
                    src={car.image}
                    alt={car.name}
                    fill
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
                        wishlist.includes(car.id)
                          ? 'bg-red-500/80 border-red-400 shadow-lg shadow-red-500/50'
                          : resolvedTheme === 'dark'
                            ? 'bg-slate-900/50 border-slate-700 hover:bg-slate-800/80'
                            : 'bg-white/80 border-slate-300 hover:bg-white'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          wishlist.includes(car.id)
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
                    <p className={`text-lg font-bold ${
                      resolvedTheme === 'dark' ? 'text-red-400' : 'text-red-600'
                    }`}>
                      {formatPrice(car.price)}
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
                  <Link href={`/cars/${car.id}`} className="mt-auto">
                    <button className={`w-full py-2 rounded-xl font-bold text-xs transition-all border-2 tracking-wide ${
                      resolvedTheme === 'dark'
                        ? 'bg-red-700 hover:bg-red-600 border-red-600 hover:border-red-500 text-white shadow-lg shadow-red-900/40 hover:shadow-red-900/60'
                        : 'bg-red-500 hover:bg-red-600 border-red-400 hover:border-red-500 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50'
                    }`}>
                      {car.listingType === 'rent' ? 'Rent Now' : 'Buy Now'}
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
    </div>
  );
}