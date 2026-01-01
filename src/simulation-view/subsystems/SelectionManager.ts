import { DroneFrame } from "../state/DroneFrame";
import { PathFrame } from "../state/PathFrame";

export class SelectionManager {
  private selectedIds: number[];

  public constructor() {
    this.selectedIds = [];
  }

  public applyPathChanges(
    currentPathFrame: PathFrame,
    allPaths: PathFrame
  ): PathFrame {
    this.selectedIds.forEach((id) => {
      const positions = allPaths.pathPositions.get(id);
      if (!positions) throw new Error(`KeyFrame ${id} not found`);

      currentPathFrame.pathPositions.set(id, positions);
      currentPathFrame.pathColors.set(
        id,
        allPaths.pathColors.get(id) ?? "white"
      );
    });

    return currentPathFrame;
  }

  public applyDroneChanges(currentDroneFrame: DroneFrame): DroneFrame {
    this.selectedIds.forEach((id) => {
      currentDroneFrame.droneColors.set(id, "white");
    });

    return currentDroneFrame;
  }

  public selectDrone(id: number) {
    if (!this.selectedIds.includes(id)) {
      this.selectedIds.push(id);
    }
  }

  public unselectDrone(id: number) {
    if (this.selectedIds.includes(id)) {
      this.selectedIds = this.selectedIds.filter((item) => item != id);
    }
  }
}
