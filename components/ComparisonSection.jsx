"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

/**
 * ComparisonSection
 *
 * Clean, robust, high-contrast comparison between:
 * - 01 TRADITIONAL DISTRIBUTED INFERENCE (8.0 GB transferred between Node A and Node B)
 * - 02 AEROMESH APPROACH (Model stays local on each node, only 5.1 KB activation moves, 0.0 MB transferred)
 *
 * Appears neatly in natural document flow with zero sticky glitching or blank scroll zones.
 */
export default function ComparisonSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="comparison-section"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#060B14] transition-colors duration-300 flex flex-col items-center justify-center select-none"
      aria-label="Traditional Distributed Inference vs AeroMESH 0.0 MB Moment"
    >
      {/* Subtle Ambient Background Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(34,211,238,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.2) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[150px] opacity-15 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(99,102,241,0.12) 50%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8">
        {/* Section Eyebrow & Top Headings */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
          {/* Left: Traditional Heading */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/50 bg-red-950/40 text-red-300 text-[11px] font-mono font-semibold tracking-wider mb-2 shadow-[0_0_12px_rgba(239,68,68,0.2)]">
              <span>01</span>
              <span>TRADITIONAL APPROACH</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white uppercase leading-tight">
              TRADITIONAL DISTRIBUTED INFERENCE
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              The entire model weights have to be transferred across the network.
            </p>
          </div>

          {/* Right: AeroMESH Heading */}
          <div className="text-left md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/60 bg-cyan-950/50 text-cyan-200 text-[11px] font-mono font-bold tracking-wider mb-2 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
              <span>02</span>
              <span>AEROMESH APPROACH</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white uppercase leading-tight text-cyan-glow">
              AEROMESH
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Each node keeps the model locally. Only micro-activations are transferred.
            </p>
          </div>
        </div>

        {/* Central Architecture Comparison Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-stretch">
          {/* ---------------------------------------------------- */}
          {/* LEFT COLUMN: TRADITIONAL DISTRIBUTED INFERENCE */}
          {/* ---------------------------------------------------- */}
          <div className="flex flex-col justify-between bg-[#0A101F] border border-red-500/40 rounded-2xl p-6 sm:p-7 backdrop-blur-xl relative shadow-[0_20px_50px_rgba(0,0,0,0.7)] gap-6">
            {/* Node A (Sender) */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
                  <span className="text-sm font-mono font-bold text-white tracking-wider">NODE A</span>
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">RTX 3050 · 16 GB · Windows</span>
                </div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/10 text-white font-bold border border-white/15">
                  MODEL.GGUF
                </span>
              </div>

              {/* Node A Model Layer Stack */}
              <div className="mt-3 flex flex-col items-center gap-1.5">
                {[1, 2, 3].map((b) => (
                  <div
                    key={b}
                    className="w-full max-w-[260px] h-4 rounded bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 shadow-[0_0_10px_rgba(34,211,238,0.3)] flex items-center justify-center text-[10px] font-mono text-slate-950 font-black tracking-wider"
                  >
                    WEIGHT LAYER #{b}
                  </div>
                ))}
              </div>
            </div>

            {/* Heavy Model Transfer Stream (8.0 GB) */}
            <div className="py-3 flex flex-col items-center justify-center relative">
              <div className="w-full max-w-[260px] h-12 rounded bg-gradient-to-b from-red-500 via-orange-400 to-red-500 relative overflow-hidden flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.45)]">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.3)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0.3)_75%,transparent_75%)] bg-[length:14px_14px] animate-[pulse_1.5s_infinite]" />
                <span className="relative z-10 text-xs font-mono font-black text-white uppercase tracking-widest drop-shadow-md">
                  HEAVY WEIGHT TRANSFER
                </span>
              </div>

              <div className="mt-2 px-3 py-1 rounded border border-red-500/60 bg-red-950/80 backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                <span className="text-[10px] font-mono tracking-wider text-red-200 uppercase font-bold">
                  TRANSFERRING WEIGHTS:
                </span>
                <span className="text-xs font-mono font-black text-red-300">
                  8.0 GB
                </span>
              </div>
            </div>

            {/* Node B (Receiver) */}
            <div>
              <div className="mb-3 flex flex-col items-center gap-1.5">
                {[1, 2, 3].map((b) => (
                  <div
                    key={b}
                    className="w-full max-w-[260px] h-4 rounded bg-slate-800/90 border border-slate-600 flex items-center justify-center text-[10px] font-mono text-slate-300 font-semibold"
                  >
                    RECEIVING LAYER #{b}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span className="text-sm font-mono font-bold text-white tracking-wider">NODE B</span>
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">RTX 4060 · 16 GB · Linux</span>
                </div>
                <span className="text-xs font-mono text-slate-400 font-semibold">STANDBY</span>
              </div>
            </div>

            {/* Bottom Metric: 8.0 GB */}
            <div className="p-4 rounded-xl border border-red-500/60 bg-red-950/40 text-center shadow-[0_0_25px_rgba(239,68,68,0.25)]">
              <div className="text-4xl sm:text-5xl font-black font-mono text-red-400 tracking-tight leading-none drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                8.0 GB
              </div>
              <div className="text-xs font-mono tracking-[0.22em] text-red-200 uppercase font-black mt-1">
                MODEL WEIGHTS TRANSFERRED
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* RIGHT COLUMN: AEROMESH APPROACH (0.0 MB) */}
          {/* ---------------------------------------------------- */}
          <div className="flex flex-col justify-between bg-[#0A101F] border border-cyan-400/60 rounded-2xl p-6 sm:p-7 backdrop-blur-xl relative shadow-[0_20px_50px_rgba(34,211,238,0.18)] gap-6">
            {/* Node A (Coordinator) */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
                  <span className="text-sm font-mono font-bold text-white tracking-wider">NODE A</span>
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">RTX 3050 · 16 GB · Windows</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-400/70 text-cyan-200 font-bold shadow-[0_0_12px_rgba(34,211,238,0.3)]">
                  <svg className="w-3 h-3 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>LOCAL</span>
                </span>
              </div>

              {/* Node A Local Locked Models */}
              <div className="mt-3 flex flex-col items-center gap-1.5">
                {[1, 2, 3].map((b) => (
                  <div
                    key={b}
                    className="w-full max-w-[260px] h-4 rounded bg-gradient-to-r from-cyan-950 via-cyan-900 to-cyan-950 border border-cyan-400/60 flex items-center justify-between px-3 text-[10px] font-mono text-cyan-100 font-semibold"
                  >
                    <span>MODEL.GGUF PART {b}</span>
                    <span className="text-cyan-300 font-black">LOCKED</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sleek Activation Stream Line (5.1 KB) */}
            <div className="py-3 flex flex-col items-center justify-center relative">
              <div className="w-full max-w-[260px] h-[3px] bg-cyan-400/60 relative flex items-center justify-center shadow-[0_0_10px_#22D3EE]">
                <motion.div
                  animate={{ x: [-80, 80] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 rounded bg-cyan-300 shadow-[0_0_20px_#22D3EE] rotate-45 flex items-center justify-center"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </motion.div>
              </div>

              <div className="mt-3 px-3.5 py-1 rounded border border-cyan-400/70 bg-cyan-950/90 backdrop-blur-md flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.35)]">
                <span className="text-[10px] font-mono tracking-wider text-cyan-200 uppercase font-bold">
                  ACTIVATION TRANSFER:
                </span>
                <span className="text-xs font-mono font-black text-cyan-200">
                  5.1 KB
                </span>
              </div>
            </div>

            {/* Node B Local Locked Models */}
            <div>
              <div className="mb-3 flex flex-col items-center gap-1.5">
                {[4, 5, 6].map((b) => (
                  <div
                    key={b}
                    className="w-full max-w-[260px] h-4 rounded bg-gradient-to-r from-cyan-950 via-cyan-900 to-cyan-950 border border-cyan-400/60 flex items-center justify-between px-3 text-[10px] font-mono text-cyan-100 font-semibold"
                  >
                    <span>MODEL.GGUF PART {b}</span>
                    <span className="text-cyan-300 font-black">LOCKED</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
                  <span className="text-sm font-mono font-bold text-white tracking-wider">NODE B</span>
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">RTX 4060 · 16 GB · Linux</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-400/70 text-cyan-200 font-bold shadow-[0_0_12px_rgba(34,211,238,0.3)]">
                  <svg className="w-3 h-3 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>LOCAL</span>
                </span>
              </div>
            </div>

            {/* Bottom Metric: 0.0 MB MOMENT */}
            <div className="p-4 rounded-xl border border-cyan-400/80 bg-cyan-950/60 text-center shadow-[0_0_35px_rgba(34,211,238,0.4)]">
              <div className="text-4xl sm:text-5xl font-black font-mono text-cyan-300 tracking-tight leading-none text-cyan-glow">
                0.0 MB
              </div>
              <div className="text-xs font-mono tracking-[0.22em] text-cyan-100 uppercase font-black mt-1">
                MODEL WEIGHTS TRANSFERRED
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* THE 0.0 MB MONUMENTAL BREAKTHROUGH CARD */}
        {/* Clean, neat, fully visible in-flow container */}
        {/* ---------------------------------------------------- */}
        <div className="w-full max-w-4xl mx-auto rounded-2xl border border-cyan-400/60 bg-[#0A101F]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(34,211,238,0.25)] flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-2 text-xs font-mono tracking-[0.26em] text-cyan-300 uppercase font-bold">
            <span className="w-6 h-[1px] bg-cyan-400/80 inline-block" />
            <span>THE AEROMESH BREAKTHROUGH</span>
            <span className="w-6 h-[1px] bg-cyan-400/80 inline-block" />
          </div>

          <h3 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyan-400 text-cyan-glow leading-none">
            0.0 MB
          </h3>

          <p className="mt-2 text-sm sm:text-lg font-mono tracking-[0.22em] text-slate-100 uppercase font-black">
            MODEL WEIGHTS TRANSFERRED
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
            <span className="px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/50 font-bold text-slate-200">
              MODEL STAYS LOCAL
            </span>
            <span className="text-cyan-400 font-bold text-base">→</span>
            <span className="px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/70 text-cyan-200 font-black shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              ONLY 5.1 KB ACTIVATION MOVES
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
