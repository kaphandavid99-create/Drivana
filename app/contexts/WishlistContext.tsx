"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type WishlistContextValue = {
  wishlistIds: number[];
  toggleWishlist: (carId: number) => void;
  isWishlisted: (carId: number) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const STORAGE_KEY = "drivana:wishlist";

function safeParseWishlist(raw: string | null): number[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    const ids: number[] = [];
    for (const item of parsed) {
      // Accept numeric strings too, but store as real numbers.
      const normalized = typeof item === "number" ? item : Number(item);
      if (Number.isFinite(normalized)) ids.push(normalized);
    }

    // de-dupe
    return Array.from(new Set(ids));
  } catch {
    return [];
  }
}

function normalizeCarId(carId: number): number | null {
  const normalized = Number(carId);
  return Number.isFinite(normalized) ? normalized : null;
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  // Start from the same value on server + first client render to avoid hydration mismatches.
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Load from localStorage only after hydration.
    const raw = window.localStorage.getItem(STORAGE_KEY);
    requestAnimationFrame(() => {
      setWishlistIds(safeParseWishlist(raw));
      setIsMounted(true);
    });
  }, []);

  useEffect(() => {
    // Don't write back until after we've loaded the initial state.
    if (!isMounted) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
  }, [wishlistIds, isMounted]);

  const toggleWishlist = (carId: number) => {
    const normalizedId = normalizeCarId(carId);
    if (normalizedId === null) return;

    setWishlistIds((prev) =>
      prev.includes(normalizedId)
        ? prev.filter((id) => id !== normalizedId)
        : [...prev, normalizedId]
    );
  };

  const clearWishlist = () => setWishlistIds([]);

  const value = useMemo<WishlistContextValue>(
    () => ({
      wishlistIds,
      toggleWishlist,
      isWishlisted: (carId: number) => {
        const normalizedId = normalizeCarId(carId);
        if (normalizedId === null) return false;
        return wishlistIds.includes(normalizedId);
      },
      clearWishlist,
    }),
    [wishlistIds]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
