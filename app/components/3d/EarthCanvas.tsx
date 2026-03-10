"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, Html, useProgress } from "@react-three/drei";
import { Scene } from "./Scene";
import { CAMERA_CONFIG, fontSpace } from "@/app/constants";

// ─── In-canvas progress indicator (renders inside WebGL context via Html) ─────
function SceneLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div
        style={{
          color: "hsl(195, 100%, 70%)",
          textAlign: "center",
          userSelect: "none",
          ...fontSpace,
        }}
      >
        <div
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            marginBottom: "0.5rem",
          }}
        >
          LOADING {Math.round(progress)}%
        </div>
        <div
          style={{
            width: 120,
            height: 2,
            background: "hsl(220, 20%, 20%)",
            borderRadius: 2,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "hsl(195, 100%, 60%)",
              borderRadius: 2,
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </div>
    </Html>
  );
}

// ─── Lazy-loadable Canvas wrapper ─────────────────────────────────────────────
interface EarthCanvasProps {
  onReady?: () => void;
  frameloop?: "always" | "never" | "demand";
}

export function EarthCanvas({ onReady, frameloop = "always" }: EarthCanvasProps) {
  const [ready, setReady] = useState(false);

  function handleReady() {
    setReady(true);
    onReady?.();
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        opacity: ready ? 1 : 0,
        transition: "opacity 700ms ease",
      }}
    >
      <Canvas
        frameloop={frameloop}
        style={{ position: "absolute", inset: 0 }}
        camera={{ position: CAMERA_CONFIG.position, fov: CAMERA_CONFIG.fov }}
        gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
      >
        <Suspense fallback={<SceneLoader />}>
          <Scene onReady={handleReady} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            dampingFactor={0.08}
            enableDamping
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default EarthCanvas;
