"use client";

import React, { useState, useMemo } from "react";
import {
  Activity,
  Cpu,
  Zap,
  Plus,
  Minus,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useTheme } from "./ThemeContext";

const BENCHMARK_MODELS = {
  "llama-70b": {
    name: "Llama-3.3 70B (Q4_K_M)",
    totalVramRequired: "42.5 GB",
    activationPayload: "5.1 KB / hop",
    aeromeshSpeed: 31.4,
    legacyLanSpeed: 4.8,
    singleDiskSwapSpeed: 1.9,
    ttft: "64 ms",
    nodesUsed: "3x Consumer Nodes (16GB each)",
  },
  "deepseek-70b": {
    name: "DeepSeek-R1 Distill 70B",
    totalVramRequired: "43.0 GB",
    activationPayload: "5.1 KB / hop",
    aeromeshSpeed: 29.8,
    legacyLanSpeed: 4.4,
    singleDiskSwapSpeed: 1.7,
    ttft: "68 ms",
    nodesUsed: "3x Consumer Nodes (16GB each)",
  },
  "qwen-32b": {
    name: "Qwen-2.5 Coder 32B (FP16)",
    totalVramRequired: "64.0 GB",
    activationPayload: "4.0 KB / hop",
    aeromeshSpeed: 42.6,
    legacyLanSpeed: 6.2,
    singleDiskSwapSpeed: 2.3,
    ttft: "41 ms",
    nodesUsed: "4x Consumer Nodes (16GB each)",
  },
  "llama-405b": {
    name: "Llama-3.1 405B (Q4_K_M)",
    totalVramRequired: "230.0 GB",
    activationPayload: "16.3 KB / hop",
    aeromeshSpeed: 12.2,
    legacyLanSpeed: 0.9,
    singleDiskSwapSpeed: 0.2,
    ttft: "190 ms",
    nodesUsed: "6x Workstation/Mac Studio Nodes",
  },
};

const HARDWARE_PRESETS = [
  {
    id: "macbook-m3",
    name: "MacBook Pro M3 Max",
    backend: "Apple Metal",
    vram: 36,
    bwScore: 400,
    color: "#22D3EE",
  },
  {
    id: "rtx-4090",
    name: "Desktop RTX 4090",
    backend: "NVIDIA CUDA",
    vram: 24,
    bwScore: 1000,
    color: "#818CF8",
  },
  {
    id: "rtx-3070",
    name: "Gaming PC RTX 3070",
    backend: "NVIDIA CUDA",
    vram: 8,
    bwScore: 448,
    color: "#38BDF8",
  },
  {
    id: "mac-mini",
    name: "Mac Mini M2 Pro",
    backend: "Apple Metal",
    vram: 16,
    bwScore: 200,
    color: "#34D399",
  },
];

const SUPPORTED_FAMILIES = [
  { name: "Llama 3.1 / 3.2 / 3.3", sizes: "8B · 70B · 405B", status: "Verified" },
  { name: "DeepSeek R1 & V3", sizes: "14B · 32B · 70B · 671B", status: "Verified" },
  { name: "Qwen 2.5 & QwQ", sizes: "7B · 32B · 72B", status: "Verified" },
  { name: "Mistral & Mixtral MoE", sizes: "7B · 8x7B · 8x22B", status: "Verified" },
  { name: "Google Gemma 2", sizes: "9B · 27B", status: "Verified" },
  { name: "Microsoft Phi-4", sizes: "14B", status: "Verified" },
];

export default function Section07Benchmarks() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [selectedModel, setSelectedModel] = useState("llama-70b");
  const [counts, setCounts] = useState({
    "macbook-m3": 1,
    "rtx-4090": 1,
    "rtx-3070": 1,
    "mac-mini": 0,
  });

  const currentBench = BENCHMARK_MODELS[selectedModel];

  const updateCount = (id, delta) => {
    setCounts((prev) => {
      const next = Math.max(0, Math.min(6, (prev[id] || 0) + delta));
      const totalOther = Object.entries(prev).reduce(
        (acc, [k, v]) => (k === id ? acc : acc + v),
        0
      );
      if (next === 0 && totalOther === 0) return prev;
      return { ...prev, [id]: next };
    });
  };

  // Calculate live cluster metrics
  const clusterStats = useMemo(() => {
    let totalVram = 0;
    let totalNodes = 0;
    let weightedBw = 0;
    const segments = [];

    HARDWARE_PRESETS.forEach((hw) => {
      const count = counts[hw.id] || 0;
      if (count > 0) {
        const subVram = count * hw.vram;
        totalVram += subVram;
        totalNodes += count;
        weightedBw += count * hw.bwScore;
        segments.push({
          ...hw,
          count,
          subVram,
        });
      }
    });

    let maxModelLabel = "Llama-3 8B (FP16)";
    let estimatedTokSec = 58.4;

    if (totalVram >= 220) {
      maxModelLabel = "Llama-3.1 405B (Q4_K_M)";
      estimatedTokSec = 14.5;
    } else if (totalVram >= 90) {
      maxModelLabel = "Llama-3.3 70B (FP16 Unquantized)";
      estimatedTokSec = 26.8;
    } else if (totalVram >= 42) {
      maxModelLabel = "Llama-3.3 70B / DeepSeek-R1 70B (Q4)";
      estimatedTokSec = 32.4;
    } else if (totalVram >= 22) {
      maxModelLabel = "Qwen-2.5 32B / DeepSeek 32B (Q4)";
      estimatedTokSec = 46.2;
    }

    const speedAdjusted = (
      estimatedTokSec *
      (0.85 + Math.min(0.45, weightedBw / 4500))
    ).toFixed(1);

    return {
      totalVram,
      totalNodes,
      maxModelLabel,
      speedAdjusted,
      segments,
    };
  }, [counts]);

  return (
    <section
      id="benchmarks"
      className={`relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 ${
        isDark ? "bg-[#060B14] text-white" : "bg-[#F8FAFC] text-slate-900"
      } transition-colors duration-300 flex flex-col items-center justify-center overflow-hidden`}
      aria-label="Section 07: Telemetry & Benchmarks"
    >
      {/* Background Technical Grid and Ambient Perspective Floor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Ambient Cyan Radial Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] rounded-full blur-[170px] opacity-15 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(99,102,241,0.12) 50%, transparent 75%)",
          }}
        />

        {/* Technical Subtle Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.025)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
        {/* ---------------------------------------------------- */}
        {/* SECTION HEADER */}
        {/* ---------------------------------------------------- */}
        <div className="flex flex-col items-start text-left">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 mb-3">
            <span
              className={`px-2 py-0.5 rounded border font-mono text-[11px] font-bold tracking-wider ${
                isDark
                  ? "border-cyan-400/80 bg-cyan-950/40 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.25)]"
                  : "border-sky-400 bg-sky-50 text-sky-700 shadow-xs"
              }`}
            >
              07
            </span>
            <span
              className={`text-xs font-mono font-bold tracking-[0.2em] uppercase ${
                isDark ? "text-cyan-300" : "text-sky-700"
              }`}
            >
              TELEMETRY & BENCHMARKS
            </span>
          </div>

          {/* Main Heading (Two-tone) */}
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black tracking-tight uppercase leading-[1.1] max-w-4xl">
            <span className={`block ${isDark ? "text-white" : "text-slate-900"}`}>
              CONSUMER HARDWARE.
            </span>
            <span
              className={`block mt-1 ${
                isDark ? "text-cyan-400 text-cyan-glow" : "text-sky-600 font-black"
              }`}
            >
              DATACENTER THROUGHPUT.
            </span>
          </h2>

          {/* Subheading */}
          <p
            className={`text-xs sm:text-sm max-w-2xl mt-2 font-normal ${
              isDark ? "text-[#93A4C3]" : "text-slate-600"
            }`}
          >
            Because AeroMESH never transfers model weights over the network and streams micro-sized
            activations via gRPC, consumer LANs achieve near-linear scaling without NVLink or
            InfiniBand.
          </p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* PART 1: INTERACTIVE BENCHMARK COMPARISON CARD */}
        {/* ---------------------------------------------------- */}
        <div
          className={`rounded-2xl border p-6 sm:p-8 transition-all ${
            isDark
              ? "bg-[#0A1224]/85 border-cyan-500/25 shadow-[0_0_35px_rgba(0,0,0,0.5)]"
              : "bg-white/95 border-slate-200/90 shadow-md"
          }`}
        >
          {/* Model Selector Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-500/15">
            <div>
              <span
                className="font-mono text-xs uppercase tracking-wider block"
                style={{ color: isDark ? "#64748B" : "#64748B" }}
              >
                SELECT TARGET MODEL BENCHMARK
              </span>
              <h3
                className="text-xl sm:text-2xl font-bold tracking-tight uppercase mt-1"
                style={{ color: isDark ? "#F8FAFC" : "#0F172A" }}
              >
                {currentBench.name}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {Object.entries(BENCHMARK_MODELS).map(([key, model]) => {
                const active = selectedModel === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedModel(key)}
                    className="px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border"
                    style={{
                      background: active
                        ? isDark
                          ? "rgba(34, 211, 238, 0.15)"
                          : "rgba(2, 132, 199, 0.12)"
                        : isDark
                        ? "rgba(255, 255, 255, 0.03)"
                        : "rgba(15, 23, 42, 0.03)",
                      borderColor: active
                        ? isDark
                          ? "rgba(34, 211, 238, 0.5)"
                          : "rgba(2, 132, 199, 0.45)"
                        : isDark
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(15, 23, 42, 0.1)",
                      color: active
                        ? isDark
                          ? "#22D3EE"
                          : "#0284C7"
                        : isDark
                        ? "#94A3B8"
                        : "#475569",
                    }}
                  >
                    {model.name.split(" (")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Throughput Performance Bars */}
          <div className="py-6 space-y-6">
            {/* Bar 1: AeroMESH Zero-Weight Pipeline */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22D3EE]" />
                  <span
                    className="font-bold tracking-wide uppercase text-xs sm:text-sm"
                    style={{ color: isDark ? "#F8FAFC" : "#0F172A" }}
                  >
                    AeroMESH Zero-Weight Pipeline
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {(currentBench.aeromeshSpeed / currentBench.singleDiskSwapSpeed).toFixed(1)}x
                    Faster
                  </span>
                </div>
                <span className="font-mono text-base sm:text-lg font-bold text-cyan-400">
                  {currentBench.aeromeshSpeed} tok/s
                </span>
              </div>
              <div
                className="w-full h-3.5 rounded-full overflow-hidden p-0.5"
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.06)",
                }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(100, (currentBench.aeromeshSpeed / 48) * 100)}%`,
                    background: "linear-gradient(90deg, #22D3EE 0%, #38BDF8 55%, #10B981 100%)",
                    boxShadow: "0 0 18px rgba(34, 211, 238, 0.45)",
                  }}
                />
              </div>
            </div>

            {/* Bar 2: Legacy LAN All-Reduce */}
            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                <span style={{ color: isDark ? "#94A3B8" : "#475569" }}>
                  Traditional Tensor Parallel over Gigabit LAN (All-Reduce Bottleneck)
                </span>
                <span
                  className="font-mono font-semibold"
                  style={{ color: isDark ? "#94A3B8" : "#475569" }}
                >
                  {currentBench.legacyLanSpeed} tok/s
                </span>
              </div>
              <div
                className="w-full h-2.5 rounded-full overflow-hidden"
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.06)",
                }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700 bg-amber-500/70"
                  style={{
                    width: `${Math.max(6, (currentBench.legacyLanSpeed / 48) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Bar 3: Single GPU Disk Swap */}
            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                <span style={{ color: isDark ? "#64748B" : "#64748B" }}>
                  Single GPU with SSD / System RAM Swap Offload (PCIe Thrashing)
                </span>
                <span
                  className="font-mono font-semibold"
                  style={{ color: isDark ? "#64748B" : "#64748B" }}
                >
                  {currentBench.singleDiskSwapSpeed} tok/s
                </span>
              </div>
              <div
                className="w-full h-2.5 rounded-full overflow-hidden"
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.06)",
                }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700 bg-rose-500/65"
                  style={{
                    width: `${Math.max(4, (currentBench.singleDiskSwapSpeed / 48) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* 4 Telemetry Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-500/15">
            {[
              { label: "Pooled Footprint", value: currentBench.totalVramRequired, color: "#22D3EE" },
              {
                label: "Activation Payload",
                value: currentBench.activationPayload,
                color: "#818CF8",
              },
              { label: "Time To First Token", value: currentBench.ttft, color: "#10B981" },
              { label: "Weight Transfer", value: "0.0 MB", color: "#10B981" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-3.5 sm:p-4 rounded-xl border"
                style={{
                  background: isDark ? "rgba(6, 11, 20, 0.55)" : "rgba(248, 250, 252, 0.9)",
                  borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)",
                }}
              >
                <div
                  className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider"
                  style={{ color: isDark ? "#64748B" : "#64748B" }}
                >
                  {stat.label}
                </div>
                <div
                  className="font-mono text-lg sm:text-xl font-bold mt-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* PART 2: HARDWARE CAPACITY MESH CALCULATOR */}
        {/* ---------------------------------------------------- */}
        <div
          className={`rounded-2xl border p-6 sm:p-8 transition-all ${
            isDark
              ? "bg-[#0A1224]/85 border-cyan-500/25 shadow-[0_0_35px_rgba(0,0,0,0.5)]"
              : "bg-white/95 border-slate-200/90 shadow-md"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                INTERACTIVE CLUSTER SIMULATOR
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold tracking-tight uppercase"
                style={{ color: isDark ? "#F8FAFC" : "#0F172A" }}
              >
                Calculate Your Hardware Mesh Capacity
              </h3>
            </div>
            <p
              className="text-xs sm:text-sm max-w-md font-normal"
              style={{ color: isDark ? "#94A3B8" : "#475569" }}
            >
              Add the laptops, desktops, or workstations you already own to see how AeroMESH
              partitions transformer layers across your pooled memory.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Hardware Picker Controls */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {HARDWARE_PRESETS.map((hw) => {
                const count = counts[hw.id] || 0;
                return (
                  <div
                    key={hw.id}
                    className="p-4 rounded-xl border transition-all"
                    style={{
                      background:
                        count > 0
                          ? isDark
                            ? "rgba(30, 41, 59, 0.65)"
                            : "rgba(255, 255, 255, 0.95)"
                          : isDark
                          ? "rgba(15, 23, 42, 0.35)"
                          : "rgba(255, 255, 255, 0.5)",
                      borderColor:
                        count > 0
                          ? `${hw.color}55`
                          : isDark
                          ? "rgba(255,255,255,0.07)"
                          : "rgba(15,23,42,0.08)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full font-bold"
                        style={{
                          background: `${hw.color}20`,
                          color: hw.color,
                        }}
                      >
                        {hw.backend}
                      </span>
                      <span
                        className="font-mono text-xs font-bold"
                        style={{ color: isDark ? "#CBD5E1" : "#334155" }}
                      >
                        {hw.vram} GB / node
                      </span>
                    </div>

                    <div
                      className="font-bold text-sm sm:text-base mb-3"
                      style={{ color: isDark ? "#F8FAFC" : "#0F172A" }}
                    >
                      {hw.name}
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-xs"
                        style={{ color: isDark ? "#64748B" : "#64748B" }}
                      >
                        Subtotal: <strong style={{ color: hw.color }}>{count * hw.vram} GB</strong>
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateCount(hw.id, -1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center border transition-colors cursor-pointer"
                          style={{
                            borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.15)",
                            color: isDark ? "#E2E8F0" : "#0F172A",
                          }}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span
                          className="w-6 text-center font-mono text-sm font-bold"
                          style={{ color: isDark ? "#F8FAFC" : "#0F172A" }}
                        >
                          {count}
                        </span>
                        <button
                          onClick={() => updateCount(hw.id, 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center border transition-colors cursor-pointer"
                          style={{
                            background: `${hw.color}20`,
                            borderColor: `${hw.color}50`,
                            color: hw.color,
                          }}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Pooled Output Panel */}
            <div
              className="lg:col-span-5 p-6 rounded-xl border flex flex-col justify-between space-y-5"
              style={{
                background: isDark ? "rgba(6, 11, 20, 0.85)" : "#0F172A",
                borderColor: "rgba(34, 211, 238, 0.3)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                    Total Pooled Cluster Memory
                  </div>
                  <div className="font-black text-3xl sm:text-4xl text-white mt-1">
                    {clusterStats.totalVram}{" "}
                    <span className="text-base sm:text-lg font-mono text-cyan-400">GB VRAM</span>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-[11px] text-slate-400 uppercase">Active Nodes</div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400">
                    {clusterStats.totalNodes} Nodes
                  </div>
                </div>
              </div>

              {/* Dynamic Proportional Layer Split Bar */}
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 mb-2">
                  <span>DYNAMIC LAYER PARTITIONING</span>
                  <span>80 / 80 LAYERS</span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden flex gap-1 bg-slate-800 p-0.5">
                  {clusterStats.segments.map((seg) => (
                    <div
                      key={seg.id}
                      className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500"
                      style={{
                        width: `${(seg.subVram / clusterStats.totalVram) * 100}%`,
                        backgroundColor: seg.color,
                      }}
                      title={`${seg.name}: ${seg.subVram} GB`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2.5 mt-2">
                  {clusterStats.segments.map((seg) => (
                    <span
                      key={seg.id}
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-300"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: seg.color }}
                      />
                      {seg.count}x {seg.name.split(" ")[0]} (
                      {Math.round((seg.subVram / clusterStats.totalVram) * 100)}% layers)
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="font-mono text-[10px] text-slate-400 uppercase">
                    Unlocked Model Class
                  </div>
                  <div className="font-semibold text-xs sm:text-sm text-cyan-300 mt-0.5 truncate">
                    {clusterStats.maxModelLabel}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="font-mono text-[10px] text-slate-400 uppercase">
                    Est. Cluster Speed
                  </div>
                  <div className="font-mono text-base sm:text-lg font-bold text-emerald-400 mt-0.5">
                    ~{clusterStats.speedAdjusted} tok/s
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* PART 3: ARCHITECTURE COMPATIBILITY MATRIX */}
        {/* ---------------------------------------------------- */}
        <div>
          <div className="text-center mb-6">
            <span
              className="font-mono text-xs uppercase tracking-widest font-semibold"
              style={{ color: isDark ? "#64748B" : "#64748B" }}
            >
              DAY-ZERO ARCHITECTURE SUPPORT · GGUF / SAFETENSORS / AWQ
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {SUPPORTED_FAMILIES.map((fam, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border text-center transition-all hover:-translate-y-0.5"
                style={{
                  background: isDark ? "rgba(15, 23, 42, 0.5)" : "rgba(255, 255, 255, 0.85)",
                  borderColor: isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(15, 23, 42, 0.08)",
                }}
              >
                <div className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 mb-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {fam.status}
                </div>
                <div
                  className="font-bold text-xs sm:text-sm"
                  style={{ color: isDark ? "#F8FAFC" : "#0F172A" }}
                >
                  {fam.name}
                </div>
                <div
                  className="font-mono text-[10.5px] mt-0.5"
                  style={{ color: isDark ? "#64748B" : "#64748B" }}
                >
                  {fam.sizes}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
