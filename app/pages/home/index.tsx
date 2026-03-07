"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { Suspense, Component, type ReactNode } from "react";
import { Scene } from "@/app/components/3d/Scene";
import { fontSpace, CAMERA_CONFIG } from "@/app/constants";

// ─── WebGL support check ──────────────────────────────────────────────────────
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// ─── Error boundary for the Canvas ───────────────────────────────────────────
interface CanvasBoundaryState { hasError: boolean }
class CanvasErrorBoundary extends Component<{ children: ReactNode }, CanvasBoundaryState> {
  state: CanvasBoundaryState = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <WebGLFallback />;
    return this.props.children;
  }
}

function WebGLFallback() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full gap-3"
      style={{ minHeight: 520 }}
    >
      <div className="text-5xl">🌍</div>
      <p className="text-white text-sm text-center max-w-xs" style={{ ...fontSpace }}>
        3D view unavailable — WebGL is disabled in your browser.
        <br />
        <span className="text-[hsl(195_100%_60%)]">Enable hardware acceleration</span> in browser settings to see the interactive globe.
      </p>
    </div>
  );
}

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

        <p
          className="font-light tracking-[0.08em] max-w-[600px] mx-auto mb-4 text-[hsl(215_20%_65%)]"
          style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)", ...fontSpace }}>
          The dinosaurs didn't see it coming.{" "}
          <span
            className="font-bold bg-clip-text text-transparent"
            style={{
              background: "linear-gradient(135deg, hsl(195 100% 70%), hsl(210 100% 80%), hsl(260 80% 75%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            We will.
          </span>
        </p>

      </header>

      {/* 3D Canvas */}
      <div style={{ position: "relative", width: "100%", flex: 1, minHeight: 520, maxWidth: 900 }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 50% 50%, hsl(195 100% 60% / 0.15) 0%, transparent 60%)", zIndex: 1 }} />
        <CanvasErrorBoundary>
          {typeof window !== "undefined" && !isWebGLAvailable() ? (
            <WebGLFallback />
          ) : (
            <Canvas
              style={{ position: "absolute", inset: 0, zIndex: 2 }}
              camera={{ position: CAMERA_CONFIG.position, fov: CAMERA_CONFIG.fov }}
              gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
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
          )}
        </CanvasErrorBoundary>
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
            </div>ww
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
            CORE FEATURES
          </h2>
          <p className="font-light text-white tracking-[0.05em] max-w-[600px] mx-auto" 
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
                <h3 className="font-bold text-xl tracking-[0.05em] text-[hsl(195_100%_60%)] mb-3 uppercase" style={{ ...fontSpace }}>
                  {feature.title}
                </h3>
                <p className="font-light text-white text-sm ">
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

      {/* How It Works Section */}
      <section className="relative z-10 w-full max-w-[1200px] mx-auto py-16 px-6">
        {/* Section divider */}
        <div className="w-full h-px mb-16" style={{ background: "linear-gradient(90deg, transparent, hsl(220 20% 20%), transparent)" }} />

        {/* Header */}
        <div className="text-center mb-14">
          <div className="mb-2">
            <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[hsl(195_100%_60%)]" style={{ ...fontSpace }}>
              ◈ Under The Hood ◈
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
            HOW IT WORKS
          </h2>
          <p className="font-light text-[hsl(215_20%_65%)] tracking-[0.05em] max-w-[520px] mx-auto"
            style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}>
            From raw satellite telemetry to actionable insights — in three steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col lg:flex-row items-stretch gap-6">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px"
            style={{ background: "linear-gradient(90deg, hsl(195 100% 60% / 0.15), hsl(195 100% 60% / 0.4), hsl(195 100% 60% / 0.15))" }} />

          {[
            {
              step: "01",
              icon: "🛰️",
              title: "NASA Feeds the Data",
              description: "Close-approach records, orbital parameters, and hazard classifications are ingested live from NASA's Near Earth Object Web Service — the gold standard in planetary tracking.",
              accent: "hsl(195 100% 60%)",
              glow: "hsl(195 100% 60% / 0.2)",
            },
            {
              step: "02",
              icon: "🤖",
              title: "AI Analyzes & Scores",
              description: "Our models process every data point — size, velocity, miss distance, trajectory — and translate the raw numbers into clear threat levels and natural-language summaries.",
              accent: "hsl(260 80% 75%)",
              glow: "hsl(260 80% 65% / 0.2)",
            },
            {
              step: "03",
              icon: "📡",
              title: "You Get Clear Answers",
              description: "Explore the asteroid catalog, run impact simulations, check Earth's live safety status, and get deep-dive profiles — all without needing a PhD in astrophysics.",
              accent: "hsl(145 80% 55%)",
              glow: "hsl(145 80% 50% / 0.2)",
            },
          ].map((item, i) => (
            <div
              key={item.step}
              className="relative flex-1 bg-[hsl(220_25%_7%)] border border-[hsl(220_20%_14%)] rounded-2xl overflow-hidden transition-all duration-300 ease-in-out hover:border-[hsl(220_20%_22%)] hover:-translate-y-1"
            >
              {/* Top accent bar */}
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }} />

              <div className="p-7 flex flex-col gap-5">
                {/* Step number + icon row */}
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl border"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${item.glow}, transparent 70%)`,
                      borderColor: `${item.accent}40`,
                    }}>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <span
                    className="font-bold tracking-[0.05em] opacity-80 select-none"
                    style={{ ...fontSpace, fontSize: "clamp(2rem, 4vw, 2.5rem)", color: item.accent }}>
                    {item.step}
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2.5">
                  <h3
                    className="font-bold tracking-[0.05em] uppercase"
                    style={{ ...fontSpace, fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: item.accent }}>
                    {item.title}
                  </h3>
                  <p className="font-light text-white leading-[1.7] tracking-[0.02em] text-[0.875rem]">
                    {item.description}
                  </p>
                </div>

                {/* Step connector arrow — mobile only */}
                {i < 2 && (
                  <div className="lg:hidden flex justify-center pt-1">
                    <span className="text-[hsl(195_100%_60%_/_0.3)] text-lg">↓</span>
                  </div>
                )}
              </div>

              {/* Bottom glow */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${item.accent}40, transparent)` }} />
            </div>
          ))}
        </div>
      </section>

      {/* Data Accuracy Section */}
      <section className="relative z-10 w-full max-w-[1200px] mx-auto py-16 px-6">
        {/* Section divider */}
        <div className="w-full h-px mb-16" style={{ background: "linear-gradient(90deg, transparent, hsl(220 20% 20%), transparent)" }} />

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Image placeholder */}
          <div className="relative flex-shrink-0 w-full lg:w-[480px] h-[320px] rounded-2xl overflow-hidden border border-[hsl(220_20%_14%)]"
            style={{ background: "linear-gradient(135deg, hsl(220 25% 7%), hsl(220 30% 10%))" }}>
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(hsl(195 100% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(195 100% 60%) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }} />
            {/* Center badge */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full border-2 border-[hsl(195_100%_60%_/_0.4)] flex items-center justify-center"
                style={{ background: "radial-gradient(circle at 30% 30%, hsl(195 100% 60% / 0.15), hsl(195 100% 60% / 0.03))" }}>
                <span className="text-3xl">🛰️</span>
              </div>
              <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[hsl(195_100%_60%_/_0.5)]" style={{ ...fontSpace }}>
                Image Coming Soon
              </span>
            </div>
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[hsl(195_100%_60%_/_0.3)] rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[hsl(195_100%_60%_/_0.3)] rounded-br-2xl" />
          </div>

          {/* Text content */}
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[hsl(195_100%_60%)]" style={{ ...fontSpace }}>
                ◈ Trusted Source ◈
              </span>
            </div>

            <h2
              className="font-bold leading-[1.2] bg-clip-text text-transparent"
              style={{
                ...fontSpace,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                background: "linear-gradient(135deg, hsl(195 100% 70%), hsl(210 100% 80%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              DATA ACCURACY
            </h2>

            <p className="font-light text-white leading-[1.8] tracking-[0.02em]"
              style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)" }}>
              Every asteroid, trajectory, and close-approach figure you see on NovaWatch is sourced
              directly from{" "}
              <span className="font-semibold text-[hsl(195_100%_70%)]">NASA's Near Earth Object Web Service (NeoWs)</span>
              {" "}— the same authoritative dataset used by planetary scientists worldwide. No
              estimates, no guesswork.
            </p>

            <p className="font-light text-white leading-[1.8] tracking-[0.02em]"
              style={{ fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)" }}>
              When it comes to planetary defense, precision isn't optional. You can rest assured
              that the data powering every alert, analysis, and prediction here is as accurate as
              the science gets.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mt-2">
              {["NASA NeoWs API", "Real-Time Updates", "Verified Trajectories"].map((badge) => (
                <div key={badge}
                  className="flex items-center gap-2 py-1.5 px-3.5 rounded-full border border-[hsl(195_100%_60%_/_0.25)] bg-[hsl(195_100%_60%_/_0.05)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[hsl(145_80%_50%)] shadow-[0_0_6px_hsl(145_80%_50%)]" />
                  <span className="text-[0.65rem] tracking-[0.1em] uppercase text-white" style={{ ...fontSpace }}>
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-[hsl(220_20%_14%)] mt-8">
        <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-[hsl(195_100%_70%)] font-orbitron">
              NovaWatch
            </span>
            <span className="text-[0.7rem] text-white tracking-[0.05em]">
              Asteroid monitoring powered by NASA NeoWs
            </span>
          </div>

     

          {/* Legal */}
          <p className="text-[0.65rem] text-white tracking-[0.03em] text-center md:text-right">
            Data sourced from{" "}
            <span className="text-white">NASA NeoWs</span>.
            <br />
            For educational purposes only. &copy; {new Date().getFullYear()} NovaWatch.
          </p>

        </div>
      </footer>
    </div>
  );
}
