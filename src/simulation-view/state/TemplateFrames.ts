import { Vector3 } from "three";
import { LightFrame } from "./LightFrame";

/**
 * Vordefinierte Licht-Frames für verschiedene Tageszeiten.
 */
export const SceneLightFrames: Record<string, LightFrame> = {
  NIGHT: {
    intensity: 0.15,
    color: "#6b7cff",
    position: new Vector3(0, -10, 5),
  },
  MORNING: {
    intensity: 0.6,
    color: "#ffb347",
    position: new Vector3(10, 5, 10),
  },
  NOON: {
    intensity: 1.2,
    color: "#ffffff",
    position: new Vector3(0, 20, 0),
  },
  EVENING: {
    intensity: 0.5,
    color: "#ff7a18",
    position: new Vector3(-10, 4, -10),
  },
};
