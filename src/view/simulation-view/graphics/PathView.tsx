
import React, { useRef } from "react";
import { Line } from "@react-three/drei";
import { PathFrame } from "../state/PathFrame";
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber'

import { pathConfig } from "../config";

type Props = {
  frame: PathFrame;
};

export const PathView: React.FC<Props> = ({ frame }) => {
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

