// components/Navbar2.js
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Users,
  Calendar,
  Home,
  Image as ImageIcon,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  ChevronDown,
  Sparkles,
  Award,
  Crown,
  GitBranch,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar2 = () => {
  const { user, loading, isAuthenticated, isAdmin, isMember, isReviewPending, logout, isSuperAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMembershipDropdownOpen, setIsMembershipDropdownOpen] = useState(false);
  const [isMobileMembershipOpen, setIsMobileMembershipOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu & dropdowns on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsMembershipDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Handle outside click for desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsMembershipDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-xs py-3.5 border-b border-emerald-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="h-10 w-10 bg-emerald-100 rounded-full animate-pulse"></div>
              <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            <div className="hidden lg:flex items-center space-x-2">
              <div className="h-9 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-9 w-24 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-9 w-24 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-9 w-24 bg-gray-200 rounded-full animate-pulse ml-3"></div>
            </div>
            <div className="lg:hidden">
              <div className="h-10 w-10 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Members", href: "/members", icon: Users },
    { name: "Amenities", href: "/amenities", icon: Sparkles },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Gallery", href: "/gallery", icon: ImageIcon },
    { name: "Beauty of Raipur", href: "/beauty", icon: ImageIcon },
  ];

  const membershipDropdownItems = [
    { 
      name: "View Plans", 
      href: "/membership", 
      icon: Crown,
      description: "Explore all club membership categories"
    },
    { 
      name: "Compare Plans", 
      href: "/membership/compare", 
      icon: GitBranch,
      description: "Side-by-side features & benefits matrix"
    },
    { 
      name: "Terms & Conditions", 
      href: "/terms", 
      icon: Award,
      description: "Membership policies & eligibility rules"
    },
  ];

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    await logout();
    router.push("/");
  };

  const getProfileImage = () => {
    if (user?.profileImage) {
      return user.profileImage;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=10b981&color=fff&rounded=true`;
  };

  const getStatusBadge = () => {
    if (isSuperAdmin)
      return { text: "Super Admin", color: "bg-red-500/10 text-red-600 border border-red-200" };
    if (isAdmin)
      return { text: "Admin", color: "bg-purple-500/10 text-purple-600 border border-purple-200" };
    if (isReviewPending)
      return { text: "Pending Review", color: "bg-amber-500/10 text-amber-600 border border-amber-200" };
    if (isMember && user?.status === "approved")
      return { text: "Member", color: "bg-emerald-500/10 text-emerald-600 border border-emerald-200" };
    return null;
  };

  const statusBadge = getStatusBadge();

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-md py-3 border-b border-gray-100 dark:border-slate-800"
            : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center space-x-2.5 focus:outline-hidden">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-xs opacity-50 group-hover:opacity-90 transition duration-300"></div>
                <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full p-2 text-white shadow-md">
                  <span className="font-extrabold text-sm tracking-wider">RC</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-bold text-lg sm:text-xl tracking-tight transition-colors duration-300 ${
                    isScrolled ? "text-slate-900 dark:text-white" : "text-white"
                  }`}
                >
                  Raipur <span className="text-emerald-500">Club</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-400 -mt-1 hidden sm:block">
                  Community Hub
                </span>
              </div>
            </Link>

            {/* Desktop & Tablet Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? isScrolled
                          ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 font-semibold"
                          : "text-white bg-white/20 backdrop-blur-md font-semibold"
                        : isScrolled
                        ? "text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <link.icon className="w-3.5 h-3.5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              {/* Membership Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsMembershipDropdownOpen(!isMembershipDropdownOpen)}
                  onMouseEnter={() => setIsMembershipDropdownOpen(true)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    pathname.startsWith("/membership") || pathname === "/terms"
                      ? isScrolled
                        ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 font-semibold"
                        : "text-white bg-white/20 backdrop-blur-md font-semibold"
                      : isScrolled
                      ? "text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                  aria-expanded={isMembershipDropdownOpen}
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Membership</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isMembershipDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMembershipDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsMembershipDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-2 z-50 animate-fade-down"
                  >
                    {membershipDropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMembershipDropdownOpen(false)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Authentication Buttons / Profile */}
              {isAuthenticated ? (
                <div ref={userMenuRef} className="relative ml-2">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                      isScrolled
                        ? "bg-emerald-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-emerald-100 dark:hover:bg-slate-700 border border-emerald-200/50"
                        : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border border-white/30"
                    }`}
                  >
                    <img
                      src={getProfileImage()}
                      alt={user?.name || "User"}
                      className="w-7 h-7 rounded-full object-cover border border-white/50"
                    />
                    <span className="font-semibold text-xs max-w-[100px] truncate">
                      {user?.name?.split(" ")[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden z-50 animate-fade-down">
                      <div className="p-3.5 border-b border-gray-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
                        <div className="flex items-center gap-3">
                          <img
                            src={getProfileImage()}
                            alt={user?.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-gray-900 dark:text-white text-sm truncate">
                              {user?.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {user?.email}
                            </p>
                            {statusBadge && (
                              <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1.5 ${statusBadge.color}`}>
                                {statusBadge.text}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-1.5">
                        <Link
                          href={isAdmin || isSuperAdmin ? "/dashboard" : "/member/dashboard"}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-emerald-500" />
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <User className="w-4 h-4 text-emerald-500" />
                          My Profile
                        </Link>
                        <div className="my-1 border-t border-gray-100 dark:border-slate-800" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 ml-3">
                  <Link
                    href="/login"
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isScrolled
                        ? "text-slate-700 dark:text-slate-200 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-md hover:shadow-emerald-500/25 transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Join Club
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              {!isAuthenticated && (
                <Link
                  href="/register"
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm"
                >
                  Join
                </Link>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2.5 rounded-xl transition-colors cursor-pointer focus:outline-hidden ${
                  isScrolled
                    ? "text-slate-800 dark:text-slate-100 bg-gray-100 dark:bg-slate-800"
                    : "text-white bg-white/20 backdrop-blur-md"
                }`}
                aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-down"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed top-[65px] bottom-0 right-0 left-0 bg-white dark:bg-slate-950 flex flex-col overflow-y-auto animate-fade-up">
            {/* User Profile Bar in Mobile Menu */}
            {isAuthenticated && (
              <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 border-b border-emerald-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src={getProfileImage()}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-900 dark:text-white truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                      {user?.email}
                    </p>
                    {statusBadge && (
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${statusBadge.color}`}>
                        {statusBadge.text}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 p-4 space-y-6">
              {/* Navigation Links */}
              <div>
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-2">
                  Navigation
                </p>
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                          isActive
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold"
                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <link.icon className="w-5 h-5" />
                          <span className="text-base">{link.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-40" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Membership Accordion Section */}
              <div className="pt-2 border-t border-gray-100 dark:border-slate-800">
                <button
                  onClick={() => setIsMobileMembershipOpen(!isMobileMembershipOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Crown className="w-5 h-5 text-amber-500" />
                    <span className="font-semibold text-base">Membership Options</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isMobileMembershipOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMobileMembershipOpen && (
                  <div className="pl-6 pr-2 py-2 space-y-1 bg-gray-50/60 dark:bg-slate-900/60 rounded-xl mt-1">
                    {membershipDropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-slate-800"
                      >
                        <item.icon className="w-4 h-4 text-emerald-500" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Account Quick Links (Logged In) */}
              {isAuthenticated && (
                <div className="pt-2 border-t border-gray-100 dark:border-slate-800 space-y-1">
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-2">
                    My Account
                  </p>
                  <Link
                    href={isAdmin || isSuperAdmin ? "/dashboard" : "/member/dashboard"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-900"
                  >
                    <LayoutDashboard className="w-5 h-5 text-emerald-500" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-900"
                  >
                    <User className="w-5 h-5 text-emerald-500" />
                    <span>My Profile</span>
                  </Link>
                </div>
              )}

              {/* Action Buttons at Bottom of Drawer */}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-50 dark:bg-red-950/40 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center py-3 bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-md text-sm"
                    >
                      Join Club
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar2;