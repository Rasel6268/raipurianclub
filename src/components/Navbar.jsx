// components/Navbar.jsx (fixed - removed any custom CSS that might conflict)
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Users, Calendar, Heart, Briefcase, Home } from 'lucide-react';


const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Members', href: '/members', icon: Users },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Donations', href: '/donations', icon: Heart },
  { name: 'Projects', href: '/projects', icon: Briefcase },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isRegisterPage = pathname === "/register";
  console.log("Current Path:", pathname);
  

  useEffect(() => {
  if (isRegisterPage) {
    setIsScrolled(true);
    return;
  }

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [isRegisterPage]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-lg py-3 border-b border-gray-100'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-xl">RC</span>
            </div>
            <span className="font-bold text-xl md:text-2xl tracking-tight bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
              Raipurian Club
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 hover:text-green-600 transition-all duration-300 hover:bg-green-50 font-medium"
              >
                <link.icon size={18} />
                <span>{link.name}</span>
              </Link>
            ))}
            <button className="ml-4 bg-gradient-to-r from-green-500 to-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Join Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ top: '70px' }}
      >
        <nav className="flex flex-col items-center gap-6 pt-12 px-6">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-xl font-medium text-gray-700 hover:text-green-600 transition-all duration-300 py-2"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <link.icon size={22} />
              <span>{link.name}</span>
            </Link>
          ))}
          <Link
            href="/register"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 bg-linear-to-r from-green-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold w-full max-w-[200px] hover:shadow-xl transition-all duration-300"
          >
            Join Now
          </Link>
        </nav>
      </div>
    </>
  );
}