"use client";

import Preloader from "../components/Preloader";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturesSection from "../components/FeaturesSection";
import ComparisonSection from "../components/ComparisonSection";
import PipelineSection from "../components/PipelineSection";
import Section04MeshCluster from "../components/Section04MeshCluster";
import Section05ModelStaysHome from "../components/Section05ModelStaysHome";
import Section06SelectiveMesh from "../components/Section06SelectiveMesh";
import Section07Benchmarks from "../components/Section07Benchmarks";
import Section08Footer from "../components/Section08Footer";
import CursorLight from "../components/CursorLight";
import SmoothScroll from "../components/SmoothScroll";
import { ThemeProvider } from "../components/ThemeContext";

export default function Home() {
  return (
    <ThemeProvider>
      {/* 3-Second Video Preloader Curtain */}
      <Preloader videoSrc="/preloader.mp4" minDuration={3000} />

      <SmoothScroll>
        <div
          className="relative min-h-screen w-full selection:bg-sky-500/30 selection:text-sky-200 overflow-x-clip"
          style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
        >
          {/* Subtle Cursor Light Follow */}
          <CursorLight />

          {/* Top Floating Glassmorphic Navbar */}
          <Navbar />

          {/* Main Content Sections */}
          <main className="relative z-10 w-full">
            {/* Section 1: Hero Landing Section (#overview) */}
            <div id="overview">
              <Hero />
            </div>

            {/* Section 1 -> Section 2 Transition */}
            <FeaturesSection />

            {/* Section 2: "0.0 MB" Moment (8.0 GB to 5.1 KB & 0.0 MB Climax) */}
            <ComparisonSection />

            {/* Section 3: "The Floating Inference Pipeline" (#architecture) */}
            <div id="architecture">
              <PipelineSection />
            </div>

            {/* Section 4: "One System. Many Nodes." */}
            <Section04MeshCluster />

            {/* Section 5: "The Model Stays Home" */}
            <Section05ModelStaysHome />

            {/* Section 6: "The Mesh Is Selective" (#selective-mesh) */}
            <Section06SelectiveMesh />

            {/* Section 7: "Telemetry & Benchmarks" (#benchmarks) */}
            <Section07Benchmarks />
          </main>

          {/* Section 8: Final CTA, Early Access Modal & Footer */}
          <Section08Footer />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}
