import React, { useEffect, useState } from "react";
import { OrbitControls, PerspectiveCamera, Sky } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";

import { DroneStateStore } from "../state/DroneStateStore";
import { PathStateStore } from "../state/PathStateStore";
import { LightStateStore } from "../state/LightStateStore";

import { DroneView } from "./DroneView";
import { PathView } from "./PathView";

import { DroneFrame } from "../state/DroneFrame";
import { PathFrame } from "../state/PathFrame";
import { LightFrame } from "../state/LightFrame";

import { Vector3 } from "three";


const initialDroneFrame: DroneFrame = {
  dronePositions: new Map([]),
  droneColors: new Map([]),
};

const initialPathFrame: PathFrame = {
  pathPositions: new Map([]),
  pathColors: new Map([])
};

const initialLightFrame: LightFrame = {
  intensity: 1,
  color: "white",
  position: new Vector3( 5, 5, 5 ),
};

type SceneRendererProps = {
  droneStore: DroneStateStore;
  pathStore: PathStateStore;
  lightStore: LightStateStore;
};

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  droneStore,
  pathStore,
  lightStore,
}) => {
  /* ---------------- React State ---------------- */
  const [droneFrame, setDroneFrame] = useState<DroneFrame>(initialDroneFrame);
  const [pathFrame, setPathFrame] = useState<PathFrame>(initialPathFrame);
  const [lightFrame, setLightFrame] = useState<LightFrame>(initialLightFrame);

  /* ---------------- Store ↔ React Binding ---------------- */
  useEffect(() => {
    droneStore.bindState(setDroneFrame);
    pathStore.bindState(setPathFrame);
    lightStore.bindState(setLightFrame);
  }, [droneStore, pathStore, lightStore]);

  /* ---------------- Kamera-Schutz ---------------- */
  const { camera } = useThree();
  const minCameraHeight = 1;

  useFrame(() => {
    if (camera.position.y < minCameraHeight) {
      camera.position.y = minCameraHeight;
    }
  });

  /* ---------------- Render ---------------- */
  return (
    <>
      {/* Kamera & Controls */}
      <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={60} />
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        minDistance={5}
        maxDistance={50}
      />

      {/* Licht */}
      <ambientLight intensity={0.3} />
      <directionalLight
        intensity={lightFrame.intensity}
        color={lightFrame.color}
        position={[
          lightFrame.position.x,
          lightFrame.position.y,
          lightFrame.position.z,
        ]}
        castShadow
      />

      {/* Boden */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      {/* Himmel */}
      <Sky
        distance={450000}
        sunPosition={[
          lightFrame.position.x,
          lightFrame.position.y,
          lightFrame.position.z,
        ]}
        inclination={0.49}
        azimuth={0.25}
      />

      {/* Szene */}
      <DroneView frame={droneFrame} />
      <PathView frame={pathFrame} />
    </>
  );
};

