"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Facebook,
  X,
  Instagram,
  MessageCircle,
  ArrowUp,
  Phone,
  Mail,
  MapPin,
  Send,
  Sparkles,
  Zap,
  Shield,
  Globe,
  ChevronRight
} from "lucide-react";

const currentYear = new Date().getFullYear();

const quickLinks = [
  { label: "About Us", href: "#" },
  { label: "Our Fleet", href: "#" },
  { label: "Services", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" }
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Refund Policy", href: "#" }
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: X, href: "#", isCustom: true, customLogo: "/x-logo.svg" },
  { icon: Instagram, href: "#" },
  { icon: MessageCircle, href: "#", isCustom: true, customLogo: "/whatsapp-logo.svg" }
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900 pb-0 overflow-hidden scrollbar-hide">
      <div className="relative z-10">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="relative h-16 w-72 -ml-1 group">
                <div className="absolute inset-0 bg-sky-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center justify-center h-full">
                    <Globe className="h-8 w-8 text-sky-400 animate-spin-slow" />
                  </div>
                </div>
                <Image
                  src="/car/Drivana.png"
                  alt="Drivana Logo"
                  fill
                  className="object-contain object-left relative z-10"
                  priority
                />
              </div>
              
              <ul className="space-y-4">
                <li className="text-white leading-relaxed flex items-center gap-3">
                  <Shield className="h-5 w-5 text-sky-400 flex-shrink-0" />
                  <span>Premium car rental services worldwide</span>
                </li>
                <li className="text-white leading-relaxed flex items-center gap-3">
                  <Phone className="h-5 w-5 text-sky-400 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="text-white leading-relaxed flex items-center gap-3">
                  <Mail className="h-5 w-5 text-sky-400 flex-shrink-0" />
                  <span>contact@drivana.com</span>
                </li>
                <li className="text-white leading-relaxed flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-sky-400 flex-shrink-0" />
                  <span>123 Auto Drive, Car City</span>
                </li>
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-sky-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center justify-center h-full">
                    <Send className="h-6 w-6 text-sky-400 animate-bounce" />
                  </div>
                </div>
                
                <div className="bg-zinc-900/90 backdrop-blur-md border border-sky-500/30 rounded-2xl p-8 text-center relative overflow-hidden">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-sky-400" />
                    <span>Stay Connected</span>
                  </h3>
                  <p className="text-white mb-6">Get exclusive offers and updates delivered to your inbox</p>
                  
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-40 h-10 rounded-lg bg-zinc-800/50 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all"
                      />
                      <button
                        type="submit"
                        className="w-10 h-10 rounded-lg bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-all duration-300 flex items-center justify-center group"
                        disabled={isSubscribed}
                      >
                        {isSubscribed ? (
                          <Zap className="h-5 w-5 text-white" />
                        ) : (
                          <Send className="h-5 w-5 text-white" />
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Globe className="h-6 w-6 text-sky-400" />
                <span>Quick Links</span>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="text-white hover:text-sky-400 transition-colors duration-300 flex items-center gap-2">
                      <ChevronRight className="h-4 w-4" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-sky-400" />
                <span>Support</span>
              </h3>
              <ul className="space-y-3">
                {supportLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="text-white hover:text-sky-400 transition-colors duration-300 flex items-center gap-2">
                      <ChevronRight className="h-4 w-4" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center gap-6"
            >
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className="relative group"
                  >
                    <div className="relative w-12 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center transition-all duration-300 hover:border-sky-500 hover:bg-sky-500/10">
                      {social.customLogo ? (
                        <Image
                          src={social.customLogo}
                          alt={social.customLogo.includes('x-logo') ? 'X (Twitter) social media link' : 'WhatsApp social media link'}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      ) : (
                        <social.icon className="h-6 w-6 text-white" />
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sky-500/30 bg-zinc-900/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-white text-sm">
                © {currentYear} Drivana. All rights reserved.
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">Made with</span>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-sky-400" />
                    <span className="text-white text-sm">passion</span>
                    <Sparkles className="h-4 w-4 text-sky-400" />
                  </div>
                </div>
                <a
                  href="#top"
                  className="group flex items-center gap-2 text-white hover:text-sky-400 transition-colors"
                >
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm">Back to top</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
