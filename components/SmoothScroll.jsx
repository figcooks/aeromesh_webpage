"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll
 *
 * Implements silky-smooth, physics-based inertial scrolling across the entire website
 * using Lenis (standard for modern high-performance web applications):
 * - Intercepts mouse wheel & trackpad with natural deceleration physics
 * - Smoothly navigates in-page anchor links (Home, Architecture, Features, Docs)
 * - Automatically respects prefers-reduced-motion
 * - Zero CPU overhead when idle
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Check user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth navigation for all anchor links (#features, #architecture, etc.)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.2 });
        return;
      }

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, { offset: -70, duration: 1.2 });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
