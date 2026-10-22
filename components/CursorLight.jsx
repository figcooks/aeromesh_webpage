"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

/**
 * CursorLight
 *
 * Interactive Dual-Mode Radial Cursor Effect:
 * - IN DARK MODE: Emits a soft, luminous "Radial Light Mode" effect wherever the cursor hovers,
 *   illuminating the dark interface, network lines, and grid with crisp daylight clarity.
 * - IN LIGHT MODE: Emits a soft, light-blue tinted radial spotlight without dark/multiply shadows.
 * - High-Performance: Runs on requestAnimationFrame with lerp smoothing and direct CSS custom
 *   properties (--mouse-x, --mouse-y, --spotlight-opacity) with zero React re-render overhead.
 */
export default function CursorLight({ fixed = false, className = "" }) {
  const spotlightRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Disable on touch devices
    const isTouch =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    if (isTouch) return;

    const el = spotlightRef.current;
    if (!el) return;

    let targetX = -999;
    let targetY = -999;
    let currentX = -999;
    let currentY = -999;
    let isInside = false;
    let animationFrameId;

    // Smooth fluid interpolation factor (lerp)
    const LERP_SPEED = 0.18;
    let isRunning = false;

    const animate = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) {
        currentX += dx * LERP_SPEED;
        currentY += dy * LERP_SPEED;
        el.style.setProperty("--mouse-x", `${currentX.toFixed(1)}px`);
        el.style.setProperty("--mouse-y", `${currentY.toFixed(1)}px`);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        isRunning = false;
      }
    };

    const requestTick = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (e) => {
      // For fixed overlay, clientX/Y are exact without forced DOM layout reads
      if (fixed) {
        targetX = e.clientX;
        targetY = e.clientY;
      } else {
        const rect = el.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
      }

      if (!isInside) {
        isInside = true;
        el.style.setProperty("--spotlight-opacity", "1");
        if (currentX < 0) {
          currentX = targetX;
          currentY = targetY;
        }
      }

      requestTick();
    };

    const handlePointerLeave = () => {
      isInside = false;
      el.style.setProperty("--spotlight-opacity", "0");
    };

    const handlePointerEnter = (e) => {
      handlePointerMove(e);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    document.documentElement.addEventListener("pointerenter", handlePointerEnter, { passive: true });

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.removeEventListener("pointerenter", handlePointerEnter);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className={`cursor-spotlight-layer ${
        fixed ? "fixed inset-0 z-[30]" : "absolute inset-0 z-[5]"
      } pointer-events-none select-none ${
        isDark ? "spotlight-dark" : "spotlight-light"
      } ${className}`}
      aria-hidden="true"
    />
  );
}
