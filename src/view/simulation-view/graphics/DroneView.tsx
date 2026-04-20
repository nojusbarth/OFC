import React from "react";
import { DroneFrame } from "../state/DroneFrame";

import { droneConfig, zebraRingConfig } from "../config";
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Line } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCallback, useEffect } from "react";

type RingRuntime = {
  id: string;
  lineA: any;
  lineB: any;
  anchor: THREE.Object3D;
  lastWidth: number;
};

export function DroneView({
  frame,
  onDroneClick,
  onDroneDoubleClick,
}: {
  frame: DroneFrame;
  onDroneClick?: (droneId: number) => void;
  onDroneDoubleClick?: (droneId: number) => void;
}) {
  const droneEntries = Array.from(frame.dronePositions.entries());
  const shouldAnimateOutline = frame.outlineAnimated !== false;
  const { camera } = useThree();

  const ringsRef = useRef<Map<string, RingRuntime>>(new Map());
  const worldPos = useRef(new THREE.Vector3());

  const registerRing = useCallback((runtime: RingRuntime) => {
    ringsRef.current.set(runtime.id, runtime);
    return () => ringsRef.current.delete(runtime.id);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const frameSkip = 2; // optional: nur jedes 2. Frame animieren
    const animateThisFrame = Math.floor(t * 60) % frameSkip === 0;

    for (const ring of ringsRef.current.values()) {
      if (!ring.anchor || !ring.lineA || !ring.lineB) continue;

      if (shouldAnimateOutline && animateThisFrame) {
        ring.lineA.material.dashOffset -= zebraRingConfig.dashOffsetSpeed;
        ring.lineB.material.dashOffset -= zebraRingConfig.dashOffsetSpeed;
      }

      ring.anchor.getWorldPosition(worldPos.current);
      const distance = camera.position.distanceTo(worldPos.current);
      const scaledWidth = Math.max(
        0.5,
        zebraRingConfig.lineWidth * (5 / Math.max(distance, 0.001))
      );

      // nur bei merklicher Änderung updaten -> kein React setState nötig
      if (Math.abs(scaledWidth - ring.lastWidth) > 0.05) {
        ring.lastWidth = scaledWidth;
        ring.lineA.material.linewidth = scaledWidth;
        ring.lineB.material.linewidth = scaledWidth;
      }
    }
  });

  return (
    <>
      {droneEntries.map(([droneId, position]) => {
        const color = frame.droneColors.get(droneId) ?? "#ffffff";
        const dim = droneConfig.dimensions;
        const radius = dim[0];
        const outlineColors = frame.outlineColors.get(droneId) ?? null;
        const showOutline = outlineColors !== null;

        return (
          <group key={droneId} position={[position.x, position.y, position.z]}>
            {showOutline && (
              <>
                <ZebraRing
                  ringId={`${droneId}-0`}
                  radius={radius * 1.35}
                  colorA={outlineColors[0]}
                  colorB={outlineColors[1]}
                  registerRing={registerRing}
                />
                <group rotation={[Math.PI / 2, 0, 0]}>
                  <ZebraRing
                    ringId={`${droneId}-1`}
                    radius={radius * 1.35}
                    colorA={outlineColors[0]}
                    colorB={outlineColors[1]}
                    registerRing={registerRing}
                  />
                </group>
                <group rotation={[0, 0, Math.PI / 2]}>
                  <ZebraRing
                    ringId={`${droneId}-2`}
                    radius={radius * 1.35}
                    colorA={outlineColors[0]}
                    colorB={outlineColors[1]}
                    registerRing={registerRing}
                  />
                </group>
              </>
            )}

            <mesh
              onPointerDown={(e) => {
                e.stopPropagation();
                onDroneClick?.(droneId);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                onDroneDoubleClick?.(droneId);
              }}
            >
              <sphereGeometry args={[radius, dim[1], dim[2]]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={droneConfig.emissiveIntensity}
              />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

function ZebraRing({
  ringId,
  radius,
  colorA,
  colorB,
  registerRing,
}: {
  ringId: string;
  radius: number;
  colorA?: string;
  colorB?: string;
  registerRing: (runtime: RingRuntime) => () => void;
}) {
  const anchorRef = useRef<THREE.Group>(null);
  const refA = useRef<any>(null);
  const refB = useRef<any>(null);

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 24;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
      );
    }
    return pts;
  }, [radius]);

  useEffect(() => {
    if (!anchorRef.current || !refA.current || !refB.current) return;
    return registerRing({
      id: ringId,
      anchor: anchorRef.current,
      lineA: refA.current,
      lineB: refB.current,
      lastWidth: zebraRingConfig.lineWidth,
    });
  }, [ringId, registerRing]);

  return (
    <group ref={anchorRef}>
      <Line
        ref={refA}
        points={points}
        color={colorA}
        lineWidth={zebraRingConfig.lineWidth}
        dashed
        dashSize={zebraRingConfig.dashSize}
        gapSize={zebraRingConfig.gapSize}
        transparent
        opacity={zebraRingConfig.opacity}
      />
      <Line
        ref={refB}
        points={points}
        color={colorB}
        lineWidth={zebraRingConfig.lineWidth}
        dashed
        dashSize={zebraRingConfig.dashSize}
        gapSize={zebraRingConfig.gapSize}
        dashOffset={zebraRingConfig.dashOffset}
        transparent
        opacity={zebraRingConfig.opacity}
      />
    </group>
  );
}