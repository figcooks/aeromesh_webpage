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
    const LERP_SPEED = 0.14;

    const handlePointerMove = (e) => {
      const rect = el.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      if (!isInside) {
        isInside = true;
        el.style.setProperty("--spotlight-opacity", "1");
        if (currentX < 0) {
          currentX = targetX;
          currentY = targetY;
        }
      }
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

    const animate = () => {
      if (isInside || Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        currentX += (targetX - currentX) * LERP_SPEED;
        currentY += (targetY - currentY) * LERP_SPEED;

        el.style.setProperty("--mouse-x", `${currentX.toFixed(1)}px`);
        el.style.setProperty("--mouse-y", `${currentY.toFixed(1)}px`);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
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
