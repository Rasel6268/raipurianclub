"use client";

import api from '@/config/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

const MemberManagementPage = () => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    memberType: 'general',
    position: '',
    serial_num: '',
    phone: '',
    address: {
      city: '',
      state: '',
      country: 'Bangladesh'
    }
  });

  // Fetch users
  const { data: users, isLoading, isError, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/auth/all_users");
      return res.data.data;
    }
  });

  // Create member mutation
  const createMemberMutation = useMutation({
    mutationFn: async (memberData) => {
      const res = await api.post("/member", memberData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setShowRoleModal(false);
      setSelectedUser(null);
      resetForm();
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Error creating member");
    }
  });

  // Update member mutation
  const updateMemberMutation = useMutation({
    mutationFn: async ({ id, memberData }) => {
      const res = await api.put(`/member/${id}`, memberData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setShowRoleModal(false);
      setSelectedUser(null);
      resetForm();
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Error updating member");
    }
  });

  const resetForm = () => {
    setFormData({
      memberType: 'general',
      position: '',
      serial_num: '',
      phone: '',
      address: {
        city: '',
        state: '',
        country: 'Bangladesh'
      }
    });
  };

  const handleRoleChange = (user) => {
    setSelectedUser(user);
    setFormData({
      memberType: user.memberType || 'general',
      position: user.position || '',
      serial_num: user.serial_num || '',
      phone: user.phone || '',
      address: {
        city: user.address?.city || user.presentAddress?.city || '',
        state: user.address?.state || user.presentAddress?.state || '',
        country: user.address?.country || 'Bangladesh'
      }
    });
    setShowRoleModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = () => {
    if (!selectedUser) return;

    // Validation
    if (!formData.serial_num) {
      alert('Please enter a serial number');
      return;
    }

    if (!formData.phone) {
      alert('Please enter a phone number');
      return;
    }

    // Position validation - ONLY for managing members (YOUR ORIGINAL LOGIC)
    if (formData.memberType === 'managing' && !formData.position) {
      alert('Position is required for managing members');
      return;
    }

    const memberData = {
      memberType: formData.memberType,
      serial_num: parseInt(formData.serial_num),
      phone: formData.phone,
      address: {
        city: formData.address.city || selectedUser.presentAddress?.city || '',
        state: formData.address.state || selectedUser.presentAddress?.state || '',
        country: formData.address.country || 'Bangladesh'
      },
      name: selectedUser.name,
      email: selectedUser.email,
      image: selectedUser.profileImage || selectedUser.image,
      userId: selectedUser.id,
      memberId: selectedUser.memberId || `MEM-${Date.now()}`,
    };

    // Only add position if member is managing (YOUR ORIGINAL LOGIC)
    if (formData.memberType === 'managing') {
      memberData.position = formData.position;
    }

    if (selectedUser._id) {
      // Update existing member
      updateMemberMutation.mutate({
        id: selectedUser._id,
        memberData
      });
    } else {
      // Create new member
      createMemberMutation.mutate(memberData);
    }
  };

  const getManagingPositions = () => {
    return [
      { value: "Convener", label: "Convener" },
      { value: "Chief Coordinator", label: "Chief Coordinator" },
      { value: "Assistant Chief Coordinator", label: "Assistant Chief Coordinator" },
      { value: "Member", label: "Member" }
    ];
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const getMemberTypeBadge = (type) => {
    const badges = {
      patron: 'bg-purple-100 text-purple-800',
      donor: 'bg-green-100 text-green-800',
      founding: 'bg-yellow-100 text-yellow-800',
      managing: 'bg-blue-100 text-blue-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return badges[type] || badges.general;
  };

  const getMemberTypeLabel = (type) => {
    const labels = {
      patron: 'Patron',
      donor: 'Donor',
      founding: 'Founding Member',
      managing: 'Managing Member',
      general: 'General Member'
    };
    return labels[type] || type;
  };

  // Filter users based on search term
  const filteredUsers = users?.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.memberId?.toLowerCase().includes(searchLower) ||
      user.id?.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error loading data. Please try again later.</p>
        <button 
          onClick={() => refetch()} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Member Management</h1>
      <p className="text-gray-600 mb-8">Assign and manage club member roles and positions</p>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {searchTerm && (
            <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <span>Total {filteredUsers?.length || 0} user{filteredUsers?.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers?.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {(user.profileImage || user.image) && (
                          <img 
                            src={user.profileImage || user.image} 
                            alt={user.name} 
                            className="h-8 w-8 rounded-full mr-3 object-cover" 
                          />
                        )}
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getMemberTypeBadge(user.memberType || 'general')}`}>
                        {getMemberTypeLabel(user.memberType || 'general')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {user.memberType === 'managing' ? (user.position || '-') : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.serial_num || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleRoleChange(user)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        {user.memberType ? 'Update Role' : 'Set Member Role'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-2">No users found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Role Assignment Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {selectedUser.memberType ? 'Update' : 'Set'} Member Role for {selectedUser.name}
              </h3>
              
              <div className="mb-4">
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <p className="text-sm text-gray-600"><strong>Email:</strong> {selectedUser.email}</p>
                  <p className="text-sm text-gray-600 mt-1"><strong>User ID:</strong> {selectedUser.id}</p>
                  {selectedUser.memberId && (
                    <p className="text-sm text-gray-600 mt-1"><strong>Member ID:</strong> {selectedUser.memberId}</p>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Member Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="memberType"
                      value={formData.memberType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="general">General Member</option>
                      <option value="patron">Patron</option>
                      <option value="donor">Donor</option>
                      <option value="founding">Founding Member</option>
                      <option value="managing">Managing Member</option>
                    </select>
                  </div>

                  {/* Position - ONLY for Managing Members (YOUR ORIGINAL LOGIC) */}
                  {formData.memberType === 'managing' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Position</option>
                        {getManagingPositions().map(pos => (
                          <option key={pos.value} value={pos.value}>{pos.label}</option>
                        ))}
                      </select>
                      <p className="text-xs text-blue-600 mt-1">
                        Note: Position is only available for managing members
                      </p>
                    </div>
                  )}

                  {/* Serial Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Serial Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="serial_num"
                      value={formData.serial_num}
                      onChange={handleInputChange}
                      placeholder="Enter serial number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be unique for each member type</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-3">
                    <h4 className="text-md font-medium text-gray-700">Address</h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleInputChange}
                        placeholder={selectedUser.presentAddress?.city || "Enter city"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleInputChange}
                        placeholder={selectedUser.presentAddress?.state || "Enter state"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <input
                        type="text"
                        name="address.country"
                        value={formData.address.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Information Message */}
                <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4">
                  <div className="flex">
                    <div className="shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        {formData.memberType === 'managing' && 'Managing members require a position (Convener, Chief Coordinator, Assistant Chief Coordinator, or Member).'}
                        {formData.memberType === 'founding' && 'Founding members do not require a position.'}
                        {formData.memberType === 'patron' && 'Patrons are distinguished supporters of the club.'}
                        {formData.memberType === 'donor' && 'Donors have contributed financially to the club.'}
                        {formData.memberType === 'general' && 'General members have standard club access.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowRoleModal(false);
                    setSelectedUser(null);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={createMemberMutation.isPending || updateMemberMutation.isPending}
                  className={`px-4 py-2 rounded-md text-white ${
                    formData.memberType === 'patron' ? 'bg-purple-600 hover:bg-purple-700' :
                    formData.memberType === 'donor' ? 'bg-green-600 hover:bg-green-700' :
                    formData.memberType === 'founding' ? 'bg-yellow-600 hover:bg-yellow-700' :
                    formData.memberType === 'managing' ? 'bg-blue-600 hover:bg-blue-700' :
                    'bg-gray-600 hover:bg-gray-700'
                  } disabled:opacity-50`}
                >
                  {createMemberMutation.isPending || updateMemberMutation.isPending 
                    ? 'Processing...' 
                    : (selectedUser.memberType ? 'Update Role' : 'Assign Member Role')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagementPage;