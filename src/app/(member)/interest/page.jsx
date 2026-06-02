// components/JoinClubInterestForm.js
"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Send,
  CheckCircle,
  XCircle,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import HeroProp from "@/components/HeroProp";
import api from "@/config/api";

const JoinClubInterestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactInfo: {
      mobile: "",
      permanentAddress: "",
      temporaryAddress: "",
    },
    education: "",
    profession: "",
    interestedToJoin: "",
    questions: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested contactInfo fields
    if (name === 'mobile' || name === 'permanentAddress' || name === 'temporaryAddress') {
      setFormData((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (
      !formData.name ||
      !formData.contactInfo.mobile ||
      !formData.email ||
      !formData.interestedToJoin
    ) {
      toast.error("Please fill all required fields!");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address!");
      setIsSubmitting(false);
      return;
    }

    // Mobile validation (Bangladesh format)
    const mobileRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    if (!mobileRegex.test(formData.contactInfo.mobile)) {
      toast.error("Please enter a valid Bangladesh mobile number!");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await api.post("/Interestforjoin/create", formData);
      
      if (response.data.success) {
        toast.success(response.data.message || "Application submitted successfully!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          contactInfo: {
            mobile: "",
            permanentAddress: "",
            temporaryAddress: "",
          },
          education: "",
          profession: "",
          interestedToJoin: "",
          questions: "",
        });
      } else {
        toast.error("Submission failed. Please try again!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || "Something went wrong! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-linear-to-br from-emerald-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    
      
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-reverse"></div>
      </div>

      <div className="relative z-10 container mx-auto ">
        <HeroProp
          title={"Join Our Community"}
          heading1={"Interest to"}
          heading2={" Join the Club"}
          content={
            "Become a part of our vibrant community. Fill out the form below to express your interest."
          }
          Icon={User}
        />

        {/* Form Card */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-linear-to-r from-emerald-600 to-cyan-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">
                Membership Interest Form
              </h2>
              <p className="text-emerald-100 mt-1">
                Please fill out all required fields (*)
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* 1. Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="w-4 h-4" />
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* 2. Mobile Number */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Phone className="w-4 h-4" />
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.contactInfo.mobile}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 017XXXXXXXX or +8801XXXXXXXXX"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Enter a valid Bangladesh mobile number
                </p>
              </div>

              {/* 3. Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="w-4 h-4" />
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* 4. Permanent Address */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MapPin className="w-4 h-4" />
                  Permanent Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="permanentAddress"
                  value={formData.contactInfo.permanentAddress}
                  onChange={handleChange}
                  required
                  rows="2"
                  placeholder="Village, Post Office, District"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* 5. Temporary Address */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MapPin className="w-4 h-4" />
                  Temporary/Current Address{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="temporaryAddress"
                  value={formData.contactInfo.temporaryAddress}
                  onChange={handleChange}
                  required
                  rows="2"
                  placeholder="Current residence address"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* 6. Educational Qualification */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <GraduationCap className="w-4 h-4" />
                  Educational Qualification{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                  placeholder="e.g., B.Sc in CSE, MBA, SSC, HSC"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* 7. Profession */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Briefcase className="w-4 h-4" />
                  Profession <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Engineer, Doctor, Businessman, Teacher"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* 8. Interested to join the club? */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <HelpCircle className="w-4 h-4" />
                  Are you interested in participating in the club?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="interestedToJoin"
                      value="yes"
                      checked={formData.interestedToJoin === "yes"}
                      onChange={handleChange}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="interestedToJoin"
                      value="no"
                      checked={formData.interestedToJoin === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">No</span>
                  </label>
                </div>
              </div>

              {/* 9. Any questions? */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MessageCircle className="w-4 h-4" />
                  Do you have any questions or queries?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="questions"
                  value={formData.questions}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Please share any questions, suggestions, or additional information..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                By submitting this form, you agree to our terms and conditions.
                We respect your privacy.
              </p>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(20px) translateX(-10px);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default JoinClubInterestForm;