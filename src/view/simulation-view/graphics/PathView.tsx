
import React, { useMemo, useRef } from "react";
import { Line } from "@react-three/drei";
import { PathFrame } from "../state/PathFrame";
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber'

import { pathConfig } from "../config";

/**
 * JSX Komponente, die die Pfade der Drohnen in der Szene rendert
 * @param props
 * @param props.frame - PathFrame, der die Positionen und Farben der Pfade enthält
 * @returns JSX-Elemente für die Pfade in der Szene
 */
export function PathView({ frame }: { frame: PathFrame }) {
  const shouldAnimateLines = frame.lineAnimated;

  if (!shouldAnimateLines) {
    return <BatchedPaths frame={frame} />
  }

  return (
    <>
      {Array.from(frame.pathPositions.entries()).map(([id, points]) => {
        if (points.length < 2) return null

        const color = frame.pathColors.get(id) ?? '#ffffff'

        return (
          <AnimatedPath
            key={id}
            points={points}
            color={color}
          />
        )

      })}
    </>
  )
}

function BatchedPaths({ frame }: { frame: PathFrame }) {
  const { positions, colors } = useMemo(() => {
    const positionArray: number[] = []
    const colorArray: number[] = []
    const tempColor = new THREE.Color()

    for (const [id, points] of frame.pathPositions.entries()) {
      if (points.length < 2) continue

      const color = frame.pathColors.get(id) ?? '#ffffff'
      tempColor.set(color)

      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1]
        const b = points[i]

        positionArray.push(a.x, a.y, a.z, b.x, b.y, b.z)
        colorArray.push(
          tempColor.r,
          tempColor.g,
          tempColor.b,
          tempColor.r,
          tempColor.g,
          tempColor.b,
        )
      }
    }

    return {
      positions: new Float32Array(positionArray),
      colors: new Float32Array(colorArray),
    }
  }, [frame.pathPositions, frame.pathColors])

  if (positions.length === 0) return null

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={pathConfig.opacity}
      />
    </lineSegments>
  )
}

//Abschnitt ist KI GENERIERT
function AnimatedPath({ points, color }: { points: THREE.Vector3[]; color: string }) {
  const ref = useRef<any>(null)

  useFrame(() => {
    if (!ref.current) return
    ref.current.material.dashOffset -= pathConfig.dashOffsetSpeed
  })

  return (
    <Line
      ref={ref}
      points={points}
      color={color}
      lineWidth={pathConfig.lineWidth}
      dashed
      dashSize={pathConfig.dashSize}
      gapSize={pathConfig.gapSize}
      transparent
      opacity={pathConfig.opacity}
    />
  )
}

