"use client";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Activity,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Star,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus,
  UserCheck,
  UserX,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Calendar as CalendarIcon,
  Heart,
  Eye,
  Share2,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Filter,
  Download,
  RefreshCw,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  Image as ImageIcon,
  Link,
  ExternalLink,
  BarChart3,
  PieChart,
  LineChart,
  Activity as ActivityIcon,
  Target,
  Zap,
  Crown,
  Gift,
  Globe,
  BookOpen,
  Coffee,
  Music,
  Code,
  Palette,
  Dumbbell,
  Camera,
  Briefcase,
  GraduationCap,
  Home,
  Settings as SettingsIcon,
  Users as UsersIcon,
  CalendarDays,
  CreditCard,
  Ticket,
  Newspaper,
  ShoppingBag,
  Video,
  FileText,
  HelpCircle,
  LifeBuoy,
  Shield,
  Lock,
  Unlock,
  AlertTriangle,
  Info,
  Check,
  AlertCircle,
} from "lucide-react";

const ClubDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("month");

  // Dashboard Data State
  const [dashboardData, setDashboardData] = useState({
    // Member Stats
    members: {
      total: 156,
      active: 142,
      inactive: 14,
      newThisMonth: 12,
      joinedThisWeek: 5,
      premium: 48,
      regular: 108,
    },
    // Event Stats
    events: {
      total: 24,
      upcoming: 8,
      completed: 16,
      cancelled: 2,
      attendance: 1250,
      avgAttendance: 78,
    },
    // Financial Stats
    finance: {
      totalRevenue: 45600,
      monthlyRevenue: 12450,
      expenses: 28900,
      profit: 16700,
      pendingPayments: 3200,
    },
    // Engagement Stats
    engagement: {
      totalInteractions: 3450,
      activeDiscussions: 28,
      newsletterSubscribers: 890,
      socialFollowers: 2340,
      websiteVisits: 5670,
    },
    // Interest Forms
    interestedPeople: {
      total: 45,
      pending: 23,
      contacted: 15,
      converted: 7,
    },
    // Recent Activities
    recentActivities: [
      {
        id: 1,
        action: "New member joined",
        user: "Amit Sharma",
        time: "2 hours ago",
        type: "member",
      },
      {
        id: 2,
        action: "Event created",
        user: "Sarah Johnson",
        time: "5 hours ago",
        type: "event",
      },
      {
        id: 3,
        action: "Payment received",
        user: "Rahul Verma",
        time: "1 day ago",
        type: "finance",
      },
      {
        id: 4,
        action: "New interest form",
        user: "Priya Patel",
        time: "2 days ago",
        type: "interest",
      },
      {
        id: 5,
        action: "Event completed",
        user: "Tech Conference",
        time: "3 days ago",
        type: "event",
      },
    ],
    // Upcoming Events
    upcomingEvents: [
      {
        id: 1,
        name: "Summer Music Fest",
        date: "Dec 15, 2025",
        attendees: 45,
        status: "upcoming",
      },
      {
        id: 2,
        name: "Tech Workshop",
        date: "Dec 20, 2025",
        attendees: 32,
        status: "upcoming",
      },
      {
        id: 3,
        name: "Charity Gala",
        date: "Jan 10, 2026",
        attendees: 78,
        status: "upcoming",
      },
    ],
    // Top Contributors
    topContributors: [
      { id: 1, name: "Sarah Johnson", points: 1250, role: "Event Coordinator" },
      { id: 2, name: "Michael Chen", points: 980, role: "Tech Lead" },
      {
        id: 3,
        name: "Emily Rodriguez",
        points: 870,
        role: "Creative Director",
      },
    ],
  });

  // Growth data for charts
  const growthData = {
    members: [120, 125, 130, 135, 142, 148, 156],
    events: [5, 8, 12, 15, 18, 22, 24],
    revenue: [8000, 9500, 11200, 12800, 14500, 15600, 16700],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  };

  // Navigation items
  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "members", label: "Members", icon: Users },
    { id: "events", label: "Events", icon: Calendar },
    { id: "finance", label: "Finance", icon: DollarSign },
    { id: "engagement", label: "Engagement", icon: Activity },
    { id: "interests", label: "Interests", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format number with K/M suffix
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  // Stat Card Component
  const StatCard = ({ title, value, change, icon: Icon, color, subtitle }) => {
    const isPositive = change > 0;
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          {change !== undefined && (
            <div
              className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? "text-emerald-600" : "text-red-600"}`}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          {typeof value === "number" ? formatNumber(value) : value}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    );
  };

  // Mini Chart Component
  const MiniChart = ({ data, color }) => {
    const max = Math.max(...data);
    const height = 40;
    return (
      <div className="flex items-end gap-1 h-10">
        {data.map((value, idx) => (
          <div
            key={idx}
            className={`w-full bg-gradient-to-t ${color} rounded-t opacity-75`}
            style={{ height: `${(value / max) * height}px`, maxWidth: "30px" }}
          />
        ))}
      </div>
    );
  };

  // Main Dashboard Content
  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Members"
          value={dashboardData.members.total}
          change={8.5}
          icon={Users}
          color="from-emerald-500 to-teal-500"
          subtitle={`+${dashboardData.members.newThisMonth} this month`}
        />
        <StatCard
          title="Active Members"
          value={dashboardData.members.active}
          change={5.2}
          icon={UserCheck}
          color="from-blue-500 to-cyan-500"
          subtitle={`${dashboardData.members.inactive} inactive`}
        />
        <StatCard
          title="Upcoming Events"
          value={dashboardData.events.upcoming}
          change={12}
          icon={Calendar}
          color="from-purple-500 to-pink-500"
          subtitle={`${dashboardData.events.completed} completed`}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(dashboardData.finance.totalRevenue)}
          change={15.3}
          icon={DollarSign}
          color="from-amber-500 to-orange-500"
          subtitle={`Profit: ${formatCurrency(dashboardData.finance.profit)}`}
        />
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Interested People"
          value={dashboardData.interestedPeople.total}
          change={23}
          icon={Heart}
          color="from-rose-500 to-red-500"
          subtitle={`${dashboardData.interestedPeople.pending} pending review`}
        />
        <StatCard
          title="Newsletter Subs"
          value={dashboardData.engagement.newsletterSubscribers}
          change={18.7}
          icon={Mail}
          color="from-indigo-500 to-purple-500"
          subtitle="Active subscribers"
        />
        <StatCard
          title="Social Followers"
          value={dashboardData.engagement.socialFollowers}
          change={32.1}
          icon={Share2}
          color="from-cyan-500 to-blue-500"
          subtitle="Across all platforms"
        />
        <StatCard
          title="Total Interactions"
          value={dashboardData.engagement.totalInteractions}
          change={42}
          icon={Activity}
          color="from-emerald-500 to-green-500"
          subtitle="Last 30 days"
        />
      </div>

      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Growth Overview
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Monthly member and event growth
              </p>
            </div>
            <select className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800">
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Members
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-white">
                  {dashboardData.members.total}
                </span>
              </div>
              <MiniChart
                data={growthData.members}
                color="from-emerald-500 to-teal-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Events
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-white">
                  {dashboardData.events.total}
                </span>
              </div>
              <MiniChart
                data={growthData.events}
                color="from-purple-500 to-pink-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Revenue (K)
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-white">
                  {formatCurrency(dashboardData.finance.totalRevenue)}
                </span>
              </div>
              <MiniChart
                data={growthData.revenue}
                color="from-amber-500 to-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Recent Activity
            </h3>
            <button className="text-sm text-emerald-600 hover:text-emerald-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {dashboardData.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  {activity.type === "member" && (
                    <UserPlus className="w-4 h-4 text-emerald-600" />
                  )}
                  {activity.type === "event" && (
                    <Calendar className="w-4 h-4 text-purple-600" />
                  )}
                  {activity.type === "finance" && (
                    <DollarSign className="w-4 h-4 text-amber-600" />
                  )}
                  {activity.type === "interest" && (
                    <Heart className="w-4 h-4 text-rose-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.user}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events & Top Contributors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Upcoming Events
            </h3>
            <button className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {dashboardData.upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {event.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {event.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {event.attendees}
                  </p>
                  <p className="text-xs text-gray-400">attendees</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Contributors */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Top Contributors
            </h3>
            <button className="text-sm text-emerald-600 hover:text-emerald-700">
              View Leaderboard
            </button>
          </div>
          <div className="space-y-3">
            {dashboardData.topContributors.map((contributor, idx) => (
              <div
                key={contributor.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      idx === 0
                        ? "bg-amber-500"
                        : idx === 1
                          ? "bg-gray-400"
                          : "bg-amber-700"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {contributor.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {contributor.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {contributor.points}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Avg. Attendance</p>
              <p className="text-2xl font-bold">
                {dashboardData.events.avgAttendance}
              </p>
            </div>
            <Users className="w-8 h-8 opacity-80" />
          </div>
        </div>
        <div className="bg-linear-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Active Discussions</p>
              <p className="text-2xl font-bold">
                {dashboardData.engagement.activeDiscussions}
              </p>
            </div>
            <MessageCircle className="w-8 h-8 opacity-80" />
          </div>
        </div>
        <div className="bg-linear-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Conversion Rate</p>
              <p className="text-2xl font-bold">15.6%</p>
            </div>
            <Target className="w-8 h-8 opacity-80" />
          </div>
        </div>
        <div className="bg-linear-to-r from-cyan-500 to-blue-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Premium Members</p>
              <p className="text-2xl font-bold">
                {dashboardData.members.premium}
              </p>
            </div>
            <Crown className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );

  const MembersTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Total Members"
          value={dashboardData.members.total}
          icon={Users}
          color="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Active"
          value={dashboardData.members.active}
          icon={UserCheck}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Premium"
          value={dashboardData.members.premium}
          icon={Crown}
          color="from-amber-500 to-orange-500"
        />
        <StatCard
          title="New This Month"
          value={dashboardData.members.newThisMonth}
          icon={UserPlus}
          color="from-purple-500 to-pink-500"
        />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Member List
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                  Sarah Johnson
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  Event Coordinator
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                  Jan 2024
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                  Michael Chen
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  Tech Lead
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                  Mar 2024
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const EventsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Total Events"
          value={dashboardData.events.total}
          icon={Calendar}
          color="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Upcoming"
          value={dashboardData.events.upcoming}
          icon={Clock}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Completed"
          value={dashboardData.events.completed}
          icon={CheckCircle}
          color="from-emerald-500 to-green-500"
        />
        <StatCard
          title="Total Attendance"
          value={dashboardData.events.attendance}
          icon={Users}
          color="from-purple-500 to-pink-500"
        />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Event Calendar View
        </h3>
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          Calendar integration coming soon...
        </div>
      </div>
    </div>
  );

  const FinanceTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(dashboardData.finance.totalRevenue)}
          icon={DollarSign}
          color="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Monthly Revenue"
          value={formatCurrency(dashboardData.finance.monthlyRevenue)}
          icon={TrendingUp}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Expenses"
          value={formatCurrency(dashboardData.finance.expenses)}
          icon={TrendingDown}
          color="from-rose-500 to-red-500"
        />
        <StatCard
          title="Net Profit"
          value={formatCurrency(dashboardData.finance.profit)}
          icon={Award}
          color="from-amber-500 to-orange-500"
        />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Financial Overview
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
          Chart integration coming soon...
        </div>
      </div>
    </div>
  );

  const InterestsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Total Interested"
          value={dashboardData.interestedPeople.total}
          icon={Heart}
          color="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Pending"
          value={dashboardData.interestedPeople.pending}
          icon={Clock}
          color="from-amber-500 to-orange-500"
        />
        <StatCard
          title="Contacted"
          value={dashboardData.interestedPeople.contacted}
          icon={MessageCircle}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Converted"
          value={dashboardData.interestedPeople.converted}
          icon={UserCheck}
          color="from-emerald-500 to-green-500"
        />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Interested People List
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Interests
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                  Amit Sharma
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  amit@example.com
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  Technology, Networking
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const EngagementTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Newsletter Subs"
          value={dashboardData.engagement.newsletterSubscribers}
          icon={Mail}
          color="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Social Followers"
          value={dashboardData.engagement.socialFollowers}
          icon={Share2}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Website Visits"
          value={dashboardData.engagement.websiteVisits}
          icon={Globe}
          color="from-purple-500 to-pink-500"
        />
        <StatCard
          title="Active Discussions"
          value={dashboardData.engagement.activeDiscussions}
          icon={MessageCircle}
          color="from-amber-500 to-orange-500"
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "members":
        return <MembersTab />;
      case "events":
        return <EventsTab />;
      case "finance":
        return <FinanceTab />;
      case "engagement":
        return <EngagementTab />;
      case "interests":
        return <InterestsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Content */}
      <main className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
            {activeTab}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Dashboard overview and statistics
          </p>
        </div>
        {renderContent()}
      </main>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(20px) translateX(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default ClubDashboard;
