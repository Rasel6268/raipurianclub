// components/Hero.js
"use client";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Users,
  Calendar,
  Trophy,
  Sparkles,
  Flag,
} from "lucide-react";
import CountUp from "react-countup";

const Hero2 = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } =
        heroRef.current.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      const rotateX = (y - 0.5) * 8;
      const rotateY = (x - 0.5) * 8;

      heroRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      heroElement.addEventListener("mouseleave", () => {
        heroElement.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      });
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <>
      <div className="relative">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Dark Overlay for better text visibility */}
          <div className="absolute inset-0">
            {/* Image */}
            <img
              src="https://res.cloudinary.com/doumlnejx/image/upload/v1777551701/WhatsApp_Image_2026-04-30_at_6.19.55_PM_2_ko7yie.jpg"
              alt="Raipurian Community gathering"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay - Dark overlay from bottom to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
            {/* Additional Radial Overlay - Darkens edges and focuses on center */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60"></div>
          </div>

          {/* Floating Elements for visual interest */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-float-slow"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-float-reverse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse-slow"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div
              ref={heroRef}
              className="text-center transition-transform duration-200 ease-out will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-1.5 mb-8 border border-white/30 animate-fade-down">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span className="text-sm font-medium text-white/95">
                  Community First Since 2026
                </span>
              </div>

              {/* Main Heading - Brighter text for better contrast */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
                Where{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                    Raipur
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-emerald-400/50"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 L100 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                Meets Progress
              </h1>

              {/* Description - Brighter text with subtle shadow */}
              <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md animate-fade-up animation-delay-200">
                Join the premier community hub for Raipur's finest — where
                connections flourish, events inspire, and collective action
                drives meaningful change.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up animation-delay-400">
                <button className="group relative px-8 py-3.5 bg-white text-emerald-700 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Become a Member
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/40 text-white rounded-full font-semibold text-lg hover:bg-white/20 hover:border-white/60 transition-all duration-300 hover:scale-105">
                  Explore Events
                </button>
              </div>

              {/* Stats - Enhanced visibility */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 max-w-3xl mx-auto mt-15 pt-8 border-t border-white/20 animate-fade-up animation-delay-600">
                <div className="flex flex-col items-center group cursor-pointer">
                  <Users className="w-8 h-8 text-emerald-300 mb-2 group-hover:scale-110 transition-transform drop-shadow" />
                  <div className="text-3xl font-bold text-white drop-shadow">
                    <CountUp end={500} duration={4.5} suffix="+" />
                  </div>
                  <div className="text-white/80 text-sm">Active Members</div>
                </div>

                <div className="flex flex-col items-center group cursor-pointer">
                  <Calendar className="w-8 h-8 text-emerald-300 mb-2 group-hover:scale-110 transition-transform drop-shadow" />
                  <div className="text-3xl font-bold text-white drop-shadow">
                    <CountUp end={60} duration={4.5} suffix="+" />
                  </div>
                  <div className="text-white/80 text-sm">Annual Events</div>
                </div>

                <div className="flex flex-col items-center group cursor-pointer">
                  <Flag className="w-8 h-8 text-emerald-300 mb-2 group-hover:scale-110 transition-transform drop-shadow" />
                  <div className="text-3xl font-bold text-white drop-shadow">
                    <CountUp end={24} duration={4.5} suffix="+" />
                  </div>
                  <div className="text-white/80 text-sm">Community Awards</div>
                </div>

                <div className="flex flex-col items-center group cursor-pointer">
                  <Trophy className="w-8 h-8 text-emerald-300 mb-2 group-hover:scale-110 transition-transform drop-shadow" />
                  <div className="text-3xl font-bold text-white drop-shadow">
                    <CountUp end={15} duration={4.5} suffix="+" />
                  </div>
                  <div className="text-white/80 text-sm">
                    Years of Excellence
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Hero2;
