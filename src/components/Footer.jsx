'use client'
import Link from 'next/link';
import { IoSparkles } from "react-icons/io5";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlineInterests } from "react-icons/md";

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
  Join: [
    { name: 'Interest to Join Club', href: '/interest' },
    { name: 'Make a Donation', href: '/donate' },
    { name: 'Sponsorship', href: '/sponsor' },
    { name: 'Become a Member', href: '/membership' },
  ],
  Support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700 pt-16 pb-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-emerald-500/5 mask-[radial-gradient(ellipse_at_center,white,transparent)] -z-10" />
      
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-float-slow"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-float-reverse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">RC</span>
              </div>
              <span className="font-bold text-xl bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Raipur Club
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Building a stronger community through connection, collaboration, and meaningful action. Join us in making a difference.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <FaSquareXTwitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200 relative inline-block">
                {category}
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-linear-to-r from-emerald-500 to-cyan-500 rounded-full" />
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      {link.icon && <link.icon size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-300" />}
                      <span className="w-0 group-hover:w-2 h-0.5 bg-linear-to-r from-emerald-500 to-cyan-500 transition-all duration-300 rounded-full" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Bar */}
        <div className="flex flex-wrap justify-between items-center gap-4 py-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <IoSparkles size={16} className="text-emerald-500 dark:text-emerald-400" />
              <span>contact@raipurianclub.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone size={16} className="text-emerald-500 dark:text-emerald-400" />
              <span>+91 771 123 4567</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkedAlt size={16} className="text-emerald-500 dark:text-emerald-400" />
              <span>Raipur,Lakshmipur, Chattogram</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <FaHandHoldingHeart size={14} className="text-rose-500" />
            <span>for Raipur community</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 text-xs text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} Raipurian Club. All rights reserved.
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}