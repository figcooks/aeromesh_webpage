"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

export default function HeroBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const themeRef = useRef(isDark);

  useEffect(() => {
    themeRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      if (prefersReducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / width - 0.5) * 35;
      mouse.targetY = (clientY / height - 0.5) * 25;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Stream lines bundle
    const streamCount = 14;
    const streams = Array.from({ length: streamCount }, (_, i) => {
      const offsetRatio = (i - streamCount / 2) / (streamCount / 2);
      return {
        id: i,
        offsetY: offsetRatio * 32,
        offsetX: offsetRatio * 18,
        speedMultiplier: 0.75 + (i % 4) * 0.2,
        opacity: 0.2 + (1 - Math.abs(offsetRatio)) * 0.65,
        lineWidth: i === 7 ? 2.5 : i % 2 === 0 ? 1.6 : 1.0,
        packets: [
          { t: (i * 0.12) % 1, speed: 0.0016 + (i % 3) * 0.0006, size: 3.2, isCube: i % 3 === 0 },
          { t: (i * 0.12 + 0.48) % 1, speed: 0.002 + (i % 2) * 0.0005, size: 2.2, isCube: false },
        ],
      };
    });

    // Isometric cubes / cluster nodes
    const clusterNodes = [
      { u: 0.22, yOffset: 15, size: 10, pulse: 0.5, telemetry: true },
      { u: 0.38, yOffset: 5, size: 14, pulse: 1.2, telemetry: true },
      { u: 0.54, yOffset: -8, size: 22, pulse: 2.3, telemetry: true },
      { u: 0.68, yOffset: -18, size: 30, pulse: 3.5, telemetry: true },
      { u: 0.82, yOffset: -22, size: 34, pulse: 4.8, telemetry: true },
      { u: 0.94, yOffset: 10, size: 24, pulse: 1.9, telemetry: false },
      { u: 0.48, yOffset: 25, size: 12, pulse: 0.9, telemetry: false },
    ];

    // Minimal floating ambient particles
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      vx: (Math.random() - 0.25) * 0.00025,
      vy: -(Math.random() * 0.00035 + 0.00008),
      depth: Math.random() * 0.6 + 0.4,
    }));

    const getStreamPoint = (t, offsetY, offsetX, pX, pY) => {
      const p0 = { x: -width * 0.05 + offsetX + pX * 0.25, y: height * 0.84 + offsetY + pY * 0.2 };
      const p1 = { x: width * 0.26 + offsetX + pX * 0.4, y: height * 0.77 + offsetY * 0.8 + pY * 0.3 };
      const p2 = { x: width * 0.52 + offsetX + pX * 0.65, y: height * 0.68 + offsetY * 0.6 + pY * 0.5 };
      const p3 = { x: width * 0.82 + offsetX + pX * 0.85, y: height * 0.32 + offsetY * 0.4 + pY * 0.7 };
      const p4 = { x: width * 1.05 + offsetX + pX * 1.0, y: height * 0.38 + offsetY * 0.3 + pY * 0.8 };

      if (t < 0.5) {
        const localT = t * 2;
        const u = 1 - localT;
        const x = u * u * u * p0.x + 3 * u * u * localT * p1.x + 3 * u * localT * localT * p2.x + localT * localT * localT * (p2.x + (p3.x - p1.x) * 0.2);
        const y = u * u * u * p0.y + 3 * u * u * localT * p1.y + 3 * u * localT * localT * p2.y + localT * localT * localT * (p2.y + (p3.y - p1.y) * 0.2);
        return { x, y };
      } else {
        const localT = (t - 0.5) * 2;
        const u = 1 - localT;
        const midStart = { x: p2.x + (p3.x - p1.x) * 0.2, y: p2.y + (p3.y - p1.y) * 0.2 };
        const x = u * u * u * midStart.x + 3 * u * u * localT * p2.x + 3 * u * localT * localT * p3.x + localT * localT * localT * p4.x;
        const y = u * u * u * midStart.y + 3 * u * u * localT * p2.y + 3 * u * localT * localT * p3.y + localT * localT * localT * p4.y;
        return { x, y };
      }
    };

    const drawIsoCube = (x, y, size, alpha, pulseVal = 0, isMirror = false, isThemeDark = true) => {
      const s = size * (1 + Math.sin(pulseVal) * 0.05);
      const h = s * 0.86;
      const w = s;
      const mult = isMirror ? -1 : 1;

      ctx.save();
      ctx.translate(x, y);

      // Top face
      ctx.beginPath();
      ctx.moveTo(0, -h * mult);
      ctx.lineTo(w, -h * 0.45 * mult);
      ctx.lineTo(0, 0);
      ctx.lineTo(-w, -h * 0.45 * mult);
      ctx.closePath();
      ctx.fillStyle = isThemeDark
        ? `rgba(186, 230, 253, ${0.5 * alpha})`
        : `rgba(224, 242, 254, ${0.7 * alpha})`;
      ctx.fill();
      ctx.strokeStyle = isThemeDark
        ? `rgba(224, 242, 254, ${0.9 * alpha})`
        : `rgba(2, 132, 199, ${0.85 * alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Left face
      ctx.beginPath();
      ctx.moveTo(-w, -h * 0.45 * mult);
      ctx.lineTo(0, 0);
      ctx.lineTo(0, h * 0.65 * mult);
      ctx.lineTo(-w, h * 0.2 * mult);
      ctx.closePath();
      ctx.fillStyle = isThemeDark
        ? `rgba(34, 211, 238, ${0.4 * alpha})`
        : `rgba(56, 189, 248, ${0.45 * alpha})`;
      ctx.fill();
      ctx.strokeStyle = isThemeDark
        ? `rgba(56, 189, 248, ${0.75 * alpha})`
        : `rgba(14, 165, 233, ${0.8 * alpha})`;
      ctx.stroke();

      // Right face
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(w, -h * 0.45 * mult);
      ctx.lineTo(w, h * 0.2 * mult);
      ctx.lineTo(0, h * 0.65 * mult);
      ctx.closePath();
      ctx.fillStyle = isThemeDark
        ? `rgba(14, 116, 144, ${0.45 * alpha})`
        : `rgba(2, 132, 199, ${0.35 * alpha})`;
      ctx.fill();
      ctx.strokeStyle = isThemeDark
        ? `rgba(34, 211, 238, ${0.8 * alpha})`
        : `rgba(3, 105, 161, ${0.85 * alpha})`;
      ctx.stroke();

      // Center bright node core
      if (!isMirror) {
        ctx.beginPath();
        ctx.arc(0, -h * 0.1, s * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = isThemeDark
          ? `rgba(255, 255, 255, ${0.9 * alpha})`
          : `rgba(14, 165, 233, ${0.9 * alpha})`;
        ctx.shadowColor = isThemeDark
          ? "rgba(34, 211, 238, 0.95)"
          : "rgba(2, 132, 199, 0.75)";
        ctx.shadowBlur = 14;
        ctx.fill();
      }

      ctx.restore();
    };

    let time = 0;

    const render = () => {
      time += 0.016;
      const currentDark = themeRef.current;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const pX = mouse.x;
      const pY = mouse.y;

      ctx.clearRect(0, 0, width, height);

      // 1. REFLECTIVE PERSPECTIVE FLOOR GRID
      const floorHorizon = height * 0.68 + pY * 0.2;
      const floorBottom = height;
      const gridCount = 14;

      ctx.save();
      const floorGradient = ctx.createLinearGradient(0, floorHorizon, 0, floorBottom);
      if (currentDark) {
        floorGradient.addColorStop(0, "rgba(6, 11, 20, 0.1)");
        floorGradient.addColorStop(0.3, "rgba(10, 24, 48, 0.45)");
        floorGradient.addColorStop(0.7, "rgba(8, 20, 38, 0.85)");
        floorGradient.addColorStop(1, "rgba(4, 9, 17, 0.98)");
      } else {
        floorGradient.addColorStop(0, "rgba(248, 250, 252, 0.1)");
        floorGradient.addColorStop(0.3, "rgba(241, 245, 249, 0.5)");
        floorGradient.addColorStop(0.7, "rgba(224, 242, 254, 0.65)");
        floorGradient.addColorStop(1, "rgba(203, 213, 225, 0.85)");
      }
      ctx.fillStyle = floorGradient;
      ctx.fillRect(0, floorHorizon, width, floorBottom - floorHorizon);

      // Transverse horizontal grid lines
      for (let i = 0; i <= gridCount; i++) {
        const factor = Math.pow(i / gridCount, 2.3);
        const y = floorHorizon + factor * (floorBottom - floorHorizon);
        const lineAlpha = currentDark ? 0.04 + factor * 0.22 : 0.08 + factor * 0.25;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = currentDark
          ? `rgba(34, 211, 238, ${lineAlpha})`
          : `rgba(2, 132, 199, ${lineAlpha * 1.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Longitudinal perspective grid lines converging towards horizon
      const vPointX = width * 0.64 + pX * 0.35;
      const vPointY = floorHorizon - 12;
      const rayTotal = 26;

      for (let i = -6; i <= rayTotal; i++) {
        const spreadBottom = ((i - rayTotal / 2) / (rayTotal / 2)) * (width * 1.15) + vPointX;
        ctx.beginPath();
        ctx.moveTo(vPointX, vPointY);
        ctx.lineTo(spreadBottom, floorBottom);
        ctx.strokeStyle = currentDark
          ? "rgba(34, 211, 238, 0.075)"
          : "rgba(2, 132, 199, 0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Floor light reflections
      const floorLight = ctx.createRadialGradient(
        width * 0.72 + pX * 0.5,
        floorHorizon + 70,
        10,
        width * 0.72 + pX * 0.5,
        floorHorizon + 70,
        width * 0.35
      );
      if (currentDark) {
        floorLight.addColorStop(0, "rgba(34, 211, 238, 0.18)");
        floorLight.addColorStop(0.4, "rgba(14, 116, 144, 0.08)");
        floorLight.addColorStop(1, "transparent");
      } else {
        floorLight.addColorStop(0, "rgba(14, 165, 233, 0.25)");
        floorLight.addColorStop(0.4, "rgba(56, 189, 248, 0.1)");
        floorLight.addColorStop(1, "transparent");
      }
      ctx.fillStyle = floorLight;
      ctx.fillRect(0, floorHorizon, width, floorBottom - floorHorizon);
      ctx.restore();

      // 2. FLOWING DATA STREAMS
      streams.forEach((stream) => {
        ctx.save();
        ctx.beginPath();

        const samples = 64;
        for (let s = 0; s <= samples; s++) {
          const t = s / samples;
          const pt = getStreamPoint(t, stream.offsetY, stream.offsetX, pX, pY);
          if (s === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }

        const lineGlow = stream.opacity * (0.85 + Math.sin(time * 2.2 + stream.id) * 0.15);
        if (currentDark) {
          const colorPrefix =
            stream.id % 4 === 0
              ? "rgba(56, 189, 248, "
              : stream.id % 4 === 1
              ? "rgba(34, 211, 238, "
              : stream.id % 4 === 2
              ? "rgba(14, 165, 233, "
              : "rgba(99, 102, 241, ";
          ctx.strokeStyle = `${colorPrefix}${lineGlow})`;
          ctx.shadowColor = "rgba(34, 211, 238, 0.5)";
        } else {
          const colorPrefix =
            stream.id % 4 === 0
              ? "rgba(2, 132, 199, "
              : stream.id % 4 === 1
              ? "rgba(14, 165, 233, "
              : stream.id % 4 === 2
              ? "rgba(3, 105, 161, "
              : "rgba(79, 70, 229, ";
          ctx.strokeStyle = `${colorPrefix}${lineGlow * 1.1})`;
          ctx.shadowColor = "rgba(14, 165, 233, 0.4)";
        }
        ctx.lineWidth = stream.lineWidth;
        ctx.shadowBlur = stream.id === 7 ? 16 : 8;
        ctx.stroke();
        ctx.restore();

        // Moving data packets along paths
        stream.packets.forEach((packet) => {
          if (!prefersReducedMotion) {
            packet.t += packet.speed * stream.speedMultiplier;
            if (packet.t > 1) packet.t -= 1;
          }

          const pt = getStreamPoint(packet.t, stream.offsetY, stream.offsetX, pX, pY);
          const packetAlpha = Math.sin(packet.t * Math.PI) * 0.95;

          if (packetAlpha > 0.04) {
            if (packet.isCube) {
              drawIsoCube(pt.x, pt.y, packet.size * 2, packetAlpha, time * 3 + stream.id, false, currentDark);
            } else {
              ctx.save();
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, packet.size, 0, Math.PI * 2);
              ctx.fillStyle = currentDark
                ? `rgba(255, 255, 255, ${packetAlpha})`
                : `rgba(2, 132, 199, ${packetAlpha})`;
              ctx.shadowColor = currentDark
                ? "rgba(34, 211, 238, 0.95)"
                : "rgba(14, 165, 233, 0.85)";
              ctx.shadowBlur = 12;
              ctx.fill();
              ctx.restore();
            }
          }
        });
      });

      // 3. CLUSTER NODES
      clusterNodes.forEach((node) => {
        const streamPt = getStreamPoint(node.u, 0, 0, pX, pY);
        const x = streamPt.x + (node.size % 2 === 0 ? 15 : -15);
        const y = streamPt.y + node.yOffset;

        if (node.telemetry) {
          const groundY = Math.min(height - 10, Math.max(y + 25, floorHorizon + (y - floorHorizon) * 0.75 + 30));

          ctx.save();
          ctx.beginPath();
          ctx.setLineDash([2, 4]);
          ctx.moveTo(x, y + node.size * 0.5);
          ctx.lineTo(x, groundY);
          ctx.strokeStyle = currentDark
            ? "rgba(34, 211, 238, 0.35)"
            : "rgba(2, 132, 199, 0.4)";
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.arc(x, groundY, 3, 0, Math.PI * 2);
          ctx.fillStyle = currentDark ? "rgba(56, 189, 248, 0.9)" : "rgba(2, 132, 199, 0.9)";
          ctx.shadowColor = currentDark ? "rgba(34, 211, 238, 0.9)" : "rgba(14, 165, 233, 0.8)";
          ctx.shadowBlur = 8;
          ctx.fill();

          const mirrorY = groundY + (groundY - y) * 0.25;
          if (mirrorY < height) {
            drawIsoCube(x, mirrorY, node.size * 0.7, 0.2, time * 1.5 + node.pulse, true, currentDark);
          }
          ctx.restore();
        }

        drawIsoCube(x, y, node.size, 0.92, time * 1.5 + node.pulse, false, currentDark);
      });

      // 4. FLOATING PARTICLES
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -0.05) p.y = 1.05;
          if (p.x < -0.05) p.x = 1.05;
          if (p.x > 1.05) p.x = -0.05;
        }

        const px = p.x * width + pX * p.depth * 0.25;
        const py = p.y * height + pY * p.depth * 0.25;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = currentDark
          ? `rgba(186, 230, 253, ${p.alpha * 0.65})`
          : `rgba(2, 132, 199, ${p.alpha * 0.55})`;
        ctx.shadowColor = currentDark
          ? "rgba(34, 211, 238, 0.55)"
          : "rgba(14, 165, 233, 0.5)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Soft Ambient Radial Lights (Curated Cyan & Indigo Glows) */}
      <div
        className={`absolute top-1/6 -right-20 w-[650px] lg:w-[920px] h-[580px] lg:h-[800px] rounded-full blur-[150px] pointer-events-none transition-opacity duration-300 ${
          isDark ? "opacity-45" : "opacity-35"
        }`}
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(34, 211, 238, 0.32) 0%, rgba(56, 189, 248, 0.14) 38%, rgba(99, 102, 241, 0.06) 72%, transparent 100%)"
            : "radial-gradient(circle, rgba(14, 165, 233, 0.28) 0%, rgba(56, 189, 248, 0.15) 38%, rgba(99, 102, 241, 0.05) 72%, transparent 100%)",
        }}
      />
      <div
        className={`absolute bottom-8 right-1/4 w-[480px] h-[380px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-300 ${
          isDark ? "opacity-30" : "opacity-20"
        }`}
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(34, 211, 238, 0.24) 0%, rgba(14, 116, 144, 0.12) 60%, transparent 100%)"
            : "radial-gradient(circle, rgba(2, 132, 199, 0.18) 0%, rgba(14, 165, 233, 0.1) 60%, transparent 100%)",
        }}
      />

      {/* Main High-Performance Canvas for Splines, Cubes, Telemetry & Reflective Floor */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Subtle futuristic scan lines overlay */}
      <div className="absolute inset-0 bg-scanlines opacity-[0.07] mix-blend-overlay" />

      {/* Delicate vignette around edges */}
      <div
        className={`absolute inset-0 pointer-events-none transition-colors duration-300 ${
          isDark
            ? "bg-gradient-to-t from-[#060B14] via-transparent to-[#060B14]/40"
            : "bg-gradient-to-t from-[#F8FAFC] via-transparent to-[#F8FAFC]/40"
        }`}
      />
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isDark
            ? "bg-gradient-to-r from-[#060B14] via-transparent to-transparent opacity-80"
            : "bg-gradient-to-r from-[#F8FAFC] via-transparent to-transparent opacity-75"
        }`}
      />
    </div>
  );
}
