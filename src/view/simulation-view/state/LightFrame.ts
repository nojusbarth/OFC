import { Vector3 } from "three";

/**
 * Diese Klasse repräsentiert den Zustand der Lichtquelle in einem bestimmten Frame der Simulation.
 * Sie enthält die Intensität, Farbe, Position und optional den Pfad zu einer Skybox-Textur.
 */
export class LightFrame {
  intensity: number = 1;
  color: string = "#ffffff";
  position: Vector3 = new Vector3();
  skyTexturePath?: string;
}
