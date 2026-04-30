'use client';
import React, { useState, useEffect, useRef } from 'react';
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
  MessageCircle,
  Award,
  Gift,
  Zap,
  Shield,
  Coffee,
  Dumbbell,
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
  Flower2,
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
  Crown as CrownIcon,
} from 'lucide-react';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Helper Components
const TicketIcon = ({ className }) => (
  <span className={className}>🎟️</span>
);

const BookOpenIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const LifetimeMembership = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const pricingRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  // Lifetime pricing tiers data
  const pricingTiers = [
    {
      id: 'lifetime_basic',
      name: 'Lifetime Basic',
      subTitle: 'Forever Access',
      icon: Heart,
      price: 299,
      originalPrice: 599,
      period: 'one-time',
      color: 'from-slate-500 to-gray-500',
      gradient: 'from-slate-600 to-gray-600',
      bgGradient: 'from-slate-50 to-gray-50',
      textColor: 'text-slate-600',
      borderColor: 'border-slate-200',
      badge: 'Limited Time',
      savings: 'Save 50%',
      features: [
        { name: 'Lifetime Event Access', included: true, icon: Calendar },
        { name: 'Lifetime Newsletter', included: true, icon: Mail },
        { name: 'Community Forum Access', included: true, icon: Users },
        { name: '10% Event Discounts', included: true, icon: TicketIcon },
        { name: 'Basic Workshops', included: true, icon: BookOpenIcon },
        { name: 'Standard Support', included: true, icon: Headphones },
        { name: 'Member-only Events', included: false, icon: Crown },
        { name: 'Premium Networking', included: false, icon: Users },
        { name: 'Free Event Tickets', included: false, icon: Gift },
        { name: 'VIP Lounge Access', included: false, icon: Coffee },
      ],
      recommended: false,
      ctaText: 'Get Lifetime Access',
      popular: false,
    },
    {
      id: 'lifetime_premium',
      name: 'Lifetime Premium',
      subTitle: 'Best Value - Lifetime',
      icon: Diamond,
      price: 599,
      originalPrice: 1199,
      period: 'one-time',
      color: 'from-emerald-500 to-teal-500',
      gradient: 'from-emerald-600 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
      badge: 'Most Popular',
      savings: 'Save 50%',
      features: [
        { name: 'Lifetime Event Access', included: true, icon: Calendar },
        { name: 'Lifetime Newsletter', included: true, icon: Mail },
        { name: 'Community Forum Access', included: true, icon: Users },
        { name: '25% Event Discounts', included: true, icon: TicketIcon },
        { name: 'All Premium Workshops', included: true, icon: BookOpenIcon },
        { name: 'Priority Support', included: true, icon: Headphones },
        { name: 'Member-only Events', included: true, icon: Crown },
        { name: 'Elite Networking', included: true, icon: Users },
        { name: '2 Free Tickets/Year', included: true, icon: Gift },
        { name: 'Lifetime Achievement Badge', included: true, icon: Trophy },
      ],
      recommended: true,
      ctaText: 'Get Premium Lifetime',
      popular: true,
    },
    {
      id: 'lifetime_elite',
      name: 'Lifetime Elite',
      subTitle: 'Ultimate Lifetime',
      icon: Crown,
      price: 999,
      originalPrice: 1999,
      period: 'one-time',
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-600 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      badge: 'VIP Forever',
      savings: 'Save 50%',
      features: [
        { name: 'Lifetime Event Access', included: true, icon: Calendar },
        { name: 'Lifetime Newsletter', included: true, icon: Mail },
        { name: 'Community Forum Access', included: true, icon: Users },
        { name: '50% Event Discounts', included: true, icon: TicketIcon },
        { name: 'All Elite Workshops', included: true, icon: BookOpenIcon },
        { name: '24/7 VIP Support', included: true, icon: Headphones },
        { name: 'VIP Member-only Events', included: true, icon: Crown },
        { name: 'VIP Networking Sessions', included: true, icon: Users },
        { name: '4 Free Tickets/Year', included: true, icon: Gift },
        { name: 'VIP Lounge Access', included: true, icon: Coffee },
        { name: 'Free Parking Pass', included: true, icon: Car },
        { name: 'Annual Retreat Invite', included: true, icon: Home },
      ],
      recommended: false,
      ctaText: 'Get Elite Lifetime',
      popular: false,
    },
  ];

  // Handle purchase click
  const handlePurchase = (tier) => {
    setSelectedPlan(tier);
    setShowPaymentModal(true);
    
    // Animate modal
    gsap.fromTo(".payment-modal",
      { opacity: 0, scale: 0.9, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" }
    );
  };

  // Initialize GSAP animations
  useEffect(() => {
    // Title animations
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Card animations with stagger
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Floating animation for popular badge
    gsap.to(".popular-badge", {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Price Card Component
  const PriceCard = ({ tier, index }) => {
    const IconComponent = tier.icon;
    const savingsPercent = Math.round(((tier.originalPrice - tier.price) / tier.originalPrice) * 100);
    
    return (
      <div
        ref={el => cardsRef.current[index] = el}
        className="group relative transition-all duration-500 transform hover:scale-105"
      >
        {/* Card Container */}
        <div className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden ${
          tier.recommended ? 'ring-2 ring-emerald-500 ring-offset-2' : ''
        }`}>
          {/* Gradient Border Effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${tier.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
          
          {/* Popular Badge */}
          {tier.popular && (
            <div className="popular-badge absolute top-4 right-4 z-10">
              <div className={`bg-gradient-to-r ${tier.gradient} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg`}>
                <Sparkles className="w-3 h-3" />
                {tier.badge}
              </div>
            </div>
          )}

          {/* Savings Badge */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <PiggyBank className="w-3 h-3" />
              Save {savingsPercent}%
            </div>
          </div>

          {/* Card Header */}
          <div className={`p-6 text-center border-b ${tier.borderColor} dark:border-gray-700`}>
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${tier.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <h3 className={`text-xl font-bold ${tier.textColor} dark:text-white`}>{tier.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tier.subTitle}</p>
            
            {/* Price Display */}
            <div className="mt-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl font-bold text-gray-800 dark:text-white">
                  ${tier.price}
                </span>
                <span className="text-gray-400 line-through text-sm">${tier.originalPrice}</span>
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
                One-time payment • Lifetime access
              </p>
              <div className="mt-2 inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                <Infinity className="w-3 h-3 text-emerald-600" />
                <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Never expires</span>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
            {tier.features.slice(0, 10).map((feature, idx) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={idx} className="flex items-center gap-3 group/feature">
                  {feature.included ? (
                    <CheckCircle className={`w-4 h-4 ${tier.textColor} flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200`} />
                  ) : (
                    <XCircle className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500 line-through'}`}>
                    {feature.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="p-6 pt-0">
            <button
              onClick={() => handlePurchase(tier)}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-r ${tier.gradient} text-white flex items-center justify-center gap-2 group/btn`}
            >
              <Infinity className="w-4 h-4" />
              {tier.ctaText}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-3">
              Lifetime warranty • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Payment Modal Component
  const PaymentModal = ({ plan, onClose }) => {
    if (!plan) return null;
    
    const savingsPercent = Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100);
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="payment-modal relative bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <XCircle className="w-5 h-5" />
          </button>
          
          <div className={`p-6 text-center border-b ${plan.borderColor}`}>
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}>
              <Infinity className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{plan.name}</h3>
            <div className="mt-2">
              <span className="text-3xl font-bold text-gray-800 dark:text-white">${plan.price}</span>
              <span className="text-gray-500"> one-time</span>
            </div>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">Save {savingsPercent}% compared to monthly</p>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Infinity className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">Lifetime Benefits Include:</span>
              </div>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">✓ Never pay again</li>
                <li className="flex items-center gap-2">✓ Lifetime updates included</li>
                <li className="flex items-center gap-2">✓ Priority support forever</li>
                <li className="flex items-center gap-2">✓ Transferable to family member</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                Purchase Lifetime Access
              </button>
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                30-day money-back guarantee • Secure payment
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 w-125 h-125 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse-slow"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 animate-bounce-in">
            <Infinity className="w-4 h-4" />
            <span className="text-sm font-medium">Lifetime Membership</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4">
            Pay Once,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Benefit Forever</span>
              <svg className="absolute -bottom-3 left-0 w-full h-4 text-white/30" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M0 4 L100 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Join our lifetime membership program and enjoy unlimited benefits, exclusive access, and premium support — forever.
          </p>
          
          {/* Lifetime Savings Calculator */}
          <div className="mt-8 inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <PiggyBank className="w-5 h-5" />
            <span className="text-sm">Average lifetime savings: <span className="font-bold">$2,400+</span></span>
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div ref={pricingRef} className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full px-4 py-1.5 mb-4">
            <Infinity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Lifetime Access
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Lifetime Plan
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select the lifetime membership that fits your needs. One payment, unlimited benefits forever.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier, index) => (
            <PriceCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        {/* Lifetime Value Comparison */}
        <div className="mt-20 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <Infinity className="w-6 h-6" />
              Lifetime Value Comparison
              <Infinity className="w-6 h-6" />
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white/10 rounded-xl">
                <p className="text-sm opacity-80">Monthly Subscription (5 years)</p>
                <p className="text-2xl font-bold">$1,740+</p>
                <p className="text-xs opacity-70 mt-1">Based on $29/month</p>
              </div>
              <div className="text-center p-4 bg-white/20 rounded-xl ring-2 ring-white">
                <p className="text-sm opacity-90">Lifetime Premium</p>
                <p className="text-3xl font-bold">$599</p>
                <p className="text-xs opacity-80 mt-1">One-time payment</p>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl">
                <p className="text-sm opacity-80">Total Savings</p>
                <p className="text-2xl font-bold text-emerald-300">$1,141+</p>
                <p className="text-xs opacity-70 mt-1">Over 5 years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lifetime Benefits Highlight */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Why Go Lifetime?</h3>
            <p className="text-gray-600 dark:text-gray-400">Unlock unlimited potential with these exclusive lifetime perks</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Infinity, title: "Never Expires", desc: "Access forever - no renewal fees" },
              { icon: PiggyBank, title: "Maximum Savings", desc: "Pay once, save thousands" },
              { icon: Gift, title: "Annual Rewards", desc: "Free gifts every year" },
              { icon: Heart, title: "Transferable", desc: "Pass to a family member" },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-5 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{benefit.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <Rocket className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-2">Ready to Secure Your Lifetime Membership?</h3>
              <p className="mb-6 opacity-95 max-w-md mx-auto">
                Join today and enjoy unlimited benefits forever
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Get Lifetime Access
                </button>
                <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-md">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">30-Day Money-Back Guarantee</span>
            <span className="text-xs text-gray-500">|</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">Lifetime Support Included</span>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <PaymentModal plan={selectedPlan} onClose={() => setShowPaymentModal(false)} />
      )}

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.05); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-bounce-in {
          animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LifetimeMembership;