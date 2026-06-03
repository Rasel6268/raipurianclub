// app/admin/events/page.jsx
"use client";
import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Music,
  Laptop,
  Heart,
  Coffee,
  Gift,
  PartyPopper,
  Palette,
  Mountain,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  X,
  Save,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Ticket,
  Tag,
  Star,
  Image as ImageIcon,
  Loader,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import api from '@/config/api';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';

const ManageEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);


  // Event types configuration
  const eventTypes = [
    { id: 'music', name: 'Music Festival', icon: Music, color: 'from-rose-500 to-pink-500', bgColor: 'bg-rose-100 dark:bg-rose-900/30' },
    { id: 'tech', name: 'Tech Conference', icon: Laptop, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    { id: 'wellness', name: 'Wellness Retreat', icon: Heart, color: 'from-emerald-500 to-teal-500', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { id: 'food', name: 'Food & Wine', icon: Coffee, color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-100 dark:bg-amber-900/30' },
    { id: 'charity', name: 'Charity Gala', icon: Gift, color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
    { id: 'party', name: 'Party Bash', icon: PartyPopper, color: 'from-indigo-500 to-purple-500', bgColor: 'bg-indigo-100 dark:bg-indigo-900/30' },
    { id: 'art', name: 'Art Exhibition', icon: Palette, color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-100 dark:bg-pink-900/30' },
    { id: 'nature', name: 'Nature Camp', icon: Mountain, color: 'from-teal-500 to-emerald-500', bgColor: 'bg-teal-100 dark:bg-teal-900/30' }
  ];

  // Fetch all events
  useEffect(() => {
    fetchEvents();
  }, []);

  
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events');
      
      if (response.data.events) {
        setEvents(response.data.events.data);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };
  

  // Filter events based on search and type
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.eventType === selectedType;
    return matchesSearch && matchesType;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  // Get event type config
  const getEventTypeConfig = (typeId) => {
    return eventTypes.find(type => type.id === typeId) || eventTypes[0];
  };

  // Handle view event
  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setShowViewModal(true);
  };

  // Handle edit event
  const handleEditEvent = (event) => {
    setEditingEvent({ ...event });
    setShowEditModal(true);
  };

  // Handle update event
  const handleUpdateEvent = async () => {
    if (!editingEvent) return;
    
    try {
      const response = await api.put(`/events/${editingEvent._id}`, editingEvent);
      if (response.status === 200) {
        toast.success('Event updated successfully!');
        setShowEditModal(false);
        fetchEvents(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Failed to update event');
    }
  };

  // Handle delete event
  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    
    try {
      const response = await api.delete(`/events/${selectedEvent._id}`);
      if (response.status === 200) {
        toast.success('Event deleted successfully!');
        setShowDeleteModal(false);
        setSelectedEvent(null);
        fetchEvents(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get ticket availability badge
  const getTicketBadge = (availability) => {
    const badges = {
      available: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', label: 'Available' },
      limited: { color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', label: 'Limited Spots' },
      sold_out: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', label: 'Sold Out' },
      coming_soon: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', label: 'Coming Soon' }
    };
    return badges[availability] || badges.available;
  };

  // View Modal Component
  const ViewModal = () => {
    if (!selectedEvent) return null;
    const eventType = getEventTypeConfig(selectedEvent.eventType);
    const Icon = eventType.icon;
    const ticketBadge = getTicketBadge(selectedEvent.ticketAvailability);

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowViewModal(false)}>
        <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className={`bg-linear-to-r ${eventType.color} p-6 text-white relative`}>
            <button 
              onClick={() => setShowViewModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                <p className="text-white/80">{eventType.name}</p>
              </div>
            </div>
          </div>

          {/* Banner Image */}
          {selectedEvent.bannerImage && (
            <div className="relative h-64 overflow-hidden">
              <img src={selectedEvent.bannerImage} alt={selectedEvent.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Date & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Event Date</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{formatDate(selectedEvent.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <Clock className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Start Time</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {selectedEvent.targetDate ? new Date(selectedEvent.targetDate).toLocaleTimeString() : 'Time not set'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedEvent.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <Users className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Capacity</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {selectedEvent.capacity ? `${selectedEvent.capacity} people` : 'Unlimited'}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedEvent.description}</p>
            </div>

            {/* Ticket Information */}
            <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 p-4 rounded-xl">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ticket Price</p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedEvent.ticketPrice > 0 ? `BDT ${selectedEvent.ticketPrice}` : 'FREE'}
                  </p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${ticketBadge.color}`}>
                    {ticketBadge.label}
                  </span>
                </div>
                <button className={`px-6 py-2 bg-linear-to-r ${eventType.color} text-white rounded-lg font-semibold hover:shadow-lg transition`}>
                  {selectedEvent.buttonText || 'GET TICKETS'}
                </button>
              </div>
            </div>

            {/* Organizer */}
            {(selectedEvent.organizerName || selectedEvent.organizerEmail) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Organizer</h3>
                <div className="space-y-1">
                  {selectedEvent.organizerName && <p className="text-gray-700 dark:text-gray-300">{selectedEvent.organizerName}</p>}
                  {selectedEvent.organizerEmail && <p className="text-gray-500 dark:text-gray-400">{selectedEvent.organizerEmail}</p>}
                  {selectedEvent.organizerPhone && <p className="text-gray-500 dark:text-gray-400">{selectedEvent.organizerPhone}</p>}
                </div>
              </div>
            )}

            {/* Tags */}
            {selectedEvent.tags && selectedEvent.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Edit Modal Component
  const EditModal = () => {
    if (!editingEvent) return null;

    const handleEditChange = (e) => {
      const { name, value } = e.target;
      setEditingEvent(prev => ({ ...prev, [name]: value }));
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowEditModal(false)}>
        <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Event</h2>
            <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Title *</label>
              <input
                type="text"
                name="title"
                value={editingEvent.title || ''}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Date *</label>
                <input
                  type="date"
                  name="date"
                  value={editingEvent.date?.split('T')[0] || ''}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Time</label>
                <input
                  type="datetime-local"
                  name="targetDate"
                  value={editingEvent.targetDate || ''}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={editingEvent.location || ''}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description *</label>
              <textarea
                name="description"
                rows="4"
                value={editingEvent.description || ''}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Type</label>
                <select
                  name="eventType"
                  value={editingEvent.eventType || 'music'}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {eventTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ticket Price (BDT)</label>
                <input
                  type="number"
                  name="ticketPrice"
                  value={editingEvent.ticketPrice || 0}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={editingEvent.capacity || ''}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ticket Availability</label>
                <select
                  name="ticketAvailability"
                  value={editingEvent.ticketAvailability || 'available'}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="available">Available</option>
                  <option value="limited">Limited Spots</option>
                  <option value="sold_out">Sold Out</option>
                  <option value="coming_soon">Coming Soon</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateEvent}
                className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Delete Modal Component
  const DeleteModal = () => {
    if (!selectedEvent) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteModal(false)}>
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Event</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
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
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Event Card Component
  const EventCard = ({ event }) => {
    const eventType = getEventTypeConfig(event.eventType);
    const Icon = eventType.icon;
    const ticketBadge = getTicketBadge(event.ticketAvailability);

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
        {/* Banner Image */}
        <div className="relative h-40 overflow-hidden">
          {event.bannerImage ? (
            <img src={event.bannerImage} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className={`w-full h-full bg-linear-to-r ${eventType.color} flex items-center justify-center`}>
              <Icon className="w-12 h-12 text-white/50" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${ticketBadge.color}`}>
              {ticketBadge.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg line-clamp-1">{event.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-6 h-6 ${eventType.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{eventType.name}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              <Ticket className="w-4 h-4" />
              <span>{event.ticketPrice > 0 ? `BDT ${event.ticketPrice}` : 'FREE'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => handleViewEvent(event)}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition text-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              View
            </button>
            <button
              onClick={() => handleEditEvent(event)}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition text-sm"
            >
              <Edit className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              onClick={() => {
                setSelectedEvent(event);
                setShowDeleteModal(true);
              }}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition text-sm"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Events</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">View, edit, and manage all your events</p>
            </div>
            <Link href="/admin/events/add">
              <button className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
                <Plus className="w-4 h-4" />
                Add New Event
              </button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by title, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Type Filter */}
            <div className="sm:w-64 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              >
                <option value="all">All Types</option>
                {eventTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader className="w-8 h-8 text-emerald-500 animate-spin" />
          </div>
        ) : currentEvents.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No events found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || selectedType !== 'all' ? 'Try adjusting your filters' : 'Create your first event to get started'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentEvents.map(event => (
                <EventCard key={event._id} event={event} />
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
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg transition ${
                        currentPage === page
                          ? 'bg-emerald-500 text-white'
                          : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
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
        )}
      </div>

      {/* Modals */}
      {showViewModal && <ViewModal />}
      {showEditModal && <EditModal />}
      {showDeleteModal && <DeleteModal />}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ManageEventsPage;