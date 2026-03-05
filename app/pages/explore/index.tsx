"use client";


import { fontSpace } from "@/app/constants";
import AsteroidCard from "@/app/components/custom/AsteroidCard";
import AsteroidModal from "@/app/components/custom/AsteroidModal";
import { AsteroidData } from "@/app/constants/mockAsteroids";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Skeleton card ────────────────────────────────────────────────────────────
function AsteroidCardSkeleton() {
  return (
    <div
      className="relative bg-[hsl(220_25%_7%)] border border-[hsl(220_20%_14%)] rounded-2xl overflow-hidden animate-pulse"
      style={{ minWidth: "320px" }}
    >
      <div className="bg-[hsl(220_25%_10%)] border-b border-[hsl(220_20%_18%)] px-5 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[hsl(220_20%_18%)]" />
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 rounded bg-[hsl(220_20%_18%)]" />
          <div className="w-20 h-3 rounded bg-[hsl(220_20%_14%)]" />
        </div>
      </div>
      <div className="px-5 py-5 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="w-16 h-3 rounded bg-[hsl(220_20%_14%)]" />
            <div className="w-24 h-3 rounded bg-[hsl(220_20%_18%)]" />
          </div>
        ))}
      </div>
      <div className="bg-[hsl(220_25%_10%)] border-t border-[hsl(220_20%_18%)] px-5 py-4 space-y-3">
        <div className="flex justify-between">
          <div className="w-24 h-3 rounded bg-[hsl(220_20%_14%)]" />
          <div className="w-20 h-3 rounded bg-[hsl(220_20%_18%)]" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[hsl(220_20%_18%)]" />
          <div className="w-16 h-3 rounded bg-[hsl(220_20%_14%)]" />
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ExplorePage() {
  const [asteroids, setAsteroids] = useState<AsteroidData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "hazardous" | "safe">("all");
  const [threatFilter, setThreatFilter] = useState<"all" | "low" | "moderate" | "high">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [columns, setColumns] = useState(3); // sensible default; updated by ResizeObserver
  const [selectedAsteroid, setSelectedAsteroid] = useState<AsteroidData | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Detect the rendered column count from the grid's computed style
  const updateColumns = useCallback(() => {
    if (!gridRef.current) return;
    const cols = getComputedStyle(gridRef.current)
      .gridTemplateColumns.split(" ")
      .filter(Boolean).length;
    setColumns(Math.max(1, cols));
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new ResizeObserver(updateColumns);
    observer.observe(el);
    updateColumns(); // run once immediately
    return () => observer.disconnect();
  }, [updateColumns]);

  // 3 rows per page
  const ROWS_PER_PAGE = 3;
  const itemsPerPage = columns * ROWS_PER_PAGE;

  // Retry handler — resets state then re-fetches
  const fetchAsteroids = () => {
    setLoading(true);
    setError(null);
    fetch("/api/neo")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
        return res.json() as Promise<AsteroidData[]>;
      })
      .then((data) => { setAsteroids(data); setCurrentPage(1); })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  };

  // Initial load — loading=true already, no synchronous setState needed
  useEffect(() => {
    let cancelled = false;
    fetch("/api/neo")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
        return res.json() as Promise<AsteroidData[]>;
      })
      .then((data) => { if (!cancelled) { setAsteroids(data); setCurrentPage(1); } })
      .catch((err: Error) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const filteredAsteroids = asteroids.filter((asteroid) => {
    const matchesHazardFilter =
      filter === "all" ||
      (filter === "hazardous" && asteroid.isHazardous) ||
      (filter === "safe" && !asteroid.isHazardous);

    const matchesThreatFilter =
      threatFilter === "all" || asteroid.threatLevel === threatFilter;

    return matchesHazardFilter && matchesThreatFilter;
  });

  // Reset to page 1 whenever filters or data change — done inline in handlers, not via useEffect

  const totalPages = Math.max(1, Math.ceil(filteredAsteroids.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * itemsPerPage;
  const paginatedAsteroids = filteredAsteroids.slice(pageStart, pageStart + itemsPerPage);

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center pt-20 pb-16"
      style={{
        background:
          "radial-gradient(ellipse at center, hsl(220 30% 8%) 0%, hsl(220 30% 2%) 100%)",
      }}
    >
      {/* Background nebula blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[40px]"
          style={{
            background:
              "radial-gradient(circle, hsl(260 80% 65% / 0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full blur-[60px]"
          style={{
            background:
              "radial-gradient(circle, hsl(195 100% 60% / 0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, hsl(340 100% 60% / 0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center px-4 pb-8">
        <div className="mb-2 mt-6">
          <span
            className="text-[0.7rem] tracking-[0.4em] uppercase text-[hsl(195_100%_60%)]"
            style={{ ...fontSpace }}
          >
            ◈ Near-Earth Objects ◈
          </span>
        </div>

        <h1
          className="font-bold leading-[1.1] mb-3 bg-clip-text text-transparent"
          style={{
            ...fontSpace,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            background:
              "linear-gradient(135deg, hsl(195 100% 70%), hsl(210 100% 80%), hsl(260 80% 75%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Explore Asteroids
        </h1>

        <p
          className="font-light text-[hsl(215_20%_55%)] tracking-[0.05em] max-w-[700px] mx-auto"
          style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
        >
          Discover and analyze Near-Earth Objects tracked by NASA. Each asteroid represents a
          unique visitor to our cosmic neighborhood.
        </p>
      </header>

      {/* Filters */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 mb-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Hazard Filter */}
          <div className="flex items-center gap-2 bg-[hsl(220_25%_7%)] border border-[hsl(220_20%_20%)] rounded-xl p-1.5">
            {["all", "hazardous", "safe"].map((option) => (
              <button
                key={option}
                onClick={() => { setFilter(option as typeof filter); setCurrentPage(1); }}
                className={`px-5 py-2.5 rounded-lg text-[0.75rem] tracking-[0.1em] uppercase font-medium transition-all duration-200 ${
                  filter === option
                    ? "bg-[hsl(195_100%_60%)] text-[hsl(220_30%_5%)] shadow-[0_0_16px_hsl(195_100%_60%/0.4)]"
                    : "text-[hsl(215_20%_65%)] hover:text-[hsl(210_40%_90%)] hover:bg-[hsl(220_25%_12%)]"
                }`}
              >
                {option === "all" ? "All Objects" : option}
              </button>
            ))}
          </div>

          {/* Threat Level Filter */}
          <div className="flex items-center gap-2 bg-[hsl(220_25%_7%)] border border-[hsl(220_20%_20%)] rounded-xl p-1.5">
            {["all", "low", "moderate", "high"].map((option) => (
              <button
                key={option}
                onClick={() => { setThreatFilter(option as typeof threatFilter); setCurrentPage(1); }}
                className={`px-5 py-2.5 rounded-lg text-[0.75rem] tracking-[0.1em] uppercase font-medium transition-all duration-200 ${
                  threatFilter === option
                    ? "bg-[hsl(260_80%_65%)] text-[hsl(220_30%_5%)] shadow-[0_0_16px_hsl(260_80%_65%/0.4)]"
                    : "text-[hsl(215_20%_65%)] hover:text-[hsl(210_40%_90%)] hover:bg-[hsl(220_25%_12%)]"
                }`}
              >
                {option === "all" ? "All Threats" : option}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="text-center mt-6">
          <p
            className="text-[0.8rem] tracking-[0.1em] text-[hsl(215_20%_60%)]"
          >
            {loading ? (
              <span className="text-[hsl(195_100%_60%)] animate-pulse">
                Fetching live NASA data…
              </span>
            ) : error ? (
              <span className="text-[hsl(0_85%_60%)]">Failed to load data</span>
            ) : (
              <>
                Page{" "}
                <span className="font-bold text-[hsl(195_100%_70%)]">
                  {safePage}
                </span>{" "}
                of{" "}
                <span className="font-bold text-[hsl(195_100%_70%)]">
                  {totalPages}
                </span>
                {" "}·{" "}
                <span className="font-bold text-[hsl(260_80%_70%)]">
                  {filteredAsteroids.length}
                </span>{" "}
                objects
              </>
            )}
          </p>
        </div>
      </div>

      {/* Asteroid Grid */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
        {/* Loading skeletons — gridRef attached so ResizeObserver works immediately */}
        {loading && (
          <div ref={gridRef} className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 w-full">
            {Array.from({ length: 9 }).map((_, i) => (
              <AsteroidCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🛸</div>
            <p
              className="text-[hsl(0_85%_65%)] text-lg tracking-[0.05em] mb-6"
            >
              {error}
            </p>
            <button
              onClick={fetchAsteroids}
              className="px-6 py-3 rounded-xl text-[0.75rem] tracking-[0.1em] uppercase font-medium transition-all duration-200 bg-[hsl(195_100%_60%)] text-[hsl(220_30%_5%)] shadow-[0_0_16px_hsl(195_100%_60%/0.4)] hover:shadow-[0_0_24px_hsl(195_100%_60%/0.6)]"
            >
              Retry
            </button>
          </div>
        )}

        {/* Populated grid */}
        {!loading && !error && filteredAsteroids.length > 0 && (
          <div ref={gridRef} className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 w-full">
            {paginatedAsteroids.map((asteroid) => (
              <AsteroidCard key={asteroid.id} asteroid={asteroid} onView={setSelectedAsteroid} />
            ))}
          </div>
        )}

        {/* Empty state after filtering */}
        {!loading && !error && filteredAsteroids.length === 0 && asteroids.length > 0 && (
          <div className="text-center py-20">
            <div
              className="text-6xl mb-6 opacity-30"
              style={{ filter: "grayscale(100%)" }}
            >
              🔭
            </div>
            <p
              className="text-[hsl(215_20%_60%)] text-lg tracking-[0.05em]"
            >
              No asteroids match your current filters
            </p>
          </div>
        )}

        {/* Pagination controls */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {/* Prev */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[0.7rem] tracking-[0.1em] uppercase font-medium transition-all duration-200 border border-[hsl(220_20%_20%)] bg-[hsl(220_25%_7%)] text-[hsl(215_20%_65%)] hover:text-[hsl(195_100%_70%)] hover:border-[hsl(195_100%_60%/0.4)] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              ← Prev
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first, last, current ±1, and ellipsis
              const isEdge = page === 1 || page === totalPages;
              const isNearCurrent = Math.abs(page - safePage) <= 1;
              if (!isEdge && !isNearCurrent) {
                // Show a single ellipsis between gaps
                const prevPage = page - 1;
                const isPrevShown =
                  prevPage === 1 || Math.abs(prevPage - safePage) <= 1;
                if (!isPrevShown) return null;
                return (
                  <span
                    key={`ellipsis-${page}`}
                    className="px-1 text-[hsl(215_20%_45%)] text-sm select-none"
                  >
                    …
                  </span>
                );
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-[0.75rem] font-semibold transition-all duration-200 border ${
                    safePage === page
                      ? "bg-[hsl(195_100%_60%)] text-[hsl(220_30%_5%)] border-[hsl(195_100%_60%)] shadow-[0_0_16px_hsl(195_100%_60%/0.4)]"
                      : "bg-[hsl(220_25%_7%)] text-[hsl(215_20%_65%)] border-[hsl(220_20%_20%)] hover:text-[hsl(195_100%_70%)] hover:border-[hsl(195_100%_60%/0.4)]"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[0.7rem] tracking-[0.1em] uppercase font-medium transition-all duration-200 border border-[hsl(220_20%_20%)] bg-[hsl(220_25%_7%)] text-[hsl(215_20%_65%)] hover:text-[hsl(195_100%_70%)] hover:border-[hsl(195_100%_60%/0.4)] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Info Banner */}      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 mt-16">
        <div className="bg-[hsl(220_25%_7%)] border border-[hsl(220_20%_14%)] rounded-2xl p-8 text-center">
          <div className="mb-3">
            <span
              className="text-[0.65rem] tracking-[0.3em] uppercase text-[hsl(195_100%_60%)]"
            >
              ◈ Data Source ◈
            </span>
          </div>
          <h3
            className="font-bold text-xl tracking-[0.05em] text-[hsl(210_40%_95%)] mb-4"
          >
            NASA Near-Earth Object Database
          </h3>
          <p className="font-light text-[hsl(215_20%_65%)] text-[0.9rem] leading-[1.6] tracking-[0.02em] max-w-[700px] mx-auto">
            All asteroid data is sourced live from NASA&apos;s Near-Earth Object Web Service (NeoWs).
            Displaying tracked close-approach objects for the next 7 days, sorted by miss distance.
            Orbital classification is approximated from approach geometry.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[hsl(220_25%_10%)] border border-[hsl(220_20%_18%)]">
            {loading ? (
              <>
                <div className="w-2 h-2 rounded-full bg-[hsl(195_100%_60%)] animate-pulse" />
                <span
                  className="text-[0.7rem] tracking-[0.1em] text-[hsl(195_100%_65%)] uppercase"
                >
                  Fetching Data…
                </span>
              </>
            ) : error ? (
              <>
                <div className="w-2 h-2 rounded-full bg-[hsl(0_85%_60%)]" />
                <span
                  className="text-[0.7rem] tracking-[0.1em] text-[hsl(0_85%_65%)] uppercase"
                >
                  Connection Error
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-[hsl(145_80%_50%)] shadow-[0_0_8px_hsl(145_80%_50%/0.6)]" />
                <span
                  className="text-[0.7rem] tracking-[0.1em] text-[hsl(145_80%_60%)] uppercase"
                >
                  Live NASA Data · {asteroids.length} Objects
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Asteroid Modal */}
      {selectedAsteroid && (
        <AsteroidModal
          asteroid={selectedAsteroid}
          onClose={() => setSelectedAsteroid(null)}
        />
      )}
    </div>
  );
}
