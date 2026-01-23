import React, { useEffect, useState, useRef } from "react";
import { OrbitControls, PerspectiveCamera, Sky } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";

import { DroneStateStore } from "../state/DroneStateStore";
import { PathStateStore } from "../state/PathStateStore";
import { LightStateStore } from "../state/LightStateStore";

import { DroneView } from "./DroneView";
import { PathView } from "./PathView";

import {
  cameraStartPosition,
  sceneBounds,
  controlsConfig,
  planeSize,
  planeColor,
  skyConfig,
  defaultDroneFrame,
  defaultPathFrame,
  defaultLightFrame,
} from "../config";

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
  const [droneFrame, setDroneFrame] = useState(defaultDroneFrame);
  const [pathFrame, setPathFrame] = useState(defaultPathFrame);
  const [lightFrame, setLightFrame] = useState(defaultLightFrame);

  /* ---------------- Store Binding ---------------- */
  useEffect(() => {
    droneStore.bindState(setDroneFrame);
    pathStore.bindState(setPathFrame);
    lightStore.bindState(setLightFrame);
  }, [droneStore, pathStore, lightStore]);

  /* ---------------- Kamera & Controls ---------------- */
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useFrame(() => {
    // Kamera-Position clampen innerhalb der Bounds
    camera.position.x = Math.max(sceneBounds.minX, Math.min(sceneBounds.maxX, camera.position.x));
    camera.position.y = Math.max(sceneBounds.minY, Math.min(sceneBounds.maxY, camera.position.y));
    camera.position.z = Math.max(sceneBounds.minZ, Math.min(sceneBounds.maxZ, camera.position.z));

    // OrbitControls Target clampen
    if (controlsRef.current) {
      controlsRef.current.target.x = Math.max(sceneBounds.minX, Math.min(sceneBounds.maxX, controlsRef.current.target.x));
      controlsRef.current.target.z = Math.max(sceneBounds.minZ, Math.min(sceneBounds.maxZ, controlsRef.current.target.z));
    }
  });

  /* ---------------- Render ---------------- */
  return (
    <>
      {/* Kamera */}
      <PerspectiveCamera makeDefault position={cameraStartPosition.toArray()} fov={60} />

      {/* Controls */}
      <OrbitControls
        ref={controlsRef}
        maxPolarAngle={controlsConfig.maxPolarAngle}
        minPolarAngle={controlsConfig.minPolarAngle}
        minDistance={controlsConfig.minDistance}
        maxDistance={controlsConfig.maxDistance}
      />

      {/* Licht */}
      <ambientLight intensity={0.3} />
      <directionalLight
        intensity={lightFrame.intensity}
        color={lightFrame.color}
        position={[lightFrame.position.x, lightFrame.position.y, lightFrame.position.z]}
        castShadow
      />

      {/* Boden */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[planeSize, planeSize]} />
        <meshStandardMaterial color={planeColor} />
      </mesh>

      {/* Himmel */}
      <Sky
        distance={skyConfig.distance}
        sunPosition={[lightFrame.position.x, lightFrame.position.y, lightFrame.position.z]}
        inclination={skyConfig.inclination}
        azimuth={skyConfig.azimuth}
      />

      {/* Szene */}
      <DroneView frame={droneFrame} />
      <PathView frame={pathFrame} />
    </>
  );
};
