// app/admin/events/requests/page.jsx
"use client";
import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Users,
  Ticket,
  TrendingUp,
  AlertCircle,
  MessageSquare,
  Send,
  FileText,
  Star,
  Award,
  CalendarCheck,
  UserCheck,
  UserX,
  RefreshCw,
  MoreVertical,
  Trash2,
  Edit,
  Copy,
  Printer
} from 'lucide-react';

const EventRequestsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const itemsPerPage = 10;

  // Sample events list for filter
  const eventsList = [
    { id: 1, name: "Summer Music Festival" },
    { id: 2, name: "Tech Conference 2025" },
    { id: 3, name: "Wellness Retreat" },
    { id: 4, name: "Food & Wine Expo" },
    { id: 5, name: "Charity Gala Night" }
  ];

  // Sample event requests data
  const [requests, setRequests] = useState([
    {
      id: 1,
      eventId: 1,
      eventName: "Summer Music Festival",
      eventDate: "July 15, 2025",
      eventLocation: "Central Park, New York",
      applicantName: "Rajesh Kumar Sharma",
      email: "rajesh.sharma@example.com",
      phone: "+91 98765 43210",
      age: 28,
      gender: "Male",
      city: "New York",
      occupation: "Software Engineer",
      experience: "Attended 5+ music festivals",
      reasonForApplying: "Passionate about music and want to experience live performances",
      appliedDate: "2025-01-15",
      status: "pending",
      ticketType: "VIP",
      numberOfTickets: 2,
      additionalGuests: [
        { name: "Priya Sharma", age: 26, relationship: "Spouse" }
      ],
      specialRequests: "Need wheelchair access",
      paymentStatus: "pending",
      amount: 199.98,
      transactionId: null
    },
    {
      id: 2,
      eventId: 2,
      eventName: "Tech Conference 2025",
      eventDate: "August 5, 2025",
      eventLocation: "Convention Center, San Francisco",
      applicantName: "Priya Patel",
      email: "priya.patel@example.com",
      phone: "+91 98765 43211",
      age: 32,
      gender: "Female",
      city: "San Francisco",
      occupation: "Product Manager",
      experience: "Attended 3 tech conferences",
      reasonForApplying: "Network with industry leaders and learn about latest technologies",
      appliedDate: "2025-01-20",
      status: "approved",
      ticketType: "Standard",
      numberOfTickets: 1,
      additionalGuests: [],
      specialRequests: "",
      paymentStatus: "completed",
      amount: 199.99,
      transactionId: "TXN-123456789"
    },
    {
      id: 3,
      eventId: 3,
      eventName: "Wellness Retreat",
      eventDate: "September 20, 2025",
      eventLocation: "Mountain Resort, Colorado",
      applicantName: "Amit Verma",
      email: "amit.verma@example.com",
      phone: "+91 98765 43212",
      age: 35,
      gender: "Male",
      city: "Denver",
      occupation: "Yoga Instructor",
      experience: "Certified yoga teacher with 5 years experience",
      reasonForApplying: "Looking to deepen my practice and learn new techniques",
      appliedDate: "2025-01-25",
      status: "pending",
      ticketType: "Premium",
      numberOfTickets: 2,
      additionalGuests: [
        { name: "Neha Verma", age: 32, relationship: "Spouse" }
      ],
      specialRequests: "Vegetarian meal options",
      paymentStatus: "pending",
      amount: 599.98,
      transactionId: null
    },
    {
      id: 4,
      eventId: 4,
      eventName: "Food & Wine Expo",
      eventDate: "October 10, 2025",
      eventLocation: "Grand Plaza, Chicago",
      applicantName: "Sunita Yadav",
      email: "sunita.yadav@example.com",
      phone: "+91 98765 43213",
      age: 29,
      gender: "Female",
      city: "Chicago",
      occupation: "Chef",
      experience: "Professional chef with 6 years experience in Italian cuisine",
      reasonForApplying: "Discover new culinary trends and network with chefs",
      appliedDate: "2025-02-01",
      status: "rejected",
      ticketType: "Standard",
      numberOfTickets: 1,
      additionalGuests: [],
      specialRequests: "",
      paymentStatus: "refunded",
      amount: 89.99,
      transactionId: "TXN-987654321",
      rejectionReason: "Event capacity reached"
    },
    {
      id: 5,
      eventId: 5,
      eventName: "Charity Gala Night",
      eventDate: "November 25, 2025",
      eventLocation: "Royal Ballroom, Boston",
      applicantName: "Vikram Singh",
      email: "vikram.singh@example.com",
      phone: "+91 98765 43214",
      age: 45,
      gender: "Male",
      city: "Boston",
      occupation: "Business Owner",
      experience: "Regular donor to charitable causes",
      reasonForApplying: "Support children's education and contribute to society",
      appliedDate: "2025-02-05",
      status: "approved",
      ticketType: "VIP",
      numberOfTickets: 4,
      additionalGuests: [
        { name: "Meera Singh", age: 42, relationship: "Spouse" },
        { name: "Rohan Singh", age: 18, relationship: "Son" },
        { name: "Kavya Singh", age: 15, relationship: "Daughter" }
      ],
      specialRequests: "Dinner table near stage",
      paymentStatus: "completed",
      amount: 599.96,
      transactionId: "TXN-456123789"
    },
    {
      id: 6,
      eventId: 1,
      eventName: "Summer Music Festival",
      eventDate: "July 15, 2025",
      eventLocation: "Central Park, New York",
      applicantName: "Neha Gupta",
      email: "neha.gupta@example.com",
      phone: "+91 98765 43215",
      age: 24,
      gender: "Female",
      city: "New York",
      occupation: "Student",
      experience: "First time attending music festival",
      reasonForApplying: "Love music and want to have fun with friends",
      appliedDate: "2025-02-10",
      status: "pending",
      ticketType: "Standard",
      numberOfTickets: 3,
      additionalGuests: [
        { name: "Rahul Mehta", age: 25, relationship: "Friend" },
        { name: "Anjali Sahu", age: 24, relationship: "Friend" }
      ],
      specialRequests: "",
      paymentStatus: "pending",
      amount: 149.97,
      transactionId: null
    },
    {
      id: 7,
      eventId: 2,
      eventName: "Tech Conference 2025",
      eventDate: "August 5, 2025",
      eventLocation: "Convention Center, San Francisco",
      applicantName: "Rahul Mehta",
      email: "rahul.mehta@example.com",
      phone: "+91 98765 43216",
      age: 30,
      gender: "Male",
      city: "San Jose",
      occupation: "Data Scientist",
      experience: "Presented at 2 tech conferences",
      reasonForApplying: "Share knowledge and learn from industry experts",
      appliedDate: "2025-02-12",
      status: "approved",
      ticketType: "Standard",
      numberOfTickets: 1,
      additionalGuests: [],
      specialRequests: "",
      paymentStatus: "completed",
      amount: 199.99,
      transactionId: "TXN-789123456"
    },
    {
      id: 8,
      eventId: 3,
      eventName: "Wellness Retreat",
      eventDate: "September 20, 2025",
      eventLocation: "Mountain Resort, Colorado",
      applicantName: "Kavita Agrawal",
      email: "kavita.agrawal@example.com",
      phone: "+91 98765 43217",
      age: 38,
      gender: "Female",
      city: "Boulder",
      occupation: "Therapist",
      experience: "Certified meditation instructor",
      reasonForApplying: "Want to learn advanced meditation techniques",
      appliedDate: "2025-02-15",
      status: "pending",
      ticketType: "Premium",
      numberOfTickets: 1,
      additionalGuests: [],
      specialRequests: "Early check-in requested",
      paymentStatus: "pending",
      amount: 299.99,
      transactionId: null
    }
  ]);

  // Statistics
  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
    totalRevenue: requests
      .filter(r => r.status === 'approved' && r.paymentStatus === 'completed')
      .reduce((sum, r) => sum + r.amount, 0),
    totalTicketsSold: requests
      .filter(r => r.status === 'approved')
      .reduce((sum, r) => sum + r.numberOfTickets, 0)
  };

  // Status configuration
  const statusConfig = {
    pending: { icon: Clock, label: 'Pending', color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20', borderColor: 'border-yellow-200' },
    approved: { icon: CheckCircle, label: 'Approved', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/20', borderColor: 'border-green-200' },
    rejected: { icon: XCircle, label: 'Rejected', color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900/20', borderColor: 'border-red-200' }
  };

  // Filter requests
  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.eventName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesEvent = eventFilter === 'all' || request.eventId.toString() === eventFilter;
    return matchesSearch && matchesStatus && matchesEvent;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApprove = () => {
    if (selectedRequest) {
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === selectedRequest.id
            ? { 
                ...request, 
                status: 'approved', 
                paymentStatus: 'completed',
                transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
              }
            : request
        )
      );
      setShowApproveModal(false);
      setSelectedRequest(null);
    }
  };

  const handleReject = () => {
    if (selectedRequest) {
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === selectedRequest.id
            ? { ...request, status: 'rejected', rejectionReason: rejectReason || 'Request rejected by admin' }
            : request
        )
      );
      setShowRejectModal(false);
      setSelectedRequest(null);
      setRejectReason('');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const exportToCSV = () => {
    const headers = ["ID", "Event Name", "Applicant Name", "Email", "Phone", "Tickets", "Amount", "Status", "Applied Date"];
    const csvData = filteredRequests.map(request => [
      request.id,
      request.eventName,
      request.applicantName,
      request.email,
      request.phone,
      request.numberOfTickets,
      request.amount,
      request.status,
      formatDate(request.appliedDate)
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `event-requests-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendBulkEmail = () => {
    // Implement bulk email functionality
    alert("Bulk email feature will be implemented here");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Event Requests
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and review event registration requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Total Requests</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Approved</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.approved}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Rejected</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.rejected}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                <UserX className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Revenue</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
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
                placeholder="Search by name, email or event..."
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
            >
              <option value="all">All Events</option>
              {eventsList.map(event => (
                <option key={event.id} value={event.id}>{event.name}</option>
              ))}
            </select>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition shadow-sm"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>

            <button
              onClick={sendBulkEmail}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition shadow-sm"
            >
              <Send className="w-4 h-4" />
              Bulk Email
            </button>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Tickets</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Applied On</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedRequests.map((request) => {
                  const StatusIcon = statusConfig[request.status].icon;
                  const statusConf = statusConfig[request.status];
                  
                  return (
                    <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">{request.applicantName}</p>
                            <p className="text-xs text-gray-500">{request.age} yrs • {request.gender}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{request.eventName}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <p className="text-xs text-gray-500">{request.eventDate}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <p className="text-xs text-gray-500">{request.eventLocation.split(',')[0]}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <p className="text-sm text-gray-600 dark:text-gray-300">{request.email}</p>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <p className="text-sm text-gray-600 dark:text-gray-300">{request.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Ticket className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm font-semibold text-gray-800 dark:text-white">{request.numberOfTickets}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{request.ticketType}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">{formatCurrency(request.amount)}</p>
                        <p className={`text-xs ${request.paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {request.paymentStatus}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConf.bgColor} ${statusConf.color} border ${statusConf.borderColor}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConf.label}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300">{formatDate(request.appliedDate)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowDetailsModal(true);
                            }}
                            className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {request.status === 'pending' && (
                            <>
                              <button
                                onClick={() => {
                                  setSelectedRequest(request);
                                  setShowApproveModal(true);
                                }}
                                className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition"
                                title="Approve"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedRequest(request);
                                  setShowRejectModal(true);
                                }}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                title="Reject"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
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
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} requests
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

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowDetailsModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Application Details</h2>
              <button onClick={() => setShowDetailsModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Header Info */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{selectedRequest.applicantName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[selectedRequest.status].bgColor} ${statusConfig[selectedRequest.status].color}`}>
                      {statusConfig[selectedRequest.status].label}
                    </div>
                    <span className="text-sm text-gray-500">Request ID: #{selectedRequest.id}</span>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-500" />
                  Personal Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-gray-800 dark:text-white font-medium">{selectedRequest.email}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-gray-800 dark:text-white font-medium">{selectedRequest.phone}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Age</p>
                    <p className="text-gray-800 dark:text-white font-medium">{selectedRequest.age} years</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Gender</p>
                    <p className="text-gray-800 dark:text-white font-medium">{selectedRequest.gender}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                    <p className="text-xs text-gray-500">City</p>
                    <p className="text-gray-800 dark:text-white font-medium">{selectedRequest.city}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Occupation</p>
                    <p className="text-gray-800 dark:text-white font-medium">{selectedRequest.occupation}</p>
                  </div>
                </div>
              </div>

              {/* Event Information */}
              <div>
                <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  Event Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Event Name</p>
                    <p className="text-gray-800 dark:text-white font-medium">{selectedRequest.eventName}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Event Date</p>
                    <p className="text-gray-800 dark:text-white font-medium">{selectedRequest.eventDate}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-gray-800 dark:text-white font-medium">{selectedRequest.eventLocation}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Ticket Type</p>
                    <p className="text-gray-800 dark:text-white font-medium">{selectedRequest.ticketType}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Number of Tickets</p>
                    <p className="text-gray-800 dark:text-white font-medium">{selectedRequest.numberOfTickets}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-gray-800 dark:text-white font-bold text-lg">{formatCurrency(selectedRequest.amount)}</p>
                  </div>
                </div>
              </div>

              {/* Additional Guests */}
              {selectedRequest.additionalGuests.length > 0 && (
                <div>
                  <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-500" />
                    Additional Guests
                  </h4>
                  <div className="space-y-2">
                    {selectedRequest.additionalGuests.map((guest, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{guest.name}</p>
                          <p className="text-sm text-gray-500">{guest.relationship}</p>
                        </div>
                        <p className="text-sm text-gray-600">{guest.age} years</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience & Reason */}
              <div>
                <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-emerald-500" />
                  Additional Information
                </h4>
                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Experience</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{selectedRequest.experience}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Reason for Applying</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{selectedRequest.reasonForApplying}</p>
                  </div>
                  {selectedRequest.specialRequests && (
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1">Special Requests</p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{selectedRequest.specialRequests}</p>
                    </div>
                  )}
                  {selectedRequest.rejectionReason && (
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 border border-red-200 dark:border-red-800">
                      <p className="text-xs text-red-600 dark:text-red-400 mb-1">Rejection Reason</p>
                      <p className="text-red-700 dark:text-red-300 text-sm">{selectedRequest.rejectionReason}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Information */}
              {selectedRequest.status === 'approved' && (
                <div>
                  <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-emerald-500" />
                    Payment Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                      <p className="text-xs text-gray-500">Payment Status</p>
                      <p className="text-green-600 font-medium capitalize">{selectedRequest.paymentStatus}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                      <p className="text-xs text-gray-500">Transaction ID</p>
                      <p className="text-gray-800 dark:text-white font-mono text-sm">{selectedRequest.transactionId || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons for Pending Requests */}
            {selectedRequest.status === 'pending' && (
              <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 px-6 py-4 flex gap-3">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setShowApproveModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve Application
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setShowRejectModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Application
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Approve Confirmation Modal */}
      {showApproveModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowApproveModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Approve Application</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to approve {selectedRequest.applicantName}'s application for "{selectedRequest.eventName}"?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprove}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {showRejectModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowRejectModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Reject Application</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Are you sure you want to reject {selectedRequest.applicantName}'s application?
              </p>
              <textarea
                placeholder="Reason for rejection (optional)"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventRequestsPage;