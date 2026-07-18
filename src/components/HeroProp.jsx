import { Calendar, Flag, Sparkles, Trophy, Users } from "lucide-react";
import React from "react";

const HeroProp = ({ title, heading1, heading2, content, Icon = Users }) => {
  return (
    <section className="relative overflow-hidden w-full -mx-4 sm:-mx-6 lg:-mx-8 mb-12" style={{ width: 'calc(100% + 2rem)' }}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-r from-emerald-900/70 via-teal-900/50 to-cyan-900/70 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
          alt="Community gathering"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-10 left-5 w-40 h-40 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-5 w-48 h-48 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 border border-white/20">
            <Icon className="w-4 h-4 text-emerald-300" />
            <span className="text-sm font-medium text-white/90 tracking-wide">
              {title}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            {heading1}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                {heading2}
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-2 text-emerald-400/30"
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

          <p className="text-base md:text-lg lg:text-xl text-white/85 max-w-2xl mx-auto mb-8">
            {content}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10">
                <Users className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white">2.5K+</div>
                <div className="text-xs text-white/70">Members</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10">
                <Calendar className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white">60+</div>
                <div className="text-xs text-white/70">Events</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10">
                <Flag className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white">24+</div>
                <div className="text-xs text-white/70">Initiatives</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10">
                <Trophy className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white">15+</div>
                <div className="text-xs text-white/70">Awards</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroProp;