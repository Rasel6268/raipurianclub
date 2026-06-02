'use client';
import React, { useState, useEffect } from 'react';
import {
  Users,
  Clock,
  Filter,
  Search,
  Eye,
  MessageCircle,
  X,
  Download,
  UserCheck,
  Trash2,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Heart,
  Star,
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  UserPlus,
  Award,
  PhoneCall,
  FileText,
  Send,
  Edit2,
  Check,
  Loader2,
  PhoneOutgoing,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import api from '@/config/api';

const AdminInterestManagement = () => {
  // Admin state
  const [interestedPeople, setInterestedPeople] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    ongoing: 0,
    converted: 0,
    notInterested: 0,
  });
  
  // Call tracking states
  const [showCallModal, setShowCallModal] = useState(false);
  const [callData, setCallData] = useState({
    type: 'outgoing',
    duration: '',
    summary: '',
    followUp: '',
  });
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [updating, setUpdating] = useState(false);

  const itemsPerPage = 10;

  const fetchPersons = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/Interestforjoin/all?page=${page}&limit=${itemsPerPage}`);
      
      if (response.data.success) {
        // Transform API data to match component structure
        const transformedData = response.data.data.map(person => ({
          id: person._id,
          fullName: person.name,
          email: person.email,
          phone: person.contactInfo?.mobile || 'Not provided',
          location: person.contactInfo?.permanentAddress?.split(',')[0] || 'Not specified',
          permanentAddress: person.contactInfo?.permanentAddress,
          temporaryAddress: person.contactInfo?.temporaryAddress,
          occupation: person.profession,
          education: person.education,
          interests: [person.profession, person.education],
          hearAbout: 'Website Form',
          message: person.questions,
          preferredRole: 'Member',
          availability: 'Flexible',
          status: person.status || 'new',
          callHistory: person.callHistory || [],
          notes: person.notes || [],
          submittedAt: person.createdAt,
          convertedToMember: person.convertedToMember || null,
          updatedAt: person.updatedAt,
        }));
        
        setInterestedPeople(transformedData);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        updateStats(transformedData);
      } else {
        toast.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching persons:', error);
      toast.error('Error loading data');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStats = (data) => {
    setStats({
      total: data.length,
      new: data.filter(p => p.status === 'new').length,
      contacted: data.filter(p => p.status === 'contacted').length,
      ongoing: data.filter(p => p.status === 'ongoing').length,
      converted: data.filter(p => p.status === 'converted').length,
      notInterested: data.filter(p => p.status === 'not-interested').length,
    });
  };

  useEffect(() => {
    fetchPersons(currentPage);
  }, [currentPage]);

  // Update person status
  const updatePersonStatus = async (personId, newStatus) => {
    try {
      setUpdating(true);
      const response = await api.patch(`/Interestforjoin/update-status/${personId}`, { status: newStatus });
      if (response.data.success) {
        toast.success(`Status updated to ${newStatus}`);
        fetchPersons(currentPage);
        if (selectedPerson?.id === personId) {
          setSelectedPerson({ ...selectedPerson, status: newStatus });
        }
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.response?.data?.message || 'Error updating status');
    } finally {
      setUpdating(false);
    }
  };

  // Add call record
  const addCallRecord = async (personId) => {
    if (!callData.summary) {
      toast.error('Please add call summary');
      return;
    }

    try {
      setUpdating(true);
      const response = await api.post(`/Interestforjoin/add-call-record/${personId}`, {
        ...callData,
        date: new Date().toISOString(),
      });
      
      if (response.data.success) {
        toast.success('Call recorded successfully');
        setShowCallModal(false);
        setCallData({ type: 'outgoing', duration: '', summary: '', followUp: '' });
        fetchPersons(currentPage);
      } else {
        toast.error('Failed to record call');
      }
    } catch (error) {
      console.error('Error recording call:', error);
      toast.error(error.response?.data?.message || 'Error recording call');
    } finally {
      setUpdating(false);
    }
  };

  // Add note
  const addNote = async (personId) => {
    if (!noteText.trim()) {
      toast.error('Please enter a note');
      return;
    }

    try {
      setUpdating(true);
      const response = await api.post(`/Interestforjoin/add-note/${personId}`, {
        content: noteText,
        date: new Date().toISOString(),
        author: 'Admin',
      });
      
      if (response.data.success) {
        toast.success('Note added successfully');
        setShowNoteModal(false);
        setNoteText('');
        fetchPersons(currentPage);
      } else {
        toast.error('Failed to add note');
      }
    } catch (error) {
      console.error('Error adding note:', error);
      toast.error(error.response?.data?.message || 'Error adding note');
    } finally {
      setUpdating(false);
    }
  };

  // Convert to member
  const convertToMember = async (personId) => {
    if (confirm('Convert this person to a full member? They will be marked as converted.')) {
      try {
        setUpdating(true);
        const response = await api.post(`/Interestforjoin/convert/${personId}`, {
          convertedDate: new Date().toISOString(),
        });
        
        if (response.data.success) {
          toast.success('Successfully converted to member!');
          fetchPersons(currentPage);
          if (selectedPerson?.id === personId) {
            setSelectedPerson({ 
              ...selectedPerson, 
              status: 'converted', 
              convertedToMember: new Date().toISOString().split('T')[0] 
            });
          }
        } else {
          toast.error('Failed to convert to member');
        }
      } catch (error) {
        console.error('Error converting:', error);
        toast.error(error.response?.data?.message || 'Error converting to member');
      } finally {
        setUpdating(false);
      }
    }
  };

  // Delete person
  const deletePerson = async (personId) => {
    if (confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
      try {
        setUpdating(true);
        const response = await api.delete(`/Interestforjoin/delete/${personId}`);
        
        if (response.data.success) {
          toast.success('Entry deleted successfully');
          fetchPersons(currentPage);
          if (selectedPerson?.id === personId) {
            setShowDetailModal(false);
            setSelectedPerson(null);
          }
        } else {
          toast.error('Failed to delete entry');
        }
      } catch (error) {
        console.error('Error deleting:', error);
        toast.error(error.response?.data?.message || 'Error deleting entry');
      } finally {
        setUpdating(false);
      }
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Location', 'Occupation', 'Education', 'Status', 'Call History', 'Notes', 'Submitted Date', 'Converted Date'];
    const csvData = interestedPeople.map(person => [
      person.fullName,
      person.email,
      person.phone,
      person.location,
      person.occupation,
      person.education,
      person.status,
      person.callHistory?.length || 0,
      person.notes?.length || 0,
      new Date(person.submittedAt).toLocaleDateString(),
      person.convertedToMember || '',
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interested-members-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Export successful!');
  };

  const refreshData = () => {
    fetchPersons(currentPage);
  };

  // Filter and search
  const filteredPeople = interestedPeople.filter(person => {
    const matchesStatus = filterStatus === 'all' || person.status === filterStatus;
    const matchesSearch = person.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.occupation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.phone?.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'contacted': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'ongoing': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'converted': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'not-interested': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'new': return <UserPlus className="w-3 h-3" />;
      case 'contacted': return <PhoneCall className="w-3 h-3" />;
      case 'ongoing': return <MessageCircle className="w-3 h-3" />;
      case 'converted': return <CheckCircle className="w-3 h-3" />;
      case 'not-interested': return <X className="w-3 h-3" />;
      default: return null;
    }
  };

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Toaster position="top-right" />
      
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-reverse"></div>
      </div>

      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Interest Management
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track interested people</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border-l-4 border-emerald-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Total</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">New</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.new}</p>
                </div>
                <UserPlus className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Contacted</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.contacted}</p>
                </div>
                <PhoneCall className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border-l-4 border-amber-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Ongoing</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.ongoing}</p>
                </div>
                <MessageCircle className="w-8 h-8 text-amber-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border-l-4 border-emerald-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Converted</p>
                  <p className="text-2xl font-bold text-emerald-600">{stats.converted}</p>
                </div>
                <UserCheck className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Not Interested</p>
                  <p className="text-2xl font-bold text-red-600">{stats.notInterested}</p>
                </div>
                <X className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-md">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="converted">Converted</option>
                  <option value="not-interested">Not Interested</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name & Occupation</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Submitted</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredPeople.map((person) => (
                        <tr key={person.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-800 dark:text-white">{person.fullName}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                              <Briefcase className="w-3 h-3" />
                              {person.occupation}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {person.email}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" />
                              {person.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {person.location}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(person.status)}`}>
                              {getStatusIcon(person.status)}
                              {person.status.charAt(0).toUpperCase() + person.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {new Date(person.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setSelectedPerson(person);
                                  setShowDetailModal(true);
                                }}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedPerson(person);
                                  setShowCallModal(true);
                                }}
                                className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition"
                                title="Add Call"
                              >
                                <PhoneCall className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedPerson(person);
                                  setShowNoteModal(true);
                                }}
                                className="p-1.5 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition"
                                title="Add Note"
                              >
                                <FileText className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => convertToMember(person.id)}
                                disabled={person.status === 'converted'}
                                className={`p-1.5 rounded-lg transition ${
                                  person.status === 'converted'
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                                }`}
                                title="Convert to Member"
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deletePerson(person.id)}
                                className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredPeople.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">No entries found</p>
                  </div>
                )}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Call Modal */}
      {showCallModal && selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <button
              onClick={() => setShowCallModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-emerald-500" />
              Log Call - {selectedPerson.fullName}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Call Type</label>
                <select
                  value={callData.type}
                  onChange={(e) => setCallData({...callData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                >
                  <option value="outgoing">Outgoing</option>
                  <option value="incoming">Incoming</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (minutes)</label>
                <input
                  type="text"
                  value={callData.duration}
                  onChange={(e) => setCallData({...callData, duration: e.target.value})}
                  placeholder="e.g., 15 min"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Call Summary</label>
                <textarea
                  value={callData.summary}
                  onChange={(e) => setCallData({...callData, summary: e.target.value})}
                  placeholder="What was discussed?"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Follow-up Action</label>
                <input
                  type="text"
                  value={callData.followUp}
                  onChange={(e) => setCallData({...callData, followUp: e.target.value})}
                  placeholder="Next steps..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => addCallRecord(selectedPerson.id)}
                  disabled={updating}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition disabled:opacity-50"
                >
                  {updating ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Save Call'}
                </button>
                <button
                  onClick={() => setShowCallModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Note Modal */}
      {showNoteModal && selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <button
              onClick={() => setShowNoteModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" />
              Add Note - {selectedPerson.fullName}
            </h3>
            
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Enter your notes here..."
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 mb-4"
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => addNote(selectedPerson.id)}
                disabled={updating}
                className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition disabled:opacity-50"
              >
                {updating ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Save Note'}
              </button>
              <button
                onClick={() => setShowNoteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowDetailModal(false)}
              className="sticky top-4 float-right z-10 p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 transition m-4"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 pt-0">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6 mt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedPerson.fullName}</h2>
                  <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {selectedPerson.occupation} | {selectedPerson.education}
                  </p>
                </div>
                <div>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPerson.status)}`}>
                    {getStatusIcon(selectedPerson.status)}
                    {selectedPerson.status.charAt(0).toUpperCase() + selectedPerson.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Status Update Buttons */}
              <div className="flex flex-wrap gap-2 mb-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <button
                  onClick={() => updatePersonStatus(selectedPerson.id, 'new')}
                  className={`px-3 py-1 rounded-lg text-sm transition ${selectedPerson.status === 'new' ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300'}`}
                >
                  New
                </button>
                <button
                  onClick={() => updatePersonStatus(selectedPerson.id, 'contacted')}
                  className={`px-3 py-1 rounded-lg text-sm transition ${selectedPerson.status === 'contacted' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300'}`}
                >
                  Contacted
                </button>
                <button
                  onClick={() => updatePersonStatus(selectedPerson.id, 'ongoing')}
                  className={`px-3 py-1 rounded-lg text-sm transition ${selectedPerson.status === 'ongoing' ? 'bg-amber-500 text-white' : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300'}`}
                >
                  Ongoing
                </button>
                <button
                  onClick={() => convertToMember(selectedPerson.id)}
                  className={`px-3 py-1 rounded-lg text-sm transition ${selectedPerson.status === 'converted' ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300'}`}
                >
                  Converted
                </button>
                <button
                  onClick={() => updatePersonStatus(selectedPerson.id, 'not-interested')}
                  className={`px-3 py-1 rounded-lg text-sm transition ${selectedPerson.status === 'not-interested' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300'}`}
                >
                  Not Interested
                </button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email
                  </label>
                  <p className="text-gray-800 dark:text-white mt-1">{selectedPerson.email}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Phone
                  </label>
                  <p className="text-gray-800 dark:text-white mt-1">{selectedPerson.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Permanent Address
                  </label>
                  <p className="text-gray-800 dark:text-white mt-1">{selectedPerson.permanentAddress || 'Not provided'}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Temporary Address
                  </label>
                  <p className="text-gray-800 dark:text-white mt-1">{selectedPerson.temporaryAddress || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase">Education</label>
                  <p className="text-gray-800 dark:text-white mt-1">{selectedPerson.education}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase">Submitted</label>
                  <p className="text-gray-800 dark:text-white mt-1">
                    {new Date(selectedPerson.submittedAt).toLocaleString()}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" /> Questions/Message
                  </label>
                  <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300">{selectedPerson.message || 'No message provided'}</p>
                  </div>
                </div>
              </div>

              {/* Call History */}
              {selectedPerson.callHistory && selectedPerson.callHistory.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-emerald-500" />
                    Call History ({selectedPerson.callHistory.length})
                  </h4>
                  <div className="space-y-3">
                    {selectedPerson.callHistory.map((call, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            {call.type === 'outgoing' ? 
                              <PhoneOutgoing className="w-4 h-4 text-blue-500" /> : 
                              <PhoneIncoming className="w-4 h-4 text-green-500" />
                            }
                            <span className="font-medium text-gray-800 dark:text-white">
                              {call.type === 'outgoing' ? 'Outgoing' : 'Incoming'} Call
                            </span>
                            <span className="text-xs text-gray-500">{call.duration}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(call.date).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{call.summary}</p>
                        {call.followUp && (
                          <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">
                            Follow-up: {call.followUp}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedPerson.notes && selectedPerson.notes.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-500" />
                    Notes ({selectedPerson.notes.length})
                  </h4>
                  <div className="space-y-3">
                    {selectedPerson.notes.map((note, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-medium text-purple-600">Added by {note.author || 'Admin'}</span>
                          <span className="text-xs text-gray-500">{new Date(note.date).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setShowCallModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  Log Call
                </button>
                <button
                  onClick={() => {
                    setShowNoteModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Add Note
                </button>
                {selectedPerson.status !== 'converted' && (
                  <button
                    onClick={() => convertToMember(selectedPerson.id)}
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    Convert to Member
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminInterestManagement;