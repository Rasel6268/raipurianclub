// components/UpcomingEvents.js
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Loader,
  Music,
  Laptop,
  Heart,
  Coffee,
  Gift,
  PartyPopper,
  Flame,
  Palette,
  Mountain,
  Microscope,
} from "lucide-react";
import api from "@/config/api";

const UpcomingEvents = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const autoPlayRef = useRef(null);

  // Event-type → icon mapping
  const eventTypeIcons = {
    music:   Music,
    tech:    Laptop,
    wellness:Heart,
    food:    Coffee,
    charity: Gift,
    party:   PartyPopper,
    sports:  Flame,
    art:     Palette,
    nature:  Mountain,
    science: Microscope,
  };

  // Fallback stock images per event type
  const fallbackImages = {
    music:    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
    tech:     "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    wellness: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    food:     "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop",
    charity:  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop",
    party:    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    sports:   "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
    art:      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
    nature:   "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
    science:  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
    default:  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
  };

  // Fetch published events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await api.get('/events');
        const raw = res.data?.events?.data ?? res.data?.data ?? [];
        // Only show published events, sort by targetDate ascending
        const published = raw
          .filter(e => !e.status || e.status === 'published')
          .sort((a, b) => new Date(a.targetDate || a.date) - new Date(b.targetDate || b.date));
        setEvents(published);
      } catch (err) {
        console.error('UpcomingEvents fetch error:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Normalise a DB event into the shape this component expects
  const normalise = (evt) => ({
    id:          evt._id || evt.id,
    title:       evt.title || 'Untitled Event',
    description: evt.description || '',
    date:        evt.date || (evt.targetDate ? new Date(evt.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBA'),
    time:        evt.venueDetails || '',
    location:    evt.location || 'Location TBA',
    image:       evt.bannerImage || fallbackImages[evt.eventType] || fallbackImages.default,
    category:    evt.eventType ? evt.eventType.charAt(0).toUpperCase() + evt.eventType.slice(1) : 'Event',
    attendees:   evt.registeredCount || 0,
    featured:    evt.isFeatured || false,
  });

  const normalisedEvents = events.map(normalise);
  const featuredEvent = normalisedEvents.find(e => e.featured) || normalisedEvents[0];
  const regularEvents = normalisedEvents.filter(e => e.id !== featuredEvent?.id);

  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (!isHovering && regularEvents.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % regularEvents.length);
      }, 5000);
    }
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [isHovering, regularEvents.length]);

  const nextSlide = () => setActiveIndex(prev => (prev + 1) % regularEvents.length);
  const prevSlide = () => setActiveIndex(prev => (prev - 1 + regularEvents.length) % regularEvents.length);
  const currentEvent = regularEvents[activeIndex] || regularEvents[0];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-emerald-300/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-teal-300/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-3.5">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              Community Calendar
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Upcoming{" "}
            <span className="relative inline-block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Events
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Participate in top community gatherings, workshops, and celebrations designed to inspire and connect.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader className="w-10 h-10 text-emerald-500 animate-spin" />
            <p className="text-slate-500 dark:text-slate-400 text-sm">Loading upcoming events…</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && normalisedEvents.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Upcoming Events</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Check back soon for exciting community events!</p>
          </div>
        )}

        {/* Featured Hero Event Card */}
        {!loading && featuredEvent && (
        <div className="mb-12 sm:mb-16 group">
          <div className="relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-slate-900">
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-10"></div>
            <img
              src={featuredEvent.image}
              alt={featuredEvent.title}
              className="w-full h-80 sm:h-96 md:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 sm:p-8 md:p-10">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Event
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2.5 leading-tight">
                {featuredEvent.title}
              </h3>
              <p className="text-slate-200 text-sm sm:text-base max-w-2xl mb-4 line-clamp-2">
                {featuredEvent.description}
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-5 mb-5">
                <div className="flex items-center gap-1.5 text-slate-200 text-xs sm:text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>{featuredEvent.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-200 text-xs sm:text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{featuredEvent.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-200 text-xs sm:text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="truncate max-w-[180px] sm:max-w-none">{featuredEvent.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-200 text-xs sm:text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>{featuredEvent.attendees}+ attending</span>
                </div>
              </div>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full font-bold text-sm sm:text-base hover:from-emerald-400 hover:to-teal-400 transition-all duration-200 hover:scale-105 active:scale-95 w-fit shadow-lg shadow-emerald-500/30"
              >
                <span>Register for Event</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        )}

        {/* Carousel & Previews Grid */}
        {!loading && regularEvents.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                More <span className="text-emerald-600 dark:text-emerald-400">Events</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Discover what's happening throughout the season
              </p>
            </div>
            {regularEvents.length > 1 && (
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-md hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                  aria-label="Previous event"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-md hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                  aria-label="Next event"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Regular Events Responsive Grid */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {regularEvents.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {/* Active Highlight Card */}
                <div className="bg-white dark:bg-slate-800/90 rounded-3xl shadow-xl overflow-hidden border border-slate-200/70 dark:border-slate-700 flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <img
                      src={currentEvent.image}
                      alt={currentEvent.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {currentEvent.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {currentEvent.title}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {currentEvent.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs">
                          <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{currentEvent.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs">
                          <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{currentEvent.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs sm:col-span-2">
                          <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="truncate">{currentEvent.location}</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/events"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-2xl font-bold text-sm hover:from-emerald-500 hover:to-teal-500 shadow-md transition-all duration-200 hover:scale-[1.01]"
                    >
                      <span>Reserve Your Spot</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Event Thumbnails / Stack */}
                <div className="space-y-3 sm:space-y-3.5 flex flex-col justify-between">
                  {regularEvents.map((event, idx) => {
                    const isSelected = activeIndex === idx;
                    return (
                      <div
                        key={event.id}
                        onClick={() => setActiveIndex(idx)}
                        className={`flex gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all duration-200 items-center ${
                          isSelected
                            ? "bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 shadow-md"
                            : "bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-emerald-300"
                        }`}
                      >
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isSelected
                                  ? "bg-emerald-600 text-white"
                                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                              }`}
                            >
                              {event.category}
                            </span>
                            <span className="text-xs text-slate-400">• {event.attendees}+ going</span>
                          </div>
                          <h5 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base truncate mb-1">
                            {event.title}
                          </h5>
                          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                            <Calendar className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{event.date}</span>
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 transition-transform ${
                            isSelected ? "text-emerald-600 translate-x-1" : "text-slate-300"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Carousel Dots */}
            {regularEvents.length > 1 && (
              <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                {regularEvents.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx
                        ? "w-8 bg-emerald-600 dark:bg-emerald-400"
                        : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-emerald-400"
                    }`}
                    aria-label={`Go to event ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        )}

        {/* View All CTA */}
        {!loading && normalisedEvents.length > 0 && (
        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-emerald-600 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 font-bold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all duration-200 hover:scale-105 active:scale-95 group"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;