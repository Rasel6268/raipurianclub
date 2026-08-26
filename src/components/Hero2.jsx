// components/Hero2.js
"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Calendar,
  Trophy,
  Sparkles,
  Award,
} from "lucide-react";
import CountUp from "react-countup";

const Hero2 = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // Parallax only on non-touch devices with fine cursor
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      const rotateX = (y - 0.5) * 6;
      const rotateY = (x - 0.5) * 6;

      heroRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      heroElement.addEventListener("mouseleave", () => {
        heroElement.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      });
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const stats = [
    { icon: Users, count: 500, suffix: "+", label: "Active Members" },
    { icon: Calendar, count: 60, suffix: "+", label: "Annual Events" },
    { icon: Award, count: 24, suffix: "+", label: "Community Awards" },
    { icon: Trophy, count: 15, suffix: "+", label: "Years of Excellence" },
  ];

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 md:py-32">
      {/* Background Image with Dark & Radial Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/doumlnejx/image/upload/v1777551701/WhatsApp_Image_2026-04-30_at_6.19.55_PM_2_ko7yie.jpg"
          alt="Raipurian Community Gathering"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-950/40"></div>
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/30 to-slate-950/80"></div>
      </div>

      {/* Subtle Floating Ambient Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-1/4 left-1/12 w-64 md:w-96 h-64 md:h-96 bg-emerald-500/20 rounded-full filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/12 w-72 md:w-[420px] h-72 md:h-[420px] bg-teal-500/20 rounded-full filter blur-3xl animate-float-reverse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          ref={heroRef}
          className="text-center transition-transform duration-200 ease-out will-change-transform max-w-4xl mx-auto"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 dark:bg-slate-900/60 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 sm:mb-8 border border-white/25 shadow-lg animate-fade-down">
            <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              Community First Since 2026
            </span>
          </div>

          {/* Responsive Hero Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-5 sm:mb-6 leading-[1.15] tracking-tight drop-shadow-md">
            Where{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                Raipur
              </span>
              <svg
                className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 text-emerald-400/60"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 L100 5"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            Meets Progress
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200/95 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal drop-shadow-sm px-2">
            Join the premier community club for Raipur’s visionary citizens — where
            meaningful connections flourish, events inspire, and collective action drives real progress.
          </p>

          {/* Responsive Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto mb-12 sm:mb-16">
            <Link
              href="/register"
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-900 rounded-full font-bold text-base shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group btn-shimmer"
            >
              <span>Become a Member</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/events"
              className="w-full sm:w-auto px-7 py-3.5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold text-base hover:bg-white/20 hover:border-white/50 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              Explore Events
            </Link>
          </div>

          {/* Responsive Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 pt-6 border-t border-white/15">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 hover:border-emerald-400/40 transition-all duration-300 hover:scale-105 flex flex-col items-center group shadow-md"
              >
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 mb-2 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  <CountUp end={stat.count} duration={3} suffix={stat.suffix} enableScrollSpy scrollSpyOnce />
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5 text-center">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero2;

