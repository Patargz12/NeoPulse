"use client";

import { ASTEROID_CONFIG } from "@/app/constants";
import { Stars } from "./Stars";
import { Earth } from "./Earth";
import { Atmosphere } from "./Atmosphere";
import { AuroraGlow } from "./AuroraGlow";
import { OrbitRing } from "./OrbitRing";
import { Satellite } from "./Satellite";
import { Asteroid } from "./Asteroid";

export function Scene() {
  return (
    <>
      <Stars />
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#4466ff" />
      <pointLight position={[0, 5, -5]} intensity={0.2} color="#00ddff" />
      <group>
        <Earth />
        <Atmosphere />
        <AuroraGlow />
        <OrbitRing />
        <Satellite />
      </group>
      {ASTEROID_CONFIG.map((cfg, i) => (
        <Asteroid key={i} {...cfg} />
      ))}
    </>
  );
}
