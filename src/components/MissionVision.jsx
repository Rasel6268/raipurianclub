// components/MissionVision.js
"use client";
import { useRef, useEffect } from "react";
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
} from "lucide-react";

const MissionVision = () => {
  const missionRef = useRef(null);
  const visionRef = useRef(null);

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
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
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

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Core values data
  const coreValues = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Community First",
      description:
        "We put the needs and well-being of our community members at the heart of everything we do.",
      color: "from-rose-500 to-pink-500",
      bgGlow: "bg-rose-50 dark:bg-rose-950/20",
    },
    {
      icon: <HandshakeIcon className="w-6 h-6" />,
      title: "Trust & Integrity",
      description:
        "Building lasting relationships through transparency, honesty, and mutual respect.",
      color: "from-emerald-500 to-teal-500",
      bgGlow: "bg-emerald-50 dark:bg-emerald-950/20",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      description:
        "Embracing new ideas and creative solutions to drive meaningful progress.",
      color: "from-amber-500 to-orange-500",
      bgGlow: "bg-amber-50 dark:bg-amber-950/20",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Inclusivity",
      description:
        "Creating a welcoming space where every voice is heard and valued.",
      color: "from-blue-500 to-cyan-500",
      bgGlow: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Sustainability",
      description:
        "Building a resilient community that thrives for generations to come.",
      color: "from-green-500 to-emerald-500",
      bgGlow: "bg-green-50 dark:bg-green-950/20",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Excellence",
      description:
        "Striving for the highest standards in every initiative we undertake.",
      color: "from-purple-500 to-violet-500",
      bgGlow: "bg-purple-50 dark:bg-purple-950/20",
    },
  ];

  // Impact stats
  const impactStats = [
    { value: "2,500+", label: "Active Members", icon: Users },
    { value: "60+", label: "Annual Events", icon: Target },
    { value: "24+", label: "Partner Organizations", icon: HandshakeIcon },
    { value: "15+", label: "Community Awards", icon: Trophy },
  ];

  return (
    <section className="relative py-8 overflow-hidden bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Our Guiding Light
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Mission &{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Vision
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
            Driven by purpose, guided by values — shaping a better tomorrow for Raipur's community
          </p>
        </div>

        {/* Mission & Vision Cards - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Mission Card */}
          <div
            ref={missionRef}
            className="group relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative p-8 md:p-10">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                To empower the Raipur community by fostering meaningful connections, 
                creating impactful opportunities, and driving collective action that 
                transforms lives. We bridge the gap between ambition and achievement 
                through collaboration, innovation, and unwavering dedication to service.
              </p>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                <span>Making a difference, every day</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div
            ref={visionRef}
            className="group relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative p-8 md:p-10">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                To establish Raipur as a model community hub where innovation thrives, 
                diversity is celebrated, and every individual has the opportunity to 
                flourish. We envision a future where Raipur becomes a beacon of 
                collaborative progress — setting the standard for community-driven growth 
                across the nation.
              </p>
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-medium">
                <span>Building tomorrow, together</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-1.5 mb-4">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                What We Stand For
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Our Core Values
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide our decisions and define our community
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>
                <div className={`w-12 h-12 rounded-xl ${value.bgGlow} flex items-center justify-center mb-4 text-gray-700 dark:text-gray-200`}>
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Our Impact So Far</h3>
            <p className="text-white/80 max-w-md mx-auto">
              Together, we're creating measurable change in the Raipur community
            </p>
          </div>
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Join Our Mission
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
            Be part of something bigger — together we thrive
          </p>
        </div>
      </div>

      {/* Add animation styles */}
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
      `}</style>
    </section>
  );
};

// Helper component for Trophy icon (if not imported)
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