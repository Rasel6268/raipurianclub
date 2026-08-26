// components/LifetimeMembership.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Crown,
  Star,
  CheckCircle,
  XCircle,
  Users,
  Award,
  Gift,
  Shield,
  Medal,
  Infinity,
  GitBranch,
  Layers,
  DollarSign,
  PiggyBank,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const MembershipCompare = () => {
  const [selectedTier, setSelectedTier] = useState("life");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'

  const membershipCategories = [
    {
      id: "patron",
      name: "Patron Member",
      icon: Crown,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      textColor: "text-amber-700 dark:text-amber-300",
      badgeColor: "bg-amber-500 text-white",
      fee: "৳10,00,000",
      features: {
        age: "60+ years",
        education: "Post Graduation",
        location: "Raipurian",
        profession: "Professional",
        politics: "Not actively involved",
        voting: "Yes",
        servicePriority: "Priority 1",
        generalDiscount: "50%",
        foodDiscount: "25%",
        beverageDiscount: "Not applicable",
        maxGuests: "Unlimited",
        inheritance: "Yes",
        transferability: "Yes",
        honourBoard: "Separate Honour Board",
        execCommittee: "Meetings only",
        monthlySubscription: "Not applicable",
      },
    },
    {
      id: "donor",
      name: "Donor Member",
      icon: Gift,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      textColor: "text-purple-700 dark:text-purple-300",
      badgeColor: "bg-purple-500 text-white",
      fee: "৳6,00,000",
      features: {
        age: "45+ years",
        education: "Graduate",
        location: "Raipurian",
        profession: "Professional/Established",
        politics: "Not actively involved",
        voting: "Yes",
        servicePriority: "Priority 1",
        generalDiscount: "45%",
        foodDiscount: "20%",
        beverageDiscount: "Not applicable",
        maxGuests: "Unlimited",
        inheritance: "Yes",
        transferability: "No",
        honourBoard: "Separate Honour Board",
        execCommittee: "Meetings only",
        monthlySubscription: "Not applicable",
      },
    },
    {
      id: "life",
      name: "Life Member",
      icon: Infinity,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      textColor: "text-emerald-700 dark:text-emerald-300",
      badgeColor: "bg-emerald-500 text-white",
      popular: true,
      fee: "৳4,00,000",
      features: {
        age: "18+ years",
        education: "Graduate",
        location: "Raipurian",
        profession: "Professional/Established",
        politics: "Not actively in Raipur",
        voting: "Yes",
        servicePriority: "Priority 2",
        generalDiscount: "35%",
        foodDiscount: "20%",
        beverageDiscount: "Not applicable",
        maxGuests: "Up to 6",
        inheritance: "Yes",
        transferability: "Yes",
        honourBoard: "Not applicable",
        execCommittee: "Eligible for Committee",
        monthlySubscription: "Applicable first year",
      },
    },
    {
      id: "founder",
      name: "Founder Member",
      icon: Star,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      textColor: "text-blue-700 dark:text-blue-300",
      badgeColor: "bg-blue-500 text-white",
      fee: "৳2,00,000",
      features: {
        age: "18+ years",
        education: "Graduate",
        location: "Raipurian",
        profession: "Professionally established",
        politics: "Not actively in Raipur",
        voting: "Yes",
        servicePriority: "Priority 1",
        generalDiscount: "40%",
        foodDiscount: "20%",
        beverageDiscount: "Not applicable",
        maxGuests: "Unlimited",
        inheritance: "Yes",
        transferability: "Yes",
        honourBoard: "Separate Honour Board",
        execCommittee: "Eligible for Committee",
        monthlySubscription: "Applicable first year",
      },
    },
    {
      id: "general",
      name: "General Member",
      icon: Users,
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
      textColor: "text-indigo-700 dark:text-indigo-300",
      badgeColor: "bg-indigo-500 text-white",
      fee: "৳2,00,000",
      features: {
        age: "18+ years",
        education: "HSC",
        location: "Raipurian",
        profession: "Well-established",
        politics: "Any ideology accepted",
        voting: "No",
        servicePriority: "Priority 3",
        generalDiscount: "25%",
        foodDiscount: "20%",
        beverageDiscount: "Not applicable",
        maxGuests: "Up to 4",
        inheritance: "Yes",
        transferability: "Yes",
        honourBoard: "Not applicable",
        execCommittee: "Not applicable",
        monthlySubscription: "Applicable",
      },
    },
    {
      id: "associate",
      name: "Associate Member",
      icon: Users,
      color: "from-slate-500 to-gray-500",
      bgColor: "bg-slate-50 dark:bg-slate-800/40",
      textColor: "text-slate-700 dark:text-slate-300",
      badgeColor: "bg-slate-500 text-white",
      fee: "৳50,000",
      features: {
        age: "18+ years",
        education: "HSC",
        location: "Not specified",
        profession: "Not specified",
        politics: "Not specified",
        voting: "No",
        servicePriority: "Priority 4",
        generalDiscount: "Not applicable",
        foodDiscount: "Not applicable",
        beverageDiscount: "Not applicable",
        maxGuests: "Up to 4",
        inheritance: "No",
        transferability: "No",
        honourBoard: "Not applicable",
        execCommittee: "Not applicable",
        monthlySubscription: "Applicable",
      },
    },
    {
      id: "honorary",
      name: "Honorary Member",
      icon: Medal,
      color: "from-rose-500 to-red-500",
      bgColor: "bg-rose-50 dark:bg-rose-950/30",
      textColor: "text-rose-700 dark:text-rose-300",
      badgeColor: "bg-rose-500 text-white",
      fee: "No Fee",
      features: {
        age: "35+ years",
        education: "Post Graduation",
        location: "Not specified",
        profession: "Special Appointments",
        politics: "Not specified",
        voting: "No",
        servicePriority: "Priority 1",
        generalDiscount: "Not applicable",
        foodDiscount: "10%",
        beverageDiscount: "Not applicable",
        maxGuests: "Unlimited",
        inheritance: "No",
        transferability: "No",
        honourBoard: "Not applicable",
        execCommittee: "Not applicable",
        monthlySubscription: "Not applicable",
      },
    },
  ];

  const featureCategories = [
    {
      category: "Eligibility & Status",
      features: ["age", "education", "location", "profession", "politics"],
    },
    {
      category: "Privileges & Discounts",
      features: ["voting", "servicePriority", "generalDiscount", "foodDiscount", "maxGuests"],
    },
    {
      category: "Asset Rights & Governance",
      features: ["inheritance", "transferability", "honourBoard", "execCommittee", "monthlySubscription"],
    },
  ];

  const featureLabels = {
    age: "Minimum Age",
    education: "Education Requirement",
    location: "Locality Eligibility",
    profession: "Professional Standing",
    politics: "Political Involvement",
    voting: "Voting Rights",
    servicePriority: "Club Service Priority",
    generalDiscount: "Service Discounts",
    foodDiscount: "Dining Discount",
    beverageDiscount: "Beverage Discount",
    maxGuests: "Guest Allowance",
    inheritance: "Family Inheritance",
    transferability: "Transferable Rights",
    honourBoard: "Honour Board Listing",
    execCommittee: "Executive Committee Eligibility",
    monthlySubscription: "Monthly Subscription",
  };

  const currentCategory = membershipCategories.find((c) => c.id === selectedTier) || membershipCategories[0];

  const getFeatureValue = (member, featureKey) => {
    const value = member.features[featureKey];
    if (typeof value === "boolean") {
      return value ? <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />;
    }
    return value || "—";
  };

  const getFeatureColor = (member, featureKey) => {
    const value = member.features[featureKey];
    if (value === "Yes" || value === "Unlimited" || (typeof value === "string" && value.includes("Eligible"))) {
      return "text-emerald-600 dark:text-emerald-400 font-semibold";
    }
    if (value === "No" || value === "Not applicable" || value === "Not specified") {
      return "text-slate-400 dark:text-slate-500";
    }
    return "text-slate-800 dark:text-slate-200";
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-slate-50/70 dark:bg-slate-900/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-3.5">
            <Crown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              Prestigious Membership
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Compare Club{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Membership Tiers
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Choose the membership package that matches your profile, eligibility, and lifestyle goals.
          </p>

          {/* View Mode Toggle (Mobile / Desktop) */}
          <div className="mt-6 inline-flex items-center p-1 bg-white dark:bg-slate-800 rounded-full shadow-xs border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                viewMode === "cards"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-emerald-600"
              }`}
            >
              Plan Card View
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                viewMode === "table"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-emerald-600"
              }`}
            >
              Full Comparison Matrix
            </button>
          </div>
        </div>

        {/* Tier Horizontal Pills Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {membershipCategories.map((member) => {
            const Icon = member.icon;
            const isSelected = selectedTier === member.id;
            return (
              <button
                key={member.id}
                onClick={() => setSelectedTier(member.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shrink-0 transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md scale-105"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-300"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    isSelected ? "bg-white/20 text-white" : member.bgColor + " " + member.textColor
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold leading-tight">{member.name}</p>
                  <p className={`text-[10px] ${isSelected ? "text-emerald-100" : "text-slate-400"}`}>
                    {member.fee}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* CARD VIEW (Great on Mobile & Quick Inspection) */}
        {viewMode === "cards" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Selected Card Highlight */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-3.5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentCategory.color} flex items-center justify-center text-white shadow-lg`}>
                    <currentCategory.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {currentCategory.name}
                    </h3>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      Fee: {currentCategory.fee}
                    </p>
                  </div>
                </div>
                <Link
                  href="/register"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Apply for Tier</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Feature Grid inside the Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {Object.entries(currentCategory.features).map(([key, val]) => (
                  <div
                    key={key}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                  >
                    <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                      {featureLabels[key] || key}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white text-right">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Membership Summary Cards */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-6 text-white shadow-xl">
                <Sparkles className="w-8 h-8 mb-3 opacity-90" />
                <h4 className="text-xl font-bold mb-2">Lifetime Privileges</h4>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed mb-4">
                  All club memberships grant prestigious access to clubhouse sports, dining lounges, event discounts, and networking communities.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>Exclusive club lounge & amenities</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>Voting rights on top tier packages</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>Guest privileges for family members</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-700 text-center">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Need Help Choosing?
                </p>
                <h5 className="font-bold text-slate-800 dark:text-slate-100 mb-4">
                  Talk to the Membership Secretary
                </h5>
                <Link
                  href="/membership/compare"
                  className="block w-full py-2.5 rounded-xl border border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold text-sm hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                >
                  View Full Policy
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* COMPARISON TABLE VIEW (Deep Inspection) */
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                    <th className="px-4 py-4 text-xs sm:text-sm font-bold sticky left-0 bg-gradient-to-r from-emerald-600 to-emerald-700 min-w-[160px]">
                      Features & Benefits
                    </th>
                    {membershipCategories.map((member) => (
                      <th key={member.id} className="px-3 py-4 text-center text-xs sm:text-sm font-bold min-w-[110px]">
                        <p className="text-[11px] opacity-85 font-medium">{member.fee}</p>
                        <p className="mt-0.5">{member.name.split(" ")[0]}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {featureCategories.map((category) => (
                    <React.Fragment key={category.category}>
                      <tr className="bg-slate-100/70 dark:bg-slate-900/80">
                        <td
                          colSpan={membershipCategories.length + 1}
                          className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                        >
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((featureKey) => (
                        <tr
                          key={featureKey}
                          className="hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                        >
                          <td className="px-4 py-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 sticky left-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
                            {featureLabels[featureKey] || featureKey}
                          </td>
                          {membershipCategories.map((member) => {
                            const value = getFeatureValue(member, featureKey);
                            const colorClass = getFeatureColor(member, featureKey);
                            return (
                              <td key={`${member.id}-${featureKey}`} className="px-3 py-3 text-center text-xs">
                                <span className={colorClass}>{value}</span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MembershipCompare;