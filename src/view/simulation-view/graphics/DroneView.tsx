import React from "react";
import { DroneFrame } from "../state/DroneFrame";

import { droneConfig } from "../config";
import { Color } from "three";

type Props = {
  frame: DroneFrame;
};

export const DroneView: React.FC<Props> = ({ frame }) => {

  const droneEntries = Array.from(frame.dronePositions.entries());

  return (
    <>
      {droneEntries.map((entry) => {
        const droneId = entry[0];
        const position = entry[1];

        const color = frame.droneColors.get(droneId) ?? "white";

        const dim = droneConfig.dimensions;

        return (
          <mesh key={droneId} position={[position.x, position.y, position.z]}>
            <sphereGeometry args={[dim[0], dim[1], dim[2]]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={droneConfig.emissiveIntensity}
            />
          </mesh>
        );
      })}
    </>
  );
};
