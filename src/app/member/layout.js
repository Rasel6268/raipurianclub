// app/member/layout.js
"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaUser,
  FaHome,
  FaCog,
  FaUserFriends,
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaChevronRight,
  FaBars,
  FaTimes,
  FaCrown,
  FaChartLine,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaStar,
  FaTrophy,
  FaGift,
  FaWallet,
  FaShieldAlt,
  FaIdCard,
} from "react-icons/fa";
import { BiCrown, BiSupport } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import toast from "react-hot-toast";
import ThemeToggle from "@/components/ThemeToggle";

const MemberLayout = ({ children }) => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard"); // Added this state

  // Menu items with submenus
  const menuItems = [
    {
      name: "Club Portal",
      href: "/",
      icon: <FaHome className="text-lg" />,
      case: "home",
      description: "Main community homepage",
    },
    {
      name: "Member Dashboard",
      href: "/member/dashboard",
      icon: <FaHome className="text-lg" />,
      case: "dashboard",
      description: "Overview, ID card & bulletins",
    },
    {
      name: "Digital ID Card",
      href: "/profile",
      icon: <FaIdCard className="text-lg" />,
      case: "id-card",
      description: "Official credentials & print",
      badge: "Official",
      badgeColor: "bg-emerald-500 text-white",
    },
    {
      name: "Member Directory",
      href: "/members",
      icon: <FaUserFriends className="text-lg" />,
      case: "members",
      description: "Directory of verified club members",
    },
    {
      name: "Events & RSVPs",
      href: "/events",
      icon: <FaCalendar className="text-lg" />,
      case: "events",
      description: "Reunions & club assemblies",
    },
    {
      name: "Membership Plans",
      href: "/membership",
      icon: <BiCrown className="text-lg" />,
      case: "subscription",
      description: "Tiers, privileges & perks",
      badge: "Lifetime",
      badgeColor: "bg-amber-500 text-white",
    },
    {
      name: "My Profile",
      href: "/profile",
      icon: <FaUser className="text-lg" />,
      case: "profile",
      description: "Personal & professional info",
    },
  ];

  // Stats cards
  const stats = [
    { label: "Membership Tier", value: user?.membership?.name || user?.membership || "Life Member", icon: BiCrown, color: "amber" },
    { label: "Member ID", value: user?.memberId || "RC-2026-8842", icon: FaIdCard, color: "blue" },
    { label: "Blood Group", value: user?.bloodGroup || "O+ (ve)", icon: FaStar, color: "purple" },
    { label: "Account Status", value: user?.status === "approved" ? "Active" : "Verified", icon: FaShieldAlt, color: "yellow" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  

  // Set active item based on pathname
  useEffect(() => {
    const currentItem = menuItems.find(
      (item) => pathname === item.href || pathname.startsWith(item.href + "/"),
    );
    if (currentItem) {
      setActiveItem(currentItem.case);
    }
  }, [pathname, menuItems]);

  // Redirect if not authenticated
  if (!loading && !user) {
    router.push("/login");
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const getStatusColor = () => {
    switch (user?.status) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const isMenuItemActive = (item) => {
    if (item.submenu) {
      return item.submenu.some((sub) => pathname === sub.href);
    }
    return pathname === item.href;
  };

  // Render menu item
  const renderMenuItem = (item) => {
    const isActive = isMenuItemActive(item);

    return (
      <Link
        key={item.name}
        href={item.href}
        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
          isActive
            ? "bg-emerald-50 dark:bg-emerald-950/40 shadow-xs border border-emerald-200 dark:border-emerald-800"
            : "hover:bg-slate-100 dark:hover:bg-slate-800/60"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`p-2.5 rounded-lg transition-colors flex-shrink-0 ${
              isActive
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-emerald-100 dark:group-hover:bg-slate-700 group-hover:text-emerald-700 dark:group-hover:text-emerald-300"
            }`}
          >
            {item.icon}
          </div>
          <div className="text-left min-w-0">
            <div
              className={`font-semibold transition-colors text-sm ${
                isActive ? "text-emerald-700 dark:text-emerald-300" : "text-slate-700 dark:text-slate-200"
              }`}
            >
              {item.name}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {item.description}
            </div>
          </div>
        </div>
        {item.badge && (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
              item.badgeColor || "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
            }`}
          >
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex transition-colors duration-200">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 transition-all duration-300 flex flex-col w-64 shrink-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* User Profile */}
        <div className="p-4 border-b border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-md">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
        
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email || "user@example.com"}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <div className={`w-1.5 h-1.5 ${getStatusColor()} rounded-full`}></div>
                <span className="text-xs capitalize text-gray-500 dark:text-gray-400">
                  {user?.status || "active"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Navigation Bar */}
        <header
          className={`sticky top-0 z-30 transition-all duration-300 ${
            isScrolled
              ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm"
              : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
          } border-b border-gray-200 dark:border-slate-800`}
        >
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <FaBars className="w-5 h-5" />
              </button>

              {/* Breadcrumb */}
              <div className="hidden md:flex items-center gap-2 text-sm">
                <span className="text-gray-400 dark:text-gray-500">Member Portal</span>
                <FaChevronRight className="w-3 h-3 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-200 font-semibold">
                  {menuItems.find(
                    (item) =>
                      item.case === activeItem ||
                      (item.submenu &&
                        item.submenu.some((sub) => pathname === sub.href)),
                  )?.name || "Dashboard"}
                </span>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle (Device / Dark / Light) */}
              <ThemeToggle showLabel />

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
                >
                  <FaBell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
                        <p className="text-sm text-gray-600">
                          Your profile update was successful
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          2 minutes ago
                        </p>
                      </div>
                      <div className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
                        <p className="text-sm text-gray-600">
                          New member joined your network
                        </p>
                        <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                      </div>
                      <div className="p-4 hover:bg-gray-50 transition-colors">
                        <p className="text-sm text-gray-600">
                          Payment for subscription received
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          3 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 border-t border-gray-100">
                      <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-3 ml-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role || "Member"}
                  </p>
                </div>
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold shadow-md">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Overview */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              const colorClasses = {
                amber: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
                blue: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
                purple: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",
                yellow: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
              };
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs p-4 border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all hover:scale-[1.02] duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white mt-1 truncate">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`p-2.5 rounded-xl ${colorClasses[stat.color] || "bg-slate-100 text-slate-700"}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Page Content */}
        <div className="px-4 sm:px-6 lg:px-8 pb-12">{children}</div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default MemberLayout;
