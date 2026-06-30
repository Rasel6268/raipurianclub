'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, Users, Calendar, Heart, Award } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-green-50">
      {/* Animated Blobs */}
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] bg-green-200 rounded-full blur-3xl animate-pulse opacity-30" />
      <div className="absolute bottom-20 right-[-10%] w-[600px] h-[600px] bg-orange-200 rounded-full blur-3xl animate-pulse delay-1000 opacity-30" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-[15%] animate-bounce-slow">
        <Users className="w-12 h-12 text-green-400 opacity-40" />
      </div>
      <div className="absolute bottom-1/3 right-[10%] animate-spin-slow">
        <Calendar className="w-10 h-10 text-orange-400 opacity-40" />
      </div>
      <div className="absolute top-2/3 left-[5%] animate-float">
        <Heart className="w-8 h-8 text-rose-400 opacity-40" />
      </div>
      <div className="absolute top-1/3 right-[20%] animate-pulse-slow">
        <Award className="w-14 h-14 text-green-400 opacity-30" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-32 md:py-40 text-center z-10">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-100 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-green-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-green-700">Community First Since 2010</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Welcome to{' '}
            <span className="bg-linear-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
              Raipurian Club
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            A vibrant community platform to connect, collaborate, and create lasting impact through memberships, events, donations, and meaningful projects.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="inline-flex items-center gap-2 border-2 border-green-300 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-full font-semibold text-lg text-gray-700 hover:bg-green-50 hover:border-green-400 transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: '2,500+', label: 'Active Members', icon: Users, color: 'text-green-500' },
              { value: '150+', label: 'Events Hosted', icon: Calendar, color: 'text-orange-500' },
              { value: '₹85L+', label: 'Donations', icon: Heart, color: 'text-rose-500' },
              { value: '45+', label: 'Projects', icon: Award, color: 'text-green-500' },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                className={`text-center p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 transition-all duration-700 hover:bg-white hover:shadow-lg hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 100 + 300}ms` }}
              >
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-500 rounded-full mt-2 animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}