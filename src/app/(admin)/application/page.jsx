'use client';
import api from '@/config/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  Users,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  User,
  DollarSign,
  CreditCard,
  AlertCircle,
  Loader,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  X,
  Send,
  Shield,
  Home,
  Building,
  Award,
  Star,
  FileText,
  Check,
  ThumbsUp,
  ThumbsDown,
  MessageSquare
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const MembershipApplicationsPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewStatus, setReviewStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch all users/applications
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await api.get("/auth/all_users");
      return res.data;
    }
  });

  // Review mutation
  const reviewMutation = useMutation({
    mutationFn: async ({ userId, reviewData }) => {
      const res = await api.put(`/auth/review-user/${userId}`, reviewData);
      return res.data;
    },
    onSuccess: () => {
      toast.success(`Application ${reviewStatus === 'approved' ? 'approved' : 'rejected'} successfully!`);
      setShowReviewModal(false);
      setSelectedApplication(null);
      setReviewNotes('');
      setReviewStatus('');
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error) => {
      console.error('Error reviewing application:', error);
      toast.error('Failed to submit review');
    }
  });

  // Get all applications from the data
  const applications = data?.data || data?.users || data || [];
  
  // Calculate stats
  const stats = {
    total: applications.length,
    review: applications.filter(app => app.status === 'review' || app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    active: applications.filter(app => app.isActive === true).length
  };

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone?.includes(searchTerm) ||
      app.memberId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  // Get status badge
  const getStatusBadge = (status) => {
    const badges = {
      review: { 
        color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        icon: Clock,
        label: 'Under Review'
      },
      pending: { 
        color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        icon: Clock,
        label: 'Pending'
      },
      approved: { 
        color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        icon: CheckCircle,
        label: 'Approved'
      },
      rejected: { 
        color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        icon: XCircle,
        label: 'Rejected'
      },
      active: {
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        icon: Shield,
        label: 'Active'
      }
    };
    return badges[status] || badges.pending;
  };

  // Get membership type badge
  const getMembershipBadge = (membership) => {
    if (!membership) return null;
    
    const types = {
      lifetime: { color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30', label: 'Lifetime', icon: Award }
    };
    return types[membership.type] || types.regular;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount, currency = 'BDT') => {
    return `${currency} ${amount?.toLocaleString() || 0}`;
  };

  // Handle review
  const handleReview = (application) => {
    setSelectedApplication(application);
    setShowReviewModal(true);
    setReviewStatus('');
    setReviewNotes('');
  };

  const handleReviewSubmit = () => {
    if (!reviewStatus) {
      toast.error('Please select a decision');
      return;
    }
    
    reviewMutation.mutate({
      userId: selectedApplication._id,
      reviewData: {
        status: reviewStatus,
        reviewNotes: reviewNotes,
        reviewedAt: new Date().toISOString(),
        reviewedBy: 'Admin'
      }
    });
  };

  // Review Modal Component
  const ReviewModal = () => {
    if (!selectedApplication) return null;
    
    const statusBadge = getStatusBadge(selectedApplication.status);
    const StatusIcon = statusBadge.icon;
    const membershipBadge = getMembershipBadge(selectedApplication.membership);
    const MembershipIcon = membershipBadge?.icon || Shield;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowReviewModal(false)}>
        <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Review Application</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Review membership application details</p>
            </div>
            <button onClick={() => setShowReviewModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status and Member ID */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusBadge.color}`}>
                  <StatusIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{statusBadge.label}</span>
                </div>
                {selectedApplication.membership && (
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${membershipBadge.color}`}>
                    <MembershipIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{membershipBadge.label}</span>
                  </div>
                )}
              </div>
              {selectedApplication.memberId && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Member ID: <span className="font-mono">{selectedApplication.memberId}</span>
                </div>
              )}
            </div>

            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-500" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.name || 'N/A'}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.email || 'N/A'}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.phone || 'N/A'}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Applied On</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatDate(selectedApplication.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Address Information */}
            {(selectedApplication.permanentAddress || selectedApplication.presentAddress) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-emerald-500" />
                  Address Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedApplication.permanentAddress && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Permanent Address</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedApplication.permanentAddress.street}<br />
                        {selectedApplication.permanentAddress.city}, {selectedApplication.permanentAddress.state}<br />
                        {selectedApplication.permanentAddress.postalCode}<br />
                        {selectedApplication.permanentAddress.country}
                      </p>
                    </div>
                  )}
                  {selectedApplication.presentAddress && !selectedApplication.presentAddress.sameAsPermanent && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Present Address</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedApplication.presentAddress.street}<br />
                        {selectedApplication.presentAddress.city}, {selectedApplication.presentAddress.state}<br />
                        {selectedApplication.presentAddress.postalCode}<br />
                        {selectedApplication.presentAddress.country}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Membership Details */}
            {selectedApplication.membership && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-500" />
                  Membership Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Membership Plan</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.membership.name || 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Amount Paid</p>
                    <p className="font-medium text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(selectedApplication.membership.amount, selectedApplication.membership.currency)}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Purchase Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(selectedApplication.membership.purchaseDate)}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Membership Status</p>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">{selectedApplication.membership.status || 'N/A'}</p>
                  </div>
                </div>
                
              </div>
            )}

            {/* Payment Information */}
            {selectedApplication.payments && selectedApplication.payments.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-500" />
                  Payment Information
                </h3>
                <div className="space-y-3">
                  {selectedApplication.payments.map((payment, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Transaction ID</p>
                          <p className="text-sm font-mono text-gray-900 dark:text-white">{payment.tranId || payment.id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
                          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(payment.amount, payment.currency)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Payment Method</p>
                          <p className="text-sm text-gray-900 dark:text-white">{payment.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Payment Status</p>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                            payment.status === 'success' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {payment.status === 'success' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {payment.status || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Occupation */}
            {selectedApplication.occupation && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-500" />
                  Occupation
                </h3>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-gray-900 dark:text-white">{selectedApplication.occupation.type || 'Not specified'}</p>
                  {selectedApplication.occupation.companyName && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selectedApplication.occupation.companyName}</p>
                  )}
                </div>
              </div>
            )}

            {/* Review Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Review Decision</h3>
              
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setReviewStatus('approved')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition ${
                    reviewStatus === 'approved'
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => setReviewStatus('rejected')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition ${
                    reviewStatus === 'rejected'
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  Reject
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Review Notes (Optional)
                </label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows="4"
                  placeholder="Add any additional notes or feedback..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReviewSubmit}
                  disabled={!reviewStatus || reviewMutation.isPending}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {reviewMutation.isPending ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Application Card for Mobile View
  const ApplicationCard = ({ application }) => {
    const statusBadge = getStatusBadge(application.status);
    const StatusIcon = statusBadge.icon;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{application.name || 'N/A'}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{application.email}</p>
          </div>
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${statusBadge.color}`}>
            <StatusIcon className="w-3 h-3" />
            <span className="text-xs font-medium">{statusBadge.label}</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-3">
          {application.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Phone className="w-3.5 h-3.5" />
              <span>{application.phone}</span>
            </div>
          )}
          {application.memberId && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Shield className="w-3.5 h-3.5" />
              <span>ID: {application.memberId}</span>
            </div>
          )}
          {application.createdAt && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(application.createdAt)}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => handleReview(application)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition text-sm"
        >
          <Eye className="w-4 h-4" />
          Review Application
        </button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader className="w-12 h-12 text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Failed to Load Applications</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Please check your connection and try again</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Membership Applications</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Review and manage membership applications</p>
            </div>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Under Review</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.review}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-purple-600">{stats.active}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or member ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="sm:w-48 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              >
                <option value="all">All Status</option>
                <option value="review">Under Review</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="active">Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table - Desktop */}
        {filteredApplications.length > 0 ? (
          <>
            <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applicant</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Member ID</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applied Date</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentApplications.map((application) => {
                    const statusBadge = getStatusBadge(application.status);
                    const StatusIcon = statusBadge.icon;
                    
                    return (
                      <tr key={application._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{application.name || 'N/A'}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{application.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">{application.phone || 'N/A'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-sm font-mono text-gray-600 dark:text-gray-400">{application.memberId || 'N/A'}</code>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">{formatDate(application.createdAt)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${statusBadge.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            <span className="text-xs font-medium">{statusBadge.label}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleReview(application)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition"
                          >
                            <Eye className="w-4 h-4" />
                            Review
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile View - Cards */}
            <div className="lg:hidden">
              {currentApplications.map((application) => (
                <ApplicationCard key={application._id} application={application} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
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
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg transition ${
                          currentPage === pageNum
                            ? 'bg-emerald-500 text-white'
                            : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
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
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No applications found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No membership applications have been submitted yet'}
            </p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && <ReviewModal />}
    </div>
  );
};

export default MembershipApplicationsPage;