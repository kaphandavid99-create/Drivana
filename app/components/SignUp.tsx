"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900 px-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Sign Up Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-300">Join Drivana and start your journey</p>
          </div>

          {/* Clerk SignUp Component */}
          <SignUp 
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            forceRedirectUrl="/"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-transparent shadow-none border-0",
                formButtonPrimary: 
                  "bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200",
                formFieldInput: 
                  "bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: 
                  "bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-lg transition-all duration-200",
                dividerLine: "bg-white/20",
                dividerText: "text-gray-400",
                footerActionLink: "text-sky-400 hover:text-sky-300",
                identityPreview: "bg-white/10 border border-white/20 rounded-lg",
                identityPreviewText: "text-white",
                identityPreviewEditButton: "text-sky-400 hover:text-sky-300",
                formFieldLabel: "text-gray-300 font-medium",
                formFieldHintText: "text-gray-400 text-sm",
              }
            }}
          />
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-sky-400 hover:text-sky-300 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
