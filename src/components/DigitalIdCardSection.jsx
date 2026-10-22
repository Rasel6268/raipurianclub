"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  QrCode,
  User,
  ChevronRight,
  Bell,
  Calendar,
  Award,
  ShieldCheck,
  Printer,
  Download,
  Share2,
  X,
  RotateCw,
  Sparkles,
  Building,
  CheckCircle2,
  Phone,
  MapPin,
  Heart,
  BadgeCheck,
} from "lucide-react";
import toast from "react-hot-toast";

export default function DigitalIdCardSection({
  memberData = null,
  onOpenMembership = null,
  className = "",
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const printCardRef = useRef(null);

  // Formulate complete member object with robust fallbacks
  const member = {
    name: memberData?.name || "Engr. Tanvir Ahmed",
    membership:
      memberData?.membership?.name ||
      memberData?.membership ||
      memberData?.occupation ||
      "Lifetime Premium Member",
    batch: memberData?.batch || "Batch 2018",
    bloodGroup: memberData?.bloodGroup || "O+ (ve)",
    memberId: memberData?.memberId || "RC-2026-8842",
    village:
      memberData?.permanentAddress?.villageOrArea ||
      memberData?.village ||
      "Raipur Central",
    district:
      memberData?.permanentAddress?.district ||
      memberData?.district ||
      "Lakshmipur",
    phone: memberData?.phone || "+880 1712-345678",
    profileImage: memberData?.profileImage || "",
    profession:
      memberData?.occupationDetails?.position ||
      memberData?.profession ||
      "Executive Professional",
    email: memberData?.email || "member@raipurianclub.com",
    issueDate: "15 Jan 2026",
    validUntil: "Lifetime Member",
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("Preparing official ID card for download...");
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${member.name} - Official Raipurian Club ID`,
          text: `Official Member ID: ${member.memberId} | ${member.membership}`,
          url: window.location.href,
        })
        .catch(() => { });
    } else {
      navigator.clipboard.writeText(
        `Official Member: ${member.name} (ID: ${member.memberId}) - Raipurian Club`
      );
      toast.success("Member verification details copied to clipboard!");
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Grid: ID Card Snippet + Recent Activity & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ID Card Quick Look */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <QrCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Official Member Card
              </h3>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                Official
              </span>
            </div>

            {/* Mini card preview */}
            <div className="bg-white text-slate-800 rounded-2xl p-4 shadow-lg border border-slate-300 relative overflow-hidden mb-4 select-none transition-transform hover:scale-[1.01]">
              {/* Corner Swoops in Emerald & Gold */}
              <svg
                viewBox="0 0 120 120"
                className="absolute top-0 left-0 w-24 h-24 pointer-events-none z-0"
                preserveAspectRatio="none"
              >
                <path d="M0 0 L85 0 C55 35 30 70 0 95 Z" fill="#064e3b" />
                <path
                  d="M0 95 C30 70 55 35 85 0 L94 0 C62 40 36 78 0 106 Z"
                  fill="#d97706"
                />
              </svg>
              <svg
                viewBox="0 0 120 120"
                className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none z-0"
                preserveAspectRatio="none"
              >
                <path d="M120 120 L35 120 C65 85 90 50 120 25 Z" fill="#064e3b" />
                <path
                  d="M120 25 C90 50 65 85 35 120 L26 120 C58 80 84 42 120 14 Z"
                  fill="#d97706"
                />
              </svg>

              {/* Top Header */}
              <div className="relative z-10 flex items-center gap-2 mb-2">
                <div className="w-12 h-12 bg-white rounded-full p-0.5 shadow-xs border border-slate-100 shrink-0 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Raipurian Club Logo"
                    width={44}
                    height={44}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-sm text-[#064e3b] leading-none uppercase tracking-wide">
                    RAIPURIAN CLUB
                  </div>
                  <div className="text-[10px] font-extrabold text-emerald-600 leading-tight">
                    Elite Community Platform
                  </div>
                  <div className="text-[8px] font-bold text-slate-600 leading-tight truncate">
                    Raipur, Lakshmipur, Bangladesh
                  </div>
                </div>
              </div>

              {/* Red Ribbon */}
              <div className="relative z-10 my-1.5 flex items-center justify-center">
                <div className="w-full bg-[#c8102e] text-white font-extrabold text-[10px] py-1 text-center rounded tracking-wide shadow-xs uppercase">
                  Official Club Identification Card
                </div>
              </div>

              {/* Photo + Info */}
              <div className="relative z-10 grid grid-cols-12 gap-2 my-2 items-start">
                <div className="col-span-4 flex flex-col items-center">
                  <div className="w-16 h-20 rounded border-2 border-[#064e3b] overflow-hidden bg-slate-100 shrink-0 relative">
                    {member.profileImage ? (
                      <Image
                        src={member.profileImage}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                        <User className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div
                    className="text-[10px] text-[#064e3b] font-serif italic font-bold mt-1 truncate max-w-full text-center"
                    style={{ fontFamily: "'Brush Script MT', cursive, serif" }}
                  >
                    {member.name}
                  </div>
                </div>
                <div className="col-span-8 space-y-0.5 text-[10px]">
                  <div className="border-b border-emerald-200 pb-0.5 truncate">
                    <span className="font-bold text-slate-600">Name: </span>
                    <span className="font-black text-[#064e3b]">{member.name}</span>
                  </div>
                  <div className="border-b border-emerald-200 pb-0.5 truncate">
                    <span className="font-bold text-slate-600">Membership: </span>
                    <span className="font-bold text-emerald-700">
                      {member.membership || member.profession}
                    </span>
                  </div>
                  <div className="border-b border-emerald-200 pb-0.5 flex justify-between">
                    <span className="font-bold text-slate-600">Batch:</span>
                    <span className="font-bold text-[#064e3b]">{member.batch}</span>
                  </div>
                  <div className="border-b border-emerald-200 pb-0.5 flex justify-between">
                    <span className="font-bold text-slate-600">Blood:</span>
                    <span className="font-black text-[#dc2626]">{member.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between pt-0.5 font-mono text-[9px]">
                    <span className="text-slate-600">ID: {member.memberId}</span>
                  </div>
                </div>
              </div>

              {/* Bottom line */}
              <div className="relative z-10 border-t border-slate-200 pt-1 text-[8px] flex items-center justify-between text-slate-600">
                <span className="truncate">
                  📍 {member.village || "Raipur Central"}, {member.district || "Lakshmipur"}
                </span>
                <span className="font-mono text-[#064e3b] font-bold">{member.phone}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onOpenMembership) {
                onOpenMembership();
              }
              setIsModalOpen(true);
            }}
            className="w-full py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            Open Full Card & Print <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Recent Announcements & Upcoming Agenda */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Club Bulletins & Announcements
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Updated Season 2026
              </span>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 flex items-start gap-3.5 transition-all hover:border-emerald-200">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white shrink-0 flex items-center justify-center shadow-xs">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Grand Annual Raipurian Club Gala 2026 Scheduled
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full w-fit">
                      20 Dec 2026
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    Registration is now officially open for all club members. Your Premium Member entry pass has been reserved under your profile.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-3.5 transition-all hover:border-amber-300">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white shrink-0 flex items-center justify-center shadow-xs">
                  <Award className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      2026 Community Welfare & Youth Talent Grants
                    </h4>
                    <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded-full w-fit">
                      Welfare Notice
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    The executive committee has invited nominations for 12 deserving students & youth innovators across Raipur.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3.5 transition-all hover:border-slate-300">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white shrink-0 flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Digital Directory Privacy & Member Verification
                    </h4>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full w-fit">
                      Privacy
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    Remember that your personal mobile number and private addresses remain shielded from the public directory. Only verified members can connect.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live Raipurian Club Directory Connected
            </span>
            <span>ID: <strong className="text-slate-800 dark:text-slate-200 font-mono">{member.memberId}</strong></span>
          </div>
        </div>
      </div>

      {/* FULL PRINTABLE MODAL POPUP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-7 overflow-hidden my-auto">
            {/* Header / Actions */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 no-print">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-emerald-500" /> Official Raipurian Club Card
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Officially verified club membership credentials
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Flip front / back"
                >
                  <RotateCw className="w-3.5 h-3.5" /> Flip Card
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3D CARD DISPLAY CONTAINER */}
            <div className="my-6 flex justify-center items-center py-2">
              <div
                id="printable-digital-id-card"
                ref={printCardRef}
                className="perspective-1000 w-[340px] sm:w-[380px] h-[240px] sm:h-[260px] cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div
                  className={`relative w-full h-full duration-500 preserve-3d transition-transform ${isFlipped ? "rotate-y-180" : ""
                    }`}
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 backface-hidden w-full h-full bg-white text-slate-800 rounded-2xl p-4 shadow-xl border border-slate-300 overflow-hidden flex flex-col justify-between select-none">
                    {/* Corner Swoops */}
                    <svg
                      viewBox="0 0 120 120"
                      className="absolute top-0 left-0 w-28 h-28 pointer-events-none z-0"
                      preserveAspectRatio="none"
                    >
                      <path d="M0 0 L85 0 C55 35 30 70 0 95 Z" fill="#064e3b" />
                      <path
                        d="M0 95 C30 70 55 35 85 0 L94 0 C62 40 36 78 0 106 Z"
                        fill="#d97706"
                      />
                    </svg>
                    <svg
                      viewBox="0 0 120 120"
                      className="absolute bottom-0 right-0 w-28 h-28 pointer-events-none z-0"
                      preserveAspectRatio="none"
                    >
                      <path d="M120 120 L35 120 C65 85 90 50 120 25 Z" fill="#064e3b" />
                      <path
                        d="M120 25 C90 50 65 85 35 120 L26 120 C58 80 84 42 120 14 Z"
                        fill="#d97706"
                      />
                    </svg>

                    {/* Top Header */}
                    <div className="relative z-10 flex items-center gap-2.5">
                      <div className="w-12 h-12 bg-white rounded-full p-0.5 shadow-xs border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden">
                        <Image
                          src="/logo.png"
                          alt="Raipurian Club Logo"
                          width={44}
                          height={44}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-base text-[#064e3b] leading-tight uppercase tracking-tight">
                          RAIPURIAN CLUB
                        </div>
                        <div className="text-[11px] font-extrabold text-emerald-600 leading-none">
                          Exclusive Community Platform
                        </div>
                        <div className="text-[9px] font-bold text-slate-600 leading-tight truncate mt-0.5">
                          Raipur Central, Lakshmipur, Bangladesh
                        </div>
                      </div>
                    </div>

                    {/* Red Ribbon */}
                    <div className="relative z-10 my-1 flex items-center justify-center">
                      <div className="w-full bg-[#c8102e] text-white font-extrabold text-[11px] py-0.5 text-center rounded tracking-wide shadow-xs uppercase">
                        Official Member Identification Card
                      </div>
                    </div>

                    {/* Photo + Info */}
                    <div className="relative z-10 grid grid-cols-12 gap-2.5 items-start">
                      <div className="col-span-4 flex flex-col items-center">
                        <div className="w-[72px] h-[90px] rounded border-2 border-[#064e3b] overflow-hidden bg-slate-100 shrink-0 relative shadow-xs">
                          {member.profileImage ? (
                            <Image
                              src={member.profileImage}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                              <User className="w-10 h-10" />
                            </div>
                          )}
                        </div>
                        <div
                          className="text-[11px] text-[#064e3b] font-serif italic font-bold mt-0.5 truncate max-w-full text-center"
                          style={{ fontFamily: "'Brush Script MT', cursive, serif" }}
                        >
                          {member.name}
                        </div>
                      </div>

                      <div className="col-span-8 space-y-1 text-[11px]">
                        <div className="border-b border-emerald-200 pb-0.5 truncate flex items-baseline">
                          <span className="font-bold text-slate-600 w-24 shrink-0">Name:</span>
                          <span className="font-black text-[#064e3b] truncate">{member.name}</span>
                        </div>
                        <div className="border-b border-emerald-200 pb-0.5 truncate flex items-baseline">
                          <span className="font-bold text-slate-600 w-24 shrink-0">Membership:</span>
                          <span className="font-bold text-emerald-700 truncate">{member.membership}</span>
                        </div>
                        <div className="border-b border-emerald-200 pb-0.5 flex justify-between">
                          <span className="font-bold text-slate-600">Batch:</span>
                          <span className="font-bold text-[#064e3b]">{member.batch}</span>
                        </div>
                        <div className="border-b border-emerald-200 pb-0.5 flex justify-between">
                          <span className="font-bold text-slate-600">Blood Group:</span>
                          <span className="font-black text-[#dc2626]">{member.bloodGroup}</span>
                        </div>
                        <div className="flex justify-between pt-0.5 font-mono text-[10px]">
                          <span className="text-slate-600 font-bold">ID: {member.memberId}</span>
                          <span className="text-emerald-700 font-bold">● ACTIVE</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Line */}
                    <div className="relative z-10 border-t border-slate-200 pt-1 text-[9px] flex items-center justify-between text-slate-600">
                      <span className="truncate">
                        📍 {member.village || "Raipur Central"}, {member.district || "Lakshmipur"}
                      </span>
                      <span className="font-mono text-[#064e3b] font-bold">{member.phone}</span>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-700 overflow-hidden flex flex-col justify-between select-none">
                    {/* Magnetic Stripe / Security Bar */}
                    <div className="h-7 -mx-4 -mt-4 bg-slate-950 border-b border-slate-800 flex items-center px-4">
                      <div className="w-full h-2 bg-linear-to-r from-emerald-500/40 via-amber-300/50 to-emerald-500/40 rounded-full opacity-60"></div>
                    </div>

                    {/* Terms & Info */}
                    <div className="my-2 space-y-1.5 text-[9px] leading-tight text-slate-300">
                      <div className="font-bold text-[10px] text-amber-400 uppercase tracking-wider">
                        Official Membership Terms
                      </div>
                      <p>1. This card is the official property of Raipurian Club.</p>
                      <p>2. Must be presented upon request at official premises, club functions, and voting assemblies.</p>
                      <p>3. Non-transferable. If found, please return to the executive club secretariat.</p>
                    </div>

                    {/* Signatures & Barcode */}
                    <div className="grid grid-cols-12 gap-2 items-end pt-1 border-t border-slate-800">
                      {/* Barcode / QR */}
                      <div className="col-span-6 space-y-1">
                        <div className="font-mono text-[8px] text-slate-400">
                          ISSUED: {member.issueDate}
                        </div>
                        {/* CSS Vector Barcode */}
                        <div className="h-6 w-full bg-white p-1 rounded flex items-center justify-between">
                          {[3, 1, 2, 1, 4, 1, 2, 3, 1, 3, 2, 1, 4, 2, 1, 3, 2, 1, 3].map((w, i) => (
                            <span
                              key={i}
                              className="bg-black h-full inline-block"
                              style={{ width: `${w}px` }}
                            />
                          ))}
                        </div>
                        <div className="font-mono text-[8px] text-slate-400 text-center tracking-widest">
                          *{member.memberId}*
                        </div>
                      </div>

                      {/* Official Signatures */}
                      <div className="col-span-6 flex flex-col items-center">
                        <div
                          className="font-serif italic text-xs text-amber-300 border-b border-slate-600 pb-0.5 w-full text-center"
                          style={{ fontFamily: "'Brush Script MT', cursive, serif" }}
                        >
                          President / Secretary
                        </div>
                        <div className="text-[8px] font-bold text-slate-400 uppercase text-center mt-0.5">
                          Raipurian Club Secretariat
                        </div>
                      </div>
                    </div>

                    {/* Emergency Hotline */}
                    <div className="text-[8px] text-center text-slate-400 font-mono">
                      Member Helpdesk: +880 1700-000000 | membercare@raipurianclub.com
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Click to flip hint */}
            <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mb-4 no-print flex items-center justify-center gap-1">
              <RotateCw className="w-3 h-3" /> Tap the card to view the reverse side
            </p>

            {/* Footer Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-4 border-t border-slate-200 dark:border-slate-800 no-print">
              <button
                type="button"
                onClick={handleShare}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-slate-500" /> Share ID
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print Card
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" /> Save PDF / Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
