'use client'
import React, { useState, useEffect } from 'react';

const EventsPage = () => {
  // Demo events data
  const eventsData = [
    {
      id: 1,
      title: "Summer Music Festival",
      date: "July 15, 2025",
      targetDate: new Date(2025, 6, 15), // July 15, 2025
      description: "Join us for an unforgettable night of music, food, and fun under the stars! Featuring top artists and amazing performances.",
      location: "Central Park, New York",
      image: "🎵",
      buttonText: "GET TICKETS",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Tech Conference 2025",
      date: "August 5, 2025",
      targetDate: new Date(2025, 7, 5), // August 5, 2025
      description: "The biggest tech event of the year! Network with industry leaders, attend workshops, and discover the latest innovations.",
      location: "Convention Center, San Francisco",
      image: "💻",
      buttonText: "REGISTER NOW",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Wellness Retreat",
      date: "September 20, 2025",
      targetDate: new Date(2025, 8, 20), // September 20, 2025
      description: "Escape the chaos and rejuvenate your mind, body, and soul. Yoga, meditation, and healing sessions included.",
      location: "Mountain Resort, Colorado",
      image: "🧘",
      buttonText: "JOIN RETREAT",
      status: "upcoming"
    },
    {
      id: 4,
      title: "Food & Wine Expo",
      date: "October 10, 2025",
      targetDate: new Date(2025, 9, 10), // October 10, 2025
      description: "Savor exquisite cuisines from world-renowned chefs and taste premium wines from top vineyards.",
      location: "Grand Plaza, Chicago",
      image: "🍷",
      buttonText: "BUY PASS",
      status: "upcoming"
    },
    {
      id: 5,
      title: "Charity Gala Night",
      date: "November 25, 2025",
      targetDate: new Date(2025, 10, 25), // November 25, 2025
      description: "An elegant evening supporting children's education. Live music, auctions, and inspiring stories await.",
      location: "Royal Ballroom, Boston",
      image: "🎭",
      buttonText: "DONATE & JOIN",
      status: "upcoming"
    },
    {
      id: 6,
      title: "New Year's Eve Bash",
      date: "December 31, 2025",
      targetDate: new Date(2025, 11, 31), // December 31, 2025
      description: "Ring in the New Year with a spectacular celebration! Fireworks, champagne, and live DJ performances.",
      location: "Harbor City, Miami",
      image: "🎆",
      buttonText: "CELEBRATE",
      status: "upcoming"
    }
  ];

  // Calculate time remaining for each event
  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, expired: false };
  };

  // Component for individual event card with live timer
  const EventCard = ({ event }) => {
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(event.targetDate));

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(event.targetDate));
      }, 1000);

      return () => clearInterval(timer);
    }, [event.targetDate]);

    const formatNumber = (num) => String(num).padStart(2, '0');

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Event Image/Icon Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 text-center relative">
          <div className="text-6xl mb-2">{event.image}</div>
          <h3 className="text-white text-xl font-bold">{event.title}</h3>
          <p className="text-purple-100 text-sm mt-1">{event.location}</p>
        </div>

        {/* Countdown Timer */}
        <div className="px-5 pt-5 pb-3 bg-gray-50">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2 text-center">
            Event Starts In
          </p>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="bg-white rounded-lg py-2 shadow-sm">
                <span className="text-2xl font-bold text-gray-800">{formatNumber(timeLeft.days)}</span>
              </div>
              <p className="text-gray-400 text-xs mt-1">Days</p>
            </div>
            <div>
              <div className="bg-white rounded-lg py-2 shadow-sm">
                <span className="text-2xl font-bold text-gray-800">{formatNumber(timeLeft.hours)}</span>
              </div>
              <p className="text-gray-400 text-xs mt-1">Hrs</p>
            </div>
            <div>
              <div className="bg-white rounded-lg py-2 shadow-sm">
                <span className="text-2xl font-bold text-gray-800">{formatNumber(timeLeft.minutes)}</span>
              </div>
              <p className="text-gray-400 text-xs mt-1">Mins</p>
            </div>
            <div>
              <div className="bg-white rounded-lg py-2 shadow-sm">
                <span className="text-2xl font-bold text-gray-800">{formatNumber(timeLeft.seconds)}</span>
              </div>
              <p className="text-gray-400 text-xs mt-1">Secs</p>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="px-5 py-4">
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {event.description}
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <span>📅</span>
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <span>📍</span>
              <span>{event.location.split(',')[0]}</span>
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2.5 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm">
            {event.buttonText}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">Upcoming Events</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Discover amazing experiences, connect with people, and create unforgettable memories
          </p>
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <button className="bg-white text-purple-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
              All Events
            </button>
            <button className="bg-purple-500 bg-opacity-30 text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-40 transition">
              This Month
            </button>
            <button className="bg-purple-500 bg-opacity-30 text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-40 transition">
              Next Month
            </button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Stay Updated</h3>
          <p className="text-gray-500 mb-6">Subscribe to get notified about new events and special offers</p>
          <div className="max-w-md mx-auto flex gap-3 flex-wrap justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 min-w-[200px] px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 Events Hub. All rights reserved.</p>
          <p className="text-sm mt-2">Making every moment memorable</p>
        </div>
      </footer>
    </div>
  );
};

export default EventsPage;