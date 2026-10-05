"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "./ThemeContext";

export default function PipelineSection() {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Reduced scroll height: snappier, tighter progression (140vh) with zero dead space
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const [activeStage, setActiveStage] = useState(1);
  const [activeLayersA, setActiveLayersA] = useState(12);
  const [activeLayersB, setActiveLayersB] = useState(0);
  const [activeTokens, setActiveTokens] = useState(2);

  useEffect(() => {
    return smoothProgress.on("change", (p) => {
      // Stage 1: Tokenize (0.0 -> 0.20)
      if (p < 0.20) {
        setActiveStage(1);
        setActiveLayersA(Math.min(24, Math.floor(6 + (p / 0.20) * 12)));
        setActiveLayersB(0);
        setActiveTokens(1);
      }
      // Stage 2: Coordinator Inference (Layers 0 - 24, 0.20 -> 0.45)
      else if (p < 0.45) {
        setActiveStage(2);
        const layers = Math.min(24, Math.floor(18 + ((p - 0.20) / 0.25) * 6));
        setActiveLayersA(layers);
        setActiveLayersB(0);
        setActiveTokens(1);
      }
      // Stage 3: Transfer Activation (~5.1 KB packet moves, 0.45 -> 0.70)
      else if (p < 0.70) {
        setActiveStage(3);
        setActiveLayersA(24);
        const layers = Math.min(12, Math.floor(((p - 0.45) / 0.25) * 12));
        setActiveLayersB(layers);
        setActiveTokens(2);
      }
      // Stage 4: Worker Inference (Layers 25 - 48, 0.70 -> 0.88)
      else if (p < 0.88) {
        setActiveStage(4);
        setActiveLayersA(24);
        const layers = Math.min(24, Math.floor(12 + ((p - 0.70) / 0.18) * 12));
        setActiveLayersB(layers);
        setActiveTokens(3);
      }
      // Stage 5: Generate Token Loop (0.88 -> 1.0)
      else {
        setActiveStage(5);
        setActiveLayersA(24);
        setActiveLayersB(24);
        const tok = Math.min(6, 4 + Math.floor(((p - 0.88) / 0.12) * 2));
        setActiveTokens(tok);
      }
    });
  }, [smoothProgress]);

  // Floating Pipeline levitation response
  const floatingY = useTransform(smoothProgress, [0.0, 0.5, 1.0], [20, 0, -15]);
  const pipelineOpacity = useTransform(smoothProgress, [0.0, 0.12], [0.3, 1]);

  // Activation packet translation across the central fiber
  const packetX = useTransform(smoothProgress, [0.40, 0.72], [-110, 110]);

  const tokens = [
    { text: "The", highlight: true },
    { text: "model", highlight: false },
    { text: "runs", highlight: false },
    { text: "across", highlight: false },
    { text: "the", highlight: false },
    { text: "mesh", highlight: true },
  ];

  return (
    <section
      ref={containerRef}
      id="pipeline-section"
      className="relative w-full h-[140vh] sm:h-[155vh] bg-[#060B14] transition-colors duration-300 -mt-1"
      aria-label="The Inference Pipeline Architecture"
    >
      {/* Pinned Sticky Viewport with top padding clearing fixed navbar */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden px-4 sm:px-6 lg:px-12 pt-20 pb-4 select-none">
        {/* Subtle Ambient Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[150px] opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(99,102,241,0.18) 45%, transparent 75%)",
            }}
          />
        </div>

        {/* TOP: Section Title & Eyebrow */}
        <div className="relative z-20 text-center pt-1 mb-1">
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="w-5 h-[1px] bg-cyan-400/70 inline-block" />
            <span className="text-[11px] font-mono tracking-[0.24em] text-cyan-300 font-bold uppercase">
              AEROMESH
            </span>
            <span className="w-5 h-[1px] bg-cyan-400/70 inline-block" />
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white uppercase leading-tight">
            THE INFERENCE <span className="text-cyan-300 text-cyan-glow">PIPELINE</span>
          </h2>
          <p className="text-xs text-slate-300 max-w-xl mx-auto mt-0.5 font-medium">
            Split the model. Keep it local. Move only activations.
          </p>
        </div>

        {/* CENTER: FLOATING PIPELINE CONTAINER */}
        <motion.div
          style={{
            y: floatingY,
            opacity: pipelineOpacity,
          }}
          className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6 my-auto h-[380px] sm:h-[420px] p-2 sm:p-4 rounded-2xl border border-cyan-500/30 bg-[#0A101F]/80 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(34,211,238,0.12)]"
        >
          {/* ---------------------------------------------------- */}
          {/* LEFT: NODE A (Coordinator) */}
          {/* ---------------------------------------------------- */}
          <div className="flex-1 max-w-[340px] h-full rounded-xl border border-cyan-500/40 bg-slate-900/90 backdrop-blur-xl p-4 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white tracking-wider">
                    NODE A
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full border border-cyan-500/50 bg-cyan-950/70 text-[9px] font-mono text-cyan-200 font-bold">
                    COORDINATOR
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse" />
                  <span className="text-[10px] font-mono tracking-wider text-emerald-300 uppercase font-bold">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Embeddings Box */}
              <div className="mt-3 p-2 rounded-lg border border-white/15 bg-white/[0.04] flex items-center justify-between">
                <span className="text-xs font-mono text-slate-100 font-bold">+ EMBEDDINGS</span>
                <span className="text-[10px] font-mono text-cyan-300 font-semibold">INPUT TOKENS</span>
              </div>

              {/* Model Layers 0 - 24 */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 mb-1.5 font-medium">
                  <span>LAYERS 0 – 24</span>
                  <span className="text-cyan-300 font-bold">{activeLayersA}/24 ACTIVE</span>
                </div>

                <div className="space-y-1.5">
                  {[
                    { id: "01", activeThreshold: 4 },
                    { id: "02", activeThreshold: 10 },
                    { id: "03", activeThreshold: 16 },
                    { id: "...", activeThreshold: 20 },
                    { id: "24", activeThreshold: 24 },
                  ].map((layer, idx) => {
                    const isLit = activeLayersA >= layer.activeThreshold;
                    return (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-slate-400 w-4 font-bold">{layer.id}</span>
                        <div className="flex-1 h-3 rounded bg-slate-950 border border-white/10 overflow-hidden flex gap-0.5 p-0.5">
                          {[0, 1, 2, 3, 4].map((seg) => (
                            <div
                              key={seg}
                              className={`flex-1 rounded-xs transition-all duration-300 ${
                                isLit
                                  ? "bg-gradient-to-r from-cyan-400 to-sky-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                                  : "bg-slate-800/80"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Hardware GPU Footer */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded border border-cyan-500/50 bg-cyan-950/60 flex items-center justify-center">
                  <svg className="w-4 h-4 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <circle cx="8" cy="12" r="2.5" />
                    <circle cx="16" cy="12" r="2.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white leading-tight">RTX 3050</div>
                  <div className="text-[9px] font-mono text-slate-300 leading-tight">8 GB VRAM</div>
                </div>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-200 font-bold">
                PROMPT STAGE
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* CENTER: ACTIVATION TRANSFER STREAM */}
          {/* ---------------------------------------------------- */}
          <div className="flex-1 max-w-[300px] flex flex-col items-center justify-between h-[340px] relative px-2">
            {/* Top HUD Metric */}
            <div className="px-3.5 py-1.5 rounded-xl border border-cyan-500/50 bg-cyan-950/60 backdrop-blur-md text-center shadow-[0_0_20px_rgba(34,211,238,0.25)]">
              <span className="text-[9px] font-mono tracking-widest text-cyan-200 uppercase block font-semibold">
                ACTIVATION TRANSFER
              </span>
              <span className="text-lg font-mono font-black text-cyan-300 text-cyan-glow">
                5.1 KB
              </span>
              <span className="text-[8px] font-mono text-slate-300 block -mt-0.5 font-bold">
                PER TOKEN
              </span>
            </div>

            {/* Central Animated Fiber Stream with Traveling 3D Cubes */}
            <div className="relative w-full h-20 flex items-center justify-center">
              <div className="absolute inset-0 flex flex-col justify-center gap-1 opacity-70">
                <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 shadow-[0_0_10px_#22D3EE]" />
                <div className="h-[1px] w-full bg-gradient-to-r from-sky-400 via-cyan-400 to-purple-400 opacity-80" />
              </div>

              {/* Scroll-Driven Traveling Activation Packet */}
              <motion.div
                style={{ x: packetX }}
                className="relative z-10 w-6 h-6 rounded bg-cyan-300 shadow-[0_0_20px_#22D3EE] rotate-45 flex items-center justify-center"
              >
                <div className="w-2.5 h-2.5 rounded bg-white" />
              </motion.div>

              {/* Ambient Traveling Packets */}
              <motion.div
                animate={{ x: [-120, 120] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute w-3.5 h-3.5 rounded bg-sky-400 shadow-[0_0_10px_#38BDF8] rotate-45 opacity-85"
              />
            </div>

            {/* Bottom HUD Telemetry */}
            <div className="px-3.5 py-1.5 rounded-xl border border-white/15 bg-slate-950/80 backdrop-blur-md text-center">
              <span className="text-[9px] font-mono tracking-widest text-slate-200 uppercase block font-bold">
                ACTIVATIONS ONLY
              </span>
              <span className="text-[10px] font-mono text-cyan-300 font-bold block">
                ~1.5 – 16 KB · INT8 / FP16
              </span>
              <span className="text-[8px] font-mono text-slate-400 block font-semibold">
                TCP / SHARED MEMORY PIPELINE
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* RIGHT: NODE B (Worker) */}
          {/* ---------------------------------------------------- */}
          <div className="flex-1 max-w-[340px] h-full rounded-xl border border-indigo-500/40 bg-slate-900/90 backdrop-blur-xl p-4 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white tracking-wider">
                    NODE B
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full border border-indigo-500/50 bg-indigo-950/70 text-[9px] font-mono text-indigo-200 font-bold">
                    WORKER
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse" />
                  <span className="text-[10px] font-mono tracking-wider text-emerald-300 uppercase font-bold">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Model Layers 25 - 48 */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 mb-1.5 font-medium">
                  <span>LAYERS 25 – 48</span>
                  <span className="text-indigo-300 font-bold">{activeLayersB}/24 ACTIVE</span>
                </div>

                <div className="space-y-1.5">
                  {[
                    { id: "25", activeThreshold: 4 },
                    { id: "26", activeThreshold: 10 },
                    { id: "27", activeThreshold: 16 },
                    { id: "...", activeThreshold: 20 },
                    { id: "48", activeThreshold: 24 },
                  ].map((layer, idx) => {
                    const isLit = activeLayersB >= layer.activeThreshold;
                    return (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-slate-400 w-4 font-bold">{layer.id}</span>
                        <div className="flex-1 h-3 rounded bg-slate-950 border border-white/10 overflow-hidden flex gap-0.5 p-0.5">
                          {[0, 1, 2, 3, 4].map((seg) => (
                            <div
                              key={seg}
                              className={`flex-1 rounded-xs transition-all duration-300 ${
                                isLit
                                  ? "bg-gradient-to-r from-indigo-400 to-purple-400 shadow-[0_0_8px_rgba(99,102,241,0.7)]"
                                  : "bg-slate-800/80"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* LM HEAD Box */}
              <div className="mt-3 p-2 rounded-lg border border-purple-500/40 bg-purple-950/30 flex items-center justify-between">
                <span className="text-xs font-mono text-purple-200 font-bold">LM HEAD</span>
                <div className="w-20 h-2 rounded bg-slate-950 overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 to-cyan-300 rounded transition-all duration-300 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                    style={{ width: activeLayersB >= 20 ? "100%" : "25%" }}
                  />
                </div>
              </div>
            </div>

            {/* Hardware GPU Footer */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded border border-indigo-500/50 bg-indigo-950/60 flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <circle cx="8" cy="12" r="2.5" />
                    <circle cx="16" cy="12" r="2.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white leading-tight">RTX 4060</div>
                  <div className="text-[9px] font-mono text-slate-300 leading-tight">12 GB VRAM</div>
                </div>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-indigo-950/70 border border-indigo-500/40 text-indigo-200 font-bold">
                TOKEN OUTPUT
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* RIGHTMOST: LIVE TOKEN STREAM */}
          {/* ---------------------------------------------------- */}
          <div className="hidden xl:flex flex-col items-center justify-between h-full w-[120px] p-2.5 rounded-xl border border-white/15 bg-slate-900/90 backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
            <div className="text-[9px] font-mono tracking-widest text-slate-300 uppercase text-center pb-1.5 border-b border-white/10 w-full font-bold">
              TOKEN STREAM
            </div>

            <div className="flex flex-col gap-1.5 w-full my-auto">
              {tokens.slice(0, activeTokens).map((tok, i) => (
                <div
                  key={i}
                  className={`px-2 py-1 rounded text-[11px] font-mono text-center font-bold tracking-wide transition-all ${
                    i === activeTokens - 1
                      ? "bg-cyan-400 text-slate-950 shadow-[0_0_12px_#22D3EE]"
                      : "bg-white/[0.06] border border-white/15 text-slate-200"
                  }`}
                >
                  {tok.text}
                </div>
              ))}
              <div className="w-1.5 h-3 bg-cyan-400 animate-pulse mx-auto rounded-xs" />
            </div>

            <div className="text-[8px] font-mono text-cyan-300 text-center font-bold">
              GENERATING...
            </div>
          </div>
        </motion.div>

        {/* ---------------------------------------------------- */}
        {/* BOTTOM: 5-STEP INTERACTIVE ARCHITECTURE TIMELINE */}
        {/* ---------------------------------------------------- */}
        <div className="relative z-20 w-full max-w-6xl mx-auto pt-2 pb-1 border-t border-white/10">
          <div className="grid grid-cols-5 gap-1.5 sm:gap-3 items-center">
            {[
              { num: "01", name: "TOKENIZE", detail: "Prompt Breakdown", stage: 1 },
              { num: "02", name: "COORD. INFERENCE", detail: "Layers 0 – 24", stage: 2 },
              { num: "03", name: "TRANSFER ACTIVATION", detail: "~ 5.1 KB Packet", stage: 3 },
              { num: "04", name: "WORKER INFERENCE", detail: "Layers 25 – 48", stage: 4 },
              { num: "05", name: "GENERATE TOKEN", detail: "Next-Token Loop", stage: 5 },
            ].map((step, idx) => {
              const isCurrent = activeStage === step.stage;
              const isDone = activeStage > step.stage;

              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center sm:items-start p-1.5 sm:p-2 rounded-lg border transition-all duration-300 ${
                    isCurrent
                      ? "border-cyan-400/70 bg-cyan-950/40 shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                      : isDone
                      ? "border-emerald-500/40 bg-emerald-950/20"
                      : "border-white/[0.06] bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className={`w-4 h-4 rounded-full text-[8px] font-mono flex items-center justify-center font-bold ${
                        isCurrent
                          ? "bg-cyan-400 text-slate-950 shadow-[0_0_8px_#22D3EE]"
                          : isDone
                          ? "bg-emerald-400 text-slate-950"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {step.num}
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] font-mono font-bold tracking-wider truncate ${
                        isCurrent ? "text-cyan-200" : isDone ? "text-slate-200" : "text-slate-400"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-slate-400 hidden sm:block truncate font-medium">
                    {step.detail}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
