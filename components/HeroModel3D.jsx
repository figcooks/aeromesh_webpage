"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * HeroModel3D
 *
 * Premium 3D visualization of the AeroMESH futuristic cluster:
 * - Direct Three.js WebGL canvas with transparent background (alpha: true)
 * - Multi-layered luminous cyan ambient glow behind the model and on the floor
 * - Curated cyan/sky-blue rim lights and back glow
 * - Initial load: graceful upward glide + fade-in (1.2s cubic ease)
 * - Idle: ultra-slow, controlled physical floating + breathing rotation
 * - Interactive: 4–6 degree mouse cursor parallax with physics-based lerp
 * - Scroll: smoothly glides upward and scales down with hero exit
 * - Performance: tone mapping, device pixel ratio clamping, lazy loading, resource cleanup
 */
export default function HeroModel3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Scroll integration: model slowly glides upward and slightly scales down
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollY = useTransform(scrollYProgress, [0, 0.6], [0, -75]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.93]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0.35, 2.25);
    camera.lookAt(0, 0, 0);

    // 2. High-Performance Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 3. Resizing logic
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // 4. Curated Lighting Matching AeroMESH Hero Identity with Enhanced Cyan Glow
    // Deep blue ambient base
    const ambientLight = new THREE.AmbientLight(0x0a1633, 1.5);
    scene.add(ambientLight);

    // Sky-blue / cool-white key light from top-left
    const keyLight = new THREE.DirectionalLight(0xe0f2fe, 2.5);
    keyLight.position.set(-2.5, 3.5, 3.0);
    scene.add(keyLight);

    // Electric cyan rim light from back-right
    const rimLight = new THREE.DirectionalLight(0x22d3ee, 4.2);
    rimLight.position.set(3.0, 2.5, -2.2);
    scene.add(rimLight);

    // Point light right behind cluster to illuminate edges with vivid cyan glow
    const cyanBackGlow = new THREE.PointLight(0x22d3ee, 5.0, 5);
    cyanBackGlow.position.set(0, 0.3, -0.7);
    scene.add(cyanBackGlow);

    // Subtle indigo/cyan under-bounce light
    const bounceLight = new THREE.DirectionalLight(0x6366f1, 1.5);
    bounceLight.position.set(0, -2.5, 1.5);
    scene.add(bounceLight);

    // Soft front accent point light
    const pointAccent = new THREE.PointLight(0x38bdf8, 2.0, 6);
    pointAccent.position.set(0.5, 1.2, 1.8);
    scene.add(pointAccent);

    // 5. Model Loading & Geometry Centering
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Base isometric orientation (showing front-three-quarter cluster depth)
    const baseRotX = 0.22;
    const baseRotY = -0.38;
    modelGroup.rotation.set(baseRotX, baseRotY, 0);

    const loader = new GLTFLoader();
    let loadedModel = null;

    // Load the attached cluster GLB
    loader.load(
      "/models/futuristic+laptop+cluster+3d+model.glb",
      (gltf) => {
        const root = gltf.scene;
        loadedModel = root;

        // Compute exact bounding box and center precisely at (0, 0, 0)
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        root.position.x = -center.x;
        root.position.y = -center.y;
        root.position.z = -center.z;

        // Apply scale fitting for generous negative space
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 1.05 / (maxDim || 1);
        root.scale.setScalar(targetScale);

        // Enhance metallic/roughness response
        root.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.roughness = Math.min(child.material.roughness || 0.45, 0.65);
            child.material.metalness = Math.max(child.material.metalness || 0.5, 0.4);
          }
        });

        modelGroup.add(root);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.min(100, Math.round((xhr.loaded / xhr.total) * 100));
          setLoadProgress(percent);
        }
      },
      (err) => {
        console.error("Error loading AeroMESH 3D cluster:", err);
        setLoading(false);
      }
    );

    // 6. Mouse Parallax (max 4–6 degrees = ~0.08 rad)
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handlePointerMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // 7. 60fps Animation Loop with Physics Lerp
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth mouse lerping
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Controlled idle floating (slow sin wave)
        const floatY = Math.sin(elapsedTime * 0.75) * 0.035;

        // Slight breathing rotation combined with cursor parallax
        const targetX = baseRotX - mouseY * 0.065 + Math.cos(elapsedTime * 0.5) * 0.012;
        const targetY = baseRotY + mouseX * 0.085 + Math.sin(elapsedTime * 0.4) * 0.015;

        modelGroup.rotation.x += (targetX - modelGroup.rotation.x) * 0.05;
        modelGroup.rotation.y += (targetY - modelGroup.rotation.y) * 0.05;
        modelGroup.position.y += (floatY - modelGroup.position.y) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Robust Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);

      if (loadedModel) {
        loadedModel.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m?.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
      }

      renderer.dispose();
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      id="aeromesh-hero-3d-model"
      style={{
        y: scrollY,
        scale: scrollScale,
        opacity: scrollOpacity,
      }}
      initial={{ opacity: 0, y: 35, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full lg:w-[50%] xl:w-[52%] h-[380px] sm:h-[460px] lg:h-[580px] flex items-center justify-center select-none overflow-visible pointer-events-none z-10 my-4 lg:my-0"
      aria-label="AeroMESH 3D Laptop Cluster Model"
    >
      {/* 1. Concentrated Core Cyan Glow behind the model */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] rounded-full blur-[65px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.38) 0%, rgba(56,189,248,0.24) 35%, rgba(99,102,241,0.12) 60%, transparent 75%)",
        }}
      />

      {/* 2. Expansive Pulsing Ambient Halo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[620px] h-[480px] sm:h-[620px] rounded-full blur-[105px] pointer-events-none z-0 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(56,189,248,0.14) 40%, transparent 70%)",
        }}
      />

      {/* 3. Under-Cluster Floor Glow Halo */}
      <div
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 w-[300px] sm:w-[420px] h-[55px] rounded-full pointer-events-none z-0 blur-[20px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(34,211,238,0.35) 0%, rgba(56,189,248,0.18) 45%, transparent 75%)",
        }}
      />

      {/* 4. Soft Contact Floor Shadow */}
      <div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-[260px] sm:w-[380px] h-[45px] rounded-full pointer-events-none z-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(34,211,238,0.12) 40%, transparent 75%)",
        }}
      />

      {/* 5. Three.js Transparent Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full block pointer-events-none"
      />

      {/* 6. Elegant Minimal HUD Loading State */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full border border-cyan-500/40 border-t-cyan-300 animate-spin flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#22D3EE]" />
          </div>
          <div className="mt-3 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/60 backdrop-blur-md">
            <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-300 uppercase font-semibold">
              LOADING MESH CLUSTER {loadProgress > 0 ? `· ${loadProgress}%` : ""}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
