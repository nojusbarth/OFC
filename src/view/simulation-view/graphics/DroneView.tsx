import React from "react";
import { DroneFrame } from "../state/DroneFrame";

import { droneConfig, zebraRingConfig } from "../config";
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Line } from '@react-three/drei'
import { useThree } from '@react-three/fiber'


/**
 * JSX Komponente, die die Drohnen in der Szene rendert
 * @param props
 * @param props.frame - DroneFrame, der die Positionen, Farben und optionalen Outline-Farben der Drohnen enthält
 * @returns JSX-Elemente für die Drohnen in der Szene
 */
export function DroneView({ frame }: { frame: DroneFrame }) {
  const droneEntries = Array.from(frame.dronePositions.entries())

  return (
    <>
      {droneEntries.map(([droneId, position]) => {
        const color = frame.droneColors.get(droneId) ?? '#ffffff'
        const dim = droneConfig.dimensions
        const radius = dim[0]
        const outlineColors = frame.outlineColors.get(droneId) ?? null
        const showOutline = outlineColors !== null

        //Abschnitt ist KI GENERIERT
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

            {/* Drone */}
            <mesh>
              <sphereGeometry args={[radius, dim[1], dim[2]]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={droneConfig.emissiveIntensity}
              />
            </mesh>
          </group>
        )
      })}
    </>
  )
}

//Abschnitt ist KI GENERIERT
function ZebraRing({
  radius,
  colorA,
  colorB,
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


