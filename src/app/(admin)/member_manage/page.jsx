"use client";

import api from '@/config/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────
const MEMBER_TYPE_META = {
  patron:   { label: 'Patron',          badge: 'bg-purple-100 text-purple-800' },
  donor:    { label: 'Donor',           badge: 'bg-green-100 text-green-800'   },
  founding: { label: 'Founding Member', badge: 'bg-yellow-100 text-yellow-800' },
  managing: { label: 'Managing Member', badge: 'bg-blue-100 text-blue-800'     },
  general:  { label: 'General Member',  badge: 'bg-gray-100 text-gray-800'     },
};

const MANAGING_POSITIONS = [
  { value: 'Convener',                   label: 'Convener'                   },
  { value: 'Chief Coordinator',          label: 'Chief Coordinator'          },
  { value: 'Assistant Chief Coordinator',label: 'Assistant Chief Coordinator'},
  { value: 'Member',                     label: 'Member'                     },
];

const EMPTY_FORM = {
  memberType: 'general',
  position: '',
  serial_num: '',
  phone: '',
  address: { city: '', state: '', country: 'Bangladesh' },
};

// ─── Component ────────────────────────────────────────────────────────────────
const MemberManagementPage = () => {
  const queryClient = useQueryClient();

  // Which user row triggered the modal
  const [selectedUser, setSelectedUser] = useState(null);
  // Which existing Member record is being edited (null → create new)
  const [editingRecord, setEditingRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState(EMPTY_FORM);

  // ── Fetch users (enriched with memberRecords array) ──────────────────────
  const { data: users, isLoading, isError, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await api.get('/auth/all_users');
      return res.data.data;
    },
  });

  // ── Mutations ─────────────────────────────────────────────────────────────
  const createMemberMutation = useMutation({
    mutationFn: async (memberData) => {
      const res = await api.post('/member', memberData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      closeModal();
    },
    onError: (err) => alert(err.response?.data?.message || 'Error creating member'),
  });

  const updateMemberMutation = useMutation({
    mutationFn: async ({ id, memberData }) => {
      const res = await api.put(`/member/${id}`, memberData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      closeModal();
    },
    onError: (err) => alert(err.response?.data?.message || 'Error updating member'),
  });

  const deleteMemberMutation = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/member/${id}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    onError: (err) => alert(err.response?.data?.message || 'Error removing role'),
  });

  // ── Helpers ───────────────────────────────────────────────────────────────
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setEditingRecord(null);
    setFormData(EMPTY_FORM);
  };

  /** Fetch next available serial number for selected memberType */
  const fetchNextSerial = async (type) => {
    try {
      const res = await api.get(`/member/next-serial/${type}`);
      if (res.data?.success && res.data.data?.nextSerial) {
        setFormData((prev) => ({ ...prev, serial_num: res.data.data.nextSerial }));
      }
    } catch (e) {
      console.error("Could not fetch next serial:", e);
    }
  };

  /** Open modal to ADD a new role for a user */
  const openAddRole = (user) => {
    setSelectedUser(user);
    setEditingRecord(null);
    setFormData({
      ...EMPTY_FORM,
      phone:   user.phone || '',
      address: {
        city:    user.presentAddress?.city    || '',
        state:   user.presentAddress?.state   || '',
        country: user.presentAddress?.country || 'Bangladesh',
      },
    });
    setShowModal(true);
    fetchNextSerial('general');
  };

  /** Open modal to EDIT an existing Member record */
  const openEditRole = (user, record) => {
    setSelectedUser(user);
    setEditingRecord(record);
    setFormData({
      memberType: record.memberType,
      position:   record.position || '',
      serial_num: record.serial_num,
      phone:      record.phone,
      address: {
        city:    record.address?.city    || '',
        state:   record.address?.state   || '',
        country: record.address?.country || 'Bangladesh',
      },
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === 'memberType' && !editingRecord) {
        fetchNextSerial(value);
      }
    }
  };

  const handleSubmit = () => {
    if (!selectedUser) return;

    if (!formData.serial_num) { alert('Please enter a serial number'); return; }
    if (!formData.phone)       { alert('Please enter a phone number');  return; }
    if (formData.memberType === 'managing' && !formData.position) {
      alert('Position is required for managing members');
      return;
    }

    const memberData = {
      memberType:  formData.memberType,
      serial_num:  parseInt(formData.serial_num),
      phone:       formData.phone,
      address: {
        city:    formData.address.city    || selectedUser.presentAddress?.city    || '',
        state:   formData.address.state   || selectedUser.presentAddress?.state   || '',
        country: formData.address.country || 'Bangladesh',
      },
      name:     selectedUser.name,
      email:    selectedUser.email,
      image:    selectedUser.profileImage || selectedUser.image || '',
      userId:   selectedUser.id,
      memberId: selectedUser.memberId || `RPC-${selectedUser.id}`,
      ...(formData.memberType === 'managing' && { position: formData.position }),
    };

    if (editingRecord) {
      updateMemberMutation.mutate({ id: editingRecord._id, memberData });
    } else {
      createMemberMutation.mutate(memberData);
    }
  };

  const handleDeleteRole = (recordId) => {
    if (!confirm('Remove this member role from the user?')) return;
    deleteMemberMutation.mutate(recordId);
  };

  // ── Filtering ─────────────────────────────────────────────────────────────
  const filteredUsers = users?.filter((user) => {
    const q = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(q)   ||
      user.email?.toLowerCase().includes(q)  ||
      user.memberId?.toLowerCase().includes(q)
    );
  });

  const isPending =
    createMemberMutation.isPending || updateMemberMutation.isPending;

  // ── UI states ─────────────────────────────────────────────────────────────
  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>
  );

  if (isError) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p>Error loading data. Please try again.</p>
      <button onClick={refetch} className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Retry
      </button>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Member Management</h1>
      <p className="text-gray-600 mb-8">
        Assign and manage club member roles — a user can hold multiple roles simultaneously.
      </p>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md bg-white
                       placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                       focus:border-blue-500 sm:text-sm"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {filteredUsers?.length || 0} user{filteredUsers?.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member Roles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers?.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id || user.id} className="hover:bg-gray-50">
                    {/* Name + avatar */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {(user.profileImage || user.image) && (
                          <img src={user.profileImage || user.image} alt={user.name}
                            className="h-8 w-8 rounded-full object-cover" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-400">{user.memberId || '—'}</div>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>

                    {/* All member roles as editable badges */}
                    <td className="px-6 py-4">
                      {user.memberRecords?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {user.memberRecords.map((rec) => (
                            <span key={rec._id}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold
                                          ${MEMBER_TYPE_META[rec.memberType]?.badge || 'bg-gray-100 text-gray-700'}`}>
                              <span>{MEMBER_TYPE_META[rec.memberType]?.label || rec.memberType}</span>
                              {rec.position && <span className="opacity-80">· {rec.position}</span>}
                              <span className="bg-black/10 dark:bg-white/10 px-1.5 py-0.2 rounded font-mono font-bold text-[11px]">
                                #{rec.serial_num}
                              </span>
                              {/* Edit icon */}
                              <button
                                title="Edit this role"
                                onClick={() => openEditRole(user, rec)}
                                className="ml-1 hover:opacity-70 transition cursor-pointer">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5
                                       m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              {/* Remove icon */}
                              <button
                                title="Remove this role"
                                onClick={() => handleDeleteRole(rec._id)}
                                className="ml-0.5 hover:opacity-70 transition text-red-500 cursor-pointer">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No roles assigned</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => openAddRole(user)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md
                                   bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M12 4v16m8-8H4" />
                        </svg>
                        Add Role
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              {editingRecord ? 'Edit' : 'Add'} Member Role for{' '}
              <span className="text-blue-700">{selectedUser.name}</span>
            </h3>

            {/* User info */}
            <div className="bg-gray-50 p-4 rounded-md mb-4 space-y-1 text-sm text-gray-600">
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>User ID:</strong> {selectedUser.id}</p>
              {selectedUser.memberRecords?.length > 0 && (
                <p><strong>Current roles:</strong>{' '}
                  {selectedUser.memberRecords.map((r) =>
                    MEMBER_TYPE_META[r.memberType]?.label || r.memberType
                  ).join(', ')}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {/* Member Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Member Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="memberType"
                  value={formData.memberType}
                  onChange={handleInputChange}
                  disabled={!!editingRecord}   // can't change type on edit — create a new role instead
                  className="w-full px-3 py-2 border border-gray-300 rounded-md
                             focus:outline-none focus:ring-2 focus:ring-blue-500
                             disabled:bg-gray-100 disabled:cursor-not-allowed">
                  {Object.entries(MEMBER_TYPE_META).map(([val, { label }]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
                {editingRecord && (
                  <p className="text-xs text-gray-400 mt-1">
                    To change the type, remove this role and add a new one.
                  </p>
                )}
              </div>

              {/* Position — only for managing */}
              {formData.memberType === 'managing' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md
                               focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Position</option>
                    {MANAGING_POSITIONS.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Serial Number */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Serial Number <span className="text-red-500">*</span>
                  </label>
                  {!editingRecord && (
                    <button
                      type="button"
                      onClick={() => fetchNextSerial(formData.memberType)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer underline"
                    >
                      Auto-fill Next Available Serial
                    </button>
                  )}
                </div>
                <input
                  type="number"
                  name="serial_num"
                  value={formData.serial_num}
                  onChange={handleInputChange}
                  placeholder="Unique within the selected member type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md
                             focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <p className="text-xs text-gray-500 mt-1">
                  Must be unique for {MEMBER_TYPE_META[formData.memberType]?.label || formData.memberType} (different member types have independent serial numbers).
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md
                             focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              {/* Address */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Address</h4>
                {[
                  { name: 'address.city',    label: 'City'    },
                  { name: 'address.state',   label: 'State'   },
                  { name: 'address.country', label: 'Country' },
                ].map(({ name, label }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      type="text"
                      name={name}
                      value={formData.address[name.split('.')[1]]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md
                                 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                ))}
              </div>

              {/* Info banner */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-sm text-blue-700">
                {{
                  managing: 'Managing members require a position (Convener, Chief Coordinator, etc.).',
                  founding: 'Founding members do not require a position.',
                  patron:   'Patrons are distinguished supporters of the club.',
                  donor:    'Donors have contributed financially to the club.',
                  general:  'General members have standard club access.',
                }[formData.memberType]}
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className={`px-4 py-2 rounded-md text-white disabled:opacity-50
                  ${{
                    patron:   'bg-purple-600 hover:bg-purple-700',
                    donor:    'bg-green-600 hover:bg-green-700',
                    founding: 'bg-yellow-600 hover:bg-yellow-700',
                    managing: 'bg-blue-600 hover:bg-blue-700',
                    general:  'bg-gray-600 hover:bg-gray-700',
                  }[formData.memberType]}`}>
                {isPending ? 'Processing…' : editingRecord ? 'Update Role' : 'Assign Role'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagementPage;