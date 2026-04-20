import { Color, Vector3 } from "three";

/**
 * Diese Klasse repräsentiert den Zustand aller Drohnen in einem bestimmten Frame der Simulation.
 * Sie enthält die Positionen, Farben und optionalen Outline-Farben der Drohnen.
 */
export class DroneFrame {
  dronePositions: Map<number, Vector3> = new Map();
  droneColors: Map<number, string> = new Map();
  outlineColors: Map<number, [string, string] | null> = new Map();
  outlineAnimated: boolean = true;
}
