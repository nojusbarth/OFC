import { Vector3 } from "three";
import { OFCEvent } from "./OFCEvent";

export interface IGhostController {
  resetGhosts(withEvent?: boolean): void;

  setGhostPositions(ghostPositions: Map<number, Vector3>): void;

  getGhosts(): Map<number, Vector3>;

  getGhostChangeEvent(): OFCEvent<void>;
}
