"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface WishlistContextType {
  wishlist: number[];
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  toggleWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    // Initialize wishlist from localStorage
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e);
        setWishlist([]);
      }
    }
    
    setIsClient(true);
  }, []);

  const addToWishlist = (id: number) => {
    setWishlist((prev) => {
      const newWishlist = [...prev, id];
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      }
      return newWishlist;
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => {
      const newWishlist = prev.filter((carId) => carId !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      }
      return newWishlist;
    });
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const newWishlist = prev.includes(id) 
        ? prev.filter((carId) => carId !== id)
        : [...prev, id];
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      }
      return newWishlist;
    });
  };

  const isInWishlist = (id: number) => {
    return wishlist.includes(id);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlist, 
        addToWishlist, 
        removeFromWishlist, 
        toggleWishlist, 
        isInWishlist,
        wishlistCount 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
