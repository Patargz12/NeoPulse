"use client";

import { AsteroidData } from "@/app/constants/mockAsteroids";

interface AsteroidCardProps {
  asteroid: AsteroidData;
  onView?: (asteroid: AsteroidData) => void;
}

export default function AsteroidCard({ asteroid, onView }: AsteroidCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case "high":
        return {
          bg: "hsl(0 85% 60%)",
          text: "hsl(0 85% 65%)",
          glow: "hsl(0 85% 60% / 0.3)",
        };
      case "moderate":
        return {
          bg: "hsl(45 100% 55%)",
          text: "hsl(45 100% 65%)",
          glow: "hsl(45 100% 55% / 0.3)",
        };
      case "low":
        return {
          bg: "hsl(145 80% 50%)",
          text: "hsl(145 80% 60%)",
          glow: "hsl(145 80% 50% / 0.3)",
        };
      default:
        return {
          bg: "hsl(215 20% 55%)",
          text: "hsl(215 20% 65%)",
          glow: "hsl(215 20% 55% / 0.3)",
        };
    }
  };

  const threatColors = getThreatColor(asteroid.threatLevel);

  return (
    <div
      className="relative bg-[hsl(220_25%_7%)] border border-[hsl(220_20%_14%)] rounded-2xl overflow-hidden transition-all duration-300 ease-in-out cursor-pointer hover:border-[hsl(195_100%_60%/0.5)] hover:-translate-y-1 hover:shadow-[0_8px_32px_hsl(195_100%_60%/0.15)]"
      style={{ minWidth: "320px" }}
    >
      {/* Header */}
      <div className="bg-[hsl(220_25%_10%)] border-b border-[hsl(220_20%_18%)] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="text-2xl"
            style={{ filter: "drop-shadow(0 0 8px hsl(195 100% 60% / 0.3))" }}
          >
            🪨
          </div>
          <div>
            <h3 className="font-bold text-lg text-[hsl(210_40%_95%)]">
              {asteroid.name}
            </h3>
            <p className="text-sm text-[hsl(215_20%_60%)]">
              {asteroid.classification}
            </p>
          </div>
        </div>
        {asteroid.isHazardous && (
          <div
            className="flex items-center justify-center w-9 h-9 rounded-lg border-2"
            style={{
              borderColor: "hsl(0 85% 60% / 0.3)",
              background:
                "radial-gradient(circle at 30% 30%, hsl(0 85% 60% / 0.2), hsl(0 85% 60% / 0.05))",
              boxShadow: "0 0 12px hsl(0 85% 60% / 0.2)",
            }}
          >
            <span className="text-lg">⚠️</span>
          </div>
        )}
      </div>

      {/* Body - Main Stats */}
      <div className="px-5 py-5 space-y-3">
        {/* Diameter */}
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase text-[hsl(215_20%_60%)]">
            Diameter
          </span>
          <span className="font-semibold text-sm text-[hsl(210_40%_90%)]">
            {asteroid.diameterMin} - {asteroid.diameterMax}m
          </span>
        </div>

        {/* Miss Distance */}
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase text-[hsl(215_20%_60%)]">
            Miss Dist
          </span>
          <span className="font-semibold text-sm text-[hsl(195_100%_70%)]">
            {asteroid.missDistance.toFixed(1)} lunar dist
          </span>
        </div>

        {/* Velocity */}
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase text-[hsl(215_20%_60%)]">
            Velocity
          </span>
          <span className="font-semibold text-sm text-[hsl(210_40%_90%)]">
            {asteroid.velocity.toLocaleString()} km/h
          </span>
        </div>

        {/* First Observed */}
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase text-[hsl(215_20%_60%)]">
            First Observed
          </span>
          <span className="font-semibold text-sm text-[hsl(215_20%_70%)]">
            {formatDate(asteroid.firstObserved)}
          </span>
        </div>

        {/* Approach Date */}
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase text-[hsl(215_20%_60%)]">
            Approach
          </span>
          <span className="font-semibold text-sm text-[hsl(260_80%_70%)]">
            {formatDate(asteroid.approachDate)}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[hsl(220_25%_10%)] border-t border-[hsl(220_20%_18%)] px-5 py-4">
        {/* Threat Level Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: threatColors.bg,
                boxShadow: `0 0 8px ${threatColors.glow}`,
              }}
            />
            <span
              className="font-semibold text-sm capitalize"
              style={{
                color: threatColors.text,
              }}
            >
              {asteroid.threatLevel} Threat
            </span>
          </div>
          <button
            onClick={() => onView?.(asteroid)}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold text-[hsl(195_100%_70%)] border border-[hsl(195_100%_60%/0.3)] bg-[hsl(195_100%_60%/0.08)] hover:bg-[hsl(195_100%_60%/0.18)] hover:border-[hsl(195_100%_60%/0.6)] transition-all duration-200"
          >
            View
          </button>
        </div>
      </div>

      {/* Subtle bottom glow effect on hover */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-px opacity-0 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(195 100% 60% / 0.5), transparent)",
        }}
      />
    </div>
  );
}
