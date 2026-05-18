"use client";

import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useUser } from "@clerk/nextjs";
import { FaArrowLeft, FaCar, FaCalendar, FaMapMarkerAlt, FaClock, FaCheckCircle, FaShieldAlt, FaGasPump, FaUsers, FaCog, FaPhone, FaEnvelope, FaCreditCard, FaIdCard, FaSuitcase } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { rentCars } from "../../../../data/carData";

type Car = {
  id: number;
  name: string;
  type: string;
  year: number;
  price: number;
  strikingPrice?: number;
  realPrice?: number;
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
  params: Promise<{ id: string }>;
};

export default function BookNowPage({ params }: Props) {
  const { resolvedTheme } = useTheme();
  const { isSignedIn } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    dropoffLocation: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    driverLicense: "",
    paymentMethod: "card",
    agreeTerms: false,
  });

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K FCFA`;
    }
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} FCFA`;
  };

  // This would normally come from params, but for now we'll use a mock
  const carId = "201"; // Will be updated to use actual params
  const car = rentCars.find(c => c.id === parseInt(carId)) || rentCars[0];

  // Calculate rental duration and total price
  const calculateDays = () => {
    if (!formData.pickupDate || !formData.returnDate) return 0;
    const pickup = new Date(formData.pickupDate);
    const returnDate = new Date(formData.returnDate);
    const diffTime = Math.abs(returnDate.getTime() - pickup.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const days = calculateDays();
  const dailyRate = car.realPrice || car.price;
  const totalPrice = days * dailyRate;

  if (!isSignedIn) {
    return (
      <div className={`min-h-screen py-16 px-4 flex items-center justify-center ${resolvedTheme === "dark" ? "bg-slate-950" : "bg-slate-50"}`}>
        <div className="max-w-md w-full rounded-3xl border p-10 text-center">
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-200"}`}>
            <FaCar className={resolvedTheme === "dark" ? "text-4xl text-slate-400" : "text-4xl text-slate-600"} />
          </div>
          <h1 className="text-3xl font-black mb-4">Sign In Required</h1>
          <p className={`mb-8 font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
            You need to sign in to book this vehicle
          </p>
          <div className="space-y-3">
            <Link href="/sign-in" className="block w-full py-3 px-6 rounded-2xl font-black text-base border tracking-wide transition-all bg-sky-500 hover:bg-sky-600 border-sky-400 hover:border-sky-500 text-white shadow-lg shadow-sky-500/30">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Booking submitted:", formData);
    setStep(3);
  };

  const handleDatesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.pickupDate && formData.returnDate) {
      setStep(2);
    }
  };

  return (
    <div className={`min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 ${resolvedTheme === "dark" ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/cars/${carId}`} className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-4">
            <FaArrowLeft />
            <span className="font-bold">Back to Car Details</span>
          </Link>
          <h1 className={`text-4xl md:text-5xl font-black ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
            Book {car.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className={`rounded-2xl border p-6 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <div className="flex items-center justify-between mb-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      step >= s
                        ? "bg-sky-500 text-white"
                        : resolvedTheme === "dark"
                          ? "bg-slate-800 text-slate-400"
                          : "bg-slate-200 text-slate-600"
                    }`}>
                      {step > s ? <FaCheckCircle /> : s}
                    </div>
                    {s < 3 && (
                      <div className={`w-full h-1 mx-2 transition-all ${
                        step > s ? "bg-sky-500" : resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-200"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span className={step >= 1 ? "text-sky-500" : resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}>Dates & Location</span>
                <span className={step >= 2 ? "text-sky-500" : resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}>Personal Info</span>
                <span className={step >= 3 ? "text-sky-500" : resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}>Confirmation</span>
              </div>
            </div>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl border p-6 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
              >
                <h2 className={`text-2xl font-black mb-6 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Select Rental Dates
                </h2>
                <form onSubmit={handleDatesSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Pick-up Date
                      </label>
                      <div className="relative">
                        <input
                          ref={(el) => {
                            if (el) {
                              el.style.colorScheme = resolvedTheme === 'dark' ? 'dark' : 'light';
                            }
                          }}
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.pickupDate}
                          onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                          className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                            resolvedTheme === "dark"
                              ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
                              : "bg-white border-slate-200 text-slate-900 focus:border-sky-500"
                          }`}
                          id="pickupDate"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById('pickupDate') as HTMLInputElement;
                            if (input) {
                              if (typeof input.showPicker === 'function') {
                                input.showPicker();
                              } else {
                                input.focus();
                              }
                            }
                          }}
                          className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all hover:scale-110 ${
                            resolvedTheme === "dark" ? "text-slate-400 hover:text-sky-400" : "text-slate-500 hover:text-sky-500"
                          }`}
                        >
                          <FaCalendar className="text-lg" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Return Date
                      </label>
                      <div className="relative">
                        <input
                          ref={(el) => {
                            if (el) {
                              el.style.colorScheme = resolvedTheme === 'dark' ? 'dark' : 'light';
                            }
                          }}
                          type="date"
                          required
                          min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                          value={formData.returnDate}
                          onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                          className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                            resolvedTheme === "dark"
                              ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
                              : "bg-white border-slate-200 text-slate-900 focus:border-sky-500"
                          }`}
                          id="returnDate"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById('returnDate') as HTMLInputElement;
                            if (input) {
                              if (typeof input.showPicker === 'function') {
                                input.showPicker();
                              } else {
                                input.focus();
                              }
                            }
                          }}
                          className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all hover:scale-110 ${
                            resolvedTheme === "dark" ? "text-slate-400 hover:text-sky-400" : "text-slate-500 hover:text-sky-500"
                          }`}
                        >
                          <FaCalendar className="text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        <FaMapMarkerAlt className="inline mr-2 text-sky-500" />
                        Pick-up Location
                      </label>
                      <select
                        required
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                          resolvedTheme === "dark"
                            ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
                            : "bg-white border-slate-200 text-white focus:border-sky-500"
                        }`}
                      >
                        <option value="">Select location</option>
                        <option value="douala-airport">Douala Airport</option>
                        <option value="yaounde-airport">Yaoundé Airport</option>
                        <option value="douala-city">Douala City Center</option>
                        <option value="yaounde-city">Yaoundé City Center</option>
                        <option value="bafoussam">Bafoussam</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        <FaMapMarkerAlt className="inline mr-2 text-sky-500" />
                        Drop-off Location
                      </label>
                      <select
                        required
                        value={formData.dropoffLocation}
                        onChange={(e) => setFormData({...formData, dropoffLocation: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                          resolvedTheme === "dark"
                            ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
                            : "bg-white border-slate-200 text-white focus:border-sky-500"
                        }`}
                      >
                        <option value="">Select location</option>
                        <option value="same">Same as pick-up</option>
                        <option value="douala-airport">Douala Airport</option>
                        <option value="yaounde-airport">Yaoundé Airport</option>
                        <option value="douala-city">Douala City Center</option>
                        <option value="yaounde-city">Yaoundé City Center</option>
                        <option value="bafoussam">Bafoussam</option>
                      </select>
                    </div>
                  </div>
                  {days > 0 && (
                    <div className={`p-4 rounded-xl ${resolvedTheme === "dark" ? "bg-sky-500/10 border border-sky-500/30" : "bg-sky-50 border border-sky-200"}`}>
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                          <FaClock className="inline mr-2 text-sky-500" />
                          Rental Duration
                        </span>
                        <span className={`text-2xl font-black ${resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"}`}>
                          {days} {days === 1 ? 'day' : 'days'}
                        </span>
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={!formData.pickupDate || !formData.returnDate}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all border-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                      resolvedTheme === "dark"
                        ? "bg-sky-600 hover:bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-900/40"
                        : "bg-sky-500 hover:bg-sky-600 border-sky-400 text-white shadow-lg shadow-sky-500/30"
                    }`}
                  >
                    Continue to Personal Info
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl border p-6 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
              >
                <h2 className={`text-2xl font-black mb-6 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Personal Information
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                          resolvedTheme === "dark"
                            ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
                            : "bg-white border-slate-200 text-slate-900 focus:border-sky-500"
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                          resolvedTheme === "dark"
                            ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
                            : "bg-white border-slate-200 text-slate-900 focus:border-sky-500"
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        resolvedTheme === "dark"
                          ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
                          : "bg-white border-slate-200 text-slate-900 focus:border-sky-500"
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        resolvedTheme === "dark"
                          ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
                          : "bg-white border-slate-200 text-slate-900 focus:border-sky-500"
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      <FaIdCard className="inline mr-2 text-sky-500" />
                      Driver's License Number
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.driverLicense}
                      onChange={(e) => setFormData({...formData, driverLicense: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        resolvedTheme === "dark"
                          ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
                          : "bg-white border-slate-200 text-slate-900 focus:border-sky-500"
                      }`}
                      placeholder="Enter your license number"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Payment Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, paymentMethod: "card"})}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.paymentMethod === "card"
                            ? "border-sky-500 bg-sky-500/10"
                            : resolvedTheme === "dark"
                              ? "border-slate-700 hover:border-slate-600"
                              : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <FaCreditCard className={`text-2xl mb-2 ${formData.paymentMethod === "card" ? "text-sky-500" : resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`} />
                        <div className={`font-bold ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>Credit Card</div>
                        <div className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Pay online</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, paymentMethod: "cash"})}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.paymentMethod === "cash"
                            ? "border-sky-500 bg-sky-500/10"
                            : resolvedTheme === "dark"
                              ? "border-slate-700 hover:border-slate-600"
                              : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <FaSuitcase className={`text-2xl mb-2 ${formData.paymentMethod === "cash" ? "text-sky-500" : resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`} />
                        <div className={`font-bold ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>Pay on Pickup</div>
                        <div className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Cash at location</div>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                      className="mt-1 w-5 h-5 rounded border-2 border-slate-300"
                    />
                    <label htmlFor="terms" className={`text-sm ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      I agree to the rental terms and conditions, and confirm that I have a valid driver's license
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all border-2 ${
                        resolvedTheme === "dark"
                          ? "border-slate-700 text-slate-200 hover:bg-slate-800"
                          : "border-slate-200 text-slate-800 hover:bg-slate-100"
                      }`}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all border-2 ${
                        resolvedTheme === "dark"
                          ? "bg-sky-600 hover:bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-900/40"
                          : "bg-sky-500 hover:bg-sky-600 border-sky-400 text-white shadow-lg shadow-sky-500/30"
                      }`}
                    >
                      Complete Booking
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl border p-8 text-center ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
              >
                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-emerald-500/20">
                  <FaCheckCircle className="text-4xl text-emerald-500" />
                </div>
                <h2 className={`text-3xl font-black mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Booking Confirmed!
                </h2>
                <p className={`mb-6 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  Your rental has been successfully booked. A confirmation email has been sent to {formData.email}.
                </p>
                <div className={`inline-block p-4 rounded-xl mb-6 ${resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
                  <div className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Booking Reference</div>
                  <div className={`text-2xl font-black ${resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"}`}>
                    DRV-{carId}-{Date.now().toString().slice(-6)}
                  </div>
                </div>
                <div className="mt-8 space-y-3">
                  <Link href="/cars" className={`inline-block px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 ${
                    resolvedTheme === "dark"
                      ? "bg-sky-600 hover:bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-900/40"
                      : "bg-sky-500 hover:bg-sky-600 border-sky-400 text-white shadow-lg shadow-sky-500/30"
                  }`}>
                    Browse More Cars
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Car Summary */}
          <div className="space-y-6">
            <div className={`rounded-2xl border p-6 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <h3 className={`text-xl font-black mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                Vehicle Summary
              </h3>
              <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-slate-800">
                <img
                  src={car.images?.exterior}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className={`font-bold text-lg mb-2 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                {car.name}
              </h4>
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-1 rounded text-xs font-bold ${resolvedTheme === "dark" ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"}`}>
                  {car.year}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${resolvedTheme === "dark" ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"}`}>
                  {car.type}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className={`text-center p-2 rounded-lg ${resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
                  <FaUsers className="text-sky-500 mx-auto mb-1" />
                  <div className={`text-xs ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Seats</div>
                  <div className={`font-bold ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>{car.seats}</div>
                </div>
                <div className={`text-center p-2 rounded-lg ${resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
                  <FaGasPump className="text-sky-500 mx-auto mb-1" />
                  <div className={`text-xs ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Fuel</div>
                  <div className={`font-bold ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>{car.fuel}</div>
                </div>
                <div className={`text-center p-2 rounded-lg ${resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
                  <FaCog className="text-sky-500 mx-auto mb-1" />
                  <div className={`text-xs ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Trans</div>
                  <div className={`font-bold ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>{car.transmission === 'Automatic' ? 'Auto' : 'Manual'}</div>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl border p-6 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <h3 className={`text-xl font-black mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                Rental Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Daily Rate</span>
                  <span className={`font-bold ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {formatPrice(dailyRate)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Duration</span>
                  <span className={`font-bold ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {days} {days === 1 ? 'day' : 'days'}
                  </span>
                </div>
                {car.strikingPrice && car.strikingPrice > car.price && (
                  <div className="flex justify-between items-center">
                    <span className={`text-sm line-through ${resolvedTheme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Original Total</span>
                    <span className={`text-sm line-through ${resolvedTheme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                      {formatPrice(days * car.strikingPrice)}
                    </span>
                  </div>
                )}
                <div className={`border-t pt-3 ${resolvedTheme === "dark" ? "border-slate-800" : "border-slate-200"}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-lg font-bold ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>Total</span>
                    <span className={`text-2xl font-black ${resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"}`}>
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl border p-6 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <h3 className={`text-xl font-black mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                What's Included
              </h3>
              <div className="space-y-3">
                {[
                  { icon: FaShieldAlt, text: "Insurance Coverage" },
                  { icon: FaClock, text: "24/7 Roadside Assistance" },
                  { icon: FaSuitcase, text: "Unlimited Mileage" },
                  { icon: FaGasPump, text: "Full Tank Fuel" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <item.icon className="text-sky-500" />
                    <span className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-2xl border p-6 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <h3 className={`text-xl font-black mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                Need Help?
              </h3>
              <div className="space-y-3">
                <a href="tel:+237123456789" className={`flex items-center gap-3 p-3 rounded-lg transition-all ${resolvedTheme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>
                  <FaPhone className="text-sky-500" />
                  <span className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>+237 123 456 789</span>
                </a>
                <a href="mailto:support@drivana.com" className={`flex items-center gap-3 p-3 rounded-lg transition-all ${resolvedTheme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>
                  <FaEnvelope className="text-sky-500" />
                  <span className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>support@drivana.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
