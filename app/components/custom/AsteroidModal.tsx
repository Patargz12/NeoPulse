"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AsteroidData } from "@/app/constants/mockAsteroids";

interface AsteroidModalProps {
  asteroid: AsteroidData;
  onClose: () => void;
}

const THREAT_IMAGE: Record<AsteroidData["threatLevel"], string> = {
  low: "/assets/low_threat.png",
  moderate: "/assets/medium_threat.png",
  high: "/assets/high_threat.png",
};

const THREAT_COLORS: Record<
  AsteroidData["threatLevel"],
  { bg: string; text: string; glow: string; badge: string }
> = {
  low: {
    bg: "hsl(145 80% 50%)",
    text: "hsl(145 80% 65%)",
    glow: "hsl(145 80% 50% / 0.35)",
    badge: "bg-[hsl(145_80%_50%/0.15)] border-[hsl(145_80%_50%/0.4)] text-[hsl(145_80%_65%)]",
  },
  moderate: {
    bg: "hsl(45 100% 55%)",
    text: "hsl(45 100% 65%)",
    glow: "hsl(45 100% 55% / 0.35)",
    badge: "bg-[hsl(45_100%_55%/0.15)] border-[hsl(45_100%_55%/0.4)] text-[hsl(45_100%_65%)]",
  },
  high: {
    bg: "hsl(0 85% 60%)",
    text: "hsl(0 85% 65%)",
    glow: "hsl(0 85% 60% / 0.35)",
    badge: "bg-[hsl(0_85%_60%/0.15)] border-[hsl(0_85%_60%/0.4)] text-[hsl(0_85%_65%)]",
  },
};

function StatRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[hsl(220_20%_14%)] last:border-0">
      <span className="text-xs text-[hsl(215_20%_55%)]">
        {label}
      </span>
      <span
        className="font-medium text-sm"
        style={{ color: valueColor ?? "hsl(210 40% 90%)" }}
      >
        {value}
      </span>
    </div>
  );
}

export default function AsteroidModal({ asteroid, onClose }: AsteroidModalProps) {
  const colors = THREAT_COLORS[asteroid.threatLevel];
  const imgSrc = THREAT_IMAGE[asteroid.threatLevel];

  const [llmText, setLlmText] = useState<string | null>(null);
  const [llmLoading, setLlmLoading] = useState(true);
  const [llmStreaming, setLlmStreaming] = useState(false);
  const [llmError, setLlmError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  const retryAnalysis = () => {
    setLlmLoading(true);
    setLlmStreaming(false);
    setLlmError(null);
    setLlmText(null);
    setFetchKey((k) => k + 1);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Stream LLM impact analysis on open (and on retry via fetchKey)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/nova", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: asteroid.name,
            diameterMin: asteroid.diameterMin,
            diameterMax: asteroid.diameterMax,
            velocity: asteroid.velocity,
            missDistance: asteroid.missDistance,
            threatLevel: asteroid.threatLevel,
            isHazardous: asteroid.isHazardous,
            classification: asteroid.classification,
            approachDate: asteroid.approachDate,
          }),
        });

        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        if (!res.body) throw new Error("No response body");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let firstToken = true;

        while (true) {
          const { done, value } = await reader.read();
          if (done || cancelled) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const json = line.slice(6).trim();
            if (json === "[DONE]") break;
            try {
              const parsed = JSON.parse(json);
              const token: string | undefined = parsed.choices?.[0]?.delta?.content;
              if (token) {
                if (firstToken && !cancelled) {
                  setLlmLoading(false);
                  setLlmStreaming(true);
                  firstToken = false;
                }
                if (!cancelled) setLlmText((prev) => (prev ?? "") + token);
              }
            } catch {
              // skip malformed SSE chunks
            }
          }
        }
      } catch (err) {
        if (!cancelled) setLlmError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        if (!cancelled) {
          setLlmLoading(false);
          setLlmStreaming(false);
        }
      }
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchKey]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    /* ── Backdrop ─────────────────────────────────────────────────────────── */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "hsl(220 30% 2% / 0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      {/* ── Modal Shell ──────────────────────────────────────────────────── */}
      <div
        className="relative w-full max-w-3xl rounded-3xl overflow-hidden border border-[hsl(220_20%_18%)] shadow-[0_24px_80px_hsl(220_30%_2%/0.8)]"
        style={{
          background: "hsl(220 25% 7%)",
          boxShadow: `0 0 0 1px hsl(220 20% 18%), 0 24px 80px hsl(220 30% 2% / 0.8), 0 0 60px ${colors.glow}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Close Button ─────────────────────────────────────────────── */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-xl flex items-center justify-center bg-[hsl(220_25%_12%)] border border-[hsl(220_20%_20%)] text-[hsl(215_20%_55%)] hover:text-[hsl(210_40%_90%)] hover:border-[hsl(215_20%_35%)] transition-all duration-200"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* ────────────────────── TOP: Threat Image ───────────────────── */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "260px", background: "hsl(220 25% 5%)" }}
        >
          {/* Gradient overlay at bottom of image */}
          <div
            className="absolute inset-x-0 bottom-0 h-24 z-10"
            style={{
              background: "linear-gradient(to bottom, transparent, hsl(220 25% 7%))",
            }}
          />

          {/* Threat glow tint overlay */}
          <div
            className="absolute inset-0 z-10 opacity-20"
            style={{
              background: `radial-gradient(ellipse at center, ${colors.bg}, transparent 70%)`,
            }}
          />

          <Image
            src={imgSrc}
            alt={`${asteroid.threatLevel} threat asteroid`}
            fill
            className="object-cover object-center"
            priority
          />

          {/* Floating name + threat badge */}
          <div className="absolute bottom-4 left-5 z-20 flex items-end gap-3">
            <div>
              <p className="text-[0.65rem] tracking-wide uppercase text-[hsl(195_100%_60%)] mb-1">
                Near-Earth Object
              </p>
              <h2 className="text-2xl font-bold text-[hsl(210_40%_97%)] leading-tight">
                {asteroid.name}
              </h2>
            </div>
            <span
              className={`mb-0.5 px-3 py-1 rounded-lg text-[0.65rem] uppercase tracking-wide font-semibold border ${colors.badge}`}
            >
              {asteroid.threatLevel} threat
            </span>
          </div>
        </div>

        {/* ────────────────── BOTTOM ROW: Data + LLM ────────────────────── */}
        <div className="grid grid-cols-2 gap-4 p-5">

          {/* ── Left Panel: Asteroid Data ──────────────────────────────── */}
          <div
            className="rounded-2xl border border-[hsl(220_20%_14%)] overflow-hidden"
            style={{ background: "hsl(220 25% 9%)" }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[hsl(220_20%_14%)] bg-[hsl(220_25%_11%)]">
              <span className="text-base">🪨</span>
              <span className="text-xs font-semibold tracking-wide uppercase text-[hsl(195_100%_65%)]">
                Asteroid Data
              </span>
            </div>

            {/* Stats */}
            <div className="px-4 py-1">
              <StatRow label="Classification" value={asteroid.classification} valueColor="hsl(260 80% 70%)" />
              <StatRow
                label="Diameter"
                value={`${asteroid.diameterMin} – ${asteroid.diameterMax} m`}
                valueColor="hsl(210 40% 90%)"
              />
              <StatRow
                label="Miss Distance"
                value={`${asteroid.missDistance.toFixed(2)} lunar dist`}
                valueColor="hsl(195 100% 70%)"
              />
              <StatRow
                label="Velocity"
                value={`${asteroid.velocity.toLocaleString()} km/h`}
              />
              <StatRow
                label="Approach Date"
                value={formatDate(asteroid.approachDate)}
                valueColor="hsl(260 80% 70%)"
              />
              <StatRow
                label="First Observed"
                value={formatDate(asteroid.firstObserved)}
              />
            </div>

            {/* Hazardous badge */}
            <div className="px-4 pb-4 pt-2">
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium ${
                  asteroid.isHazardous
                    ? "bg-[hsl(0_85%_60%/0.1)] border-[hsl(0_85%_60%/0.3)] text-[hsl(0_85%_65%)]"
                    : "bg-[hsl(145_80%_50%/0.1)] border-[hsl(145_80%_50%/0.3)] text-[hsl(145_80%_65%)]"
                }`}
              >
                <span>{asteroid.isHazardous ? "⚠️" : "✅"}</span>
                {asteroid.isHazardous ? "Potentially Hazardous Object" : "Non-Hazardous Object"}
              </div>
            </div>
          </div>

          {/* ── Right Panel: Impact Analysis (LLM) ─────────────────────── */}
          <div
            className="rounded-2xl border border-[hsl(220_20%_14%)] overflow-hidden flex flex-col"
            style={{ background: "hsl(220 25% 9%)" }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[hsl(220_20%_14%)] bg-[hsl(220_25%_11%)]">
              <span className="text-base">🤖</span>
              <span className="text-xs font-semibold tracking-wide uppercase text-[hsl(260_80%_70%)]">
                Impact Analysis
              </span>
              <span className="ml-auto px-2 py-0.5 rounded-md text-[0.6rem] uppercase font-semibold bg-[hsl(260_80%_65%/0.15)] border border-[hsl(260_80%_65%/0.3)] text-[hsl(260_80%_65%)]">
                LLM
              </span>
            </div>

            {/* LLM response area */}
            <div className="flex-1 flex flex-col px-4 py-4 overflow-y-auto" style={{ maxHeight: "260px" }}>

              {/* ── Loading skeleton ── */}
              {llmLoading && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(260_80%_65%)] animate-pulse" />
                    <span className="text-xs text-[hsl(260_80%_55%)]">
                      Analyzing impact data…
                    </span>
                  </div>
                  {[95, 80, 90, 65, 85, 55].map((w, i) => (
                    <div
                      key={i}
                      className="h-2.5 rounded-full animate-pulse bg-[hsl(260_80%_65%/0.18)]"
                      style={{ width: `${w}%`, animationDelay: `${i * 80}ms` }}
                    />
                  ))}
                </div>
              )}

              {/* ── Error state ── */}
              {!llmLoading && llmError && (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <span className="text-2xl">⚠️</span>
                  <p className="text-xs text-[hsl(0_85%_60%)]">{llmError}</p>
                  <button
                    onClick={retryAnalysis}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[hsl(260_80%_65%/0.3)] bg-[hsl(260_80%_65%/0.08)] text-[hsl(260_80%_65%)] hover:bg-[hsl(260_80%_65%/0.16)] transition-all duration-200"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* ── LLM response ── */}
              {(llmStreaming || (!llmLoading && !llmError && llmText)) && (
                <div className="space-y-3">
                  {(llmText ?? "").split(/\n\n+/).filter(Boolean).map((para, i, arr) => (
                    <p
                      key={i}
                      className="text-[0.8rem] text-[hsl(215_20%_75%)] leading-relaxed"
                    >
                      {para.trim()}
                      {/* blinking cursor on the last paragraph while streaming */}
                      {llmStreaming && i === arr.length - 1 && (
                        <span
                          className="inline-block w-0.5 h-[0.9em] bg-[hsl(260_80%_65%)] ml-0.5 align-middle animate-pulse rounded-sm"
                        />
                      )}
                    </p>
                  ))}
                  {/* cursor shown before any text arrives */}
                  {llmStreaming && !llmText && (
                    <span
                      className="inline-block w-0.5 h-[0.9em] bg-[hsl(260_80%_65%)] animate-pulse rounded-sm"
                    />
                  )}
                </div>
              )}

            </div>
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <div className="px-5 pb-5">
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[hsl(220_20%_14%)] bg-[hsl(220_25%_10%)]"
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: colors.bg, boxShadow: `0 0 8px ${colors.glow}` }}
            />
            <span className="text-[0.65rem] text-[hsl(215_20%_55%)] tracking-[0.05em]">
              Data sourced from{" "}
              <span className="text-[hsl(195_100%_65%)] font-medium">
                NASA Near-Earth Object Web Service (NeoWs)
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
