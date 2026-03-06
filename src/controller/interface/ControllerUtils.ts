import { IController } from "./IController";

export function selectGroupOfDrone(controller: IController, droneId: number) {
    const groupId = controller.getGroupManager().getDroneGroupId(droneId);
    if (!groupId) {
        controller.selectDrone(droneId);
        return;
    }
    const drones = controller.getGroupManager().getDronesInGroup(groupId);
    clearAndSelectDrones(controller, drones);
}

export function clearAndSelectDrones(controller: IController, droneIds: number[]) {
    controller.startBatching();
    controller.getSelectedDrones().forEach(id => controller.unselectDrone(id));
    droneIds.forEach(id => controller.selectDrone(id));
    controller.endBatching();
}

export function clearSelected(controller: IController) {
    controller.startBatching();
    controller.getSelectedDrones().forEach(id => controller.unselectDrone(id));
    controller.endBatching();
}