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
  onReady?: (gl: THREE.WebGLRenderer) => void;
}> = ({ droneStore, pathStore, lightStore, onReady }) => {
  const [droneFrame, setDroneFrame] = useState(defaultDroneFrame);
  const [pathFrame, setPathFrame] = useState(defaultPathFrame);
  const [lightFrame, setLightFrame] = useState(defaultLightFrame);

  const { camera, gl, scene } = useThree();
  const controlsRef = useRef<any>(null);
  const envMapCacheRef = useRef<Record<string, THREE.Texture>>({});

  /* ---------------- Canvas Setup für Recording & Store Binding ---------------- */
  useEffect(() => {
    // Enable drawing buffer for canvas recording
    const context = gl.getContext() as WebGLRenderingContext;
    if (context) {
      (context as any).preserveDrawingBuffer = true;
    }

    // Bind stores
    droneStore.bindState(setDroneFrame);
    pathStore.bindState(setPathFrame);
    lightStore.bindState(setLightFrame);

    // Notify ready with gl renderer
    onReady?.(gl);
  }, [gl, onReady, droneStore, pathStore, lightStore]);

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

  /* ---------------- Boden */
  const { size, texturePath, textureRepeat, roughness, metalness } =
    planeConfig;
  
  // CRITICAL FIX #1: Texture memoizen statt bei jedem Render neu laden
  const floorTexture = useMemo(() => {
    const tex = new TextureLoader().load(texturePath);
    tex.wrapS = tex.wrapT = RepeatWrapping;
    tex.repeat.set(textureRepeat[0], textureRepeat[1]);
    return tex;
  }, [texturePath, textureRepeat]);

  /* ---------------- Himmel ---------------- */
  const [hdriMap, setHdriMap] = useState<Record<string, THREE.Texture>>({});

  // Lade alle HDRIs einmal
  useEffect(() => {
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

  useEffect(() => {
    if (!lightFrame.skyTexturePath) return;
    const tex = hdriMap[lightFrame.skyTexturePath];
    if (!tex) return; // noch nicht geladen

    // PMREM nur einmal pro Textur erzeugen und cachen
    if (!envMapCacheRef.current[lightFrame.skyTexturePath]) {
      const pmremGenerator = new THREE.PMREMGenerator(gl);
      pmremGenerator.compileEquirectangularShader();
      const envMap = pmremGenerator.fromEquirectangular(tex).texture;
      envMapCacheRef.current[lightFrame.skyTexturePath] = envMap;
      pmremGenerator.dispose();
    }

    const cachedEnvMap = envMapCacheRef.current[lightFrame.skyTexturePath];
    scene.environment = cachedEnvMap;
    scene.background = cachedEnvMap;
  }, [lightFrame.skyTexturePath, hdriMap, gl, scene]);

  // Exposure separat → ändert sich häufig, sollte nicht das Environment neuerzeigen
  useEffect(() => {
    gl.toneMappingExposure = lightFrame.intensity;
  }, [lightFrame.intensity, gl]);

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
