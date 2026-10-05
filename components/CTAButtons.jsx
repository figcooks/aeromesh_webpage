"use client";

import { useTheme } from "./ThemeContext";

export default function CTAButtons() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2 sm:pt-4">
      {/* Primary: Get Started */}
      <a
        href="#get-started"
        className={`group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-semibold text-base tracking-wide transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer text-center ${
          isDark
            ? "bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 hover:shadow-[0_0_35px_rgba(34,211,238,0.55)] focus:ring-cyan-300 focus:ring-offset-[#060B14] glow-cyan-button"
            : "bg-gradient-to-r from-sky-500 to-cyan-600 text-white shadow-md shadow-sky-500/25 hover:shadow-lg hover:shadow-sky-500/40 focus:ring-sky-500 focus:ring-offset-white"
        }`}
      >
        <span>Get Started</span>
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </a>

      {/* Secondary: View on GitHub */}
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl font-medium text-base tracking-wide backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 cursor-pointer text-center ${
          isDark
            ? "border border-white/15 bg-white/[0.04] text-slate-200 hover:text-white hover:border-cyan-500/40 hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] focus:ring-slate-400"
            : "border border-slate-300 bg-white/90 text-slate-700 hover:text-slate-950 hover:border-sky-400 hover:bg-white shadow-xs focus:ring-sky-500"
        }`}
      >
        <svg
          className="w-5 h-5 fill-current transition-transform duration-200 group-hover:scale-110"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
        <span>View on GitHub</span>
      </a>
    </div>
  );
}
