"use client";

import Image from "next/image";
import { fontSpace } from "@/app/constants";

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center pt-20 pointer-events-none"
    >
      {/* Background nebula blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[40px]" 
          style={{ background: "radial-gradient(circle, hsl(260 80% 65% / 0.07) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full blur-[60px]"
          style={{ background: "radial-gradient(circle, hsl(195 100% 60% / 0.07) 0%, transparent 70%)" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-10 px-4 pb-4 pointer-events-auto">
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
          NeoPulse
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

      {/* Canvas viewport — EarthCanvas is mounted at root layout (PersistentEarthCanvas).
          This spacer preserves the vertical space in the page flow. */}
      <div
        aria-hidden="true"
        style={{ width: "100%", flex: 1, minHeight: 520, maxWidth: 900, pointerEvents: "none" }}
      />

      {/* Stats bar */}
      <footer className="relative z-10 w-full max-w-[672px] mx-auto px-6 pb-8 pt-2 flex justify-center pointer-events-auto">
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

      {/* Why Section */}
      <section className="relative z-10 w-full max-w-[1200px] mx-auto py-16 px-6 pointer-events-auto">
        {/* Section divider */}
        <div className="w-full h-px mb-16" style={{ background: "linear-gradient(90deg, transparent, hsl(220 20% 20%), transparent)" }} />

        <div className="text-center mb-12">
          <div className="mb-2">
            <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[hsl(195_100%_60%)]" style={{ ...fontSpace }}>
              ◈ The Stakes ◈
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
            WHY THIS EXISTS
          </h2>
          <p className=" text-white tracking-[0.05em] max-w-[620px] mx-auto"
            >
            We are one rock away from extinction. The dinosaurs had no warning. We do.
          </p>
        </div>

        {/* Main content: image + text */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 mb-12">

          {/* Image grid — 4 real Chelyabinsk/impact photos */}
          <div className="flex-1 grid grid-cols-2 gap-2">
            {[
              { src: "/assets/meteor_images/incident1.jpg", label: "Chelyabinsk fireball, 2013" },
              { src: "/assets/meteor_images/incident2.jpg", label: "Recovered meteorite fragment" },
              { src: "/assets/meteor_images/incident3.jpg", label: "Shockwave damage, Chelyabinsk" },
              { src: "/assets/meteor_images/incident4.jpg", label: "Barringer Crater, Arizona" },
            ].map((img) => (
              <div key={img.src} className="relative aspect-square rounded-xl overflow-hidden border border-[hsl(220_20%_16%)] group">
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                {/* Caption on hover */}
                <div className="absolute inset-x-0 bottom-0 px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ background: "linear-gradient(to top, hsl(220 30% 4% / 0.95) 60%, transparent)" }}>
                  <p className="text-[0.55rem] tracking-[0.1em] uppercase text-[hsl(195_100%_60%)] leading-tight" style={{ ...fontSpace }}>
                    {img.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Text content */}
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white leading-snug"
                style={{ ...fontSpace, fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
                One rock.{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ background: "linear-gradient(135deg, hsl(195 100% 70%), hsl(210 100% 80%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  1,500 people injured.
                </span>{" "}<br />
                Zero warning.
              </h3>

              <p className="text-white text-sm ">
                On the morning of February 15, 2013, a 20-metre asteroid entered Earth's atmosphere
                travelling at{" "}
                <span className="text-[hsl(195_100%_70%)] font-medium">60,000 km/h</span>. It exploded
                over Chelyabinsk, Russia, releasing energy equivalent to{" "}
                <span className="text-[hsl(195_100%_70%)] font-medium">30 Hiroshima bombs</span>. Windows
                shattered across six cities. Over 1,500 people were treated for injuries — mostly
                from flying glass caused by the shockwave. Not a single alarm was raised before impact.
              </p>

              <p className="text-white text-sm ">
                That was a small rock. The one that ended the dinosaurs was{" "}
                <span className="text-[hsl(195_100%_70%)] font-medium">10 kilometres wide</span>. It struck
                the Yucatan Peninsula 66 million years ago and wiped out{" "}
                <span className="bg-clip-text text-transparent font-semibold"
                  style={{ background: "linear-gradient(135deg, hsl(195 100% 70%), hsl(210 100% 80%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  75% of all life on Earth
                </span>
                . No species, however advanced, outran it. One impact is all it takes.
              </p>

              <p className="text-white text-sm">
                The difference between us and the dinosaurs is that we have telescopes, data, and
                the ability to act. NeoPulse exists to make sure that advantage is never wasted —
                turning raw NASA telemetry into clear, real-time awareness so that{" "}
                <span className="text-[hsl(195_100%_70%)] font-medium">when the next one comes, we are ready.</span>
              </p>
            </div>

          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-12 w-full flex justify-center">
          <p
            className="text-center font-semibold tracking-[0.06em] bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              background: "linear-gradient(135deg, hsl(195 100% 70%), hsl(210 100% 80%), hsl(260 80% 75%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
              ...fontSpace,
            }}
          >
            Somewhere out there, a rock with no name is deciding our future.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 w-full max-w-[1200px] mx-auto py-16 px-6 pointer-events-auto">
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
          <p className="text-white tracking-[0.05em] max-w-[600px] mx-auto" 
           >
            AI-powered analysis tools to monitor, predict, and understand asteroid threats
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 w-full">
          {[
            {
              title: "Earth Pulse",
              description: "A real-time health check on Earth's safety. Earth Pulse analyzes nearby asteroid activity and delivers an AI-powered summary of how safe our planet is right now.",
              image: "/assets/features_images/Earth_Pulse.png",
            },
            {
              title: "Impact Oracle",
              description: "Discover what would happen if an asteroid struck Earth. Using real NASA data, Impact Oracle calculates the hypothetical destruction level and paints a vivid picture of the aftermath.",
              image: "/assets/features_images/Impact_Analysis.png",
            },
            {
              title: "Stellar Autopsy",
              description: "Dissect any asteroid in detail. Stellar Autopsy examines all available NASA data on a selected object and delivers a complete AI-generated profile of its behavior and risk.",
              image: "/assets/features_images/Asteroid_Analysis.png",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="relative bg-[hsl(220_25%_7%)] border border-[hsl(220_20%_14%)] rounded-2xl overflow-hidden transition-all duration-300 ease-in-out cursor-pointer hover:border-[hsl(195_100%_60%_/_0.5)] hover:-translate-y-1"
            >
              {/* Feature Image */}
              <div className="relative w-full h-[200px] border-b border-[hsl(220_20%_14%)]">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
        
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
      <section className="relative z-10 w-full max-w-[1200px] mx-auto py-16 px-6 pointer-events-auto">
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
          <p className=" text-white tracking-[0.05em] max-w-[520px] mx-auto">
      
            From raw satellite telemetry to actionable insights  in three steps.
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
      <section className="relative z-10 w-full max-w-[1200px] mx-auto py-16 px-6 pointer-events-auto">
        {/* Section divider */}
        <div className="w-full h-px mb-16" style={{ background: "linear-gradient(90deg, transparent, hsl(220 20% 20%), transparent)" }} />

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Data Accuracy Image */}
          <div className="relative flex-shrink-0 w-full lg:w-[480px] h-[320px] rounded-2xl overflow-hidden border border-[hsl(220_20%_14%)]">
            <Image
              src="/data_accuracy.png"
              alt="Data Accuracy"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
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
              Every asteroid, trajectory, and close-approach figure you see on NeoPulse is sourced
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
      <footer className="relative z-10 w-full border-t border-[hsl(220_20%_14%)] mt-8 pointer-events-auto">
        <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-[hsl(195_100%_70%)] font-orbitron">
              NeoPulse
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
            For educational purposes only. &copy; {new Date().getFullYear()} NeoPulse.
          </p>

        </div>
      </footer>
    </div>
  );
}
