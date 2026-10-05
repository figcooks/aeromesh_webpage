"use client";

/**
 * HeroModelPlaceholder
 *
 * Dedicated invisible container reserved for the future AeroMESH 3D model
 * (GLTF / GLB / Three.js Canvas / React Three Fiber / Transparent Render).
 *
 * Layout coordinates:
 * - Positioned on the right side of the hero (48% - 55% width on desktop)
 * - Above the HeroBackground (z-0), below text/modals/nav (z-20/z-50)
 * - Zero borders, zero placeholder text, completely invisible until populated
 */
export default function HeroModelPlaceholder() {
  return (
    <div
      id="aeromesh-hero-model"
      className="pointer-events-none select-none z-10 w-full lg:w-[52%] xl:w-[55%] h-[340px] sm:h-[420px] lg:h-full lg:absolute lg:right-0 lg:top-0 flex items-center justify-center overflow-visible"
      aria-hidden="true"
    >
      {/* 
        This container is deliberately empty.
        Replace this component or inject your Three.js / R3F Canvas here when ready:
        <Canvas> ... </Canvas> or <AeroMesh3DModel />
      */}
    </div>
  );
}
