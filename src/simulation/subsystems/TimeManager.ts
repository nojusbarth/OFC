import { ISimulation } from "../ISimulation";
import { DroneFrame } from "../state/DroneFrame";
import { DroneStateStore } from "../state/DroneStateStore";
import { LightStateStore } from "../state/LightStateStore";

export class TimeManager {
  private simulation: ISimulation;

  private droneState: DroneStateStore;
  private lightState: LightStateStore;
  private currentEditorTime: number;

  public constructor(
    droneState: DroneStateStore,
    lightState: LightStateStore,
    simulation: ISimulation
  ) {
    this.currentEditorTime = 0;
    this.lightState = lightState;
    this.droneState = droneState;
    this.simulation = simulation;
  }

  public setEditorTime(time: number) {
    this.currentEditorTime = time;

    var newFrame: DroneFrame = this.simulation.requestDroneFrame(time);

    this.droneState.update((draft) => {
      draft.dronePositions = new Map(newFrame.dronePositions);
      draft.droneColors = new Map(newFrame.droneColors);
    });
  }

  public getCurrentEditorTime() {
    return this.currentEditorTime;
  }
}
