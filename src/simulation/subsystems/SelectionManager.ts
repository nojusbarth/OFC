import { ISimulation } from "../ISimulation";
import { DroneFrame } from "../state/DroneFrame";
import { DroneStateStore } from "../state/DroneStateStore";
import { KeyFrameStateStore } from "../state/KeyFrameStateStore";
import { PathFrame } from "../state/PathFrame";

export class SelectionManager {
  private simulation: ISimulation;

  private droneState: DroneStateStore;
  private keyFrameState: KeyFrameStateStore;
  private selectedIds: number[];

  public constructor(
    droneState: DroneStateStore,
    keyFrameState: KeyFrameStateStore,
    simulation: ISimulation
  ) {
    this.keyFrameState = keyFrameState;
    this.droneState = droneState;
    this.simulation = simulation;
    this.selectedIds = [];
  }

  public selectDrone(id: number) {
    //hole path von simulation

    const keyFrame: PathFrame = this.simulation.requestKeyFrame(id);

    this.keyFrameState.update((draft) => {
      const positions = keyFrame.pathPositions.get(id);
      if (!positions) throw new Error(`KeyFrame ${id} not found`);

      draft.pathPositions.set(id, positions);

      const color = keyFrame.pathColors.get(id) ?? "white";
      draft.pathColors.set(id, color);
    });

    //highlight drohne, die ausgewählt wurde

    this.droneState.update((draft) => {
      draft.droneColors.set(id, "#ffffff");
    });

    if (!this.selectedIds.includes(id)) {
      this.selectedIds.push(id);
    }
  }

  public unselectDrone(id: number, time: number) {
    if (this.selectedIds.includes(id)) {
      //KEYFRAME entfernen
      this.keyFrameState.update((draft) => {
        draft.pathPositions.delete(id);
        draft.pathColors.delete(id);
      });

      //Drohne zurückfärben, falls noch existent

      const droneFrame: DroneFrame = this.simulation.requestDroneFrame(time);

      this.droneState.update((draft) => {
        const color = droneFrame.droneColors.get(id);
        if (color !== undefined) {
          draft.droneColors.set(id, color);
        }
      });

      this.selectedIds = this.selectedIds.filter((item) => item != id);
    }
  }

  public getSelected(): number[] {
    return this.selectedIds;
  }
}
