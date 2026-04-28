// app/admin/member-fee/page.jsx
"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  DollarSign,
  Users,
  Calendar,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  XCircle,
  Wallet,
  Banknote,
  Smartphone,
  Building,
  TrendingUp,
  ArrowUpDown,
  User
} from "lucide-react";

const MemberFeePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedMember, setSelectedMember] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const itemsPerPage = 10;

  // Sample member fee data
  const [memberFees, setMemberFees] = useState([
    {
      id: 1,
      name: "Rajesh Kumar Sharma",
      email: "rajesh.sharma@example.com",
      phone: "+91 98765 43210",
      amount: 5000,
      paymentMethod: "bikash",
      transactionId: "BKS-2024-001234",
      status: "completed",
      date: "2024-12-15",
      year: "2024",
      quarter: "Q4",
      memberSince: "2022",
      address: "123, Civil Lines, Raipur"
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@example.com",
      phone: "+91 98765 43211",
      amount: 5000,
      paymentMethod: "nogod",
      transactionId: "NGD-2024-005678",
      status: "completed",
      date: "2024-12-14",
      year: "2024",
      quarter: "Q4",
      memberSince: "2023",
      address: "45, Shankar Nagar, Raipur"
    },
    {
      id: 3,
      name: "Amit Verma",
      email: "amit.verma@example.com",
      phone: "+91 98765 43212",
      amount: 5000,
      paymentMethod: "rocket",
      transactionId: "RKT-2024-009012",
      status: "pending",
      date: "2024-12-13",
      year: "2024",
      quarter: "Q4",
      memberSince: "2021",
      address: "78, VIP Estate, Raipur"
    },
    {
      id: 4,
      name: "Sunita Yadav",
      email: "sunita.yadav@example.com",
      phone: "+91 98765 43213",
      amount: 5000,
      paymentMethod: "bank",
      transactionId: "BNK-2024-003456",
      status: "completed",
      date: "2024-12-12",
      year: "2024",
      quarter: "Q4",
      memberSince: "2022",
      address: "234, Avanti Vihar, Raipur"
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.singh@example.com",
      phone: "+91 98765 43214",
      amount: 5000,
      paymentMethod: "bikash",
      transactionId: "BKS-2024-007890",
      status: "failed",
      date: "2024-12-11",
      year: "2024",
      quarter: "Q4",
      memberSince: "2020",
      address: "567, Tatibandh, Raipur"
    },
    {
      id: 6,
      name: "Neha Gupta",
      email: "neha.gupta@example.com",
      phone: "+91 98765 43215",
      amount: 5000,
      paymentMethod: "nogod",
      transactionId: "NGD-2024-011234",
      status: "completed",
      date: "2024-12-10",
      year: "2024",
      quarter: "Q4",
      memberSince: "2023",
      address: "890, Kankali Para, Raipur"
    },
    {
      id: 7,
      name: "Rahul Mehta",
      email: "rahul.mehta@example.com",
      phone: "+91 98765 43216",
      amount: 5000,
      paymentMethod: "rocket",
      transactionId: "RKT-2024-015678",
      status: "pending",
      date: "2024-12-09",
      year: "2024",
      quarter: "Q4",
      memberSince: "2022",
      address: "123, New Rajendra Nagar, Raipur"
    },
    {
      id: 8,
      name: "Kavita Agrawal",
      email: "kavita.agrawal@example.com",
      phone: "+91 98765 43217",
      amount: 5000,
      paymentMethod: "bank",
      transactionId: "BNK-2024-019012",
      status: "completed",
      date: "2024-12-08",
      year: "2024",
      quarter: "Q4",
      memberSince: "2021",
      address: "456, Sundar Nagar, Raipur"
    },
    {
      id: 9,
      name: "Manoj Tiwari",
      email: "manoj.tiwari@example.com",
      phone: "+91 98765 43218",
      amount: 5000,
      paymentMethod: "bikash",
      transactionId: "BKS-2024-023456",
      status: "completed",
      date: "2024-12-07",
      year: "2024",
      quarter: "Q4",
      memberSince: "2020",
      address: "789, Moudhapara, Raipur"
    },
    {
      id: 10,
      name: "Anjali Sahu",
      email: "anjali.sahu@example.com",
      phone: "+91 98765 43219",
      amount: 5000,
      paymentMethod: "nogod",
      transactionId: "NGD-2024-027890",
      status: "pending",
      date: "2024-12-06",
      year: "2024",
      quarter: "Q4",
      memberSince: "2023",
      address: "321, DDU Nagar, Raipur"
    },
    {
      id: 11,
      name: "Pankaj Jain",
      email: "pankaj.jain@example.com",
      phone: "+91 98765 43220",
      amount: 5000,
      paymentMethod: "rocket",
      transactionId: "RKT-2024-031234",
      status: "completed",
      date: "2024-12-05",
      year: "2024",
      quarter: "Q4",
      memberSince: "2019",
      address: "654, Shailendra Nagar, Raipur"
    },
    {
      id: 12,
      name: "Rekha Thakur",
      email: "rekha.thakur@example.com",
      phone: "+91 98765 43221",
      amount: 5000,
      paymentMethod: "bank",
      transactionId: "BNK-2024-035678",
      status: "completed",
      date: "2024-12-04",
      year: "2024",
      quarter: "Q4",
      memberSince: "2022",
      address: "987, Ashoka Garden, Raipur"
    }
  ]);

  // Statistics
  const stats = {
    totalFees: memberFees.reduce((sum, fee) => sum + fee.amount, 0),
    totalMembers: memberFees.length,
    completedPayments: memberFees.filter(f => f.status === "completed").length,
    pendingPayments: memberFees.filter(f => f.status === "pending").length,
    failedPayments: memberFees.filter(f => f.status === "failed").length
  };

  // Payment method icons and colors
  const paymentMethodConfig = {
    bikash: { icon: Smartphone, color: "text-pink-500", bgColor: "bg-pink-500/10", name: "bKash" },
    nogod: { icon: Smartphone, color: "text-purple-500", bgColor: "bg-purple-500/10", name: "Nagad" },
    rocket: { icon: Wallet, color: "text-orange-500", bgColor: "bg-orange-500/10", name: "Rocket" },
    bank: { icon: Building, color: "text-blue-500", bgColor: "bg-blue-500/10", name: "Bank Transfer" }
  };

  // Status config
  const statusConfig = {
    completed: { icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-500/10", label: "Completed" },
    pending: { icon: Clock, color: "text-yellow-500", bgColor: "bg-yellow-500/10", label: "Pending" },
    failed: { icon: XCircle, color: "text-red-500", bgColor: "bg-red-500/10", label: "Failed" }
  };

  // Filter and sort data
  const filteredData = memberFees
    .filter(fee => {
      const matchesSearch = fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fee.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPaymentMethod = selectedPaymentMethod === "all" || fee.paymentMethod === selectedPaymentMethod;
      const matchesStatus = selectedStatus === "all" || fee.status === selectedStatus;
      return matchesSearch && matchesPaymentMethod && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
      } else if (sortBy === "amount") {
        return sortOrder === "desc" ? b.amount - a.amount : a.amount - b.amount;
      } else if (sortBy === "name") {
        return sortOrder === "desc" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
      }
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setShowDetailsModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Amount", "Payment Method", "Transaction ID", "Status", "Date", "Year", "Quarter"];
    const csvData = filteredData.map(fee => [
      fee.name,
      fee.email,
      fee.phone,
      fee.amount,
      paymentMethodConfig[fee.paymentMethod]?.name || fee.paymentMethod,
      fee.transactionId,
      statusConfig[fee.status]?.label || fee.status,
      formatDate(fee.date),
      fee.year,
      fee.quarter
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `member-fees-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Member Fee Management
          </h1>
          <p className="text-gray-500 mt-1">Manage and track member fee payments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Collection</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{formatAmount(stats.totalFees)}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-gray-500">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>From {stats.totalMembers} members</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Members</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalMembers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              <span>Active members paying fee</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.completedPayments}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-gray-500">
              <span>Successfully processed</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pendingPayments}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-gray-500">
              <span>Awaiting confirmation</span>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Payment Method Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="all">All Methods</option>
                <option value="bikash">bKash</option>
                <option value="nogod">Nagad</option>
                <option value="rocket">Rocket</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {/* Export Button */}
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition shadow-sm"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <button onClick={() => handleSort("name")} className="flex items-center gap-1 hover:text-gray-800">
                      Member Name
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <button onClick={() => handleSort("amount")} className="flex items-center gap-1 hover:text-gray-800">
                      Amount
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <button onClick={() => handleSort("date")} className="flex items-center gap-1 hover:text-gray-800">
                      Date
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.map((fee) => {
                  const PaymentIcon = paymentMethodConfig[fee.paymentMethod]?.icon || CreditCard;
                  const StatusIcon = statusConfig[fee.status]?.icon || Clock;
                  const statusColor = statusConfig[fee.status]?.color || "text-gray-500";
                  const statusBgColor = statusConfig[fee.status]?.bgColor || "bg-gray-100";
                  
                  return (
                    <tr key={fee.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{fee.name}</p>
                            <p className="text-xs text-gray-500">ID: #{fee.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{fee.email}</p>
                        <p className="text-xs text-gray-400">{fee.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">{formatAmount(fee.amount)}</p>
                        <p className="text-xs text-gray-400">{fee.year} • {fee.quarter}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-2 px-2 py-1 rounded-lg w-fit ${paymentMethodConfig[fee.paymentMethod]?.bgColor || "bg-gray-100"}`}>
                          <PaymentIcon className={`w-4 h-4 ${paymentMethodConfig[fee.paymentMethod]?.color || "text-gray-500"}`} />
                          <span className="text-sm font-medium">{paymentMethodConfig[fee.paymentMethod]?.name || fee.paymentMethod}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-mono text-gray-600">{fee.transactionId}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg w-fit ${statusBgColor}`}>
                          <StatusIcon className={`w-3.5 h-3.5 ${statusColor}`} />
                          <span className={`text-xs font-medium ${statusColor}`}>
                            {statusConfig[fee.status]?.label || fee.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{formatDate(fee.date)}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleViewDetails(fee)}
                          className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
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
                            : "text-gray-600 hover:bg-gray-100"
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
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailsModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Member Fee Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Member Info */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedMember.name}</h3>
                  <p className="text-gray-500">Member since {selectedMember.memberSince}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Email Address</p>
                  <p className="text-gray-800 font-medium">{selectedMember.email}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                  <p className="text-gray-800 font-medium">{selectedMember.phone}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Amount Paid</p>
                  <p className="text-gray-800 font-bold text-xl">{formatAmount(selectedMember.amount)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = paymentMethodConfig[selectedMember.paymentMethod]?.icon || CreditCard;
                      return <Icon className={`w-4 h-4 ${paymentMethodConfig[selectedMember.paymentMethod]?.color || "text-gray-500"}`} />;
                    })()}
                    <p className="text-gray-800 font-medium">
                      {paymentMethodConfig[selectedMember.paymentMethod]?.name || selectedMember.paymentMethod}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
                  <p className="text-gray-800 font-mono text-sm">{selectedMember.transactionId}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Payment Date</p>
                  <p className="text-gray-800 font-medium">{formatDate(selectedMember.date)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Fee Year</p>
                  <p className="text-gray-800 font-medium">{selectedMember.year}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Quarter</p>
                  <p className="text-gray-800 font-medium">{selectedMember.quarter}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
                  <p className="text-xs text-gray-500 mb-1">Address</p>
                  <p className="text-gray-800 font-medium">{selectedMember.address}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex justify-center pt-4 border-t border-gray-100">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig[selectedMember.status]?.bgColor || "bg-gray-100"}`}>
                  {(() => {
                    const StatusIcon = statusConfig[selectedMember.status]?.icon || Clock;
                    return <StatusIcon className={`w-4 h-4 ${statusConfig[selectedMember.status]?.color || "text-gray-500"}`} />;
                  })()}
                  <span className={`font-medium ${statusConfig[selectedMember.status]?.color || "text-gray-500"}`}>
                    {statusConfig[selectedMember.status]?.label || selectedMember.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberFeePage;