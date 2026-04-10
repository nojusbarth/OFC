import { Vector3 } from "three";

export interface IInteractionController {
  /**
   * Wird vom CallbackManager aufgerufen, wenn auf eine Drohne geklickt wird
   * @param droneId droneId der angeklickten Drohne
   */
  handleDroneClick(droneId: number): void;

  /**
   * Wird vom CallbackManager aufgerufen, wenn auf eine Drohne doppelt geklickt wird
   * @param droneId droneId der angeklickten Drohne
   */
  handleDroneDoubleClick(droneId: number): void;
}
