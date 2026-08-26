// components/AdminSidebar.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarPlus,
  CalendarDays,
  UserPlus,
  Users,
  UserCheck,
  FolderPlus,
  FolderKanban,
  ImagePlus,
  Images,
  Shield,
  Ticket,
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle,
  DollarSign,
  Heart,
} from "lucide-react";

const AdminSidebar = ({ isOpen, onToggle, isMobileOpen, onMobileClose }) => {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState({
    events: true,
    members: true,
    projects: true,
    gallery: true,
    permissions: true,
    tickets: true,
  });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [activeTooltip, setActiveTooltip] = useState(null);
  const tooltipTimeoutRef = useRef(null);

  const [mobileExpandedSections, setMobileExpandedSections] = useState({
    events: true,
    members: true,
    projects: true,
    gallery: true,
    donation: true,
    member_fee: true,
    permissions: true,
    tickets: true,
  });

  const toggleMobileSection = (sectionId) => {
    setMobileExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const toggleSection = (section) => {
    if (!isOpen) return;
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const menuSections = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-emerald-500",
      isSingle: true,
    },
    {
      id: "events",
      name: "Events",
      icon: CalendarDays,
      color: "text-blue-500",
      isSingle: false,
      children: [
        {
          name: "Add Event",
          icon: CalendarPlus,
          href: "/events/add",
          color: "text-blue-400",
        },
        {
          name: "All Events",
          icon: CalendarDays,
          href: "/events/all",
          color: "text-indigo-400",
          badge: 8,
        },
        {
          name: "Event Requests",
          icon: UserPlus,
          href: "/events/requests",
          color: "text-purple-400",
          badge: 3,
        },
      ],
    },
    {
      id: "members",
      name: "Members",
      icon: Users,
      color: "text-cyan-500",
      isSingle: false,
      children: [
        {
          name: "All Members",
          icon: Users,
          href: "/member/all",
          color: "text-cyan-400",
          badge: 156,
        },
        {
          name: "Interest to Join",
          icon: UserCheck,
          href: "/interest-persons",
          color: "text-orange-400",
          badge: 5,
        },
        {
          name: "Application",
          icon: UserCheck,
          href: "/application",
          color: "text-orange-400",
          badge: 5,
        },
      ],
    },
    {
      id: "projects",
      name: "Projects",
      icon: FolderKanban,
      color: "text-amber-500",
      isSingle: false,
      children: [
        {
          name: "Add Project",
          icon: FolderPlus,
          href: "/projects/add",
          color: "text-amber-400",
        },
        {
          name: "All Projects",
          icon: FolderKanban,
          href: "/projects/all",
          color: "text-yellow-400",
          badge: 12,
        },
         {
          name: "Project Categories",
          icon: FolderKanban,
          href: "/projects/categories",
          color: "text-yellow-400",
          badge: 12,
        },
      ],
    },
    {
      id: "gallery",
      name: "Gallery",
      icon: Images,
      color: "text-pink-500",
      isSingle: false,
      children: [
        {
          name: "Add Photo",
          icon: ImagePlus,
          href: "/admin/gallery/add",
          color: "text-pink-400",
        },
        {
          name: "All Photos",
          icon: Images,
          href: "/admin/gallery/all",
          color: "text-rose-400",
          badge: 245,
        },
      ],
    },
    {
      id: "donation",
      name: "Donation",
      icon: Heart,
      color: "text-rose-500",
      isSingle: false,
      children: [
        {
          name: "All Donations",
          icon: Heart,
          href: "/admin/donation/all",
          color: "text-rose-400",
          badge: 24,
        },
        {
          name: "Pending Donations",
          icon: Clock,
          href: "/admin/donation/pending",
          color: "text-yellow-400",
          badge: 6,
        },
        {
          name: "Completed Donations",
          icon: CheckCircle,
          href: "/admin/donation/completed",
          color: "text-green-400",
          badge: 18,
        },
      ],
    },
    {
      id: "member_fee",
      name: "Member Fee",
      icon: DollarSign,
      color: "text-emerald-500",
      isSingle: false,
      children: [
        {
          name: "All Member Fees",
          icon: DollarSign,
          href: "/member-fee",
          color: "text-emerald-400",
          badge: 43,
        },
        {
          name: "Make member Fee",
          icon: DollarSign,
          href: "/admin/member-fee/all",
          color: "text-emerald-400",
          badge: 43,
        },
      ],
    },
    {
      id: "permissions",
      name: "Permission & Role",
      icon: Shield,
      color: "text-red-500",
      isSingle: false,
      children: [
        {
          name: "Manage Roles",
          icon: Shield,
          href: "/permissions/roles",
          color: "text-red-400",
        },
        {
          name: "Members Mamagement",
          icon: Shield,
          href: "/member_manage",
          color: "text-red-400",
        },
      ],
    },
    {
      id: "tickets",
      name: "Tickets",
      icon: Ticket,
      color: "text-green-500",
      isSingle: false,
      children: [
        {
          name: "All Tickets",
          icon: Ticket,
          href: "/admin/tickets/all",
          color: "text-green-400",
          badge: 24,
        },
        {
          name: "Pending Tickets",
          icon: Clock,
          href: "/admin/tickets/pending",
          color: "text-yellow-400",
          badge: 6,
        },
        {
          name: "Sold Tickets",
          icon: CheckCircle,
          href: "/admin/tickets/sold",
          color: "text-green-400",
          badge: 18,
        },
      ],
    },
  ];

  // Handle tooltip show with position calculation
  const handleTooltipShow = (e, text) => {
    if (isOpen) return;

    // Clear any existing timeout
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const tooltipWidth = 120; // Approximate width of tooltip
    const viewportWidth = window.innerWidth;

    // Calculate position - ensure tooltip stays within viewport
    let leftPosition = rect.right + 8;
    let shouldShowRight = true;

    // If tooltip would go off screen on the right, show it on the left
    if (leftPosition + tooltipWidth > viewportWidth - 10) {
      leftPosition = rect.left - tooltipWidth - 8;
      shouldShowRight = false;
    }

    setTooltipPosition({
      x: leftPosition,
      y: rect.top + rect.height / 2,
      direction: shouldShowRight ? "right" : "left",
    });
    setActiveTooltip(text);
  };

  const handleTooltipHide = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setActiveTooltip(null);
    }, 100);
  };

  const handleTooltipLeave = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setActiveTooltip(null);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  // Tooltip component that renders at body level
  const GlobalTooltip = () => {
    if (!activeTooltip) return null;

    return (
      <div
        className="fixed z-100 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md shadow-lg whitespace-nowrap pointer-events-none animate-fade-in"
        style={{
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: "translateY(-50%)",
        }}
      >
        {activeTooltip}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-transparent ${
            tooltipPosition.direction === "right"
              ? "border-r-4 border-r-gray-900 -left-1"
              : "border-l-4 border-l-gray-900 -right-1"
          }`}
        />
      </div>
    );
  };

  return (
    <>
      <GlobalTooltip />

      {/* Desktop Sidebar - Remove scrollbar styling */}
      <aside
        className={`fixed top-0 left-0 h-full bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl z-40 transition-all duration-300 overflow-y-auto overflow-x-hidden hidden lg:block sidebar-no-scrollbar
          ${isOpen ? "w-72" : "w-20"}
        `}
      >
        {/* Logo Section */}
        <div
          className={`flex items-center justify-between p-5 border-b border-white/10 ${!isOpen && "justify-center"}`}
        >
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-green-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 flex-shrink-0">
              <span className="text-white font-bold text-xl">RC</span>
            </div>
            {isOpen && (
              <span className="font-bold text-xl bg-linear-to-r from-green-400 to-orange-400 bg-clip-text text-transparent whitespace-nowrap">
                Raipur Admin
              </span>
            )}
          </Link>
          {isOpen && (
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {!isOpen && (
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-3">
          {menuSections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections[section.id];

            if (section.isSingle) {
              const isActive = pathname === section.href;
              return (
                <div
                  key={section.id}
                  onMouseEnter={(e) => handleTooltipShow(e, section.name)}
                  onMouseLeave={handleTooltipHide}
                >
                  <Link
                    href={section.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-linear-to-r from-green-500/20 to-orange-500/20 text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    <Icon
                      size={20}
                      className={`${isActive ? section.color : "group-hover:text-white"} flex-shrink-0`}
                    />
                    {isOpen && (
                      <span className="text-sm font-medium flex-1 whitespace-nowrap">
                        {section.name}
                      </span>
                    )}
                  </Link>
                </div>
              );
            }

            return (
              <div key={section.id} className="space-y-1">
                {/* Section Header */}
                <div
                  onMouseEnter={(e) =>
                    !isOpen && handleTooltipShow(e, section.name)
                  }
                  onMouseLeave={handleTooltipHide}
                >
                  <div
                    onClick={() => isOpen && toggleSection(section.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer
                      ${isOpen ? "hover:bg-white/10" : "justify-center"}
                    `}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Icon size={20} className={`${section.color} shrink-0`} />
                      {isOpen && (
                        <>
                          <span className="text-sm font-medium text-gray-300 flex-1 whitespace-nowrap">
                            {section.name}
                          </span>
                          {isExpanded ? (
                            <ChevronUp size={16} className="text-gray-500" />
                          ) : (
                            <ChevronDown size={16} className="text-gray-500" />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Children Items */}
                {isOpen && isExpanded && (
                  <div className="ml-6 pl-2 space-y-1">
                    {section.children.map((child, idx) => {
                      const ChildIcon = child.icon;
                      const isActive = pathname === child.href;
                      return (
                        <Link
                          key={idx}
                          href={child.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group
                            ${
                              isActive
                                ? "bg-linear-to-r from-green-500/15 to-orange-500/15 text-white"
                                : "text-gray-500 hover:text-white hover:bg-white/5"
                            }
                          `}
                        >
                          <ChildIcon
                            size={16}
                            className={`${isActive ? child.color : "group-hover:text-white"} shrink-0`}
                          />
                          <span className="text-xs font-medium flex-1 whitespace-nowrap">
                            {child.name}
                          </span>
                          {child.badge && (
                            <span className="bg-red-500/80 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-4.5 text-center">
                              {child.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Child count badge for collapsed mode */}
                {!isOpen && (
                  <div className="text-center mt-1">
                    <span className="text-[10px] text-gray-500 bg-white/5 px-1 py-0.5 rounded">
                      {section.children.length}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl z-50 transition-transform duration-300 overflow-y-auto overflow-x-hidden w-72 lg:hidden sidebar-no-scrollbar
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo Section for Mobile */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3"
            onClick={onMobileClose}
          >
            <div className="w-10 h-10 bg-linear-to-br from-green-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 shrink-0">
              <span className="text-white font-bold text-xl">RC</span>
            </div>
            <span className="font-bold text-xl bg-linear-to-r from-green-400 to-orange-400 bg-clip-text text-transparent whitespace-nowrap">
              Raipur Admin
            </span>
          </Link>
          <button
            onClick={onMobileClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="p-4 space-y-3">
          {menuSections.map((section) => {
            const Icon = section.icon;
            const isExpandedMobile = mobileExpandedSections[section.id] !== false;

            if (section.isSingle) {
              const isActive = pathname === section.href;
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  onClick={onMobileClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-linear-to-r from-green-500/20 to-orange-500/20 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className={`${isActive ? section.color : "group-hover:text-white"} shrink-0`}
                  />
                  <span className="text-sm font-medium flex-1 whitespace-nowrap">
                    {section.name}
                  </span>
                </Link>
              );
            }

            return (
              <div key={section.id} className="space-y-1">
                <div
                  onClick={() => toggleMobileSection(section.id)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer hover:bg-white/10"
                >
                  <Icon size={20} className={`${section.color} shrink-0`} />
                  <span className="text-sm font-medium text-gray-300 flex-1 whitespace-nowrap">
                    {section.name}
                  </span>
                  {isExpandedMobile ? (
                    <ChevronUp size={16} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-500" />
                  )}
                </div>

                {/* Mobile Children Items */}
                {isExpandedMobile && (
                  <div className="ml-6 pl-2 space-y-1">
                    {section.children.map((child, idx) => {
                      const ChildIcon = child.icon;
                      const isActive = pathname === child.href;
                      return (
                        <Link
                          key={idx}
                          href={child.href}
                          onClick={onMobileClose}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group
                            ${
                              isActive
                                ? "bg-linear-to-r from-green-500/15 to-orange-500/15 text-white"
                                : "text-gray-500 hover:text-white hover:bg-white/5"
                            }
                          `}
                        >
                          <ChildIcon
                            size={16}
                            className={`${isActive ? child.color : "group-hover:text-white"} shrink-0`}
                          />
                          <span className="text-xs font-medium flex-1 whitespace-nowrap">
                            {child.name}
                          </span>
                          {child.badge && (
                            <span className="bg-red-500/80 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-4.5 text-center">
                              {child.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-gray-900/50 backdrop-blur-sm">
          <Link
            href="/admin/settings"
            onClick={onMobileClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition mb-1"
          >
            <Settings size={20} className="shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              Settings
            </span>
          </Link>
          <Link
            href="/login"
            onClick={onMobileClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut size={20} className="shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              Logout
            </span>
          </Link>
        </div>
      </aside>

      {/* Global styles for hiding scrollbars */}
      <style jsx global>{`
        .sidebar-no-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .sidebar-no-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.15s ease-out;
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;
