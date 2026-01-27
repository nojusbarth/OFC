import { Vector3 } from "three";

export class PathFrame {
  pathPositions: Map<number, Vector3[]> = new Map();
  pathColors: Map<number, string> = new Map();
}
