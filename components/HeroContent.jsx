"use client";

import CTAButtons from "./CTAButtons";
import { useTheme } from "./ThemeContext";

export default function HeroContent() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative z-20 flex flex-col justify-center max-w-2xl lg:max-w-[580px] xl:max-w-[650px] text-left py-6 lg:py-0">
      {/* Eyebrow with sleek technical corner accent */}
      <div className="inline-flex items-center gap-3.5 mb-5 md:mb-6 select-none">
        <div className={`flex items-center ${isDark ? "text-cyan-400/80" : "text-sky-600"}`}>
          <span
            className={`w-5 h-[1.5px] inline-block ${
              isDark ? "bg-cyan-400/70" : "bg-sky-600"
            }`}
          />
          <span
            className={`w-[1.5px] h-3 inline-block -ml-[1.5px] ${
              isDark ? "bg-cyan-400/70" : "bg-sky-600"
            }`}
          />
        </div>
        <span
          className={`text-xs sm:text-sm font-mono tracking-[0.24em] font-semibold uppercase ${
            isDark ? "text-cyan-300" : "text-sky-700"
          }`}
        >
          DISTRIBUTED LLM INFERENCE
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="font-extrabold tracking-[-0.035em] leading-[1.04] text-[40px] xs:text-[46px] sm:text-[56px] md:text-[66px] lg:text-[72px] xl:text-[82px]">
        <span className={`block transition-colors duration-200 ${isDark ? "text-white" : "text-slate-900"}`}>
          RUN BIGGER MODELS.
        </span>
        <span
          className={`block mt-1 sm:mt-2 text-transparent bg-clip-text text-cyan-glow ${
            isDark
              ? "bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400"
              : "bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700"
          }`}
        >
          NOT BIGGER MACHINES.
        </span>
      </h1>

      {/* Supporting Copy */}
      <p
        className={`mt-5 md:mt-7 text-base sm:text-lg md:text-[19px] font-normal leading-relaxed max-w-[560px] transition-colors duration-200 ${
          isDark ? "text-slate-300/85" : "text-slate-600"
        }`}
      >
        AeroMESH enables distributed, fault-tolerant LLM inference across the
        hardware you already own. No model transfer. Just pure compute, working
        together.
      </p>

      {/* CTA Buttons */}
      <div className="mt-7 md:mt-8">
        <CTAButtons />
      </div>
    </div>
  );
}
