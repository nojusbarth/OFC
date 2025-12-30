import { ISimulation } from "../ISimulation";
import { DroneFrame } from "../state/DroneFrame";
import { DroneStateStore } from "../state/DroneStateStore";
import { KeyFrameStateStore } from "../state/KeyFrameStateStore";
import { PathFrame } from "../state/PathFrame";
import { Collision } from "../../Collision";

export class CollisionManager {
  private simulation: ISimulation;

  private droneState: DroneStateStore;
  private keyFrameState: KeyFrameStateStore;
  private currentCollision: Collision;

  public constructor(
    droneState: DroneStateStore,
    keyFrameState: KeyFrameStateStore,
    simulation: ISimulation
  ) {
    this.keyFrameState = keyFrameState;
    this.droneState = droneState;
    this.simulation = simulation;
    this.currentCollision = new Collision();
  }

  public notifyCollisionChange(newCollision: Collision, time: number) {
    const oldIds = new Set(this.currentCollision.ids);
    const newIds = new Set(newCollision.ids);

    const removedIds = this.currentCollision.ids.filter(
      (id) => !newIds.has(id)
    );

    const collisionIds = newCollision.ids.filter(
      (id) => !removedIds.includes(id)
    );

    //add collisions visual
    collisionIds.forEach((id) => {
      const keyFrame: PathFrame = this.simulation.requestKeyFrame(id);

      this.keyFrameState.update((draft) => {
        const positions = keyFrame.pathPositions.get(id);
        if (!positions) throw new Error(`KeyFrame ${id} not found`);

        draft.pathPositions.set(id, positions);

        const color = "red";
        draft.pathColors.set(id, color);
      });

      this.droneState.update((draft) => {
        draft.droneColors.set(id, "red");
      });
    });

    //remove old collision visuals

    removedIds.forEach((id) => {
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
    });

    this.currentCollision = newCollision;
  }

  public getDronesInCollision(): Collision {
    return this.currentCollision;
  }
}
