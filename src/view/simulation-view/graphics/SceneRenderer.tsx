import React, { useEffect, useState, useRef, useMemo } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader, RepeatWrapping } from "three";
import { RGBELoader } from "three-stdlib";

import { DroneStateStore } from "../state/DroneStateStore";
import { PathStateStore } from "../state/PathStateStore";
import { LightStateStore } from "../state/LightStateStore";

import { DroneView } from "./DroneView";
import { PathView } from "./PathView";

import {
  cameraStartPosition,
  sceneBounds,
  controlsConfig,
  defaultDroneFrame,
  defaultPathFrame,
  defaultLightFrame,
  planeConfig,
  lightFrames,
} from "../config";

export const SceneRenderer: React.FC<{
  droneStore: DroneStateStore;
  pathStore: PathStateStore;
  lightStore: LightStateStore;
}> = ({ droneStore, pathStore, lightStore }) => {
  const [droneFrame, setDroneFrame] = useState(defaultDroneFrame);
  const [pathFrame, setPathFrame] = useState(defaultPathFrame);
  const [lightFrame, setLightFrame] = useState(defaultLightFrame);

  const { camera, gl, scene } = useThree();
  const controlsRef = useRef<any>(null);

  /* ---------------- Store Binding ---------------- */
  useEffect(() => {
    droneStore.bindState(setDroneFrame);
    pathStore.bindState(setPathFrame);
    lightStore.bindState(setLightFrame);
  }, [droneStore, pathStore, lightStore]);

  /* ---------------- Kamera & Controls ---------------- */
  useFrame(() => {
    camera.position.x = Math.max(
      sceneBounds.minX,
      Math.min(sceneBounds.maxX, camera.position.x),
    );
    camera.position.y = Math.max(
      sceneBounds.minY,
      Math.min(sceneBounds.maxY, camera.position.y),
    );
    camera.position.z = Math.max(
      sceneBounds.minZ,
      Math.min(sceneBounds.maxZ, camera.position.z),
    );

    if (controlsRef.current) {
      controlsRef.current.target.x = Math.max(
        sceneBounds.minX,
        Math.min(sceneBounds.maxX, controlsRef.current.target.x),
      );
      controlsRef.current.target.z = Math.max(
        sceneBounds.minZ,
        Math.min(sceneBounds.maxZ, controlsRef.current.target.z),
      );
    }
  });

  /* ---------------- Boden ---------------- */
  const { size, texturePath, textureRepeat, roughness, metalness } =
    planeConfig;
  const floorTexture = new TextureLoader().load(texturePath);
  floorTexture.wrapS = floorTexture.wrapT = RepeatWrapping;
  floorTexture.repeat.set(textureRepeat[0], textureRepeat[1]);

  /* ---------------- Himmel ---------------- */
  const [hdriMap, setHdriMap] = useState<Record<string, THREE.Texture>>({});

  // Lade alle HDRIs einmal
  useMemo(() => {
    const loader = new RGBELoader();
    const frames = [
      lightFrames.night,
      lightFrames.morning,
      lightFrames.noon,
      lightFrames.evening,
    ];


    frames.forEach((frame) => {
      if (frame.skyTexturePath && !hdriMap[frame.skyTexturePath]) {
        loader.load(frame.skyTexturePath, (tex) => {
          tex.mapping = THREE.EquirectangularReflectionMapping;
          setHdriMap((prev) => ({ ...prev, [frame.skyTexturePath!]: tex }));
        });
      }
    });
  }, []);

  useMemo(() => {
    if (!lightFrame.skyTexturePath) return;
    const tex = hdriMap[lightFrame.skyTexturePath];
    if (!tex) return; // noch nicht geladen

    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();
    const envMap = pmremGenerator.fromEquirectangular(tex).texture;

    scene.environment = envMap;
    scene.background = envMap;
    gl.toneMappingExposure = lightFrame.intensity;

    return () => {
      envMap.dispose();
      pmremGenerator.dispose();
    };
  }, [lightFrame, hdriMap, gl, scene]);

  /*-------------- Rendering --------------------- */

  return (
    <>
      {/* Kamera */}
      <PerspectiveCamera
        makeDefault
        position={cameraStartPosition.toArray()}
        fov={60}
      />

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
        position={[
          lightFrame.position.x,
          lightFrame.position.y,
          lightFrame.position.z,
        ]}
        castShadow
      />

      {/* Boden */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial
          map={floorTexture}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>

      {/* Drohnen & Pfad */}
      <DroneView frame={droneFrame} />
      <PathView frame={pathFrame} />
    </>
  );
};
