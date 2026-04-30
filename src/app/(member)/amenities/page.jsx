'use client';
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import {
  Droplets,
  Home,
  Dumbbell,
  Trees,
  Wifi,
  Coffee,
  Car,
  Shield,
  Clock,
  MapPin,
  CheckCircle,
  Star,
  Users,
  Calendar,
  ArrowRight,
  Sparkles,
  Heart,
  Wind,
  Sun,
  Moon,
  Lock,
  Key,
  Phone,
  Mail,
  MessageCircle,
  Share2,
  ThumbsUp,
  Award,
  Flame,
  Snowflake,
  Utensils,
  Tv,
  BookOpen,
  Music,
  Battery,
  Zap,
  Thermometer,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  TrendingUp,
  Crown,
  Gift,
  Globe,
  Cake,
  IceCream,
  Sandwich,
} from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const AmenitiesPage = () => {
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs for animations
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const amenitiesGridRef = useRef(null);
  const housingSectionRef = useRef(null);
  const poolSectionRef = useRef(null);
  const gymSectionRef = useRef(null);
  const cafeSectionRef = useRef(null);
  const ctaRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);

  // Amenities Data
  const amenities = [
    {
      id: 1,
      title: "Swimming Pool",
      category: "Recreation",
      icon: Droplets,
      description: "Olympic-sized swimming pool with temperature control, professional lifeguards, and separate children's pool area. Perfect for both serious swimmers and families looking to relax.",
      features: [
        "Olympic-sized (50m) main pool",
        "Temperature controlled (26-28°C)",
        "Children's pool (0.5m depth)",
        "Professional lifeguards on duty",
        "Poolside lounge chairs & umbrellas",
        "Changing rooms with lockers",
        "Jacuzzi & steam room",
        "Night swimming with LED lights",
      ],
      hours: "5:00 AM - 10:00 PM Daily",
      location: "Building A, Ground Floor",
      capacity: "50 people at a time",
      image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&h=500&fit=crop",
      color: "from-blue-500 to-cyan-500",
      gradient: "from-blue-600 to-cyan-600",
      stats: { users: "2.5k+", rating: "4.8", year: "2024" }
    },
    {
      id: 2,
      title: "Housing Facility",
      category: "Living",
      icon: Home,
      description: "Modern, fully-furnished residential units with stunning views. Choose from studio, 1-bedroom, 2-bedroom, or luxury penthouses.",
      features: [
        "Fully furnished apartments",
        "Modern kitchen with appliances",
        "High-speed WiFi included",
        "Central AC & heating",
        "In-unit washer & dryer",
        "Walk-in closets",
        "Balcony with city views",
        "24/7 maintenance service",
      ],
      hours: "24/7 Access",
      location: "Towers 1-4",
      capacity: "200+ units available",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
      color: "from-emerald-500 to-teal-500",
      gradient: "from-emerald-600 to-teal-600",
      stats: { users: "500+", rating: "4.9", year: "2024" }
    },
    {
      id: 3,
      title: "Fitness Center",
      category: "Health",
      icon: Dumbbell,
      description: "State-of-the-art fitness center equipped with the latest cardio and strength training equipment. Certified personal trainers available.",
      features: [
        "Cardio zone (treadmills, ellipticals, bikes)",
        "Strength training area",
        "Free weights section",
        "Functional training zone",
        "Yoga & Pilates studio",
        "Personal training available",
        "Group classes (Zumba, Spin, HIIT)",
        "Locker rooms with showers",
      ],
      hours: "4:00 AM - 12:00 AM Daily",
      location: "Building B, 2nd Floor",
      capacity: "100 people at a time",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop",
      color: "from-purple-500 to-pink-500",
      gradient: "from-purple-600 to-pink-600",
      stats: { users: "1.8k+", rating: "4.7", year: "2024" }
    },
    {
      id: 4,
      title: "Playground",
      category: "Family",
      icon: Trees,
      description: "Safe, modern playground designed for children of all ages. Features soft rubber flooring and age-appropriate equipment.",
      features: [
        "Age-specific play zones (2-5, 6-12 years)",
        "Soft rubber safety flooring",
        "Slides, swings, and climbing structures",
        "Sand pit area",
        "Water play zone (summer)",
        "Shaded seating for parents",
        "CCTV surveillance",
        "Regular safety inspections",
      ],
      hours: "6:00 AM - 8:00 PM Daily",
      location: "Central Park Area",
      capacity: "75 children at a time",
      image: "https://res.cloudinary.com/doumlnejx/image/upload/v1777548868/PW_Inclusive-Web-Page-Images_05-min-1-e1772120526461_ulhnzs.webp",
      color: "from-amber-500 to-orange-500",
      gradient: "from-amber-600 to-orange-600",
      stats: { users: "1.2k+", rating: "4.6", year: "2024" }
    },
    {
      id: 5,
      title: "Cafe Shop",
      category: "Dining",
      icon: Coffee,
      description: "Cozy and modern cafe serving freshly brewed coffee, artisanal pastries, healthy smoothies, and delicious light meals. Perfect for casual meetings or relaxing breaks.",
      features: [
        "Freshly roasted specialty coffee beans",
        "Artisanal pastries & baked goods",
        "Healthy smoothies & fresh juices",
        "Gourmet sandwiches & salads",
        "Free high-speed WiFi",
        "Indoor & outdoor seating",
        "Takeaway & delivery options",
        "Loyalty rewards program",
        "Monthly specials & seasonal drinks",
        "Quiet study/work area",
      ],
      hours: "7:00 AM - 11:00 PM Daily",
      location: "Building A, Ground Floor (Near Lobby)",
      capacity: "60 seats (including outdoor)",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=500&fit=crop",
      color: "from-amber-500 to-orange-500",
      gradient: "from-amber-600 to-orange-600",
      stats: { users: "3.2k+", rating: "4.9", year: "2024" },
      menuItems: [
        "Espresso, Latte, Cappuccino",
        "Fresh Croissants & Muffins",
        "Signature Cold Brew",
        "Avocado Toast",
        "Acai Bowls",
        "Protein Smoothies",
      ]
    },
  ];

  // Housing images
  const housingImages = [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=500&fit=crop",
  ];

  const poolImages = [
    "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=500&fit=crop",
  ];

  const gymImages = [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=500&fit=crop",
  ];

  const cafeImages = [
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=500&fit=crop",
  ];

  // Initialize GSAP animations
  useEffect(() => {
    // Hero text typing animation
    const heroText = "World-Class Facilities";
    let i = 0;
    const typeInterval = setInterval(() => {
      if (heroTextRef.current && i <= heroText.length) {
        heroTextRef.current.textContent = heroText.substring(0, i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);

    // Hero floating animation
    gsap.to(heroRef.current, {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Staggered fade-in for amenity cards
    gsap.fromTo(".amenity-card",
      {
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: amenitiesGridRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Left-Right sequential animations for sections
    const sections = [
      { left: leftContentRef.current, right: rightContentRef.current, trigger: housingSectionRef.current },
      { left: poolSectionRef.current, right: null, trigger: poolSectionRef.current },
      { left: gymSectionRef.current, right: null, trigger: gymSectionRef.current },
      { left: null, right: cafeSectionRef.current, trigger: cafeSectionRef.current },
    ];

    sections.forEach((section, idx) => {
      if (section.left) {
        gsap.fromTo(section.left,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section.trigger,
              start: "top 75%",
              end: "bottom 50%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
      if (section.right) {
        gsap.fromTo(section.right,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section.trigger,
              start: "top 75%",
              end: "bottom 50%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      clearInterval(typeInterval);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Hover animations for amenity cards
  const handleCardHover = (element, isEnter) => {
    if (isEnter) {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: "back.out(1.2)"
      });
    } else {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "back.in(1.2)"
      });
    }
  };

  const AmenityCard = ({ amenity, index, onClick }) => {
    const cardRef = useRef(null);
    const IconComponent = amenity.icon;

    return (
      <div
        ref={cardRef}
        className="amenity-card group relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
        onClick={() => onClick(amenity)}
        onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
        onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
      >
        {/* Animated gradient border */}
        <div className={`absolute inset-0 bg-linear-to-r ${amenity.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
        
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={amenity.image}
            alt={amenity.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-white text-xs font-medium">{amenity.stats.rating}</span>
          </div>
          <div className="absolute bottom-3 left-3">
            <div className={`px-2 py-1 rounded-lg bg-linear-to-r ${amenity.gradient} text-white text-xs font-medium`}>
              {amenity.category}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl bg-linear-to-r ${amenity.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">{amenity.title}</h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">{amenity.category}</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{amenity.description}</p>
          
          {/* Animated stats bar */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Users className="w-3 h-3" />
              <span>{amenity.stats.users}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              <span>7AM-11PM</span>
            </div>
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AmenityModal = ({ amenity, onClose }) => {
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(".modal-content",
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" }
      );
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);

    const IconComponent = amenity.icon;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="modal-content relative bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/90 dark:bg-gray-700/90 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-lg"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="relative h-64 overflow-hidden rounded-t-2xl">
            <img src={amenity.image} alt={amenity.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
            <div className={`absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-linear-to-r ${amenity.gradient} text-white font-semibold`}>
              {amenity.category}
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-linear-to-r ${amenity.gradient} flex items-center justify-center`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{amenity.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{amenity.stats.rating} · {amenity.stats.users} users</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{amenity.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {amenity.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <InfoIcon className="w-5 h-5 text-blue-500" />
                  Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">Hours: {amenity.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">Location: {amenity.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">Capacity: {amenity.capacity}</span>
                  </div>
                </div>
              </div>
            </div>

            {amenity.menuItems && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-amber-500" />
                  Popular Menu Items
                </h3>
                <div className="flex flex-wrap gap-2">
                  {amenity.menuItems.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button className={`flex-1 bg-linear-to-r ${amenity.gradient} text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                Book a Visit
              </button>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ImageGalleryModal = ({ images, title, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        <div className="relative max-w-5xl w-full">
          <img
            src={images[currentIndex]}
            alt={`${title} ${currentIndex + 1}`}
            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
          />
          
          <button
            onClick={() => setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={() => setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0))}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          
          <div className="text-center mt-4 text-white">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    );
  };

  const InfoIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 w-125 h-125 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse-slow"></div>
      </div>

      {/* Hero Section with Typographic Animation */}
      <div ref={heroRef} className="relative overflow-hidden bg-linear-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white py-24 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 animate-bounce-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Premium Amenities</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4">
            <span ref={heroTextRef} className="inline-block">World-Class Facilities</span>
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto animate-fade-in-up-delayed">
            Experience luxury living with our premium amenities designed for comfort, health, and happiness
          </p>
          
          {/* Animated scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white rounded-full mt-2 animate-scroll-down"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Amenities Grid */}
      <div ref={amenitiesGridRef} className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full px-4 py-1.5 mb-4">
            <Star className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Our Signature Amenities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Premium{" "}
            <span className="bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Facilities
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our carefully curated amenities designed to enhance your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <AmenityCard
              key={amenity.id}
              amenity={amenity}
              index={index}
              onClick={(a) => {
                setSelectedAmenity(a);
                setShowModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Housing Section - Left Right Layout */}
      <div ref={housingSectionRef} className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Text and Features */}
          <div ref={leftContentRef} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full px-4 py-1.5 mb-4">
                <Home className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Luxury Living</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                Modern Housing{" "}
                <span className="bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  Facilities
                </span>
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Experience contemporary living in our thoughtfully designed spaces that blend comfort, style, and functionality.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Key, text: "Smart Lock Access" },
                { icon: Wifi, text: "High-Speed WiFi" },
                { icon: Shield, text: "24/7 Security" },
                { icon: Car, text: "Reserved Parking" },
                { icon: Thermometer, text: "Central AC" },
                { icon: Tv, text: "Smart TV Ready" },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:translate-x-1">
                  <feature.icon className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            <button className="group inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Explore Housing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Content - Image Gallery */}
          <div ref={rightContentRef} className="grid grid-cols-2 gap-3">
            {housingImages.slice(0, 4).map((img, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedImage(housingImages);
                  setShowImageModal(true);
                }}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group/image"
              >
                <img
                  src={img}
                  alt={`Housing ${idx + 1}`}
                  className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover/image:opacity-100 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Swimming Pool Section - Alternating Layout */}
      <div ref={poolSectionRef} className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Image Gallery */}
            <div className="grid grid-cols-2 gap-3 order-2 lg:order-1">
              {poolImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedImage(poolImages);
                    setShowImageModal(true);
                  }}
                  className={`relative overflow-hidden rounded-xl cursor-pointer group/image ${idx === 0 ? 'col-span-2 row-span-2 aspect-video' : 'aspect-square'}`}
                >
                  <img
                    src={img}
                    alt={`Pool ${idx + 1}`}
                    className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover/image:opacity-100 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Content - Text and Features */}
            <div className="space-y-6 order-1 lg:order-2">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 rounded-full px-4 py-1.5 mb-4">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Aquatic Paradise</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                  Olympic-Sized{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Swimming Pool
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Dive into luxury with our temperature-controlled Olympic-sized pool, perfect for both serious swimmers and families.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Thermometer, text: "Temperature: 26-28°C" },
                  { icon: Users, text: "Capacity: 50 persons" },
                  { icon: Clock, text: "Hours: 5AM - 10PM" },
                  { icon: Shield, text: "Lifeguards on duty" },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:translate-x-1">
                    <feature.icon className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>

              <button className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                Pool Schedule
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fitness Center Section */}
      <div ref={gymSectionRef} className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Text and Features */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/40 rounded-full px-4 py-1.5 mb-4">
                <Dumbbell className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Health & Wellness</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                State-of-the-Art{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Fitness Center
                </span>
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Achieve your fitness goals with our premium equipment, certified trainers, and diverse class offerings.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: ActivityIcon, text: "Cardio Zone" },
                { icon: Dumbbell, text: "Strength Training" },
                { icon: Users, text: "Group Classes" },
                { icon: Award, text: "Personal Training" },
                { icon: Clock, text: "4AM - 12AM Daily" },
                { icon: Music, text: "Spin & Zumba" },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:translate-x-1">
                  <feature.icon className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            <button className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              View Classes
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Content - Image Gallery */}
          <div className="grid grid-cols-2 gap-3">
            {gymImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedImage(gymImages);
                  setShowImageModal(true);
                }}
                className="relative overflow-hidden rounded-xl cursor-pointer group/image"
              >
                <img
                  src={img}
                  alt={`Gym ${idx + 1}`}
                  className="w-full h-48 object-cover group-hover/image:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover/image:opacity-100 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cafe Shop Section */}
      <div ref={cafeSectionRef} className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Image Gallery */}
            <div className="grid grid-cols-2 gap-3">
              {cafeImages.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedImage(cafeImages);
                    setShowImageModal(true);
                  }}
                  className={`relative overflow-hidden rounded-xl cursor-pointer group/image ${idx === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}
                >
                  <img
                    src={img}
                    alt={`Cafe ${idx + 1}`}
                    className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover/image:opacity-100 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Content - Text and Features */}
            <div ref={rightContentRef} className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/40 rounded-full px-4 py-1.5 mb-4">
                  <Coffee className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-700">Dining & Social</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                  Cozy{" "}
                  <span className="bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Cafe Shop
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Start your day with freshly brewed coffee, enjoy healthy snacks, and connect with friends in our warm, inviting cafe space with free WiFi.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Coffee, text: "Specialty Coffee" },
                  { icon: Cake, text: "Fresh Pastries" },
                  { icon: Wifi, text: "Free High-Speed WiFi" },
                  { icon: Clock, text: "7AM - 11PM Daily" },
                  { icon: Sandwich, text: "Healthy Meals" },
                  { icon: IceCream, text: "Desserts & Treats" },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:translate-x-1">
                    <feature.icon className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                  View Menu
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-amber-600 border border-amber-200 dark:border-amber-700 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Order Online
                  <Coffee className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section with Parallax */}
      <div ref={ctaRef} className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <div className="bg-linear-to-r from-emerald-600 to-cyan-600 rounded-2xl p-8 text-center text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-cyan-500 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <Crown className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h3 className="text-3xl font-bold mb-2">Ready to Experience Luxury?</h3>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Schedule a tour of our premium amenities and discover a new standard of living
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="bg-white text-emerald-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg group/btn">
                Book a Tour
                <ArrowRight className="w-4 h-4 inline-block ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModal && selectedAmenity && (
        <AmenityModal amenity={selectedAmenity} onClose={() => setShowModal(false)} />
      )}
      
      {showImageModal && selectedImage && (
        <ImageGalleryModal
          images={selectedImage}
          title="Gallery"
          onClose={() => setShowImageModal(false)}
        />
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
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUpDelayed {
          0% { opacity: 0; transform: translateY(40px); }
          50% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        @keyframes scrollDown {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
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
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        .animate-fade-in-up-delayed {
          animation: fadeInUpDelayed 1.2s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        .animate-bounce-in {
          animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        .animate-scroll-down {
          animation: scrollDown 1.5s ease-in-out infinite;
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

const ActivityIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export default AmenitiesPage;