"use client";

import { Sphere } from "@react-three/drei";
import * as THREE from "three";

export function Atmosphere() {
  return (
    <Sphere args={[1.08, 64, 64]}>
      <meshStandardMaterial color="#00aaff" transparent opacity={0.08} side={THREE.BackSide} />
    </Sphere>
  );
}
