"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, Circle, RotateCw, Activity } from "lucide-react";
import { useTheme } from "./ThemeContext";

/**
 * Section06SelectiveMesh
 *
 * SECTION 06 — THE MESH IS SELECTIVE
 *
 * "FAST PATHS SURVIVE.
 *  BAD PATHS DON’T."
 *
 * "AeroMESH uses viable, low-latency connections for distributed inference."
 *
 * Features:
 * - Standalone full-width section adhering to the site's layout & typography standards
 * - 2D horizontal network topology diagram across 5 nodes:
 *   - NODE 01: 12 ms, DIRECT (Cyan/Green)
 *   - NODE 02: 19 ms, DIRECT (Cyan/Green)
 *   - NODE 03: 24 ms, DIRECT (Cyan/Green)
 *   - NODE 04: 284 ms, REJECTED (Red/Rose)
 *   - NODE 05: OFFLINE (Muted Gray)
 * - Geometric node chassis icons (no 3D, no computers)
 * - Animated network probes traversing the topology:
 *   PROBE → NODE → RTT MEASURED → CONNECTION DECISION
 * - Editorial Statement: "THE FASTEST PATH BECOMES THE INFERENCE PATH."
 * - Full Dark / Light theme responsiveness & 100% text selectability
 */
export default function Section06SelectiveMesh() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Probe animation cycle state:
  // 0: Initializing probe
  // 1: Pinging healthy nodes (01 -> 02 -> 03)
  // 2: Pinging high-latency node 04 (evaluating RTT)
  // 3: Decision: Nodes 01-03 Approved, Node 04 Rejected, Node 05 Offline
  const [probeStep, setProbeStep] = useState(3);
  const [isSimulating, setIsSimulating] = useState(false);

  // Auto-play probe animation loop periodically
  useEffect(() => {
    const timer = setInterval(() => {
      runProbeSequence();
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const runProbeSequence = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setProbeStep(0);

    setTimeout(() => setProbeStep(1), 700);
    setTimeout(() => setProbeStep(2), 2200);
    setTimeout(() => {
      setProbeStep(3);
      setIsSimulating(false);
    }, 3800);
  };

  const nodes = [
    {
      id: "node-01",
      number: "01",
      name: "NODE 01",
      rtt: "12 ms",
      decision: "DIRECT",
      status: "direct",
      healthy: true,
      testedInStep: 1,
    },
    {
      id: "node-02",
      number: "02",
      name: "NODE 02",
      rtt: "19 ms",
      decision: "DIRECT",
      status: "direct",
      healthy: true,
      testedInStep: 1,
    },
    {
      id: "node-03",
      number: "03",
      name: "NODE 03",
      rtt: "24 ms",
      decision: "DIRECT",
      status: "direct",
      healthy: true,
      testedInStep: 1,
    },
    {
      id: "node-04",
      number: "04",
      name: "NODE 04",
      rtt: "284 ms",
      decision: "REJECTED",
      status: "rejected",
      healthy: false,
      testedInStep: 2,
    },
    {
      id: "node-05",
      number: "05",
      name: "NODE 05",
      rtt: "--",
      decision: "OFFLINE",
      status: "offline",
      healthy: false,
      testedInStep: 3,
    },
  ];

  return (
    <section
      id="selective-mesh"
      className={`relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 ${
        isDark ? "bg-[#060B14] text-white" : "bg-[#F8FAFC] text-slate-900"
      } transition-colors duration-300 flex flex-col items-center justify-center overflow-hidden`}
      aria-label="Section 06: The Mesh is Selective"
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
              06
            </span>
            <span
              className={`text-xs font-mono font-bold tracking-[0.2em] uppercase ${
                isDark ? "text-cyan-300" : "text-sky-700"
              }`}
            >
              THE MESH IS SELECTIVE
            </span>
          </div>

          {/* Main Heading (Two-tone) */}
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black tracking-tight uppercase leading-[1.1] max-w-4xl">
            <span className={`block ${isDark ? "text-white" : "text-slate-900"}`}>
              FAST PATHS SURVIVE.
            </span>
            <span
              className={`block mt-1 ${
                isDark ? "text-cyan-400 text-cyan-glow" : "text-sky-600 font-black"
              }`}
            >
              BAD PATHS DON’T.
            </span>
          </h2>

          {/* Subheading */}
          <p
            className={`text-xs sm:text-sm max-w-2xl mt-2 font-normal ${
              isDark ? "text-[#93A4C3]" : "text-slate-600"
            }`}
          >
            AeroMESH uses viable, low-latency connections for distributed inference.
          </p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 2D NETWORK TOPOLOGY DIAGRAM */}
        {/* ---------------------------------------------------- */}
        <div
          className={`relative w-full rounded-2xl p-5 sm:p-8 transition-all duration-300 ${
            isDark
              ? "bg-[#0A1224]/80 border border-cyan-500/25 shadow-[0_0_35px_rgba(0,0,0,0.5)]"
              : "bg-white/90 border border-slate-200/90 shadow-md"
          }`}
        >
          {/* Subtle diagram technical header bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/40 text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  probeStep < 3 ? "bg-amber-400 animate-pulse" : "bg-cyan-400"
                }`}
              />
              <span
                className={`uppercase tracking-wider font-semibold ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                DYNAMIC RTT PROBING · HIGH-SPEED MESH TOPOLOGY
              </span>
            </div>

            {/* Manual trigger / status indicator */}
            <button
              onClick={runProbeSequence}
              disabled={isSimulating}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono font-medium transition-all ${
                isSimulating
                  ? "opacity-60 cursor-not-allowed text-cyan-400 bg-cyan-950/30"
                  : isDark
                  ? "text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer"
                  : "text-slate-700 hover:text-sky-700 hover:bg-sky-50 border border-slate-300 cursor-pointer"
              }`}
              title="Re-run network probe sequence"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin text-cyan-400" : ""}`} />
              <span>{isSimulating ? "PROBING..." : "RE-PING MESH"}</span>
            </button>
          </div>

          {/* Horizontal Node Diagram Row with Shared SVG Bus */}
          <div className="relative py-4 sm:py-6">
            {/* Shared SVG Bus Behind Cards */}
            <svg
              className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none z-0 overflow-visible"
              height="40"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="cyan-bus-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="bad-bus-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.6" />
                  <stop offset="60%" stopColor="#F43F5E" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Base Bus Track (Dotted background) */}
              <line
                x1="5%"
                y1="20"
                x2="95%"
                y2="20"
                stroke={isDark ? "rgba(148, 163, 184, 0.15)" : "rgba(100, 116, 139, 0.2)"}
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Healthy Segment (Nodes 01 ➔ 02 ➔ 03) */}
              <line
                x1="10%"
                y1="20"
                x2="52%"
                y2="20"
                stroke="#22D3EE"
                strokeWidth="2.5"
                strokeDasharray="5 5"
                className={probeStep >= 1 ? "opacity-90" : "opacity-30"}
              />

              {/* Rejected Segment (Node 03 ➔ Node 04) */}
              <line
                x1="52%"
                y1="20"
                x2="72%"
                y2="20"
                stroke={probeStep >= 2 ? "#F43F5E" : "rgba(148, 163, 184, 0.3)"}
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className={probeStep >= 2 ? "opacity-90" : "opacity-40"}
              />

              {/* Offline Segment (Node 04 ➔ Node 05) */}
              <line
                x1="72%"
                y1="20"
                x2="90%"
                y2="20"
                stroke={isDark ? "#334155" : "#CBD5E1"}
                strokeWidth="1.5"
                strokeDasharray="2 4"
              />

              {/* Animated Probe Pulse Traveling Along The Healthy Track */}
              {probeStep >= 1 && (
                <motion.circle
                  r="5"
                  fill="#22D3EE"
                  className="filter drop-shadow-[0_0_8px_#22D3EE]"
                  initial={{ cx: "10%", cy: 20 }}
                  animate={{
                    cx: probeStep === 1 ? ["10%", "52%"] : ["10%", "52%", "72%"],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </svg>

            {/* 5 Node Cards Grid */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {nodes.map((node) => {
                return (
                  <div
                    key={node.id}
                    className={`flex flex-col items-center justify-between p-3.5 sm:p-4 rounded-xl transition-all duration-300 relative ${
                      node.status === "direct"
                        ? isDark
                          ? "bg-[#0A1628]/95 border border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,0.12)] hover:border-cyan-400"
                          : "bg-white border border-sky-300 shadow-sm hover:border-sky-500"
                        : node.status === "rejected"
                        ? isDark
                          ? "bg-[#180F16]/95 border border-rose-500/70 shadow-[0_0_20px_rgba(244,63,94,0.18)]"
                          : "bg-rose-50/90 border border-rose-300 shadow-sm"
                        : isDark
                        ? "bg-[#0A101C]/60 border border-slate-800/80 opacity-65"
                        : "bg-slate-100/70 border border-slate-200 opacity-65"
                    }`}
                  >
                    {/* Top indicator: Status Dot + Mini Geometric Server Chassis Icon */}
                    <div className="flex items-center gap-2 mb-2 w-full justify-between">
                      {/* Status Dot */}
                      <div className="flex items-center">
                        {node.status === "direct" && (
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
                          </span>
                        )}
                        {node.status === "rejected" && (
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-40" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                          </span>
                        )}
                        {node.status === "offline" && (
                          <span className="h-2.5 w-2.5 rounded-full border border-slate-500 bg-slate-700/60 inline-block" />
                        )}
                      </div>

                      {/* Geometric Node Chassis Icon */}
                      <svg
                        className={`w-5 h-4 sm:w-6 sm:h-5 transition-colors ${
                          node.status === "direct"
                            ? isDark
                              ? "text-cyan-400"
                              : "text-sky-600"
                            : node.status === "rejected"
                            ? "text-rose-500"
                            : "text-slate-500"
                        }`}
                        viewBox="0 0 24 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <rect x="2" y="2" width="20" height="7" rx="1.5" />
                        <line x1="6" y1="5.5" x2="14" y2="5.5" />
                        <circle cx="18" cy="5.5" r="1" fill="currentColor" />
                        <rect x="2" y="11" width="20" height="7" rx="1.5" />
                        <line x1="6" y1="14.5" x2="14" y2="14.5" />
                        <circle cx="18" cy="14.5" r="1" fill="currentColor" />
                      </svg>
                    </div>

                    {/* Node Name */}
                    <span
                      className={`font-mono text-xs font-semibold tracking-wider ${
                        node.status === "direct"
                          ? isDark
                            ? "text-slate-200"
                            : "text-slate-800"
                          : node.status === "rejected"
                          ? isDark
                            ? "text-rose-300"
                            : "text-rose-700"
                          : "text-slate-500"
                      }`}
                    >
                      {node.name}
                    </span>

                    {/* Latency RTT */}
                    <div className="my-2 text-center">
                      <span
                        className={`font-mono font-bold text-sm sm:text-base lg:text-lg tracking-tight ${
                          node.status === "direct"
                            ? isDark
                              ? "text-white"
                              : "text-slate-950"
                            : node.status === "rejected"
                            ? "text-rose-400 font-extrabold"
                            : "text-slate-500"
                        }`}
                      >
                        {node.rtt}
                      </span>
                    </div>

                    {/* Decision Tag */}
                    <div
                      className={`w-full py-1.5 px-2 rounded-md flex items-center justify-center gap-1 font-mono text-[10px] sm:text-[11px] font-bold tracking-wider ${
                        node.status === "direct"
                          ? isDark
                            ? "bg-cyan-950/60 text-cyan-300 border border-cyan-500/40"
                            : "bg-sky-100 text-sky-800 border border-sky-300"
                          : node.status === "rejected"
                          ? isDark
                            ? "bg-rose-950/70 text-rose-300 border border-rose-500/60"
                            : "bg-rose-100 text-rose-800 border border-rose-300"
                          : isDark
                          ? "bg-slate-900/60 text-slate-500 border border-slate-800"
                          : "bg-slate-200/80 text-slate-600 border border-slate-300"
                      }`}
                    >
                      {node.status === "direct" && (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>DIRECT</span>
                        </>
                      )}
                      {node.status === "rejected" && (
                        <>
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>REJECTED</span>
                        </>
                      )}
                      {node.status === "offline" && (
                        <>
                          <Circle className="w-2.5 h-2.5 stroke-[2]" />
                          <span>OFFLINE</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Network Probe Sequence Progression Indicator */}
          <div className="mt-6 pt-4 border-t border-slate-800/40 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
            <div className="flex items-center gap-2 text-slate-400">
              <span
                className={`px-2 py-0.5 rounded ${
                  probeStep >= 0
                    ? isDark
                      ? "bg-cyan-950/80 text-cyan-300 border border-cyan-500/30"
                      : "bg-sky-100 text-sky-800"
                    : "text-slate-500"
                }`}
              >
                PROBE
              </span>
              <span>→</span>
              <span
                className={`px-2 py-0.5 rounded ${
                  probeStep >= 1
                    ? isDark
                      ? "bg-cyan-950/80 text-cyan-300 border border-cyan-500/30"
                      : "bg-sky-100 text-sky-800"
                    : "text-slate-500"
                }`}
              >
                NODE
              </span>
              <span>→</span>
              <span
                className={`px-2 py-0.5 rounded ${
                  probeStep >= 2
                    ? isDark
                      ? "bg-cyan-950/80 text-cyan-300 border border-cyan-500/30"
                      : "bg-sky-100 text-sky-800"
                    : "text-slate-500"
                }`}
              >
                RTT MEASURED
              </span>
              <span>→</span>
              <span
                className={`px-2 py-0.5 rounded ${
                  probeStep >= 3
                    ? isDark
                      ? "bg-cyan-950/80 text-cyan-300 border border-cyan-500/30"
                      : "bg-sky-100 text-sky-800"
                    : "text-slate-500"
                }`}
              >
                DECISION
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>3 DIRECT PATHS</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>1 DROPPED</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                <span>1 OFFLINE</span>
              </span>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* EDITORIAL STATEMENT */}
        {/* ---------------------------------------------------- */}
        <div className="text-left">
          <p
            className={`font-mono text-xs sm:text-sm tracking-[0.16em] uppercase font-semibold leading-relaxed ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            “THE FASTEST PATH{" "}
            <span className={isDark ? "text-cyan-300" : "text-sky-600 font-bold"}>
              BECOMES THE INFERENCE PATH.
            </span>”
          </p>
        </div>
      </div>
    </section>
  );
}
