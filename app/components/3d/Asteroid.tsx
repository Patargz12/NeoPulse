"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AsteroidProps } from "@/app/types";

export function Asteroid({ orbitRadius, orbitSpeed, orbitTilt, orbitPhase, size, rotSpeed, color }: AsteroidProps) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = useRef(orbitPhase);

  const [geometry] = useState(() => {
    const geo = new THREE.IcosahedronGeometry(size, 1);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const jitter = 0.55 + Math.random() * 0.45;
      pos.setXYZ(i, pos.getX(i) * jitter, pos.getY(i) * jitter, pos.getZ(i) * jitter);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  });

  useFrame((_, delta) => {
    angle.current += delta * orbitSpeed;
    if (ref.current) {
      ref.current.position.set(
        Math.cos(angle.current) * orbitRadius,
        Math.sin(angle.current * 0.7 + orbitTilt) * orbitRadius * 0.3,
        Math.sin(angle.current) * orbitRadius * 0.75
      );
      ref.current.rotation.x += delta * rotSpeed[0];
      ref.current.rotation.y += delta * rotSpeed[1];
      ref.current.rotation.z += delta * rotSpeed[2];
    }
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial color={color} roughness={0.95} metalness={0.05} />
    </mesh>
  );
}
