"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Stars() {
  const starsRef = useRef<THREE.Points>(null);
  const [{ positions, colors }] = useState(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 50 + Math.random() * 50;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      const brightness = 0.5 + Math.random() * 0.5;
      const tint = Math.random();
      if (tint < 0.1) {
        colors[i * 3] = brightness * 0.7;
        colors[i * 3 + 1] = brightness * 0.85;
        colors[i * 3 + 2] = brightness;
      } else if (tint < 0.15) {
        colors[i * 3] = brightness;
        colors[i * 3 + 1] = brightness * 0.85;
        colors[i * 3 + 2] = brightness * 0.7;
      } else {
        colors[i * 3] = brightness;
        colors[i * 3 + 1] = brightness;
        colors[i * 3 + 2] = brightness;
      }
    }
    return { positions, colors };
  });

  useFrame((_, delta) => {
    if (starsRef.current) starsRef.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}
