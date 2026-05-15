import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WishlistProvider } from "./contexts/WishlistContext";

export const metadata: Metadata = {
  title: "Drivana - Car Rental",
  description: "Find your perfect ride. Rent, buy, or sell cars with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ThemeProvider>
        <WishlistProvider>
          <html lang="en" className="h-full antialiased">
            <body className="min-h-full flex flex-col overflow-x-hidden">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
          </html>
        </WishlistProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
