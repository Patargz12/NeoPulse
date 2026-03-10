"use client";

import { lazy, Suspense } from "react";
import { usePathname } from "next/navigation";
import { useEarthReady } from "./EarthReadyProvider";

const LazyEarthCanvas = lazy(() =>
  import("@/app/components/3d/EarthCanvas").then((m) => ({ default: m.EarthCanvas }))
);

export function PersistentEarthCanvas() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { markReady } = useEarthReady();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        opacity: isHome ? 1 : 0,
        pointerEvents: isHome ? "auto" : "none",
        transition: "opacity 300ms ease",
      }}
    >
      <Suspense fallback={null}>
        <LazyEarthCanvas
          frameloop={isHome ? "always" : "never"}
          onReady={markReady}
        />
      </Suspense>
    </div>
  );
}
