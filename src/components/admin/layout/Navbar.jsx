// components/AdminNavbar.jsx
"use client";
import { useState } from "react";
import { 
  Bell, 
  Search, 
  Settings, 
  LogOut, 
  Menu,
  Sparkles,
  User as UserIcon,
  ChevronDown
} from "lucide-react";
import Link from "next/link";

const AdminNavbar = ({ onMenuClick, sidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: "New event request", time: "5 min ago", read: false, type: "event" },
    { id: 2, title: "Member join request", time: "1 hour ago", read: false, type: "member" },
    { id: 3, title: "Ticket sold: Tech Summit", time: "3 hours ago", read: true, type: "ticket" },
    { id: 4, title: "New project added", time: "Yesterday", read: true, type: "project" }
  ];

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Left Section - Menu Toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-600 lg:hidden"
          >
            <Menu size={22} />
          </button>
          <div className="hidden lg:flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600">
              Admin Dashboard
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 lg:mx-0">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events, members, projects..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-sm"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl hover:bg-gray-100 transition"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Notification Dropdown */}
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <button className="text-xs text-green-600 hover:text-green-700">Mark all read</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer ${
                          !notif.read ? "bg-green-50/30" : ""
                        }`}
                      >
                        <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-100">
                    <button className="text-sm text-green-600 hover:text-green-700">View all notifications</button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Admin Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 pl-3 border-l border-gray-200 hover:bg-gray-50 rounded-lg transition p-1"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-700">Rahul Sharma</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-orange-500 flex items-center justify-center text-white font-bold shadow-md">
                RS
              </div>
              <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                <div className="absolute right-0 top-14 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  <Link
                    href="/admin/profile"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <UserIcon size={16} />
                    My Profile
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Settings size={16} />
                    Settings
                  </Link>
                  <hr className="my-1" />
                  <Link
                    href="/login"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <LogOut size={16} />
                    Logout
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;