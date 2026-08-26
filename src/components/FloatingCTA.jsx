// components/FloatingSponsorWidgetMinimal.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, ChevronRight, Star, Shield, Headphones, Ticket, X } from "lucide-react";

const FloatingSponsorWidgetMinimal = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 200);
  };

  const features = [
    { icon: Star, label: "Best Deals", color: "text-yellow-500" },
    { icon: Ticket, label: "E-Tickets", color: "text-blue-500" },
    { icon: Headphones, label: "24/7 Support", color: "text-green-500" },
    { icon: Shield, label: "Trusted", color: "text-purple-500" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          ref={widgetRef}
          className="fixed right-3 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div className="relative">
            {/* Collapsed Button - Ultra Small */}
            <motion.button
              className={`
                relative flex items-center gap-1.5 px-2.5 py-1.5
                bg-white/90 backdrop-blur-xl backdrop-saturate-150
                border border-white/30 rounded-full
                shadow-lg shadow-blue-500/10
                hover:shadow-xl hover:shadow-blue-500/20
                transition-all duration-300 cursor-pointer
                ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}
              `}
              animate={{
                opacity: isExpanded ? 0 : 1,
                scale: isExpanded ? 0.9 : 1,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Plane className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[10px] font-semibold text-gray-800 whitespace-nowrap">
                Fly
              </span>
              <span className="w-1 h-1 rounded-full bg-blue-500" />
            </motion.button>

            {/* Expanded Card - Ultra Compact */}
            <motion.div
              className={`
                absolute right-0 top-1/2 -translate-y-1/2
                w-[240px] bg-white/95 backdrop-blur-xl backdrop-saturate-150
                rounded-xl shadow-2xl shadow-blue-500/15
                border border-white/30 overflow-hidden
                ${isExpanded ? 'block' : 'hidden'}
              `}
              initial={{ x: 30, opacity: 0, scale: 0.95 }}
              animate={{
                x: isExpanded ? 0 : 30,
                opacity: isExpanded ? 1 : 0,
                scale: isExpanded ? 1 : 0.95,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35,
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-400 via-blue-600 to-blue-400" />
              
              <div className="relative p-3 space-y-2.5">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <Plane className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 leading-tight">
                        TripSatisfy
                      </h4>
                      <p className="text-[9px] text-gray-500">Book Flights</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-0.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-3 h-3 text-gray-400" />
                  </button>
                </div>

                {/* Features - 2x2 Grid */}
                <div className="grid grid-cols-2 gap-1">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-1 p-1 rounded bg-gray-50/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <feature.icon className={`w-3 h-3 ${feature.color}`} />
                      <span className="text-[9px] font-medium text-gray-700">
                        {feature.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  className="w-full py-2 px-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-[10px] flex items-center justify-center gap-1.5 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://www.tripsatisfy.com/', '_blank')}
                >
                  <span>Book Flights</span>
                  <ChevronRight className="w-3 h-3" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FloatingSponsorWidgetMinimal;