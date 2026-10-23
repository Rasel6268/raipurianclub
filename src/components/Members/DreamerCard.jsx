"use client";
import React, { useState } from "react";
import {
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Compass,
  Globe,
  HandHeart,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { LiaLinkedin } from "react-icons/lia";
import { FaFacebookF } from "react-icons/fa";

const DreamerCard = ({ member, expanded, onToggle }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-amber-300/70 dark:border-amber-700/60 hover:border-amber-500 dark:hover:border-amber-500 hover:-translate-y-1 ring-1 ring-amber-500/10">
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 z-20" />

      {/* Main Horizontal Layout: LEFT Image | RIGHT Text */}
      <div className="flex flex-col md:flex-row items-stretch">
        {/* LEFT: Member Image Section */}
        <div className="relative w-full md:w-5/12 lg:w-96 shrink-0 min-h-[300px] sm:min-h-[360px] md:min-h-[420px] bg-gray-100 dark:bg-gray-900 overflow-hidden">
          {!imageError && member.image ? (
            <img
              src={member.image}
              alt={member.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 text-amber-700 dark:text-amber-400 p-6 text-center">
              <HandHeart className="w-16 h-16 opacity-40 mb-3" />
              <span className="text-base font-semibold">{member.name}</span>
            </div>
          )}

          {/* Floating Badges on Image */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/95 dark:bg-gray-900/90 text-amber-700 dark:text-amber-300 border border-amber-300/50 shadow-sm">
              <HandHeart className="w-3.5 h-3.5 text-amber-500" />
              Club Dreamer
            </span>
          </div>


          {/* Mobile Bottom Overlay for Contrast */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent md:hidden pointer-events-none" />

          {/* Mobile Overlay Name Caption */}
          <div className="absolute bottom-3 left-4 right-4 z-10 md:hidden pointer-events-none">
            <h3 className="text-xl font-bold text-white drop-shadow-md">
              {member.name}
            </h3>
            <p className="text-xs font-medium text-amber-300 drop-shadow-sm">
              {member.role || "Chief Convener & Visionary Architect"}
            </p>
          </div>
        </div>

        {/* RIGHT: Text Content Section */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header: Name, Role & Badges */}
            <div>
              <div className="hidden md:flex items-center justify-between gap-3 flex-wrap mb-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                  {member.name}
                </h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Conceived Raipurian Club
                </span>
              </div>
              <p className="hidden md:block text-sm sm:text-base font-semibold text-amber-600 dark:text-amber-400">
                {member.role || "Chief Convener & Visionary Architect"}
              </p>

              {/* Quick Info Meta Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-gray-600 dark:text-gray-300">
                {member.profession && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/70 border border-gray-200/60 dark:border-gray-700">
                    <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{member.profession}</span>
                  </span>
                )}
                {member.location && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/70 border border-gray-200/60 dark:border-gray-700">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{member.location}</span>
                  </span>
                )}
                {member.joinedDate && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/70 border border-gray-200/60 dark:border-gray-700">
                    <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Active since {member.joinedDate}</span>
                  </span>
                )}
              </div>
            </div>

            {/* How He Started (In Short) Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-amber-100/30 dark:from-amber-950/40 dark:via-gray-800 dark:to-orange-950/20 border border-amber-200/80 dark:border-amber-800/60 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-amber-500/20 dark:bg-amber-400/20 flex items-center justify-center text-amber-700 dark:text-amber-300">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                  How He Started (In Short)
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                {member.howStarted ||
                  "In 2020, inspired by a heartfelt drive to connect and empower the people of Raipur across the globe, Md Zabed Hossain initiated the concept of Raipurian Club. Beginning with grassroots community outreach, rallying forward-thinking leaders and enthusiastic youth, he crafted the institutional vision, digital platform, and enduring mission that continues to elevate Raipurian Club today."}
              </p>
            </div>

            {/* Which Hand Keeps Building This Club */}
            <div className="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-700/40 border border-gray-200/60 dark:border-gray-700 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Which Hand Keeps Building This Club
                </p>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mt-0.5">
                  {member.builderNote ||
                    "The pioneering hand that conceived Raipurian Club, rallied the community, and architected its institutional and digital foundation."}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Action Toggle and Socials */}
          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700/80 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onToggle}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 rounded-full transition-colors cursor-pointer"
            >
              <span>{expanded ? "Less details" : "Contact & About details"}</span>
              {expanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Social Links */}
            {member.social && (
              <div className="flex items-center gap-2">
                {member.social.linkedin && member.social.linkedin !== "#" && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white hover:bg-blue-600 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <LiaLinkedin className="w-4 h-4" />
                  </a>
                )}
                {member.social.facebook && member.social.facebook !== "#" && (
                  <a
                    href={member.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white hover:bg-blue-600 transition-colors"
                    aria-label="Facebook Profile"
                  >
                    <FaFacebookF className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.social.website && member.social.website !== "#" && (
                  <a
                    href={member.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white hover:bg-emerald-600 transition-colors"
                    aria-label="Website"
                  >
                    <Globe className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Accordion Details */}
      {expanded && (
        <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-gray-100 dark:border-gray-700/80 bg-gray-50/70 dark:bg-gray-800/80 space-y-3 text-xs">
          {member.bio && (
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                About The Dreamer:
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {member.bio}
              </p>
            </div>
          )}

          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-gray-600 dark:text-gray-400">
            {member.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href={`mailto:${member.email}`}
                  className="hover:text-emerald-600 transition-colors font-medium"
                >
                  {member.email}
                </a>
              </div>
            )}
            {member.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href={`tel:${member.phone}`}
                  className="hover:text-emerald-600 transition-colors font-medium"
                >
                  {member.phone}
                </a>
              </div>
            )}
            {member.joinedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Founding Leadership since {member.joinedDate}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DreamerCard;
