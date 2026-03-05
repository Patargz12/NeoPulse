"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Satellite() {
  const ref = useRef<THREE.Mesh>(null);
  const angle = useRef(0);
  
  useFrame((_, delta) => {
    angle.current += delta * 0.6;
    if (ref.current) {
      ref.current.position.x = Math.cos(angle.current) * 1.5;
      ref.current.position.z = Math.sin(angle.current) * 1.5;
      ref.current.position.y = Math.sin(angle.current * 0.3) * 0.2;
    }
  });
  
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshStandardMaterial color="#ffffff" emissive="#00ddff" emissiveIntensity={3} />
    </mesh>
  );
}
