import { maxDronesAnimated } from "../config";
import { DroneFrame } from "../state/DroneFrame";
import { PathFrame } from "../state/PathFrame";

/**
 * Diese Klasse verwaltet das Rendern der Auswahl von Drohnen und Pfaden in der Simulation.
 */
export class SelectionManager {
  private selectedIds: number[];
  private readonly colorRing = ["#000000", "#ffffff"];
  private readonly colorPath = "#00ff00";

  /**
   * Initialisiert den SelectionManager.
   */
  public constructor() {
    this.selectedIds = [];
  }

  /**
   * Wendet die Auswahländerungen auf die Pfade an.
   *
   * @param currentPathFrame - Der aktuelle PathFrame, der aktualisiert wird
   * @param allPaths - Der PathFrame mit allen verfügbaren Pfaden
   * @returns Der aktualisierte PathFrame nur mit ausgewählten Pfaden
   */
  public applyPathChanges(
    currentPathFrame: PathFrame,
    allPaths: PathFrame,
  ): PathFrame {
    this.selectedIds.forEach((id) => {
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
   * Wendet die Auswahländerungen auf die Drohnen an.
   *
   * @param currentDroneFrame - Der aktuelle DroneFrame, der aktualisiert wird
   * @returns Der aktualisierte DroneFrame
   */
  public applyDroneChanges(currentDroneFrame: DroneFrame): DroneFrame {
    this.selectedIds.forEach((id) => {
      currentDroneFrame.outlineColors.set(id, [
        this.colorRing[0],
        this.colorRing[1],
      ]);
    });

    if (this.selectedIds.length > maxDronesAnimated) {
      currentDroneFrame.outlineAnimated = false;
    }

    return currentDroneFrame;
  }

  /**
   * Aktualisiert die Liste der Drohnen, die ausgwählt sind.
   *
   * @param ids - Die IDs der ausgewählten Drohnen
   * @public
   */
  public selectDrone(ids: number[]) {
    this.selectedIds = ids;
  }
}
