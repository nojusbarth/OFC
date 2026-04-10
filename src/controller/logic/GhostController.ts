import { Vector3 } from "three";
import { IGhostController } from "../interface/IGhostController";
import { OFCEvent } from "../interface/OFCEvent";

export class GhostController implements IGhostController {
  private ghostPositions: Map<number, Vector3>;
  private ghostChangeEvent: OFCEvent<void> = new OFCEvent();

  constructor() {
    this.ghostPositions = new Map();
  }

  resetGhosts(withEvent: boolean = true): void {
    if (this.ghostPositions.size !== 0) {
      this.ghostPositions.clear();
      if (withEvent) {
        this.ghostChangeEvent.notify();
      }
    }
  }
  setGhostPositions(ghostPositions: Map<number, Vector3>): void {
    this.ghostPositions = new Map(ghostPositions);
    this.ghostChangeEvent.notify();
  }

  getGhosts(): Map<number, Vector3> {
    return new Map(this.ghostPositions);
  }

  getGhostChangeEvent(): OFCEvent<void> {
    return this.ghostChangeEvent;
  }
}
