"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "./ThemeContext";

export default function ComparisonSection() {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Reduced scroll height: snappier, tighter progression (140vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const [dataSizeText, setDataSizeText] = useState("8.0 GB");

  useEffect(() => {
    return smoothProgress.on("change", (p) => {
      // 0.20 -> 0.55: Compress from 8.0 GB down to 5.1 KB
      if (p < 0.22) {
        setDataSizeText("8.0 GB");
      } else if (p < 0.32) {
        const factor = (p - 0.22) / 0.1;
        setDataSizeText(`${(8 - factor * 4).toFixed(1)} GB`);
      } else if (p < 0.40) {
        const factor = (p - 0.32) / 0.08;
        setDataSizeText(`${(4 - factor * 3).toFixed(1)} GB`);
      } else if (p < 0.48) {
        const factor = (p - 0.40) / 0.08;
        setDataSizeText(`${Math.round(1000 - factor * 900)} MB`);
      } else if (p < 0.55) {
        const factor = (p - 0.48) / 0.07;
        setDataSizeText(`${Math.round(100 - factor * 90)} MB`);
      } else {
        setDataSizeText("5.1 KB");
      }
    });
  }, [smoothProgress]);

  // APPEAR FROM BELOW: cards start 110px below and slide up cleanly into view with full 100% opacity
  const cardsEntranceY = useTransform(smoothProgress, [0.0, 0.16], [110, 0]);
  const cardsEntranceOpacity = useTransform(smoothProgress, [0.0, 0.12], [0, 1]);

  // Heavy transfer stream compression
  const heavyStreamWidth = useTransform(smoothProgress, [0.22, 0.52], [64, 4]);

  // Monumental 0.0 MB Climax overlay
  const climaxOpacity = useTransform(smoothProgress, [0.55, 0.64, 0.84, 0.94], [0, 1, 1, 0]);
  const climaxScale = useTransform(smoothProgress, [0.55, 0.64, 0.84, 0.94], [0.9, 1, 1, 1.05]);
  const climaxY = useTransform(smoothProgress, [0.84, 0.94], [0, -40]);

  // Dim surrounding comparison elements when climax is front-and-center
  const surroundingDim = useTransform(smoothProgress, [0.55, 0.64, 0.84, 0.92], [1, 0.08, 0.08, 1]);

  return (
    <section
      ref={containerRef}
      id="comparison-section"
      className="relative w-full h-[140vh] sm:h-[155vh] bg-[#060B14] transition-colors duration-300"
      aria-label="Traditional Distributed Inference vs AeroMESH 0.0 MB Moment"
    >
      {/* Pinned Sticky Viewport with top padding clearing fixed navbar */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-12 pt-20 pb-4 select-none">
        {/* Subtle Ambient Background Grid */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(34,211,238,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.2) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(99,102,241,0.12) 50%, transparent 80%)",
            }}
          />
        </div>

        {/* Central Connecting Horizon Line */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent pointer-events-none z-10" />

        {/* MAIN COMPARISON CONTAINER - APPEARS FROM BELOW */}
        <motion.div
          style={{
            y: cardsEntranceY,
            opacity: useTransform(
              [cardsEntranceOpacity, surroundingDim],
              ([entry, dim]) => entry * dim
            ),
          }}
          className="relative z-20 w-full max-w-7xl mx-auto flex flex-col justify-between py-2 sm:py-3 h-full max-h-[660px]"
        >
          {/* Top Headers Row */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12 mb-2">
            {/* Left Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-red-500/50 bg-red-950/40 text-red-300 text-[11px] font-mono font-semibold tracking-wider mb-1 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                <span>01</span>
                <span>TRADITIONAL APPROACH</span>
              </div>
              <h2 className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-white uppercase leading-tight">
                TRADITIONAL DISTRIBUTED INFERENCE
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                The model has to be transferred between machines.
              </p>
            </div>

            {/* Right Header */}
            <div className="text-left md:text-right">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-cyan-500/50 bg-cyan-950/40 text-cyan-300 text-[11px] font-mono font-semibold tracking-wider mb-1 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
                <span>02</span>
                <span>AEROMESH APPROACH</span>
              </div>
              <h2 className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-white uppercase leading-tight text-cyan-glow">
                AEROMESH
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                Each node keeps the model locally. Only small activations are transferred.
              </p>
            </div>
          </div>

          {/* Central Architecture Comparison Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12 items-stretch flex-1">
            {/* ---------------------------------------------------- */}
            {/* LEFT COLUMN: TRADITIONAL DISTRIBUTED INFERENCE */}
            {/* ---------------------------------------------------- */}
            <div className="flex flex-col justify-between bg-[#0A101F]/95 border border-red-500/30 rounded-xl p-4 sm:p-5 backdrop-blur-xl relative shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
              {/* Node A (Sender) */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
                  <span className="text-xs font-mono font-bold text-white tracking-wider">NODE A</span>
                  <span className="text-[10px] font-mono text-slate-300 hidden sm:inline">RTX 3050 · 16 GB · Windows</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/10 text-white font-bold border border-white/15">
                  MODEL.GGUF
                </span>
              </div>

              {/* Node A Model Layer Stack */}
              <div className="my-1.5 flex flex-col items-center gap-1">
                {[1, 2, 3].map((b) => (
                  <div
                    key={b}
                    className="w-full max-w-[220px] h-3.5 rounded bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 shadow-[0_0_10px_rgba(34,211,238,0.4)] flex items-center justify-center text-[9px] font-mono text-slate-950 font-black tracking-wide"
                  >
                    WEIGHT LAYER #{b}
                  </div>
                ))}
              </div>

              {/* Heavy Model Transfer Stream */}
              <div className="my-1 py-1 flex flex-col items-center justify-center relative">
                <motion.div
                  style={{ width: heavyStreamWidth }}
                  className="h-10 sm:h-12 rounded bg-gradient-to-b from-red-500 via-orange-400 to-red-500 relative overflow-hidden flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.5)]"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.35)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.35)_50%,rgba(255,255,255,0.35)_75%,transparent_75%)] bg-[length:12px_12px] animate-[pulse_1.2s_infinite]" />
                </motion.div>

                <div className="mt-1.5 px-3 py-1 rounded border border-red-500/60 bg-red-950/80 backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.35)]">
                  <span className="text-[10px] font-mono tracking-wider text-red-200 uppercase font-semibold">
                    TRANSFERRING WEIGHTS:
                  </span>
                  <span className="text-xs font-mono font-bold text-red-200">
                    {dataSizeText}
                  </span>
                </div>
              </div>

              {/* Node B (Receiver) */}
              <div className="my-1.5 flex flex-col items-center gap-1">
                {[1, 2, 3].map((b) => (
                  <div
                    key={b}
                    className="w-full max-w-[220px] h-3.5 rounded bg-slate-800/90 border border-slate-600 flex items-center justify-center text-[9px] font-mono text-slate-300 font-semibold"
                  >
                    RECEIVING LAYER #{b}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span className="text-xs font-mono font-bold text-white tracking-wider">NODE B</span>
                  <span className="text-[10px] font-mono text-slate-300 hidden sm:inline">RTX 4060 · 16 GB · Linux</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 font-semibold">STANDBY</span>
              </div>

              {/* Bottom Metric: 8.0 GB */}
              <div className="mt-2.5 p-2.5 rounded-lg border border-red-500/60 bg-red-950/40 text-center shadow-[0_0_25px_rgba(239,68,68,0.3)]">
                <div className="text-3xl sm:text-4xl font-black font-mono text-red-400 tracking-tight leading-tight drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                  8.0 GB
                </div>
                <div className="text-[10px] font-mono tracking-[0.2em] text-red-300 uppercase font-bold">
                  MODEL WEIGHTS TRANSFERRED
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* RIGHT COLUMN: AEROMESH APPROACH */}
            {/* ---------------------------------------------------- */}
            <div className="flex flex-col justify-between bg-[#0A101F]/95 border border-cyan-500/50 rounded-xl p-4 sm:p-5 backdrop-blur-xl relative shadow-[0_15px_40px_rgba(34,211,238,0.15)]">
              {/* Node A (Coordinator) */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
                  <span className="text-xs font-mono font-bold text-white tracking-wider">NODE A</span>
                  <span className="text-[10px] font-mono text-slate-300 hidden sm:inline">RTX 3050 · 16 GB · Windows</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-3 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-400/60 text-cyan-200 font-bold shadow-[0_0_10px_rgba(34,211,238,0.25)]">
                  <svg className="w-2.5 h-2.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>LOCAL</span>
                </span>
              </div>

              {/* Node A Local Locked Models */}
              <div className="my-1.5 flex flex-col items-center gap-1">
                {[1, 2, 3].map((b) => (
                  <div
                    key={b}
                    className="w-full max-w-[220px] h-3.5 rounded bg-gradient-to-r from-cyan-950 via-cyan-900 to-cyan-950 border border-cyan-400/60 flex items-center justify-between px-3 text-[9px] font-mono text-cyan-100 font-semibold"
                  >
                    <span>MODEL.GGUF PART {b}</span>
                    <span className="text-cyan-300 font-black">LOCKED</span>
                  </div>
                ))}
              </div>

              {/* Sleek Activation Stream Line */}
              <div className="my-1 py-1 flex flex-col items-center justify-center relative">
                <div className="w-full max-w-[220px] h-[2px] bg-cyan-400/60 relative flex items-center justify-center shadow-[0_0_8px_#22D3EE]">
                  <motion.div
                    animate={{ x: [-60, 60] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                    className="w-3.5 h-3.5 rounded bg-cyan-300 shadow-[0_0_15px_#22D3EE] rotate-45 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </motion.div>
                </div>

                <div className="mt-1.5 px-3 py-1 rounded border border-cyan-500/60 bg-cyan-950/80 backdrop-blur-md flex items-center gap-2 shadow-[0_0_18px_rgba(34,211,238,0.3)]">
                  <span className="text-[10px] font-mono tracking-wider text-cyan-200 uppercase font-semibold">
                    ACTIVATION TRANSFER:
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-200">
                    5.1 KB
                  </span>
                </div>
              </div>

              {/* Node B Local Locked Models */}
              <div className="my-1.5 flex flex-col items-center gap-1">
                {[4, 5, 6].map((b) => (
                  <div
                    key={b}
                    className="w-full max-w-[220px] h-3.5 rounded bg-gradient-to-r from-cyan-950 via-cyan-900 to-cyan-950 border border-cyan-400/60 flex items-center justify-between px-3 text-[9px] font-mono text-cyan-100 font-semibold"
                  >
                    <span>MODEL.GGUF PART {b}</span>
                    <span className="text-cyan-300 font-black">LOCKED</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
                  <span className="text-xs font-mono font-bold text-white tracking-wider">NODE B</span>
                  <span className="text-[10px] font-mono text-slate-300 hidden sm:inline">RTX 4060 · 16 GB · Linux</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-3 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-400/60 text-cyan-200 font-bold shadow-[0_0_10px_rgba(34,211,238,0.25)]">
                  <svg className="w-2.5 h-2.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>LOCAL</span>
                </span>
              </div>

              {/* Bottom Metric: 0.0 MB */}
              <div className="mt-2.5 p-2.5 rounded-lg border border-cyan-400/60 bg-cyan-950/50 text-center shadow-[0_0_30px_rgba(34,211,238,0.35)]">
                <div className="text-3xl sm:text-4xl font-black font-mono text-cyan-300 tracking-tight leading-tight text-cyan-glow">
                  0.0 MB
                </div>
                <div className="text-[10px] font-mono tracking-[0.2em] text-cyan-200 uppercase font-bold">
                  MODEL WEIGHTS TRANSFERRED
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Center Comparison Badge */}
          <div className="mt-2 text-center">
            <span className="inline-block px-3.5 py-1 rounded-full border border-white/15 bg-white/[0.06] text-[10px] font-mono tracking-[0.2em] text-slate-200 uppercase">
              SAME INTELLIGENCE · <strong className="text-cyan-300 font-bold">DIFFERENT APPROACH</strong>
            </span>
          </div>
        </motion.div>

        {/* ---------------------------------------------------- */}
        {/* THE 0.0 MB MONUMENTAL CLIMAX OVERLAY */}
        {/* ---------------------------------------------------- */}
        <motion.div
          style={{
            opacity: climaxOpacity,
            scale: climaxScale,
            y: climaxY,
          }}
          className="absolute inset-0 pointer-events-none z-40 flex flex-col items-center justify-center p-4 text-center"
        >
          <div className="relative px-8 py-8 sm:px-14 sm:py-12 rounded-3xl border border-cyan-400/60 bg-[#060B14]/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(34,211,238,0.4)] flex flex-col items-center max-w-lg w-full">
            <div className="inline-flex items-center gap-2 mb-3 text-[11px] font-mono tracking-[0.26em] text-cyan-300 uppercase font-bold">
              <span className="w-5 h-[1px] bg-cyan-400/80 inline-block" />
              <span>THE AEROMESH BREAKTHROUGH</span>
              <span className="w-5 h-[1px] bg-cyan-400/80 inline-block" />
            </div>

            <h2 className="text-[72px] sm:text-[105px] lg:text-[130px] font-black tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyan-400 text-cyan-glow leading-none">
              0.0 MB
            </h2>

            <p className="mt-3 text-sm sm:text-lg lg:text-xl font-mono tracking-[0.22em] text-slate-100 uppercase font-black">
              MODEL WEIGHTS TRANSFERRED
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs font-mono tracking-wider text-cyan-300">
              <span className="px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/50 font-bold text-slate-200">
                MODEL STAYS.
              </span>
              <span className="text-cyan-400 font-bold">→</span>
              <span className="px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/50 text-cyan-200 font-black">
                ACTIVATIONS MOVE.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
