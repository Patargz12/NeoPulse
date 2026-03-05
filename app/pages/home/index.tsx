/**
 * ============================================================
 *  EARTH / NEO TRACKER COMPONENT
 * ============================================================
 *
 *  ── DEPENDENCIES ──────────────────────────────────────────
 *  Install these with npm / yarn / bun:
 *
 *    npm install three @react-three/fiber @react-three/drei
 *
 *  TypeScript types (dev):
 *    npm install -D @types/three
 *
 *  ── FONTS (optional but recommended) ──────────────────────
 *  Add this to your index.html <head>:
 *
 *    <link
 *      href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&display=swap"
 *      rel="stylesheet"
 *    />
 * ============================================================
 */

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { Suspense } from "react";
import { Scene } from "@/app/components/3d/Scene";
import { fontSpace, CAMERA_CONFIG } from "@/app/constants";

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center pt-20"
      style={{
        background: "radial-gradient(ellipse at center, hsl(220 30% 8%) 0%, hsl(220 30% 2%) 100%)",
      }}
    >
      {/* Background nebula blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[40px]" 
          style={{ background: "radial-gradient(circle, hsl(260 80% 65% / 0.07) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full blur-[60px]"
          style={{ background: "radial-gradient(circle, hsl(195 100% 60% / 0.07) 0%, transparent 70%)" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-10 px-4 pb-4">
        <div className="mb-2">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[hsl(195_100%_60%)]" style={{ ...fontSpace }}>
            ◈ Introducing ◈
          </span>
        </div>

        <h1 
          className="font-bold leading-[1.1] mb-3 bg-clip-text text-transparent"
          style={{
            ...fontSpace,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            background: "linear-gradient(135deg, hsl(195 100% 70%), hsl(210 100% 80%), hsl(260 80% 75%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
          NovaWatch
        </h1>

        <p className="font-light text-[hsl(215_20%_55%)] tracking-[0.05em] max-w-[600px] mx-auto mb-4" 
          style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}>
          The dinosaurs didn't see it coming. We will.
        </p>

      </header>

      {/* 3D Canvas */}
      <div style={{ position: "relative", width: "100%", flex: 1, minHeight: 520, maxWidth: 900 }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 50% 50%, hsl(195 100% 60% / 0.15) 0%, transparent 60%)", zIndex: 1 }} />
        <Canvas
          style={{ position: "absolute", inset: 0, zIndex: 2 }}
          camera={{ position: CAMERA_CONFIG.position, fov: CAMERA_CONFIG.fov }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene />
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

      {/* Stats bar */}
      <footer className="relative z-10 w-full max-w-[672px] mx-auto px-6 pb-8 pt-2 flex justify-center">
        <div className="flex items-stretch gap-3 bg-[hsl(220_25%_7%)] border border-[hsl(220_20%_20%)] rounded-2xl p-1.5 shadow-[0_4px_20px_hsl(220_30%_5%_/_0.5),inset_0_1px_0_hsl(195_100%_60%_/_0.1)]">
          {/* Earth Pulse Status */}
          <div className="flex items-center gap-3 bg-[hsl(220_25%_10%)] border border-[hsl(220_20%_18%)] rounded-xl py-5 px-6 min-w-[200px]">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[hsl(195_100%_60%_/_0.3)] shadow-[0_0_16px_hsl(195_100%_60%_/_0.3),inset_0_0_12px_hsl(195_100%_60%_/_0.1)]" 
              style={{ background: "radial-gradient(circle at 30% 30%, hsl(195 100% 60% / 0.2), hsl(195 100% 60% / 0.05))" }}>
              <div className="w-3 h-3 rounded-full bg-[hsl(195_100%_60%)] shadow-[0_0_8px_hsl(195_100%_60%),0_0_16px_hsl(195_100%_60%_/_0.5)] animate-pulse" />
            </div>
            <div className="flex-1">
              <p className="text-[0.65rem] tracking-[0.15em] uppercase text-[hsl(215_20%_60%)] mb-1 font-medium" 
                style={{ ...fontSpace }}>
                Earth Pulse
              </p>
              <p className="font-bold text-[1.1rem] text-[hsl(195_100%_70%)] tracking-[0.02em]"
                style={{ ...fontSpace }}>
                Monitoring
              </p>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2.5 bg-[hsl(220_25%_10%)] border border-[hsl(220_20%_18%)] rounded-xl py-5 px-6 min-w-[140px]">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[hsl(145_80%_50%_/_0.3)]"
              style={{ background: "radial-gradient(circle at 30% 30%, hsl(145 80% 50% / 0.2), hsl(145 80% 50% / 0.05))" }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[hsl(145_80%_50%)] shadow-[0_0_6px_hsl(145_80%_50%)]" />
            </div>
            <div className="flex-1">
              <p className="text-[0.65rem] tracking-[0.15em] uppercase text-[hsl(215_20%_60%)] mb-1 font-medium"
                style={{ ...fontSpace }}>
                Status
              </p>
              <p className="font-bold text-[1.1rem] text-[hsl(145_80%_60%)] tracking-[0.02em]"
                style={{ ...fontSpace }}>
                Good
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Features Section */}
      <section className="relative z-10 w-full max-w-[1200px] mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <div className="mb-2">
            <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[hsl(195_100%_60%)]" style={{ ...fontSpace }}>
              ◈ Advanced Capabilities ◈
            </span>
          </div>
          <h2 
            className="font-bold leading-[1.2] mb-3 bg-clip-text text-transparent"
            style={{
              ...fontSpace,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              background: "linear-gradient(135deg, hsl(195 100% 70%), hsl(210 100% 80%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            MISSION FEATURES
          </h2>
          <p className="font-light text-[hsl(215_20%_55%)] tracking-[0.05em] max-w-[600px] mx-auto" 
            style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}>
            AI-powered analysis tools to monitor, predict, and understand asteroid threats
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 w-full">
          {[
            {
              title: "Earth Pulse",
              description: "A real-time health check on Earth's safety. Earth Pulse analyzes nearby asteroid activity and delivers an AI-powered summary of how safe our planet is right now.",
              icon: "🌍",
              gradient: "linear-gradient(135deg, hsl(195 100% 60% / 0.15), hsl(210 100% 60% / 0.15))",
            },
            {
              title: "Impact Oracle",
              description: "Discover what would happen if an asteroid struck Earth. Using real NASA data, Impact Oracle calculates the hypothetical destruction level and paints a vivid picture of the aftermath.",
              icon: "💥",
              gradient: "linear-gradient(135deg, hsl(260 80% 65% / 0.15), hsl(280 70% 60% / 0.15))",
            },
            {
              title: "Stellar Autopsy",
              description: "Dissect any asteroid in detail. Stellar Autopsy examines all available NASA data on a selected object and delivers a complete AI-generated profile of its behavior and risk.",
              icon: "🔬",
              gradient: "linear-gradient(135deg, hsl(340 100% 60% / 0.15), hsl(360 80% 65% / 0.15))",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="relative bg-[hsl(220_25%_7%)] border border-[hsl(220_20%_14%)] rounded-2xl overflow-hidden transition-all duration-300 ease-in-out cursor-pointer hover:border-[hsl(195_100%_60%_/_0.5)] hover:-translate-y-1"
            >
              {/* Feature Image Placeholder */}
              <div 
                className="relative w-full h-[200px] flex items-center justify-center border-b border-[hsl(220_20%_14%)]"
                style={{ background: feature.gradient }}>
                <div className="text-6xl" style={{ filter: "grayscale(20%) brightness(1.1)" }}>
                  {feature.icon}
                </div>
                <div className="absolute top-3 right-3 py-1 px-2.5 rounded-full bg-[hsl(220_25%_7%_/_0.8)] backdrop-blur-sm border border-[hsl(195_100%_60%_/_0.3)]">
                  <span className="text-[0.55rem] tracking-[0.15em] text-[hsl(195_100%_60%)]" style={{ ...fontSpace }}>
                    AI POWERED
                  </span>
                </div>
              </div>

              {/* Feature Content */}
              <div className="p-6">
                <h3 className="font-bold text-xl tracking-[0.05em] text-[hsl(210_40%_95%)] mb-3 uppercase" style={{ ...fontSpace }}>
                  {feature.title}
                </h3>
                <p className="font-light text-[hsl(215_20%_65%)] text-[0.9rem] leading-[1.6] tracking-[0.02em]">
                  {feature.description}
                </p>
                <div className="mt-5 flex items-center gap-2 text-[hsl(195_100%_60%)] text-xs tracking-[0.1em] uppercase" style={{ ...fontSpace }}>
                  <span>Explore Feature</span>
                  <span className="text-[0.6rem]">→</span>
                </div>
              </div>

              {/* Subtle glow effect */}
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-px opacity-0 transition-opacity duration-300 ease-in-out card-glow"
                style={{ background: "linear-gradient(90deg, transparent, hsl(195 100% 60% / 0.5), transparent)" }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
