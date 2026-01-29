
import { Vector3 } from "three";


export class DroneFrame {
  dronePositions: Map<number, Vector3> = new Map();
  droneColors: Map<number, string> = new Map();
}