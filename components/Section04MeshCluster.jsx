"use client";

import React, { useState, useEffect } from "react";
import { Monitor, Share2, Boxes } from "lucide-react";
import IsometricDataCube from "./IsometricDataCube";

/**
 * Section04MeshCluster
 * SECTION 04 — ONE SYSTEM. MANY NODES.
 *
 * Implements:
 * - Header: [04] ONE SYSTEM. MANY NODES / YOUR HARDWARE BECOMES THE CLUSTER.
 * - Left Panel: AEROMESH MESH status panel with live metrics.
 * - Center: Distributed Node Topology (Coordinator + Node 01, 02, 03, 04) with curved SVG lines and 3D data cubes.
 * - Right Column: +-- SCALE YOUR INFERENCE, stacked headline, and capability list.
 * - Technical perspective grid floor and border styling.
 */
export default function Section04MeshCluster() {
  // Live subtle simulation for dashboard metrics
  const [metrics, setMetrics] = useState({
    nodes: "04",
    active: "03",
    directLinks: "03",
    avgRtt: 14,
    weightTransfer: "0.0 MB",
    tokensSec: 187,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        avgRtt: 14 + (Math.random() > 0.65 ? 1 : Math.random() > 0.35 ? 0 : -1),
        tokensSec: 187 + (Math.random() > 0.5 ? 1 : Math.random() > 0.2 ? -1 : 0),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="section-04-cluster"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#060B14] transition-colors duration-300 flex flex-col items-center justify-center select-none overflow-hidden"
      aria-label="Section 04: One System. Many Nodes."
    >
      {/* Background Technical Grid and Ambient Perspective Floor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Ambient Cyan Radial Glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full blur-[180px] opacity-15 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(99,102,241,0.15) 50%, transparent 75%)",
          }}
        />

        {/* Technical Subtle Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.025)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

        {/* SVG Perspective Grid Floor (Bottom Layer) */}
        <div className="absolute bottom-0 left-0 right-0 h-44 overflow-hidden pointer-events-none opacity-25">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 180"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sec4-grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.0" />
                <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Transverse Grid Lines with Perspective Spacing */}
            <line x1="0" y1="20" x2="1200" y2="20" stroke="url(#sec4-grid-fade)" strokeWidth="0.8" />
            <line x1="0" y1="45" x2="1200" y2="45" stroke="url(#sec4-grid-fade)" strokeWidth="0.9" />
            <line x1="0" y1="75" x2="1200" y2="75" stroke="url(#sec4-grid-fade)" strokeWidth="1" />
            <line x1="0" y1="115" x2="1200" y2="115" stroke="url(#sec4-grid-fade)" strokeWidth="1.1" />
            <line x1="0" y1="165" x2="1200" y2="165" stroke="url(#sec4-grid-fade)" strokeWidth="1.2" />

            {/* Longitudinal Perspective Lines Converging to Center Horizon */}
            {[-600, -480, -360, -240, -140, -60, 0, 60, 140, 240, 360, 480, 600].map((offset, i) => (
              <line
                key={i}
                x1={600 + offset * 0.25}
                y1="0"
                x2={600 + offset * 1.3}
                y2="180"
                stroke="url(#sec4-grid-fade)"
                strokeWidth="0.9"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
        {/* ---------------------------------------------------- */}
        {/* SECTION HEADER */}
        {/* ---------------------------------------------------- */}
        <div className="flex flex-col items-start text-left">
          {/* Section badge / eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-3">
            <span className="px-2 py-0.5 rounded border border-cyan-400/80 bg-cyan-950/40 text-cyan-300 font-mono text-[11px] font-bold tracking-wider shadow-[0_0_10px_rgba(34,211,238,0.25)]">
              04
            </span>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-cyan-300 uppercase">
              ONE SYSTEM. MANY NODES
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black tracking-tight text-white uppercase leading-[1.1] max-w-4xl">
            YOUR HARDWARE BECOMES THE CLUSTER.
          </h2>

          {/* Subheading */}
          <p className="text-xs sm:text-sm text-[#93A4C3] max-w-2xl mt-2 font-normal">
            Turn heterogeneous consumer hardware into a coordinated inference mesh.
          </p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 3-PART MAIN COMPOSITION */}
        {/* ---------------------------------------------------- */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* ==================================================== */}
          {/* LEFT COLUMN: AEROMESH MESH STATUS PANEL (Col span 3) */}
          {/* ==================================================== */}
          <div className="lg:col-span-3 flex flex-col justify-start">
            <div className="w-full rounded-xl border border-cyan-500/40 bg-[#0B1528]/85 backdrop-blur-xl p-5 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.7),0_0_20px_rgba(34,211,238,0.08)] flex flex-col">
              {/* Card Title */}
              <div className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase pb-3 border-b border-cyan-500/20">
                AEROMESH MESH
              </div>

              {/* Metric Rows */}
              <div className="flex flex-col divide-y divide-cyan-500/15">
                {/* Row 1: NODES */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    NODES
                  </span>
                  <span className="text-sm sm:text-base font-mono font-bold text-cyan-300">
                    {metrics.nodes}
                  </span>
                </div>

                {/* Row 2: ACTIVE */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    ACTIVE
                  </span>
                  <span className="text-sm sm:text-base font-mono font-bold text-cyan-300">
                    {metrics.active}
                  </span>
                </div>

                {/* Row 3: DIRECT LINKS */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    DIRECT LINKS
                  </span>
                  <span className="text-sm sm:text-base font-mono font-bold text-cyan-300">
                    {metrics.directLinks}
                  </span>
                </div>

                {/* Row 4: AVG RTT */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    AVG RTT
                  </span>
                  <span className="text-sm sm:text-base font-mono font-bold text-cyan-300 tabular-nums">
                    {metrics.avgRtt} ms
                  </span>
                </div>

                {/* Row 5: WEIGHT TRANSFER */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    WEIGHT TRANSFER
                  </span>
                  <span className="text-sm sm:text-base font-mono font-bold text-cyan-300">
                    {metrics.weightTransfer}
                  </span>
                </div>

                {/* Row 6: TOKENS / SEC */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    TOKENS / SEC
                  </span>
                  <span className="text-sm sm:text-base font-mono font-bold text-cyan-300 tabular-nums">
                    {metrics.tokensSec}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================== */}
          {/* CENTER: DISTRIBUTED NODE TOPOLOGY (Col span 6) */}
          {/* ==================================================== */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[380px] sm:min-h-[420px] w-full">
            <div className="relative w-full max-w-[560px] h-[380px] sm:h-[400px] flex items-center justify-center select-none">
              {/* SVG Curved Connections & Traveling Packets Overlay */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 560 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Cyan Glow Filter */}
                  <filter id="mesh-cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  {/* Secondary Purple Glow Filter */}
                  <filter id="mesh-purple-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* 1. NODE 01 -> COORDINATOR CURVED PATH */}
                <path
                  id="path-node-01"
                  d="M 156,76 C 195,76 195,140 203,175"
                  stroke="#22D3EE"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  className="opacity-90"
                  filter="url(#mesh-cyan-glow)"
                />

                {/* 2. NODE 02 -> COORDINATOR CURVED PATH */}
                <path
                  id="path-node-02"
                  d="M 404,76 C 365,76 365,140 357,175"
                  stroke="#22D3EE"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  className="opacity-90"
                  filter="url(#mesh-cyan-glow)"
                />

                {/* 3. NODE 03 -> COORDINATOR CURVED PATH */}
                <path
                  id="path-node-03"
                  d="M 156,324 C 195,324 195,260 203,225"
                  stroke="#22D3EE"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  className="opacity-90"
                  filter="url(#mesh-cyan-glow)"
                />

                {/* 4. NODE 04 -> COORDINATOR (STANDBY / SECONDARY PATH) */}
                <path
                  id="path-node-04"
                  d="M 404,324 C 365,324 365,260 357,225"
                  stroke="#818CF8"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  className="opacity-60"
                  filter="url(#mesh-purple-glow)"
                />

                {/* Connection Anchor Dots on Node Cards */}
                <circle cx="156" cy="76" r="3.5" fill="#22D3EE" filter="url(#mesh-cyan-glow)" />
                <circle cx="404" cy="76" r="3.5" fill="#22D3EE" filter="url(#mesh-cyan-glow)" />
                <circle cx="156" cy="324" r="3.5" fill="#22D3EE" filter="url(#mesh-cyan-glow)" />
                <circle cx="404" cy="324" r="3" fill="#A855F7" />

                {/* Connection Anchor Ports on Coordinator (Side Tabs) */}
                <rect
                  x="199"
                  y="171"
                  width="8"
                  height="8"
                  rx="1.5"
                  fill="#22D3EE"
                  filter="url(#mesh-cyan-glow)"
                />
                <rect
                  x="353"
                  y="171"
                  width="8"
                  height="8"
                  rx="1.5"
                  fill="#22D3EE"
                  filter="url(#mesh-cyan-glow)"
                />
                <rect
                  x="199"
                  y="221"
                  width="8"
                  height="8"
                  rx="1.5"
                  fill="#22D3EE"
                  filter="url(#mesh-cyan-glow)"
                />
                <rect
                  x="353"
                  y="221"
                  width="8"
                  height="8"
                  rx="1.5"
                  fill="#818CF8"
                  filter="url(#mesh-purple-glow)"
                />

                {/* Traveling Packet Pulses in SVG */}
                {/* Packet 1: Node 01 to Coordinator */}
                <g>
                  <circle r="3" fill="#67E8F9" filter="url(#mesh-cyan-glow)">
                    <animate
                      attributeName="opacity"
                      values="0.2;1;0.2"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <animateMotion
                    path="M 156,76 C 195,76 195,140 203,175"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </g>

                {/* Packet 2: Node 02 to Coordinator */}
                <g>
                  <circle r="3" fill="#67E8F9" filter="url(#mesh-cyan-glow)">
                    <animate
                      attributeName="opacity"
                      values="0.3;1;0.3"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <animateMotion
                    path="M 404,76 C 365,76 365,140 357,175"
                    dur="3.6s"
                    repeatCount="indefinite"
                  />
                </g>

                {/* Packet 3: Node 03 to Coordinator */}
                <g>
                  <circle r="3" fill="#67E8F9" filter="url(#mesh-cyan-glow)">
                    <animate
                      attributeName="opacity"
                      values="0.2;1;0.2"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <animateMotion
                    path="M 156,324 C 195,324 195,260 203,225"
                    dur="4.0s"
                    repeatCount="indefinite"
                  />
                </g>
              </svg>

              {/* -------------------------------------------------- */}
              {/* STATIC 3D ISOMETRIC DATA CUBES (As in Reference) */}
              {/* -------------------------------------------------- */}
              {/* Cube 1: Along Node 01 -> Coordinator line */}
              <div
                className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: "32%", top: "27%" }}
                aria-hidden="true"
              >
                <IsometricDataCube size={20} variant="cyan" />
              </div>

              {/* Cube 2: Along Node 02 -> Coordinator line */}
              <div
                className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: "68%", top: "27%" }}
                aria-hidden="true"
              >
                <IsometricDataCube size={20} variant="cyan" />
              </div>

              {/* Cube 3: Along Node 03 -> Coordinator line */}
              <div
                className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: "33%", top: "73%" }}
                aria-hidden="true"
              >
                <div className="w-2.5 h-2.5 rounded-xs bg-cyan-300 shadow-[0_0_10px_#22D3EE] rotate-45" />
              </div>

              {/* Cube 4: Along Node 04 -> Coordinator line (standby purple) */}
              <div
                className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: "67%", top: "73%" }}
                aria-hidden="true"
              >
                <IsometricDataCube size={18} variant="purple" />
              </div>

              {/* -------------------------------------------------- */}
              {/* CENTRAL COORDINATOR NODE */}
              {/* -------------------------------------------------- */}
              <div
                className="absolute z-20 w-[145px] sm:w-[155px] h-[85px] sm:h-[90px] rounded-xl border border-cyan-400 bg-[#0B1528] shadow-[0_0_25px_rgba(34,211,238,0.3),inset_0_0_15px_rgba(34,211,238,0.12)] flex flex-col items-center justify-center p-2 text-center transition-all duration-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.5)]"
                style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
              >
                {/* Server blade rack icon with 3 horizontal bays + LED dots */}
                <div className="mb-1.5 flex items-center justify-center">
                  <div className="w-6 h-5 rounded border border-cyan-400/80 bg-cyan-950/60 p-0.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between px-0.5">
                      <span className="w-3 h-[1px] bg-cyan-300" />
                      <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#22D3EE]" />
                    </div>
                    <div className="flex items-center justify-between px-0.5">
                      <span className="w-3 h-[1px] bg-cyan-300" />
                      <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#22D3EE]" />
                    </div>
                    <div className="flex items-center justify-between px-0.5">
                      <span className="w-3 h-[1px] bg-cyan-300" />
                      <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#22D3EE]" />
                    </div>
                  </div>
                </div>

                {/* Coordinator Title */}
                <span className="text-[11px] sm:text-xs font-mono font-bold text-white tracking-wider uppercase">
                  COORDINATOR
                </span>

                {/* Coordinator Layers */}
                <span className="text-[10px] sm:text-[11px] font-mono text-cyan-300 font-semibold mt-0.5">
                  Layer 0 - 24
                </span>
              </div>

              {/* -------------------------------------------------- */}
              {/* NODE 01 (TOP LEFT) */}
              {/* -------------------------------------------------- */}
              <div
                className="absolute z-20 w-[130px] sm:w-[145px] rounded-xl border border-cyan-500/40 bg-[#0B1528]/95 backdrop-blur-md p-3 shadow-[0_0_15px_rgba(34,211,238,0.12)] flex flex-col gap-1 transition-all duration-200 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                style={{ left: "2%", top: "4%" }}
              >
                {/* Header: Status check & Node title */}
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
                  </span>
                  <span className="text-[11px] font-mono font-bold text-white tracking-wider">
                    NODE 01
                  </span>
                </div>

                {/* GPU Info */}
                <div className="text-[11px] font-mono text-slate-200 font-medium mt-1">
                  RTX 3090
                </div>
                <div className="text-[10px] font-mono text-slate-400 font-normal">
                  24 GB
                </div>

                {/* Status Row */}
                <div className="flex items-center justify-between pt-1 mt-1 border-t border-white/5">
                  <Monitor className="w-3 h-3 text-cyan-400" />
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* -------------------------------------------------- */}
              {/* NODE 02 (TOP RIGHT) */}
              {/* -------------------------------------------------- */}
              <div
                className="absolute z-20 w-[130px] sm:w-[145px] rounded-xl border border-cyan-500/40 bg-[#0B1528]/95 backdrop-blur-md p-3 shadow-[0_0_15px_rgba(34,211,238,0.12)] flex flex-col gap-1 transition-all duration-200 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                style={{ right: "2%", top: "4%" }}
              >
                {/* Header: Status check & Node title */}
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
                  </span>
                  <span className="text-[11px] font-mono font-bold text-white tracking-wider">
                    NODE 02
                  </span>
                </div>

                {/* GPU Info */}
                <div className="text-[11px] font-mono text-slate-200 font-medium mt-1">
                  RTX 4060
                </div>
                <div className="text-[10px] font-mono text-slate-400 font-normal">
                  12 GB
                </div>

                {/* Status Row */}
                <div className="flex items-center justify-between pt-1 mt-1 border-t border-white/5">
                  <Monitor className="w-3 h-3 text-cyan-400" />
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* -------------------------------------------------- */}
              {/* NODE 03 (BOTTOM LEFT) */}
              {/* -------------------------------------------------- */}
              <div
                className="absolute z-20 w-[130px] sm:w-[145px] rounded-xl border border-cyan-500/40 bg-[#0B1528]/95 backdrop-blur-md p-3 shadow-[0_0_15px_rgba(34,211,238,0.12)] flex flex-col gap-1 transition-all duration-200 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                style={{ left: "2%", bottom: "4%" }}
              >
                {/* Header: Status check & Node title */}
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
                  </span>
                  <span className="text-[11px] font-mono font-bold text-white tracking-wider">
                    NODE 03
                  </span>
                </div>

                {/* GPU Info */}
                <div className="text-[11px] font-mono text-slate-200 font-medium mt-1">
                  RTX 3060
                </div>
                <div className="text-[10px] font-mono text-slate-400 font-normal">
                  12 GB
                </div>

                {/* Status Row */}
                <div className="flex items-center justify-between pt-1 mt-1 border-t border-white/5">
                  <Monitor className="w-3 h-3 text-cyan-400" />
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* -------------------------------------------------- */}
              {/* NODE 04 (BOTTOM RIGHT - STANDBY) */}
              {/* -------------------------------------------------- */}
              <div
                className="absolute z-20 w-[130px] sm:w-[145px] rounded-xl border border-rose-500/30 bg-[#140D1B]/90 backdrop-blur-md p-3 opacity-80 flex flex-col gap-1 transition-all duration-200 hover:opacity-100"
                style={{ right: "2%", bottom: "4%" }}
              >
                {/* Header: Status check & Node title */}
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500/20 border border-rose-400/60 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-300 tracking-wider">
                    NODE 04
                  </span>
                </div>

                {/* Standby Placeholder */}
                <div className="text-[11px] font-mono text-slate-500 font-medium mt-1">
                  --
                </div>
                <div className="text-[10px] font-mono text-slate-600 font-normal">
                  --
                </div>

                {/* Status Row */}
                <div className="flex items-center justify-between pt-1 mt-1 border-t border-white/5">
                  <Monitor className="w-3 h-3 text-rose-400/60" />
                  <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider">
                    STANDBY
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: SCALE YOUR INFERENCE (Col span 3) */}
          {/* ==================================================== */}
          <div className="lg:col-span-3 flex flex-col justify-between lg:pl-6 lg:border-l lg:border-cyan-500/30 pt-6 lg:pt-0 border-t border-cyan-500/20 lg:border-t-0">
            <div>
              {/* Eyebrow with crosshair */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-cyan-400 font-mono text-xs font-bold tracking-wider">
                  +--
                </span>
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-cyan-300 uppercase">
                  SCALE YOUR INFERENCE
                </span>
              </div>

              {/* Large Stacked Heading */}
              <div className="font-sans font-black tracking-tight leading-[1.05] text-3xl sm:text-4xl uppercase mb-8">
                <div className="text-white">MANY</div>
                <div className="text-white">MACHINES.</div>
                <div className="text-cyan-400 text-cyan-glow">ONE</div>
                <div className="text-cyan-400 text-cyan-glow">INFERENCE</div>
                <div className="text-cyan-400 text-cyan-glow">ENGINE.</div>
              </div>
            </div>

            {/* Capability Rows */}
            <div className="flex flex-col gap-4">
              {/* Item 1 */}
              <div className="group flex items-center gap-3.5 p-2 rounded-lg transition-colors duration-200 hover:bg-cyan-950/20">
                <div className="w-10 h-10 rounded-lg border border-cyan-400/50 bg-[#0B1528] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.15)] group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
                  <Share2 className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
                    WORKS WITH
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                    CONSUMER GPUS
                  </span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="group flex items-center gap-3.5 p-2 rounded-lg transition-colors duration-200 hover:bg-cyan-950/20">
                <div className="w-10 h-10 rounded-lg border border-cyan-400/50 bg-[#0B1528] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.15)] group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
                  <Monitor className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
                    HETEROGENEOUS
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                    HARDWARE SUPPORT
                  </span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="group flex items-center gap-3.5 p-2 rounded-lg transition-colors duration-200 hover:bg-cyan-950/20">
                <div className="w-10 h-10 rounded-lg border border-cyan-400/50 bg-[#0B1528] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.15)] group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
                  <Boxes className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
                    COORDINATED
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                    DISTRIBUTED INFERENCE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Bottom Technical Separator with Cyan Accent */}
        <div className="w-full pt-8 mt-4 border-b border-cyan-500/25 relative">
          <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#22D3EE]" />
        </div>
      </div>
    </section>
  );
}
