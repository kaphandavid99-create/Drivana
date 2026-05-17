"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Shield,
  Globe,
  Star,
  Heart,
  Users,
  Clock,
  Car,
  Menu,
  ChevronRight
} from "lucide-react";

const currentYear = new Date().getFullYear();

const quickLinks = [
  { label: "About Us", href: "/about", icon: Globe },
  { label: "Our Fleet", href: "/cars", icon: Car },
  { label: "Services", href: "#", icon: Sparkles },
  { label: "Pricing", href: "#", icon: Star },
  { label: "Blog", href: "#", icon: Sparkles },
  { label: "Careers", href: "#", icon: Users }
];

const supportLinks = [
  { label: "Help Center", href: "#", icon: MessageCircle },
  { label: "Terms of Service", href: "#", icon: Shield },
  { label: "Privacy Policy", href: "#", icon: Shield },
  { label: "Cookie Policy", href: "#", icon: Shield }
];

const socialLinks = [
  { icon: Facebook, href: "#", color: "bg-blue-600 hover:bg-blue-700" },
  { icon: X, href: "#", color: "bg-black hover:bg-gray-800", isCustom: true, customIcon: <X className="h-5 w-5 text-white" /> },
  { icon: Instagram, href: "#", color: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:opacity-90" },
  { icon: MessageCircle, href: "#", color: "bg-green-600 hover:bg-green-700", isCustom: true, customIcon: <MessageCircle className="h-5 w-5 text-white" /> }
];

const stats = [
  { value: "50K+", label: "Happy Customers", icon: Users },
  { value: "200+", label: "Premium Vehicles", icon: Car },
  { value: "24/7", label: "Customer Support", icon: Clock },
  { value: "99%", label: "Satisfaction Rate", icon: Star }
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-sky-400/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <motion.div style={{ opacity }} className="relative z-10">
        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-500/20 mb-4 group-hover:bg-sky-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className="h-6 w-6 text-sky-400" />
                </motion.div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="relative h-16 w-full">
                <Image
                  src="/cars/Drivana.png"
                  alt="Drivana Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium car rental and sales platform. Experience luxury travel with our exceptional fleet and unmatched service.
              </p>
              
              <div className="space-y-4">
                <a href="tel:+15551234567" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 group-hover:bg-sky-500/20 transition-all duration-300">
                    <Phone className="h-4 w-4 text-sky-400" />
                  </div>
                  <span className="text-sm">+1 (555) 123-4567</span>
                </a>
                <a href="mailto:contact@drivana.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 group-hover:bg-sky-500/20 transition-all duration-300">
                    <Mail className="h-4 w-4 text-sky-400" />
                  </div>
                  <span className="text-sm">contact@drivana.com</span>
                </a>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5">
                    <MapPin className="h-4 w-4 text-sky-400" />
                  </div>
                  <span className="text-sm">Douala, Cameroon</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Globe className="h-5 w-5 text-sky-400" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <motion.li key={idx} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                      <ChevronRight className="h-4 w-4 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span>{link.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Shield className="h-5 w-5 text-sky-400" />
                Support
              </h3>
              <ul className="space-y-3">
                {supportLinks.map((link, idx) => (
                  <motion.li key={idx} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                      <ChevronRight className="h-4 w-4 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span>{link.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Send className="h-5 w-5 text-sky-400" />
                Newsletter
              </h3>
              <p className="text-gray-400 text-sm">
                Subscribe for exclusive deals and updates.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all duration-300"
                />
                <motion.button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubscribed}
                >
                  {isSubscribed ? (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      <span>Subscribe</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Social Media */}
              <div className="pt-4">
                <div className="flex gap-3">
                  {socialLinks.map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      className={`w-10 h-10 rounded-xl ${social.color} flex items-center justify-center transition-all duration-300`}
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.isCustom ? social.customIcon : <social.icon className="h-5 w-5 text-white" />}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-gray-400 text-sm">
                © {currentYear} Drivana. All rights reserved.
              </div>
              
              <div className="flex items-center gap-6">
                <motion.div
                  className="flex items-center gap-2 text-gray-400 text-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Made with</span>
                  <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                  <span>by Drivana Team</span>
                </motion.div>
                
                <motion.a
                  href="#top"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm font-medium">Top</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
