import { DroneFrame } from "../state/DroneFrame";
import { PathFrame } from "../state/PathFrame";
import { Collision } from "../../Collision";

export class CollisionManager {
  private currentCollision: Collision;

  public constructor() {
    this.currentCollision = new Collision();
  }

  public applyPathChanges(
    currentPathFrame: PathFrame,
    allPaths: PathFrame
  ): PathFrame {
    this.currentCollision.ids.forEach((id) => {
      const positions = allPaths.pathPositions.get(id);
      if (!positions) throw new Error(`KeyFrame ${id} not found`);

      currentPathFrame.pathPositions.set(id, positions);
      currentPathFrame.pathColors.set(id, "red");
    });

    return currentPathFrame;
  }

  public applyDroneChanges(currentDroneFrame: DroneFrame): DroneFrame {
    this.currentCollision.ids.forEach((id) => {
      currentDroneFrame.droneColors.set(id, "red");
    });

    return currentDroneFrame;
  }

  public notifyCollisionChange(newCollision: Collision) {
    this.currentCollision = newCollision;
  }
}
