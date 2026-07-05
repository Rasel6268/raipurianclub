// app/member/layout.js
"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaUser,
  FaShoppingBag,
  FaCreditCard,
  FaMapMarkerAlt,
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
  FaClipboardList,
  FaShieldAlt,
} from "react-icons/fa";
import { GiLeatherBoot } from "react-icons/gi";
import { BiCrown, BiSupport } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import toast from "react-hot-toast";

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
      name: "Home",
      href: "/",
      icon: <FaHome className="text-lg" />,
      case: "dashboard",
      description: "Overview of your account",
    },
    {
      name: "Dashboard",
      href: "/member",
      icon: <FaHome className="text-lg" />,
      case: "dashboard",
      description: "Overview of your account",
    },
    {
      name: "Members",
      href: "/member/members",
      icon: <FaUserFriends className="text-lg" />,
      case: "members",
      description: "Manage your members",
      badge: "5",
      badgeColor: "bg-blue-500",
    },
    {
      name: "Subscription",
      href: "/member/subscription",
      icon: <BiCrown className="text-lg" />,
      case: "subscription",
      description: "Manage your subscription",
      badge: "Premium",
      badgeColor: "bg-yellow-500",
    },
    {
      name: "Payments",
      href: "/member/payments",
      icon: <FaCreditCard className="text-lg" />,
      case: "payments",
      description: "Payment methods & history",
      badge: "8",
    },

    {
      name: "Statistics",
      href: "/member/statistics",
      icon: <FaChartLine className="text-lg" />,
      case: "statistics",
      description: "View your stats",
    },
  ];

  // Stats cards
  const stats = [
    { label: "Total Orders", value: "24", icon: FaShoppingBag, color: "amber" },
    {
      label: "Active Members",
      value: "12",
      icon: FaUserFriends,
      color: "blue",
    },
    { label: "Points", value: "2,450", icon: FaStar, color: "purple" },
    { label: "Subscription", value: "Premium", icon: BiCrown, color: "yellow" },
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
        key={item.case}
        href={item.href}
        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
          isActive
            ? "bg-white shadow-lg border border-amber-200"
            : "hover:bg-white hover:shadow-md hover:border hover:border-amber-100"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`p-2.5 rounded-lg transition-colors flex-shrink-0 ${
              isActive
                ? "bg-amber-500 text-white"
                : "bg-amber-100 text-amber-600 group-hover:bg-amber-200 group-hover:text-amber-700"
            }`}
          >
            {item.icon}
          </div>
          <div className="text-left min-w-0">
            <div
              className={`font-semibold transition-colors text-sm ${
                isActive ? "text-amber-600" : "text-gray-700"
              }`}
            >
              {item.name}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {item.description}
            </div>
          </div>
        </div>
        {item.badge && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
              item.badgeColor || "bg-amber-100 text-amber-600"
            }`}
          >
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col  ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
       

        {/* User Profile */}
        <div
          className={`p-4 border-b border-gray-200`}
        >
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold shadow-md">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
        
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "user@example.com"}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <div
                    className={`w-1.5 h-1.5 ${getStatusColor()} rounded-full`}
                  ></div>
                  <span className="text-xs capitalize text-gray-500">
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
      <div className="flex-1 min-w-0">
        {/* Top Navigation Bar */}
        <header
          className={`sticky top-0 z-30 transition-all duration-300 ${
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-lg"
              : "bg-white/80 backdrop-blur-sm"
          } border-b border-gray-100`}
        >
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaBars className="w-5 h-5" />
              </button>

              {/* Breadcrumb */}
              <div className="hidden md:flex items-center gap-2 text-sm">
                <span className="text-gray-400">Member</span>
                <FaChevronRight className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600 font-medium">
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
            <div className="flex items-center gap-2">
              {/* Search */}
              <button className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors">
                <FaSearch className="w-4 h-4" />
                <span className="text-sm">Search...</span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative"
                >
                  <FaBell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              const colorClasses = {
                amber: "bg-amber-50 text-amber-600",
                blue: "bg-blue-50 text-blue-600",
                purple: "bg-purple-50 text-purple-600",
                yellow: "bg-yellow-50 text-yellow-600",
              };
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all hover:scale-105 duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-xl font-bold text-gray-900 mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`p-2 rounded-lg ${colorClasses[stat.color]}`}
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
