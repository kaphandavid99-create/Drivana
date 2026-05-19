"use client";

import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import Link from "next/link";

export default function AboutUs() {
  const { resolvedTheme } = useTheme();

  return (
     <motion.div 
          className="relative group"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
    <section className={`w-full py-20 px-6 md:px-12 ${
      resolvedTheme === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
        
        {/* Left Image */}
        <div className="relative w-full h-[350px] rounded-[35px] overflow-hidden shadow-lg">
          <img
            src="/man.jpeg"
            alt="Customer"
            className="w-full h-full object-cover"
          />

          {/* Border Effect */}
          <div className={`absolute inset-3 border rounded-[28px] ${
            resolvedTheme === 'dark' ? 'border-gray-700/70' : 'border-white/70'
          }`}></div>
        </div>

        {/* Center Content */}
        <div className="text-center px-2">
          <h2 className={`text-4xl md:text-5xl font-bold ${
            resolvedTheme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            About <span className="text-sky-500">Us</span>
          </h2>

          <p className={`mt-6 leading-8 text-lg ${
            resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Your trusted destination for renting and buying premium cars.
            We provide affordable pricing, luxury vehicles, and a smooth
            customer experience designed to make every journey memorable.
          </p>

          <Link href="/about" className="mt-8 inline-block bg-green-500 hover:bg-green-600 transition-all duration-300 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-md">
            Learn More
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-[350px] rounded-[35px] overflow-hidden shadow-lg">
          <img
            src="/woman.jpeg"
            alt="Car Dealer"
            className="w-full h-full object-cover"
          />

          {/* Border Effect */}
          <div className={`absolute inset-3 border rounded-[28px] ${
            resolvedTheme === 'dark' ? 'border-gray-700/70' : 'border-white/70'
          }`}></div>
        </div>
      </div>
    </section>
    </motion.div>
  );
}
