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
  { icon: X, href: "#", color: "bg-black hover:bg-gray-800", isCustom: true, customIcon: <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { icon: Instagram, href: "#", color: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:opacity-90" },
  { icon: MessageCircle, href: "#", color: "bg-green-600 hover:bg-green-700", isCustom: true, customIcon: <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> }
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
    <footer className="relative bg-slate-900 text-white overflow-hidden">

      <motion.div style={{ opacity }} className="relative z-10">
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
                  src="/driva.png"
                  alt="Drivana Logo"
                  fill
                  sizes="288px"
                  className="object-contain object-left relative z-10"
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
