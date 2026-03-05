/**
 * Mock Asteroid Data for Explore Page
 * This data will be replaced with real NASA API data later
 */

export interface AsteroidData {
  id: string;
  name: string;
  isHazardous: boolean;
  classification: string;
  diameterMin: number; // in meters
  diameterMax: number; // in meters
  missDistance: number; // in lunar distances
  velocity: number; // in km/h
  approachDate: string;
  firstObserved: string;
  threatLevel: "low" | "moderate" | "high";
}

export const MOCK_ASTEROIDS: AsteroidData[] = [
  {
    id: "1",
    name: "2024 BX1",
    isHazardous: true,
    classification: "Apollo Class",
    diameterMin: 140,
    diameterMax: 310,
    missDistance: 1.2,
    velocity: 52000,
    approachDate: "2026-03-15",
    firstObserved: "2024-01-20",
    threatLevel: "moderate",
  },
  {
    id: "2",
    name: "2025 QR7",
    isHazardous: true,
    classification: "Aten Class",
    diameterMin: 220,
    diameterMax: 500,
    missDistance: 0.8,
    velocity: 68000,
    approachDate: "2026-04-22",
    firstObserved: "2025-02-14",
    threatLevel: "high",
  },
  {
    id: "3",
    name: "2023 FH3",
    isHazardous: false,
    classification: "Apollo Class",
    diameterMin: 45,
    diameterMax: 100,
    missDistance: 4.5,
    velocity: 38500,
    approachDate: "2026-05-08",
    firstObserved: "2023-03-19",
    threatLevel: "low",
  },
  {
    id: "4",
    name: "2024 WK2",
    isHazardous: true,
    classification: "Amor Class",
    diameterMin: 310,
    diameterMax: 690,
    missDistance: 1.9,
    velocity: 74200,
    approachDate: "2026-06-11",
    firstObserved: "2024-11-28",
    threatLevel: "moderate",
  },
  {
    id: "5",
    name: "2025 XT9",
    isHazardous: false,
    classification: "Apollo Class",
    diameterMin: 28,
    diameterMax: 63,
    missDistance: 8.2,
    velocity: 29300,
    approachDate: "2026-07-03",
    firstObserved: "2025-12-05",
    threatLevel: "low",
  },
  {
    id: "6",
    name: "2024 MN5",
    isHazardous: true,
    classification: "Aten Class",
    diameterMin: 180,
    diameterMax: 400,
    missDistance: 1.5,
    velocity: 81000,
    approachDate: "2026-08-19",
    firstObserved: "2024-06-10",
    threatLevel: "moderate",
  },
  {
    id: "7",
    name: "2023 LP4",
    isHazardous: false,
    classification: "Amor Class",
    diameterMin: 92,
    diameterMax: 205,
    missDistance: 6.7,
    velocity: 42100,
    approachDate: "2026-09-25",
    firstObserved: "2023-07-22",
    threatLevel: "low",
  },
  {
    id: "8",
    name: "2025 HJ1",
    isHazardous: true,
    classification: "Apollo Class",
    diameterMin: 420,
    diameterMax: 940,
    missDistance: 2.1,
    velocity: 95600,
    approachDate: "2026-10-30",
    firstObserved: "2025-04-15",
    threatLevel: "high",
  },
  {
    id: "9",
    name: "2024 CR8",
    isHazardous: false,
    classification: "Apollo Class",
    diameterMin: 35,
    diameterMax: 78,
    missDistance: 12.4,
    velocity: 31800,
    approachDate: "2026-11-12",
    firstObserved: "2024-02-03",
    threatLevel: "low",
  },
  {
    id: "10",
    name: "2025 DV6",
    isHazardous: true,
    classification: "Aten Class",
    diameterMin: 250,
    diameterMax: 560,
    missDistance: 0.9,
    velocity: 88500,
    approachDate: "2026-12-24",
    firstObserved: "2025-03-09",
    threatLevel: "high",
  },
];
