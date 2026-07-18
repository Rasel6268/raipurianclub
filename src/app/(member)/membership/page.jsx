// app/membership/page.jsx
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
  Shield,
  Coffee,
  Car,
  Home,
  Infinity,
  Medal,
  PiggyBank,
  GitBranch,
  Layers,
  DollarSign,
  Clock,
  BadgeCheck,
  Wallet,
  Zap,
  Rocket,
  TrendingUp,
  Gem,
  Diamond,
  Trophy,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MembershipPlans = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  // Membership categories based on the provided data
  const membershipCategories = [
    {
      id: 'patron',
      name: 'Patron Member',
      icon: Crown,
      color: 'from-amber-500 to-orange-500',
      gradient: 'from-amber-600 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      borderColor: 'border-amber-200',
      fee: '৳10,00,000',
      period: 'One-time',
      badge: 'Premium',
      badgeColor: 'bg-amber-500',
      description: 'The highest level of membership for distinguished individuals.',
      features: [
        { name: 'Voting Rights', included: true },
        { name: 'Priority 1 Service', included: true },
        { name: '50% General Discount', included: true },
        { name: '25% Food Discount', included: true },
        { name: 'Unlimited Guests', included: true },
        { name: 'Inheritance', included: true },
        { name: 'Transferable', included: true },
        { name: 'Separate Honour Board', included: true },
        { name: 'Beverage Discount', included: false },
      ],
      eligibility: [
        'Minimum age: 60+ years',
        'Education: Post Graduation',
        'Must be a Raipurian',
        'Must be a Professional',
        'Not actively involved in politics',
      ],
      popular: false,
    },
    {
      id: 'donor',
      name: 'Donor Member',
      icon: Gift,
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-600 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200',
      fee: '৳6,00,000',
      period: 'One-time',
      badge: 'Elite',
      badgeColor: 'bg-purple-500',
      description: 'For generous contributors who support the club\'s growth.',
      features: [
        { name: 'Voting Rights', included: true },
        { name: 'Priority 1 Service', included: true },
        { name: '45% General Discount', included: true },
        { name: '20% Food Discount', included: true },
        { name: 'Unlimited Guests', included: true },
        { name: 'Inheritance', included: true },
        { name: 'Transferable', included: false },
        { name: 'Separate Honour Board', included: true },
        { name: 'Beverage Discount', included: false },
      ],
      eligibility: [
        'Minimum age: 45+ years',
        'Education: Graduate',
        'Must be a Raipurian',
        'Must be a Professional/Well-established',
        'Not actively involved in politics',
      ],
      popular: false,
    },
    {
      id: 'founder',
      name: 'Founder Member',
      icon: Star,
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-600 to-cyan-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      fee: '৳2,00,000',
      period: 'One-time',
      badge: 'Founder',
      badgeColor: 'bg-blue-500',
      description: 'Founding members who helped establish the club.',
      features: [
        { name: 'Voting Rights', included: true },
        { name: 'Priority 1 Service', included: true },
        { name: '40% General Discount', included: true },
        { name: '20% Food Discount', included: true },
        { name: 'Unlimited Guests', included: true },
        { name: 'Inheritance', included: true },
        { name: 'Transferable', included: true },
        { name: 'EC Eligibility', included: true },
        { name: 'Beverage Discount', included: false },
      ],
      eligibility: [
        'Minimum age: 18+ years',
        'Education: Graduate',
        'Must be a Raipurian',
        'Must be Professionally established',
        'Not actively involved in Raipur politics',
        'Monthly subscription applicable first year',
      ],
      popular: true,
    },
    {
      id: 'life',
      name: 'Life Member',
      icon: Infinity,
      color: 'from-emerald-500 to-teal-500',
      gradient: 'from-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-200',
      fee: '৳4,00,000',
      period: 'One-time',
      badge: 'Lifetime',
      badgeColor: 'bg-emerald-500',
      description: 'Lifetime access to all club benefits and privileges.',
      features: [
        { name: 'Voting Rights', included: true },
        { name: 'Priority 2 Service', included: true },
        { name: '35% General Discount', included: true },
        { name: '20% Food Discount', included: true },
        { name: 'Up to 6 Guests', included: true },
        { name: 'Inheritance', included: true },
        { name: 'Transferable', included: true },
        { name: 'EC Eligibility', included: true },
        { name: 'Beverage Discount', included: false },
      ],
      eligibility: [
        'Minimum age: 18+ years',
        'Education: Graduate',
        'Must be a Raipurian',
        'Must be a Professional/Well-established',
        'Not actively involved in Raipur politics',
        'Monthly subscription applicable first year',
      ],
      popular: false,
    },
    {
      id: 'general',
      name: 'General/Permanent Member',
      icon: Users,
      color: 'from-indigo-500 to-blue-500',
      gradient: 'from-indigo-600 to-blue-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      borderColor: 'border-indigo-200',
      fee: '৳2,00,000',
      period: 'One-time',
      badge: 'Standard',
      badgeColor: 'bg-indigo-500',
      description: 'Standard membership for regular community members.',
      features: [
        { name: 'Voting Rights', included: false },
        { name: 'Priority 3 Service', included: true },
        { name: '25% General Discount', included: true },
        { name: '20% Food Discount', included: true },
        { name: 'Up to 4 Guests', included: true },
        { name: 'Inheritance', included: true },
        { name: 'Transferable', included: true },
        { name: 'Beverage Discount', included: false },
      ],
      eligibility: [
        'Minimum age: 18+ years',
        'Education: HSC',
        'Must be a Raipurian',
        'Must be Well-established',
        'Any political ideology accepted',
        'Monthly subscription applicable',
      ],
      popular: false,
    },
    {
      id: 'associate',
      name: 'Associate/Use Member',
      icon: Users,
      color: 'from-gray-500 to-slate-500',
      gradient: 'from-gray-600 to-slate-600',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-200',
      fee: '৳50,000',
      period: 'One-time',
      badge: 'Basic',
      badgeColor: 'bg-gray-500',
      description: 'Affordable membership for basic access and facilities.',
      features: [
        { name: 'Voting Rights', included: false },
        { name: 'Priority 4 Service', included: true },
        { name: 'General Discount', included: false },
        { name: 'Food Discount', included: false },
        { name: 'Up to 4 Guests', included: true },
        { name: 'Inheritance', included: false },
        { name: 'Transferable', included: false },
        { name: 'Beverage Discount', included: false },
      ],
      eligibility: [
        'Minimum age: 18+ years',
        'Education: HSC',
        'Location: Not specified',
        'Profession: Not specified',
        'Monthly subscription applicable',
      ],
      popular: false,
    },
    {
      id: 'honorary',
      name: 'Honorary Member',
      icon: Medal,
      color: 'from-rose-500 to-red-500',
      gradient: 'from-rose-600 to-red-600',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700',
      borderColor: 'border-rose-200',
      fee: 'No Fee',
      period: 'Honorary',
      badge: 'Honorary',
      badgeColor: 'bg-rose-500',
      description: 'Recognized individuals for their exceptional contributions.',
      features: [
        { name: 'Voting Rights', included: false },
        { name: 'Priority 1 Service', included: true },
        { name: 'General Discount', included: false },
        { name: '10% Food Discount', included: true },
        { name: 'Unlimited Guests', included: true },
        { name: 'Inheritance', included: false },
        { name: 'Transferable', included: false },
        { name: 'Beverage Discount', included: false },
      ],
      eligibility: [
        'Minimum age: 35+ years',
        'Education: Post Graduation',
        'Specific appointments/posts',
        'Based on special recognition',
        'Position, contribution, or service',
      ],
      popular: false,
    },
  ];

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

    // Animate cards with stagger
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const formatCurrency = (amount) => {
    if (amount === 'No Fee') return amount;
    return amount;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-reverse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full px-4 py-1.5 mb-4">
            <Crown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Membership Plans
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Membership
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore our membership tiers and find the perfect plan that matches your needs.
            Each category offers unique benefits and privileges.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link 
              href="/membership/compare"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              Compare Plans
            </Link>
            <Link 
              href="/register"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
            >
              <Award className="w-4 h-4" />
              Apply Now
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Plans', value: membershipCategories.length, icon: Layers },
            { label: 'Starting From', value: '৳50,000', icon: DollarSign },
            { label: 'Voting Rights', value: '4 Plans', icon: Shield },
            { label: 'Premium Plans', value: '3 Plans', icon: Crown },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md text-center border border-gray-200 dark:border-gray-700">
              <stat.icon className="w-6 h-6 mx-auto text-emerald-600 dark:text-emerald-400 mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Membership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {membershipCategories.map((category, index) => {
            const Icon = category.icon;
            const isPopular = category.popular;
            
            return (
              <div
                key={category.id}
                ref={el => cardsRef.current[index] = el}
                className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  isPopular ? 'ring-2 ring-emerald-500 ring-offset-2' : ''
                }`}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg animate-pulse">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Card Header */}
                <div className={`p-6 bg-gradient-to-r ${category.color} text-white`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-medium mb-2">
                        {category.badge}
                      </div>
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <p className="text-white/90 text-sm mt-1">{category.description}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="mt-4">
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold">{formatCurrency(category.fee)}</span>
                      {category.period !== 'Honorary' && category.fee !== 'No Fee' && (
                        <span className="text-white/80 text-sm font-medium">{category.period}</span>
                      )}
                    </div>
                    {category.fee === 'No Fee' && (
                      <span className="text-white/80 text-sm font-medium">Honorary Appointment</span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Key Benefits
                    </h4>
                    <div className="space-y-2">
                      {category.features.slice(0, 6).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          {feature.included ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <BadgeCheck className="w-4 h-4 text-blue-500" />
                      Eligibility
                    </h4>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {category.eligibility.slice(0, 4).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                      {category.eligibility.length > 4 && (
                        <li className="text-gray-400 text-xs">+ {category.eligibility.length - 4} more conditions</li>
                      )}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/membership/${category.id}`}
                      className="w-full py-2.5 rounded-lg font-medium text-center transition-all duration-300 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/register"
                      className="w-full py-2.5 rounded-lg font-medium text-center transition-all duration-300 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <Rocket className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-2">Ready to Join The Raipur Club?</h3>
              <p className="mb-6 opacity-95 max-w-md mx-auto">
                Choose the membership that fits you best and become part of our exclusive community
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/membership/compare"
                  className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <GitBranch className="w-5 h-5" />
                  Compare All Plans
                </Link>
                <Link
                  href="/register"
                  className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  Apply for Membership
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "How do I know which membership is right for me?",
                a: "Consider your needs, budget, and eligibility. Use our comparison tool to see all benefits side by side."
              },
              {
                q: "Can I upgrade my membership later?",
                a: "Yes! You can upgrade to a higher tier by paying the difference in fees."
              },
              {
                q: "What payment methods are accepted?",
                a: "We accept bKash, Nagad, and bank transfers for membership payments."
              },
              {
                q: "Is there a refund policy?",
                a: "Membership fees are generally non-refundable unless otherwise decided by the Club's authorized authority."
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
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
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default MembershipPlans;