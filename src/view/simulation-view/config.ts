import { Vector3 } from "three";
import { LightFrame } from "./state/LightFrame";
import { DroneFrame } from "./state/DroneFrame";
import { PathFrame } from "./state/PathFrame";
import { GhostFrame } from "./state/GhostFrame";

/**
 * Im folgenden werden wichtige Szenenkonstanten konfiguriert
 */

/* ---------------- Kamera & Bounds ---------------- */
export const cameraStartPosition = new Vector3(10, 10, 10);
export const cameraFOV = 60;

export const sceneBounds = {
  minX: -50,
  maxX: 50,
  minZ: -50,
  maxZ: 50,
  minY: 1,
  maxY: 50,
};

/* ---------------- OrbitControls ---------------- */
export const controlsConfig = {
  maxPolarAngle: Math.PI,
  minPolarAngle: Math.PI / 6,
  minDistance: 5,
  maxDistance: 50,
};

/* ---------------- Boden ---------------- */
export const planeConfig = {
  size: 100,
  color: "#228B22", // Fallback, falls Textur fehlt
  texturePath: "./assets/floor/cobble_clean.jpg",
  textureRepeat: [50, 50],
  roughness: 1, // 0 = glänzend, 1 = matt
  metalness: 0, // 0 = nicht metallisch, 1 = metallisch
};

/* ---------------- Tageslicht-Frames ---------------- */

export const sceneLightFrames: Record<string, LightFrame> = {
  NIGHT: {
    intensity: 0.15,
    color: "#6b7cff",
    position: new Vector3(0, -10, 5),
    skyTexturePath: "./assets/sky/night.hdr",
  },
  NOON: {
    intensity: 1.2,
    color: "#ffffff",
    position: new Vector3(0, 20, 0),
    skyTexturePath: "./assets/sky/noon.hdr",
  },
  SUNSET: {
    intensity: 0.5,
    color: "#ff7a18",
    position: new Vector3(-10, 4, -10),
    skyTexturePath: "./assets/sky/evening.hdr",
  },
};

// Für Animationen oder Tageszeitwechsel
export const lightFrames = {
  night: sceneLightFrames.NIGHT,
  noon: sceneLightFrames.NOON,
  sunset: sceneLightFrames.SUNSET,
};

/* ---------------- Standard Frames ---------------- */
export const defaultLightFrame: LightFrame = sceneLightFrames.NOON;

export const defaultDroneFrame: DroneFrame = {
  dronePositions: new Map(),
  droneColors: new Map(),
  outlineColors: new Map(),
  outlineAnimated: true,
};

export const defaultGhostFrame: GhostFrame = {
  ghostPositions: new Map(),
  ghostColors: new Map(),
};

export const defaultPathFrame: PathFrame = {
  pathPositions: new Map(),
  pathColors: new Map(),
};

/* ---------------- Drohnen & Pfad Properties ---------------- */

export const droneConfig = {
  // SphereGeometry: [radius, widthSegments, heightSegments]
  dimensions: [0.3, 16, 16],
  emissiveIntensity: 5,
};

export const pathConfig = {
  lineWidth: 4,
  dashSize: 0.3,
  gapSize: 0.2,
  opacity: 0.9,
  dashOffsetSpeed: 0.01,
};

export const zebraRingConfig = {
  lineWidth: 3,
  dashSize: 0.25,
  gapSize: 0.25,
  dashOffset: 0.25,
  opacity: 0.9,
  dashOffsetSpeed: 0.01,
};

export const maxDronesAnimated = 15;
