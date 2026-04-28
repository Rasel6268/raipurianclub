
"use client";
import AdminNavbar from "@/components/admin/layout/Navbar";
import AdminSidebar from "@/components/admin/layout/Sidebar";
import { useState, useEffect } from "react";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        isMobileOpen={mobileMenuOpen}
        onMobileClose={closeMobileMenu}
      />

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 min-h-screen
          ${sidebarOpen ? "lg:ml-72" : "lg:ml-20"}
        `}
      >
        {/* Navbar */}
        <AdminNavbar onMenuClick={toggleMobileMenu} sidebarOpen={sidebarOpen} />

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;