"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  DollarSign,
  Heart,
  TrendingUp,
  TrendingDown,
  UserCheck,
  UserPlus,
  Clock,
  CheckCircle,
  Activity,
  ArrowUpRight,
  Download,
  RefreshCw,
  Plus,
  CalendarDays,
  CreditCard,
  FolderKanban,
  Shield,
  Ticket,
  Mail,
  ChevronRight,
  Eye,
  Building,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
} from "lucide-react";
import api from "@/config/api";

const ClubDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dynamic dashboard state
  const [stats, setStats] = useState({
    members: {
      total: 156,
      active: 142,
      pending: 14,
      newThisMonth: 12,
      founding: 18,
      managing: 14,
      patron: 24,
      donor: 32,
      general: 68,
    },
    events: {
      total: 24,
      upcoming: 8,
      completed: 16,
      attendees: 1250,
      avgAttendance: 78,
    },
    finance: {
      totalCollection: 485000,
      monthlyTarget: 120000,
      monthlyCollected: 105000,
      pendingFees: 15000,
      collectionRate: 87.5,
    },
    applications: {
      total: 45,
      pending: 23,
      approved: 15,
      rejected: 7,
    },
  });

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  // Fetch real events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setEventsLoading(true);
        const res = await api.get('/events');
        const raw = res.data?.events?.data ?? res.data?.data ?? [];
        // Only show published, sort by targetDate
        const published = raw
          .filter(e => !e.status || e.status === 'published')
          .sort((a, b) => new Date(a.targetDate || a.date) - new Date(b.targetDate || b.date));

        // Update events stats with real data
        const now = new Date();
        const upcoming = published.filter(e => new Date(e.targetDate || e.date) >= now);
        const completed = published.filter(e => new Date(e.targetDate || e.date) < now);
        const totalAttendees = published.reduce((sum, e) => sum + (e.registeredCount || 0), 0);

        setStats(prev => ({
          ...prev,
          events: {
            total: published.length,
            upcoming: upcoming.length,
            completed: completed.length,
            attendees: totalAttendees,
            avgAttendance: published.length > 0 ? Math.round(totalAttendees / published.length) : 0,
          },
        }));

        // Format for dashboard cards — take next 3 upcoming events
        const dashboardEvents = upcoming.slice(0, 3).map(evt => {
          const dateStr = evt.date || (evt.targetDate ? new Date(evt.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBA');
          return {
            id: evt._id || evt.id,
            title: evt.title || 'Untitled Event',
            date: dateStr,
            time: evt.venueDetails || '',
            attendees: evt.registeredCount || 0,
            category: evt.eventType ? evt.eventType.charAt(0).toUpperCase() + evt.eventType.slice(1) : 'Event',
            status: 'Upcoming',
          };
        });
        setUpcomingEvents(dashboardEvents);
      } catch (err) {
        console.error('Dashboard events fetch error:', err);
        setUpcomingEvents([]);
      } finally {
        setEventsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const recentActivities = [
    {
      id: 1,
      title: "New member application approved",
      desc: "Md. Asaduzzaman joined as Founding Member",
      time: "10 min ago",
      icon: UserCheck,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      id: 2,
      title: "Annual Member Fee received",
      desc: "৳5,000 paid via bKash by Rajesh Sharma",
      time: "45 min ago",
      icon: DollarSign,
      color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40",
    },
    {
      id: 3,
      title: "New Event published",
      desc: "Raipur Youth Leadership Summit 2026",
      time: "2 hours ago",
      icon: Calendar,
      color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40",
    },
    {
      id: 4,
      title: "New Interest to Join submission",
      desc: "Farhana Islam submitted application form",
      time: "4 hours ago",
      icon: Heart,
      color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40",
    },
  ];

  const quickShortcuts = [
    {
      title: "Member Roles",
      desc: "Assign & manage member roles",
      icon: Shield,
      href: "/member_manage",
      color: "from-blue-600 to-indigo-600",
      badge: "Manage",
    },
    {
      title: "Member Fees",
      desc: "Track payments & subscriptions",
      icon: DollarSign,
      href: "/member-fee",
      color: "from-emerald-600 to-teal-600",
      badge: "Finance",
    },
    {
      title: "Applications",
      desc: "Review new join requests",
      icon: UserPlus,
      href: "/application",
      color: "from-amber-600 to-orange-600",
      badge: `${stats.applications.pending} New`,
    },
    {
      title: "Add Event",
      desc: "Schedule club meetings & events",
      icon: CalendarDays,
      href: "/events/add",
      color: "from-purple-600 to-pink-600",
      badge: "Events",
    },
  ];

  // Overview Tab Component
  const OverviewContent = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* ── 4 Main Primary KPI Cards ────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Members */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-150 dark:border-gray-700 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
              Total Members
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Users className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {stats.members.total}
            </span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +{stats.members.newThisMonth}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            <span>{stats.members.active} active now</span>
            <Link
              href="/member_manage"
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-0.5"
            >
              Manage <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Total Collections */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-150 dark:border-gray-700 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
              Fee Collection
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <DollarSign className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight truncate">
              {formatCurrency(stats.finance.totalCollection)}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              {stats.finance.collectionRate}% target met
            </span>
            <Link
              href="/member-fee"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-0.5"
            >
              Fees <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Club Events */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-150 dark:border-gray-700 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
              Upcoming Events
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Calendar className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {stats.events.upcoming}
            </span>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              / {stats.events.total} Total
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            <span>{stats.events.attendees} attendees</span>
            <Link
              href="/events/all"
              className="text-purple-600 dark:text-purple-400 font-semibold hover:underline flex items-center gap-0.5"
            >
              Events <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Pending Applications */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-150 dark:border-gray-700 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
              Pending Reviews
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Clock className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
              {stats.applications.pending}
            </span>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              applications
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            <span>{stats.applications.approved} approved</span>
            <Link
              href="/application"
              className="text-amber-600 dark:text-amber-400 font-semibold hover:underline flex items-center gap-0.5"
            >
              Review <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Two-Column Content Grid ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column (2 Cols on lg) */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Quick Action Shortcuts Grid */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-150 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm sm:text-base font-bold text-gray-850 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Quick Admin Actions
              </h3>
              <span className="text-xs text-gray-400">Fast shortcuts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {quickShortcuts.map((sc, idx) => {
                const Icon = sc.icon;
                return (
                  <Link
                    key={idx}
                    href={sc.href}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20 border border-gray-100 dark:border-gray-700/70 transition group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl bg-linear-to-tr ${sc.color} flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white truncate">
                          {sc.title}
                        </p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-400 truncate">
                          {sc.desc}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 shrink-0 ml-2">
                      {sc.badge}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events Table / List */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-150 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-850 dark:text-white">
                  Upcoming Club Events
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-400">
                  Scheduled gatherings and initiatives
                </p>
              </div>
              <Link
                href="/events/all"
                className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
              {eventsLoading ? (
                <div className="py-8 text-center text-xs text-gray-400">Loading events…</div>
              ) : upcomingEvents.length === 0 ? (
                <div className="py-8 text-center">
                  <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">No upcoming events yet</p>
                  <Link href="/events/add" className="text-xs text-emerald-600 font-bold mt-1 inline-block hover:underline">+ Create Event</Link>
                </div>
              ) : upcomingEvents.map((evt) => {
                const dateParts = (evt.date || 'TBA').split(" ");
                const monthPart = dateParts[0] || '';
                const dayPart = (dateParts[1] || '').replace(",", "");
                return (
                <div
                  key={evt.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 hover:bg-gray-50/50 dark:hover:bg-gray-900/20 px-2 rounded-xl transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] font-extrabold text-purple-600 uppercase">
                        {monthPart}
                      </span>
                      <span className="text-xs font-black text-purple-700 dark:text-purple-300">
                        {dayPart}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white truncate">
                        {evt.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 dark:text-gray-400 flex items-center gap-2">
                        {evt.time && <span>🕒 {evt.time}</span>}
                        {evt.time && <span>•</span>}
                        <span>👥 {evt.attendees} Registered</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                      {evt.category}
                    </span>
                    <Link
                      href={`/events/all`}
                      className="text-xs font-bold px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 transition"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col on lg) */}
        <div className="space-y-4 sm:space-y-6">
          {/* Membership Categories Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-150 dark:border-gray-700">
            <h3 className="text-sm sm:text-base font-bold text-gray-850 dark:text-white mb-3">
              Member Category Breakdown
            </h3>
            <div className="space-y-2.5 text-xs">
              {[
                { label: "General Members", count: stats.members.general, color: "bg-gray-400", pct: 44 },
                { label: "Donors", count: stats.members.donor, color: "bg-green-500", pct: 20 },
                { label: "Patrons", count: stats.members.patron, color: "bg-purple-500", pct: 15 },
                { label: "Founding Members", count: stats.members.founding, color: "bg-yellow-500", pct: 12 },
                { label: "Managing Members", count: stats.members.managing, color: "bg-blue-500", pct: 9 },
              ].map((cat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300 font-semibold text-[11px]">
                    <span>{cat.label}</span>
                    <span>{cat.count} members ({cat.pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${cat.color} rounded-full`}
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-150 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-bold text-gray-850 dark:text-white">
                Live Club Activity
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-3">
              {recentActivities.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="flex items-start gap-3 text-xs">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${act.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-800 dark:text-white leading-tight">
                        {act.title}
                      </p>
                      <p className="text-[11px] text-gray-400 dark:text-gray-400 truncate mt-0.5">
                        {act.desc}
                      </p>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {act.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ── Header Toolbar (Compact & Ultra-Responsive) ──────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Executive Dashboard
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              Live
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-400 mt-0.5">
            Raipur Club Management Overview & Analytics
          </p>
        </div>

        {/* Action buttons & time selector */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Time range selector pills */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-900/60 p-1 rounded-xl">
            {["today", "week", "month", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg capitalize transition cursor-pointer ${
                  timeRange === range
                    ? "bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-xs"
                    : "text-gray-500 hover:text-gray-800 dark:text-gray-400"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            title="Refresh dashboard stats"
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-900/60 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition cursor-pointer"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin text-emerald-600" : ""}`}
            />
          </button>

          {/* Quick Create Action Button */}
          <Link
            href="/member_manage"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-xs active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage Roles</span>
          </Link>
        </div>
      </div>

      {/* ── Main Tab Navigation Bar ─────────────────────────── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "overview", label: "Overview", icon: Layers },
          { id: "roles", label: "Role & Member Hub", icon: Shield, href: "/member_manage" },
          { id: "fees", label: "Fee Tracker", icon: DollarSign, href: "/member-fee" },
          { id: "events", label: "Events & Gatherings", icon: Calendar, href: "/events/all" },
          { id: "applications", label: "Join Requests", icon: Heart, href: "/application" },
        ].map((tab) => {
          const Icon = tab.icon;
          if (tab.href) {
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-emerald-600 hover:border-emerald-500 transition shrink-0 shadow-2xs"
              >
                <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600" />
                <span>{tab.label}</span>
                <ArrowUpRight className="w-3 h-3 text-gray-300" />
              </Link>
            );
          }
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold rounded-xl transition shrink-0 cursor-pointer shadow-2xs ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white shadow-emerald-600/20 shadow-md"
                  : "bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Render Content ──────────────────────────────────── */}
      <OverviewContent />
    </div>
  );
};

export default ClubDashboard;
