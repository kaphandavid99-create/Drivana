"use client";

import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { 
  Car, 
  Shield, 
  Users, 
  Award, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Heart,
  Target,
  Zap,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const { resolvedTheme } = useTheme();

  const stats = [
    { icon: Car, value: "500+", label: "Premium Vehicles" },
    { icon: Users, value: "10K+", label: "Happy Customers" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: MapPin, value: "5+", label: "Locations" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Your safety is our priority. All vehicles undergo rigorous inspections and maintenance checks."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "We put our customers at the heart of everything we do, ensuring exceptional service every time."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Continuously improving our services with cutting-edge technology and modern solutions."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Committed to delivering the highest quality vehicles and unmatched customer experience."
    },
  ];

  const features = [
    "24/7 Customer Support",
    "Flexible Rental Terms",
    "Competitive Pricing",
    "Well-Maintained Fleet",
    "Easy Booking Process",
    "Multiple Payment Options",
    "Insurance Coverage",
    "Roadside Assistance",
  ];

  return (
    <div className={`min-h-screen ${
      resolvedTheme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 49%, #0ea5e9 49%, #0ea5e9 51%, transparent 51%),
              linear-gradient(0deg, transparent 49%, #0ea5e9 49%, #0ea5e9 51%, transparent 51%)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className={`text-5xl md:text-7xl font-black mb-6 ${
              resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              About <span className="text-sky-500">Drivana</span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${
              resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Your trusted partner for premium car rentals and purchases in Cameroon
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`p-6 rounded-2xl border-2 text-center ${
                  resolvedTheme === 'dark'
                    ? 'bg-slate-900 border-slate-800 hover:border-sky-500'
                    : 'bg-white border-slate-200 hover:border-sky-500'
                } transition-all duration-300 hover:shadow-lg`}
              >
                <stat.icon className={`w-8 h-8 mx-auto mb-3 text-sky-500`} />
                <div className={`text-3xl md:text-4xl font-black mb-2 ${
                  resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm font-medium ${
                  resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={`p-8 rounded-3xl border-2 ${
                resolvedTheme === 'dark'
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}>
                <h2 className={`text-3xl md:text-4xl font-black mb-6 ${
                  resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Our <span className="text-sky-500">Mission</span>
                </h2>
                <p className={`text-lg leading-relaxed mb-6 ${
                  resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  To provide exceptional car rental and purchase experiences by offering premium vehicles, 
                  competitive pricing, and unparalleled customer service. We strive to make every journey 
                  memorable and hassle-free for our valued customers.
                </p>
                <div className={`flex items-start gap-3 p-4 rounded-xl ${
                  resolvedTheme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
                }`}>
                  <Target className="w-6 h-6 text-sky-500 flex-shrink-0 mt-1" />
                  <p className={`text-sm font-medium ${
                    resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Committed to excellence in every aspect of our service
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={`p-8 rounded-3xl border-2 ${
                resolvedTheme === 'dark'
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}>
                <h2 className={`text-3xl md:text-4xl font-black mb-6 ${
                  resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Our <span className="text-sky-500">Vision</span>
                </h2>
                <p className={`text-lg leading-relaxed mb-6 ${
                  resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  To become Cameroon's leading car rental and sales company, known for reliability, 
                  innovation, and customer satisfaction. We aim to revolutionize the automotive industry 
                  by setting new standards in service quality and vehicle excellence.
                </p>
                <div className={`flex items-start gap-3 p-4 rounded-xl ${
                  resolvedTheme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
                }`}>
                  <Zap className="w-6 h-6 text-sky-500 flex-shrink-0 mt-1" />
                  <p className={`text-sm font-medium ${
                    resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Leading the future of automotive services in Cameroon
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-black mb-4 ${
              resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Our Core <span className="text-sky-500">Values</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-2xl border-2 hover:shadow-xl transition-all duration-300 ${
                  resolvedTheme === 'dark'
                    ? 'bg-slate-900 border-slate-800 hover:border-sky-500'
                    : 'bg-white border-slate-200 hover:border-sky-500'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                  resolvedTheme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
                }`}>
                  <value.icon className="w-7 h-7 text-sky-500" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${
                  resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {value.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={`text-4xl md:text-5xl font-black mb-6 ${
                resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Why Choose <span className="text-sky-500">Drivana</span>?
              </h2>
              <p className={`text-lg mb-8 leading-relaxed ${
                resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                We go above and beyond to ensure your experience with us is nothing short of exceptional. 
                Here's what sets us apart from the competition.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex items-center gap-3 p-4 rounded-xl ${
                      resolvedTheme === 'dark' ? 'bg-slate-900' : 'bg-white'
                    } border-2 ${
                      resolvedTheme === 'dark' ? 'border-slate-800' : 'border-slate-200'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0" />
                    <span className={`text-sm font-medium ${
                      resolvedTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className={`p-8 rounded-3xl border-2 ${
                resolvedTheme === 'dark'
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}>
                <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-800">
                  <img
                    src="/man.jpeg"
                    alt="Drivana Team"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Our Commitment to You
                </h3>
                <p className={`text-base leading-relaxed mb-6 ${
                  resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Every vehicle in our fleet is meticulously maintained and thoroughly inspected 
                  before reaching you. Our dedicated team is available 24/7 to assist you with 
                  any questions or concerns.
                </p>
                <div className={`flex items-center gap-4 p-4 rounded-xl ${
                  resolvedTheme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
                }`}>
                  <Clock className="w-6 h-6 text-sky-500" />
                  <div>
                    <div className={`text-sm font-medium ${
                      resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      24/7 Support
                    </div>
                    <div className={`text-xs ${
                      resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Always here for you
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`p-8 md:p-12 rounded-3xl border-2 text-center ${
              resolvedTheme === 'dark'
                ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700'
                : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
            }`}
          >
            <h2 className={`text-3xl md:text-4xl font-black mb-4 ${
              resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Ready to Experience Excellence?
            </h2>
            <p className={`text-lg mb-8 ${
              resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Get in touch with us today and let us help you find the perfect vehicle for your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/contact"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 ${
                  resolvedTheme === 'dark'
                    ? 'bg-sky-600 hover:bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-900/40'
                    : 'bg-sky-500 hover:bg-sky-600 border-sky-400 text-white shadow-lg shadow-sky-500/30'
                }`}
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </Link>
              <Link
                href="/cars"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 ${
                  resolvedTheme === 'dark'
                    ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Car className="w-5 h-5" />
                Browse Cars
              </Link>
            </div>

            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center ${
              resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <a href="tel:+237123456789" className="flex items-center gap-2 hover:text-sky-500 transition-colors">
                <Phone className="w-5 h-5" />
                +237 123 456 789
              </a>
              <a href="mailto:info@drivana.com" className="flex items-center gap-2 hover:text-sky-500 transition-colors">
                <Mail className="w-5 h-5" />
                info@drivana.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Douala, Cameroon
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
