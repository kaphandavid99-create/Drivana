"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";
import {
  MapPin,
  Calendar,
  Search,
  Wallet,
  CarFront,
  Star
} from "lucide-react";

// Simple Button Component
function Button({ children, className = "", variant = "default", size = "default", ...props }: any) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:opacity-50";
  const variants = {
    default: "bg-sky-500 hover:bg-sky-600 text-white",
    outline: "border border-border text-foreground hover:bg-accent",
    ghost: "text-foreground hover:bg-accent"
  };
  const sizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-sm",
    lg: "px-8 py-6 text-lg"
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant as keyof typeof variants]} ${sizes[size as keyof typeof sizes]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Simple Card Component
function Card({ children, className = "" }: any) {
  return (
    <div className={`rounded-xl border border-border bg-card/50 backdrop-blur-md ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }: any) {
  return <div className={className}>{children}</div>;
}

// Simple Badge Component
function Badge({ children, className = "" }: any) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [mode, setMode] = useState<"rent" | "buy">("rent");
  const [mounted, setMounted] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState("");

  useEffect(() => {
    // Defer mounted state update to avoid cascading renders
    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);


  const handleVideoStalled = (ref: React.RefObject<HTMLVideoElement | null>) => {
    if (ref.current) {
      ref.current.play().catch(() => {
        // Retry playback after a short delay
        setTimeout(() => {
          ref.current?.play().catch(() => {});
        }, 100);
      });
    }
  };

  
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background - Desktop Only */}
      <div className="absolute inset-0 z-0 w-full h-full hidden lg:block overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full pointer-events-none"
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src="/BMW_M3_Competition_-_4K_Cinematic_Short_Video(2160p).mp4" type="video/mp4" />
        </video>
      </div>

      {/* High Quality Video - Mobile */}
      <div className="absolute inset-0 z-0 w-full h-full lg:hidden overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setIsVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            filter: 'contrast(1.05) saturate(1.1)',
            transform: 'scale(1.05)',
          }}
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src="/phone-video.mp4" type="video/mp4" />
        </video>
      </div>



      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col pt-20 md:pt-24">
        {/* Main Hero Content */}
        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
          <div className="max-w-4xl mx-auto text-center w-full">
            <div className="space-y-8">
              {/* Big Headline */}
              <div className="space-y-4 text-center">
                <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-medium text-white leading-[1.1] tracking-tight text-center">
                  <span className="block text-center">Find Your</span>
                  <span className="block text-sky-400 text-center">Perfect Ride</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl sm:max-w-3xl mx-auto leading-relaxed text-center">
                  Rent it or Own It. Experience luxury and performance with our premium fleet.
                </p>
              </div>

              {/* Rent/Buy Toggle */}
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

              {/* Dynamic Search Form */}
              <div className="w-full max-w-4xl mx-auto">
                {mode === "rent" ? (
                  /* Rent Search Form */
                  <Card className="backdrop-blur-md border-gray-700 overflow-hidden">
                    <CardContent className="p-4 sm:p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {/* Location */}
                        <div className="relative">
                          <label className="block text-sm font-medium text-white mb-2">
                            Location
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-400" />
                            <input
                              type="text"
                              placeholder="Enter city or airport"
                              className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 bg-black/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all text-sm sm:text-base"
                            />
                          </div>
                        </div>

                        {/* Car Type */}
                        <div className="relative">
                          <label className="block text-sm font-medium text-white mb-2">
                            Car Type
                          </label>
                          <div className="relative">
                            <CarFront className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-400" />
                            <select
                              value={selectedCarType}
                              onChange={(e) => setSelectedCarType(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all appearance-none cursor-pointer"
                              style={{ backgroundColor: 'black', color: 'white' }}
                              data-color-scheme="dark"
                            >
                              <option value="" className="bg-black">All Types</option>
                              <option value="sedan" className="bg-black">Sedan</option>
                              <option value="suv" className="bg-black">SUV</option>
                              <option value="sports" className="bg-black">Sports Car</option>
                              <option value="luxury" className="bg-black">Luxury</option>
                              <option value="electric" className="bg-black">Electric</option>
                              <option value="convertible" className="bg-black">Convertible</option>
                              <option value="van" className="bg-black">Van/Minivan</option>
                            </select>
                          </div>
                        </div>

                        {/* Pick Up Date */}
                        <div className="relative">
                          <label className="block text-sm font-medium text-white mb-2">
                            Pick Up Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-400" />
                            <input
                              type="date"
                              className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all [color-scheme:dark]"
                            />
                          </div>
                        </div>

                        {/* Return Date */}
                        <div className="relative">
                          <label className="block text-sm font-medium text-white mb-2">
                            Return Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-400" />
                            <input
                              type="date"
                              className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all [color-scheme:dark]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Search Button */}
                      <button className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-gray-500/20">
                        <Search className="h-5 w-5" />
                        Search Available Cars
                      </button>
                    </CardContent>
                  </Card>
                ) : (
                  /* Buy Search Form */
                  <Card className="backdrop-blur-md border-gray-700 overflow-hidden">
                    <CardContent className="p-4 sm:p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Location */}
                        <div className="relative">
                          <label className="block text-sm font-medium text-white mb-2">
                            Location
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-400" />
                            <input
                              type="text"
                              placeholder="Enter city or area"
                              className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 bg-black/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all text-sm sm:text-base"
                            />
                          </div>
                        </div>

                        {/* Price Range */}
                        <div className="relative">
                          <label className="block text-sm font-medium text-white mb-2">
                            Price Range (FCFA)
                          </label>
                          <div className="relative">
                            <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-400" />
                            <select className="w-full pl-10 pr-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all appearance-none cursor-pointer"
                              style={{ backgroundColor: 'black', color: 'white' }}
                              data-color-scheme="dark">
                              <option value="" className="bg-black">Any Price</option>
                              <option value="0-10000000" className="bg-black">Under 10M FCFA</option>
                              <option value="10000000-30000000" className="bg-black">10M - 30M FCFA</option>
                              <option value="30000000-60000000" className="bg-black">30M - 60M FCFA</option>
                              <option value="60000000-100000000" className="bg-black">60M - 100M FCFA</option>
                              <option value="100000000+" className="bg-black">100M+ FCFA</option>
                            </select>
                          </div>
                        </div>

                        {/* Car Type */}
                        <div className="relative">
                          <label className="block text-sm font-medium text-white mb-2">
                            Car Type
                          </label>
                          <div className="relative">
                            <CarFront className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-400" />
                            <select className="w-full pl-10 pr-4 py-3 bg-background/40 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all appearance-none cursor-pointer">
                              <option value="" className="bg-background">All Types</option>
                              <option value="sedan" className="bg-background">Sedan</option>
                              <option value="suv" className="bg-background">SUV</option>
                              <option value="sports" className="bg-background">Sports</option>
                              <option value="luxury" className="bg-background">Luxury</option>
                              <option value="electric" className="bg-background">Electric</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Search Button */}
                      <button className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-gray-500/20">
                        <Search className="h-5 w-5" />
                        Find Cars for Sale
                      </button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
