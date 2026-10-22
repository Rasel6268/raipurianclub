"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import DigitalIdCardSection from "@/components/DigitalIdCardSection";
import Link from "next/link";
import { QrCode, Shield, ArrowLeft, Printer, Award, User, Sparkles } from "lucide-react";

export default function DigitalIdCardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-8 pt-16 sm:pt-20">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to My Profile
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Cryptographically Verified
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-900 text-sky-700 dark:text-sky-300 text-xs font-bold">
            <QrCode className="w-4 h-4" /> Official Credentials
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Official Member Identification Card
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Your official Raipurian Club member identification card. Tap the preview or button below to inspect the full 3D card, flip between front and back, or print high-resolution copies.
          </p>
        </div>

        {/* Main Digital ID Card & Announcements Section */}
        <div className="py-2">
          <DigitalIdCardSection memberData={user} />
        </div>

        {/* Card Security & Validation Guide */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" /> Security & Verification Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-white block mb-1">Encrypted Barcode</strong>
              Contains member sequence identifier verified by the executive registry scanner.
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-white block mb-1">Corner Security Swoops</strong>
              Official deep blue (#0f294a) and golden yellow (#f2a900) geometric crest patterns matching idf1.pdf specification.
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-white block mb-1">Office Signature</strong>
              Signed by the Authorized Signatory with executive council authentication.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
