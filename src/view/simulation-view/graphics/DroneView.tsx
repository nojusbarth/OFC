import React from "react";
import { DroneFrame } from "../state/DroneFrame";

import { droneConfig, zebraRingConfig } from "../config";
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
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
  const drawDetails = frame.drawDetails;
  const outlinedDrones = useMemo(
    () =>
      droneEntries
        .map(([droneId, position]) => {
          const outlineColors = frame.outlineColors.get(droneId) ?? null;
          if (!outlineColors) return null;
          return { position, color: outlineColors[0] };
        })
        .filter((value): value is { position: THREE.Vector3; color: string } => value !== null),
    [droneEntries, frame.outlineColors],
  );
  const { camera } = useThree();

  const ringsRef = useRef<Map<string, RingRuntime>>(new Map());
  const worldPos = useRef(new THREE.Vector3());

  const registerRing = useCallback((runtime: RingRuntime) => {
    ringsRef.current.set(runtime.id, runtime);
    return () => ringsRef.current.delete(runtime.id);
  }, []);

  useFrame(() => {
    for (const ring of ringsRef.current.values()) {
      if (!ring.anchor || !ring.lineA || !ring.lineB) continue;



      ring.anchor.getWorldPosition(worldPos.current);
      const distance = camera.position.distanceTo(worldPos.current);
      const scaledWidth = Math.max(
        0.5,
        zebraRingConfig.lineWidth * (5 / Math.max(distance, 0.001))
      );

      if (drawDetails) {
        ring.lineA.material.dashOffset -= zebraRingConfig.dashOffsetSpeed;
        ring.lineB.material.dashOffset -= zebraRingConfig.dashOffsetSpeed;
      }

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
            {drawDetails && showOutline && (
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

      {!drawDetails && outlinedDrones.length > 0 && (
        <SimpleRingInstances
          outlinedDrones={outlinedDrones}
          ringRadius={droneConfig.dimensions[0] * 1.35}
        />
      )}
    </>
  );
}

function SimpleRingInstances({
  outlinedDrones,
  ringRadius,
}: {
  outlinedDrones: Array<{ position: THREE.Vector3; color: string }>;
  ringRadius: number;
}) {
  const ringRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useRef(new THREE.Object3D());
  const tempColor = useRef(new THREE.Color());
  const ringTube = Math.max(ringRadius * 0.06, 0.01);

  const orientations = useMemo(
    () => {
      // torusGeometry startet in der XY-Ebene (Normalenrichtung Z)
      // Wir erzeugen explizit Ringe fuer Z-, Y- und X-Achse.
      const zRing = new THREE.Quaternion();
      const yRing = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        Math.PI / 2,
      );
      const xRing = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.PI / 2,
      );
      return [zRing, yRing, xRing];
    },
    [],
  );

  useEffect(() => {
    const mesh = ringRef.current;
    if (!mesh) return;

    let instanceIndex = 0;

    for (const outlinedDrone of outlinedDrones) {
      for (const orientation of orientations) {
        tempObject.current.position.copy(outlinedDrone.position);
        tempObject.current.quaternion.copy(orientation);
        tempObject.current.updateMatrix();
        mesh.setMatrixAt(instanceIndex, tempObject.current.matrix);

        tempColor.current.set(outlinedDrone.color);
        mesh.setColorAt(instanceIndex, tempColor.current);

        instanceIndex += 1;
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
    mesh.computeBoundingSphere();
    mesh.computeBoundingBox();
  }, [outlinedDrones, orientations]);

  return (
    <instancedMesh
      ref={ringRef}
      args={[undefined, undefined, outlinedDrones.length * 3]}
      frustumCulled={false}
      raycast={() => undefined}
    >
      <torusGeometry args={[ringRadius, ringTube, 8, 24]} />
      <meshBasicMaterial
        vertexColors
        transparent
        opacity={zebraRingConfig.opacity}
      />
    </instancedMesh>
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