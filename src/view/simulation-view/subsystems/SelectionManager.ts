import { Color } from "three";
import { DroneFrame } from "../state/DroneFrame";
import { PathFrame } from "../state/PathFrame";

export class SelectionManager {
  private selectedIds: number[];

  /**
   * Initialisiert den SelectionManager mit einer leeren Auswahl.
   */
  public constructor() {
    this.selectedIds = [];
  }

  /**
   * Wendet die Auswahländerungen auf die Pfade an.
   * Nur ausgewählte Pfade werden zum currentPathFrame hinzugefügt.
   *
   * @param currentPathFrame - Der aktuelle PathFrame, der aktualisiert wird
   * @param allPaths - Der PathFrame mit allen verfügbaren Pfaden
   * @returns Der aktualisierte PathFrame nur mit ausgewählten Pfaden
   * @public
   */
  public applyPathChanges(
    currentPathFrame: PathFrame,
    allPaths: PathFrame,
  ): PathFrame {
    this.selectedIds.forEach((id) => {
      const positions = allPaths.pathPositions.get(id);
      if (!positions) {
        console.log(`KeyFrame ${id} not found`);
        return;
      }

      currentPathFrame.pathPositions.set(id, positions);
      currentPathFrame.pathColors.set(
        id,
        allPaths.pathColors.get(id) ?? "green",
      );
    });

    return currentPathFrame;
  }

  /**
   * Wendet die Auswahländerungen auf die Drohnen an.
   * Ausgewählte Drohnen werden weiß gefärbt.
   *
   * @param currentDroneFrame - Der aktuelle DroneFrame, der aktualisiert wird
   * @returns Der aktualisierte DroneFrame mit weißen ausgewählten Drohnen
   * @public
   */
  public applyDroneChanges(currentDroneFrame: DroneFrame): DroneFrame {
    this.selectedIds.forEach((id) => {
      currentDroneFrame.outlineColors.set(id, ["#ffffff", "#000000"]);
    });

    return currentDroneFrame;
  }

  /**
   * Wählt eine Drohne aus, falls sie nicht bereits ausgewählt ist.
   *
   * @param id - Die ID der Drohne
   * @public
   */
  public selectDrone(ids: number[]) {
    this.selectedIds = ids;
  }
}
