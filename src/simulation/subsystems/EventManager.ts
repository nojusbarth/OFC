import { ISimulation } from "../ISimulation";
import { DroneFrame } from "../state/DroneFrame";
import { DroneStateStore } from "../state/DroneStateStore";
import { LightStateStore } from "../state/LightStateStore";

export class EventManager {
  private simulation: ISimulation;

  private droneState: DroneStateStore;

  public constructor(droneState: DroneStateStore, simulation: ISimulation) {
    this.droneState = droneState;
    this.simulation = simulation;
  }

  public notifyChange(time: number) {
    var newFrame: DroneFrame = this.simulation.requestDroneFrame(time);

    this.droneState.update((draft) => {
      draft.dronePositions = new Map(newFrame.dronePositions);
      draft.droneColors = new Map(newFrame.droneColors);
    });
  }
}
