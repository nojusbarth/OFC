import { ISimulation } from "../ISimulation";
import { DroneStateStore } from "../state/DroneStateStore";

export class PlayBackController {
  private simulation: ISimulation;

  private droneState: DroneStateStore;

  private currentPlayTime: number;
  private isPlaying: boolean;

  constructor(droneState: DroneStateStore, simulation: ISimulation) {
    this.droneState = droneState;
    this.simulation = simulation;
    this.currentPlayTime = 0;
    this.isPlaying = false;
  }

  setPlaying(startTime: number) {
    this.currentPlayTime = startTime;
    this.isPlaying = true;
  }

  stopPlaying() {
    this.isPlaying = false;
  }
}
