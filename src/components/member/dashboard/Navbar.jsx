// components/dashboard/Navbar.js
"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaBell,
  FaRegHeart,
  FaSearch,
  FaChevronRight,
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { GiLeatherBoot } from "react-icons/gi";

const Navbar = ({ onMenuClick, isScrolled }) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showNotifications) setShowNotifications(false);
      if (showUserMenu) setShowUserMenu(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showNotifications, showUserMenu]);

  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 1) return "Overview";
    return segments[segments.length - 1].charAt(0).toUpperCase() + 
           segments[segments.length - 1].slice(1);
  };

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "Order Delivered",
      message: "Your order #ORD-2024-001 has been delivered",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "New Member",
      message: "John Doe has joined your network",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Payment Received",
      message: "Payment of $120.00 has been received",
      time: "3 hours ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/80 backdrop-blur-sm"
      } border-b border-gray-100`}
    >
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiOutlineMenu className="w-5 h-5" />
          </button>

          {/* Brand Logo - Mobile */}
          <Link href="/profile" className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
              <GiLeatherBoot className="text-white text-sm" />
            </div>
            <span className="text-lg font-bold text-gray-800">Dashboard</span>
          </Link>

          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <Link href="/profile" className="text-gray-400 hover:text-amber-600 transition-colors">
              Dashboard
            </Link>
            <FaChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600 font-medium">{getPageTitle()}</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors">
            <FaSearch className="w-4 h-4" />
            <span className="text-sm">Search...</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <FaBell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <button className="text-xs text-amber-600 hover:text-amber-700 font-medium">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 ${
                        !notif.read ? "bg-amber-50/50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${
                          notif.read ? "bg-gray-300" : "bg-amber-500"
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                          <p className="text-sm text-gray-600">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gray-50 border-t border-gray-100">
                  <button className="w-full text-center text-sm text-amber-600 hover:text-amber-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role || "Member"}</p>
              </div>
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-100">
                  <p className="font-semibold text-gray-900">{user?.name || "User"}</p>
                  <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
                </div>
                <div className="py-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    <FaUser className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link
                    href="/profile/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    <FaCog className="w-4 h-4" />
                    Settings
                  </Link>
                  <Link
                    href="/profile/support"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    <FaQuestionCircle className="w-4 h-4" />
                    Help & Support
                  </Link>
                </div>
                <div className="border-t border-gray-100 py-2">
                  <button
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;