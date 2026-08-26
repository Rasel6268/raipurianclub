// components/MissionVision.js
"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
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
  Handshake,
  Star,
  Rocket,
  Trophy,
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

    const elements = [missionRef.current, visionRef.current];
    elements.forEach((el) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
        observer.observe(el);
      }
    });

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
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
    const duration = 1800;
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

  const coreValues = [
    {
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Community First",
      description: "We put the well-being and unity of our members at the center of every initiative.",
      color: "from-rose-500 to-pink-500",
      bgGlow: "bg-rose-50 dark:bg-rose-950/30 text-rose-600",
    },
    {
      icon: <Handshake className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Trust & Integrity",
      description: "Building lasting bonds through transparency, mutual respect, and ethical standards.",
      color: "from-emerald-500 to-teal-500",
      bgGlow: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600",
    },
    {
      icon: <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Innovation",
      description: "Fostering progressive ideas, modern infrastructure, and creative problem solving.",
      color: "from-amber-500 to-orange-500",
      bgGlow: "bg-amber-50 dark:bg-amber-950/30 text-amber-600",
    },
    {
      icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Inclusivity",
      description: "Creating a welcoming environment where every citizen's voice is respected and heard.",
      color: "from-blue-500 to-cyan-500",
      bgGlow: "bg-blue-50 dark:bg-blue-950/30 text-blue-600",
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Sustainability",
      description: "Building resilient social and environmental assets that thrive for generations.",
      color: "from-teal-500 to-emerald-500",
      bgGlow: "bg-teal-50 dark:bg-teal-950/30 text-teal-600",
    },
    {
      icon: <Star className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Excellence",
      description: "Upholding supreme quality and prestigious standards across club amenities and events.",
      color: "from-purple-500 to-indigo-500",
      bgGlow: "bg-purple-50 dark:bg-purple-950/30 text-purple-600",
    },
  ];

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

  const impactStats = [
    { value: counters.members, label: "Active Members", icon: Users, suffix: "+" },
    { value: counters.events, label: "Annual Events", icon: Target, suffix: "+" },
    { value: counters.partners, label: "Partner Organizations", icon: Handshake, suffix: "+" },
    { value: counters.awards, label: "Community Awards", icon: Trophy, suffix: "+" },
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 md:w-96 h-80 md:h-96 bg-emerald-400/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 md:w-96 h-80 md:h-96 bg-cyan-400/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-3.5">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              Our Guiding Principles
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Mission &{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
              Vision
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Driven by purpose and guided by values — shaping a brighter, more connected tomorrow for Raipur.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16 sm:mb-20">
          {/* Mission Card */}
          <div
            ref={missionRef}
            className="group relative bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-100 dark:border-slate-700 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                  <Target className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Our Purpose
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    আমাদের লক্ষ্য
                  </h3>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                রায়পুরের সামাজিক ও জীবনমানের সার্বিক উন্নয়ন সাধনের উদ্দেশ্যে একটি অত্যাধুনিক, সুসংগঠিত ও বহুমুখী ক্লাব কমপ্লেক্স প্রতিষ্ঠা করা; যেখানে সকল শ্রেণি-পেশার মানুষের যোগাযোগ, সুস্থ বিনোদন, শিক্ষা, স্বাস্থ্য ও সাংস্কৃতিক কার্যক্রমের মাধ্যমে একটি সমৃদ্ধ ও ঐক্যবদ্ধ সমাজ গড়ে উঠবে।
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
              <span>Making a lasting difference, every day</span>
            </div>
          </div>

          {/* Vision Card */}
          <div
            ref={visionRef}
            className="group relative bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-cyan-100 dark:border-slate-700 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                  <Eye className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    Our Objectives
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    উদ্দেশ্যসমূহ
                  </h3>
                </div>
              </div>
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-2">
                {visionPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                    <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center text-cyan-600 dark:text-cyan-400 font-semibold text-sm">
              <span>Building tomorrow, together</span>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-10 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              Our Core Values
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              The fundamental standards that shape our community decisions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
                className="bg-white dark:bg-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl ${value.bgGlow} flex items-center justify-center mb-4 transition-transform`}>
                  {value.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {value.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Stats Banner */}
        <div id="stats-section" className="relative rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 sm:p-10 md:p-12 text-white shadow-2xl overflow-hidden">
          <div className="relative z-10 text-center mb-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2">
              Our Community Impact
            </h3>
            <p className="text-slate-100 text-sm sm:text-base max-w-md mx-auto">
              Together creating meaningful transformation for the Raipur region
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {impactStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center border border-white/20 hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 mx-auto bg-white/20 rounded-xl flex items-center justify-center mb-3">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-1">
                  {Math.floor(stat.value)}
                  {stat.suffix}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Mission Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/register"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-bold text-base shadow-xl hover:shadow-emerald-500/25 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Rocket className="w-5 h-5" />
            <span>Join Our Mission</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;