"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowUp,
  Sparkles,
  X,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function Section08Footer() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hardwareMix, setHardwareMix] = useState("Apple Silicon + CUDA Mix");
  const [submitted, setSubmitted] = useState(false);

  // Allow any button across the site to open this modal via custom event
  useEffect(() => {
    const handleOpen = () => setIsModalOpen(true);
    window.addEventListener("open-aeromesh-modal", handleOpen);
    return () => window.removeEventListener("open-aeromesh-modal", handleOpen);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`relative w-full pt-16 sm:pt-24 pb-12 overflow-hidden border-t transition-colors duration-300 ${
        isDark ? "bg-[#050911] border-slate-800/80" : "bg-[#F1F5F9] border-slate-200/90"
      }`}
    >
      {/* Ambient Top Cyan Glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] rounded-full blur-[160px] opacity-20"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(34,211,238,0.3) 0%, rgba(99,102,241,0.15) 60%, transparent 100%)"
            : "radial-gradient(circle, rgba(2,132,199,0.2) 0%, rgba(79,70,229,0.1) 60%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-16">
        {/* ---------------------------------------------------- */}
        {/* FINAL CALL-TO-ACTION BANNER CARD */}
        {/* ---------------------------------------------------- */}
        <div
          className={`rounded-2xl border p-8 sm:p-12 text-center relative overflow-hidden transition-all ${
            isDark
              ? "bg-[#0A1224]/90 border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.12)]"
              : "bg-white/95 border-slate-200/90 shadow-lg"
          }`}
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] mb-4 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            ZERO-WEIGHT INFERENCE ENGINE · OPEN BETA
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black tracking-tight uppercase leading-[1.1] max-w-3xl mx-auto">
            <span className={`block ${isDark ? "text-white" : "text-slate-900"}`}>
              TURN EVERY IDLE DEVICE INTO
            </span>
            <span
              className={`block mt-1 ${
                isDark ? "text-cyan-400 text-cyan-glow" : "text-sky-600 font-black"
              }`}
            >
              ONE PRIVATE SUPERCOMPUTER.
            </span>
          </h2>

          {/* Subheading */}
          <p
            className={`mt-3 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-normal ${
              isDark ? "text-[#93A4C3]" : "text-slate-600"
            }`}
          >
            Deploy 70B+ parameter LLMs across your existing hardware in minutes. Models stay on
            disk. Only 5.1 KB activations cross the wire.
          </p>

          {/* CTA Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group btn-dark-blue-cyan w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 filter drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
              <span className="text-cyan-outline font-black tracking-wider uppercase">
                Request Early Access
              </span>
            </button>

            <a
              href="https://github.com/tex1ure/AeroMESH"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isDark
                  ? "bg-[#060B14]/80 border-slate-700/80 text-slate-200 hover:border-cyan-400/50"
                  : "bg-white border-slate-300 text-slate-800 hover:border-sky-500 shadow-xs"
              }`}
            >
              <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* FOOTER LINKS GRID */}
        {/* ---------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-500/15">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <a
                href="#overview"
                className="group flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
              >
                <div className="relative w-7 h-7 flex items-center justify-center transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                  <Image
                    src="/logo.png"
                    alt="AeroMESH Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span
                  className={`text-lg font-bold tracking-[0.24em] uppercase transition-colors ${
                    isDark ? "text-white group-hover:text-cyan-300" : "text-slate-900 group-hover:text-sky-600"
                  }`}
                >
                  AERO<span className="text-cyan-400">MESH</span>
                </span>
              </a>
            </div>

            <p
              className={`text-xs sm:text-sm leading-relaxed max-w-xs font-normal ${
                isDark ? "text-[#93A4C3]" : "text-slate-600"
              }`}
            >
              Distributed, fault-tolerant LLM inference engine across heterogeneous hardware. No
              weight transfer. Pure compute, working together.
            </p>

            {/* System Status Pill */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-[11px] ${
                isDark
                  ? "bg-[#0A1224]/80 border-slate-800 text-slate-300"
                  : "bg-white border-slate-300 text-slate-700 shadow-xs"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              mDNS & gRPC Relays Operational · v0.4.2
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-2.5">
            <div
              className={`font-mono text-xs uppercase tracking-wider font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Navigation
            </div>
            <ul
              className={`space-y-2 text-xs sm:text-sm ${
                isDark ? "text-[#93A4C3]" : "text-slate-600"
              }`}
            >
              <li>
                <a href="#overview" className="hover:text-cyan-400 transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-cyan-400 transition-colors">
                  Pipeline Architecture
                </a>
              </li>
              <li>
                <a href="#selective-mesh" className="hover:text-cyan-400 transition-colors">
                  Selective Mesh
                </a>
              </li>
              <li>
                <a href="#benchmarks" className="hover:text-cyan-400 transition-colors">
                  Benchmarks & Simulator
                </a>
              </li>
            </ul>
          </div>

          {/* Core Architecture */}
          <div className="md:col-span-3 space-y-2.5">
            <div
              className={`font-mono text-xs uppercase tracking-wider font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Core Architecture
            </div>
            <ul
              className={`space-y-2 text-xs sm:text-sm ${
                isDark ? "text-[#93A4C3]" : "text-slate-600"
              }`}
            >
              <li>Zero-Weight Transfer Protocol</li>
              <li>5.1 KB Activation Tunnel (gRPC)</li>
              <li>mDNS Local Auto-Discovery</li>
              <li>Self-Healing Ring Topology</li>
            </ul>
          </div>

          {/* Developers */}
          <div className="md:col-span-3 space-y-2.5">
            <div
              className={`font-mono text-xs uppercase tracking-wider font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Developers
            </div>
            <ul
              className={`space-y-2 text-xs sm:text-sm ${
                isDark ? "text-[#93A4C3]" : "text-slate-600"
              }`}
            >
              <li>
                <a
                  href="https://github.com/tex1ure/AeroMESH"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-cyan-400 transition-colors"
                >
                  GitHub Repository <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Request Cluster Beta Key
                </button>
              </li>
              <li>
                <button
                  onClick={toggleTheme}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Switch to {isDark ? "Light" : "Dark"} Theme
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* BOTTOM COPYRIGHT & BACK TO TOP */}
        {/* ---------------------------------------------------- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div style={{ color: isDark ? "#64748B" : "#64748B" }}>
            © {new Date().getFullYear()} AeroMESH Distributed Systems. Local-first privacy by
            design.
          </div>

          <button
            onClick={scrollToTop}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all hover:-translate-y-0.5 cursor-pointer ${
              isDark
                ? "bg-[#0A1224] border-slate-800 text-slate-300 hover:border-cyan-400"
                : "bg-white border-slate-300 text-slate-700 hover:border-sky-500 shadow-xs"
            }`}
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* EARLY ACCESS / CLUSTER BETA MODAL */}
      {/* ---------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div
            className={`relative w-full max-w-md rounded-2xl border p-6 sm:p-8 shadow-2xl ${
              isDark ? "bg-[#0B1426] border-cyan-500/35" : "bg-white border-slate-300"
            }`}
          >
            <button
              onClick={() => {
                setIsModalOpen(false);
                setSubmitted(false);
              }}
              className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
                isDark
                  ? "border-slate-800 text-slate-400 hover:text-white"
                  : "border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase bg-cyan-500/15 text-cyan-400 border border-cyan-400/30">
                  <Cpu className="w-3.5 h-3.5" />
                  AeroMESH Early Access
                </div>

                <h3
                  className={`text-xl sm:text-2xl font-bold tracking-tight uppercase ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Deploy Your Local Mesh
                </h3>

                <p
                  className={`text-xs sm:text-sm font-normal ${
                    isDark ? "text-[#93A4C3]" : "text-slate-600"
                  }`}
                >
                  Get instant access to the AeroMESH binary, multi-node mDNS coordinator, and
                  OpenAI proxy server.
                </p>

                <div>
                  <label
                    className={`block font-mono text-xs uppercase mb-1.5 font-bold ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Developer Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-sans outline-none focus:ring-2 focus:ring-cyan-400 ${
                      isDark
                        ? "bg-[#060B14] border-slate-800 text-white placeholder:text-slate-600"
                        : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block font-mono text-xs uppercase mb-1.5 font-bold ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Primary Hardware Topology
                  </label>
                  <select
                    value={hardwareMix}
                    onChange={(e) => setHardwareMix(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-sans outline-none ${
                      isDark
                        ? "bg-[#060B14] border-slate-800 text-white"
                        : "bg-slate-50 border-slate-300 text-slate-900"
                    }`}
                  >
                    <option>Apple Silicon + NVIDIA CUDA Mix</option>
                    <option>Multi-MacBook / Mac Studio Cluster</option>
                    <option>Multi-GPU Linux / Windows LAN</option>
                    <option>Enterprise Air-Gapped On-Prem</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-dark-blue-cyan w-full py-3.5 rounded-xl font-extrabold text-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer mt-3"
                >
                  <span className="text-cyan-outline font-black tracking-wider uppercase">
                    Generate Mesh Invite Token
                  </span>
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3
                  className={`text-xl sm:text-2xl font-bold tracking-tight uppercase ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  You&apos;re on the Waitlist!
                </h3>
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-[#93A4C3]" : "text-slate-600"}`}
                >
                  Thank you for joining! We&apos;ve reserved your priority spot for <strong>{email}</strong> ({hardwareMix}).
                </p>
                <div
                  className={`p-4 rounded-xl border text-center ${
                    isDark
                      ? "bg-cyan-950/30 border-cyan-500/40 text-cyan-300"
                      : "bg-sky-50 border-sky-300 text-sky-800"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    Private Preview in Progress
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    AeroMESH is currently in active development. We&apos;ll give you access and send your Coordinator invite key once we&apos;re ready.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
