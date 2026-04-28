// app/admin/events/all/page.jsx
"use client";
import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Music,
  Laptop,
  Heart,
  Coffee,
  Sparkles,
  Ticket,
  Clock,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  PlayCircle,
  StopCircle,
  Calendar as CalendarIcon,
  TrendingUp,
  Users,
  DollarSign,
  Download,
  RefreshCw
} from 'lucide-react';

const AllEventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const itemsPerPage = 10;

  // Sample events data with live timers
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Summer Music Festival",
      date: "July 15, 2025",
      targetDate: new Date(2025, 6, 15, 18, 0, 0),
      endDate: new Date(2025, 6, 15, 23, 59, 0),
      description: "Join us for an unforgettable night of music, food, and fun under the stars!",
      location: "Central Park, New York",
      eventType: "music",
      bannerImage: "/api/placeholder/400/200",
      ticketPrice: 49.99,
      totalTickets: 500,
      soldTickets: 423,
      status: "upcoming",
      buttonText: "GET TICKETS",
      organizer: "Music Events Inc.",
      createdAt: "2025-01-10"
    },
    {
      id: 2,
      title: "Tech Conference 2025",
      date: "August 5, 2025",
      targetDate: new Date(2025, 7, 5, 9, 0, 0),
      endDate: new Date(2025, 7, 7, 18, 0, 0),
      description: "The biggest tech event of the year! Network with industry leaders.",
      location: "Convention Center, San Francisco",
      eventType: "tech",
      bannerImage: "/api/placeholder/400/200",
      ticketPrice: 199.99,
      totalTickets: 1000,
      soldTickets: 678,
      status: "upcoming",
      buttonText: "REGISTER NOW",
      organizer: "Tech Events Co.",
      createdAt: "2025-01-15"
    },
    {
      id: 3,
      title: "Wellness Retreat",
      date: "September 20, 2025",
      targetDate: new Date(2025, 8, 20, 10, 0, 0),
      endDate: new Date(2025, 8, 22, 16, 0, 0),
      description: "Escape the chaos and rejuvenate your mind, body, and soul.",
      location: "Mountain Resort, Colorado",
      eventType: "wellness",
      bannerImage: "/api/placeholder/400/200",
      ticketPrice: 299.99,
      totalTickets: 200,
      soldTickets: 145,
      status: "upcoming",
      buttonText: "JOIN RETREAT",
      organizer: "Wellness World",
      createdAt: "2025-01-20"
    },
    {
      id: 4,
      title: "Food & Wine Expo",
      date: "October 10, 2025",
      targetDate: new Date(2025, 9, 10, 12, 0, 0),
      endDate: new Date(2025, 9, 12, 22, 0, 0),
      description: "Savor exquisite cuisines from world-renowned chefs.",
      location: "Grand Plaza, Chicago",
      eventType: "food",
      bannerImage: "/api/placeholder/400/200",
      ticketPrice: 89.99,
      totalTickets: 800,
      soldTickets: 534,
      status: "upcoming",
      buttonText: "BUY PASS",
      organizer: "Food Festivals LLC",
      createdAt: "2025-01-25"
    },
    {
      id: 5,
      title: "Charity Gala Night",
      date: "November 25, 2025",
      targetDate: new Date(2025, 10, 25, 19, 0, 0),
      endDate: new Date(2025, 10, 26, 1, 0, 0),
      description: "An elegant evening supporting children's education.",
      location: "Royal Ballroom, Boston",
      eventType: "charity",
      bannerImage: "/api/placeholder/400/200",
      ticketPrice: 149.99,
      totalTickets: 300,
      soldTickets: 267,
      status: "upcoming",
      buttonText: "DONATE & JOIN",
      organizer: "Charity Foundation",
      createdAt: "2025-02-01"
    },
    {
      id: 6,
      title: "New Year's Eve Bash",
      date: "December 31, 2025",
      targetDate: new Date(2025, 11, 31, 20, 0, 0),
      endDate: new Date(2026, 0, 1, 2, 0, 0),
      description: "Ring in the New Year with a spectacular celebration!",
      location: "Harbor City, Miami",
      eventType: "party",
      bannerImage: "/api/placeholder/400/200",
      ticketPrice: 79.99,
      totalTickets: 1000,
      soldTickets: 892,
      status: "upcoming",
      buttonText: "CELEBRATE",
      organizer: "Party Planners",
      createdAt: "2025-02-05"
    },
    {
      id: 7,
      title: "Spring Music Festival",
      date: "March 20, 2025",
      targetDate: new Date(2025, 2, 20, 14, 0, 0),
      endDate: new Date(2025, 2, 20, 23, 0, 0),
      description: "Celebrate spring with amazing music and performances.",
      location: "Central Gardens, Austin",
      eventType: "music",
      bannerImage: "/api/placeholder/400/200",
      ticketPrice: 59.99,
      totalTickets: 600,
      soldTickets: 600,
      status: "ended",
      buttonText: "SOLD OUT",
      organizer: "Music Events Inc.",
      createdAt: "2024-12-15"
    },
    {
      id: 8,
      title: "Summer Beach Party",
      date: "June 10, 2025",
      targetDate: new Date(2025, 5, 10, 16, 0, 0),
      endDate: new Date(2025, 5, 10, 22, 0, 0),
      description: "Beach party with live DJs and water sports.",
      location: "Santa Monica Beach, LA",
      eventType: "party",
      bannerImage: "/api/placeholder/400/200",
      ticketPrice: 45.99,
      totalTickets: 400,
      soldTickets: 400,
      status: "ended",
      buttonText: "SOLD OUT",
      organizer: "Beach Events",
      createdAt: "2024-12-20"
    },
    {
      id: 9,
      title: "Yoga & Meditation Retreat",
      date: "April 5, 2025",
      targetDate: new Date(2025, 3, 5, 8, 0, 0),
      endDate: new Date(2025, 3, 7, 18, 0, 0),
      description: "Find inner peace with expert instructors.",
      location: "Sedona, Arizona",
      eventType: "wellness",
      bannerImage: "/api/placeholder/400/200",
      ticketPrice: 399.99,
      totalTickets: 100,
      soldTickets: 100,
      status: "ended",
      buttonText: "FULLY BOOKED",
      organizer: "Wellness World",
      createdAt: "2025-01-05"
    },
    {
      id: 10,
      title: "Art Exhibition Opening",
      date: "May 15, 2025",
      targetDate: new Date(2025, 4, 15, 18, 0, 0),
      endDate: new Date(2025, 5, 15, 20, 0, 0),
      description: "Contemporary art from emerging artists.",
      location: "Art Gallery, NYC",
      eventType: "art",
      bannerImage: "/api/placeholder/400/200",
      ticketPrice: 25.99,
      totalTickets: 300,
      soldTickets: 278,
      status: "ongoing",
      buttonText: "GET TICKETS",
      organizer: "Art Collective",
      createdAt: "2025-02-10"
    }
  ]);

  // Event types configuration
  const eventTypes = {
    music: { name: "Music", icon: Music, color: "text-rose-500", bgColor: "bg-rose-100 dark:bg-rose-900/20" },
    tech: { name: "Tech", icon: Laptop, color: "text-blue-500", bgColor: "bg-blue-100 dark:bg-blue-900/20" },
    wellness: { name: "Wellness", icon: Heart, color: "text-emerald-500", bgColor: "bg-emerald-100 dark:bg-emerald-900/20" },
    food: { name: "Food", icon: Coffee, color: "text-amber-500", bgColor: "bg-amber-100 dark:bg-amber-900/20" },
    charity: { name: "Charity", icon: Sparkles, color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/20" },
    party: { name: "Party", icon: Ticket, color: "text-indigo-500", bgColor: "bg-indigo-100 dark:bg-indigo-900/20" },
    art: { name: "Art", icon: Sparkles, color: "text-pink-500", bgColor: "bg-pink-100 dark:bg-pink-900/20" }
  };

  // Calculate time remaining and update status
  const updateEventStatus = (event) => {
    const now = new Date();
    const targetDate = new Date(event.targetDate);
    const endDate = new Date(event.endDate);

    if (now > endDate) {
      return 'ended';
    } else if (now >= targetDate && now <= endDate) {
      return 'ongoing';
    } else {
      return 'upcoming';
    }
  };

  // Calculate time left
  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const difference = new Date(targetDate).getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes, seconds: 0, expired: false };
  };

  // Update event statuses periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(prevEvents => 
        prevEvents.map(event => ({
          ...event,
          status: updateEventStatus(event)
        }))
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Get status badge configuration
  const getStatusConfig = (status) => {
    switch(status) {
      case 'ongoing':
        return { icon: PlayCircle, label: 'Ongoing', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/20', borderColor: 'border-green-200' };
      case 'ended':
        return { icon: StopCircle, label: 'Ended', color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900/20', borderColor: 'border-red-200' };
      case 'upcoming':
        return { icon: CalendarIcon, label: 'Upcoming', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/20', borderColor: 'border-blue-200' };
      default:
        return { icon: AlertCircle, label: 'Unknown', color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-900/20', borderColor: 'border-gray-200' };
    }
  };

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesType = typeFilter === 'all' || event.eventType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const stats = {
    total: events.length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    ongoing: events.filter(e => e.status === 'ongoing').length,
    ended: events.filter(e => e.status === 'ended').length,
    totalRevenue: events.reduce((sum, e) => sum + (e.soldTickets * e.ticketPrice), 0),
    totalTicketsSold: events.reduce((sum, e) => sum + e.soldTickets, 0)
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setShowDeleteModal(false);
      setSelectedEvent(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const exportToCSV = () => {
    const headers = ["ID", "Title", "Date", "Location", "Type", "Status", "Ticket Price", "Sold Tickets", "Total Tickets", "Revenue", "Organizer"];
    const csvData = filteredEvents.map(event => [
      event.id,
      event.title,
      event.date,
      event.location,
      event.eventType,
      event.status,
      event.ticketPrice,
      event.soldTickets,
      event.totalTickets,
      event.soldTickets * event.ticketPrice,
      event.organizer
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `events-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            All Events
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and monitor all your events</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Total Events</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Upcoming</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.upcoming}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Ongoing</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.ongoing}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <PlayCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Ended</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.ended}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                <StopCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by title, location or organizer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="ended">Ended</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
            >
              <option value="all">All Types</option>
              {Object.entries(eventTypes).map(([key, value]) => (
                <option key={key} value={key}>{value.name}</option>
              ))}
            </select>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition shadow-sm"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Time Left</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Tickets Sold</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedEvents.map((event) => {
                  const StatusIcon = getStatusConfig(event.status).icon;
                  const statusConfig = getStatusConfig(event.status);
                  const timeLeft = calculateTimeLeft(event.targetDate);
                  const EventTypeIcon = eventTypes[event.eventType]?.icon || Calendar;
                  
                  return (
                    <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${eventTypes[event.eventType]?.bgColor || 'bg-gray-100'}`}>
                            <EventTypeIcon className={`w-5 h-5 ${eventTypes[event.eventType]?.color || 'text-gray-500'}`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">{event.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">ID: #{event.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-800 dark:text-white">{event.date}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(event.targetDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <p className="text-sm text-gray-600 dark:text-gray-300">{event.location.split(',')[0]}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {event.status === 'upcoming' && !timeLeft.expired ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm font-semibold text-gray-800 dark:text-white">
                              <Clock className="w-3 h-3 text-emerald-500" />
                              <span>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                              <div 
                                className="bg-emerald-500 rounded-full h-1 transition-all duration-500"
                                style={{ width: `${Math.min(100, ((event.soldTickets / event.totalTickets) * 100))}%` }}
                              />
                            </div>
                          </div>
                        ) : event.status === 'ongoing' ? (
                          <span className="text-sm font-medium text-green-600">Happening Now!</span>
                        ) : (
                          <span className="text-sm text-gray-500">Event Concluded</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color} border ${statusConfig.borderColor}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-800 dark:text-white">{event.soldTickets} / {event.totalTickets}</p>
                          <p className="text-xs text-gray-500">{formatCurrency(event.soldTickets * event.ticketPrice)} revenue</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedEvent(event);
                              setShowDetailsModal(true);
                            }}
                            className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                            title="Edit Event"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedEvent(event);
                              setShowDeleteModal(true);
                            }}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredEvents.length)} of {filteredEvents.length} events
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                          currentPage === pageNum
                            ? "bg-emerald-500 text-white"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Delete Event</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete "{selectedEvent.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteEvent}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showDetailsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowDetailsModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Event Details</h2>
              <button onClick={() => setShowDetailsModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${eventTypes[selectedEvent.eventType]?.bgColor || 'bg-gray-100'}`}>
                  {(() => {
                    const Icon = eventTypes[selectedEvent.eventType]?.icon || Calendar;
                    return <Icon className={`w-8 h-8 ${eventTypes[selectedEvent.eventType]?.color || 'text-gray-500'}`} />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedEvent.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusConfig(selectedEvent.status).bgColor} ${getStatusConfig(selectedEvent.status).color}`}>
                      {getStatusConfig(selectedEvent.status).label}
                    </div>
                    <span className="text-sm text-gray-500">Event ID: #{selectedEvent.id}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">📅 Date</p>
                  <p className="text-gray-800 dark:text-white font-medium">{selectedEvent.date}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">📍 Location</p>
                  <p className="text-gray-800 dark:text-white font-medium">{selectedEvent.location}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">💰 Ticket Price</p>
                  <p className="text-gray-800 dark:text-white font-medium">{formatCurrency(selectedEvent.ticketPrice)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">🎟️ Tickets Sold</p>
                  <p className="text-gray-800 dark:text-white font-medium">{selectedEvent.soldTickets} / {selectedEvent.totalTickets}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">💰 Revenue</p>
                  <p className="text-gray-800 dark:text-white font-medium">{formatCurrency(selectedEvent.soldTickets * selectedEvent.ticketPrice)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">👤 Organizer</p>
                  <p className="text-gray-800 dark:text-white font-medium">{selectedEvent.organizer}</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-2">📝 Description</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{selectedEvent.description}</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-2">⏰ Time Left</p>
                {(() => {
                  const timeLeft = calculateTimeLeft(selectedEvent.targetDate);
                  if (selectedEvent.status === 'upcoming') {
                    return <p className="text-lg font-bold text-emerald-600">{timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes remaining</p>;
                  } else if (selectedEvent.status === 'ongoing') {
                    return <p className="text-lg font-bold text-green-600">Event is currently happening!</p>;
                  } else {
                    return <p className="text-lg font-bold text-gray-500">Event has ended</p>;
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllEventsPage;