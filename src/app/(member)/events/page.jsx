'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  MapPin,
  Music,
  Laptop,
  Heart,
  Coffee,
  Sparkles,
  Ticket,
  Users,
  Clock,
  ArrowRight,
  Bell,
  Star,
  PartyPopper,
  Wine,
  Gift,
  Flame,
  CloudMoon,
  Mountain,
  Microscope,
  Palette,
} from 'lucide-react';

const EventsPage = () => {
  // Demo events data
  const eventsData = [
    {
      id: 1,
      title: "Summer Music Festival",
      date: "July 15, 2025",
      targetDate: new Date(2025, 6, 15),
      description: "Join us for an unforgettable night of music, food, and fun under the stars! Featuring top artists and amazing performances.",
      location: "Central Park, New York",
      icon: Music,
      color: "from-rose-500 to-pink-500",
      bgGlow: "bg-rose-50 dark:bg-rose-950/20",
      buttonText: "GET TICKETS",
    },
    {
      id: 2,
      title: "Tech Conference 2025",
      date: "August 5, 2025",
      targetDate: new Date(2025, 7, 5),
      description: "The biggest tech event of the year! Network with industry leaders, attend workshops, and discover the latest innovations.",
      location: "Convention Center, San Francisco",
      icon: Laptop,
      color: "from-blue-500 to-cyan-500",
      bgGlow: "bg-blue-50 dark:bg-blue-950/20",
      buttonText: "REGISTER NOW",
    },
    {
      id: 3,
      title: "Wellness Retreat",
      date: "September 20, 2025",
      targetDate: new Date(2025, 8, 20),
      description: "Escape the chaos and rejuvenate your mind, body, and soul. Yoga, meditation, and healing sessions included.",
      location: "Mountain Resort, Colorado",
      icon: Heart,
      color: "from-emerald-500 to-teal-500",
      bgGlow: "bg-emerald-50 dark:bg-emerald-950/20",
      buttonText: "JOIN RETREAT",
    },
    {
      id: 4,
      title: "Food & Wine Expo",
      date: "October 10, 2025",
      targetDate: new Date(2025, 9, 10),
      description: "Savor exquisite cuisines from world-renowned chefs and taste premium wines from top vineyards.",
      location: "Grand Plaza, Chicago",
      icon: Wine,
      color: "from-amber-500 to-orange-500",
      bgGlow: "bg-amber-50 dark:bg-amber-950/20",
      buttonText: "BUY PASS",
    },
    {
      id: 5,
      title: "Charity Gala Night",
      date: "November 25, 2025",
      targetDate: new Date(2025, 10, 25),
      description: "An elegant evening supporting children's education. Live music, auctions, and inspiring stories await.",
      location: "Royal Ballroom, Boston",
      icon: Gift,
      color: "from-purple-500 to-violet-500",
      bgGlow: "bg-purple-50 dark:bg-purple-950/20",
      buttonText: "DONATE & JOIN",
    },
    {
      id: 6,
      title: "New Year's Eve Bash",
      date: "December 31, 2025",
      targetDate: new Date(2025, 11, 31),
      description: "Ring in the New Year with a spectacular celebration! Fireworks, champagne, and live DJ performances.",
      location: "Harbor City, Miami",
      icon: PartyPopper,
      color: "from-indigo-500 to-purple-500",
      bgGlow: "bg-indigo-50 dark:bg-indigo-950/20",
      buttonText: "CELEBRATE",
    },
  ];

  // Calculate time remaining for each event
  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, expired: false };
  };

  // Event Card Component with live timer
  const EventCard = ({ event }) => {
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(event.targetDate));
    const cardRef = useRef(null);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(event.targetDate));
      }, 1000);

      return () => clearInterval(timer);
    }, [event.targetDate]);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in-up');
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      if (cardRef.current) {
        cardRef.current.style.opacity = '0';
        cardRef.current.style.transform = 'translateY(30px)';
        cardRef.current.style.transition = 'all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
        observer.observe(cardRef.current);
      }

      return () => {
        if (cardRef.current) observer.unobserve(cardRef.current);
      };
    }, []);

    const formatNumber = (num) => String(num).padStart(2, '0');
    const IconComponent = event.icon;

    return (
      <div
        ref={cardRef}
        className="group relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      >
        {/* Background gradient overlay */}
        <div className={`absolute inset-0 bg-linear-to-br ${event.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
        
        {/* Decorative blur elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        
        {/* Event Header with Icon */}
        <div className={`relative px-6 pt-8 pb-6 bg-linear-to-r ${event.color}`}>
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <IconComponent className="w-7 h-7 text-white" />
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
              <div className="flex items-center gap-1.5 text-white text-xs font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{event.date}</span>
              </div>
            </div>
          </div>
          <h3 className="text-white text-xl font-bold mt-4">{event.title}</h3>
          <div className="flex items-center gap-1.5 text-white/80 text-sm mt-1.5">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="px-5 pt-5 pb-3 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <Clock className="w-4 h-4 text-emerald-500" />
            <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Event Starts In
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl py-2 shadow-sm border border-gray-100 dark:border-gray-700">
              <span className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                {formatNumber(timeLeft.days)}
              </span>
              <p className="text-gray-400 text-xs mt-0.5">Days</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl py-2 shadow-sm border border-gray-100 dark:border-gray-700">
              <span className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                {formatNumber(timeLeft.hours)}
              </span>
              <p className="text-gray-400 text-xs mt-0.5">Hrs</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl py-2 shadow-sm border border-gray-100 dark:border-gray-700">
              <span className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                {formatNumber(timeLeft.minutes)}
              </span>
              <p className="text-gray-400 text-xs mt-0.5">Mins</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl py-2 shadow-sm border border-gray-100 dark:border-gray-700">
              <span className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                {formatNumber(timeLeft.seconds)}
              </span>
              <p className="text-gray-400 text-xs mt-0.5">Secs</p>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="px-5 py-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
            {event.description}
          </p>
          <button className={`w-full bg-linear-to-r ${event.color} text-white font-semibold py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-sm flex items-center justify-center gap-2 group/btn`}>
            <Ticket className="w-4 h-4" />
            {event.buttonText}
            <ArrowRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all -translate-x-1" />
          </button>
        </div>
      </div>
    );
  };

  // Category filters
  const categories = [
    { name: "All Events", icon: Sparkles, active: true, color: "from-emerald-500 to-cyan-500" },
    { name: "Music", icon: Music, active: false, color: "from-rose-500 to-pink-500" },
    { name: "Tech", icon: Laptop, active: false, color: "from-blue-500 to-cyan-500" },
    { name: "Wellness", icon: Heart, active: false, color: "from-emerald-500 to-teal-500" },
    { name: "Food & Drink", icon: Coffee, active: false, color: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse-slow"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Discover Amazing Experiences</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 animate-fade-in-up">
            Upcoming{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Events</span>
              <svg
                className="absolute -bottom-3 left-0 w-full h-4 text-white/30"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 4 L100 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Discover amazing experiences, connect with people, and create unforgettable memories
          </p>
          
          {/* Category Filters */}
          <div className="mt-10 flex gap-3 justify-center flex-wrap">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`group flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  cat.active
                    ? `bg-white text-emerald-700 shadow-lg`
                    : `bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm`
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full px-4 py-1.5 mb-4">
            <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Join the Celebration
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Featured{" "}
            <span className="bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Experiences
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Handpicked events you won't want to miss — secure your spot today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="group inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-emerald-600 to-cyan-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Load More Events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-linear-to-r from-emerald-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
              <Bell className="w-4 h-4" />
              <span className="text-sm font-medium">Never Miss Out</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Stay Updated</h3>
            <p className="text-white/80 max-w-md mx-auto mb-6">
              Subscribe to get notified about new events and special offers
            </p>
            <div className="max-w-md mx-auto flex gap-3 flex-wrap justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-50 px-5 py-3 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-gray-400 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Events</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
          <p>&copy; 2025 Events Hub. All rights reserved.</p>
          <p className="text-sm mt-2">Making every moment memorable</p>
        </div>
      </footer>

      {/* Animation Styles */}
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
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards !important;
        }
      `}</style>
    </div>
  );
};

export default EventsPage;