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

const MembershipPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [paymentNumber, setPaymentNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  
  const pricingRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  // Pricing tiers data
  const pricingTiers = [
    {
      id: 'general',
      name: 'General Member',
      subTitle: 'Standard Membership',
      icon: Users,
      price: 150000,
      originalPrice: 200000,
      period: 'yearly',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-600 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      badge: 'Popular Choice',
      savings: 'Save 25%',
      features: [
        { name: 'Full Event Access', included: true, icon: Calendar },
        { name: 'Monthly Newsletter', included: true, icon: Mail },
        { name: 'Community Forum Access', included: true, icon: Users },
        { name: '15% Event Discounts', included: true, icon: TicketIcon },
        { name: 'Standard Workshops', included: true, icon: BookOpenIcon },
        { name: 'Email Support', included: true, icon: Headphones },
        { name: 'Member-only Events', included: true, icon: Crown },
        { name: 'Basic Networking', included: true, icon: Users },
        { name: '1 Free Ticket/Year', included: false, icon: Gift },
        { name: 'VIP Lounge Access', included: false, icon: Coffee },
        { name: 'Premium Workshops', included: false, icon: BookOpenIcon },
        { name: '24/7 Priority Support', included: false, icon: Headphones },
      ],
      recommended: true,
      ctaText: 'Join as General Member',
      popular: true,
      currency: 'BDT',
    },
    {
      id: 'lifetime',
      name: 'Lifetime Member',
      subTitle: 'Ultimate Lifetime Access',
      icon: Crown,
      price: 300000,
      originalPrice: 500000,
      period: 'one-time',
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-600 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      badge: 'Best Value',
      savings: 'Save 40%',
      features: [
        { name: 'Lifetime Event Access', included: true, icon: Calendar },
        { name: 'Lifetime Newsletter', included: true, icon: Mail },
        { name: 'Premium Forum Access', included: true, icon: Users },
        { name: '30% Event Discounts', included: true, icon: TicketIcon },
        { name: 'All Premium Workshops', included: true, icon: BookOpenIcon },
        { name: '24/7 Priority Support', included: true, icon: Headphones },
        { name: 'Exclusive Member-only Events', included: true, icon: Crown },
        { name: 'Elite Networking Sessions', included: true, icon: Users },
        { name: '2 Free Tickets/Year', included: true, icon: Gift },
        { name: 'VIP Lounge Access', included: true, icon: Coffee },
        { name: 'Free Parking Pass', included: true, icon: Car },
        { name: 'Annual Retreat Invite', included: true, icon: Home },
        { name: 'Lifetime Achievement Badge', included: true, icon: Trophy },
        { name: 'Transferable Membership', included: true, icon: Users },
      ],
      recommended: false,
      ctaText: 'Get Lifetime Membership',
      popular: false,
      currency: 'BDT',
    },
  ];

  // Handle purchase click
  const handlePurchase = (tier) => {
    setSelectedPlan(tier);
    setShowPaymentModal(true);
    setPaymentMethod('bkash');
    setPaymentNumber('');
    setTransactionId('');
    
    // Animate modal
    gsap.fromTo(".payment-modal",
      { opacity: 0, scale: 0.9, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" }
    );
  };

  const handlePaymentSubmit = () => {
    if (!paymentNumber) {
      alert('Please enter your payment number');
      return;
    }
    if (!transactionId) {
      alert('Please enter transaction ID');
      return;
    }
    
    // Close payment modal
    setShowPaymentModal(false);
    
    // Show success modal
    setShowSuccessModal(true);
    
    // Animate success modal
    gsap.fromTo(".success-modal",
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

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
          tier.recommended ? 'ring-2 ring-blue-500 ring-offset-2' : ''
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
            <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${tier.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="w-10 h-10 text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${tier.textColor} dark:text-white`}>{tier.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tier.subTitle}</p>
            
            {/* Price Display */}
            <div className="mt-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl font-bold text-gray-800 dark:text-white">
                  {formatCurrency(tier.price)}
                </span>
                <span className="text-gray-400 line-through text-sm">{formatCurrency(tier.originalPrice)}</span>
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
                {tier.period === 'one-time' ? 'One-time payment • Lifetime access' : 'Yearly payment • Renewable annually'}
              </p>
              {tier.period === 'one-time' && (
                <div className="mt-2 inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                  <Infinity className="w-3 h-3 text-emerald-600" />
                  <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Never expires</span>
                </div>
              )}
            </div>
          </div>

          {/* Features List */}
          <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
            {tier.features.map((feature, idx) => {
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
              {tier.id === 'lifetime' ? <Infinity className="w-4 h-4" /> : <Users className="w-4 h-4" />}
              {tier.ctaText}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-3">
              {tier.id === 'lifetime' ? 'Lifetime warranty • 30-day money-back guarantee' : 'Renew annually • Cancel anytime'}
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
              {plan.id === 'lifetime' ? <Infinity className="w-8 h-8 text-white" /> : <Users className="w-8 h-8 text-white" />}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{plan.name}</h3>
            <div className="mt-2">
              <span className="text-3xl font-bold text-gray-800 dark:text-white">{formatCurrency(plan.price)}</span>
              <span className="text-gray-500"> {plan.period === 'one-time' ? 'one-time' : '/year'}</span>
            </div>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">Save {savingsPercent}%</p>
          </div>
          
          <div className="p-6 space-y-4">
            {/* Payment Methods */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod('bkash')}
                  className={`p-3 border-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'bkash' 
                      ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <span className="text-xl">💳</span>
                  <span className="font-medium">bKash</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('nagad')}
                  className={`p-3 border-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'nagad' 
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <span className="text-xl">📱</span>
                  <span className="font-medium">Nagad</span>
                </button>
              </div>
            </div>

            {/* Payment Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} Number
              </label>
              <input
                type="tel"
                value={paymentNumber}
                onChange={(e) => setPaymentNumber(e.target.value)}
                placeholder={`Enter your ${paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} number`}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
              />
            </div>

            {/* Transaction ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Transaction ID
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter transaction ID"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
              />
            </div>

            {/* Payment Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-700 dark:text-blue-300">Send payment to:</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {paymentMethod === 'bkash' ? (
                  <>bKash Merchant: <strong>019XXXXXXXX</strong></>
                ) : (
                  <>Nagad Merchant: <strong>018XXXXXXXX</strong></>
                )}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                After successful payment, your membership will be activated within 24 hours.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handlePaymentSubmit}
                className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Confirm Payment
              </button>
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                By confirming, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Success Modal Component
  const SuccessModal = ({ onClose }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }, [onClose]);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="success-modal relative bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl text-center p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Payment Submitted!
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your membership request has been received. We'll verify your payment and activate your membership within 24 hours.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Transaction ID: <strong>{transactionId}</strong>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Membership: <strong>{selectedPlan?.name}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-reverse"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-purple-700 to-pink-800 text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 animate-bounce-in">
            <Crown className="w-4 h-4" />
            <span className="text-sm font-medium">Premium Membership</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4">
            Choose Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Membership</span>
              <svg className="absolute -bottom-3 left-0 w-full h-4 text-white/30" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M0 4 L100 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join our exclusive community and unlock premium benefits, networking opportunities, and unforgettable experiences.
          </p>
          
          {/* Value Calculator */}
          <div className="mt-8 inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <PiggyBank className="w-5 h-5" />
            <span className="text-sm">Members starting from <span className="font-bold">150,000 BDT</span></span>
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div ref={pricingRef} className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 rounded-full px-4 py-1.5 mb-4">
            <Crown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Membership Plans
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Select Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the membership that fits your needs and start enjoying exclusive benefits today.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <PriceCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        {/* Membership Comparison Table */}
        <div className="mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h3 className="text-2xl font-bold text-center">Membership Comparison</h3>
            <p className="text-center text-blue-100 mt-2">See what each membership includes</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Benefits</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600 dark:text-blue-400">General Member</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600 dark:text-purple-400">Lifetime Member</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { name: "Event Access", general: true, lifetime: true },
                  { name: "Monthly Newsletter", general: true, lifetime: true },
                  { name: "Community Forum", general: true, lifetime: true },
                  { name: "Event Discount", general: "15%", lifetime: "30%" },
                  { name: "Workshop Access", general: "Standard", lifetime: "Premium" },
                  { name: "Support Level", general: "Email", lifetime: "24/7 Priority" },
                  { name: "Member-only Events", general: true, lifetime: true },
                  { name: "Free Tickets/Year", general: "0", lifetime: "2" },
                  { name: "VIP Lounge Access", general: false, lifetime: true },
                  { name: "Free Parking", general: false, lifetime: true },
                  { name: "Annual Retreat", general: false, lifetime: true },
                  { name: "Transferable", general: false, lifetime: true },
                ].map((feature, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{feature.name}</td>
                    <td className="px-6 py-4 text-center">
                      {feature.general === true ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      ) : feature.general === false ? (
                        <XCircle className="w-5 h-5 text-gray-400 mx-auto" />
                      ) : (
                        <span className="text-sm font-semibold text-blue-600">{feature.general}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {feature.lifetime === true ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      ) : feature.lifetime === false ? (
                        <XCircle className="w-5 h-5 text-gray-400 mx-auto" />
                      ) : (
                        <span className="text-sm font-semibold text-purple-600">{feature.lifetime}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                q: "How long does General Membership last?",
                a: "General Membership is valid for one year from the date of purchase and can be renewed annually."
              },
              {
                q: "Is Lifetime Membership truly lifetime?",
                a: "Yes! Lifetime Membership provides access for as long as our organization exists."
              },
              {
                q: "Can I upgrade from General to Lifetime?",
                a: "Absolutely! You can upgrade anytime by paying the difference in price."
              },
              {
                q: "What payment methods are accepted?",
                a: "We accept bKash, Nagad, and bank transfer for membership payments."
              },
              {
                q: "Is there a refund policy?",
                a: "Yes, we offer a 30-day money-back guarantee for all membership plans."
              },
              {
                q: "Can I transfer my membership?",
                a: "Lifetime Memberships are transferable. General Memberships are non-transferable."
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <Rocket className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-2">Ready to Join Our Community?</h3>
              <p className="mb-6 opacity-95 max-w-md mx-auto">
                Choose your membership plan and start enjoying exclusive benefits today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => handlePurchase(pricingTiers[0])}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  Join as General Member
                </button>
                <button 
                  onClick={() => handlePurchase(pricingTiers[1])}
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Crown className="w-5 h-5" />
                  Get Lifetime Membership
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-md">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">30-Day Money-Back Guarantee</span>
            <span className="text-xs text-gray-500">|</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">24/7 Customer Support</span>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <PaymentModal plan={selectedPlan} onClose={() => setShowPaymentModal(false)} />
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
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

export default MembershipPage;