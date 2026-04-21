// components/Footer.jsx (fixed - using direct colors)
import Link from 'next/link';

import { IoSparkles } from "react-icons/io5";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const footerLinks = {
  Community: [
    { name: 'About Us', href: '/about' },
    { name: 'Membership', href: '/membership' },
    { name: 'Leadership', href: '/leadership' },
    { name: 'Code of Conduct', href: '/conduct' },
  ],
  Activities: [
    { name: 'Upcoming Events', href: '/events' },
    { name: 'Past Events', href: '/past-events' },
    { name: 'Projects', href: '/projects' },
    { name: 'Volunteer', href: '/volunteer' },
  ],
  Support: [
    { name: 'Make a Donation', href: '/donate' },
    { name: 'Sponsorship', href: '/sponsor' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faq' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 pt-16 pb-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-green-500/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">RC</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
                Raipur Club
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Building a stronger community through connection, collaboration, and meaningful action. Join us in making a difference.
            </p>
            <div className="flex gap-3 pt-2">
              {[FaFacebookF, FaSquareXTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4 text-gray-800 relative inline-block">
                {category}
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-orange-500 rounded-full" />
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-green-600 transition-colors duration-300 flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Bar */}
        <div className="flex flex-wrap justify-between items-center gap-4 py-6 border-t border-gray-200 text-sm text-gray-600">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <IoSparkles size={16} className="text-green-500" />
              <span>contact@raipurianclub.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone size={16} className="text-green-500" />
              <span>+91 771 123 4567</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkedAlt size={16} className="text-green-500" />
              <span>Raipur, Chhattisgarh, India</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <FaHandHoldingHeart size={14} className="text-rose-500" />
            <span>for Raipur community</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} Raipurian Club. All rights reserved. | 
          <Link href="/privacy" className="hover:text-green-600 transition-colors ml-1">Privacy Policy</Link> |
          <Link href="/terms" className="hover:text-green-600 transition-colors ml-1">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}