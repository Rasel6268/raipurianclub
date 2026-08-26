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
    return date.toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0
    }).format(amount);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Member Fee Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Monitor, track, and export Raipurian Club subscription fees
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Total Collection */}
          <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 p-6 group">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Collection</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-gray-850 dark:text-white mt-2 tracking-tight">
                  {formatAmount(stats.totalFees)}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-700/50 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
              <span>From <span className="font-semibold text-gray-700 dark:text-gray-300">{stats.totalMembers}</span> active payments</span>
            </div>
          </div>

          {/* Total Members */}
          <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 p-6 group">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Members</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-gray-850 dark:text-white mt-2 tracking-tight">
                  {stats.totalMembers}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-700/50 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
              <span>Members paying subscription</span>
            </div>
          </div>

          {/* Completed */}
          <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 p-6 group">
            <div className="absolute top-0 left-0 w-2 h-full bg-green-500" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider">Completed</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-green-600 dark:text-green-400 mt-2 tracking-tight">
                  {stats.completedPayments}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 dark:bg-green-950/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-700/50 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span>Successfully processed & approved</span>
            </div>
          </div>

          {/* Pending */}
          <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 p-6 group">
            <div className="absolute top-0 left-0 w-2 h-full bg-yellow-500" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider">Pending</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-yellow-600 dark:text-yellow-400 mt-2 tracking-tight">
                  {stats.pendingPayments}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-950/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-700/50 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span>Awaiting manual / bank verification</span>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
              <input
                type="text"
                placeholder="Search by member, email or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 text-gray-855 dark:text-white border border-gray-250 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>

            {/* Select options & action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Payment Method Filter */}
              <div className="flex items-center gap-2 flex-1 sm:flex-initial">
                <select
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-250 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium transition cursor-pointer"
                >
                  <option value="all">All Payment Methods</option>
                  <option value="bikash">bKash</option>
                  <option value="nogod">Nagad</option>
                  <option value="rocket">Rocket</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 flex-1 sm:flex-initial">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-250 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium transition cursor-pointer"
                >
                  <option value="all">All Payment Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              {/* Export Button */}
              <button
                onClick={exportToCSV}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-sm duration-200 active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* TABLE (Hidden on Mobile, Displayed on Desktop >= md) */}
        <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/35 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                    <button onClick={() => handleSort("name")} className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-white transition">
                      Member Name
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                    Contact Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                    <button onClick={() => handleSort("amount")} className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-white transition">
                      Amount Paid
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                    <button onClick={() => handleSort("date")} className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-white transition">
                      Date
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {paginatedData.map((fee) => {
                  const PaymentIcon = paymentMethodConfig[fee.paymentMethod]?.icon || CreditCard;
                  const StatusIcon = statusConfig[fee.status]?.icon || Clock;
                  const statusColor = statusConfig[fee.status]?.color || "text-gray-500";
                  const statusBgColor = statusConfig[fee.status]?.bgColor || "bg-gray-100";
                  
                  return (
                    <tr key={fee.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/10 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-xs">
                            <User className="w-4.5 h-4.5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{fee.name}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">ID: #{fee.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[200px]">{fee.email}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{fee.phone}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-bold text-gray-800 dark:text-white">{formatAmount(fee.amount)}</p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold">{fee.year} • {fee.quarter}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full w-fit ${paymentMethodConfig[fee.paymentMethod]?.bgColor || "bg-gray-100 dark:bg-gray-800"}`}>
                          <PaymentIcon className={`w-3.5 h-3.5 ${paymentMethodConfig[fee.paymentMethod]?.color || "text-gray-500"}`} />
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {paymentMethodConfig[fee.paymentMethod]?.name || fee.paymentMethod}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-xs font-mono font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/40 px-2 py-1 rounded-md w-fit">
                          {fee.transactionId}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full w-fit ${statusBgColor} dark:${statusBgColor.replace('10', '950/20')}`}>
                          <StatusIcon className={`w-3.5 h-3.5 ${statusColor}`} />
                          <span className={`text-xs font-bold ${statusColor}`}>
                            {statusConfig[fee.status]?.label || fee.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(fee.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleViewDetails(fee)}
                          className="p-2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-450 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-xl transition duration-150 active:scale-90 cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4.5 h-4.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARD LIST (Visible on screens < md) */}
        <div className="md:hidden space-y-4">
          {paginatedData.map((fee) => {
            const PaymentIcon = paymentMethodConfig[fee.paymentMethod]?.icon || CreditCard;
            const StatusIcon = statusConfig[fee.status]?.icon || Clock;
            const statusColor = statusConfig[fee.status]?.color || "text-gray-500";
            const statusBgColor = statusConfig[fee.status]?.bgColor || "bg-gray-100";
            
            return (
              <div key={fee.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-xs shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-800 dark:text-white truncate">{fee.name}</h4>
                      <p className="text-xs text-gray-400 dark:text-gray-500">ID: #{fee.id}</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full shrink-0 ${statusBgColor}`}>
                    <StatusIcon className={`w-3 h-3 ${statusColor}`} />
                    <span className={`text-[10px] font-extrabold ${statusColor}`}>
                      {statusConfig[fee.status]?.label || fee.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs border-t border-b border-gray-50 dark:border-gray-700/50 py-3">
                  <div>
                    <span className="text-gray-400 dark:text-gray-500 block mb-0.5">Amount</span>
                    <span className="font-bold text-gray-800 dark:text-white text-sm">{formatAmount(fee.amount)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 dark:text-gray-500 block mb-0.5">Payment Method</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                      <PaymentIcon className={`w-3.5 h-3.5 ${paymentMethodConfig[fee.paymentMethod]?.color}`} />
                      {paymentMethodConfig[fee.paymentMethod]?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 dark:text-gray-500 block mb-0.5 font-medium">Txn ID</span>
                    <span className="font-mono text-gray-600 dark:text-gray-400 truncate block">{fee.transactionId}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 dark:text-gray-500 block mb-0.5">Payment Date</span>
                    <span className="text-gray-600 dark:text-gray-400 font-semibold">{formatDate(fee.date)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {fee.year} • {fee.quarter}
                  </span>
                  
                  <button
                    onClick={() => handleViewDetails(fee)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-lg transition active:scale-95 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-medium text-center sm:text-left">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
            </p>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-900/20 text-gray-600 dark:text-gray-400 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex gap-1.5">
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
                      className={`w-9 h-9 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                        currentPage === pageNum
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
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
                className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-900/20 text-gray-600 dark:text-gray-400 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedMember && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setShowDetailsModal(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto transform scale-95 animate-scale-up border border-gray-150 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-extrabold text-gray-850 dark:text-white">Payment Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                <XCircle className="w-5.5 h-5.5" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Profile Card Summary */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-750">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-sm">
                  <User className="w-6.5 h-6.5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-800 dark:text-white leading-tight">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-1">
                    Raipurian Club Member since {selectedMember.memberSince}
                  </p>
                </div>
              </div>

              {/* Data Detail Block Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                <div className="bg-gray-50 dark:bg-gray-900/40 rounded-2xl p-4">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block mb-1">Email Address</span>
                  <span className="text-sm text-gray-850 dark:text-gray-300 font-medium break-all">{selectedMember.email}</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/40 rounded-2xl p-4">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block mb-1">Phone Number</span>
                  <span className="text-sm text-gray-850 dark:text-gray-300 font-medium">{selectedMember.phone}</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/40 rounded-2xl p-4">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block mb-1">Amount Paid</span>
                  <span className="text-base text-gray-900 dark:text-white font-black">{formatAmount(selectedMember.amount)}</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/40 rounded-2xl p-4">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block mb-1">Payment Method</span>
                  <div className="flex items-center gap-1.5">
                    {(() => {
                      const Icon = paymentMethodConfig[selectedMember.paymentMethod]?.icon || CreditCard;
                      return <Icon className={`w-4 h-4 ${paymentMethodConfig[selectedMember.paymentMethod]?.color}`} />;
                    })()}
                    <span className="text-sm text-gray-850 dark:text-gray-300 font-bold">
                      {paymentMethodConfig[selectedMember.paymentMethod]?.name}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/40 rounded-2xl p-4">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block mb-1">Transaction ID</span>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md w-fit block mt-0.5">
                    {selectedMember.transactionId}
                  </span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/40 rounded-2xl p-4">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block mb-1">Payment Date</span>
                  <span className="text-sm text-gray-850 dark:text-gray-300 font-medium">{formatDate(selectedMember.date)}</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/40 rounded-2xl p-4">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block mb-1">Fee Year</span>
                  <span className="text-sm text-gray-850 dark:text-gray-300 font-bold">{selectedMember.year}</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/40 rounded-2xl p-4">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block mb-1">Quarter</span>
                  <span className="text-sm text-gray-850 dark:text-gray-300 font-bold">{selectedMember.quarter}</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/40 rounded-2xl p-4 sm:col-span-2">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block mb-1">Address</span>
                  <span className="text-sm text-gray-850 dark:text-gray-300 font-medium leading-relaxed">{selectedMember.address}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex justify-center pt-4 border-t border-gray-100 dark:border-gray-750">
                <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full ${statusConfig[selectedMember.status]?.bgColor || "bg-gray-100"}`}>
                  {(() => {
                    const StatusIcon = statusConfig[selectedMember.status]?.icon || Clock;
                    return <StatusIcon className={`w-4 h-4 ${statusConfig[selectedMember.status]?.color}`} />;
                  })()}
                  <span className={`text-xs font-extrabold uppercase tracking-wider ${statusConfig[selectedMember.status]?.color}`}>
                    {statusConfig[selectedMember.status]?.label || selectedMember.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Dynamic animations helper styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default MemberFeePage;