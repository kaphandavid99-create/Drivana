"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";
const faqs = [
  {
    question: "Can I rent a car without a driver?",
    answer:
      "Yes, we offer both self-drive and chauffeur services depending on your preference.",
  },
  {
    question: "What documents are required to rent a car?",
    answer:
      "You need a valid driver's license, identification card, and proof of payment.",
  },
  {
    question: "Do you offer installment payments for cars?",
    answer:
      "Yes, flexible financing and installment payment options are available for selected vehicles.",
  },
  {
    question: "Can I book a car online?",
    answer:
      "Absolutely. You can browse, select, and reserve cars directly from the website.",
  },
  {
    question: "Do you provide airport pickup services?",
    answer:
      "Yes, airport pickup and drop-off services are available upon request.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { resolvedTheme } = useTheme();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section 
      className={`w-full py-20 px-6 md:px-12 ${
        resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Heading */}
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <p className="text-sky-500 font-semibold uppercase tracking-wider">
            FAQ
          </p>

          <h2 className={`text-4xl md:text-5xl font-bold mt-3 ${
            resolvedTheme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Frequently Asked Questions
          </h2>

          <p className={`mt-5 text-lg leading-8 ${
            resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Everything you need to know about renting and buying cars from us.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div 
          className="space-y-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: "easeOut" }}
              className={`rounded-3xl shadow-md overflow-hidden border ${
                resolvedTheme === 'dark' 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-100'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`text-lg md:text-xl font-semibold ${
                  resolvedTheme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  } ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className={`px-6 pb-6 leading-7 ${
                    resolvedTheme === 'dark' ? 'text-gray-200' : 'text-gray-600'
                  }`}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
