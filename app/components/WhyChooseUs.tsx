"use client";

import Particles from '../../components/Particles';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function WhyChooseUsPage() {
  const { resolvedTheme } = useTheme();

  return (
    <main className={`min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 md:px-12 lg:px-20 overflow-x-hidden ${
      resolvedTheme === 'dark' 
        ? 'bg-gray-900' 
        : 'bg-slate-50'
    }`}>
      <motion.section 
          className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >

        {/* LEFT SIDE IMAGE */}
        <motion.div 
          className="relative group"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative w-full h-[400px] md:h-[550px] overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 bg-gray-900">
            {/* Dark Background */}
            <div className="absolute inset-0 bg-gray-900 z-0"></div>
            
            {/* Three.js Particles */}
            <div className="absolute inset-0 z-10">
              <Particles className="w-full h-full" />
            </div>
            
            {/* Car Image */}
            <img
              src="/Cars/black_car.png"
              alt="Luxury Car"
              className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110 relative z-20"
            />
          </div>
        </motion.div>

        {/* RIGHT SIDE CONTENT */}
        <motion.div 
          className="flex flex-col justify-center h-full space-y-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.div 
            className="space-y-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <span className={`inline-flex items-center px-4 py-2 rounded-full font-semibold text-sm tracking-wider border ${
              resolvedTheme === 'dark'
                ? 'bg-sky-900 text-sky-300 border-sky-700'
                : 'bg-sky-100 text-sky-700 border-sky-200'
            }`}>
              Why Choose Us
            </span>

            <h1 className={`text-4xl md:text-6xl font-bold leading-tight ${
              resolvedTheme === 'dark'
                ? 'text-gray-100'
                : 'text-gray-900'
            }`}>
              Driving Excellence Every Mile
            </h1>

            <p className={`text-lg leading-relaxed max-w-lg ${
              resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover premium car rentals and vehicle sales designed to
              give you comfort, reliability, affordability, and a smooth
              driving experience wherever you go.
            </p>
          </motion.div>

          {/* FEATURES */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >

            {/* Feature 1 */}
            <motion.div 
              className={`group flex items-start gap-4 p-4 rounded-xl transition-all duration-500 hover:-translate-y-1 ${
                resolvedTheme === 'dark'
                  ? 'bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-700 hover:shadow-xl'
                  : 'bg-white/50 backdrop-blur-sm border-gray-100 hover:bg-white hover:shadow-lg'
              }`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-lg shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className={`text-xl font-bold transition-colors duration-300 ${
                  resolvedTheme === 'dark'
                    ? 'text-gray-100 group-hover:text-sky-400'
                    : 'text-gray-900 group-hover:text-sky-700'
                }`}>
                  24/7 Customer Support
                </h3>

                <p className={`mt-1 leading-relaxed text-sm ${
                  resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Our support team is always available to assist you with
                  bookings, inquiries, and any issues anytime.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className={`group flex items-start gap-4 p-4 rounded-xl transition-all duration-500 hover:-translate-y-1 ${
                resolvedTheme === 'dark'
                  ? 'bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-700 hover:shadow-xl'
                  : 'bg-white/50 backdrop-blur-sm border-gray-100 hover:bg-white hover:shadow-lg'
              }`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-lg shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className={`text-xl font-bold transition-colors duration-300 ${
                  resolvedTheme === 'dark'
                    ? 'text-gray-100 group-hover:text-emerald-400'
                    : 'text-gray-900 group-hover:text-emerald-700'
                }`}>
                  Best Price Guaranteed
                </h3>

                <p className={`mt-1 leading-relaxed text-sm ${
                  resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Get premium vehicles at affordable and competitive prices
                  without compromising quality.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className={`group flex items-start gap-4 p-4 rounded-xl transition-all duration-500 hover:-translate-y-1 ${
                resolvedTheme === 'dark'
                  ? 'bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-700 hover:shadow-xl'
                  : 'bg-white/50 backdrop-blur-sm border-gray-100 hover:bg-white hover:shadow-lg'
              }`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-lg shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className={`text-xl font-bold transition-colors duration-300 ${
                  resolvedTheme === 'dark'
                    ? 'text-gray-100 group-hover:text-purple-400'
                    : 'text-gray-900 group-hover:text-purple-700'
                }`}>
                  Multiple Pickup Locations
                </h3>

                <p className={`mt-1 leading-relaxed text-sm ${
                  resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Convenient pickup and drop-off points across multiple
                  cities for a seamless experience.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
}
