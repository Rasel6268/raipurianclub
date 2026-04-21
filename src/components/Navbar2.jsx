// components/Navbar.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Users, Calendar, Heart, Home, Image, } from "lucide-react";

const Navbar2 = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Members", href: "#", icon: Users },
    { name: "Events", href: "#", icon: Calendar },
    { name: "Gallery", href: "#", icon:  Image},
    { name: "Projects", href: "#", icon: Heart },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg py-3 border-b border-emerald-100/50"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center space-x-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-cyan-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-300"></div>
                <div className="relative bg-linear-to-br from-emerald-600 to-cyan-600 rounded-full p-1.5">
                  <span className="text-white font-bold text-xl">RC</span>
                </div>
              </div>
              <span
                className={`font-bold text-xl tracking-tight transition-colors duration-300 ${
                  isScrolled ? "text-slate-800" : "text-white"
                }`}
              >
                Raipur <span className="text-emerald-500">Club</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/register"
                className={`ml-4 px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 ${
                  isScrolled
                    ? "bg-linear-to-r from-emerald-600 to-cyan-600 text-white"
                    : "bg-white text-emerald-600"
                }`}
              >
                Join Now
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${
                isScrolled ? "text-slate-700" : "text-white"
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ top: "70px" }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6 p-4">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-700 text-xl font-medium hover:text-emerald-600 transition-colors duration-300 transform hover:scale-110"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
           <Link
            href="/register"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 bg-linear-to-r from-green-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold w-full max-w-[200px] hover:shadow-xl transition-all duration-300"
          >
            Join Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar2;