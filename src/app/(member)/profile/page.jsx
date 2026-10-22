// app/profile/page.js
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/config/api";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Camera,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Home,
  Building,
  GraduationCap,
  Heart,
  Award,
  Clock,
  X,
  Sparkles,
  Shield,
  Star,
} from "lucide-react";
import useImageUpload from "@/app/hooks/useImageUpload";
import DigitalIdCardSection from "@/components/DigitalIdCardSection";

const ProfilePage = () => {
  const { user, setUser, loading: authLoading } = useAuth();
  const { imageHandler, loading: uploadingImage, uploadImages, setImages: setUploadImages } = useImageUpload();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(user?.profileImage || null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const mapUserToFormData = (userData) => ({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    bio: userData?.bio || "",
    interests: userData?.interests || [],
    profileImage: userData?.profileImage || "",

    // Address Information (supports both formats)
    permanentAddress: {
      villageOrArea: userData?.permanentAddress?.villageOrArea || userData?.permanentAddress?.street || "",
      street: userData?.permanentAddress?.street || userData?.permanentAddress?.villageOrArea || "",
      upazila: userData?.permanentAddress?.upazila || "",
      district: userData?.permanentAddress?.district || userData?.permanentAddress?.city || "",
      city: userData?.permanentAddress?.city || userData?.permanentAddress?.district || "",
      division: userData?.permanentAddress?.division || userData?.permanentAddress?.state || "",
      state: userData?.permanentAddress?.state || userData?.permanentAddress?.division || "",
      postalCode: userData?.permanentAddress?.postalCode || "",
      country: userData?.permanentAddress?.country || "Bangladesh",
    },
    presentAddress: {
      villageOrArea: userData?.presentAddress?.villageOrArea || userData?.presentAddress?.street || "",
      street: userData?.presentAddress?.street || userData?.presentAddress?.villageOrArea || "",
      upazila: userData?.presentAddress?.upazila || "",
      district: userData?.presentAddress?.district || userData?.presentAddress?.city || "",
      city: userData?.presentAddress?.city || userData?.presentAddress?.district || "",
      division: userData?.presentAddress?.division || userData?.presentAddress?.state || "",
      state: userData?.presentAddress?.state || userData?.presentAddress?.division || "",
      postalCode: userData?.presentAddress?.postalCode || "",
      country: userData?.presentAddress?.country || "Bangladesh",
      sameAsPermanent: userData?.presentAddress?.sameAsPermanent || false,
    },

    // Education
    educationalQualification: userData?.educationalQualification?.length > 0
      ? userData.educationalQualification
      : [{ degree: "", institution: "", yearOfPassing: "", grade: "", currentlyStudying: false }],

    // Occupation
    occupation: userData?.occupation || "",
    occupationDetails: {
      companyName: userData?.occupationDetails?.companyName || "",
      position: userData?.occupationDetails?.position || "",
      yearsOfExperience: userData?.occupationDetails?.yearsOfExperience || "",
      industry: userData?.occupationDetails?.industry || "",
    },
  });

  // Form data state initialized with user data
  const [formData, setFormData] = useState(mapUserToFormData(user));

  // Sync form data when user state updates
  useEffect(() => {
    if (user) {
      setFormData(mapUserToFormData(user));
      setImagePreview(user?.profileImage || null);
    }
  }, [user]);

  // Monitor uploadImages for changes and update preview
  useEffect(() => {
    if (uploadImages && uploadImages.length > 0) {
      
      const latestImage = uploadImages[uploadImages.length - 1];
    
      if (latestImage && latestImage.url) {
        setImagePreview(latestImage.url);
        setUploadedImageUrl(latestImage.url);
      }
    }
  }, [uploadImages]);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Redirect if not authenticated
  if (!authLoading && !user) {
    router.push("/login");
    return null;
  }

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
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddressChange = (type, field, value) => {
    setFormData(prev => {
      const updatedAddr = {
        ...prev[type],
        [field]: value,
      };

      // Keep alias fields synchronized
      if (field === 'street' || field === 'villageOrArea') {
        updatedAddr.street = value;
        updatedAddr.villageOrArea = value;
      }
      if (field === 'city' || field === 'district') {
        updatedAddr.city = value;
        updatedAddr.district = value;
      }
      if (field === 'state' || field === 'division') {
        updatedAddr.state = value;
        updatedAddr.division = value;
      }

      const next = {
        ...prev,
        [type]: updatedAddr,
      };

      if (type === 'permanentAddress' && prev.presentAddress.sameAsPermanent) {
        next.presentAddress = {
          ...updatedAddr,
          sameAsPermanent: true,
        };
      }

      return next;
    });
  };

  const handleSameAsPermanent = () => {
    const isChecked = !formData.presentAddress.sameAsPermanent;
    if (isChecked) {
      setFormData(prev => ({
        ...prev,
        presentAddress: {
          ...prev.permanentAddress,
          sameAsPermanent: true
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        presentAddress: {
          villageOrArea: "",
          street: "",
          upazila: "",
          district: "",
          city: "",
          division: "",
          state: "",
          postalCode: "",
          country: "Bangladesh",
          sameAsPermanent: false
        }
      }));
    }
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.educationalQualification];
    updatedEducation[index][field] = value;
    setFormData(prev => ({
      ...prev,
      educationalQualification: updatedEducation
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      educationalQualification: [
        ...prev.educationalQualification,
        { degree: "", institution: "", yearOfPassing: "", grade: "", currentlyStudying: false }
      ]
    }));
  };

  const removeEducation = (index) => {
    if (formData.educationalQualification.length > 1) {
      const updatedEducation = formData.educationalQualification.filter((_, i) => i !== index);
      const cleanedEducation = updatedEducation.map(edu => {
        const { _id, id, ...rest } = edu;
        return rest;
      });
      setFormData(prev => ({
        ...prev,
        educationalQualification: cleanedEducation
      }));
    }
  };

  const handleOccupationDetailsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      occupationDetails: {
        ...prev.occupationDetails,
        [field]: value
      }
    }));
  };

  const handleInterestsChange = (e) => {
    const interestsArray = e.target.value.split(',').map(i => i.trim()).filter(i => i);
    setFormData(prev => ({ ...prev, interests: interestsArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveSuccess(false);
    
    try {
      // Use uploaded image URL if available, otherwise keep existing
      let imageUrl = user?.profileImage;
      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl;
      }
      
      // Clean up education data - remove _id and id fields
      const cleanedEducation = formData.educationalQualification.map(edu => {
        const { _id, id, ...rest } = edu;
        return rest;
      });
      
      // Prepare profile payload matching schema exactly
      const profilePayload = {
        name: formData.name,
        phone: formData.phone,
        bio: formData.bio,
        interests: formData.interests,
        profileImage: imageUrl,
        permanentAddress: formData.permanentAddress,
        presentAddress: formData.presentAddress,
        educationalQualification: cleanedEducation.filter(edu => edu.degree && edu.institution),
        occupation: formData.occupation,
        occupationDetails: {
          companyName: formData.occupationDetails.companyName || "",
          position: formData.occupationDetails.position || "",
          yearsOfExperience: formData.occupationDetails.yearsOfExperience || null,
          industry: formData.occupationDetails.industry || "",
        },
      };
      
      const response = await api.put(`/auth/${user._id}`, profilePayload);
      
      // Update user context with new data
      if (setUser && response.data.user) {
        setUser(prev => ({
          ...prev,
          ...response.data.user
        }));
      }
      
      setSaveSuccess(true);
      toast.success("Profile updated successfully");
      setIsEditing(false);
      
      // Clear uploaded images after successful save
      setUploadedImageUrl(null);
      setUploadImages([]);
      
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setImagePreview(user?.profileImage || null);
    setUploadedImageUrl(null);
    setUploadImages([]);
    
    // Reset form data to original user data
    setFormData(mapUserToFormData(user));
  };

  const copyMemberId = () => {
    if (user?.memberId) {
      navigator.clipboard.writeText(user.memberId);
      toast.success("Member ID copied to clipboard");
    }
  };

  const getStatusColor = () => {
    switch (user?.status) {
      case 'approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'review': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      case 'suspended': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = () => {
    switch (user?.status) {
      case 'approved': return 'Approved Member';
      case 'review': return 'Under Review';
      case 'pending': return 'Pending';
      case 'rejected': return 'Rejected';
      case 'suspended': return 'Suspended';
      default: return user?.status || 'Unknown';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-[40vh] bg-linear-to-br from-emerald-600 via-emerald-500 to-cyan-500 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 animate-float">
          <Sparkles className="w-8 h-8 text-white/30" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float-delayed">
          <Star className="w-6 h-6 text-white/30" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-pulse">
          <Shield className="w-10 h-10 text-white/10" />
        </div>
        
        {/* Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Award className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Member Profile</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up">
              Welcome Back, {formData.name?.split(' ')[0]}!
            </h1>
            
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Manage your profile, view your membership details, and update your information
            </p>
            
            {/* Quick Stats Row */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-white text-sm">Member ID</p>
                <p className="text-white font-semibold">{user?.memberId || 'N/A'}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-white text-sm">Membership</p>
                <p className="text-white font-semibold">{user?.membership?.name || 'Premium'}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-white text-sm">Status</p>
                <p className="text-white font-semibold capitalize">{user?.status || 'Active'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="max-w-6xl mx-auto">
          {/* Success Banner */}
          {saveSuccess && (
            <div className="mb-6 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <p className="text-green-700 dark:text-green-300 font-medium">Profile updated successfully!</p>
            </div>
          )}

          {/* Status Banner */}
          {user?.status !== 'approved' && (
            <div className={`mb-6 border rounded-lg p-4 flex items-center gap-3 ${getStatusColor()}`}>
              <AlertCircle className="w-5 h-5" />
              <div>
                <p className="font-medium">Status: {getStatusText()}</p>
                {user?.status === 'review' && (
                  <p className="text-sm opacity-90">Your membership application is being reviewed by admin.</p>
                )}
                {user?.status === 'pending' && (
                  <p className="text-sm opacity-90">Please complete your profile and payment to activate membership.</p>
                )}
              </div>
            </div>
          )}

          {/* Profile Header Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden mb-6 -mt-1 relative z-10 border border-slate-200/80 dark:border-slate-800">
            <div className="relative h-24 bg-linear-to-r from-emerald-500 to-cyan-500">
              <div className="absolute -bottom-12 left-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 p-1 shadow-xl">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt={formData.name || "Profile"}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-linear-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">
                          {formData.name?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {isEditing && (
                    <>
                      <input
                        type="file"
                        id="profile-image-upload"
                        accept="image/*"
                        onChange={imageHandler}
                        className="hidden"
                      />
                      <label
                        htmlFor="profile-image-upload"
                        className="absolute bottom-0 right-0 p-1.5 bg-emerald-500 rounded-full cursor-pointer hover:bg-emerald-600 transition-colors shadow-lg"
                      >
                        <Camera className="w-3 h-3 text-white" />
                      </label>
                    </>
                  )}
                </div>
              </div>
              
              <div className="absolute bottom-4 right-8 flex gap-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/30 transition-all"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading || uploadingImage}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {(loading || uploadingImage) && <Loader2 className="w-4 h-4 animate-spin" />}
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-14 pb-6 px-8">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{formData.name || "Member"}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">{formData.email}</span>
                  </div>
                  {formData.phone && (
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">{formData.phone}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={copyMemberId}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-slate-800 rounded-lg text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  {user?.memberId}
                </button>
              </div>
            </div>
          </div>

          {/* Membership Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-4 text-white transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Membership Type</p>
                  <p className="text-lg font-bold mt-1">{user?.membership?.name || "Lifetime Premium"}</p>
                  <p className="text-xs opacity-80 mt-1">BDT {user?.membership?.amount?.toLocaleString()}</p>
                </div>
                <Award className="w-8 h-8 opacity-80" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-4 border border-transparent dark:border-slate-800 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-950/60 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Member Since</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "2024"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-4 border border-transparent dark:border-slate-800 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-950/60 rounded-lg">
                  <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Interests</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{formData.interests?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Digital Identification Card & Announcements Section */}
          <div className="mb-8">
            <DigitalIdCardSection
              memberData={{
                ...user,
                name: formData.name || user?.name,
                phone: formData.phone || user?.phone,
                profileImage: imagePreview || user?.profileImage,
                village: formData.permanentAddress?.villageOrArea || user?.permanentAddress?.villageOrArea,
                district: formData.permanentAddress?.district || user?.permanentAddress?.district,
                profession: formData.occupationDetails?.position || formData.occupation || user?.occupation,
                membership: user?.membership?.name || user?.membership || "Life Member",
              }}
            />
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                  <User className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors ${
                        !isEditing ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                    {!user?.isEmailVerified && (
                      <p className="text-xs text-yellow-600 mt-1">Email not verified</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        !isEditing ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows="3"
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        !isEditing ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      placeholder="Tell us about yourself..."
                      maxLength="500"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.bio?.length || 0}/500 characters</p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                  <Home className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
                </div>
                
                {/* Permanent Address */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    Permanent Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={formData.permanentAddress.street}
                        onChange={(e) => handleAddressChange('permanentAddress', 'street', e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                          !isEditing ? "bg-gray-50 text-gray-600" : ""
                        }`}
                        placeholder="Street Address"
                      />
                    </div>
                    <input
                      type="text"
                      value={formData.permanentAddress.city}
                      onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        !isEditing ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      placeholder="City"
                    />
                    <input
                      type="text"
                      value={formData.permanentAddress.state}
                      onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        !isEditing ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      placeholder="State"
                    />
                    <input
                      type="text"
                      value={formData.permanentAddress.postalCode}
                      onChange={(e) => handleAddressChange('permanentAddress', 'postalCode', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        !isEditing ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      placeholder="Postal Code"
                    />
                    <input
                      type="text"
                      value={formData.permanentAddress.country}
                      onChange={(e) => handleAddressChange('permanentAddress', 'country', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        !isEditing ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      placeholder="Country"
                    />
                  </div>
                </div>
                
                {/* Present Address */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    Present Address
                  </h3>
                  
                  {isEditing && (
                    <label className="flex items-center gap-2 mb-4 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.presentAddress.sameAsPermanent}
                        onChange={handleSameAsPermanent}
                        className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Same as permanent address</span>
                    </label>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={formData.presentAddress.street}
                        onChange={(e) => handleAddressChange('presentAddress', 'street', e.target.value)}
                        disabled={!isEditing || formData.presentAddress.sameAsPermanent}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                          (!isEditing || formData.presentAddress.sameAsPermanent) ? "bg-gray-50 text-gray-600" : ""
                        }`}
                        placeholder="Street Address"
                      />
                    </div>
                    <input
                      type="text"
                      value={formData.presentAddress.city}
                      onChange={(e) => handleAddressChange('presentAddress', 'city', e.target.value)}
                      disabled={!isEditing || formData.presentAddress.sameAsPermanent}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        (!isEditing || formData.presentAddress.sameAsPermanent) ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      placeholder="City"
                    />
                    <input
                      type="text"
                      value={formData.presentAddress.state}
                      onChange={(e) => handleAddressChange('presentAddress', 'state', e.target.value)}
                      disabled={!isEditing || formData.presentAddress.sameAsPermanent}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        (!isEditing || formData.presentAddress.sameAsPermanent) ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      placeholder="State"
                    />
                    <input
                      type="text"
                      value={formData.presentAddress.postalCode}
                      onChange={(e) => handleAddressChange('presentAddress', 'postalCode', e.target.value)}
                      disabled={!isEditing || formData.presentAddress.sameAsPermanent}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        (!isEditing || formData.presentAddress.sameAsPermanent) ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      placeholder="Postal Code"
                    />
                    <input
                      type="text"
                      value={formData.presentAddress.country}
                      onChange={(e) => handleAddressChange('presentAddress', 'country', e.target.value)}
                      disabled={!isEditing || formData.presentAddress.sameAsPermanent}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        (!isEditing || formData.presentAddress.sameAsPermanent) ? "bg-gray-50 text-gray-600" : ""
                      }`}
                      placeholder="Country"
                    />
                  </div>
                </div>
              </div>

              {/* Educational Qualification */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-emerald-500" />
                    <h2 className="text-xl font-semibold text-gray-900">Educational Qualification</h2>
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={addEducation}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    >
                      + Add Education
                    </button>
                  )}
                </div>
                
                {formData.educationalQualification.map((edu, index) => (
                  <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg relative">
                    {isEditing && formData.educationalQualification.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Degree
                        </label>
                        <input
                          type="text"
                          value={edu.degree || ""}
                          onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                            !isEditing ? "bg-gray-50 text-gray-600" : ""
                          }`}
                          placeholder="e.g., B.Sc. in CSE"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Institution
                        </label>
                        <input
                          type="text"
                          value={edu.institution || ""}
                          onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                            !isEditing ? "bg-gray-50 text-gray-600" : ""
                          }`}
                          placeholder="University/College name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year of Passing
                        </label>
                        <input
                          type="number"
                          value={edu.yearOfPassing || ""}
                          onChange={(e) => handleEducationChange(index, 'yearOfPassing', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                            !isEditing ? "bg-gray-50 text-gray-600" : ""
                          }`}
                          placeholder="e.g., 2020"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Grade/CGPA
                        </label>
                        <input
                          type="text"
                          value={edu.grade || ""}
                          onChange={(e) => handleEducationChange(index, 'grade', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                            !isEditing ? "bg-gray-50 text-gray-600" : ""
                          }`}
                          placeholder="e.g., 3.5 or First Class"
                        />
                      </div>
                    </div>
                    
                    {isEditing && (
                      <label className="flex items-center gap-2 mt-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={edu.currentlyStudying || false}
                          onChange={(e) => handleEducationChange(index, 'currentlyStudying', e.target.checked)}
                          className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-700">Currently Studying</span>
                      </label>
                    )}
                    
                    {!isEditing && edu.currentlyStudying && (
                      <div className="mt-2 text-xs text-emerald-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Currently pursuing
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Occupation Information */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                  <Briefcase className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Occupation Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Occupation Type *
                    </label>
                    {isEditing ? (
                      <select
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select occupation</option>
                        <option value="student">Student</option>
                        <option value="employed">Employed</option>
                        <option value="self_employed">Self Employed</option>
                        <option value="business">Business</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="retired">Retired</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={formData.occupation?.replace('_', ' ').toUpperCase() || ""}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                      />
                    )}
                  </div>
                  
                  {formData.occupation && formData.occupation !== 'student' && formData.occupation !== 'unemployed' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={formData.occupationDetails.companyName || ""}
                          onChange={(e) => handleOccupationDetailsChange('companyName', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                            !isEditing ? "bg-gray-50 text-gray-600" : ""
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Position
                        </label>
                        <input
                          type="text"
                          value={formData.occupationDetails.position || ""}
                          onChange={(e) => handleOccupationDetailsChange('position', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                            !isEditing ? "bg-gray-50 text-gray-600" : ""
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Years of Experience
                        </label>
                        <input
                          type="number"
                          value={formData.occupationDetails.yearsOfExperience || ""}
                          onChange={(e) => handleOccupationDetailsChange('yearsOfExperience', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                            !isEditing ? "bg-gray-50 text-gray-600" : ""
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Industry
                        </label>
                        <input
                          type="text"
                          value={formData.occupationDetails.industry || ""}
                          onChange={(e) => handleOccupationDetailsChange('industry', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                            !isEditing ? "bg-gray-50 text-gray-600" : ""
                          }`}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Interests */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                  <Heart className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Interests & Hobbies</h2>
                </div>
                
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={formData.interests.join(', ')}
                      onChange={handleInterestsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="e.g., Photography, Travel, Reading, Sports (comma-separated)"
                    />
                    <p className="text-xs text-gray-500 mt-2">Separate multiple interests with commas</p>
                  </>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.map((interest, idx) => (
                      <span key={idx} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                    {formData.interests.length === 0 && (
                      <p className="text-gray-500 italic">No interests added yet</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </>
  );
};

export default ProfilePage;