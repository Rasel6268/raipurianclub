// components/MissionVision.js
"use client";
import { useRef, useEffect, useState } from "react";
import {
  Target,
  Eye,
  Heart,
  Users,
  Lightbulb,
  Globe,
  Shield,
  Sparkles,
  ArrowRight,
  Leaf,
  HandshakeIcon,
  Star,
  Rocket,
  Zap,
  TrendingUp,
  Award,
  ChevronRight,
  Circle,
  CheckCircle2,
} from "lucide-react";

const MissionVision = () => {
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [counters, setCounters] = useState({
    members: 0,
    events: 0,
    partners: 0,
    awards: 0,
  });

  useEffect(() => {
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
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    );

    const elements = [missionRef.current, visionRef.current];
    elements.forEach((el) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1)";
        observer.observe(el);
      }
    });

    // Counter animation
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById("stats-section");
    if (statsSection) counterObserver.observe(statsSection);

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
      if (statsSection) counterObserver.unobserve(statsSection);
    };
  }, []);

  const animateCounters = () => {
    const targets = { members: 2500, events: 60, partners: 24, awards: 15 };
    const duration = 2000;
    const step = 20;
    const increments = {
      members: targets.members / (duration / step),
      events: targets.events / (duration / step),
      partners: targets.partners / (duration / step),
      awards: targets.awards / (duration / step),
    };

    let current = { members: 0, events: 0, partners: 0, awards: 0 };
    const timer = setInterval(() => {
      let allComplete = true;
      Object.keys(current).forEach((key) => {
        if (current[key] < targets[key]) {
          allComplete = false;
          current[key] = Math.min(current[key] + increments[key], targets[key]);
        }
      });
      setCounters({ ...current });
      if (allComplete) clearInterval(timer);
    }, step);
  };

  // Core values data with enhanced styling
  const coreValues = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Community First",
      description:
        "We put the needs and well-being of our community members at the heart of everything we do.",
      color: "from-rose-500 to-pink-500",
      bgGlow: "bg-rose-50 dark:bg-rose-950/20",
      gradient: "group-hover:from-rose-500 group-hover:to-pink-500",
    },
    {
      icon: <HandshakeIcon className="w-6 h-6" />,
      title: "Trust & Integrity",
      description:
        "Building lasting relationships through transparency, honesty, and mutual respect.",
      color: "from-emerald-500 to-teal-500",
      bgGlow: "bg-emerald-50 dark:bg-emerald-950/20",
      gradient: "group-hover:from-emerald-500 group-hover:to-teal-500",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      description:
        "Embracing new ideas and creative solutions to drive meaningful progress.",
      color: "from-amber-500 to-orange-500",
      bgGlow: "bg-amber-50 dark:bg-amber-950/20",
      gradient: "group-hover:from-amber-500 group-hover:to-orange-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Inclusivity",
      description:
        "Creating a welcoming space where every voice is heard and valued.",
      color: "from-blue-500 to-cyan-500",
      bgGlow: "bg-blue-50 dark:bg-blue-950/20",
      gradient: "group-hover:from-blue-500 group-hover:to-cyan-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Sustainability",
      description:
        "Building a resilient community that thrives for generations to come.",
      color: "from-green-500 to-emerald-500",
      bgGlow: "bg-green-50 dark:bg-green-950/20",
      gradient: "group-hover:from-green-500 group-hover:to-emerald-500",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Excellence",
      description:
        "Striving for the highest standards in every initiative we undertake.",
      color: "from-purple-500 to-violet-500",
      bgGlow: "bg-purple-50 dark:bg-purple-950/20",
      gradient: "group-hover:from-purple-500 group-hover:to-violet-500",
    },
  ];

  // Vision points with icons
  const visionPoints = [
    "আধুনিক ও মানসম্মত আবাসন ও বিনোদন ব্যবস্থা সম্বলিত ক্লাব কমপ্লেক্স স্থাপন",
    "অভিজাত ব্যক্তিবর্গের নিয়মিত যোগাযোগের সুবিধার্থে মিলনস্থল হিসেবে সুসংগঠিত ক্লাব স্থাপন",
    "বিভিন্ন শ্রেণির ব্যক্তিবর্গের মধ্যে সমন্বিত বন্ধনের উপযোগী প্ল্যাটফর্ম তৈরি",
    "দেশি ও বিদেশি ব্যবসায়িক কার্যক্রমের জন্য আধুনিক অবকাঠামো ও সুযোগ-সুবিধা নিশ্চিতকরণ",
    "বৃত্তি ও সহযোগিতা কার্যক্রমের মাধ্যমে শিক্ষা ব্যবস্থার উন্নতি ও ছাত্রদের উচ্চ শিক্ষায় উৎসাহ প্রদান",
    "প্রয়োজনীয় চিকিৎসাযোগ্য উপকরণসহ আধুনিক স্বাস্থ্য সুবিধা নিশ্চিতকরণ",
    "যুব ও তরুণ সমাজকে দক্ষ জনশক্তি হিসেবে গড়ে তোলার মাধ্যমে কর্মসংস্থানের সুযোগ সৃষ্টি",
    "সামাজিক, সাংস্কৃতিক ও ক্রীড়া কার্যক্রমের মাধ্যমে সামাজিক ঐক্য ও সংস্কৃতি চর্চা",
  ];

  // Impact stats
  const impactStats = [
    { value: counters.members, label: "Active Members", icon: Users, suffix: "+" },
    { value: counters.events, label: "Annual Events", icon: Target, suffix: "+" },
    { value: counters.partners, label: "Partner Organizations", icon: HandshakeIcon, suffix: "+" },
    { value: counters.awards, label: "Community Awards", icon: Trophy, suffix: "+" },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-300 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-reverse"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-amber-300 to-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-pulse-slow"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Enhanced Animation */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 animate-bounce-slow border border-emerald-500/20">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Our Guiding Light
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Mission &{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                Vision
              </span>
              <svg
                className="absolute -bottom-3 left-0 w-full h-4 text-emerald-400/40"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 4 L100 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  className="animate-draw-line"
                />
              </svg>
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Driven by purpose, guided by values — shaping a better tomorrow for
            Raipur's community
          </p>
        </div>

        {/* Mission & Vision Cards - Enhanced Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-24">
          {/* Mission Card */}
          <div
            ref={missionRef}
            className="group relative bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-800 dark:to-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 border border-emerald-100 dark:border-gray-700"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Corner decoration */}
            <div className="absolute top-0 left-0 w-32 h-32">
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-emerald-400/50 rounded-tl-2xl"></div>
            </div>
            
            <div className="relative p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Our Purpose
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                    লক্ষ্য
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                রায়পুরের সামাজিক ও জীবনমানের সার্বিক উন্নয়ন সাধনের উদ্দেশ্যে
                একটি আধুনিক, সুসংগঠিত ও বহুমুখী ক্লাব কমপ্লেক্স প্রতিষ্ঠা করা,
                যেখানে অভিজাত ও সাধারণ জনগণের মধ্যে যোগাযোগ, বিনোদন, শিক্ষা,
                স্বাস্থ্য ও সাংস্কৃতিক কার্যক্রমের মাধ্যমে একটি উন্নত ও সমন্বিত
                সমাজ গড়ে তোলা সম্ভব হবে।
              </p>
              
              <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-semibold group/link">
                <span className="border-b-2 border-emerald-400/50 pb-1">Making a difference, every day</span>
                <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-all duration-300" />
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div
            ref={visionRef}
            className="group relative bg-gradient-to-br from-white to-cyan-50/30 dark:from-gray-800 dark:to-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 border border-cyan-100 dark:border-gray-700"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Corner decoration */}
            <div className="absolute bottom-0 right-0 w-32 h-32">
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-cyan-400/50 rounded-br-2xl"></div>
            </div>
            
            <div className="relative p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                    Our Goals
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                    উদ্দেশ্যসমূহ
                  </h3>
                </div>
              </div>
              
              <div className="space-y-3 mb-8 max-h-80 overflow-y-auto custom-scrollbar pr-2">
                {visionPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 group/item">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-cyan-500 group-hover/item:scale-110 transition-transform" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-3 text-cyan-600 dark:text-cyan-400 font-semibold group/link">
                <span className="border-b-2 border-cyan-400/50 pb-1">Building tomorrow, together</span>
                <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section with Enhanced Cards */}
        <div className="mt-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full px-4 py-1.5 mb-4">
              <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                What We Stand For
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Values
              </span>
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide our decisions and define our community
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
                className="group relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl ${value.bgGlow} flex items-center justify-center mb-5 text-gray-700 dark:text-gray-200 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg`}>
                    {value.icon}
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300" style={{ backgroundImage: hoveredValue === index ? `linear-gradient(to right, ${value.color.split(' ')[1]}, ${value.color.split(' ')[3]})` : 'none' }}>
                    {value.title}
                  </h4>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                  
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Stats Section - Enhanced */}
        <div id="stats-section" className="mt-24">
          <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-10 md:p-14 text-white overflow-hidden shadow-2xl">
            {/* Animated background */}
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-0 -right-32 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-0 -left-32 w-64 h-64 bg-black/10 rounded-full blur-3xl animate-float-reverse"></div>
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-particle"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-3">
                Our Impact So Far
              </h3>
              <p className="text-white/90 text-lg max-w-md mx-auto">
                Together, we're creating measurable change in the Raipur community
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {impactStats.map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:bg-white/30 backdrop-blur-sm">
                      <stat.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 bg-gradient-to-r from-white to-white/80 bg-clip-text">
                    {Math.floor(stat.value)}{stat.suffix}
                  </div>
                  <div className="text-white/85 text-sm md:text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-white/20 rounded-bl-2xl"></div>
            <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-white/20 rounded-tr-2xl"></div>
          </div>
        </div>

        {/* CTA Section - Enhanced */}
        <div className="text-center mt-20">
          <button className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span>Join Our Mission</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-5 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            Be part of something bigger — together we thrive
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
          </p>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(15px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(-15px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes draw-line {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 10s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards !important; }
        .animate-draw-line { stroke-dasharray: 100; animation: draw-line 1.5s ease-out forwards; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-gradient { background-size: 200% auto; animation: gradient-shift 3s ease infinite; }
        .animate-float-particle { animation: float-particle 4s ease-in-out infinite; }
        
        .bg-grid-pattern {
          background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .dark .bg-grid-pattern {
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 1px);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.5);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.8);
        }
        
        @media (max-width: 768px) {
          .custom-scrollbar {
            max-height: 400px;
          }
        }
      `}</style>
    </section>
  );
};

// Helper component for Trophy icon
const Trophy = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export default MissionVision;