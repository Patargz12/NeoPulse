"use client";

export function OrbitRing() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.5, 0.004, 16, 200]} />
      <meshStandardMaterial
        color="#00ddff"
        emissive="#00ddff"
        emissiveIntensity={1}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}
