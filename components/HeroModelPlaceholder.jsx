"use client";

import HeroModel3D from "./HeroModel3D";

/**
 * HeroModelPlaceholder
 *
 * Cleanly replaced with the real AeroMESH 3D cluster model:
 * - Positioned on the right side of the hero (48%–52% desktop width)
 * - Vertically centered
 * - Preserves generous negative space around headline & CTAs
 * - Transparent WebGL canvas blending with background network streams
 * - Idle floating & breathing animation
 * - 4–6 degree mouse cursor parallax
 * - Smooth scroll-driven exit
 */
export default function HeroModelPlaceholder() {
  return <HeroModel3D />;
}
