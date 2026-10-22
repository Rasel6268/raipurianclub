"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DigitalIdCardSection from "@/components/DigitalIdCardSection";
import Link from "next/link";
import {
  QrCode,
  User,
  Calendar,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Award,
  ChevronRight,
  ExternalLink,
  Users,
  Building,
  Heart,
  CheckCircle,
  Clock,
  Printer,
  Share2,
} from "lucide-react";

export default function MemberDashboardPage() {
  const { user } = useAuth();

  // Quick action cards
  const quickActions = [
    {
      title: "Official Member ID Card",
      desc: "Instant verified QR & PVC print view",
      icon: QrCode,
      color: "bg-emerald-600",
      href: "/profile",
      badge: "Official",
    },
    {
      title: "Member Directory",
      desc: "Connect with verified fellow club members",
      icon: Users,
      color: "bg-teal-600",
      href: "/members",
      badge: "500+ Online",
    },
    {
      title: "Club Events & RSVP",
      desc: "Annual gala and executive meetups",
      icon: Calendar,
      color: "bg-purple-500",
      href: "/events",
      badge: "New",
    },
    {
      title: "Membership Status",
      desc: "Perks, voting rights & contributions",
      icon: Award,
      color: "bg-amber-500",
      href: "/membership",
      badge: "Active",
    },
  ];

  const clubPerks = [
    {
      title: "Clubhouse & Sports Access",
      desc: "Complimentary access to sports lounge, library, and VIP lounges.",
      icon: Building,
    },
    {
      title: "Community Welfare & Healthcare",
      desc: "Special concession at partner diagnostic labs and medical hospitals.",
      icon: Heart,
    },
    {
      title: "Voting Rights & EC Assembly",
      desc: "Participate in executive council elections and policy discussions.",
      icon: ShieldCheck,
    },
    {
      title: "Exclusive Dining Privileges",
      desc: "25% member discount on fine dining and banquet bookings.",
      icon: Sparkles,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-2">
      {/* Welcome & Status Banner */}
      <div className="relative rounded-3xl bg-linear-to-r from-emerald-600 via-teal-600 to-sky-600 p-6 sm:p-8 text-white shadow-xl overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
              Verified Active Member
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Welcome, {user?.name || "Respected Member"}!
            </h1>
            <p className="text-white/90 text-sm sm:text-base max-w-xl">
              Access your digital membership credentials, official club bulletins, networking directory, and club amenities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/profile"
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-all shadow-md flex items-center gap-2"
            >
              <User className="w-4 h-4 text-emerald-600" /> View Profile
            </Link>
            <Link
              href="/events"
              className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs sm:text-sm transition-all border border-white/30 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Upcoming Events
            </Link>
          </div>
        </div>
      </div>

      {/* PRIMARY FEATURE: DIGITAL ID CARD & BULLETINS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-sky-600 dark:text-sky-400" /> Digital Card & Notices
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your official credentials and the latest association updates
            </p>
          </div>
        </div>

        {/* Digital ID Card Section Component */}
        <DigitalIdCardSection memberData={user} />
      </div>

      {/* QUICK ACTIONS ROW */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Quick Access & Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={idx}
                href={action.href}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${action.color} text-white flex items-center justify-center shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {action.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {action.badge}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {action.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {action.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* CLUB PERKS & PRIVILEGES */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" /> Active Membership Privileges
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Guaranteed benefits included with your lifetime membership
            </p>
          </div>
          <Link
            href="/membership"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            Explore All Plans <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clubPerks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-3.5"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {perk.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {perk.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}