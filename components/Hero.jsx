"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroModelPlaceholder from "./HeroModelPlaceholder";
import { useTheme } from "./ThemeContext";

export default function Hero() {
  const heroRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Scroll-driven exit transition: headline moves up and fades out smoothly
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -90]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`relative w-full min-h-screen flex items-center justify-between overflow-hidden transition-colors duration-300 pt-20 ${
        isDark ? "bg-[#060B14]" : "bg-[#F8FAFC]"
      }`}
      aria-label="AeroMESH Hero Section"
    >
      {/* 1. Abstract Distributed Computing Background (z-0, continuous 60fps) */}
      <HeroBackground />

      {/* Main Grid Container for Content & Future 3D Model */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-5rem)]">
        {/* Left: 42–45% Desktop Width (Moves upward & fades away smoothly on scroll) */}
        <motion.div style={{ opacity: contentOpacity, y: contentY }} className="w-full lg:w-[45%] xl:w-[44%] shrink-0">
          <HeroContent />
        </motion.div>

        {/* Right: 52–58% Desktop Width (Reserved for future 3D model) */}
        <HeroModelPlaceholder />
      </div>

      {/* Subtle Technical Label in Lower-Right (Fades out smoothly on scroll) */}
      <motion.div
        style={{ opacity: badgeOpacity }}
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-9 lg:right-12 z-20 hidden sm:flex items-center gap-3.5 select-none pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex flex-col text-right">
          <span
            className={`text-[11px] font-mono tracking-[0.24em] uppercase leading-snug transition-colors ${
              isDark ? "text-slate-400" : "text-slate-500 font-medium"
            }`}
          >
            YOUR MACHINES.
          </span>
          <span
            className={`text-[11px] font-mono tracking-[0.24em] font-semibold uppercase leading-snug transition-colors ${
              isDark ? "text-cyan-400 text-cyan-glow" : "text-sky-600 font-bold"
            }`}
          >
            A BIGGER AI ENGINE.
          </span>
        </div>
        <div
          className={`w-2 h-2 rounded-full animate-pulse transition-all ${
            isDark
              ? "bg-cyan-400 shadow-[0_0_10px_#22D3EE]"
              : "bg-sky-500 shadow-[0_0_8px_#0EA5E9]"
          }`}
        />
      </motion.div>
    </section>
  );
}
