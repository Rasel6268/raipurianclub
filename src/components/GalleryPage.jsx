// components/GalleryMasonry.js
"use client";
import { useState, useEffect, useRef } from "react";
import {
  Camera,
  Calendar,
  MapPin,
  Heart,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Trophy,
  TreePine,
  PartyPopper,
  Share2,
  Download,
  Users,
  Image as ImageIcon,
} from "lucide-react";
import HeroProp from "./HeroProp";

const GalleryMasonry = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredImage, setHoveredImage] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    setMounted(true);

    // Intersection Observer for scroll animations
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const galleryItems = document.querySelectorAll(".masonry-item");
    galleryItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(30px)";
      item.style.transition = "all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)";
      observer.observe(item);
    });

    return () => {
      galleryItems.forEach((item) => observer.unobserve(item));
    };
  }, [activeFilter]);

  // Gallery Data with different size variants - all using same gap spacing
  const galleryData = [
    // EXTRA LARGE / BANNER SIZE (spans 2 columns)
    {
      id: 1,
      title: "Annual Community Meet 2026",
      date: "March 15, 2026",
      category: "event",
      type: "Annual Meet",
      location: "Raipur Convention Center",
      attendees: 450,
      description: "Grand annual gathering celebrating community achievements",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop",
      size: "banner",
      span: "md:col-span-2",
      height: "h-80 md:h-96",
      likes: 234,
      photographer: "Raj Photography",
    },
    
    // LARGE SIZE (taller image)
    {
      id: 2,
      title: "Keynote Session with Industry Leaders",
      date: "March 15, 2026",
      category: "event",
      type: "Conference",
      location: "Raipur Convention Center",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
      size: "large",
      span: "",
      height: "h-96",
      likes: 189,
    },
    
    // MEDIUM SIZE
    {
      id: 3,
      title: "Networking Dinner",
      date: "March 15, 2026",
      category: "event",
      type: "Social",
      location: "Grand Hotel Raipur",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
      size: "medium",
      span: "",
      height: "h-64",
      likes: 156,
    },
    
    // SMALL SIZE
    {
      id: 4,
      title: "Candid Moments",
      date: "March 15, 2026",
      category: "event",
      type: "Candid",
      location: "Raipur Convention Center",
      image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=2070&auto=format&fit=crop",
      size: "small",
      span: "",
      height: "h-56",
      likes: 98,
    },

    // BANNER - Summer Picnic
    {
      id: 5,
      title: "Annual Summer Picnic - Fun & Frolic",
      date: "April 20, 2026",
      category: "picnic",
      type: "Picnic",
      location: "Nandan Van Zoo & Safari",
      attendees: 320,
      description: "Fun-filled day with games, food, and laughter",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2070&auto=format&fit=crop",
      size: "banner",
      span: "md:col-span-2",
      height: "h-72 md:h-80",
      likes: 312,
    },
    
    {
      id: 6,
      title: "Team Building Games",
      date: "April 20, 2026",
      category: "picnic",
      type: "Activities",
      location: "Nandan Van",
      image: "https://images.unsplash.com/photo-1551634979-2b11f8c946fe?q=80&w=2070&auto=format&fit=crop",
      size: "large",
      span: "",
      height: "h-80",
      likes: 267,
    },
    
    {
      id: 7,
      title: "Picnic Lunch Together",
      date: "April 20, 2026",
      category: "picnic",
      type: "Food",
      location: "Nandan Van",
      image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
      size: "medium",
      span: "",
      height: "h-64",
      likes: 198,
    },
    
    {
      id: 8,
      title: "Group Photo Session",
      date: "April 20, 2026",
      category: "picnic",
      type: "Group Photo",
      location: "Nandan Van",
      image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=2070&auto=format&fit=crop",
      size: "small",
      span: "",
      height: "h-52",
      likes: 234,
    },

    // LARGE - Tech Summit
    {
      id: 9,
      title: "Raipur Tech Summit 2026",
      date: "February 10, 2026",
      category: "event",
      type: "Tech Event",
      location: "Science College Auditorium",
      attendees: 600,
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
      size: "large",
      span: "",
      height: "h-96",
      likes: 445,
    },
    
    {
      id: 10,
      title: "Hackathon Winners",
      date: "February 11, 2026",
      category: "event",
      type: "Competition",
      location: "Science College",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
      size: "medium",
      span: "",
      height: "h-64",
      likes: 278,
    },

    // BANNER - Cultural Fest
    {
      id: 11,
      title: "Cultural Fest 2026 - Celebrating Diversity",
      date: "January 25, 2026",
      category: "event",
      type: "Cultural",
      location: "Marine Drive Ground",
      attendees: 1200,
      description: "Celebrating diversity through music and dance",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop",
      size: "banner",
      span: "md:col-span-2",
      height: "h-80 md:h-96",
      likes: 567,
    },
    
    {
      id: 12,
      title: "Folk Dance Performance",
      date: "January 25, 2026",
      category: "event",
      type: "Performance",
      location: "Marine Drive Ground",
      image: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=2070&auto=format&fit=crop",
      size: "large",
      span: "",
      height: "h-80",
      likes: 389,
    },
    
    {
      id: 13,
      title: "Traditional Attire Showcase",
      date: "January 25, 2026",
      category: "event",
      type: "Fashion",
      location: "Marine Drive Ground",
      image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=2070&auto=format&fit=crop",
      size: "small",
      span: "",
      height: "h-56",
      likes: 234,
    },

    // MEDIUM - Water Park
    {
      id: 14,
      title: "Weekend Getaway at MM Fun City",
      date: "December 15, 2025",
      category: "picnic",
      type: "Amusement",
      location: "MM Fun City, Raipur",
      attendees: 280,
      image: "https://images.unsplash.com/photo-1513267048331-5610a5b6bbd9?q=80&w=2070&auto=format&fit=crop",
      size: "medium",
      span: "",
      height: "h-72",
      likes: 234,
    },
    
    {
      id: 15,
      title: "Water Park Fun",
      date: "December 15, 2025",
      category: "picnic",
      type: "Water Activities",
      location: "MM Fun City",
      image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=80&w=2070&auto=format&fit=crop",
      size: "banner",
      span: "md:col-span-2",
      height: "h-72",
      likes: 298,
    },

    // LARGE - Diwali Celebration
    {
      id: 16,
      title: "Diwali Milan 2025",
      date: "November 5, 2025",
      category: "event",
      type: "Festival",
      location: "Community Hall",
      attendees: 350,
      image: "https://images.unsplash.com/photo-1525942594751-6acc56b4408f?q=80&w=2070&auto=format&fit=crop",
      size: "large",
      span: "",
      height: "h-96",
      likes: 423,
    },
    
    {
      id: 17,
      title: "Lamp Lighting Ceremony",
      date: "November 5, 2025",
      category: "event",
      type: "Ritual",
      location: "Community Hall",
      image: "https://images.unsplash.com/photo-1581235725076-5a2b6f6a6a3c?q=80&w=2070&auto=format&fit=crop",
      size: "small",
      span: "",
      height: "h-52",
      likes: 345,
    },

    // BANNER - Sports Day
    {
      id: 18,
      title: "Annual Sports Championship 2025",
      date: "October 20, 2025",
      category: "event",
      type: "Sports",
      location: "International Stadium",
      attendees: 800,
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
      size: "banner",
      span: "md:col-span-2",
      height: "h-80",
      likes: 512,
    },
    
    {
      id: 19,
      title: "Cricket Match Highlights",
      date: "October 21, 2025",
      category: "event",
      type: "Sports",
      location: "International Stadium",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2070&auto=format&fit=crop",
      size: "medium",
      span: "",
      height: "h-64",
      likes: 389,
    },
    
    {
      id: 20,
      title: "Victory Celebration",
      date: "October 21, 2025",
      category: "event",
      type: "Sports",
      location: "International Stadium",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop",
      size: "small",
      span: "",
      height: "h-56",
      likes: 267,
    },

    // Nature Picnic - Large
    {
      id: 21,
      title: "Nature Walk & Picnic",
      date: "September 12, 2025",
      category: "picnic",
      type: "Nature",
      location: "Purkhouti Muktangan",
      attendees: 180,
      image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=2070&auto=format&fit=crop",
      size: "large",
      span: "",
      height: "h-96",
      likes: 267,
    },
    
    {
      id: 22,
      title: "Forest Trail Adventure",
      date: "September 12, 2025",
      category: "picnic",
      type: "Nature",
      location: "Purkhouti Muktangan",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
      size: "medium",
      span: "",
      height: "h-72",
      likes: 198,
    },

    // New Year Celebration - Banner
    {
      id: 23,
      title: "New Year's Eve Party 2026",
      date: "December 31, 2025",
      category: "event",
      type: "Celebration",
      location: "Raipur Club",
      attendees: 500,
      image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=2069&auto=format&fit=crop",
      size: "banner",
      span: "md:col-span-2",
      height: "h-80 md:h-96",
      likes: 678,
    },
    
    {
      id: 24,
      title: "Fireworks Display",
      date: "December 31, 2025",
      category: "event",
      type: "Celebration",
      location: "Raipur Club",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
      size: "medium",
      span: "",
      height: "h-64",
      likes: 543,
    },
  ];

  const filters = [
    { id: "all", label: "All Moments", icon: Camera },
    { id: "event", label: "Events", icon: Trophy },
    { id: "picnic", label: "Picnics", icon: TreePine },
  ];

  const categoryIcons = {
    event: <Trophy className="w-4 h-4" />,
    picnic: <TreePine className="w-4 h-4" />,
  };

  const filteredData = galleryData.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateLightbox = (direction) => {
    const currentIndex = filteredData.findIndex((img) => img.id === selectedImage.id);
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < filteredData.length) {
      setSelectedImage(filteredData[newIndex]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filteredData]);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  if (!mounted) return null;

  return (
    <>
      <section className="relative py-16 min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
          <div className="absolute top-[15%] left-[8%] w-2 h-2 bg-emerald-400 rounded-full animate-ping-slow"></div>
          <div className="absolute top-[40%] right-[12%] w-3 h-3 bg-cyan-400 rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-[25%] left-[20%] w-2 h-2 bg-teal-400 rounded-full animate-pulse-slow"></div>
        </div>

        <div className="relative  px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 animate-fade-down">
              <Camera className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Our Visual Journey
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Event & Picnic{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  Gallery
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
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A beautiful mosaic of memories — from grand celebrations to candid moments
            </p>
          </div>

          {/* Stats */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap justify-around gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{galleryData.length}+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Moments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">20+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Events & Picnics</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">2,500+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Memories Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">2024-2026</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Journey Timeline</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </button>
            ))}
          </div>

          {/* Masonry Grid Layout - Consistent gap with gap-5 */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
            {filteredData.map((item, index) => (
              <div
                key={item.id}
                className={`masonry-item group cursor-pointer break-inside-avoid ${item.span}`}
                style={{ animationDelay: `${index * 0.03}s` }}
                onClick={() => openLightbox(item)}
                onMouseEnter={() => setHoveredImage(item.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <div className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-gray-800 w-full ${item.height}`}>
                  {/* Image */}
                  <div className="relative w-full h-full">
                    {!loadedImages[item.id] && (
                      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                        loadedImages[item.id] ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => handleImageLoad(item.id)}
                    />
                    
                    {/* Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 ${
                      hoveredImage === item.id ? "opacity-100" : "opacity-0"
                    }`}>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-bold text-lg mb-1 line-clamp-1">{item.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-white/80 mb-2 flex-wrap">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{item.date}</span>
                          </div>
                          {item.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate">{item.location.split(",")[0]}</span>
                            </div>
                          )}
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md rounded-lg py-2 font-medium hover:bg-white/30 transition-all duration-300">
                          <ZoomIn className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                      {categoryIcons[item.category]}
                      <span className="capitalize">{item.category}</span>
                    </div>
                    
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                      <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No moments found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try selecting a different filter category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center animate-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={() => navigateLightbox(-1)}
            className="absolute left-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={() => navigateLightbox(1)}
            className="absolute right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="max-w-5xl w-full mx-4">
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
            />
            
            <div className="mt-6 bg-black/50 backdrop-blur-md rounded-2xl p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <div className="flex flex-wrap gap-4 text-sm text-white/80 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedImage.date}</span>
                </div>
                {selectedImage.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedImage.location}</span>
                  </div>
                )}
                {selectedImage.attendees && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{selectedImage.attendees} attendees</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Camera className="w-4 h-4" />
                  <span>{selectedImage.photographer || "Community Member"}</span>
                </div>
              </div>
              {selectedImage.description && (
                <p className="text-white/70 text-sm">{selectedImage.description}</p>
              )}
              <div className="flex gap-3 mt-4 pt-3 border-t border-white/20">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <Heart className="w-4 h-4" />
                  Like ({selectedImage.likes})
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
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
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 0.2; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 10s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-fade-down { animation: fadeDown 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards !important; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .animate-ping-slow { animation: ping-slow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        /* Ensure consistent gaps between all images */
        .gap-5 {
          gap: 1.25rem;
        }
        .space-y-5 > :not([hidden]) ~ :not([hidden]) {
          margin-top: 1.25rem;
        }
        .break-inside-avoid {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      `}</style>
    </>
  );
};

export default GalleryMasonry;