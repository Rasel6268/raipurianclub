'use client'
import Link from 'next/link';
import { IoSparkles } from "react-icons/io5";
import { FaHandHoldingHeart, FaPhone, FaMapMarkedAlt, FaFacebookF, FaInstagram, FaLinkedinIn, FaCode, FaArrowRight, FaHandshake } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail, MdLocationOn } from "react-icons/md";

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Upcoming Events', href: '/events' },
  { name: 'Membership Plans', href: '/membership' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Register as Member', href: '/register' },
];

const resourceLinks = [
  { name: 'Compare Tiers', href: '/membership/compare' },
  { name: 'Community Projects', href: '/projects' },
  { name: 'Volunteer With Us', href: '/volunteer' },
  { name: 'Club Leadership', href: '/leadership' },
  { name: 'Privacy Policy', href: '/privacy' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand & Social - 4 columns */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-white font-black text-sm tracking-wider">RC</span>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Raipur <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Club</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering community bonds, modern infrastructure, youth development, and cultural heritage for Raipurians everywhere.
            </p>
            <div className="flex gap-2.5 pt-2">
              {[
                { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
                { icon: FaSquareXTwitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:bg-emerald-600 hover:border-emerald-500 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - 2 columns */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources - 2 columns */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Resources
            </h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 group-hover:bg-cyan-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Sponsor - 4 columns */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Contact Office
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-slate-400">
                  <MdEmail size={16} className="text-emerald-400 shrink-0" />
                  <span>contact@raipurianclub.com</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-400">
                  <FaPhone size={14} className="text-emerald-400 shrink-0" />
                  <span>+880 181 922 4567</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-400">
                  <MdLocationOn size={16} className="text-emerald-400 shrink-0" />
                  <span>Raipur, Lakshmipur, Bangladesh</span>
                </div>
              </div>
            </div>

            {/* Sponsor Badge */}
            <div className="pt-2">
              <a
                href="https://www.tripsatisfy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-4 py-2.5 bg-slate-800/80 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg group"
              >
                <FaHandshake size={18} className="text-emerald-400" />
                <div className="text-left">
                  <p className="text-[11px] text-slate-400">Official Travel Sponsor</p>
                  <p className="text-sm font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    TripSatisfy
                  </p>
                </div>
                <span className="text-xs text-emerald-400 ml-1">✦</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} Raipurian Club. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <FaCode size={12} className="text-emerald-400" />
              <span>Developed for Community Excellence</span>
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">
              Terms
            </Link>
            <Link href="/membership/compare" className="hover:text-emerald-400 transition-colors">
              Constitution
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}