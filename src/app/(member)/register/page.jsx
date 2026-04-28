// app/register/page.jsx
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles, ArrowRight, Users, Calendar, Flag, Trophy } from 'lucide-react';
import PersonalInfo from '@/components/forms/PersonalInfo';
import AddressInfo from '@/components/forms/AddressInfo';
import EducationInfo from '@/components/forms/EducationInfo';
import OccupationInfo from '@/components/forms/OccupationInfo';
import ReviewInfo from '@/components/forms/ReviewInfo';

// Validation schema
const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number'),
  permanentAddress: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().default('Bangladesh'),
  }),
  presentAddress: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().default('Bangladesh'),
    sameAsPermanent: z.boolean().default(false),
  }),
  educationalQualification: z.array(z.object({
    degree: z.string().min(1, 'Degree is required'),
    institution: z.string().min(1, 'Institution is required'),
    yearOfPassing: z.number().optional(),
    grade: z.string().optional(),
    currentlyStudying: z.boolean().default(false),
  })).min(1, 'At least one educational qualification is required'),
  occupation: z.enum(['student', 'employed', 'self_employed', 'business', 'unemployed', 'retired', 'other']),
  occupationDetails: z.object({
    companyName: z.string().optional(),
    position: z.string().optional(),
    yearsOfExperience: z.number().min(0).optional(),
    industry: z.string().optional(),
  }).optional(),
  profileImage: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    educationalQualification: [],
    presentAddress: { sameAsPermanent: false, country: 'Bangladesh' },
    permanentAddress: { country: 'Bangladesh' },
    occupationDetails: {}
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

  const watchPresentSameAsPermanent = watch('presentAddress.sameAsPermanent');

  const nextStep = async () => {
    let fieldsToValidate = [];
    
    if (step === 1) fieldsToValidate = ['name', 'email', 'password', 'confirmPassword', 'phone'];
    if (step === 2) fieldsToValidate = ['permanentAddress', 'presentAddress'];
    if (step === 3) fieldsToValidate = ['educationalQualification'];
    if (step === 4) fieldsToValidate = ['occupation', 'occupationDetails'];
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    alert('Registration successful!');
  };

  const steps = [
    { number: 1, title: 'Personal Info', component: PersonalInfo },
    { number: 2, title: 'Address Info', component: AddressInfo },
    { number: 3, title: 'Education', component: EducationInfo },
    { number: 4, title: 'Occupation', component: OccupationInfo },
    { number: 5, title: 'Review', component: ReviewInfo },
  ];

  const CurrentStepComponent = steps[step - 1].component;

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Small Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-r from-emerald-900/70 via-teal-900/50 to-cyan-900/70 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
            alt="Community gathering"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="absolute top-10 left-5 w-40 h-40 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-5 w-48 h-48 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 py-12 md:py-16">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 mb-4 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-medium text-white/90">Join Our Community</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
              Create Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  Account
                </span>
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2 text-emerald-400/30"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 4 L100 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-sm md:text-base text-white/85 max-w-2xl mx-auto mb-6">
              Join our vibrant community hub — where connections flourish, events inspire, 
              and collective action drives meaningful change.
            </p>

            {/* Compact Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-0">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-300" />
                <div className="text-lg font-bold text-white">2.5K+</div>
                <div className="text-xs text-white/70">Members</div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-300" />
                <div className="text-lg font-bold text-white">60+</div>
                <div className="text-xs text-white/70">Events</div>
              </div>
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-emerald-300" />
                <div className="text-lg font-bold text-white">24+</div>
                <div className="text-xs text-white/70">Initiatives</div>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-emerald-300" />
                <div className="text-lg font-bold text-white">15+</div>
                <div className="text-xs text-white/70">Awards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-8 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6 bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between mb-2">
              {steps.map((s, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all
                      ${step > idx + 1 ? 'bg-emerald-500 text-white' : ''}
                      ${step === idx + 1 ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md scale-105' : ''}
                      ${step < idx + 1 ? 'bg-gray-300 text-gray-600' : ''}
                    `}
                  >
                    {step > idx + 1 ? '✓' : s.number}
                  </div>
                  <span className={`text-xs mt-1 ${step === idx + 1 ? 'text-emerald-600 font-medium' : 'text-gray-500'}`}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div
                className="bg-gradient-to-r from-emerald-600 to-teal-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 transition-all duration-300">
              <CurrentStepComponent
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                formData={formData}
                setFormData={setFormData}
                watchPresentSameAsPermanent={watchPresentSameAsPermanent}
              />

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 text-sm font-medium"
                  >
                    ← Previous
                  </button>
                )}
                {step < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 ml-auto text-sm font-medium shadow-md"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300 ml-auto text-sm font-medium shadow-md"
                  >
                    Submit Registration ✓
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