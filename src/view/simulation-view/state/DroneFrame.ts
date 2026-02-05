import { Color, Vector3 } from "three";

export class DroneFrame {
  dronePositions: Map<number, Vector3> = new Map();
  droneColors: Map<number, Color> = new Map();
  outlineColors: Map<number, [string, string] | null> = new Map();
}
