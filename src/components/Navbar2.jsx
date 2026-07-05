// components/Navbar.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Users,
  Calendar,
  Heart,
  Home,
  Image,
  User,
  LogOut,
  Settings,
  Shield,
  LayoutDashboard,
  ChevronDown,
  Sparkles,
  Award,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar2 = () => {
  const { user, loading, isAuthenticated, isAdmin, isMember, isReviewPending, logout,isSuperAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-lg py-3 border-b border-emerald-100/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="relative bg-linear-to-br from-emerald-600 to-cyan-600 rounded-full p-1.5">
                  <span className="text-white font-bold text-xl">RC</span>
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">
                Raipur <span className="text-emerald-500">Club</span>
              </span>
            </div>
            
            {/* Skeleton loader for nav items */}
            <div className="hidden md:flex items-center space-x-1">
              <div className="h-10 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-10 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-10 w-16 bg-gray-200 rounded-full animate-pulse ml-4"></div>
              <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse ml-2"></div>
            </div>
            
            {/* Mobile skeleton */}
            <div className="md:hidden">
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Navigation links for all users
  const navLinks = [
    { name: "Home", href: "/", icon: Home, showAlways: true },
    { name: "Members", href: "/members", icon: Users, showAlways: true },
    { name: "Amenities", href: "/amenities", icon: Sparkles, showAlways: true },
    { name: "Events", href: "/events", icon: Calendar, showAlways: true },
    { name: "Gallery", href: "/gallery", icon: Image, showAlways: true },
    { name: "Beauty of Raipur", href: "/beauty", icon: Image, showAlways: true },
    { name: "Projects", href: "/projects", icon: Heart, showAlways: true },
  ];





  const handleLogout = async () => {
    setIsUserMenuOpen(false);
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
    return { text: "Super Admin", color: "bg-red-100 text-red-700" };

  if (isAdmin)
    return { text: "Admin", color: "bg-purple-100 text-purple-700" };

  if (isReviewPending)
    return { text: "Pending Review", color: "bg-yellow-100 text-yellow-700" };

  if (isMember && user?.status === "approved")
    return { text: "Member", color: "bg-green-100 text-green-700" };

  return null;
};

  const statusBadge = getStatusBadge();

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
                    pathname === link.href
                      ? isScrolled
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-white bg-white/20"
                      : isScrolled
                      ? "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.name}
                  </span>
                </Link>
              ))}

              {/* Conditional Navigation based on auth status */}
              {isAuthenticated ? (
                <>
                
                  {/* User Menu Dropdown */}
                  <div className="relative ml-4">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                        isScrolled
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      <img
                        src={getProfileImage()}
                        alt={user?.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-medium text-sm hidden lg:inline">
                        {user?.name?.split(" ")[0]}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Dropdown Menu */}
                    {isUserMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsUserMenuOpen(false)}
                        />
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-fade-down">
                          <div className="p-3 border-b border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-3">
                              <img
                                src={getProfileImage()}
                                alt={user?.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-semibold text-gray-800 text-sm">
                                  {user?.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate max-w-[180px]">
                                  {user?.email}
                                </p>
                                {statusBadge && (
                                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${statusBadge.color}`}>
                                    {statusBadge.text}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="py-1">
                            <Link
                              href={isAdmin || isSuperAdmin ? "/dashboard" : "/member/dashboard"}
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <LayoutDashboard className="w-4 h-4" />
                              Dashboard
                            </Link>
                            <Link
                              href="/profile"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <User className="w-4 h-4" />
                              My Profile
                            </Link>
                            <hr className="my-1 border-gray-100" />
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              Logout
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Login Button */}
                  <Link
                    href="/login"
                    className={`ml-2 px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 ${
                      isScrolled
                        ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                        : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                    }`}
                  >
                    Login
                  </Link>

                  {/* Join Now Button */}
                  <Link
                    href="/register"
                    className={`ml-2 px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 ${
                      isScrolled
                        ? "bg-linear-to-r from-emerald-600 to-cyan-600 text-white"
                        : "bg-white text-emerald-600"
                    }`}
                  >
                    Join Now
                  </Link>
                </>
              )}
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

      {/* Mobile Menu Overlay - Only show when not loading */}
      {!loading && (
        <div
          className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-lg transition-all duration-500 md:hidden ${
            isMobileMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
          style={{ top: "70px" }}
        >
          {/* Rest of your mobile menu content remains the same */}
          <div className="flex flex-col h-full overflow-y-auto">
            {/* User Info Section (if logged in) */}
            {isAuthenticated && (
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-cyan-50">
                <div className="flex items-center gap-3">
                  <img
                    src={getProfileImage()}
                    alt={user?.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div>
                    <p className="font-bold text-gray-800">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                    {statusBadge && (
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${statusBadge.color}`}>
                        {statusBadge.text}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 py-6 px-4">
              {/* Main Navigation Links */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Navigation
                </p>
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      pathname === link.href
                        ? "bg-emerald-50 text-emerald-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}
              </div>

              {/* Authenticated User Links */}
              {isAuthenticated && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Account
                    </p>
                    <Link
                      href={isAdmin ? "/dashboard/admin" : "/dashboard/member"}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                      <span className="font-medium">Settings</span>
                    </Link>
                  </div>

              
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-linear-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      <Award className="w-5 h-5" />
                      Join the Community
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-down {
          animation: fadeDown 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar2;