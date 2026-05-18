"use client";

import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useUser } from "@clerk/nextjs";
import { FaArrowLeft, FaCar, FaCreditCard, FaMapMarkerAlt, FaShieldAlt, FaCheckCircle, FaClock, FaTruck, FaFileAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { localCars } from "../../../../data/carData";

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

export default function BuyNowPage({ params }: Props) {
  const { resolvedTheme } = useTheme();
  const { isSignedIn } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "financing",
    downPayment: "",
    loanTerm: "36",
    agreeTerms: false,
  });

  const formatPrice = (price: number) => {
    if (price > 100000) {
      return `${(price / 1000000).toFixed(1)}M FCFA`;
    }
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} FCFA`;
  };

  // This would normally come from params, but for now we'll use a mock
  const carId = "101"; // Will be updated to use actual params
  const car = localCars.find(c => c.id === parseInt(carId)) || localCars[0];

  if (!isSignedIn) {
    return (
      <div className={`min-h-screen py-16 px-4 flex items-center justify-center ${resolvedTheme === "dark" ? "bg-slate-950" : "bg-slate-50"}`}>
        <div className="max-w-md w-full rounded-3xl border p-10 text-center">
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-200"}`}>
            <FaCar className={resolvedTheme === "dark" ? "text-4xl text-slate-400" : "text-4xl text-slate-600"} />
          </div>
          <h1 className="text-3xl font-black mb-4">Sign In Required</h1>
          <p className={`mb-8 font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
            You need to sign in to purchase this vehicle
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
    console.log("Purchase submitted:", formData);
    setStep(3);
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
            Purchase {car.name}
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
                <span className={step >= 1 ? "text-sky-500" : resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}>Personal Info</span>
                <span className={step >= 2 ? "text-sky-500" : resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}>Payment</span>
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
                  Personal Information
                </h2>
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
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
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        resolvedTheme === "dark"
                          ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
                          : "bg-white border-slate-200 text-slate-900 focus:border-sky-500"
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        resolvedTheme === "dark"
                          ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
                          : "bg-white border-slate-200 text-slate-900 focus:border-sky-500"
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all border-2 ${
                      resolvedTheme === "dark"
                        ? "bg-sky-600 hover:bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-900/40"
                        : "bg-sky-500 hover:bg-sky-600 border-sky-400 text-white shadow-lg shadow-sky-500/30"
                    }`}
                  >
                    Continue to Payment
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
                  Payment Method
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, paymentMethod: "financing"})}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.paymentMethod === "financing"
                          ? "border-sky-500 bg-sky-500/10"
                          : resolvedTheme === "dark"
                            ? "border-slate-700 hover:border-slate-600"
                            : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <FaCreditCard className={`text-2xl mb-2 ${formData.paymentMethod === "financing" ? "text-sky-500" : resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`} />
                      <div className={`font-bold ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>Financing</div>
                      <div className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Monthly payments</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, paymentMethod: "full"})}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.paymentMethod === "full"
                          ? "border-sky-500 bg-sky-500/10"
                          : resolvedTheme === "dark"
                            ? "border-slate-700 hover:border-slate-600"
                            : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <FaShieldAlt className={`text-2xl mb-2 ${formData.paymentMethod === "full" ? "text-sky-500" : resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`} />
                      <div className={`font-bold ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>Full Payment</div>
                      <div className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Pay in full</div>
                    </button>
                  </div>

                  {formData.paymentMethod === "financing" && (
                    <div className="space-y-4 p-4 rounded-xl border-2 border-sky-500/30 bg-sky-500/5">
                      <div>
                        <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                          Down Payment (FCFA)
                        </label>
                        <input
                          type="number"
                          required
                          value={formData.downPayment}
                          onChange={(e) => setFormData({...formData, downPayment: e.target.value})}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                            resolvedTheme === "dark"
                              ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
                              : "bg-white border-slate-200 text-slate-900 focus:border-sky-500"
                          }`}
                          placeholder="e.g., 5000000"
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-bold mb-2 ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                          Loan Term (months)
                        </label>
                        <select
                          value={formData.loanTerm}
                          onChange={(e) => setFormData({...formData, loanTerm: e.target.value})}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                            resolvedTheme === "dark"
                              ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
                              : "bg-white border-slate-200 text-slate-900 focus:border-sky-500"
                          }`}
                        >
                          <option value="12">12 months</option>
                          <option value="24">24 months</option>
                          <option value="36">36 months</option>
                          <option value="48">48 months</option>
                          <option value="60">60 months</option>
                        </select>
                      </div>
                    </div>
                  )}

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
                      I agree to the terms and conditions of the purchase agreement and privacy policy
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
                      Complete Purchase
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
                  Purchase Request Submitted!
                </h2>
                <p className={`mb-6 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  Thank you for your purchase request. Our team will contact you within 24 hours to finalize the transaction.
                </p>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
                  <FaPhone className="text-sky-500" />
                  <span className={`font-bold ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>+237 123 456 789</span>
                </div>
                <div className="mt-8">
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
              <div className={`border-t pt-4 ${resolvedTheme === "dark" ? "border-slate-800" : "border-slate-200"}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Price</span>
                  <span className={`text-2xl font-black ${resolvedTheme === "dark" ? "text-sky-400" : "text-sky-600"}`}>
                    {formatPrice(car.realPrice || car.price)}
                  </span>
                </div>
                {car.strikingPrice && car.strikingPrice > car.price && (
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm line-through ${resolvedTheme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Original Price</span>
                    <span className={`text-sm line-through ${resolvedTheme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                      {formatPrice(car.strikingPrice)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-emerald-400" : "text-emerald-600"}`}>You Save</span>
                  <span className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-emerald-400" : "text-emerald-600"}`}>
                    {car.strikingPrice && car.strikingPrice > car.price ? formatPrice(car.strikingPrice - car.price) : "0 FCFA"}
                  </span>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl border p-6 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <h3 className={`text-xl font-black mb-4 ${resolvedTheme === "dark" ? "text-white" : "text-slate-900"}`}>
                What's Included
              </h3>
              <div className="space-y-3">
                {[
                  { icon: FaShieldAlt, text: "Vehicle Warranty" },
                  { icon: FaFileAlt, text: "Complete Documentation" },
                  { icon: FaTruck, text: "Free Delivery" },
                  { icon: FaClock, text: "24/7 Support" },
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
                <a href="mailto:sales@drivana.com" className={`flex items-center gap-3 p-3 rounded-lg transition-all ${resolvedTheme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>
                  <FaEnvelope className="text-sky-500" />
                  <span className={`text-sm font-bold ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>sales@drivana.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
