import React from "react";
import { DroneFrame } from "../state/DroneFrame";

import { droneConfig, zebraRingConfig } from "../config";
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Line } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { RGBA_ASTC_5x4_Format } from "three";


type Props = {
  frame: DroneFrame;
};



export const DroneView: React.FC<Props> = ({ frame }) => {
  const droneEntries = Array.from(frame.dronePositions.entries())

  return (
    <>
      {droneEntries.map(([droneId, position]) => {
        const color = frame.droneColors.get(droneId) ?? 'white'
        const dim = droneConfig.dimensions
        const radius = dim[0]
        const outlineColors = frame.outlineColors.get(droneId) ?? null
        const showOutline = outlineColors !== null

        return (
          <group
            key={droneId}
            position={[position.x, position.y, position.z]}
          >
            {/* Zebra Outline Rings */}
            {showOutline && (
              <>
                <ZebraRing radius={radius * 1.35} colorA={outlineColors[0]} colorB={outlineColors[1]} />
                <group rotation={[Math.PI / 2, 0, 0]}>
                  <ZebraRing radius={radius * 1.35} colorA={outlineColors[0]} colorB={outlineColors[1]} />
                </group>
                <group rotation={[0, 0, Math.PI / 2]}>
                  <ZebraRing radius={radius * 1.35} colorA={outlineColors[0]} colorB={outlineColors[1]} />
                </group>
              </>
            )}

            {/* 🟢 Drone */}
            <mesh>
              <sphereGeometry args={[radius, dim[1], dim[2]]} />
              <meshStandardMaterial
                color={color}
                emissive={new THREE.Color(color).multiplyScalar(0.6)}
                emissiveIntensity={droneConfig.emissiveIntensity}
     
              />
            </mesh>
          </group>
        )
      })}
    </>
  )
}

/* ============================
   ZebraRing: animierte Line mit 2 Farben
   ============================ */
function ZebraRing({
  radius,
  colorA = "#00ffff",
  colorB = "#ff00ff",
}: {
  radius: number
  colorA?: string
  colorB?: string
}) {
  const refA = useRef<any>(null)
  const refB = useRef<any>(null)
  const [lineWidth, setLineWidth] = useState(zebraRingConfig.lineWidth)
  const { camera } = useThree()
  const worldPosition = useRef(new THREE.Vector3())

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const segments = 64
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ))
    }
    return pts
  }, [radius])

  useFrame(() => {
    if (refA.current) refA.current.material.dashOffset -= zebraRingConfig.dashOffsetSpeed
    if (refB.current) refB.current.material.dashOffset -= zebraRingConfig.dashOffsetSpeed

    // Berechne Entfernung zwischen Kamera und diesem Ring
    if (refA.current) {
      refA.current.getWorldPosition(worldPosition.current)
      const distance = camera.position.distanceTo(worldPosition.current)
      // Skaliere lineWidth basierend auf Entfernung (je weiter weg, desto dünner)
      const scaledWidth = Math.max(0.5, zebraRingConfig.lineWidth * (5 / distance))
      setLineWidth(scaledWidth)
    }
  })

  return (
    <>
      {/* Farbe A */}
      <Line
        ref={refA}
        points={points}
        color={colorA}
        lineWidth={lineWidth}
        dashed
        dashSize={zebraRingConfig.dashSize}
        gapSize={zebraRingConfig.gapSize}
        transparent
        opacity={zebraRingConfig.opacity}
      />
      {/* Farbe B, leicht versetzt für Zebra */}
      <Line
        ref={refB}
        points={points}
        color={colorB}
        lineWidth={lineWidth}
        dashed
        dashSize={zebraRingConfig.dashSize}
        gapSize={zebraRingConfig.gapSize}
        dashOffset={zebraRingConfig.dashOffset}
        transparent
        opacity={zebraRingConfig.opacity}
      />
    </>
  )
}


