// app/register/page.jsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Sparkles,
  ArrowRight,
  Users,
  Calendar,
  Flag,
  Trophy,
  Crown,
  Star,
  Zap,
  CreditCard,
  Shield,
  Gift,
  Infinity,
  Diamond,
} from "lucide-react";
import PersonalInfo from "@/components/forms/PersonalInfo";
import AddressInfo from "@/components/forms/AddressInfo";
import EducationInfo from "@/components/forms/EducationInfo";
import OccupationInfo from "@/components/forms/OccupationInfo";
import ReviewInfo from "@/components/forms/ReviewInfo";
import PaymentInfo from "@/components/forms/PaymentInfo";
import HeroProp from "@/components/HeroProp";

// Membership types - LIFETIME ONLY
export const MEMBERSHIP_TYPES = {
  BASIC: {
    id: "basic",
    name: "Basic Member",
    price: 0,
    currency: "USD",
    lifetime: true,
    features: [
      "Access to community events",
      "Basic forum participation",
      "Monthly newsletter",
      "Community support",
      "Basic profile features",
    ],
    color: "from-blue-500 to-cyan-500",
    icon: Users,
    popular: false,
    description: "Perfect for getting started"
  },
  PREMIUM: {
    id: "premium",
    name: "Premium Member",
    price: 299,
    currency: "USD",
    lifetime: true,
    features: [
      "All Basic features",
      "Exclusive webinars",
      "Priority event registration",
      "Direct messaging with experts",
      "Early access to resources",
      "Premium badge on profile",
      "Access to premium content library",
    ],
    color: "from-purple-500 to-pink-500",
    icon: Crown,
    popular: true,
    description: "Best value for active members"
  },
  ELITE: {
    id: "elite",
    name: "Elite Member",
    price: 999,
    currency: "USD",
    lifetime: true,
    features: [
      "All Premium features",
      "1-on-1 mentorship sessions",
      "VIP event access",
      "Free merchandise kit",
      "Featured member spotlight",
      "Custom profile badge",
      "Lifetime access to all future features",
      "Private networking events",
      "Executive committee eligibility",
    ],
    color: "from-amber-500 to-orange-500",
    icon: Diamond,
    popular: false,
    description: "Ultimate lifetime experience"
  },
};

// Validation schema
const userSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    phone: z
      .string()
      .regex(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "Invalid phone number",
      ),
    permanentAddress: z.object({
      street: z.string().min(1, "Street is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      postalCode: z.string().min(1, "Postal code is required"),
      country: z.string().default("Bangladesh"),
    }),
    presentAddress: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().default("Bangladesh"),
      sameAsPermanent: z.boolean().default(false),
    }),
    educationalQualification: z
      .array(
        z.object({
          degree: z.string().min(1, "Degree is required"),
          institution: z.string().min(1, "Institution is required"),
          yearOfPassing: z.number().optional(),
          grade: z.string().optional(),
          currentlyStudying: z.boolean().default(false),
        }),
      )
      .min(1, "At least one educational qualification is required"),
    occupation: z.enum([
      "student",
      "employed",
      "self_employed",
      "business",
      "unemployed",
      "retired",
      "other",
    ]),
    occupationDetails: z
      .object({
        companyName: z.string().optional(),
        position: z.string().optional(),
        yearsOfExperience: z.number().min(0).optional(),
        industry: z.string().optional(),
      })
      .optional(),
    profileImage: z.string().optional(),
    membership: z.object({
      type: z.enum(["basic", "premium", "elite"]),
      paymentMethod: z.enum(["credit_card", "paypal", "bank_transfer"]),
      cardDetails: z
        .object({
          cardNumber: z.string().optional(),
          expiryDate: z.string().optional(),
          cvv: z.string().optional(),
          cardholderName: z.string().optional(),
        })
        .optional(),
      agreeToTerms: z.boolean().refine(val => val === true, {
        message: "You must agree to the terms and conditions",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [selectedMembership, setSelectedMembership] = useState("basic");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [formData, setFormData] = useState({
    educationalQualification: [],
    presentAddress: { sameAsPermanent: false, country: "Bangladesh" },
    permanentAddress: { country: "Bangladesh" },
    occupationDetails: {},
    membership: {
      type: "basic",
      paymentMethod: "credit_card",
      cardDetails: {},
      agreeToTerms: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: formData,
  });

  const watchPresentSameAsPermanent = watch("presentAddress.sameAsPermanent");

  const getMembershipPrice = () => {
    const membership = MEMBERSHIP_TYPES[selectedMembership.toUpperCase()];
    return membership ? membership.price : 0;
  };

  const nextStep = async () => {
    let fieldsToValidate = [];

    if (step === 1)
      fieldsToValidate = [
        "name",
        "email",
        "password",
        "confirmPassword",
        "phone",
      ];
    if (step === 2) fieldsToValidate = ["permanentAddress", "presentAddress"];
    if (step === 3) fieldsToValidate = ["educationalQualification"];
    if (step === 4) fieldsToValidate = ["occupation", "occupationDetails"];
    if (step === 5) fieldsToValidate = ["membership.type", "membership.agreeToTerms"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const processPayment = async (membershipData) => {
    setIsProcessingPayment(true);
    
    // Simulate API call to payment gateway
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Lifetime payment processed:", {
          membership: membershipData,
          amount: getMembershipPrice(),
          currency: "USD",
          type: "LIFETIME",
        });
        setIsProcessingPayment(false);
        resolve(true);
      }, 2000);
    });
  };

  const onSubmit = async (data) => {
    const membershipAmount = getMembershipPrice();
    
    if (membershipAmount > 0) {
      const paymentSuccess = await processPayment(data.membership);
      if (!paymentSuccess) {
        alert("Payment failed. Please try again.");
        return;
      }
    }
    
    console.log("Form submitted:", {
      ...data,
      membership: {
        ...data.membership,
        amount: membershipAmount,
        type: "LIFETIME",
      },
    });
    alert(`✅ Registration successful! Welcome as a ${MEMBERSHIP_TYPES[selectedMembership.toUpperCase()].name}! 🎉`);
  };

  const steps = [
    { number: 1, title: "Personal Info", component: PersonalInfo },
    { number: 2, title: "Address Info", component: AddressInfo },
    { number: 3, title: "Education", component: EducationInfo },
    { number: 4, title: "Occupation", component: OccupationInfo },
    { number: 5, title: "Membership", component: PaymentInfo },
    { number: 6, title: "Review", component: ReviewInfo },
  ];

  const CurrentStepComponent = steps[step - 1].component;

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Small Hero Section */}
      <HeroProp
        title="Join Our Community"
        heading1=" Create Your"
        heading2="Account"
        content="Join our vibrant community hub — where connections flourish, events inspire, 
              and collective action drives meaningful change."
        Icon={Sparkles}      
      />

      {/* Form Section */}
      <div className="container mx-auto px-4 py-8 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6 bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between mb-2 overflow-x-auto pb-2">
              {steps.map((s, idx) => (
                <div key={idx} className="flex flex-col items-center min-w-15">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all
                      ${step > idx + 1 ? "bg-emerald-500 text-white" : ""}
                      ${step === idx + 1 ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-md scale-105" : ""}
                      ${step < idx + 1 ? "bg-gray-300 text-gray-600" : ""}
                    `}
                  >
                    {step > idx + 1 ? "✓" : s.number}
                  </div>
                  <span
                    className={`text-xs mt-1 whitespace-nowrap ${step === idx + 1 ? "text-emerald-600 font-medium" : "text-gray-500"}`}
                  >
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div
                className="bg-linear-to-r from-emerald-600 to-teal-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 transition-all duration-300">
              {step === 5 ? (
                <PaymentInfo
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  formData={formData}
                  setFormData={setFormData}
                  selectedMembership={selectedMembership}
                  setSelectedMembership={setSelectedMembership}
                  MEMBERSHIP_TYPES={MEMBERSHIP_TYPES}
                />
              ) : (
                <CurrentStepComponent
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  formData={formData}
                  setFormData={setFormData}
                  watchPresentSameAsPermanent={watchPresentSameAsPermanent}
                />
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={isProcessingPayment}
                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                )}
                {step < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={isProcessingPayment}
                    className="px-5 py-2 bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 ml-auto text-sm font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className="px-5 py-2 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300 ml-auto text-sm font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isProcessingPayment ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing Lifetime Membership...
                      </>
                    ) : (
                      "Get Lifetime Membership ✓"
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}