"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  User,
  MessageSquare,
  AlertCircle
} from "lucide-react";

export default function ContactForm() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    // Initialize EmailJS with public key
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    console.log("EmailJS Init - Public Key exists:", !!publicKey);
    console.log("EmailJS Init - Public Key length:", publicKey?.length);
    console.log("EmailJS Init - Public Key prefix:", publicKey?.substring(0, 10) + "...");
    if (publicKey) {
      emailjs.init(publicKey);
      console.log("EmailJS initialized successfully");
    } else {
      console.error("EmailJS Public Key is missing from environment variables");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      console.log("EmailJS Config:", { serviceId, templateId, publicKey: publicKey ? "***" : "missing" });

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing. Please check your environment variables.");
      }

      // Send user's message to kaphandavid99@gmail.com
      const emailParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_name: "Drivana Team",
        to_email: "kaphandavid99@gmail.com",
      };

      await emailjs.send(serviceId, templateId, emailParams);

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      setIsSubmitting(false);
      console.error("EmailJS Error details:", err);
      if (typeof err === 'object' && err !== null) {
        console.error("Error keys:", Object.keys(err));
      }
      console.error("Error message:", err instanceof Error ? err.message : JSON.stringify(err));
      setError(err instanceof Error ? err.message : JSON.stringify(err));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-background overflow-x-hidden">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 49%, #0ea5e9 49%, #0ea5e9 51%, transparent 51%),
            linear-gradient(0deg, transparent 49%, #0ea5e9 49%, #0ea5e9 51%, transparent 51%)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border-2 border-sky-500 mb-4">
            <Mail className="h-4 w-4 text-sky-400" />
            <span className="text-sm text-white font-medium">Get in Touch</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Contact <span className="text-sky-400">Drivana</span>
          </h2>
          
          <p className="text-white text-base max-w-xl mx-auto leading-relaxed">
            Have questions? We're here to help. Reach out to us and We'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Info */}
          {mounted ? (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="relative rounded-2xl overflow-hidden border-2 border-sky-500">
                {/* Car Image Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('/Cars/Kia%20EV6%20%E2%80%93%20Where%20Style%20Meets%20Electric%20Power%20%E2%9A%A1%F0%9F%9A%98.jpeg')",
                  }}
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Content */}
                <div className="relative p-6 space-y-4">
                  <div className="group relative p-4 rounded-xl bg-dler-/30c-800 hover:border-sky-500 transition-all duration-300">
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-sky-500 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-sky-500 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-sky-500 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-sky-500 rounded-br-lg" />
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-500 border-2 border-sky-400">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">Phone</h3>
                    <p className="text-sky-400 font-medium">+1 (555) 123-4567</p>
                    <p className="text-sm text-white mt-1">Mon - Fri, 9am - 6pm</p>
                  </div>
                </div>
              </div>

              <div className="group relative p-4 rounded-xl bg-black/30 border-2 border-zinc-800 hover:border-sky-500 transition-all duration-300">
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-sky-500 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-sky-500 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-sky-500 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-sky-500 rounded-br-lg" />
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-500 border-2 border-sky-400">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">Email</h3>
                    <p className="text-sky-400 font-medium">contact@drivana.com</p>
                    <p className="text-sm text-white mt-1">We respond within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="group relative p-4 rounded-xl bg-black/30 border-2 border-zinc-800 hover:border-sky-500 transition-all duration-300">
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-sky-500 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-sky-500 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-sky-500 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-sky-500 rounded-br-lg" />
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-500 border-2 border-sky-400">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">Location</h3>
                    <p className="text-sky-400 font-medium">123 Auto Drive</p>
                    <p className="text-white">Car City, CC 12345</p>
                  </div>
                </div>
              </div>

              <div className="group relative p-4 rounded-xl bg-black/30 border-2 border-zinc-800 hover:border-sky-500 transition-all duration-300">
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-sky-500 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-sky-500 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-sky-500 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-sky-500 rounded-br-lg" />
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-500 border-2 border-sky-400">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">Business Hours</h3>
                    <p className="text-white">Monday - Friday: 9am - 6pm</p>
                    <p className="text-white">Saturday: 10am - 4pm</p>
                    <p className="text-white">Sunday: Closed</p>
                  </div>
                </div>
              </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-tertiary border-2 border-custom">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-sky-500 border-2 border-sky-400">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-1">Phone</h3>
                    <p className="text-sky-400 font-medium">+1 (555) 123-4567</p>
                    <p className="text-sm text-tertiary mt-1">Mon - Fri, 9am - 6pm</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-tertiary border-2 border-custom">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-sky-500 border-2 border-sky-400">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-1">Email</h3>
                    <p className="text-sky-400 font-medium">contact@drivana.com</p>
                    <p className="text-sm text-tertiary mt-1">We respond within 24 hours</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-tertiary border-2 border-custom">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-sky-500 border-2 border-sky-400">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-1">Location</h3>
                    <p className="text-sky-400 font-medium">123 Auto Drive</p>
                    <p className="text-tertiary">Car City, CC 12345</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Form */}
          {mounted ? (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative p-6 rounded-xl bg-zinc-900 border-2 border-zinc-800">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-3 border-l-3 border-sky-500 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-3 border-r-3 border-sky-500 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-3 border-l-3 border-sky-500 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-3 border-r-3 border-sky-500 rounded-br-lg" />
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-500" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-3 bg-tertiary border-2 border-custom rounded-lg text-primary placeholder-tertiary focus:outline-none focus:border-sky-500 focus:ring-0 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-tirtiaryary mb-2 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-500" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-3 bg-tertiary border-2 border-custom rounded-lg text-primary placeholder-tertiary focus:outline-none focus:border-sky-500 focus:ring-0 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">
                      Phone Number <span className="text-secondary font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-500" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 bg-tertiary border-2 border-custom rounded-lg text-primary placeholder-tertiary focus:outline-none focus:border-sky-500 focus:ring-0 transition-all duration-300"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-sky-500" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full pl-12 pr-4 py-4 bg-tertiary border-2 border-custom rounded-lg text-primary placeholder-tertiary focus:outline-none focus:border-sky-500 focus:ring-0 transition-all duration-300 resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-900/30 border-2 border-red-500 rounded-lg text-red-400 text-sm">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-sky-400 hover:border-sky-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            <div className="relative p-8 rounded-2xl bg-zinc-900 border-2 border-zinc-800">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-sky-500 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-sky-500 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-sky-500 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-sky-500 rounded-br-xl" />
              
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-tirtiaryary mb-2 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-4 bg-tertiary border-2 border-custom rounded-lg text-primary placeholder-tertiary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-4 bg-tertiary border-2 border-custom rounded-lg text-primary placeholder-tertiary"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-4 bg-tertiary border-2 border-custom rounded-lg text-primary placeholder-tertiary resize-none"
                    placeholder="Tell us how we can Help you..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-sky-500 text-primary font-bold rounded-lg border-2 border-sky-400"
                >
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
