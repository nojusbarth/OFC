import { IController } from "./IController";

/**
 * Wählt alle Drohnen der gleichen Gruppe wie die angegebene Drohne aus. Wenn die Drohne keiner Gruppe zugeordnet ist, wird nur diese Drohne ausgewählt.
 * @param controller - Der Controller, auf dem die Auswahl durchgeführt werden soll
 * @param droneId - Die ID der Drohne, deren Gruppe ausgewählt werden soll
 */
export function selectGroupOfDrone(controller: IController, droneId: number) {
    const groupId = controller.getGroupManager().getDroneGroupId(droneId);
    if (!groupId) {
        controller.selectDrone(droneId);
        return;
    }
    const drones = controller.getGroupManager().getDronesInGroup(groupId);
    clearAndSelectDrones(controller, drones);
}

/**
 * Wählt die gegebene Gruppe von Drohnen aus und alle anderen ab.
 * @param controller - Der Controller, auf dem die Auswahl durchgeführt werden soll
 * @param droneId - Die ID der Drohne, deren Gruppe ausgewählt werden soll
 */
export function clearAndSelectDrones(controller: IController, droneIds: number[]) {
    controller.startBatching();
    controller.getSelectedDrones().forEach(id => controller.unselectDrone(id));
    droneIds.forEach(id => controller.selectDrone(id));
    controller.endBatching();
}

/**
 * Wählt alle Drohnen ab
 * @param controller - Der Controller, auf dem die Auswahl durchgeführt werden soll
 */
export function clearSelected(controller: IController) {
    controller.startBatching();
    controller.getSelectedDrones().forEach(id => controller.unselectDrone(id));
    controller.endBatching();
}