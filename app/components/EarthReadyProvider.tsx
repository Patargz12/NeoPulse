"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import EarthLoader from "./EarthLoader";

interface EarthReadyCtx {
  markReady: () => void;
}

const EarthReadyContext = createContext<EarthReadyCtx>({ markReady: () => {} });

export function useEarthReady() {
  return useContext(EarthReadyContext);
}

export function EarthReadyProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  // Only block the page on the homepage — other routes have nothing to wait for
  const showLoader = !isReady && pathname === "/";

  // Lock body scroll while the loader is visible so no scrollbar appears
  useEffect(() => {
    document.body.style.overflow = showLoader ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showLoader]);

  return (
    <EarthReadyContext.Provider value={{ markReady: () => setIsReady(true) }}>
      {showLoader && <EarthLoader />}
      {children}
    </EarthReadyContext.Provider>
  );
}
