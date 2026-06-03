"use client";
import React, { useState, useEffect, useRef } from "react";
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
  Loader,
  AlertCircle,
} from "lucide-react";
import HeroProp from "@/components/HeroProp";
import api from "@/config/api";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleEvents, setVisibleEvents] = useState(6);
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  // Event type configurations
  const eventTypeConfig = {
    music: { icon: Music, color: "from-rose-500 to-pink-500", bgGlow: "bg-rose-50 dark:bg-rose-950/20", name: "Music Festival" },
    tech: { icon: Laptop, color: "from-blue-500 to-cyan-500", bgGlow: "bg-blue-50 dark:bg-blue-950/20", name: "Tech Conference" },
    wellness: { icon: Heart, color: "from-emerald-500 to-teal-500", bgGlow: "bg-emerald-50 dark:bg-emerald-950/20", name: "Wellness Retreat" },
    food: { icon: Coffee, color: "from-amber-500 to-orange-500", bgGlow: "bg-amber-50 dark:bg-amber-950/20", name: "Food & Wine" },
    charity: { icon: Gift, color: "from-purple-500 to-violet-500", bgGlow: "bg-purple-50 dark:bg-purple-950/20", name: "Charity Gala" },
    party: { icon: PartyPopper, color: "from-indigo-500 to-purple-500", bgGlow: "bg-indigo-50 dark:bg-indigo-950/20", name: "Party Bash" },
    sports: { icon: Flame, color: "from-red-500 to-orange-500", bgGlow: "bg-red-50 dark:bg-red-950/20", name: "Sports Event" },
    art: { icon: Palette, color: "from-pink-500 to-rose-500", bgGlow: "bg-pink-50 dark:bg-pink-950/20", name: "Art Exhibition" },
    nature: { icon: Mountain, color: "from-teal-500 to-emerald-500", bgGlow: "bg-teal-50 dark:bg-teal-950/20", name: "Nature Camp" },
    science: { icon: Microscope, color: "from-cyan-500 to-blue-500", bgGlow: "bg-cyan-50 dark:bg-cyan-950/20", name: "Science Fair" },
  };

  // Fetch events from API
  useEffect(() => {
    fetchEvents();
  }, []);

 const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events');
      
      if (response.data.events) {
        setEvents(response.data.events.data);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate time remaining for each event based on targetDate (start date)
  const calculateTimeLeft = (targetDate) => {
    if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0, status: 'no_date' };
    
    const now = new Date();
    const startDate = new Date(targetDate);
    const difference = startDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, status: 'expired' };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, status: 'upcoming' };
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get ticket availability badge
  const getTicketBadge = (availability) => {
    const badges = {
      available: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', label: 'Available' },
      limited: { color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', label: 'Limited Spots' },
      sold_out: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', label: 'Sold Out' },
      coming_soon: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', label: 'Coming Soon' }
    };
    return badges[availability] || badges.available;
  };

  // Handle newsletter subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setSubscribing(true);
    try {
      // Add your subscription API endpoint here
      // await api.post('/newsletter/subscribe', { email });
      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (error) {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  // Load more events
  const loadMoreEvents = () => {
    setVisibleEvents(prev => prev + 6);
  };

  // Event Card Component with live timer
  const EventCard = ({ event }) => {
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(event.targetDate));
    const cardRef = useRef(null);
    
    const eventConfig = eventTypeConfig[event.eventType] || eventTypeConfig.music;
    const IconComponent = eventConfig.icon;
    const ticketBadge = getTicketBadge(event.ticketAvailability);

    useEffect(() => {
      if (!event.targetDate) return;
      
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
              entry.target.classList.add("animate-fade-in-up");
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
      );

      if (cardRef.current) {
        cardRef.current.style.opacity = "0";
        cardRef.current.style.transform = "translateY(30px)";
        cardRef.current.style.transition = "all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)";
        observer.observe(cardRef.current);
      }

      return () => {
        if (cardRef.current) observer.unobserve(cardRef.current);
      };
    }, []);

    const formatNumber = (num) => String(num).padStart(2, "0");

    return (
      <div
        ref={cardRef}
        className="group relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      >
        {/* Background gradient overlay */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${eventConfig.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        ></div>

        {/* Decorative blur elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

        {/* Banner Image (if available) */}
        {event.bannerImage && (
          <div className="relative h-32 overflow-hidden">
            <img src={event.bannerImage} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        )}

        {/* Event Header with Icon */}
        <div className={`relative px-6 pt-6 pb-6 ${event.bannerImage ? '' : `bg-linear-to-r ${eventConfig.color}`}`}>
          <div className="flex items-center justify-between">
            <div className={`w-14 h-14 ${event.bannerImage ? 'bg-emerald-500' : 'bg-white/20'} rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg`}>
              <IconComponent className={`w-7 h-7 ${event.bannerImage ? 'text-white' : 'text-white'}`} />
            </div>
            <div className="flex gap-2">
              {event.ticketPrice === 0 && (
                <div className="bg-emerald-500 text-white rounded-full px-3 py-1.5 text-xs font-semibold">
                  FREE
                </div>
              )}
              <div className={`${event.bannerImage ? 'bg-black/50 backdrop-blur-sm' : 'bg-white/20 backdrop-blur-sm'} rounded-full px-3 py-1.5`}>
                <div className="flex items-center gap-1.5 text-white text-xs font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(event.date)}</span>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-white text-xl font-bold mt-4 line-clamp-1">{event.title}</h3>
          <div className="flex items-center gap-1.5 text-white/80 text-sm mt-1.5">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        {/* Ticket Availability Badge */}
        <div className="px-5 pt-3">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${ticketBadge.color}`}>
            {ticketBadge.label}
          </span>
        </div>

        {/* Countdown Timer - Only show if event has targetDate and not expired */}
        {event.targetDate && timeLeft.status === 'upcoming' && (
          <div className="px-5 pt-3 pb-2">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Starts In
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
        )}

        {/* Event Status for Expired Events */}
        {event.targetDate && timeLeft.status === 'expired' && (
          <div className="px-5 pt-3 pb-2">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Event has started</p>
            </div>
          </div>
        )}

        {/* No Date Set */}
        {!event.targetDate && (
          <div className="px-5 pt-3 pb-2">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 text-center">
              <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">Date to be announced</p>
            </div>
          </div>
        )}

        {/* Event Details */}
        <div className="px-5 py-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4">
            {event.description}
          </p>
          
          {/* Capacity Info */}
          {event.capacity && (
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>Capacity: {event.capacity} people</span>
            </div>
          )}

          <button
            className={`w-full bg-linear-to-r ${eventConfig.color} text-white font-semibold py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-sm flex items-center justify-center gap-2 group/btn ${
              event.ticketAvailability === 'sold_out' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={event.ticketAvailability === 'sold_out'}
          >
            <Ticket className="w-4 h-4" />
            {event.buttonText || (event.ticketPrice > 0 ? `GET TICKETS - $${event.ticketPrice}` : 'GET FREE TICKETS')}
            <ArrowRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all -translate-x-1" />
          </button>
        </div>
      </div>
    );
  };

  // Get visible events
  const visibleEventsList = events.slice(0, visibleEvents);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse-slow"></div>
      </div>

      <HeroProp
        title={"Discover Amazing Experiences"}
        heading1={"Upcoming"}
        heading2={"Events"}
        content={`Discover amazing experiences, connect with people, and create unforgettable memories`}
        Icon={Sparkles}
      />

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

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading amazing events...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <p className="text-red-600 dark:text-red-400 text-center mb-4">{error}</p>
            <button
              onClick={fetchEvents}
              className="px-6 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && (
          <>
            {events.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Events Found</h3>
                <p className="text-gray-500 dark:text-gray-400">Check back later for upcoming events</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {visibleEventsList.map((event) => (
                    <EventCard key={event._id || event.id} event={event} />
                  ))}
                </div>

                {/* Load More Button */}
                {visibleEvents < events.length && (
                  <div className="text-center mt-12">
                    <button
                      onClick={loadMoreEvents}
                      className="group inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-emerald-600 to-cyan-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Load More Events
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

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
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Stay Updated
            </h3>
            <p className="text-white/80 max-w-md mx-auto mb-6">
              Subscribe to get notified about new events and special offers
            </p>
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-3 flex-wrap justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 min-w-50 px-5 py-3 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-gray-400 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Events
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
          </div>
          <p>&copy; 2025 Events Hub. All rights reserved.</p>
          <p className="text-sm mt-2">Making every moment memorable</p>
        </div>
      </footer>

      {/* Animation Styles */}
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
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.05;
            transform: scale(1);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.05);
          }
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
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default EventsPage;