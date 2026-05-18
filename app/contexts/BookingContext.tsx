"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Booking = {
  id: string;
  carId: number;
  carName: string;
  carImage: string;
  carYear: number;
  carType: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  driverLicense: string;
  paymentMethod: string;
  totalPrice: number;
  days: number;
  dailyRate: number;
  createdAt: string;
};

type BookingContextValue = {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => void;
  removeBooking: (id: string) => void;
  clearBookings: () => void;
  bookingCount: number;
};

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

const STORAGE_KEY = "drivana:bookings";

function safeParseBookings(raw: string | null): Booking[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as Booking[];
  } catch {
    return [];
  }
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    requestAnimationFrame(() => {
      setBookings(safeParseBookings(raw));
      setIsMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings, isMounted]);

  const addBooking = (booking: Omit<Booking, "id" | "createdAt">) => {
    const newBooking: Booking = {
      ...booking,
      id: `DRV-${booking.carId}-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const removeBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const clearBookings = () => setBookings([]);

  const value = useMemo<BookingContextValue>(
    () => ({
      bookings,
      addBooking,
      removeBooking,
      clearBookings,
      bookingCount: bookings.length,
    }),
    [bookings]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookings must be used within a BookingProvider");
  return ctx;
}
