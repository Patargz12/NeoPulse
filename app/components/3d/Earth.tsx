"use client";

import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { EARTH_TEXTURES } from "@/app/constants";

export function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  // Load all Earth textures
  const [albedoMap, bumpMap, nightMap, cloudsMap] = useLoader(THREE.TextureLoader, [
    EARTH_TEXTURES.albedo,
    EARTH_TEXTURES.bump,
    EARTH_TEXTURES.nightLights,
    EARTH_TEXTURES.clouds,
  ]);

  // Animate Earth and clouds rotation
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12; // Earth rotation
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.14; // Clouds rotate slightly faster
    }
  });

  return (
    <group>
      {/* Main Earth sphere with bump mapping and night lights */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial
          map={albedoMap}
          bumpMap={bumpMap}
          bumpScale={0.015}
          emissiveMap={nightMap}
          emissive="#ffffff"
          emissiveIntensity={0.8}
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
      
      {/* Cloud layer - slightly larger sphere, rotates independently */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.012, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
