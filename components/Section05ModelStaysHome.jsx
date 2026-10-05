"use client";

import React from "react";
import { Lock, Shield, Database } from "lucide-react";
import IsometricDataCube from "./IsometricDataCube";

/**
 * Section05ModelStaysHome
 * SECTION 05 — THE MODEL STAYS HOME
 *
 * Implements:
 * - Header: [05] THE MODEL STAYS HOME / THE MODEL STAYS HOME. THE THINKING MOVES.
 * - Horizontal Architecture Visualization:
 *   - Node A (Coordinator) with local MODEL.GGUF stacked weights & 🔒 LOCAL
 *   - Activation Pipeline (~5.1 KB Per token, dashed line with traveling 3D isometric cubes)
 *   - Node B (Worker) with local MODEL.GGUF stacked weights & 🔒 LOCAL
 * - Right-Side Privacy Panel:
 *   - +-- PRIVACY BY DESIGN
 *   - Feature 01: MODEL WEIGHTS / NEVER LEAVE YOUR NODE
 *   - Feature 02: ONLY ACTIVATIONS MOVE / MINIMAL DATA TRANSFER
 *   - Feature 03: KEEP FULL CONTROL / RUN MODELS ON YOUR HARDWARE
 */
export default function Section05ModelStaysHome() {
  return (
    <section
      id="section-05-privacy"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#060B14] transition-colors duration-300 flex flex-col items-center justify-center select-none overflow-hidden"
      aria-label="Section 05: The Model Stays Home"
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
              <linearGradient id="sec5-grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.0" />
                <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Transverse Grid Lines */}
            <line x1="0" y1="20" x2="1200" y2="20" stroke="url(#sec5-grid-fade)" strokeWidth="0.8" />
            <line x1="0" y1="45" x2="1200" y2="45" stroke="url(#sec5-grid-fade)" strokeWidth="0.9" />
            <line x1="0" y1="75" x2="1200" y2="75" stroke="url(#sec5-grid-fade)" strokeWidth="1" />
            <line x1="0" y1="115" x2="1200" y2="115" stroke="url(#sec5-grid-fade)" strokeWidth="1.1" />
            <line x1="0" y1="165" x2="1200" y2="165" stroke="url(#sec5-grid-fade)" strokeWidth="1.2" />

            {/* Longitudinal Perspective Lines */}
            {[-600, -480, -360, -240, -140, -60, 0, 60, 140, 240, 360, 480, 600].map((offset, i) => (
              <line
                key={i}
                x1={600 + offset * 0.25}
                y1="0"
                x2={600 + offset * 1.3}
                y2="180"
                stroke="url(#sec5-grid-fade)"
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
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 mb-3">
            <span className="px-2 py-0.5 rounded border border-cyan-400/80 bg-cyan-950/40 text-cyan-300 font-mono text-[11px] font-bold tracking-wider shadow-[0_0_10px_rgba(34,211,238,0.25)]">
              05
            </span>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-cyan-300 uppercase">
              THE MODEL STAYS HOME
            </span>
          </div>

          {/* Main Heading (Two-tone) */}
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black tracking-tight uppercase leading-[1.1] max-w-4xl">
            <span className="text-white block">THE MODEL STAYS HOME.</span>
            <span className="text-cyan-400 text-cyan-glow block mt-1">THE THINKING MOVES.</span>
          </h2>

          {/* Subheading */}
          <p className="text-xs sm:text-sm text-[#93A4C3] max-w-2xl mt-2 font-normal">
            Every node keeps its model locally. AeroMESH moves activations, not weights.
          </p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* MAIN ARCHITECTURE & PRIVACY COMPOSITION */}
        {/* ---------------------------------------------------- */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* ==================================================== */}
          {/* LEFT & CENTER: HORIZONTAL DATA PIPELINE (Col span 8) */}
          {/* ==================================================== */}
          <div className="lg:col-span-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-3 w-full py-4">
            {/* -------------------------------------------------- */}
            {/* NODE A (COORDINATOR) */}
            {/* -------------------------------------------------- */}
            <div className="w-full sm:w-[190px] md:w-[200px] shrink-0 rounded-xl border border-cyan-500/40 bg-[#0B1528]/95 backdrop-blur-xl p-4 flex flex-col items-center justify-between gap-3 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
              {/* Node Title & Role */}
              <div className="text-center">
                <div className="text-xs sm:text-sm font-mono font-bold text-white tracking-wider">
                  NODE A
                </div>
                <div className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase mt-0.5">
                  COORDINATOR
                </div>
              </div>

              {/* Model Weights Representation */}
              <div className="w-full flex flex-col items-center bg-[#070D18] border border-cyan-500/25 rounded-lg p-3">
                {/* MODEL.GGUF Tag */}
                <div className="px-2.5 py-0.5 rounded border border-cyan-500/40 bg-cyan-950/50 text-[10px] sm:text-[11px] font-mono font-semibold text-cyan-300">
                  MODEL.GGUF
                </div>

                {/* Stacked Model Weight Bars */}
                <div className="w-full mt-3 flex flex-col gap-1.5 px-1">
                  {/* Top Bar (Darker Cyan/Navy) */}
                  <div className="h-3 w-full rounded-sm bg-cyan-800/60 border border-cyan-700/50" />
                  {/* Bottom Bar (Electric Bright Cyan with subtle glow) */}
                  <div className="h-3.5 w-full rounded-sm bg-gradient-to-r from-cyan-400 to-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
                </div>

                {/* Lock Indicator */}
                <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-cyan-500/20 w-full justify-center">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-wider">
                    LOCAL
                  </span>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------- */}
            {/* ACTIVATION FLOW PIPELINE (CENTER) */}
            {/* -------------------------------------------------- */}
            <div className="flex-1 w-full flex flex-col items-center justify-center px-1 py-4 md:py-0 relative">
              {/* Activation Metric Label */}
              <div className="text-center mb-3">
                <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider font-semibold block">
                  ACTIVATION
                </span>
                <span className="text-xl sm:text-2xl font-mono font-black text-cyan-400 text-cyan-glow tracking-tight block">
                  ~ 5.1 KB
                </span>
                <span className="text-[10px] font-mono text-slate-400 block">
                  Per token
                </span>
              </div>

              {/* Animated Dashed Transfer Pipeline with Traveling Isometric Cubes */}
              <div className="w-full relative flex items-center justify-center h-16 my-1">
                {/* SVG Connecting Dashed Arrow Line */}
                <svg
                  className="w-full h-8 overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <marker
                      id="arrow-right-cyan-v2"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 1 2 L 7 5 L 1 8 z" fill="#22D3EE" />
                    </marker>

                    <filter id="act-glow-v2" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Main Dashed Flow Line */}
                  <line
                    x1="4"
                    y1="16"
                    x2="98%"
                    y2="16"
                    stroke="#22D3EE"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                    markerEnd="url(#arrow-right-cyan-v2)"
                    filter="url(#act-glow-v2)"
                    className="opacity-95"
                  />

                  {/* Flowing Pulse Packet in SVG */}
                  <circle cy="16" r="3" fill="#67E8F9" filter="url(#act-glow-v2)">
                    <animate
                      attributeName="cx"
                      from="8"
                      to="96%"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.2;1;0.2"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>

                {/* 5 Isometric 3D Cyan Data Cubes Spaced Along the Line (As in Reference) */}
                <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-6 pointer-events-none">
                  {/* Cube 1: Diamond Packet */}
                  <div className="transform -translate-y-0.5">
                    <div className="w-2.5 h-2.5 rounded-xs bg-cyan-300 shadow-[0_0_8px_#22D3EE] rotate-45" />
                  </div>

                  {/* Cube 2: Small 3D Isometric Cube */}
                  <div className="transform -translate-y-0.5">
                    <IsometricDataCube size={18} variant="cyan" />
                  </div>

                  {/* Cube 3: Large 3D Isometric Cube (Center) */}
                  <div className="transform -translate-y-0.5 scale-110">
                    <IsometricDataCube size={24} variant="cyan" />
                  </div>

                  {/* Cube 4: Medium 3D Isometric Cube */}
                  <div className="transform -translate-y-0.5">
                    <IsometricDataCube size={20} variant="cyan" />
                  </div>

                  {/* Cube 5: Small Packet / Cube */}
                  <div className="transform -translate-y-0.5">
                    <IsometricDataCube size={16} variant="cyan" />
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------- */}
            {/* NODE B (WORKER) */}
            {/* -------------------------------------------------- */}
            <div className="w-full sm:w-[190px] md:w-[200px] shrink-0 rounded-xl border border-cyan-500/40 bg-[#0B1528]/95 backdrop-blur-xl p-4 flex flex-col items-center justify-between gap-3 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
              {/* Node Title & Role */}
              <div className="text-center">
                <div className="text-xs sm:text-sm font-mono font-bold text-white tracking-wider">
                  NODE B
                </div>
                <div className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase mt-0.5">
                  WORKER
                </div>
              </div>

              {/* Model Weights Representation */}
              <div className="w-full flex flex-col items-center bg-[#070D18] border border-cyan-500/25 rounded-lg p-3">
                {/* MODEL.GGUF Tag */}
                <div className="px-2.5 py-0.5 rounded border border-cyan-500/40 bg-cyan-950/50 text-[10px] sm:text-[11px] font-mono font-semibold text-cyan-300">
                  MODEL.GGUF
                </div>

                {/* Stacked Model Weight Bars */}
                <div className="w-full mt-3 flex flex-col gap-1.5 px-1">
                  {/* Top Bar (Darker Cyan/Navy) */}
                  <div className="h-3 w-full rounded-sm bg-cyan-800/60 border border-cyan-700/50" />
                  {/* Bottom Bar (Electric Bright Cyan with subtle glow) */}
                  <div className="h-3.5 w-full rounded-sm bg-gradient-to-r from-cyan-400 to-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
                </div>

                {/* Lock Indicator */}
                <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-cyan-500/20 w-full justify-center">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-wider">
                    LOCAL
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: PRIVACY BY DESIGN PANEL (Col span 4)  */}
          {/* ==================================================== */}
          <div className="lg:col-span-4 flex flex-col justify-center lg:pl-8 lg:border-l lg:border-cyan-500/30 pt-6 lg:pt-0 border-t border-cyan-500/20 lg:border-t-0">
            {/* Eyebrow with crosshair */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-cyan-400 font-mono text-xs font-bold tracking-wider">
                +--
              </span>
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-cyan-300 uppercase">
                PRIVACY BY DESIGN
              </span>
            </div>

            {/* 3 Vertically Stacked Feature Rows */}
            <div className="flex flex-col gap-6">
              {/* Feature 01: MODEL WEIGHTS NEVER LEAVE YOUR NODE */}
              <div className="group flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg border border-cyan-400/50 bg-[#0B1528] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.15)] group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.35)] transition-all">
                  <Lock className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wider uppercase">
                    MODEL WEIGHTS
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-[#93A4C3] uppercase tracking-wide mt-0.5">
                    NEVER LEAVE YOUR NODE
                  </span>
                </div>
              </div>

              {/* Feature 02: ONLY ACTIVATIONS MOVE MINIMAL DATA TRANSFER */}
              <div className="group flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg border border-cyan-400/50 bg-[#0B1528] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.15)] group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.35)] transition-all">
                  <Shield className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wider uppercase">
                    ONLY ACTIVATIONS MOVE
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-[#93A4C3] uppercase tracking-wide mt-0.5">
                    MINIMAL DATA TRANSFER
                  </span>
                </div>
              </div>

              {/* Feature 03: KEEP FULL CONTROL RUN MODELS ON YOUR HARDWARE */}
              <div className="group flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg border border-cyan-400/50 bg-[#0B1528] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.15)] group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.35)] transition-all">
                  <Database className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wider uppercase">
                    KEEP FULL CONTROL
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-[#93A4C3] uppercase tracking-wide mt-0.5">
                    RUN MODELS ON YOUR HARDWARE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Bottom Technical Separator */}
        <div className="w-full pt-8 mt-4 border-b border-cyan-500/25 relative">
          <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#22D3EE]" />
        </div>
      </div>
    </section>
  );
}
