'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function Preloader({
  videoSrc = '/preloader.mp4',
  minDuration = 3000, // Matches exact 3-second video
}) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Lock scrolling while preloader is covering the screen
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    let windowLoaded = document.readyState === 'complete';
    let rafId;

    const handleWindowLoad = () => {
      windowLoaded = true;
    };

    if (!windowLoaded) {
      window.addEventListener('load', handleWindowLoad);
    }

    // Start playing the 3s loop immediately
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }

    const tick = (now) => {
      const elapsed = now - startTime;
      // Progress from 0 to 1 over exactly 3000ms (3 seconds)
      const ratio = Math.min(elapsed / minDuration, 1);

      // If page hasn't finished loading after 3s, hold at 95% while video keeps looping
      const currentProgress = windowLoaded
        ? Math.round(ratio * 100)
        : Math.min(95, Math.round(ratio * 95));

      setProgress(currentProgress);

      if (currentProgress < 100 || !windowLoaded) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Trigger the black curtain to slide UP right at 3.0s
        setTimeout(() => {
          setIsLoaded(true);
          document.body.style.overflow = prevOverflow;
        }, 120);

        // Unmount video after the 1-second upward slide completes
        setTimeout(() => {
          setIsRemoved(true);
        }, 1200);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('load', handleWindowLoad);
      document.body.style.overflow = prevOverflow;
    };
  }, [minDuration]);

  if (isRemoved) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black text-white select-none overflow-hidden"
      style={{
        // Slides the entire pure-black screen UP to reveal the site
        transform: isLoaded ? 'translateY(-100%)' : 'translateY(0%)',
        transition: 'transform 1.05s cubic-bezier(0.76, 0, 0.24, 1)',
        willChange: 'transform',
        boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95)',
      }}
    >
      {/* Center Looping 3-Second MP4 Video */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          // mix-blend-screen guarantees the video's black background blends 100% invisibly into bg-black
          className="w-[300px] sm:w-[440px] md:w-[540px] max-h-[70vh] object-contain mix-blend-screen"
        />
      </div>

      {/* Subtle Top Branding */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs tracking-[0.22em] uppercase font-bold text-slate-400">
            Aero<span className="text-cyan-400 font-extrabold">MESH</span>
          </span>
        </div>

        <span className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">
          v0.4.2
        </span>
      </div>

      {/* Bottom Progress Bar & Counter */}
      <div className="relative z-10 px-6 sm:px-10 pb-8 sm:pb-10">
        <div className="flex items-end justify-between gap-4 mb-3">
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-slate-400 font-semibold">
            {progress < 100 ? 'INITIALIZING MESH PIPELINE...' : 'READY'}
          </div>

          <div className="text-4xl sm:text-6xl font-black tracking-tighter leading-none text-white tabular-nums">
            {String(progress).padStart(2, '0')}
            <span className="text-xl sm:text-2xl text-cyan-400 ml-1">%</span>
          </div>
        </div>

        {/* Thin Progress Line */}
        <div className="w-full h-[2px] bg-white/10 overflow-hidden rounded-full">
          <div
            className="h-full transition-all duration-75 ease-linear"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #22D3EE 0%, #38BDF8 50%, #818CF8 100%)',
              boxShadow: '0 0 12px #22D3EE',
            }}
          />
        </div>
      </div>

      {/* Subtle glowing bottom edge as the black curtain lifts up */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.5) 50%, transparent 100%)',
        }}
      />
    </div>
  );
}
