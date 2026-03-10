"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function ContentWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // On the homepage, let pointer events fall through to the canvas behind this layer.
  // Every interactive piece on the homepage (header, sections, footer, navbar) already
  // has pointer-events: auto explicitly, so nothing breaks there.
  // On every other page, restore auto so all content is normally interactive.
  return (
    <div style={{ position: "relative", zIndex: 2, pointerEvents: pathname === "/" ? "none" : "auto" }}>
      {children}
    </div>
  );
}
