import { Vector3 } from "three";

/**
 * Diese Klasse repräsentiert den Zustand der Pfade der Drohnen in einem bestimmten Frame der Simulation.
 * Sie enthält die Positionen der Pfade und deren Farben.
 */
export class PathFrame {
  pathPositions: Map<number, Vector3[]> = new Map();
  pathColors: Map<number, string> = new Map();
  lineAnimated: boolean = true;
}
