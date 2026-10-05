"use client";

import { useState } from "react";
import { useTheme } from "./ThemeContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const navLinks = [
    { name: "Home", href: "#", active: true },
    { name: "About", href: "#about", active: false },
    { name: "Architecture", href: "#architecture", active: false },
    { name: "Features", href: "#features", active: false },
    { name: "Docs", href: "#docs", active: false },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 backdrop-blur-md ${
        isDark
          ? "bg-[#060B14]/80 border-b border-white/[0.05]"
          : "bg-white/85 border-b border-slate-200/80 shadow-xs"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Left: Plain text logo ONLY */}
        <div className="flex-shrink-0">
          <a
            href="#"
            className={`text-lg sm:text-xl font-bold tracking-[0.24em] uppercase transition-colors select-none ${
              isDark
                ? "text-white hover:text-cyan-300"
                : "text-slate-900 hover:text-sky-600"
            }`}
          >
            AEROMESH
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10"
          aria-label="Main Navigation"
        >
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`relative text-sm tracking-wide transition-colors duration-200 py-1 ${
                item.active
                  ? isDark
                    ? "text-cyan-400 font-semibold"
                    : "text-sky-600 font-semibold"
                  : isDark
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.name}
              {item.active && (
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                    isDark
                      ? "bg-cyan-400 shadow-[0_0_8px_#22D3EE]"
                      : "bg-sky-600 shadow-[0_0_8px_#0284C7]"
                  }`}
                  aria-hidden="true"
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right: Theme Toggle & Bordered CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`group relative inline-flex items-center justify-center p-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 cursor-pointer ${
              isDark
                ? "border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 focus:ring-cyan-400"
                : "border border-slate-300 bg-white text-slate-700 hover:text-sky-700 hover:border-sky-400 hover:bg-sky-50 focus:ring-sky-500 shadow-xs"
            }`}
            aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
            title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
          >
            {isDark ? (
              /* Sun Icon for Dark Mode (click to switch to Light) */
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:rotate-45"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              /* Moon Icon for Light Mode (click to switch to Dark) */
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:-rotate-12"
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Bordered CTA Button */}
          <a
            href="#get-started"
            className={`group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              isDark
                ? "border border-cyan-500/40 bg-cyan-950/20 text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/15 glow-pill"
                : "border border-sky-500/50 bg-sky-50 text-sky-700 hover:text-sky-900 hover:border-sky-600 hover:bg-sky-100/80 shadow-xs"
            }`}
          >
            <span>Get Started</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>

        {/* Mobile controls: Theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors focus:outline-none ${
              isDark
                ? "text-slate-400 hover:text-white hover:bg-white/[0.05] focus:ring-1 focus:ring-cyan-400"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-1 focus:ring-sky-500"
            }`}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t px-6 py-5 space-y-3 backdrop-blur-xl ${
            isDark
              ? "border-white/[0.06] bg-[#060B14]/95"
              : "border-slate-200 bg-white/95 shadow-lg"
          }`}
        >
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-base transition-colors ${
                item.active
                  ? isDark
                    ? "text-cyan-400 font-semibold"
                    : "text-sky-600 font-semibold"
                  : isDark
                  ? "text-slate-300 hover:text-white"
                  : "text-slate-700 hover:text-slate-950"
              }`}
            >
              {item.name}
            </a>
          ))}
          <div className={`pt-3 border-t ${isDark ? "border-white/[0.08]" : "border-slate-200"}`}>
            <a
              href="#get-started"
              onClick={() => setMobileMenuOpen(false)}
              className={`inline-flex w-full items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium ${
                isDark
                  ? "border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:text-white hover:bg-cyan-500/20"
                  : "border border-sky-500/50 bg-sky-50 text-sky-700 hover:bg-sky-100"
              }`}
            >
              <span>Get Started</span>
              <span>→</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
