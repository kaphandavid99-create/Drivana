 "use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../contexts/ThemeContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { useUser } from "@clerk/nextjs";
import { FaHeart, FaGasPump, FaUsers, FaStar, FaArrowLeft, FaCar, FaShieldAlt, FaClock, FaMapMarkerAlt, FaCalendar, FaCheck, FaShareAlt, FaCamera, FaTachometerAlt, FaCog, FaPalette, FaTimes, FaEye, FaInfoCircle, FaAward, FaBluetooth, FaMap, FaMobileAlt, FaSnowflake, FaWind, FaVolumeUp, FaWifi, FaUser, FaFileAlt, FaCreditCard, FaWrench, FaBuilding } from "react-icons/fa";
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
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} FCFA`;
}

function priceSuffix(listingType: "rent" | "sell") {
  return listingType === "rent" ? "per day" : "total price";
}

export default function CarDetailClient({ carId }: Props) {
  const { resolvedTheme } = useTheme();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeView, setActiveView] = useState<'exterior' | 'interior' | 'dashboard' | 'engine'>('exterior');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const allCars = useMemo(() => [...localCars, ...rentCars], []);
  const car = useMemo(() => {
    if (!carId || carId === 'undefined' || carId === '') return null;
    const idNum = Number(carId);
    return allCars.find((c) => c.id === idNum || String(c.id) === carId);
  }, [allCars, carId]);

  const currentImage = car?.images ? car.images[activeView] : '/Cars/2007 camaro concept/exterior.jpeg';

  const colors = [
    { name: 'Midnight Black', hex: '#1a1a1a' },
    { name: 'Pearl White', hex: '#f5f5f5' },
    { name: 'Silver Metallic', hex: '#c0c0c0' },
    { name: 'Ocean Blue', hex: '#1e3a5f' },
    { name: 'Ruby Red', hex: '#8b0000' },
    { name: 'Sunburst Yellow', hex: '#FFD700' }
  ];

  if (!car) {
    return (
      <div className={`min-h-screen py-16 px-4 ${resolvedTheme === "dark" ? "bg-slate-950" : "bg-slate-50"}`}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-dashed p-10 text-center">
            <h1 className="text-3xl font-black">Car not found</h1>
            <p className="mt-3 font-bold">We couldn't find a vehicle for ID: {carId}.</p>
            <div className="mt-6">
              <Link href="/cars" className="inline-flex items-center justify-center px-6 py-3 rounded-2xl border font-black">
                Back to Cars
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-16 ${resolvedTheme === "dark" ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/cars" className="lg:hidden flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
            <FaArrowLeft />
            <span className="font-bold">Back to Cars</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleWishlist(car.id)}
              className={`p-3 rounded-full border transition-all ${
                isWishlisted(car.id)
                  ? "bg-red-50 border-red-400 text-red-500"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <FaHeart className={isWishlisted(car.id) ? "text-red-500" : ""} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className={`rounded-2xl border overflow-hidden ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <div className="flex gap-2 p-2 border-b border-slate-200 dark:border-slate-800">
                {['exterior', 'interior', 'dashboard', 'engine'].map((view) => (
                  <button
                    key={view}
                    onClick={() => setActiveView(view as any)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm capitalize transition-all ${
                      activeView === view
                        ? "bg-sky-500 text-white"
                        : resolvedTheme === "dark"
                          ? "text-slate-400 hover:bg-slate-800"
                          : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
              <div className="relative aspect-video">
                <Image
                  src={currentImage}
                  alt={`${car.name} - ${activeView}`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    car.listingType === "rent"
                      ? "bg-emerald-500 text-white"
                      : "bg-red-500 text-white"
                  }`}>
                    {car.listingType === "rent" ? "FOR RENT" : "FOR SALE"}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    resolvedTheme === "dark" ? "bg-slate-900 text-white" : "bg-white text-slate-800"
                  }`}>
                    {car.year}
                  </span>
                </div>
                {car.rating && (
                  <div className={`absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg ${
                    resolvedTheme === "dark" ? "bg-slate-900" : "bg-white"
                  }`}>
                    <FaStar className="text-amber-500" />
                    <span className="font-bold">{car.rating}</span>
                    <span className="text-sm text-slate-500">({car.reviews})</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2 p-2">
                {car?.images && Object.entries(car.images).map(([key, img]) => (
                  <button
                    key={key}
                    onClick={() => setActiveView(key as any)}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      activeView === key ? "border-sky-500" : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt={key} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Car Info */}
            <div className={`rounded-2xl border p-6 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <h1 className={`text-3xl font-black mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                {car.name}
              </h1>
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-sky-500" />
                  <span className={resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}>Douala, Cameroon</span>
                </div>
                {car.rating && (
                  <div className="flex items-center gap-2">
                    <FaStar className="text-amber-500" />
                    <span className="font-bold">{car.rating}</span>
                    <span className={resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}>({car.reviews} reviews)</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { icon: FaCar, value: car.type },
                  { icon: FaGasPump, value: car.fuel },
                  { icon: FaCog, value: car.transmission },
                  { icon: FaUsers, value: `${car.seats} seats` },
                ].map((item, idx) => (
                  <span key={idx} className={`px-3 py-2 rounded-lg text-sm font-bold border flex items-center gap-2 ${
                    resolvedTheme === "dark" ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}>
                    <item.icon className="text-sky-500" /> {item.value}
                  </span>
                ))}
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className={`text-4xl font-black ${resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"}`}>
                    {formatPrice(car.price, car.listingType as "rent" | "sell")}
                  </div>
                  {'strikingPrice' in car && car.strikingPrice > car.price && (
                    <div className={`text-sm line-through ${resolvedTheme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                      {formatPrice(car.strikingPrice, car.listingType as "rent" | "sell")}
                    </div>
                  )}
                  <div className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    {priceSuffix(car.listingType as "rent" | "sell")}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={car.listingType === "rent" ? `/cars/${car.id}/book` : `/cars/${car.id}/buy`}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                      resolvedTheme === "dark" ? "bg-sky-600 text-white hover:bg-sky-500" : "bg-sky-500 text-white hover:bg-sky-600"
                    }`}
                  >
                    {car.listingType === "rent" ? "Book Now" : "Buy Now"}
                  </Link>
                  <button className={`px-6 py-3 rounded-xl font-bold text-sm border transition-all ${
                    resolvedTheme === "dark" ? "border-slate-700 text-slate-200 hover:bg-slate-800" : "border-slate-200 text-slate-800 hover:bg-slate-100"
                  }`}>
                    Contact
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className={`rounded-2xl border p-6 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <h2 className={`text-xl font-black mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                About This Vehicle
              </h2>
              <p className={`leading-relaxed ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                Experience the perfect blend of performance, comfort, and style with this exceptional {car.type}. 
                Meticulously maintained and featuring premium amenities, this vehicle offers an unparalleled driving experience 
                that will exceed your expectations.
              </p>
            </div>

            {/* Color Selector */}
            <div className={`rounded-2xl border p-6 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <h2 className={`text-xl font-black mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                Available Colors
              </h2>
              <div className="flex flex-wrap gap-3">
                {colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`relative group`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full border-4 transition-all ${
                        selectedColor === idx ? "border-sky-500 ring-2 ring-sky-500/50" : "border-slate-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${
                      resolvedTheme === "dark" ? "bg-slate-800 text-white" : "bg-slate-900 text-white"
                    }`}>
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
              <div className={`mt-4 text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                Selected: {colors[selectedColor].name}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Specifications */}
            <div className={`rounded-2xl border p-6 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <h2 className={`text-xl font-black mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                Specifications
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Mileage", value: "12,000 km", icon: FaTachometerAlt },
                  { label: "Engine", value: "V8 Twin Turbo", icon: FaWrench },
                  { label: "Transmission", value: car.transmission, icon: FaCog },
                  { label: "Fuel", value: car.fuel, icon: FaGasPump },
                  { label: "Year", value: car.year.toString(), icon: FaCalendar },
                  { label: "Drive", value: "AWD", icon: FaCar },
                ].map((spec, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border ${resolvedTheme === "dark" ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                    <spec.icon className={`text-sky-500 mb-1`} />
                    <div className={`text-xs ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{spec.label}</div>
                    <div className={`font-bold ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className={`rounded-2xl border p-6 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <h2 className={`text-xl font-black mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                Features
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: FaBluetooth, name: "Bluetooth" },
                  { icon: FaMap, name: "GPS" },
                  { icon: FaCamera, name: "Camera" },
                  { icon: FaMobileAlt, name: "CarPlay" },
                  { icon: FaSnowflake, name: "Heated Seats" },
                  { icon: FaWind, name: "A/C" },
                  { icon: FaVolumeUp, name: "Premium Audio" },
                  { icon: FaWifi, name: "USB" },
                ].map((feature, idx) => (
                  <div key={idx} className={`flex items-center gap-2 p-2 rounded-lg ${resolvedTheme === "dark" ? "bg-slate-950" : "bg-slate-50"}`}>
                    <feature.icon className="text-sky-500 text-sm" />
                    <span className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dealer Info */}
            <div className={`rounded-2xl border p-6 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <h2 className={`text-xl font-black mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                Dealer
              </h2>
              <div className={`p-4 rounded-lg border ${resolvedTheme === "dark" ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-200"}`}>
                    <FaBuilding className={resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"} />
                  </div>
                  <div>
                    <div className={`font-bold ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>Drivana Motors</div>
                    <div className={`text-xs ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Verified Dealer</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className={`flex-1 py-2 rounded-lg font-bold text-sm border ${resolvedTheme === "dark" ? "border-slate-700 text-slate-200 hover:bg-slate-800" : "border-slate-200 text-slate-800 hover:bg-slate-100"}`}>
                    Call
                  </button>
                  <button className={`flex-1 py-2 rounded-lg font-bold text-sm border ${resolvedTheme === "dark" ? "border-slate-700 text-slate-200 hover:bg-slate-800" : "border-slate-200 text-slate-800 hover:bg-slate-100"}`}>
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
