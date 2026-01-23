import { Vector3 } from "three";
import { LightFrame } from "./state/LightFrame";
import { DroneFrame } from "./state/DroneFrame";
import { PathFrame } from "./state/PathFrame";
import { SceneLightFrames } from "./state/TemplateFrames";

/**
 * Im folgenden werden wichtige Szenenkonstanten konfiguriert
 */

/* ---------------- Kamera & Bounds ---------------- */
export const cameraStartPosition = new Vector3(10, 10, 10);

export const sceneBounds = {
  minX: -50,
  maxX: 50,
  minZ: -50,
  maxZ: 50,
  minY: 1,
  maxY: 20,
};

/* ---------------- OrbitControls ---------------- */
export const controlsConfig = {
  maxPolarAngle: Math.PI / 2,
  minPolarAngle: Math.PI / 6,
  minDistance: 5,
  maxDistance: 50,
};

/* ---------------- Boden ---------------- */
export const planeSize = 100;
export const planeColor = "#228B22"; // Grün wie Gras

/* ---------------- Himmel ---------------- */
export const skyConfig = {
  distance: 450000,
  inclination: 0.49,
  azimuth: 0.25,
};

/* ---------------- Standard Frames ---------------- */
export const defaultLightFrame: LightFrame = SceneLightFrames.NOON;

export const defaultDroneFrame: DroneFrame = {
  dronePositions: new Map(),
  droneColors: new Map(),
};

export const defaultPathFrame: PathFrame = {
  pathPositions: new Map(),
  pathColors: new Map(),
};

/* ---------------- Tageslicht-Frames ---------------- */
// Für Animationen oder Tageszeitwechsel
export const lightFrames = {
  night: SceneLightFrames.NIGHT,
  morning: SceneLightFrames.MORNING,
  noon: SceneLightFrames.NOON,
  evening: SceneLightFrames.EVENING,
};
