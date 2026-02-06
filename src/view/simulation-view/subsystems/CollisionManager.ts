import { DroneFrame } from "../state/DroneFrame";
import { PathFrame } from "../state/PathFrame";

/**
 * Der CollisionManager ist verantwortlich für die Verwaltung des korrekten Renderns von Kollisionen zwischen Drohnen in der Simulation.
 */
export class CollisionManager {
  private currentCollision: Array<number>;
  private readonly colorRing = ["#ff0000", "#880000"];
  private readonly colorPath = "#ff0000";

  /**
   * Initialisiert den CollisionManager.
   */
  public constructor() {
    this.currentCollision = new Array();
  }

  /**
   * Wendet die Kollisionsänderungen auf die Pfade an.
   *
   * @param currentPathFrame - Der aktuelle PathFrame, der aktualisiert wird
   * @param allPaths - Der PathFrame mit allen verfügbaren Pfaden
   * @returns Der aktualisierte PathFrame
   */
  public applyPathChanges(
    currentPathFrame: PathFrame,
    allPaths: PathFrame,
  ): PathFrame {
    this.currentCollision.forEach((id: number) => {
      const positions = allPaths.pathPositions.get(id);
      if (!positions) {
        console.error(`KeyFrame ${id} not found`);
        return;
      }
      currentPathFrame.pathPositions.set(id, positions);
      currentPathFrame.pathColors.set(id, this.colorPath);
    });

    return currentPathFrame;
  }

  /**
   * Wendet die Kollisionsänderungen auf die Drohnen an.
   *
   * @param currentDroneFrame - Der aktuelle DroneFrame, der aktualisiert wird
   * @returns Der aktualisierte DroneFrame
   */
  public applyDroneChanges(currentDroneFrame: DroneFrame): DroneFrame {
    this.currentCollision.forEach((id: number) => {
      currentDroneFrame.outlineColors.set(id, [
        this.colorRing[0],
        this.colorRing[1],
      ]);
    });

    return currentDroneFrame;
  }

  /**
   * Aktualisiert die Liste der Drohnen, die sich in einer Kollision befinden.
   *
   * @param newCollision - Array mit den IDs aller Drohnen in Kollision
   */
  public notifyCollisionChange(newCollision: Array<number>) {
    this.currentCollision = newCollision;
  }
}
