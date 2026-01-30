import { Color } from "three";
import { DroneFrame } from "../state/DroneFrame";
import { PathFrame } from "../state/PathFrame";

export class CollisionManager {
  private currentCollision: Array<number>;

  /**
   * Initialisiert den CollisionManager mit keinen Kollisionen.
   */
  public constructor() {
    this.currentCollision = new Array();
  }

  /**
   * Wendet die Kollisionsänderungen auf die Pfade an.
   * Pfade von Drohnen in Kollision werden rot gefärbt.
   *
   * @param currentPathFrame - Der aktuelle PathFrame, der aktualisiert wird
   * @param allPaths - Der PathFrame mit allen verfügbaren Pfaden
   * @returns Der aktualisierte PathFrame mit rot gefärbten Kollisionspfaden
   * @public
   */
  public applyPathChanges(
    currentPathFrame: PathFrame,
    allPaths: PathFrame,
  ): PathFrame {
    this.currentCollision.forEach((id: number) => {
      const positions = allPaths.pathPositions.get(id);
      if (!positions) {
        console.log(`KeyFrame ${id} not found`);
        return;
      }
      currentPathFrame.pathPositions.set(id, positions);
      currentPathFrame.pathColors.set(id, "red");
    });

    return currentPathFrame;
  }

  /**
   * Wendet die Kollisionsänderungen auf die Drohnen an.
   * Drohnen in Kollision werden rot gefärbt.
   *
   * @param currentDroneFrame - Der aktuelle DroneFrame, der aktualisiert wird
   * @returns Der aktualisierte DroneFrame mit rot gefärbten Kollisionsdrohnen
   * @public
   */
  public applyDroneChanges(currentDroneFrame: DroneFrame): DroneFrame {
    this.currentCollision.forEach((id: number) => {
      currentDroneFrame.outlineColors.set(id, ["#ff0000", "#880000"]);
    });

    return currentDroneFrame;
  }

  /**
   * Aktualisiert die Liste der Drohnen, die sich in einer Kollision befinden.
   *
   * @param newCollision - Array mit den IDs aller Drohnen in Kollision
   * @public
   */
  public notifyCollisionChange(newCollision: Array<number>) {
    this.currentCollision = newCollision;
  }
}
