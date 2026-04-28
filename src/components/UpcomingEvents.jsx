// components/UpcomingEvents.js
"use client";
import { useState, useEffect, useRef } from "react";
import { Calendar, MapPin, Clock, Users, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const UpcomingEvents = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const autoPlayRef = useRef(null);

  // Events data
  const events = [
    {
      id: 1,
      title: "Raipur Tech Summit 2026",
      description: "Join the biggest tech gathering in Central India featuring workshops from industry leaders, hackathon, and networking sessions.",
      date: "June 15-17, 2026",
      time: "9:00 AM - 6:00 PM",
      location: "Raipur Convention Center, Raipur",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
      category: "Technology",
      attendees: 450,
      featured: true
    },
    {
      id: 2,
      title: "Cultural Fest & Food Mela",
      description: "Experience the rich cultural heritage of Chhattisgarh with folk performances, art exhibitions, and authentic local cuisine.",
      date: "July 5-6, 2026",
      time: "11:00 AM - 9:00 PM",
      location: "Science College Ground, Raipur",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop",
      category: "Cultural",
      attendees: 1200,
      featured: false
    },
    {
      id: 3,
      title: "Startup Founders Meetup",
      description: "Connect with Raipur's thriving startup ecosystem. Pitch sessions, mentor talks, and investment opportunities.",
      date: "July 20, 2026",
      time: "4:00 PM - 8:00 PM",
      location: "The Hub Coworking, Raipur",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2070&auto=format&fit=crop",
      category: "Business",
      attendees: 200,
      featured: false
    },
    {
      id: 4,
      title: "Annual Sports Championship",
      description: "Compete in cricket, badminton, football, and athletics. Open for all age groups with exciting prizes.",
      date: "August 10-12, 2026",
      time: "7:00 AM - 7:00 PM",
      location: "Shaheed Veer Narayan Singh International Stadium",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
      category: "Sports",
      attendees: 800,
      featured: false
    },
    {
      id: 5,
      title: "Environment Conservation Drive",
      description: "Join us for a massive tree plantation drive and awareness campaign across major city zones.",
      date: "August 25, 2026",
      time: "8:00 AM - 12:00 PM",
      location: "Multiple locations across Raipur",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2070&auto=format&fit=crop",
      category: "Social",
      attendees: 500,
      featured: false
    }
  ];

  // Featured event (first one with featured flag or just first)
  const featuredEvent = events.find(e => e.featured) || events[0];
  const regularEvents = events.filter(e => !e.featured);

  // Auto-slide carousel for regular events
  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    
    if (!isHovering && regularEvents.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % regularEvents.length);
      }, 5000);
    }
    
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovering, regularEvents.length]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % regularEvents.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + regularEvents.length) % regularEvents.length);
  };

  const currentEvent = regularEvents[activeIndex];

  return (
    <section className="relative py-8 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Never Miss Out
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Upcoming{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Events
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-emerald-400/40"
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
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join the most anticipated community gatherings and create unforgettable memories
          </p>
        </div>

        {/* Featured Event Card - Hero Style */}
        <div className="mb-16 group">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
            <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/30 z-10"></div>
            <img
              src={featuredEvent.image}
              alt={featuredEvent.title}
              className="w-full h-80 sm:h-96 md:h-112.5 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8 md:p-10">
              <div className="inline-flex items-center gap-2 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3">
                <Sparkles className="w-3 h-3" />
                Featured Event
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                {featuredEvent.title}
              </h3>
              <p className="text-white/80 text-base sm:text-lg max-w-2xl mb-4 line-clamp-2">
                {featuredEvent.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-5">
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>{featuredEvent.date}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{featuredEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{featuredEvent.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>{featuredEvent.attendees}+ attending</span>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300 hover:gap-3 w-fit shadow-lg">
                Register Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* More Events Section - Carousel Style */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                More <span className="text-emerald-600 dark:text-emerald-400">Events</span>
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Discover what's happening in the community
              </p>
            </div>
            {regularEvents.length > 1 && (
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  aria-label="Previous event"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  aria-label="Next event"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            )}
          </div>

          {/* Carousel Container */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="transition-all duration-500 ease-in-out">
              {regularEvents.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Main Carousel Card */}
                  <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={currentEvent.image}
                        alt={currentEvent.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {currentEvent.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        {currentEvent.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {currentEvent.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                          <Calendar className="w-4 h-4 text-emerald-500" />
                          <span>{currentEvent.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                          <Clock className="w-4 h-4 text-emerald-500" />
                          <span>{currentEvent.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                          <MapPin className="w-4 h-4 text-emerald-500" />
                          <span className="truncate">{currentEvent.location}</span>
                        </div>
                      </div>
                      <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300">
                        Reserve Your Spot
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnails / Event Previews */}
                  <div className="space-y-4">
                    {regularEvents.map((event, idx) => (
                      <div
                        key={event.id}
                        onClick={() => setActiveIndex(idx)}
                        className={`group flex gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                          activeIndex === idx
                            ? "bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-400 dark:border-emerald-500 shadow-md"
                            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600"
                        }`}
                      >
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              activeIndex === idx 
                                ? "bg-emerald-500 text-white" 
                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}>
                              {event.category}
                            </span>
                          </div>
                          <h5 className="font-bold text-gray-800 dark:text-white text-sm mb-1 line-clamp-1">
                            {event.title}
                          </h5>
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                            <Calendar className="w-3 h-3" />
                            <span>{event.date.split(",")[0]}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                            <Users className="w-3 h-3" />
                            <span>{event.attendees}+ going</span>
                          </div>
                        </div>
                        {activeIndex === idx && (
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Carousel Indicators */}
            {regularEvents.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {regularEvents.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === idx
                        ? "w-8 bg-emerald-600 dark:bg-emerald-400"
                        : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-emerald-400"
                    }`}
                    aria-label={`Go to event ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-emerald-600 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 rounded-full font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all duration-300 hover:gap-3 group">
            View All Events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
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
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default UpcomingEvents;