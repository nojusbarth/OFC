import { DroneFrame } from "../state/DroneFrame";
import { PathFrame } from "../state/PathFrame";

export class CollisionManager {
  private currentCollision: Array<number>;

  public constructor() {
    this.currentCollision = new Array();
  }

  public applyPathChanges(
    currentPathFrame: PathFrame,
    allPaths: PathFrame,
  ): PathFrame {
    this.currentCollision.forEach((id: number) => {
      const positions = allPaths.pathPositions.get(id);
      if (!positions) throw new Error(`KeyFrame ${id} not found`);

      currentPathFrame.pathPositions.set(id, positions);
      currentPathFrame.pathColors.set(id, "red");
    });

    return currentPathFrame;
  }

  public applyDroneChanges(currentDroneFrame: DroneFrame): DroneFrame {
    this.currentCollision.forEach((id: number) => {
      currentDroneFrame.droneColors.set(id, "red");
    });

    return currentDroneFrame;
  }

  public notifyCollisionChange(newCollision: Array<number>) {
    this.currentCollision = newCollision;
  }
}
