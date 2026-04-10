import { Color, Vector3 } from "three";

/**
 * Diese Klasse repräsentiert den Zustand aller Ghost-Drohnen in einem bestimmten Frame der Simulation.
 */
export class GhostFrame {
  ghostPositions: Map<number, Vector3> = new Map();
  ghostColors: Map<number, string> = new Map();
}
