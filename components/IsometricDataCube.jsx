"use client";

import React from "react";

/**
 * IsometricDataCube
 * Flat vector / SVG 3D glowing isometric data packet.
 * Faithfully recreates the technical cube tokens shown in the AeroMESH reference image.
 */
export default function IsometricDataCube({
  size = 22,
  variant = "cyan", // 'cyan' | 'purple' | 'standby'
  className = "",
  glow = true,
}) {
  const isPurple = variant === "purple" || variant === "standby";

  const topColor = isPurple ? "#C084FC" : "#67E8F9";
  const leftColor = isPurple ? "#818CF8" : "#06B6D4";
  const rightColor = isPurple ? "#4F46E5" : "#0284C7";
  const strokeColor = isPurple ? "#A855F7" : "#22D3EE";
  const glowFilterId = isPurple ? "glow-purple" : "glow-cyan";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${glow ? "filter drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" : ""} ${className}`}
      style={{
        filter: glow
          ? isPurple
            ? "drop-shadow(0 0 7px rgba(168,85,247,0.75))"
            : "drop-shadow(0 0 8px rgba(34,211,238,0.85))"
          : undefined,
      }}
    >
      <defs>
        <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g filter={`url(#${glowFilterId})`}>
        {/* Top Face */}
        <polygon
          points="12,2 20.66,7 12,12 3.34,7"
          fill={topColor}
          fillOpacity="0.9"
          stroke={strokeColor}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Left Face */}
        <polygon
          points="3.34,7 12,12 12,22 3.34,17"
          fill={leftColor}
          fillOpacity="0.85"
          stroke={strokeColor}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Right Face */}
        <polygon
          points="12,12 20.66,7 20.66,17 12,22"
          fill={rightColor}
          fillOpacity="0.95"
          stroke={strokeColor}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
