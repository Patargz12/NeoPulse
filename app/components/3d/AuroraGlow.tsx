"use client";

import { Sphere } from "@react-three/drei";
import * as THREE from "three";

export function AuroraGlow() {
  return (
    <Sphere args={[1.18, 64, 64]}>
      <meshStandardMaterial color="#4466ff" transparent opacity={0.03} side={THREE.BackSide} />
    </Sphere>
  );
}
