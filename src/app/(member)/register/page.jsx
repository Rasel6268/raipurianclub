// app/register/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Building,
  Globe,
  CreditCard,
  Shield,
  CheckCircle,
  ArrowRight,
  Home,
  City,
  Hash,
  BookOpen,
  Calendar as CalendarIcon,
  Award,
  Users,
  Crown,
  Star,
  Gift,
  Infinity,
  AlertCircle,
} from "lucide-react";
import HeroProp from "@/components/HeroProp";
import api from "@/config/api";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [sameAsPermanent, setSameAsPermanent] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",

    // Permanent Address
    permanentAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Bangladesh",
    },

    // Present Address
    presentAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Bangladesh",
    },

    // Education
    educationalQualification: [
      {
        degree: "",
        institution: "",
        yearOfPassing: "",
        grade: "",
        currentlyStudying: false,
      },
    ],

    // Occupation
    occupation: "",
    occupationDetails: {
      companyName: "",
      position: "",
      yearsOfExperience: "",
      industry: "",
    },
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle address changes
  const handleAddressChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  // Handle education changes
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.educationalQualification];
    updatedEducation[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      educationalQualification: updatedEducation,
    }));
  };

  // Add education field
  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      educationalQualification: [
        ...prev.educationalQualification,
        {
          degree: "",
          institution: "",
          yearOfPassing: "",
          grade: "",
          currentlyStudying: false,
        },
      ],
    }));
  };

  // Remove education field
  const removeEducation = (index) => {
    if (formData.educationalQualification.length > 1) {
      const updatedEducation = formData.educationalQualification.filter(
        (_, i) => i !== index,
      );
      setFormData((prev) => ({
        ...prev,
        educationalQualification: updatedEducation,
      }));
    }
  };

  // Handle occupation change
  const handleOccupationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      occupationDetails: {
        ...prev.occupationDetails,
        [field]: value,
      },
    }));
  };

  // Validate current step
  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      else if (!/^(?:\+88|88)?(01[3-9]\d{8})$/.test(formData.phone))
        newErrors.phone = "Invalid Bangladesh phone number";
    }

    if (step === 2) {
      if (!formData.permanentAddress.street)
        newErrors.permanentStreet = "Street address is required";
      if (!formData.permanentAddress.city)
        newErrors.permanentCity = "City is required";
      if (!formData.permanentAddress.state)
        newErrors.permanentState = "State is required";
      if (!formData.permanentAddress.postalCode)
        newErrors.permanentPostalCode = "Postal code is required";
    }

    if (step === 3) {
      for (let i = 0; i < formData.educationalQualification.length; i++) {
        if (!formData.educationalQualification[i].degree) {
          newErrors[`degree_${i}`] = "Degree is required";
        }
        if (!formData.educationalQualification[i].institution) {
          newErrors[`institution_${i}`] = "Institution is required";
        }
      }
    }

    if (step === 4) {
      if (!formData.occupation) newErrors.occupation = "Occupation is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate all steps before final submission
  const validateAllSteps = () => {
    // Validate Step 1
    if (!formData.name) return false;
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) return false;
    if (!formData.password || formData.password.length < 6) return false;
    if (formData.password !== formData.confirmPassword) return false;
    if (!formData.phone || !/^(?:\+88|88)?(01[3-9]\d{8})$/.test(formData.phone))
      return false;

    // Validate Step 2
    if (!formData.permanentAddress.street) return false;
    if (!formData.permanentAddress.city) return false;
    if (!formData.permanentAddress.state) return false;
    if (!formData.permanentAddress.postalCode) return false;

    // Validate Step 3
    for (let i = 0; i < formData.educationalQualification.length; i++) {
      if (!formData.educationalQualification[i].degree) return false;
      if (!formData.educationalQualification[i].institution) return false;
    }

    // Validate Step 4
    if (!formData.occupation) return false;

    return true;
  };

  // Next step
  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  // Previous step
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  // Handle final registration and payment
  const handleSubmit = async () => {
    // Validate all steps before submission
    if (!validateAllSteps()) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);

    try {
      // Prepare data for API
      const submitData = {
        ...formData,
        presentAddress: sameAsPermanent
          ? { ...formData.permanentAddress, sameAsPermanent: true }
          : { ...formData.presentAddress, sameAsPermanent: false },
        educationalQualification: formData.educationalQualification.map(
          (edu) => ({
            ...edu,
            yearOfPassing: edu.yearOfPassing
              ? parseInt(edu.yearOfPassing)
              : null,
            yearsOfExperience: edu.yearsOfExperience
              ? parseInt(edu.yearsOfExperience)
              : null,
          }),
        ),
        occupationDetails: {
          ...formData.occupationDetails,
          yearsOfExperience: formData.occupationDetails.yearsOfExperience
            ? parseInt(formData.occupationDetails.yearsOfExperience)
            : null,
        },
      };

      // Register user
      const registerResponse = await api.post(`/auth/register`, submitData);

      const registerData = registerResponse.data;
      if (registerData.success) {
        const userId = registerData.data._id;
        
        // Initiate payment
        const paymentResponse = await api.post(`/payment/initiate`, { userId });

        const paymentData = paymentResponse.data;

        if (paymentData.success && paymentData.paymentUrl) {
          window.location.href = paymentData.paymentUrl;
        } else {
          toast("Payment initialization failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast(
        error.response?.data?.message || "An error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div>
        {/* Hero Section */}
        <HeroProp
          title="Become a Member"
          heading1="Join the"
          heading2="Raipurian Club"
          content="Get lifetime access to exclusive events, networking opportunities, and community benefits with a one-time payment of ৳50,000."
          Icon={Sparkles}
        />

        {/* Membership Price Banner */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-linear-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Lifetime Premium Membership
                  </h2>
                  <p className="text-amber-100 text-sm">
                    One-time payment • Lifetime access • Never expires
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Membership Fee</p>
                <p className="text-4xl font-bold">৳50,000</p>
                <p className="text-xs opacity-80">One-time payment only</p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Progress Steps */}
            <div className="bg-gray-50 border-b px-6 py-4">
              <div className="flex justify-between items-center">
                {[
                  { num: 1, label: "Personal", icon: User },
                  { num: 2, label: "Address", icon: Home },
                  { num: 3, label: "Education", icon: GraduationCap },
                  { num: 4, label: "Occupation", icon: Briefcase },
                  { num: 5, label: "Payment", icon: CreditCard },
                ].map((item) => (
                  <div
                    key={item.num}
                    className={`flex flex-col items-center ${
                      step >= item.num ? "text-emerald-600" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        step > item.num
                          ? "bg-emerald-600 text-white"
                          : step === item.num
                            ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step > item.num ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        item.num
                      )}
                    </div>
                    <span className="text-xs mt-1 hidden sm:block">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
                <div
                  className="bg-linear-to-r from-emerald-600 to-teal-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${((step - 1) / 4) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Personal Information
                  </h2>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4" />
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4" />
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Lock className="w-4 h-4" />
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Min 6 characters"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Lock className="w-4 h-4" />
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4" />
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter a valid Bangladesh mobile number (01XXXXXXXXX)
                    </p>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Address Information */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Address Information
                  </h2>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      Permanent Address
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Street / Village / Road"
                        value={formData.permanentAddress.street}
                        onChange={(e) =>
                          handleAddressChange(
                            "permanentAddress",
                            "street",
                            e.target.value,
                          )
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      />
                      {errors.permanentStreet && (
                        <p className="text-red-500 text-sm">
                          {errors.permanentStreet}
                        </p>
                      )}

                      <div className="grid md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="City"
                          value={formData.permanentAddress.city}
                          onChange={(e) =>
                            handleAddressChange(
                              "permanentAddress",
                              "city",
                              e.target.value,
                            )
                          }
                          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={formData.permanentAddress.state}
                          onChange={(e) =>
                            handleAddressChange(
                              "permanentAddress",
                              "state",
                              e.target.value,
                            )
                          }
                          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Postal Code"
                          value={formData.permanentAddress.postalCode}
                          onChange={(e) =>
                            handleAddressChange(
                              "permanentAddress",
                              "postalCode",
                              e.target.value,
                            )
                          }
                          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                        <select
                          value={formData.permanentAddress.country}
                          onChange={(e) =>
                            handleAddressChange(
                              "permanentAddress",
                              "country",
                              e.target.value,
                            )
                          }
                          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="India">India</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameAsPermanent}
                      onChange={(e) => setSameAsPermanent(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Same as permanent address (Current address)
                    </span>
                  </label>

                  {!sameAsPermanent && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Home className="w-4 h-4 text-emerald-600" />
                        Present/Current Address
                      </h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Street / Village / Road"
                          value={formData.presentAddress.street}
                          onChange={(e) =>
                            handleAddressChange(
                              "presentAddress",
                              "street",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                        <div className="grid md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="City"
                            value={formData.presentAddress.city}
                            onChange={(e) =>
                              handleAddressChange(
                                "presentAddress",
                                "city",
                                e.target.value,
                              )
                            }
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          />
                          <input
                            type="text"
                            placeholder="State"
                            value={formData.presentAddress.state}
                            onChange={(e) =>
                              handleAddressChange(
                                "presentAddress",
                                "state",
                                e.target.value,
                              )
                            }
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Postal Code"
                            value={formData.presentAddress.postalCode}
                            onChange={(e) =>
                              handleAddressChange(
                                "presentAddress",
                                "postalCode",
                                e.target.value,
                              )
                            }
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          />
                          <select
                            value={formData.presentAddress.country}
                            onChange={(e) =>
                              handleAddressChange(
                                "presentAddress",
                                "country",
                                e.target.value,
                              )
                            }
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          >
                            <option value="Bangladesh">Bangladesh</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Educational Qualification */}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Educational Qualification
                  </h2>

                  {formData.educationalQualification.map((edu, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-4 relative"
                    >
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeEducation(index)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      )}
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Education #{index + 1}
                      </h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Degree / Certificate (e.g., B.Sc in CSE)"
                          value={edu.degree}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "degree",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                        {errors[`degree_${index}`] && (
                          <p className="text-red-500 text-sm">
                            {errors[`degree_${index}`]}
                          </p>
                        )}

                        <input
                          type="text"
                          placeholder="Institution Name"
                          value={edu.institution}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "institution",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                        {errors[`institution_${index}`] && (
                          <p className="text-red-500 text-sm">
                            {errors[`institution_${index}`]}
                          </p>
                        )}

                        <div className="grid md:grid-cols-2 gap-3">
                          <input
                            type="number"
                            placeholder="Year of Passing"
                            value={edu.yearOfPassing}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "yearOfPassing",
                                e.target.value,
                              )
                            }
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          />
                          <input
                            type="text"
                            placeholder="Grade / CGPA (optional)"
                            value={edu.grade}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "grade",
                                e.target.value,
                              )
                            }
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={edu.currentlyStudying}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "currentlyStudying",
                                e.target.checked,
                              )
                            }
                            className="w-4 h-4 text-emerald-600 rounded"
                          />
                          <span className="text-sm text-gray-700">
                            Currently Studying
                          </span>
                        </label>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addEducation}
                    className="w-full py-2 border-2 border-dashed border-emerald-300 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                  >
                    + Add Another Qualification
                  </button>
                </div>
              )}

              {/* Step 4: Occupation Information */}
              {step === 4 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Occupation Information
                  </h2>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Briefcase className="w-4 h-4" />
                      Occupation Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.occupation}
                      onChange={(e) =>
                        setFormData({ ...formData, occupation: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Select Occupation</option>
                      <option value="student">Student</option>
                      <option value="employed">
                        Employed (Service Holder)
                      </option>
                      <option value="self_employed">Self Employed</option>
                      <option value="business">Business Owner</option>
                      <option value="unemployed">Unemployed</option>
                      <option value="retired">Retired</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.occupation && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.occupation}
                      </p>
                    )}
                  </div>

                  {formData.occupation &&
                    formData.occupation !== "unemployed" &&
                    formData.occupation !== "retired" && (
                      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                        <h3 className="font-semibold text-gray-800">
                          Occupation Details
                        </h3>

                        <input
                          type="text"
                          placeholder="Company / Organization Name"
                          value={formData.occupationDetails.companyName}
                          onChange={(e) =>
                            handleOccupationChange(
                              "companyName",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />

                        <input
                          type="text"
                          placeholder="Position / Designation"
                          value={formData.occupationDetails.position}
                          onChange={(e) =>
                            handleOccupationChange("position", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />

                        <div className="grid md:grid-cols-2 gap-3">
                          <input
                            type="number"
                            placeholder="Years of Experience"
                            value={formData.occupationDetails.yearsOfExperience}
                            onChange={(e) =>
                              handleOccupationChange(
                                "yearsOfExperience",
                                e.target.value,
                              )
                            }
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          />
                          <input
                            type="text"
                            placeholder="Industry"
                            value={formData.occupationDetails.industry}
                            onChange={(e) =>
                              handleOccupationChange("industry", e.target.value)
                            }
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                    )}
                </div>
              )}

              {/* Step 5: Payment Summary */}
              {step === 5 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Payment Summary
                  </h2>

                  <div className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">
                          Lifetime Premium Membership
                        </h3>
                        <p className="text-gray-600 text-sm">
                          One-time payment • Never expires
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-3xl font-bold text-emerald-600">
                          ৳50,000
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-emerald-200 pt-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500" />
                        Membership Benefits
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {[
                          "Access to all community events",
                          "Full forum participation",
                          "Monthly newsletter",
                          "Priority support",
                          "Premium profile badge",
                          "Member directory listing",
                          "Access to exclusive content",
                          "Voting rights in club elections",
                          "Eligible for leadership positions",
                          "Free entry to all paid events",
                          "Annual gift hamper",
                          "Lifetime access to all future features",
                        ].map((benefit, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <CheckCircle className="w-3 h-3 text-emerald-500" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-800">
                        Secure Payment
                      </p>
                      <p className="text-sm text-blue-700">
                        Your payment will be processed securely via SSLCommerz.
                        All major credit/debit cards, mobile banking, and bank
                        transfers are accepted.
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-4 flex items-start gap-3">
                    <Infinity className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-800">
                        Lifetime Validity
                      </p>
                      <p className="text-sm text-amber-700">
                        This membership never expires. Pay once and enjoy
                        benefits for a lifetime!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium"
                  >
                    ← Previous
                  </button>
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all ml-auto font-medium shadow-md"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2 bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all ml-auto font-medium shadow-md flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        Pay ৳50,000 & Register
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 text-center">
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>256-bit SSL Secure</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-green-600" />
                <span>500+ Happy Members</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
