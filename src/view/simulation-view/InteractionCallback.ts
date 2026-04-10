import { IInteractionController } from "../../controller/interface/IInteractionController";
import { Vector3 } from "three";
export class InteractionCallback {
  private interactionController: IInteractionController;

  constructor(interactionControllerRef: IInteractionController) {
    this.interactionController = interactionControllerRef;
  }

  onDroneClick(droneId: number) {
    console.log(`Drone with ID ${droneId} clicked.`);
    this.interactionController.handleDroneClick(droneId);
  }

  onDroneDoubleClick(droneId: number) {
    console.log(`Drone with ID ${droneId} double-clicked.`);
    this.interactionController.handleDroneDoubleClick(droneId);
  }
}
