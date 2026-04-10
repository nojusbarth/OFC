import { Vector3 } from "three";
import { IController } from "../interface/IController";
import { IInteractionController } from "../interface/IInteractionController";

export class InteractionController implements IInteractionController {
  private controller: IController;

  constructor(controllerRef: IController) {
    this.controller = controllerRef;
  }

  handleDroneClick(droneId: number): void {
    if (!this.controller.getDrones().includes(droneId)) {
      console.warn(
        `InteractionController: handleDroneClick - Drohnennummer ${droneId} existiert nicht.`,
      );
      return;
    }

    if (this.controller.getSelectedDrones().includes(droneId)) {
      this.controller.unselectDrone(droneId);
    } else {
      this.controller.selectDrone(droneId);
    }
  }

  handleDroneDoubleClick(droneId: number): void {
    if (!this.controller.getDrones().includes(droneId)) {
      console.warn(
        `InteractionController: handleDroneDoubleClick - Drohnennummer ${droneId} existiert nicht.`,
      );
      return;
    }

    const groupId = this.controller.getGroupManager().getDroneGroupId(droneId);

    if (groupId !== undefined) {
      const group = this.controller.getGroupManager().getGroup(groupId);

      for (const otherDroneId of group?.droneIds ?? []) {
        this.controller.selectDrone(otherDroneId);
      }
    }
  }
}
