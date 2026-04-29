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
  Shield,
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
  Crown,
  Gift,
  Globe,
  BookOpen,
  Code,
  Palette,
  Music,
} from 'lucide-react';

const AdminInterestManagement = () => {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Admin state
  const [interestedPeople, setInterestedPeople] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    contacted: 0,
    converted: 0,
  });

  // Load data from localStorage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    const stored = localStorage.getItem('interestedMembers');
    if (stored) {
      const data = JSON.parse(stored);
      setInterestedPeople(data);
      updateStats(data);
    } else {
      // Sample demo data
      const demoData = [
        {
          id: 1,
          fullName: "Amit Sharma",
          email: "amit.sharma@example.com",
          phone: "+91 98765 43210",
          location: "Mumbai, India",
          occupation: "Software Engineer",
          interests: ["Technology", "Networking", "Workshops"],
          hearAbout: "Social Media",
          message: "Very interested in joining! Would love to contribute to tech events.",
          preferredRole: "Technical Lead",
          availability: "Weekends",
          status: "pending",
          submittedAt: "2024-12-01T10:30:00",
          notes: "",
          convertedToMember: null,
        },
        {
          id: 2,
          fullName: "Priya Patel",
          email: "priya.patel@example.com",
          phone: "+91 98765 43211",
          location: "Delhi, India",
          occupation: "Marketing Manager",
          interests: ["Events", "Marketing", "Community Building"],
          hearAbout: "Friend Referral",
          message: "I love hosting events and want to bring my skills to this community.",
          preferredRole: "Event Coordinator",
          availability: "Evenings",
          status: "contacted",
          submittedAt: "2024-12-02T14:20:00",
          notes: "Followed up via email, interested in next event",
          convertedToMember: null,
        },
        {
          id: 3,
          fullName: "Rahul Verma",
          email: "rahul.verma@example.com",
          phone: "+91 98765 43212",
          location: "Bangalore, India",
          occupation: "Product Designer",
          interests: ["Design", "Creative", "Art"],
          hearAbout: "Instagram",
          message: "Would love to help with design and branding for the club.",
          preferredRole: "Creative Director",
          availability: "Flexible",
          status: "pending",
          submittedAt: "2024-12-03T09:15:00",
          notes: "",
          convertedToMember: null,
        },
        {
          id: 4,
          fullName: "Neha Gupta",
          email: "neha.gupta@example.com",
          phone: "+91 98765 43213",
          location: "Pune, India",
          occupation: "Student",
          interests: ["Learning", "Workshops", "Mentorship"],
          hearAbout: "College Notice",
          message: "Eager to learn and grow with like-minded people.",
          preferredRole: "Volunteer",
          availability: "Weekends",
          status: "converted",
          submittedAt: "2024-11-28T16:45:00",
          notes: "Converted to member on Dec 5, 2024",
          convertedToMember: "2024-12-05",
        },
        {
          id: 5,
          fullName: "Vikram Singh",
          email: "vikram.singh@example.com",
          phone: "+91 98765 43214",
          location: "Jaipur, India",
          occupation: "Business Owner",
          interests: ["Networking", "Leadership", "Community"],
          hearAbout: "Google Search",
          message: "Looking to connect with like-minded entrepreneurs and grow together.",
          preferredRole: "Advisor",
          availability: "Weekends",
          status: "pending",
          submittedAt: "2024-12-04T11:00:00",
          notes: "",
          convertedToMember: null,
        },
        {
          id: 6,
          fullName: "Anjali Mehta",
          email: "anjali.mehta@example.com",
          phone: "+91 98765 43215",
          location: "Ahmedabad, India",
          occupation: "Teacher",
          interests: ["Learning", "Volunteering", "Workshops"],
          hearAbout: "Friend Referral",
          message: "Want to contribute to educational initiatives and help students.",
          preferredRole: "Mentor",
          availability: "Evenings",
          status: "contacted",
          submittedAt: "2024-12-02T09:30:00",
          notes: "Followed up on Dec 3, waiting for response",
          convertedToMember: null,
        },
      ];
      setInterestedPeople(demoData);
      localStorage.setItem('interestedMembers', JSON.stringify(demoData));
      updateStats(demoData);
    }
    setIsLoading(false);
  };

  const updateStats = (data) => {
    setStats({
      total: data.length,
      pending: data.filter(p => p.status === 'pending').length,
      contacted: data.filter(p => p.status === 'contacted').length,
      converted: data.filter(p => p.status === 'converted').length,
    });
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem('interestedMembers', JSON.stringify(data));
    setInterestedPeople(data);
    updateStats(data);
  };


  const updatePersonStatus = (personId, newStatus) => {
    const updated = interestedPeople.map(person =>
      person.id === personId ? { ...person, status: newStatus } : person
    );
    saveToLocalStorage(updated);
    if (selectedPerson?.id === personId) {
      setSelectedPerson({ ...selectedPerson, status: newStatus });
    }
  };

  const updatePersonNotes = (personId, notes) => {
    const updated = interestedPeople.map(person =>
      person.id === personId ? { ...person, notes } : person
    );
    saveToLocalStorage(updated);
    if (selectedPerson?.id === personId) {
      setSelectedPerson({ ...selectedPerson, notes });
    }
  };

  const convertToMember = (personId) => {
    if (confirm('Convert this person to a full member? They will be marked as converted.')) {
      const updated = interestedPeople.map(person =>
        person.id === personId 
          ? { ...person, status: 'converted', convertedToMember: new Date().toISOString().split('T')[0] } 
          : person
      );
      saveToLocalStorage(updated);
      if (selectedPerson?.id === personId) {
        setSelectedPerson({ ...selectedPerson, status: 'converted', convertedToMember: new Date().toISOString().split('T')[0] });
      }
    }
  };

  const deletePerson = (personId) => {
    if (confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
      const updated = interestedPeople.filter(person => person.id !== personId);
      saveToLocalStorage(updated);
      if (selectedPerson?.id === personId) {
        setShowDetailModal(false);
        setSelectedPerson(null);
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Location', 'Occupation', 'Interests', 'Preferred Role', 'Availability', 'Status', 'Submitted Date', 'Notes'];
    const csvData = interestedPeople.map(person => [
      person.fullName,
      person.email,
      person.phone,
      person.location,
      person.occupation,
      person.interests.join(', '),
      person.preferredRole || 'Not specified',
      person.availability || 'Not specified',
      person.status,
      new Date(person.submittedAt).toLocaleDateString(),
      person.notes || '',
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interested-members-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const refreshData = () => {
    loadData();
  };

  // Filter and search
  const filteredPeople = interestedPeople.filter(person => {
    const matchesStatus = filterStatus === 'all' || person.status === filterStatus;
    const matchesSearch = person.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.occupation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'contacted': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'converted': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'contacted': return <MessageCircle className="w-3 h-3" />;
      case 'converted': return <CheckCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'pending': return 'border-amber-200 bg-amber-50 dark:bg-amber-900/20';
      case 'contacted': return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20';
      case 'converted': return 'border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20';
      default: return '';
    }
  };



  // Admin Dashboard
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              <p className="text-gray-500 dark:text-gray-400 mt-1">Manage people interested in future membership</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={refreshData}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <RefreshCw className="w-4 h-4" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-emerald-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Total Interested</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-emerald-600">Potential future members</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-amber-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Pending Review</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-amber-600">Need attention</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Contacted</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.contacted}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-600">Follow-up ongoing</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-emerald-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Converted</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.converted}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-emerald-600">Now members!</div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-md">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, location, or occupation..."
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
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Interests</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Preferred Role</th>
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
                              {person.phone || 'Not provided'}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {person.location}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {person.interests.slice(0, 2).map((interest, idx) => (
                                <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                                  {interest}
                                </span>
                              ))}
                              {person.interests.length > 2 && (
                                <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                                  +{person.interests.length - 2}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {person.preferredRole || 'Not specified'}
                            </span>
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
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Total interested people: {interestedPeople.length} | Showing {filteredPeople.length} entries</p>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            <button
              onClick={() => setShowDetailModal(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedPerson.fullName}</h2>
                  <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {selectedPerson.occupation}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-3 rounded-lg border ${getStatusBadgeClass(selectedPerson.status)}`}>
                    <label className="text-xs text-gray-500 dark:text-gray-400 uppercase">Status</label>
                    <p className={`font-semibold flex items-center gap-1 mt-1 ${getStatusColor(selectedPerson.status)}`}>
                      {getStatusIcon(selectedPerson.status)}
                      {selectedPerson.status.charAt(0).toUpperCase() + selectedPerson.status.slice(1)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <label className="text-xs text-gray-500 dark:text-gray-400 uppercase">Submitted</label>
                    <p className="text-gray-800 dark:text-white mt-1">
                      {new Date(selectedPerson.submittedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                    <p className="text-gray-800 dark:text-white mt-1">{selectedPerson.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Location
                    </label>
                    <p className="text-gray-800 dark:text-white mt-1">{selectedPerson.location || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Availability
                    </label>
                    <p className="text-gray-800 dark:text-white mt-1">{selectedPerson.availability || 'Not specified'}</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                    <Award className="w-3 h-3" /> Preferred Role
                  </label>
                  <p className="text-gray-800 dark:text-white mt-1">{selectedPerson.preferredRole || 'Not specified'}</p>
                </div>

                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                    <Heart className="w-3 h-3" /> Interests
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedPerson.interests.map((interest, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-medium">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" /> How they heard about us
                  </label>
                  <p className="text-gray-800 dark:text-white mt-1">{selectedPerson.hearAbout || 'Not specified'}</p>
                </div>

                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                    <Star className="w-3 h-3" /> Message
                  </label>
                  <div className="mt-1 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      "{selectedPerson.message || 'No message provided'}"
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" /> Admin Notes
                  </label>
                  <textarea
                    value={selectedPerson.notes}
                    onChange={(e) => updatePersonNotes(selectedPerson.id, e.target.value)}
                    placeholder="Add notes about this potential member..."
                    className="w-full mt-1 p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900"
                    rows="3"
                  />
                </div>

                {selectedPerson.convertedToMember && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <label className="text-xs text-emerald-600 dark:text-emerald-400 uppercase">Converted to Member On</label>
                    <p className="text-emerald-700 dark:text-emerald-300 font-semibold mt-1">{selectedPerson.convertedToMember}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  {selectedPerson.status !== 'contacted' && (
                    <button
                      onClick={() => updatePersonStatus(selectedPerson.id, 'contacted')}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Mark as Contacted
                    </button>
                  )}
                  {selectedPerson.status !== 'converted' && (
                    <button
                      onClick={() => convertToMember(selectedPerson.id)}
                      className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                    >
                      Convert to Member
                    </button>
                  )}
                  {selectedPerson.status === 'pending' && (
                    <button
                      onClick={() => updatePersonStatus(selectedPerson.id, 'converted')}
                      className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                    >
                      Direct Convert
                    </button>
                  )}
                </div>
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminInterestManagement;