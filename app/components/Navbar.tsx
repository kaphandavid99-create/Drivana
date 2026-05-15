"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
Search,
Heart,
Menu,
X,
ChevronRight,
Car,
Home,
DollarSign,
Mail,
User,
LogOut,
Newspaper,
} from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useTheme } from "../contexts/ThemeContext";
import { useWishlist } from "../contexts/WishlistContext";
import ThemeToggle from "./ThemeToggle";
const navLinks = [
{ name: "Home", href: "/", icon: Home },
{ name: "Cars", href: "/cars", icon: Car },
{ name: "Blog", href: "/blog", icon: Newspaper },
{ name: "Sell", href: "/sell", icon: DollarSign },
{ name: "Contact", href: "/contact", icon: Mail },
];
export default function Navbar() {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isSearchOpen, setIsSearchOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
const [isScrolled, setIsScrolled] = useState(false);
const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
const pathname = usePathname();
const { isSignedIn, user } = useUser();
const { signOut } = useClerk();
const { resolvedTheme } = useTheme();
const { wishlistCount } = useWishlist();
// Close mobile menu on route change
useEffect(() => {
  // Use setTimeout to defer state updates to avoid cascading renders
  const timeoutId = setTimeout(() => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, 0);
  return () => clearTimeout(timeoutId);
}, [pathname]);
// Close mobile menu when clicking outside
useEffect(() => {
const handleClickOutside = (event: MouseEvent) => {
const target = event.target as Element;
const menuElement = document.getElementById('mobile-menu');
if (menuElement && !menuElement.contains(target)) {
setIsMenuOpen(false);
}
};
if (isMenuOpen) {
document.addEventListener('mousedown', handleClickOutside);
}
return () => {
document.removeEventListener('mousedown', handleClickOutside);
};
}, [isMenuOpen]);
// Close profile dropdown when clicking outside
useEffect(() => {
const handleClickOutside = (event: MouseEvent) => {
const target = event.target as Element;
const profileElement = document.getElementById('profile-dropdown');
if (profileElement && !profileElement.contains(target)) {
setIsProfileDropdownOpen(false);
}
};
if (isProfileDropdownOpen) {
document.addEventListener('mousedown', handleClickOutside);
}
return () => {
document.removeEventListener('mousedown', handleClickOutside);
};
}, [isProfileDropdownOpen]);
// Handle scroll effect
useEffect(() => {
const handleScroll = () => {
setIsScrolled(window.scrollY > 20);
};
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);
const handleSearchSubmit = (e: React.FormEvent) => {
e.preventDefault();
if (searchQuery.trim()) {
// Navigate to search results or handle search
window.location.href = `/cars?search=${encodeURIComponent(searchQuery)}`;
}
};
// Get user initials (first letter of first name + first letter of last name)
const getUserInitials = () => {
const firstName = user?.firstName || '';
const lastName = user?.lastName || '';
const firstInitial = firstName.charAt(0).toUpperCase();
const lastInitial = lastName.charAt(0).toUpperCase();
return firstInitial + lastInitial;
};
return (
<>
<nav
className={`fixed top-4 left-2 right-2 sm:left-4 sm:right-4 z-50 touch-pan-y transition-all duration-300 bg-background backdrop-blur-sm shadow-lg shadow-black/20 border border-sky-500/50 overflow-visible scrollbar-hide ${
isScrolled ? "rounded-full" : "rounded-2xl"
}`}
>
<div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
<div className="flex h-14 sm:h-16 items-center justify-between w-full min-w-0">
{/* Logo - Left Corner */}
<Link href="/" className="hidden md:flex items-center -ml-4 sm:-ml-6 lg:-ml-8 flex-shrink-0">
<div className={`relative h-14 sm:h-16 w-32 sm:w-40 overflow-hidden ${
isScrolled ? 'rounded-l-full' : 'rounded-xl'
}`}>
<Image
src="/driva.png"
alt="Car Rental Logo"
fill
className="object-contain"
priority
/>
</div>
</Link>
{/* Desktop Navigation - Left of Center */}
<div className="hidden md:flex items-center justify-center flex-1 mr-[120px]">
{navLinks.map((link) => {
const isActive = pathname === link.href;
const Icon = link.icon;
return (
<Link
key={link.name}
href={link.href}
className={`relative px-6 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
resolvedTheme === 'light' 
? 'text-sky-500 hover:text-white' 
: 'text-white hover:text-sky-400'
}`}
>
<span className="flex items-center gap-2">
<Icon className="h-4 w-4" />
{link.name}
</span>
{/* Active indicator */}
{isActive && (
<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-sky-400 rounded-full" />
)}
</Link>
);
})}
</div>
{/* Right Section - Search, Wishlist & Auth */}
<div className="hidden md:flex items-center gap-1 sm:gap-2 flex-shrink-0">
{/* Theme Toggle */}
<ThemeToggle />
{/* Search Toggle Button */}
<button
onClick={() => setIsSearchOpen(!isSearchOpen)}
onTouchStart={() => setIsSearchOpen(!isSearchOpen)}
className={`p-2 sm:p-2.5 rounded-full transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
isSearchOpen
? "bg-sky-500 text-white"
: resolvedTheme === 'light'
? "text-sky-500 hover:text-white hover:bg-muted/50"
: "text-white hover:text-sky-400 hover:bg-muted/50"
}`}
aria-label="Toggle search"
>
<Search className="h-4 w-4 sm:h-5 sm:w-5" />
</button>
{/* Wishlist Button */}
<Link
href="/wishlist"
className={`relative p-2 sm:p-2.5 rounded-full transition-all duration-200 group min-w-[44px] min-h-[44px] flex items-center justify-center ${
resolvedTheme === 'light'
? 'text-sky-500 hover:text-white hover:bg-muted/50'
: 'text-white hover:text-sky-400 hover:bg-muted/50'
}`}
aria-label="Wishlist"
>
<Heart className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:scale-110" />
{/* Wishlist badge - dynamic count */}
<span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white">
{wishlistCount}
</span>
</Link>
{/* Authentication Section */}
{isSignedIn ? (
<div className="flex items-center gap-2">
{/* User Profile */}
<div id="profile-dropdown" className="relative">
<button 
onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
className={`flex items-center gap-2 py-1 rounded-full transition-all duration-200 ${
resolvedTheme === 'light'
? 'text-sky-500 hover:text-white hover:bg-muted/50'
: 'text-white hover:text-sky-400 hover:bg-muted/50'
}`}>
<div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sky-500 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
{getUserInitials()}
</div>
</button>
{/* User Dropdown */}
<div className={`absolute right-0 top-[100%] mt-2 w-56 transition-all duration-300 z-[100] ${
isProfileDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
} ${
resolvedTheme === 'light'
? 'bg-black border border-gray-800 shadow-2xl'
: 'bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl'
}`}>
{/* Dropdown Arrow */}
<div className="absolute -top-2 right-6 w-4 h-4 bg-black border-l border-t border-gray-800 transform rotate-45"></div>
{/* Dropdown Content */}
<div className="relative p-1">
{/* User Profile Section */}
<div className={`px-4 py-3 border-b ${
resolvedTheme === 'light' ? 'border-gray-800' : 'border-white/10'
}`}>
<div className="flex items-center gap-3">
<div className={`w-10 h-10 rounded-full flex items-center justify-center ${
resolvedTheme === 'light' ? 'bg-gray-800' : 'bg-white/10'
}`}>
<User className="h-5 w-5 text-white" />
</div>
<div>
<p className="text-white font-medium text-sm">
{user?.firstName || user?.username || 'User'}
</p>
<p className={`text-xs ${
resolvedTheme === 'light' ? 'text-gray-400' : 'text-gray-500'
}`}>
Account Settings
</p>
</div>
</div>
</div>
{/* Menu Items */}
<div className="py-2">
<Link
href="/profile"
className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
resolvedTheme === 'light'
? 'text-gray-300 hover:text-white hover:bg-gray-900'
: 'text-gray-300 hover:text-white hover:bg-white/5'
}`}
>
<User className="h-4 w-4" />
<span>Profile</span>
</Link>
<Link
href="/bookings"
className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
resolvedTheme === 'light'
? 'text-gray-300 hover:text-white hover:bg-gray-900'
: 'text-gray-300 hover:text-white hover:bg-white/5'
}`}
>
<Car className="h-4 w-4" />
<span>My Bookings</span>
</Link>
</div>
{/* Divider */}
<div className={`h-px mx-4 ${
resolvedTheme === 'light' ? 'bg-gray-800' : 'bg-white/10'
}`}></div>
{/* Sign Out */}
<button
onClick={() => signOut()}
className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-all duration-200 ${
resolvedTheme === 'light'
? 'text-red-400 hover:text-red-300 hover:bg-gray-900'
: 'text-red-400 hover:text-red-300 hover:bg-white/5'
}`}
>
<LogOut className="h-4 w-4" />
<span>Sign Out</span>
</button>
</div>
</div>
</div>
</div>
) : (
<div className="flex items-center gap-2">
<Link
href="/sign-in"
className="px-4 py-2 text-sm font-medium text-white hover:text-sky-400 transition-all duration-200"
>
Sign In
</Link>
<Link
href="/sign-up"
className="px-4 py-2 text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 rounded-lg transition-all duration-200"
>
Sign Up
</Link>
</div>
)}
</div>
{/* Mobile Layout */}
<div className="flex md:hidden items-center justify-between w-full">
{/* Mobile Logo */}
<Link href="/" className="flex items-center -ml-2 sm:-ml-4 group flex-shrink-0">
<div className={`relative h-12 w-24 sm:w-32 overflow-hidden ${
isScrolled ? 'rounded-l-xl' : 'rounded-xl'
}`}>
<Image
src="/driva.png"
alt="Car Rental Logo"
fill
className="object-contain"
priority
/>
</div>
</Link>
{/* Mobile Right Section */}
<div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
{/* Theme Toggle */}
<ThemeToggle />
{/* Search Toggle Button */}
<button
onClick={() => setIsSearchOpen(!isSearchOpen)}
onTouchStart={() => setIsSearchOpen(!isSearchOpen)}
className={`p-2 sm:p-2.5 rounded-full transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
isSearchOpen
? "bg-sky-500 text-white"
: "text-sky-500 hover:text-sky-600 hover:bg-gray-100"
}`}
aria-label="Toggle search"
>
<Search className="h-4 w-4 sm:h-5 sm:w-5" />
</button>
{/* Wishlist Button */}
<Link
href="/wishlist"
className="relative p-2 sm:p-2.5 rounded-full transition-all duration-200 group min-w-[44px] min-h-[44px] flex items-center justify-center text-sky-500 hover:text-sky-600 hover:bg-gray-100"
aria-label="Wishlist"
>
<Heart className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:scale-110" />
{/* Wishlist badge - dynamic count */}
<span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white">
{wishlistCount}
</span>
</Link>
{/* Mobile Menu Button */}
<button
onClick={() => setIsMenuOpen(!isMenuOpen)}
onTouchStart={() => setIsMenuOpen(!isMenuOpen)}
className="md:hidden p-2 sm:p-2.5 rounded-full transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center text-sky-500 hover:text-sky-600 hover:bg-gray-100 cursor-pointer touch-manipulation pointer-events-auto"
aria-label="Toggle menu"
>
{isMenuOpen ? (
<X className="h-5 w-5 sm:h-6 sm:w-6" />
) : (
<Menu className="h-5 w-5 sm:h-6 sm:w-6" />
)}
</button>
</div>
</div>
</div>
</div>
{/* Expandable Search Bar */}
<div
className={`overflow-hidden transition-all duration-300 ease-in-out ${
isSearchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
}`}
>
<div className="border-t border-border bg-background/95 backdrop-blur-md">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
<form onSubmit={handleSearchSubmit} className="relative">
<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
<input
type="text"
placeholder="Search for cars, brands, models..."
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
className="w-full rounded-xl border border-border bg-muted/50 pl-12 pr-4 py-3 text-foreground placeholder-muted-foreground focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
autoFocus={isSearchOpen}
/>
<button
type="submit"
className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-sky-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-sky-600 transition-colors"
>
Search
</button>
</form>
</div>
</div>
</div>
{/* Mobile Menu */}
<div
id="mobile-menu"
className={`md:hidden fixed inset-0 z-[60] transition-all duration-300 ease-in-out bg-sky-500 ${
isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
}`}
>
{/* Enhanced Backdrop */}
<div 
className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
isMenuOpen ? 'opacity-100' : 'opacity-0'
}`}
onClick={() => setIsMenuOpen(false)}
/>
{/* Menu Container - Joined to Navbar */}
<div className={`absolute right-0 top-0 w-80 max-w-[90vw] bg-sky-500 border-l border-b border-sky-600 shadow-2xl rounded-l-2xl transition-all duration-300 ease-out transform h-full ${
isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
}`}>
<div className="p-6">
{/* Menu Header */}
<div className="flex items-center justify-between mb-6 pb-4 border-b border-sky-600">
<h3 className="text-lg font-semibold text-white">Menu</h3>
<button
onClick={() => setIsMenuOpen(false)}
className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
aria-label="Close menu"
>
<X className="h-5 w-5" />
</button>
</div>
{/* Navigation Links */}
<div className="space-y-2">
{navLinks.map((link) => {
const isActive = pathname === link.href;
const Icon = link.icon;
return (
<Link
key={link.name}
href={link.href}
onClick={() => setIsMenuOpen(false)}
className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 bg-white text-black hover:bg-gray-100 ${
isActive ? 'bg-gray-200' : ''
}`}
>
<div className="flex items-center gap-3">
<Icon className="h-5 w-5 flex-shrink-0" />
<span className="flex-1">{link.name}</span>
{isActive && (
<div className="w-2 h-2 rounded-full bg-white" />
)}
</div>
<ChevronRight className="h-4 w-4 flex-shrink-0" />
</Link>
);
})}
</div>
{/* Mobile Quick Actions */}
<div className="pt-4 mt-4 border-t border-border">
<div className="space-y-3">
<Link
href="/wishlist"
onClick={() => setIsMenuOpen(false)}
className="flex items-center justify-between rounded-lg px-4 py-3 bg-white text-black transition-all duration-200 hover:bg-gray-100"
>
<div className="flex items-center gap-3">
<Heart className="h-5 w-5" />
<span className="flex-1">Wishlist</span>
</div>
<ChevronRight className="h-4 w-4" />
</Link>
{isSignedIn ? (
<Link
href="/profile"
onClick={() => setIsMenuOpen(false)}
className="flex items-center justify-between rounded-lg px-4 py-3 bg-white text-black transition-all duration-200 hover:bg-gray-100"
>
<div className="flex items-center gap-3">
<User className="h-5 w-5" />
<span className="flex-1">Profile</span>
</div>
<ChevronRight className="h-4 w-4" />
</Link>
) : (
<div className="space-y-3">
<Link
href="/sign-in"
onClick={() => setIsMenuOpen(false)}
className="flex items-center justify-center rounded-lg px-4 py-3 bg-white text-black transition-all duration-200 hover:bg-gray-100"
>
<span>Sign In</span>
</Link>
<Link
href="/sign-up"
onClick={() => setIsMenuOpen(false)}
className="flex items-center justify-center rounded-lg px-4 py-3 bg-white text-black transition-all duration-200 hover:bg-gray-100"
>
<span>Sign Up</span>
</Link>
</div>
)}
</div>
</div>
</div>
</div>
</div>
</nav>
</>
);
}