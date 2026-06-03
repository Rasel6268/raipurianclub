// app/admin/events/add/page.jsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
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
  ArrowRight,
  Image as ImageIcon,
  X,
  Upload,
  Tag,
  Users,
  Star,
  PartyPopper,
  Wine,
  Gift,
  Flame,
  CloudMoon,
  Mountain,
  Microscope,
  Palette,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Save,
  Trash2
} from 'lucide-react';
import useImageUpload from '@/app/hooks/useImageUpload';
import api from '@/config/api';
import { toast } from 'react-hot-toast';

const AddEventPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    targetDate: '',
    description: '',
    location: '',
    eventType: 'music',
    buttonText: 'GET TICKETS',
    bannerImage: null,
    venueDetails: '',
    capacity: '',
    organizerName: '',
    organizerEmail: '',
    organizerPhone: '',
    ticketPrice: '',
    ticketAvailability: 'available',
    featuredSpeaker: '',
    agenda: '',
    socialLinks: {
      website: '',
      instagram: '',
      facebook: '',
      twitter: ''
    },
    tags: []
  });

  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const fileInputRef = useRef(null);
  const { imageHandler, loading: uploadingImage, uploadImages, setImages: setUploadImages } = useImageUpload();

  // Monitor uploadImages for changes and update preview
  useEffect(() => {
    if (uploadImages && uploadImages.length > 0) {
      const latestImage = uploadImages[uploadImages.length - 1];
      if (latestImage && latestImage.url) {
        setImagePreview(latestImage.url);
        setUploadedImageUrl(latestImage.url);
        setFormData(prev => ({
          ...prev,
          bannerImage: latestImage.url
        }));
      }
    }
  }, [uploadImages]);

  // Event types with their configurations
  const eventTypes = [
    { id: 'music', name: 'Music Festival', icon: Music, color: 'from-rose-500 to-pink-500', bgGlow: 'bg-rose-50' },
    { id: 'tech', name: 'Tech Conference', icon: Laptop, color: 'from-blue-500 to-cyan-500', bgGlow: 'bg-blue-50' },
    { id: 'wellness', name: 'Wellness Retreat', icon: Heart, color: 'from-emerald-500 to-teal-500', bgGlow: 'bg-emerald-50' },
    { id: 'food', name: 'Food & Wine', icon: Coffee, color: 'from-amber-500 to-orange-500', bgGlow: 'bg-amber-50' },
    { id: 'charity', name: 'Charity Gala', icon: Gift, color: 'from-purple-500 to-violet-500', bgGlow: 'bg-purple-50' },
    { id: 'party', name: 'Party Bash', icon: PartyPopper, color: 'from-indigo-500 to-purple-500', bgGlow: 'bg-indigo-50' },
    { id: 'sports', name: 'Sports Event', icon: Flame, color: 'from-red-500 to-orange-500', bgGlow: 'bg-red-50' },
    { id: 'art', name: 'Art Exhibition', icon: Palette, color: 'from-pink-500 to-rose-500', bgGlow: 'bg-pink-50' },
    { id: 'nature', name: 'Nature Camp', icon: Mountain, color: 'from-teal-500 to-emerald-500', bgGlow: 'bg-teal-50' },
    { id: 'science', name: 'Science Fair', icon: Microscope, color: 'from-cyan-500 to-blue-500', bgGlow: 'bg-cyan-50' }
  ];

  const ticketAvailabilityOptions = [
    { value: 'available', label: 'Available', color: 'text-green-600' },
    { value: 'limited', label: 'Limited Spots', color: 'text-orange-600' },
    { value: 'sold_out', label: 'Sold Out', color: 'text-red-600' },
    { value: 'coming_soon', label: 'Coming Soon', color: 'text-blue-600' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, bannerImage: null }));
    setImagePreview(null);
    setUploadedImageUrl(null);
    setUploadImages([]); // Clear the uploaded images from hook
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Validate required fields
    if (!formData.title || !formData.date || !formData.targetDate || !formData.description || !formData.location) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare the data for API submission
      const eventData = {
        ...formData,
        bannerImage: uploadedImageUrl || formData.bannerImage,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        ticketPrice: formData.ticketPrice ? parseFloat(formData.ticketPrice) : 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

   
      const response = await api.post('/events/create', eventData);
       if(response.status === 201) {
        toast.success('Event created successfully!');
       }
       
      setTimeout(() => {
        resetForm();
      }, 2000);
    } catch (error) {
      toast.error('Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      targetDate: '',
      description: '',
      location: '',
      eventType: 'music',
      buttonText: 'GET TICKETS',
      bannerImage: null,
      venueDetails: '',
      capacity: '',
      organizerName: '',
      organizerEmail: '',
      organizerPhone: '',
      ticketPrice: '',
      ticketAvailability: 'available',
      featuredSpeaker: '',
      agenda: '',
      socialLinks: {
        website: '',
        instagram: '',
        facebook: '',
        twitter: ''
      },
      tags: []
    });
    setImagePreview(null);
    setUploadedImageUrl(null);
    setUploadImages([]);
    setTagInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getEventTypeConfig = () => {
    return eventTypes.find(type => type.id === formData.eventType) || eventTypes[0];
  };

  const currentEventType = getEventTypeConfig();
  const EventIcon = currentEventType.icon;

  // Preview Component
  const EventPreview = () => {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowPreview(false)}>
        <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
          <div className={`bg-linear-to-r ${currentEventType.color} p-6 text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <EventIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{formData.title || 'Event Title'}</h3>
                  <p className="text-white/80 text-sm">{formData.eventType}</p>
                </div>
              </div>
              <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-white/10 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {imagePreview && (
            <div className="relative h-48 overflow-hidden">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>{formData.date || 'Date not set'}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>{formData.location || 'Location not set'}</span>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300">{formData.description || 'No description provided'}</p>
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <button className={`w-full bg-linear-to-r ${currentEventType.color} text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}>
              <Ticket className="w-4 h-4" />
              {formData.buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-reverse"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Create New Event
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Add{" "}
            <span className="bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              New Event
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Fill in the details below to create an amazing event experience
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-8">
              {/* Basic Information Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-500" />
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter event title"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Target Date (Event Start) *
                    </label>
                    <input
                      type="datetime-local"
                      name="targetDate"
                      value={formData.targetDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Describe your event..."
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter event location"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Event Type *
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {eventTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      name="buttonText"
                      value={formData.buttonText}
                      onChange={handleInputChange}
                      placeholder="GET TICKETS"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Banner Image Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-emerald-500" />
                  Event Banner
                </h2>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 dark:text-gray-300 mb-2">Click to upload banner image</p>
                      <p className="text-sm text-gray-400">PNG, JPG, GIF up to 5MB</p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="mt-3 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                      >
                        Choose Image
                      </button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={imageHandler}
                    className="hidden"
                  />
                  {uploadingImage && (
                    <div className="mt-3 flex items-center justify-center gap-2 text-emerald-600">
                      <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm">Uploading image...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Details Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-emerald-500" />
                  Additional Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Venue Details
                    </label>
                    <input
                      type="text"
                      name="venueDetails"
                      value={formData.venueDetails}
                      onChange={handleInputChange}
                      placeholder="Floor, hall, building details"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Capacity
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      placeholder="Maximum attendees"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ticket Price (BDT)
                    </label>
                    <input
                      type="number"
                      name="ticketPrice"
                      value={formData.ticketPrice}
                      onChange={handleInputChange}
                      placeholder="0 for free events"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ticket Availability
                    </label>
                    <select
                      name="ticketAvailability"
                      value={formData.ticketAvailability}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {ticketAvailabilityOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Organizer Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-500" />
                  Organizer Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Organizer Name
                    </label>
                    <input
                      type="text"
                      name="organizerName"
                      value={formData.organizerName}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Organizer Email
                    </label>
                    <input
                      type="email"
                      name="organizerEmail"
                      value={formData.organizerEmail}
                      onChange={handleInputChange}
                      placeholder="contact@example.com"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Organizer Phone
                    </label>
                    <input
                      type="tel"
                      name="organizerPhone"
                      value={formData.organizerPhone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Tags Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-emerald-500" />
                  Tags
                </h2>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Add tags (e.g., workshop, networking)"
                    className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm flex items-center gap-2">
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-gray-500 hover:text-red-500 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-emerald-500" />
                  Social Links
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="url"
                    placeholder="Website URL"
                    value={formData.socialLinks.website}
                    onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="url"
                    placeholder="Instagram URL"
                    value={formData.socialLinks.instagram}
                    onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="url"
                    placeholder="Facebook URL"
                    value={formData.socialLinks.facebook}
                    onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="url"
                    placeholder="Twitter URL"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-red-500 text-red-500 rounded-xl font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || uploadingImage}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || uploadingImage ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {uploadingImage ? 'Uploading...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Create Event
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && <EventPreview />}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AddEventPage;