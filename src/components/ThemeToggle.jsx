"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Monitor, Check } from "lucide-react";

export default function ThemeToggle({ className = "", compact = false, showLabel = false }) {
  const { theme, resolvedTheme, setTheme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse ${className}`} />
    );
  }

  const options = [
    { id: "light", label: "Light", icon: Sun, desc: "Classic crisp theme" },
    { id: "dark", label: "Dark", icon: Moon, desc: "Sleek eye-care mode" },
    { id: "system", label: "System / Device", icon: Monitor, desc: "Matches your device" },
  ];

  const currentIcon = () => {
    if (theme === "system") {
      return <Monitor className="w-4 h-4 text-emerald-500" />;
    }
    if (resolvedTheme === "dark") {
      return <Moon className="w-4 h-4 text-amber-400" />;
    }
    return <Sun className="w-4 h-4 text-amber-500" />;
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme mode"
        className="flex items-center gap-2 p-2 rounded-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-md transition-all shadow-xs cursor-pointer focus:outline-hidden"
      >
        {currentIcon()}
        {showLabel && (
          <span className="text-xs font-semibold capitalize pr-1">
            {theme === "system" ? "Device" : theme}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl py-1.5 z-50 animate-fade-down backdrop-blur-xl">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80">
            Appearance
          </div>
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setTheme(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 opacity-80" />
                  <div className="text-left">
                    <div>{opt.label}</div>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
