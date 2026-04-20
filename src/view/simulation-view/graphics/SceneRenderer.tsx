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
  cameraFOV,
  defaultGhostFrame,
} from "../config";
import { GhostView } from "./GhostView";
import { GhostStateStore } from "../state/GhostStateStore";


/**
 * JSX Komponente für die 3D-Szene der Simulation.
 * @param props
 * @param props.droneStore - Wrapper für den Drone-Frame State
 * @param props.pathStore - Wrapper für den Path-Frame State
 * @param props.lightStore - Wrapper für den Light-Frame State
 * @param props.onReady - Callback, der die WebGLRenderer-Instanz zurückgibt, sobald sie verfügbar ist
 * @returns JSX.Element der Szene
 */
export function SceneRenderer({ 
  droneStore, ghostStore, pathStore, lightStore, onReady, onDroneClick, onDroneDoubleClick }: {
  droneStore: DroneStateStore;
  ghostStore: GhostStateStore;
  pathStore: PathStateStore;
  lightStore: LightStateStore;
  onReady?: (gl: THREE.WebGLRenderer) => void;
  onDroneClick?: (droneId: number) => void;
  onDroneDoubleClick?: (droneId: number) => void;
}) {

  const [droneFrame, setDroneFrame] = useState(defaultDroneFrame);
  const [ghostFrame, setGhostFrame] = useState(defaultGhostFrame);
  const [pathFrame, setPathFrame] = useState(defaultPathFrame);
  const [lightFrame, setLightFrame] = useState(defaultLightFrame);

  const { camera, gl, scene } = useThree();
  const perfRef = useRef({
    frames: 0,
    totalDeltaMs: 0,
    totalCpuMs: 0,
    maxCpuMs: 0,
  });
  //inital null, da sie erst nach dem ersten Rendern gesetzt wird. Alle Zugriffe müssen auf current geprüft werden.
  const controlsRef = useRef<any>(null);

  const envMapCacheRef = useRef<Record<string, THREE.Texture>>({});

  /* ---------------- Canvas Setup für Recording & Store Binding ---------------- */
  useEffect(() => {
    // Drawing Buffer wird für den Video-Recorder benötigt
    const context = gl.getContext() as WebGLRenderingContext;
    if (context) {
      (context as any).preserveDrawingBuffer = true;
    }

    // State Stores mit Hooks initialisieren
    droneStore.bindState(setDroneFrame);
    pathStore.bindState(setPathFrame);
    lightStore.bindState(setLightFrame);
    ghostStore.bindState(setGhostFrame);

    onReady?.(gl);
  }, [gl, onReady, droneStore, pathStore, lightStore, ghostStore]);

  /* ---------------- Kamera & Controls ---------------- */
  useFrame((state, delta) => {
    const frameStart = performance.now();
    /**
     * OrbitControls arbeiten mit ZWEI zentralen Größen:
     *
     * 1) camera.position
     *    → die tatsächliche Position der Kamera im Raum
     *
     * 2) controls.target
     *    → der Fokuspunkt, auf den die Kamera schaut
     *       und um den sie rotiert
     *
     * Es gibt KEINE zweite Kamera!
     * OrbitControls bewegen die Kamera immer relativ zu ihrem Target:
     *   camera.position = target + Offset
     *   camera.lookAt(target)
     *
     * Deshalb müssen BEIDE Werte begrenzt werden
     * Würde man nur eines clampen, entstünden kaputte Orbit-Bewegungen
     */

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

    const cpuMs = performance.now() - frameStart;
    const perf = perfRef.current;

    perf.frames += 1;
    perf.totalDeltaMs += delta * 1000;
    perf.totalCpuMs += cpuMs;
    perf.maxCpuMs = Math.max(perf.maxCpuMs, cpuMs);

    // Intervall-Logging fuer den gesamten Canvas-Renderzyklus
    if (perf.frames >= 120) {
      const avgFrameMs = perf.totalDeltaMs / perf.frames;
      const avgCpuMs = perf.totalCpuMs / perf.frames;

      console.log("[Canvas Perf]", {
        avgFrameMs: Number(avgFrameMs.toFixed(2)),
        avgCpuMs: Number(avgCpuMs.toFixed(2)),
        maxCpuMs: Number(perf.maxCpuMs.toFixed(2)),
        approxFps: Number((1000 / avgFrameMs).toFixed(1)),
        drawCalls: state.gl.info.render.calls,
        triangles: state.gl.info.render.triangles,
        lines: state.gl.info.render.lines,
        points: state.gl.info.render.points,
      });

      perf.frames = 0;
      perf.totalDeltaMs = 0;
      perf.totalCpuMs = 0;
      perf.maxCpuMs = 0;
    }
  });

  /* ---------------- Boden ------------------*/
  const { size, texturePath, textureRepeat, roughness, metalness } =
    planeConfig;

  //Abschnitt ist KI GENERIERT
  const floorTexture = useMemo(() => {
    const tex = new TextureLoader().load(texturePath);
    tex.wrapS = tex.wrapT = RepeatWrapping;
    tex.repeat.set(textureRepeat[0], textureRepeat[1]);
    return tex;
  }, [texturePath, textureRepeat]);

  /* ---------------- Himmel ---------------- */

  const [hdriMap, setHdriMap] = useState<Record<string, THREE.Texture>>({});

  // Lade und cache HDRI - Texturen
  useEffect(() => {
    const loader = new RGBELoader();
    const frames = [
      lightFrames.night,
      lightFrames.noon,
      lightFrames.sunset,
    ];

    //Abschnitt ist KI GENERIERT
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
    if (!tex) return;

    // PMREM (Environment Licht) nur einmal pro Textur erzeugen und cachen
    //Abschnitt ist KI GENERIERT
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
        fov={cameraFOV}
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
      <DroneView frame={droneFrame} onDroneClick={onDroneClick} onDroneDoubleClick={onDroneDoubleClick} />
      <GhostView frame={ghostFrame} />
      <PathView frame={pathFrame} />
    </>
  );
}
