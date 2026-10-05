"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "./ThemeContext";

/**
 * FeaturesSection
 *
 * Minimal, elegant transition section between Hero and Comparison:
 * - Empty, spacious layout ("keep space empty and just give features heading there")
 * - Crisp, minimalist "FEATURES" heading with smooth scroll-driven entrance
 * - Interactive cursor light effect glides effortlessly across the dark empty expanse
 * - No heavy canvas lines or pulsing circles
 */
export default function FeaturesSection() {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0.1, 0.45], [40, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const headingScale = useTransform(scrollYProgress, [0.1, 0.45], [0.95, 1]);

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative w-full py-12 sm:py-16 flex flex-col items-center justify-center select-none overflow-hidden transition-colors duration-300 px-4 sm:px-6 z-10"
      aria-label="AeroMESH Features Overview"
    >
      {/* Ambient background grid lines - ultra subtle */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(34,211,238,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.2) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[130px] opacity-15 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(99,102,241,0.1) 60%, transparent 80%)",
          }}
        />
      </div>

      {/* Minimal Features Heading with Smooth Scroll Reveal */}
      <motion.div
        style={{
          y: headingY,
          opacity: headingOpacity,
          scale: headingScale,
        }}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto"
      >
        {/* Subtle Technical Eyebrow */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md mb-4 ${
            isDark
              ? "border-cyan-500/30 bg-cyan-950/40 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
              : "border-sky-300 bg-sky-50 shadow-xs"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              isDark ? "bg-cyan-400" : "bg-sky-600"
            }`}
          />
          <span
            className={`text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase font-semibold ${
              isDark ? "text-cyan-300" : "text-sky-700"
            }`}
          >
            ARCHITECTURE & CAPABILITIES
          </span>
        </div>

        {/* Minimal Features Headline */}
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase leading-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          CORE{" "}
          <span
            className={`text-transparent bg-clip-text text-cyan-glow ${
              isDark
                ? "bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300"
                : "bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700"
            }`}
          >
            FEATURES
          </span>
        </h2>

        {/* Crisp Subtitle */}
        <p
          className={`mt-3 text-xs sm:text-sm font-mono tracking-[0.16em] uppercase max-w-lg ${
            isDark ? "text-slate-400" : "text-slate-600 font-medium"
          }`}
        >
          Zero Weight Migration · Local Model Persistence · Micro-Activation Sharding
        </p>

        {/* Thin Minimal Center Divider */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/50" />
        </div>
      </motion.div>
    </section>
  );
}
