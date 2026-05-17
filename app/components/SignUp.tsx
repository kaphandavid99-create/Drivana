"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../contexts/ThemeContext";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function SignUpPage() {
  const pathname = usePathname();
  const isSignInRoute = pathname === "/sign-in";
  const { resolvedTheme } = useTheme();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>([]);

  useEffect(() => {
    // Generate skyblue particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      resolvedTheme === "dark" ? "bg-slate-900" : "bg-slate-100"
    }`}>
      {/* Skyblue Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-sky-400/30 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.speed * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Theme Toggle */}
      <div className="relative z-10 absolute top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Sign In/Sign Up Form */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          {isSignInRoute ? (
            <SignIn
              path="/sign-in"
              routing="path"
              signUpUrl="/sign-up"
              forceRedirectUrl="/"
              appearance={{
                elements: {
                  rootBox: "mx-auto py-2",
                  card: `py-4 backdrop-blur-md border ${
                    resolvedTheme === "dark"
                      ? "bg-slate-800/80 border-slate-700"
                      : "bg-white/80 border-slate-300"
                  }`,
                  formField: "mb-3",
                  formButtonPrimary: "py-2",
                  footer: "mt-4",
                  formFieldInput: `${
                    resolvedTheme === "dark"
                      ? "bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      : "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500"
                  }`,
                  headerTitle: resolvedTheme === "dark" ? "text-white" : "text-slate-900",
                  headerSubtitle: resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600",
                  socialButtonsBlockButton: `${
                    resolvedTheme === "dark"
                      ? "bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                      : "bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200"
                  }`,
                  dividerLine: resolvedTheme === "dark" ? "bg-slate-600" : "bg-slate-300",
                  dividerText: resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600",
                  footerActionLink: "text-sky-400 hover:text-sky-300",
                  formFieldLabel: resolvedTheme === "dark" ? "text-white" : "text-slate-900",
                }
              }}
            />
          ) : (
            <SignUp
              path="/sign-up"
              routing="path"
              signInUrl="/sign-in"
              forceRedirectUrl="/"
              appearance={{
                elements: {
                  rootBox: "mx-auto py-2",
                  card: `py-4 backdrop-blur-md border ${
                    resolvedTheme === "dark"
                      ? "bg-slate-800/80 border-slate-700"
                      : "bg-white/80 border-slate-300"
                  }`,
                  formField: "mb-3",
                  formButtonPrimary: "py-2",
                  footer: "mt-4",
                  formFieldInput: `${
                    resolvedTheme === "dark"
                      ? "bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      : "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500"
                  }`,
                  headerTitle: resolvedTheme === "dark" ? "text-white" : "text-slate-900",
                  headerSubtitle: resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600",
                  socialButtonsBlockButton: `${
                    resolvedTheme === "dark"
                      ? "bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                      : "bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200"
                  }`,
                  dividerLine: resolvedTheme === "dark" ? "bg-slate-600" : "bg-slate-300",
                  dividerText: resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600",
                  footerActionLink: "text-sky-400 hover:text-sky-300",
                  formFieldLabel: resolvedTheme === "dark" ? "text-white" : "text-slate-900",
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
