// app/membership/compare/page.jsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Crown,
  Star,
  Sparkles,
  CheckCircle,
  XCircle,
  ArrowRight,
  Heart,
  Calendar,
  Users,
  Award,
  Gift,
  Zap,
  Shield,
  Coffee,
  Wifi,
  Car,
  Home,
  Bell,
  CreditCard,
  TrendingUp,
  Rocket,
  Gem,
  Diamond,
  Medal,
  Trophy,
  Infinity,
  Clock,
  BadgeCheck,
  Wallet,
  PiggyBank,
  Globe,
  Lock,
  Unlock,
  Mail,
  Phone,
  MapPin,
  Video,
  Headphones,
  FileText,
  Share2,
  ThumbsUp,
  GitBranch,
  Layers,
  BarChart3,
  DollarSign,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TicketIcon = ({ className }) => (
  <span className={className}>🎟️</span>
);

const BookOpenIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const MembershipCompare = () => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const tableRef = useRef(null);
  const headerRef = useRef(null);

  // Membership categories based on the provided data
  const membershipCategories = [
    {
      id: 'patron',
      name: 'Patron Member',
      icon: Crown,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      fee: '৳10,00,000',
      features: {
        age: '60+ years',
        education: 'Post Graduation',
        location: 'Raipurian',
        profession: 'Professional',
        politics: 'Not actively involved',
        voting: 'Yes',
        servicePriority: 'Priority 1',
        generalDiscount: '50%',
        foodDiscount: '25%',
        beverageDiscount: 'Not applicable',
        maxGuests: 'Unlimited',
        inheritance: 'Yes',
        transferability: 'Yes',
        honourBoard: 'Separate Honour Board',
        execCommittee: 'Meetings only',
        monthlySubscription: 'Not applicable',
      }
    },
    {
      id: 'donor',
      name: 'Donor Member',
      icon: Gift,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      fee: '৳6,00,000',
      features: {
        age: '45+ years',
        education: 'Graduate',
        location: 'Raipurian',
        profession: 'Professional/Well-established',
        politics: 'Not actively involved',
        voting: 'Yes',
        servicePriority: 'Priority 1',
        generalDiscount: '45%',
        foodDiscount: '20%',
        beverageDiscount: 'Not applicable',
        maxGuests: 'Unlimited',
        inheritance: 'Yes',
        transferability: 'No',
        honourBoard: 'Separate Honour Board',
        execCommittee: 'Meetings only',
        monthlySubscription: 'Not applicable',
      }
    },
    {
      id: 'founder',
      name: 'Founder Member',
      icon: Star,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      fee: '৳2,00,000',
      features: {
        age: '18+ years',
        education: 'Graduate',
        location: 'Raipurian',
        profession: 'Professionally established',
        politics: 'Not actively involved in Raipur',
        voting: 'Yes',
        servicePriority: 'Priority 1',
        generalDiscount: '40%',
        foodDiscount: '20%',
        beverageDiscount: 'Not applicable',
        maxGuests: 'Unlimited',
        inheritance: 'Yes',
        transferability: 'Yes',
        honourBoard: 'Separate Honour Board',
        execCommittee: 'Eligible for Executive Committee',
        monthlySubscription: 'Applicable first year',
      }
    },
    {
      id: 'life',
      name: 'Life Member',
      icon: Infinity,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      fee: '৳4,00,000',
      features: {
        age: '18+ years',
        education: 'Graduate',
        location: 'Raipurian',
        profession: 'Professional/Well-established',
        politics: 'Not actively involved in Raipur',
        voting: 'Yes',
        servicePriority: 'Priority 2',
        generalDiscount: '35%',
        foodDiscount: '20%',
        beverageDiscount: 'Not applicable',
        maxGuests: 'Up to 6',
        inheritance: 'Yes',
        transferability: 'Yes',
        honourBoard: 'Not applicable',
        execCommittee: 'Eligible for Executive Committee',
        monthlySubscription: 'Applicable first year',
      }
    },
    {
      id: 'general',
      name: 'General/Permanent Member',
      icon: Users,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      fee: '৳2,00,000',
      features: {
        age: '18+ years',
        education: 'HSC',
        location: 'Raipurian',
        profession: 'Well-established',
        politics: 'Any ideology accepted',
        voting: 'No',
        servicePriority: 'Priority 3',
        generalDiscount: '25%',
        foodDiscount: '20%',
        beverageDiscount: 'Not applicable',
        maxGuests: 'Up to 4',
        inheritance: 'Yes',
        transferability: 'Yes',
        honourBoard: 'Not applicable',
        execCommittee: 'Not applicable',
        monthlySubscription: 'Applicable',
      }
    },
    {
      id: 'associate',
      name: 'Associate/Use Member',
      icon: Users,
      color: 'from-gray-500 to-slate-500',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700',
      fee: '৳50,000',
      features: {
        age: '18+ years',
        education: 'HSC',
        location: 'Not specified',
        profession: 'Not specified',
        politics: 'Not specified',
        voting: 'No',
        servicePriority: 'Priority 4',
        generalDiscount: 'Not applicable',
        foodDiscount: 'Not applicable',
        beverageDiscount: 'Not applicable',
        maxGuests: 'Up to 4',
        inheritance: 'No',
        transferability: 'No',
        honourBoard: 'Not applicable',
        execCommittee: 'Not applicable',
        monthlySubscription: 'Applicable',
      }
    },
    {
      id: 'honorary',
      name: 'Honorary Member',
      icon: Medal,
      color: 'from-rose-500 to-red-500',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700',
      fee: 'No Fee',
      features: {
        age: '35+ years',
        education: 'Post Graduation',
        location: 'Not specified',
        profession: 'Specific appointments/posts',
        politics: 'Not specified',
        voting: 'No',
        servicePriority: 'Priority 1',
        generalDiscount: 'Not applicable',
        foodDiscount: '10%',
        beverageDiscount: 'Not applicable',
        maxGuests: 'Unlimited',
        inheritance: 'No',
        transferability: 'No',
        honourBoard: 'Not applicable',
        execCommittee: 'Not applicable',
        monthlySubscription: 'Not applicable',
      }
    },
  ];

  // Feature categories for comparison
  const featureCategories = [
    {
      category: 'Eligibility Requirements',
      features: ['age', 'education', 'location', 'profession', 'politics']
    },
    {
      category: 'Membership Benefits',
      features: ['voting', 'servicePriority', 'generalDiscount', 'foodDiscount', 'beverageDiscount', 'maxGuests']
    },
    {
      category: 'Additional Features',
      features: ['inheritance', 'transferability', 'honourBoard', 'execCommittee', 'monthlySubscription']
    }
  ];

  const featureLabels = {
    age: 'Minimum Age',
    education: 'Education',
    location: 'Location',
    profession: 'Profession',
    politics: 'Political Involvement',
    voting: 'Voting Rights',
    servicePriority: 'Service Priority',
    generalDiscount: 'General Service Discount',
    foodDiscount: 'Food Discount',
    beverageDiscount: 'Beverage Discount',
    maxGuests: 'Maximum Guests',
    inheritance: 'Inheritance',
    transferability: 'Transferability',
    honourBoard: 'Honour Board',
    execCommittee: 'Executive Committee',
    monthlySubscription: 'Monthly Subscription',
  };

  useEffect(() => {
    // Animate header
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate table rows
    const rows = document.querySelectorAll('.comparison-row');
    rows.forEach((row, index) => {
      gsap.fromTo(row,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: index * 0.05,
          scrollTrigger: {
            trigger: row,
            start: "top 95%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const getFeatureValue = (member, featureKey) => {
    const value = member.features[featureKey];
    if (typeof value === 'boolean') {
      return value ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-red-400 mx-auto" />;
    }
    return value || '—';
  };

  const getFeatureColor = (member, featureKey) => {
    const value = member.features[featureKey];
    if (typeof value === 'boolean') {
      return value ? 'text-green-500' : 'text-red-400';
    }
    if (value === 'Yes' || value === 'Unlimited' || value.includes('Eligible')) {
      return 'text-green-600';
    }
    if (value === 'No' || value === 'Not applicable' || value === 'Not specified') {
      return 'text-gray-400';
    }
    return 'text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-slow"></div>
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-reverse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 rounded-full px-4 py-1.5 mb-4">
            <GitBranch className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Membership Comparison
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Compare All{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Membership Plans
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Find the perfect membership tier that matches your needs, preferences, and eligibility.
            Compare features, benefits, and pricing side by side.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link 
              href="/membership"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <Crown className="w-4 h-4" />
              View Plans
            </Link>
            <Link 
              href="/register"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
            >
              <Award className="w-4 h-4" />
              Join Now
            </Link>
          </div>
        </div>

        {/* Membership Cards Preview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {membershipCategories.map((member) => {
            const Icon = member.icon;
            return (
              <div
                key={member.id}
                className={`p-3 rounded-xl text-center transition-all duration-300 hover:scale-105 ${member.bgColor} border border-gray-200 dark:border-gray-700 cursor-pointer`}
                onMouseEnter={() => setSelectedTier(member.id)}
                onMouseLeave={() => setSelectedTier(null)}
              >
                <div className={`w-10 h-10 mx-auto rounded-full bg-gradient-to-r ${member.color} flex items-center justify-center mb-2`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">{member.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-semibold">{member.fee}</p>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <th className="px-4 py-4 text-left text-sm font-semibold text-white sticky left-0 bg-gradient-to-r from-blue-600 to-purple-600 min-w-[180px]">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      Features & Benefits
                    </div>
                  </th>
                  {membershipCategories.map((member) => (
                    <th key={member.id} className="px-3 py-4 text-center text-sm font-semibold text-white min-w-[120px]">
                      <div className="flex flex-col items-center">
                        <span className="text-xs opacity-80">{member.fee}</span>
                        <span className="text-xs font-medium mt-1">{member.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureCategories.map((category) => (
                  <React.Fragment key={category.category}>
                    <tr className="bg-gray-50 dark:bg-gray-700/50">
                      <td colSpan={membershipCategories.length + 1} className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((featureKey) => (
                      <tr 
                        key={featureKey}
                        className={`comparison-row hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${
                          hoveredRow === featureKey ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                        onMouseEnter={() => setHoveredRow(featureKey)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                          {featureLabels[featureKey] || featureKey}
                        </td>
                        {membershipCategories.map((member) => {
                          const value = getFeatureValue(member, featureKey);
                          const color = getFeatureColor(member, featureKey);
                          return (
                            <td key={`${member.id}-${featureKey}`} className="px-3 py-3 text-center text-sm">
                              <div className={`${color} flex items-center justify-center`}>
                                {typeof member.features[featureKey] === 'boolean' 
                                  ? value
                                  : <span className="text-xs">{value}</span>
                                }
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Available/Yes</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span>Not Available/No</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></span>
            <span>Highlighted Category</span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Ready to Join the Community?</h3>
              <p className="mb-6 opacity-95 max-w-md mx-auto">
                Choose your membership plan and start enjoying exclusive benefits today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/membership"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Crown className="w-5 h-5" />
                  View All Plans
                </Link>
                <Link
                  href="/register"
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Memberships', value: membershipCategories.length, icon: Users },
            { label: 'Highest Fee', value: '৳10,00,000', icon: DollarSign },
            { label: 'Lowest Fee', value: '৳50,000', icon: PiggyBank },
            { label: 'Voting Rights', value: '4 Categories', icon: Shield },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md text-center border border-gray-200 dark:border-gray-700">
              <stat.icon className="w-6 h-6 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MembershipCompare;