import { DayTime } from "../../repository/entity/DayTime";

/**
 * Das Interface ISimulationView definiert die Methoden, die von der SimulationView implementiert werden müssen,
 *  um mit dem Controller zu kommunizieren und die Simulation entsprechend zu aktualisieren.
 */
export interface ISimulationView {
  /**
   * Benachrichtigt die SimulationView, dass sich der Frame geändert hat und sie sich entsprechend aktualisieren soll.
   */
  notifyFrameChange(): void;
  /**
   * Setzt die aktuelle Zeit im Editor, damit die SimulationView die entsprechenden Frames anzeigen kann.
   * @param time - Die neue Zeit im Editor in Sekunden
   */
  setEditorTime(time: number): void;
  /**
   * Setzt die aktuelle Zeit in der Simulation, damit die SimulationView die entsprechenden Frames anzeigen kann.
   * @param time - Die neue Zeit in der Simulation als DayTime
   */
  setSimulationTime(time: DayTime): void;
  /**
   * Selektiert die Drohnen mit den angegebenen IDs, damit die SimulationView diese hervorheben kann.
   * @param ids - Die IDs der auszuwählenden Drohnen
   */
  selectDrones(ids: number[]): void;
  /**
   * Benachrichtigt die SimulationView, dass sich die Kollisionen geändert haben und sie sich entsprechend aktualisieren soll.
   * @param newCollision - Die neuen Kollisionen als Array von Drohnen-IDs
   */
  notifyCollisionChange(newCollision: Array<number>): void;

  /**
   * Setzt das Canvas-Element, das für die Aufnahme verwendet werden soll.
   * @param canvas - Das HTMLCanvasElement, das für die Aufnahme verwendet wird
   */
  setCanvasForRecording(canvas: HTMLCanvasElement): void;
  /**
   * Startet die Aufnahme eines Videos der Simulation.
   */
  startRecording(): void;
  /**
   * Stoppt die Aufnahme eines Videos der Simulation und speichert die Datei auf dem Computer des Benutzers.
   */
  stopRecording(): void;
}
