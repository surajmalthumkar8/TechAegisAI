"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Instances, Instance } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const NODE_COUNT = 120;
const SPHERE_RADIUS = 4.2;
const MAX_CONNECTIONS = 3;
const CONNECTION_DIST = 1.8;

function useNetwork() {
  return useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = SPHERE_RADIUS * Math.cbrt(Math.random()) * 1.05;
      positions.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ),
      );
    }

    const segments: number[] = [];
    for (let i = 0; i < positions.length; i++) {
      const neighbors: { idx: number; d: number }[] = [];
      for (let j = 0; j < positions.length; j++) {
        if (i === j) continue;
        const d = positions[i].distanceTo(positions[j]);
        if (d < CONNECTION_DIST) neighbors.push({ idx: j, d });
      }
      neighbors.sort((a, b) => a.d - b.d);
      neighbors.slice(0, MAX_CONNECTIONS).forEach((n) => {
        if (n.idx > i) {
          segments.push(
            positions[i].x,
            positions[i].y,
            positions[i].z,
            positions[n.idx].x,
            positions[n.idx].y,
            positions[n.idx].z,
          );
        }
      });
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(segments, 3),
    );

    return { positions, lineGeometry: geo };
  }, []);
}

function Scene() {
  const { positions, lineGeometry } = useNetwork();
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x += delta * 0.02;
    const targetY = pointer.x * 0.25;
    const targetX = -pointer.y * 0.2;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.02;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.02;
  });

  return (
    <group ref={group}>
      <Instances limit={NODE_COUNT} range={NODE_COUNT}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#E7F9FF" toneMapped={false} />
        {positions.map((p, i) => (
          <Instance key={i} position={[p.x, p.y, p.z]} />
        ))}
      </Instances>

      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#22D3EE"
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </lineSegments>

      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS * 0.35, 32, 32]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

export default function HeroNetwork() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Scene />
      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.2} luminanceSmoothing={0.6} />
      </EffectComposer>
    </Canvas>
  );
}
