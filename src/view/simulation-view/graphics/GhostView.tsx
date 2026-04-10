

import { droneConfig, zebraRingConfig } from "../config";
import { GhostFrame } from "../state/GhostFrame";


/**
 * JSX Komponente, die die Ghost-Drohnen in der Szene rendert
 * @param props
 * @param props.frame - Frame, der die Positionen der Ghost-Drohnen enthält
 * @returns JSX-Elemente für die Ghost-Drohnen in der Szene
 */
export function GhostView({ 
  frame
}: { 
  frame: GhostFrame;
}) {
  const ghostEntries = Array.from(frame.ghostPositions.entries())

  return (
    <>
      {ghostEntries.map(([droneId, position]) => {
        const color = frame.ghostColors.get(droneId) ?? '#ffffff'
        const dim = droneConfig.dimensions
        const radius = dim[0]

        //Abschnitt ist KI GENERIERT
        return (
          <group
            key={droneId}
            position={[position.x, position.y, position.z]}
          >

            {/* Drone */}
            <mesh>

              <sphereGeometry args={[radius, dim[1], dim[2]]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={droneConfig.emissiveIntensity}
                transparent
                opacity={0.5}
              />
            </mesh>
          </group>
        )
      })}
    </>
  )
}