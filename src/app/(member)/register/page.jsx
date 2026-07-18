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
  CheckCircle,
  Home,
} from "lucide-react";
import HeroProp from "@/components/HeroProp";
import api from "@/config/api";
import toast from "react-hot-toast";
import { divisions, occupations } from "../../../data/data";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [sameAsPermanent, setSameAsPermanent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    permanentAddress: {
      villageOrArea: "", // Fixed: changed from "street" to match your form
      upazila: "",
      district: "",
      division: "", 
      postalCode: "",
      country: "Bangladesh",
    },
    presentAddress: {
      villageOrArea: "", 
      upazila: "",
      district: "",
      division: "", 
      postalCode: "",
      country: "",
    },
    educationalQualification: [
      {
        degree: "",
        institution: "",
        yearOfPassing: "",
        currentlyStudying: false,
      },
    ],
    occupation: "",
    occupationDetails: {
      companyName: "",
      position: "",
    },
  });

  const [errors, setErrors] = useState({});

  // Occupations that don't need company/position/industry details
  const NO_OCCUPATION_DETAILS = ["unemployed", "retired", "student"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      educationalQualification: prev.educationalQualification.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu,
      ),
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      educationalQualification: [
        ...prev.educationalQualification,
        {
          degree: "",
          institution: "",
          yearOfPassing: "",
          currentlyStudying: false,
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    if (formData.educationalQualification.length > 1) {
      setFormData((prev) => ({
        ...prev,
        educationalQualification: prev.educationalQualification.filter(
          (_, i) => i !== index,
        ),
      }));
    }
  };

  const handleOccupationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      occupationDetails: {
        ...prev.occupationDetails,
        [field]: value,
      },
    }));
  };

  // Runs the validation rules for a single step and returns the errors object for it.
  const getStepErrors = (stepNum) => {
    const newErrors = {};

    if (stepNum === 1) {
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
    }

    if (stepNum === 2) {
      if (!formData.permanentAddress.villageOrArea) 
        newErrors.permanentVillageOrArea = "Village/Area is required";
      if (!formData.permanentAddress.division)
        newErrors.permanentDivision = "Division is required";
      if (!formData.permanentAddress.district)
        newErrors.permanentDistrict = "District is required";
      if (!formData.permanentAddress.upazila)
        newErrors.permanentUpazila = "Upazila is required";
      if (!formData.permanentAddress.postalCode)
        newErrors.permanentPostalCode = "Postal code is required";
    }

    if (stepNum === 3) {
      for (let i = 0; i < formData.educationalQualification.length; i++) {
        if (!formData.educationalQualification[i].degree) {
          newErrors[`degree_${i}`] = "Degree is required";
        }
        if (!formData.educationalQualification[i].institution) {
          newErrors[`institution_${i}`] = "Institution is required";
        }
      }
    }

    if (stepNum === 4) {
      if (!formData.occupation) newErrors.occupation = "Occupation is required";
    }

    return newErrors;
  };

  const validateStep = () => {
    const newErrors = getStepErrors(step);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const findFirstInvalidStep = () => {
    for (let s = 1; s <= 4; s++) {
      const stepErrors = getStepErrors(s);
      if (Object.keys(stepErrors).length > 0) {
        return { step: s, errors: stepErrors };
      }
    }
    return null;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    const invalid = findFirstInvalidStep();
    if (invalid) {
      setErrors(invalid.errors);
      setStep(invalid.step);
      window.scrollTo(0, 0);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...rest } = formData;

      const submitData = {
        ...rest,
        email: formData.email.trim().toLowerCase(),
        presentAddress: sameAsPermanent
          ? { ...formData.permanentAddress, sameAsPermanent: true }
          : { ...formData.presentAddress, sameAsPermanent: false },
        educationalQualification: formData.educationalQualification.map(
          (edu) => ({
            ...edu,
            yearOfPassing: edu.yearOfPassing
              ? parseInt(edu.yearOfPassing)
              : null,
          }),
        ),
        occupationDetails: {
          ...formData.occupationDetails,
        },
      };

      await api.post(`/auth/register`, submitData);

      toast.success("Registration successful! Please login to continue.");
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div>
        <HeroProp
          title="Become a Member"
          heading1="Join the"
          heading2="Raipurian Club"
          content="Get lifetime access to exclusive events, networking opportunities, and community benefits with a one-time payment of ৳50,000."
          Icon={Sparkles}
        />

        <div className="max-w-4xl mx-auto py-5 px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gray-50 border-b px-4 sm:px-6 py-4">
              <div className="flex justify-between items-center">
                {[
                  { num: 1, label: "Personal", icon: User },
                  { num: 2, label: "Address", icon: Home },
                  { num: 3, label: "Education", icon: GraduationCap },
                  { num: 4, label: "Occupation", icon: Briefcase },
                ].map((item) => (
                  <div
                    key={item.num}
                    className={`flex flex-col items-center ${
                      step >= item.num ? "text-emerald-600" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base ${
                        step > item.num
                          ? "bg-emerald-600 text-white"
                          : step === item.num
                            ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step > item.num ? (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        item.num
                      )}
                    </div>
                    <span className="text-[10px] sm:text-xs mt-1 hidden sm:block">
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

            <div className="p-4 sm:p-6 md:p-8">
              {step === 1 && (
                <div className="space-y-4 sm:space-y-5">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    Personal Information
                  </h2>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 shrink-0" />
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 text-base sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[48px] sm:min-h-[44px]"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1 flex items-start gap-1.5">
                        <span className="inline-block mt-0.5">⚠️</span>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 text-base sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[48px] sm:min-h-[44px]"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-start gap-1.5">
                        <span className="inline-block mt-0.5">⚠️</span>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Lock className="w-4 h-4 flex-shrink-0" />
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Min 6 characters"
                        className="w-full px-4 py-3 text-base sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[48px] sm:min-h-[44px]"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1 flex items-start gap-1.5">
                          <span className="inline-block mt-0.5">⚠️</span>
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Lock className="w-4 h-4 flex-shrink-0" />
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="w-full px-4 py-3 text-base sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[48px] sm:min-h-[44px]"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1 flex items-start gap-1.5">
                          <span className="inline-block mt-0.5">⚠️</span>
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 text-base sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[48px] sm:min-h-[44px]"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1 flex items-start gap-1.5">
                        <span className="inline-block mt-0.5">⚠️</span>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 sm:space-y-5">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    Address Information
                  </h2>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      Permanent Address
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Village / Area / House / Road"
                        value={formData.permanentAddress.villageOrArea}
                        onChange={(e) =>
                          handleAddressChange(
                            "permanentAddress",
                            "villageOrArea",
                            e.target.value,
                          )
                        }
                        className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                      />
                      {errors.permanentVillageOrArea && (
                        <p className="text-red-500 text-sm flex items-start gap-1.5">
                          <span className="inline-block mt-0.5">⚠️</span>
                          {errors.permanentVillageOrArea}
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <select
                          value={formData.permanentAddress.division}
                          onChange={(e) =>
                            handleAddressChange(
                              "permanentAddress",
                              "division",
                              e.target.value,
                            )
                          }
                          className="px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                        >
                          <option value="">Select Division</option>
                          {divisions.map((division) => (
                            <option key={division.id} value={division.value}>
                              {division.name}
                            </option>
                          ))}
                        </select>
                        {errors.permanentDivision && (
                          <p className="text-red-500 text-sm col-span-full flex items-start gap-1.5">
                            <span className="inline-block mt-0.5">⚠️</span>
                            {errors.permanentDivision}
                          </p>
                        )}

                        <input
                          type="text"
                          placeholder="District"
                          value={formData.permanentAddress.district}
                          onChange={(e) =>
                            handleAddressChange(
                              "permanentAddress",
                              "district",
                              e.target.value,
                            )
                          }
                          className="px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                        />
                        {errors.permanentDistrict && (
                          <p className="text-red-500 text-sm col-span-full flex items-start gap-1.5">
                            <span className="inline-block mt-0.5">⚠️</span>
                            {errors.permanentDistrict}
                          </p>
                        )}

                        <input
                          type="text"
                          placeholder="Upazila"
                          value={formData.permanentAddress.upazila}
                          onChange={(e) =>
                            handleAddressChange(
                              "permanentAddress",
                              "upazila",
                              e.target.value,
                            )
                          }
                          className="px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                        />
                        {errors.permanentUpazila && (
                          <p className="text-red-500 text-sm col-span-full flex items-start gap-1.5">
                            <span className="inline-block mt-0.5">⚠️</span>
                            {errors.permanentUpazila}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          className="px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                        />
                        {errors.permanentPostalCode && (
                          <p className="text-red-500 text-sm col-span-full flex items-start gap-1.5">
                            <span className="inline-block mt-0.5">⚠️</span>
                            {errors.permanentPostalCode}
                          </p>
                        )}

                        <select
                          value={formData.permanentAddress.country}
                          onChange={(e) =>
                            handleAddressChange(
                              "permanentAddress",
                              "country",
                              e.target.value,
                            )
                          }
                          className="px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                        >
                          <option value="Bangladesh">Bangladesh</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer py-2">
                    <input
                      type="checkbox"
                      checked={sameAsPermanent}
                      onChange={(e) => setSameAsPermanent(e.target.checked)}
                      className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm sm:text-base text-gray-700">
                      Same as permanent address (Current address)
                    </span>
                  </label>

                  {!sameAsPermanent && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Home className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        Present/Current Address
                      </h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Village / Area / House / Road"
                          value={formData.presentAddress.villageOrArea}
                          onChange={(e) =>
                            handleAddressChange(
                              "presentAddress",
                              "villageOrArea",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <select
                            value={formData.presentAddress.division}
                            onChange={(e) =>
                              handleAddressChange(
                                "presentAddress",
                                "division",
                                e.target.value,
                              )
                            }
                            className="px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                          >
                            <option value="">Select Division</option>
                            {divisions.map((division) => (
                              <option key={division.id} value={division.value}>
                                {division.name}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            placeholder="District"
                            value={formData.presentAddress.district}
                            onChange={(e) =>
                              handleAddressChange(
                                "presentAddress",
                                "district",
                                e.target.value,
                              )
                            }
                            className="px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                          />
                          <input
                            type="text"
                            placeholder="Upazila"
                            value={formData.presentAddress.upazila}
                            onChange={(e) =>
                              handleAddressChange(
                                "presentAddress",
                                "upazila",
                                e.target.value,
                              )
                            }
                            className="px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            className="px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
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
                            className="px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                          >
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="United Arab Emirates">
                              United Arab Emirates
                            </option>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="Australia">Australia</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 sm:space-y-5">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
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
                          className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1"
                          aria-label="Remove education"
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
                          className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                        />
                        {errors[`degree_${index}`] && (
                          <p className="text-red-500 text-sm flex items-start gap-1.5">
                            <span className="inline-block mt-0.5">⚠️</span>
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
                          className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                        />
                        {errors[`institution_${index}`] && (
                          <p className="text-red-500 text-sm flex items-start gap-1.5">
                            <span className="inline-block mt-0.5">⚠️</span>
                            {errors[`institution_${index}`]}
                          </p>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            className="px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                          />
                        </div>

                        <label className="flex items-center gap-2 py-1">
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
                            className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm sm:text-base text-gray-700">
                            Currently Studying
                          </span>
                        </label>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addEducation}
                    className="w-full py-3 text-base sm:text-sm border-2 border-dashed border-emerald-300 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors min-h-[48px]"
                  >
                    + Add Another Qualification
                  </button>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4 sm:space-y-5">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    Occupation Information
                  </h2>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Briefcase className="w-4 h-4 flex-shrink-0" />
                      Occupation Type <span className="text-red-500">*</span>
                    </label>

                    {/* Mobile-optimized select with better touch targets */}
                    <div className="relative">
                      <select
                        value={formData.occupation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            occupation: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3.5 sm:py-3 text-base sm:text-sm border border-gray-200 rounded-xl 
                 focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                 bg-white appearance-none cursor-pointer
                 transition-all duration-200
                 min-h-[48px] sm:min-h-[44px]"
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                        }}
                      >
                        <option value="">Select Occupation</option>
                        {occupations.map((occupation) => (
                          <option
                            key={occupation.value}
                            value={occupation.value}
                          >
                            {occupation.label}
                          </option>
                        ))}
                      </select>

                      {/* Custom dropdown arrow - better for mobile */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg
                          className="w-5 h-5 sm:w-4 sm:h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    {errors.occupation && (
                      <p className="text-red-500 text-sm mt-1.5 flex items-start gap-1.5">
                        <span className="inline-block mt-0.5">⚠️</span>
                        {errors.occupation}
                      </p>
                    )}
                  </div>

                  {formData.occupation &&
                    !NO_OCCUPATION_DETAILS.includes(formData.occupation) && (
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
                          className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                        />

                        <input
                          type="text"
                          placeholder="Position / Designation"
                          value={formData.occupationDetails.position}
                          onChange={(e) =>
                            handleOccupationChange("position", e.target.value)
                          }
                          className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                        />
                      </div>
                    )}
                </div>
              )}

              <div className="flex justify-between mt-8 pt-6 border-t flex-wrap gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 sm:px-6 py-2.5 sm:py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium text-sm sm:text-base min-h-[44px]"
                  >
                    ← Previous
                  </button>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 sm:px-6 py-2.5 sm:py-2 bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all ml-auto font-medium shadow-md text-sm sm:text-base min-h-[44px]"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-4 sm:px-6 py-2.5 sm:py-2 bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all ml-auto font-medium shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base min-h-[44px]"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}