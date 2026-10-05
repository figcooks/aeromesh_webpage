"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

/**
 * PipelineSection
 *
 * Clean, robust, beautifully styled Inference Pipeline:
 * - Left: Node A Coordinator (RTX 3050, Embeddings, Layers 0–24)
 * - Center: Activation Transfer (~5.1 KB per token with traveling glowing packets)
 * - Right: Node B Worker (RTX 4060, Layers 25–48, LM Head)
 * - Far Right: Live Token Stream
 * - Bottom: 5-Step Architecture Timeline
 *
 * Appears neatly in natural document flow with zero delay or scroll glitches.
 */
export default function PipelineSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
      id="pipeline-section"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#060B14] transition-colors duration-300 flex flex-col items-center justify-center select-none"
      aria-label="The Inference Pipeline Architecture"
    >
      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[160px] opacity-15 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(99,102,241,0.18) 45%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8">
        {/* Section Title & Subtitle */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-[1px] bg-cyan-400/70 inline-block" />
            <span className="text-xs font-mono tracking-[0.24em] text-cyan-300 font-bold uppercase">
              AEROMESH
            </span>
            <span className="w-5 h-[1px] bg-cyan-400/70 inline-block" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase leading-tight">
            THE INFERENCE <span className="text-cyan-300 text-cyan-glow">PIPELINE</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-1 font-medium">
            Split the model. Keep it local. Move only activations.
          </p>
        </div>

        {/* MAIN PIPELINE CONTAINER */}
        <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-6 p-4 sm:p-6 rounded-2xl border border-cyan-500/30 bg-[#0A101F]/90 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(34,211,238,0.12)]">
          {/* ---------------------------------------------------- */}
          {/* LEFT: NODE A (Coordinator) */}
          {/* ---------------------------------------------------- */}
          <div className="flex-1 rounded-xl border border-cyan-500/40 bg-slate-900/90 backdrop-blur-xl p-5 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] gap-5">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-mono font-bold text-white tracking-wider">
                    NODE A
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full border border-cyan-500/50 bg-cyan-950/70 text-[10px] font-mono text-cyan-200 font-bold">
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
              <div className="mt-4 p-2.5 rounded-lg border border-white/15 bg-white/[0.04] flex items-center justify-between">
                <span className="text-xs font-mono text-slate-100 font-bold">+ EMBEDDINGS</span>
                <span className="text-[10px] font-mono text-cyan-300 font-semibold">INPUT TOKENS</span>
              </div>

              {/* Model Layers 0 - 24 */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2 font-medium">
                  <span>LAYERS 0 – 24</span>
                  <span className="text-cyan-300 font-bold">24/24 ACTIVE</span>
                </div>

                <div className="space-y-2">
                  {[
                    { id: "01", active: true },
                    { id: "02", active: true },
                    { id: "03", active: true },
                    { id: "...", active: true },
                    { id: "24", active: true },
                  ].map((layer, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <span className="text-[10px] font-mono text-slate-400 w-5 font-bold">{layer.id}</span>
                      <div className="flex-1 h-3 rounded bg-slate-950 border border-white/10 overflow-hidden flex gap-0.5 p-0.5">
                        {[0, 1, 2, 3, 4].map((seg) => (
                          <div
                            key={seg}
                            className="flex-1 rounded-xs bg-gradient-to-r from-cyan-400 to-sky-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hardware GPU Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded border border-cyan-500/50 bg-cyan-950/60 flex items-center justify-center">
                  <svg className="w-4 h-4 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <circle cx="8" cy="12" r="2.5" />
                    <circle cx="16" cy="12" r="2.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white leading-tight">RTX 3050</div>
                  <div className="text-[10px] font-mono text-slate-300 leading-tight">8 GB VRAM</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-200 font-bold">
                PROMPT STAGE
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* CENTER: ACTIVATION TRANSFER STREAM */}
          {/* ---------------------------------------------------- */}
          <div className="flex flex-col items-center justify-between min-h-[220px] lg:min-h-[340px] px-3 py-2 flex-1 max-w-full lg:max-w-[320px]">
            {/* Top HUD Metric */}
            <div className="px-4 py-2 rounded-xl border border-cyan-500/50 bg-cyan-950/60 backdrop-blur-md text-center shadow-[0_0_20px_rgba(34,211,238,0.25)] w-full">
              <span className="text-[10px] font-mono tracking-widest text-cyan-200 uppercase block font-semibold">
                ACTIVATION TRANSFER
              </span>
              <span className="text-xl sm:text-2xl font-mono font-black text-cyan-300 text-cyan-glow">
                5.1 KB
              </span>
              <span className="text-[9px] font-mono text-slate-300 block font-bold">
                PER TOKEN
              </span>
            </div>

            {/* Central Animated Fiber Stream with Traveling 3D Cubes */}
            <div className="relative w-full h-24 flex items-center justify-center my-4">
              <div className="absolute inset-0 flex flex-col justify-center gap-1.5 opacity-80">
                <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 shadow-[0_0_10px_#22D3EE]" />
                <div className="h-[1px] w-full bg-gradient-to-r from-sky-400 via-cyan-400 to-purple-400 opacity-80" />
              </div>

              {/* Traveling Activation Packet */}
              <motion.div
                animate={{ x: [-110, 110] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                className="relative z-10 w-6 h-6 rounded bg-cyan-300 shadow-[0_0_20px_#22D3EE] rotate-45 flex items-center justify-center"
              >
                <div className="w-2.5 h-2.5 rounded bg-white" />
              </motion.div>
            </div>

            {/* Bottom HUD Telemetry */}
            <div className="px-4 py-2 rounded-xl border border-white/15 bg-slate-950/80 backdrop-blur-md text-center w-full">
              <span className="text-[10px] font-mono tracking-widest text-slate-200 uppercase block font-bold">
                ACTIVATIONS ONLY
              </span>
              <span className="text-[11px] font-mono text-cyan-300 font-bold block">
                ~1.5 – 16 KB · INT8 / FP16
              </span>
              <span className="text-[9px] font-mono text-slate-400 block font-semibold">
                TCP / SHARED MEMORY PIPELINE
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* RIGHT: NODE B (Worker) */}
          {/* ---------------------------------------------------- */}
          <div className="flex-1 rounded-xl border border-indigo-500/40 bg-slate-900/90 backdrop-blur-xl p-5 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] gap-5">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-mono font-bold text-white tracking-wider">
                    NODE B
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full border border-indigo-500/50 bg-indigo-950/70 text-[10px] font-mono text-indigo-200 font-bold">
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
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2 font-medium">
                  <span>LAYERS 25 – 48</span>
                  <span className="text-indigo-300 font-bold">24/24 ACTIVE</span>
                </div>

                <div className="space-y-2">
                  {[
                    { id: "25", active: true },
                    { id: "26", active: true },
                    { id: "27", active: true },
                    { id: "...", active: true },
                    { id: "48", active: true },
                  ].map((layer, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <span className="text-[10px] font-mono text-slate-400 w-5 font-bold">{layer.id}</span>
                      <div className="flex-1 h-3 rounded bg-slate-950 border border-white/10 overflow-hidden flex gap-0.5 p-0.5">
                        {[0, 1, 2, 3, 4].map((seg) => (
                          <div
                            key={seg}
                            className="flex-1 rounded-xs bg-gradient-to-r from-indigo-400 to-purple-400 shadow-[0_0_8px_rgba(99,102,241,0.7)]"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LM HEAD Box */}
              <div className="mt-4 p-2.5 rounded-lg border border-purple-500/40 bg-purple-950/30 flex items-center justify-between">
                <span className="text-xs font-mono text-purple-200 font-bold">LM HEAD</span>
                <div className="w-24 h-2.5 rounded bg-slate-950 overflow-hidden border border-white/10">
                  <div className="h-full w-full bg-gradient-to-r from-purple-400 to-cyan-300 rounded shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                </div>
              </div>
            </div>

            {/* Hardware GPU Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded border border-indigo-500/50 bg-indigo-950/60 flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <circle cx="8" cy="12" r="2.5" />
                    <circle cx="16" cy="12" r="2.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white leading-tight">RTX 4060</div>
                  <div className="text-[10px] font-mono text-slate-300 leading-tight">12 GB VRAM</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-indigo-950/70 border border-indigo-500/40 text-indigo-200 font-bold">
                TOKEN OUTPUT
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* RIGHTMOST: LIVE TOKEN STREAM */}
          {/* ---------------------------------------------------- */}
          <div className="flex flex-col items-center justify-between min-w-[130px] p-4 rounded-xl border border-white/15 bg-slate-900/90 backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
            <div className="text-[10px] font-mono tracking-widest text-slate-300 uppercase text-center pb-2 border-b border-white/10 w-full font-bold">
              TOKEN STREAM
            </div>

            <div className="flex flex-col gap-2 w-full my-auto py-3">
              {tokens.map((tok, i) => (
                <div
                  key={i}
                  className={`px-3 py-1.5 rounded text-xs font-mono text-center font-bold tracking-wide transition-all ${
                    tok.highlight
                      ? "bg-cyan-400 text-slate-950 shadow-[0_0_12px_#22D3EE]"
                      : "bg-white/[0.06] border border-white/15 text-slate-200"
                  }`}
                >
                  {tok.text}
                </div>
              ))}
              <div className="w-2 h-3.5 bg-cyan-400 animate-pulse mx-auto rounded-xs" />
            </div>

            <div className="text-[9px] font-mono text-cyan-300 text-center font-bold">
              GENERATING...
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* BOTTOM: 5-STEP INTERACTIVE ARCHITECTURE TIMELINE */}
        {/* ---------------------------------------------------- */}
        <div className="w-full pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-center">
            {[
              { num: "01", name: "TOKENIZE", detail: "Prompt Breakdown", active: true },
              { num: "02", name: "COORD. INFERENCE", detail: "Layers 0 – 24", active: true },
              { num: "03", name: "TRANSFER ACTIVATION", detail: "~ 5.1 KB Packet", active: true },
              { num: "04", name: "WORKER INFERENCE", detail: "Layers 25 – 48", active: true },
              { num: "05", name: "GENERATE TOKEN", detail: "Next-Token Loop", active: true },
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-start p-3 rounded-xl border border-cyan-400/50 bg-cyan-950/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-4 h-4 rounded-full text-[9px] font-mono flex items-center justify-center font-bold bg-cyan-400 text-slate-950 shadow-[0_0_8px_#22D3EE]">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-200 truncate">
                    {step.name}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 truncate font-medium">
                  {step.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
