"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useTheme } from "./ThemeContext";

/**
 * HeroModel3D
 *
 * 3D Visualization of 3 laptops rotating in a circular formation in the hero section:
 * - 4x size scaling with circular formation (120° apart)
 * - Shifted rightward into hero layout without lateral cropping
 * - Multi-source electric blue and cyan lighting with specular reflections
 *   across the laptop chassis, screens, keyboards, and hinges
 * - Holographic cyber ring on the floor platform
 * - Smooth physics-based mouse cursor parallax
 * - Full light mode and dark mode dynamic support
 * - Smooth scroll-driven exit transition
 */
export default function HeroModel3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const themeRef = useRef(isDark);

  useEffect(() => {
    themeRef.current = isDark;
  }, [isDark]);

  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Scroll integration: model smoothly glides upward and scales down with hero exit
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
    // 47° FOV with distance 5.7 provides optimal framing and zero edge cropping
    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
    // Right offset within the 3D scene (x = 0.22) shifting the cluster towards the right side
    const rightOffset = 0.22;
    camera.position.set(rightOffset, 1.8, 5.7);
    camera.lookAt(rightOffset, 0.15, 0);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 3. Resizing Logic
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

    // 4. Master Cluster Group
    const clusterGroup = new THREE.Group();
    clusterGroup.position.set(rightOffset, 0.15, 0);
    scene.add(clusterGroup);

    // 5. Curated Electric Blue Lighting Rig Reflecting on Metallic Laptop Chassis
    // Ambient fill (dynamically responsive to theme)
    const ambientLight = new THREE.AmbientLight(
      themeRef.current ? 0x0a1945 : 0xe0f2fe,
      themeRef.current ? 1.4 : 2.5
    );
    scene.add(ambientLight);

    // Overhead High-Intensity Blue Spotlight
    const blueSpotLight = new THREE.SpotLight(0x00c8ff, 15, 18, Math.PI / 3, 0.35);
    blueSpotLight.position.set(rightOffset, 7.0, 3.5);
    blueSpotLight.target = clusterGroup;
    scene.add(blueSpotLight);

    // Primary Top Key Light (Sky-Blue Specular Highlight)
    const topKeyLight = new THREE.DirectionalLight(0x38bdf8, 5.5);
    topKeyLight.position.set(rightOffset - 2.5, 6.0, 4.0);
    scene.add(topKeyLight);

    // Intense Electric Cyan Rim Light (Right Flank)
    const rimLight = new THREE.DirectionalLight(0x00d2ff, 6.5);
    rimLight.position.set(rightOffset + 4.5, 4.0, 2.5);
    scene.add(rimLight);

    // Back Blue Silhouette Light
    const backLight = new THREE.DirectionalLight(0x1d4ed8, 5.5);
    backLight.position.set(rightOffset, 4.5, -4.5);
    scene.add(backLight);

    // Soft daylight fill light for light mode clarity
    const daylightFillLight = new THREE.DirectionalLight(0xffffff, themeRef.current ? 0.3 : 1.8);
    daylightFillLight.position.set(rightOffset - 3.0, 3.0, 5.0);
    scene.add(daylightFillLight);

    // Central Blue Core Light situated in the center of the 3 laptops
    const centralCoreLight = new THREE.PointLight(0x00a8ff, 10.5, 7);
    centralCoreLight.position.set(0, 0.3, 0);
    clusterGroup.add(centralCoreLight);

    // Lower Central Blue Bounce
    const centralLowerLight = new THREE.PointLight(0x0066ff, 7.5, 6);
    centralLowerLight.position.set(0, -0.4, 0);
    clusterGroup.add(centralLowerLight);

    // Under-Chassis Floor Blue Bounce
    const floorBounceLight = new THREE.DirectionalLight(0x0ea5e9, 3.5);
    floorBounceLight.position.set(rightOffset, -3.5, 2.0);
    scene.add(floorBounceLight);

    // Dynamic Sweeping Blue Point Light
    const orbitLight = new THREE.PointLight(0x00e1ff, 7.5, 8);
    scene.add(orbitLight);

    // 6. Holographic Floor Platform Rings (Under the laptops inside clusterGroup)
    const ringGeo = new THREE.RingGeometry(1.30, 1.34, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00c8ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.38;
    clusterGroup.add(ring);

    const outerRingGeo = new THREE.RingGeometry(1.72, 1.76, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x0077ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = -Math.PI / 2;
    outerRing.position.y = -0.38;
    clusterGroup.add(outerRing);

    // 7. Carousel Group for Rotating the 3 Laptops
    const carouselGroup = new THREE.Group();
    clusterGroup.add(carouselGroup);

    // Base tilt for stylish isometric perspective
    const baseTiltX = 0.22;
    carouselGroup.rotation.x = baseTiltX;

    const loader = new GLTFLoader();
    let loadedClones = [];
    let laptopMaterials = [];

    loader.load(
      "/models/laptop.glb",
      (gltf) => {
        const root = gltf.scene;

        // Calculate single laptop bounding box
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        // Perfectly calibrated scale: substantial & bold presence while fitting cleanly without overlap
        const scaleFactor = 1.02 / (maxDim || 1);

        // Adjust materials for high metallic luster and brilliant blue specular reflection
        root.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material = child.material.clone();
            child.material.metalness = 0.88;
            child.material.roughness = 0.26;
            child.material.envMapIntensity = 2.5;

            // Base emissive to keep rich specular contrast
            child.material.emissive = new THREE.Color(
              themeRef.current ? 0x001f3f : 0x001122
            );
            child.material.emissiveIntensity = themeRef.current ? 0.3 : 0.15;
            laptopMaterials.push(child.material);
          }
        });

        // Create 3 laptops arranged circular in 120° increments
        const count = 3;
        // Orbit radius 1.36 guarantees generous ~1.34 unit separation between nodes (zero overlap)
        const radius = 1.36;

        for (let i = 0; i < count; i++) {
          const angle = (i * 2 * Math.PI) / count;
          const laptopInstance = root.clone(true);

          // Center the laptop model within its pivot
          laptopInstance.position.set(
            -center.x * scaleFactor,
            -center.y * scaleFactor,
            -center.z * scaleFactor
          );
          laptopInstance.scale.setScalar(scaleFactor);

          // Individual Pivot Group
          const laptopPivot = new THREE.Group();
          laptopPivot.position.set(
            Math.sin(angle) * radius,
            0,
            Math.cos(angle) * radius
          );

          // Orientation: screen angled outward and tilted slightly upward for optimum reflection
          laptopPivot.rotation.y = angle + Math.PI;
          laptopPivot.rotation.x = 0.16; // Upward tilt showcasing keyboard & screen

          laptopPivot.add(laptopInstance);
          carouselGroup.add(laptopPivot);
          loadedClones.push(laptopPivot);
        }

        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.min(100, Math.round((xhr.loaded / xhr.total) * 100));
          setLoadProgress(percent);
        }
      },
      (err) => {
        console.error("Error loading laptop.glb:", err);
        setLoading(false);
      }
    );

    // 8. Mouse Parallax Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handlePointerMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // 9. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const currentDark = themeRef.current;

      // Dynamically adjust ambient lighting when theme changes
      ambientLight.color.setHex(currentDark ? 0x0a1945 : 0xe0f2fe);
      ambientLight.intensity = currentDark ? 1.4 : 2.5;
      daylightFillLight.intensity = currentDark ? 0.3 : 1.8;

      laptopMaterials.forEach((mat) => {
        mat.emissive.setHex(currentDark ? 0x001f3f : 0x001122);
        mat.emissiveIntensity = currentDark ? 0.3 : 0.15;
      });

      // Continuous Circular Rotation of the 3 Laptops
      if (!prefersReducedMotion) {
        // Rotate carousel smoothly around Y-axis
        carouselGroup.rotation.y = elapsedTime * 0.45;

        // Smooth mouse parallax lerp
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Gentle floating wave (sine)
        const floatY = Math.sin(elapsedTime * 1.1) * 0.04;
        carouselGroup.position.y = floatY;

        // Tilt carousel slightly with mouse position
        const targetRotX = baseTiltX - mouseY * 0.05;
        const targetRotZ = mouseX * 0.035;
        carouselGroup.rotation.x += (targetRotX - carouselGroup.rotation.x) * 0.05;
        carouselGroup.rotation.z += (targetRotZ - carouselGroup.rotation.z) * 0.05;

        // Dynamic orbiting blue light (sweeps across laptops)
        const lightAngle = -elapsedTime * 0.75;
        orbitLight.position.set(
          rightOffset + Math.sin(lightAngle) * 2.4,
          1.8,
          Math.cos(lightAngle) * 2.4
        );
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);

      loadedClones.forEach((pivot) => {
        pivot.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m?.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
      });

      ringGeo.dispose();
      ringMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();

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
      className="relative w-full lg:w-[55%] xl:w-[56%] h-[520px] sm:h-[600px] lg:h-[700px] xl:h-[740px] flex items-center justify-center select-none overflow-visible pointer-events-none z-10 -mt-4 sm:-mt-8 lg:-mt-10 mb-4 lg:mb-0 lg:translate-x-6 xl:translate-x-8"
      aria-label="AeroMESH 3D Rotating Laptop Cluster"
    >
      {/* 1. Concentrated Core Blue Glow behind the 3 rotating laptops */}
      <div
        className="absolute top-[48%] left-[54%] -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[540px] h-[420px] sm:h-[540px] rounded-full blur-[80px] pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(14,165,233,0.38) 0%, rgba(37,99,235,0.25) 35%, rgba(99,102,241,0.12) 65%, transparent 80%)"
            : "radial-gradient(circle, rgba(14,165,233,0.22) 0%, rgba(56,189,248,0.12) 35%, rgba(99,102,241,0.06) 65%, transparent 80%)",
        }}
      />

      {/* 2. Expansive Pulsing Ambient Blue Halo */}
      <div
        className="absolute top-[48%] left-[54%] -translate-x-1/2 -translate-y-1/2 w-[560px] sm:w-[720px] h-[560px] sm:h-[720px] rounded-full blur-[130px] pointer-events-none z-0 animate-pulse transition-opacity duration-300"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(56,189,248,0.15) 40%, transparent 75%)"
            : "radial-gradient(circle, rgba(56,189,248,0.14) 0%, rgba(14,165,233,0.08) 40%, transparent 75%)",
        }}
      />

      {/* 3. Under-Cluster Floor Glow Halo */}
      <div
        className="absolute bottom-8 sm:bottom-12 left-[54%] -translate-x-1/2 w-[380px] sm:w-[520px] h-[70px] rounded-full pointer-events-none z-0 blur-[25px] transition-opacity duration-300"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, rgba(34,211,238,0.35) 0%, rgba(37,99,235,0.2) 45%, transparent 75%)"
            : "radial-gradient(ellipse at center, rgba(34,211,238,0.18) 0%, rgba(14,165,233,0.1) 45%, transparent 75%)",
        }}
      />

      {/* 4. Soft Contact Floor Shadow */}
      <div
        className="absolute bottom-6 sm:bottom-10 left-[54%] -translate-x-1/2 w-[340px] sm:w-[480px] h-[55px] rounded-full pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(14,165,233,0.15) 45%, transparent 75%)"
            : "radial-gradient(ellipse at center, rgba(100,116,139,0.18) 0%, rgba(14,165,233,0.06) 45%, transparent 75%)",
        }}
      />

      {/* 5. Three.js Transparent Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full block pointer-events-none"
      />

      {/* 6. Minimal HUD Loading State */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full border border-cyan-500/40 border-t-cyan-300 animate-spin flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#22D3EE]" />
          </div>
          <div
            className={`mt-3 px-3 py-1 rounded-full border backdrop-blur-md ${
              isDark
                ? "border-cyan-500/30 bg-cyan-950/60"
                : "border-sky-300 bg-white/80"
            }`}
          >
            <span
              className={`text-[10px] font-mono tracking-[0.2em] uppercase font-semibold ${
                isDark ? "text-cyan-300" : "text-sky-700"
              }`}
            >
              INITIALIZING LAPTOP MESH {loadProgress > 0 ? `· ${loadProgress}%` : ""}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
