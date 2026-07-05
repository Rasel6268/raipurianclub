// components/dashboard/Sidebar.js
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import {
  FaUser,
  FaShoppingBag,
  FaCreditCard,
  FaMapMarkerAlt,
  FaChevronRight,
  FaHome,
  FaCog,
  FaUserFriends,
  FaChartLine,
} from "react-icons/fa";
import { GiLeatherBoot } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";
import { BiCrown, BiSupport } from "react-icons/bi";
import toast from "react-hot-toast";

const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("dashboard");
  const [expandedMenu, setExpandedMenu] = useState(null);

  // Menu items with submenus
  const menuItems = [
    {
      name: "Dashboard",
      href: "/profile",
      icon: <FaHome className="text-lg" />,
      case: "dashboard",
      description: "Overview of your account",
    },
    {
      name: "Profile",
      icon: <FaUser className="text-lg" />,
      case: "profile",
      description: "Manage your personal information",
      submenu: [
        { name: "Personal Info", href: "/profile/info", case: "profile" },
        { name: "Address", href: "/profile/address", case: "address" },
        { name: "Education", href: "/profile/education", case: "education" },
        { name: "Occupation", href: "/profile/occupation", case: "occupation" },
      ],
    },
    {
      name: "My Orders",
      href: "/profile/orders",
      icon: <FaShoppingBag className="text-lg" />,
      case: "orders",
      description: "View your order history",
      badge: "12",
    },
    {
      name: "Payments",
      href: "/profile/payments",
      icon: <FaCreditCard className="text-lg" />,
      case: "payments",
      description: "Payment methods & history",
      badge: "8",
    },
    {
      name: "Order Tracking",
      href: "/profile/tracking",
      icon: <FaMapMarkerAlt className="text-lg" />,
      case: "tracking",
      description: "Track your orders",
    },
    {
      name: "Members",
      href: "/profile/members",
      icon: <FaUserFriends className="text-lg" />,
      case: "members",
      description: "Manage your members",
      badge: "5",
      badgeColor: "bg-blue-500",
    },
    {
      name: "Subscription",
      href: "/profile/subscription",
      icon: <BiCrown className="text-lg" />,
      case: "subscription",
      description: "Manage your subscription",
      badge: "Premium",
      badgeColor: "bg-yellow-500",
    },
    {
      name: "Statistics",
      href: "/profile/statistics",
      icon: <FaChartLine className="text-lg" />,
      case: "statistics",
      description: "View your stats",
    },
  ];

  // Additional sidebar items
  const bottomMenuItems = [
    {
      name: "Settings",
      href: "/profile/settings",
      icon: <FaCog className="text-lg" />,
      case: "settings",
      description: "Account settings",
    },
    {
      name: "Support",
      href: "/profile/support",
      icon: <BiSupport className="text-lg" />,
      case: "support",
      description: "Get help & support",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const getStatusColor = () => {
    switch (user?.status) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const toggleMenu = (caseName) => {
    setExpandedMenu(expandedMenu === caseName ? null : caseName);
  };

  const isMenuItemActive = (item) => {
    if (item.submenu) {
      return item.submenu.some(sub => pathname === sub.href);
    }
    return pathname === item.href;
  };

  // Render menu item
  const renderMenuItem = (item) => {
    const isActive = isMenuItemActive(item);
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedMenu === item.case;

    if (hasSubmenu) {
      return (
        <div key={item.case}>
          <button
            onClick={() => toggleMenu(item.case)}
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
            <FaChevronRight
              className={`text-sm transition-transform flex-shrink-0 ${
                isExpanded ? "rotate-90 text-amber-500" : "text-gray-400"
              }`}
            />
          </button>
          {isExpanded && (
            <div className="ml-12 mt-1 space-y-1">
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.case}
                  href={subItem.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                    pathname === subItem.href
                      ? "bg-amber-50 text-amber-600"
                      : "text-gray-600 hover:bg-amber-50 hover:text-amber-600"
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  {subItem.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.case}
        href={item.href}
        onClick={onClose}
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
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
            item.badgeColor || "bg-amber-100 text-amber-600"
          }`}>
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : `hidden lg:block lg:col-span-3 bg-linear-to-b from-amber-50 to-amber-100/50 border-r border-amber-200 h-screen sticky top-0 overflow-y-auto`
        }`}
      >
        {/* User Profile Summary */}
        <div className="p-6 border-b border-amber-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-linear-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-gray-800 text-lg truncate">
                {user?.name || "User"}
              </h2>
              <p className="text-gray-600 text-sm truncate">
                {user?.email || "user@example.com"}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <div className={`w-2 h-2 ${getStatusColor()} rounded-full animate-pulse`}></div>
                <span className="text-xs capitalize text-gray-600">
                  {user?.status || "active"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => renderMenuItem(item))}
          </nav>

          {/* Bottom Menu Items */}
          <div className="mt-6 pt-4 border-t border-amber-200 space-y-2">
            {bottomMenuItems.map((item) => (
              <Link
                key={item.case}
                href={item.href}
                onClick={onClose}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group hover:bg-white hover:shadow-md hover:border hover:border-amber-100 ${
                  pathname === item.href ? "bg-white shadow-lg border border-amber-200" : ""
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-amber-500 text-white"
                      : "bg-amber-100 text-amber-600 group-hover:bg-amber-200 group-hover:text-amber-700"
                  }`}
                >
                  {item.icon}
                </div>
                <div className="text-left">
                  <div
                    className={`font-semibold transition-colors text-sm ${
                      pathname === item.href ? "text-amber-600" : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={() => {
                handleLogout();
                onClose();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-red-50 hover:border hover:border-red-200 text-gray-600 hover:text-red-600"
            >
              <div className="p-2.5 rounded-lg bg-red-100 text-red-600">
                <HiOutlineLogout className="text-lg" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm">Logout</div>
                <div className="text-xs text-gray-500">Sign out of your account</div>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;