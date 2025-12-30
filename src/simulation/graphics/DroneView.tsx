import React from "react";
import { DroneFrame } from "..//state//DroneFrame";

type Props = {
  frame: DroneFrame;
};

export const DroneView: React.FC<Props> = ({ frame }) => {
  /*
    Schritt 1:
    Die Map kann nicht direkt mit .map() iteriert werden.
    Deshalb wandeln wir sie explizit in ein Array um.
  */
  const droneEntries = Array.from(frame.dronePositions.entries());
  // Typ: Array<[number, Vec3]>

  /*
    Schritt 2:
    Wir rendern für jeden Eintrag (id + position) ein Mesh
  */
  return (
    <>
      {droneEntries.map((entry) => {
        /*
          Schritt 3:
          Entpacken des Tupels
        */
        const droneId = entry[0];
        const position = entry[1];

        /*
          Schritt 4:
          Farbe aus der zweiten Map lesen
          (Fallback, falls keine Farbe gesetzt ist)
        */
        const color = frame.droneColors.get(droneId) ?? "white";

        /*
          Schritt 5:
          JSX für eine Drohne zurückgeben
        */
        return (
          <mesh key={droneId} position={[position.x, position.y, position.z]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={frame.droneColors.get(droneId) ?? "white"} // das macht’s „leuchtend“
              emissiveIntensity={1.0} // Stärke des Leuchtens
            />
          </mesh>
        );
      })}
    </>
  );
};
