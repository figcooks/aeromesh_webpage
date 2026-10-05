"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturesSection from "../components/FeaturesSection";
import ComparisonSection from "../components/ComparisonSection";
import PipelineSection from "../components/PipelineSection";
import CursorLight from "../components/CursorLight";
import { ThemeProvider } from "../components/ThemeContext";

export default function Home() {
  return (
    <ThemeProvider>
      <main className="relative min-h-screen bg-[#060B14] dark:bg-[#060B14] light:bg-[#F8FAFC] flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Interactive Dual-Mode Page-Wide Cursor Spotlight (fixed across all sections) */}
        <CursorLight fixed />

        {/* Top Minimal Navigation with Theme Switcher */}
        <Navbar />

        {/* SECTION 1: Hero Landing Section */}
        <Hero />

        {/* SECTION 1 ➔ SECTION 2: Minimal Features Heading & Empty Space Transition */}
        <FeaturesSection />

        {/* SECTION 2: “0.0 MB” MOMENT (Appears from below, 8.0 GB to 5.1 KB & Monumental 0.0 MB Climax) */}
        <ComparisonSection />

        {/* SECTION 3: “THE FLOATING INFERENCE PIPELINE” (Coordinator ➔ Activation Tunnel ➔ Worker ➔ Token Stream) */}
        <PipelineSection />
      </main>
    </ThemeProvider>
  );
}
