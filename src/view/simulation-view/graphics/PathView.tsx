
import React, { useRef } from "react";
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

