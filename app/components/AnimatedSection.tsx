"use client";

import { motion } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  type?: "fade" | "slide" | "scale" | "rotate";
}

const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    up: { hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -100 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0 } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -15, scale: 0.8 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  type = "slide",
}: AnimatedSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getVariants = () => {
    if (type === "fade") return variants.fade;
    if (type === "scale") return variants.scale;
    if (type === "rotate") return variants.rotate;
    return variants.slide[direction];
  };

  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for multiple items
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger item to use inside StaggerContainer
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax wrapper
export function ParallaxSection({
  children,
  className = "",
  offset = 50,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  return (
    <motion.div
      initial={{ y: offset }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Reveal text animation
export function RevealText({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={className}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
