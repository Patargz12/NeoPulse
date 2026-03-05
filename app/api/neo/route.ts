import { NextResponse } from "next/server";
import type { AsteroidData } from "@/app/constants/mockAsteroids";

// ─── NASA NeoWS raw types ─────────────────────────────────────────────────────

interface NasaVelocity {
  kilometers_per_second: string;
  kilometers_per_hour: string;
  miles_per_hour: string;
}

interface NasaMissDistance {
  astronomical: string;
  lunar: string;
  kilometers: string;
  miles: string;
}

interface NasaCloseApproach {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: NasaVelocity;
  miss_distance: NasaMissDistance;
  orbiting_body: string;
}

interface NasaDiameterRange {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
}

interface NasaNeo {
  id: string;
  neo_reference_id: string;
  name: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    meters: NasaDiameterRange;
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: NasaCloseApproach[];
  is_sentry_object: boolean;
}

interface NasaFeedResponse {
  near_earth_objects: Record<string, NasaNeo[]>;
}

// ─── Mapping helpers ──────────────────────────────────────────────────────────

/**
 * Approximate orbital class based on miss distance.
 * The NeoWS feed doesn't expose orbital_data, so we use miss distance as a proxy.
 *  < 5 LD  → Apollo Class  (Earth-crossers, tightest passes)
 *  5–20 LD → Aten Class    (primarily inside Earth's orbit)
 *  > 20 LD → Amor Class    (outside Earth's orbit, still close)
 */
function deriveClassification(missDistanceLunar: number): string {
  if (missDistanceLunar < 5) return "Apollo Class";
  if (missDistanceLunar < 20) return "Aten Class";
  return "Amor Class";
}

/**
 * Determine threat level from hazardous flag + miss distance.
 *  high     : flagged hazardous AND within 5 LD
 *  moderate : flagged hazardous OR within 10 LD
 *  low      : everything else
 */
function deriveThreatLevel(
  isHazardous: boolean,
  missDistanceLunar: number
): "low" | "moderate" | "high" {
  if (isHazardous && missDistanceLunar < 5) return "high";
  if (isHazardous || missDistanceLunar < 10) return "moderate";
  return "low";
}

/**
 * Extract a "first observed" date from the asteroid's designation.
 * Most NEO names embed the discovery year, e.g. "2024 BX1" or "(1996 TO5)".
 * Falls back to the approach date if no year is found.
 */
function deriveFirstObserved(name: string, approachDate: string): string {
  const yearMatch = name.match(/\b(19|20)\d{2}\b/);
  if (yearMatch) {
    return `${yearMatch[0]}-01-01`;
  }
  return approachDate;
}

/** Strip surrounding parentheses or extra whitespace from NASA name strings. */
function cleanName(raw: string): string {
  return raw.replace(/^\(|\)$/g, "").trim();
}

// ─── Main transformer ─────────────────────────────────────────────────────────

function mapNeoToAsteroidData(neo: NasaNeo): AsteroidData | null {
  // Only use NEOs with at least one Earth approach in the data
  const approach = neo.close_approach_data.find(
    (a) => a.orbiting_body === "Earth"
  );
  if (!approach) return null;

  const missDistanceLunar = parseFloat(approach.miss_distance.lunar);
  const velocity = Math.round(
    parseFloat(approach.relative_velocity.kilometers_per_hour)
  );
  const diameterMin = Math.round(
    neo.estimated_diameter.meters.estimated_diameter_min
  );
  const diameterMax = Math.round(
    neo.estimated_diameter.meters.estimated_diameter_max
  );
  const approachDate = approach.close_approach_date;

  return {
    id: neo.id,
    name: cleanName(neo.name),
    isHazardous: neo.is_potentially_hazardous_asteroid,
    classification: deriveClassification(missDistanceLunar),
    diameterMin,
    diameterMax,
    missDistance: parseFloat(missDistanceLunar.toFixed(2)),
    velocity,
    approachDate,
    firstObserved: deriveFirstObserved(neo.name, approachDate),
    threatLevel: deriveThreatLevel(
      neo.is_potentially_hazardous_asteroid,
      missDistanceLunar
    ),
  };
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET() {
  const apiKey = process.env.NASA_API_KEY ?? "DEMO_KEY";

  // Fetch a 7-day window starting from today
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 6);

  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const url = new URL("https://api.nasa.gov/neo/rest/v1/feed");
  url.searchParams.set("start_date", fmt(startDate));
  url.searchParams.set("end_date", fmt(endDate));
  url.searchParams.set("api_key", apiKey);

  const res = await fetch(url.toString(), {
    // Revalidate once per hour to avoid hitting NASA rate limits
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `NASA API error: ${res.status} ${res.statusText}` },
      { status: res.status }
    );
  }

  const data: NasaFeedResponse = await res.json();

  // Flatten all dates into a single array, preserving the approach date per object
  const allNeos = Object.values(data.near_earth_objects).flat();

  const asteroids: AsteroidData[] = allNeos
    .map(mapNeoToAsteroidData)
    .filter((a): a is AsteroidData => a !== null)
    // Sort by miss distance ascending (closest first)
    .sort((a, b) => a.missDistance - b.missDistance);

  return NextResponse.json(asteroids);
}
