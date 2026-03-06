import { IController } from "../../controller/interface/IController";
import { IProjectRepository } from "../../repository/IProjectRepository";
import { makeUndoableController } from "../controller/testHelper";
import { Vector3, Color } from "three";
import { IDrone } from "../../repository/entity/IDrone";

/**
 * Erstellt ein Test-Drohnen-Setup mit konfigurierbarer Anzahl
 */
export function createTestDroneShow(
  droneCount: number = 3,
  withCollisions: boolean = false,
  withGroups: boolean = false
): [IController, IProjectRepository] {
  const [controller, repository] = makeUndoableController();

  if (withCollisions) {
    controller.getSettings().setCollisionRadius(5);
  }

  const droneIds: number[] = [];

  for (let i = 0; i < droneCount; i++) {
    const droneId = controller.addDrone();
    droneIds.push(droneId);

    // Positionen setzen
    const x = withCollisions ? i * 3 : i * 10;
    controller.addPositionKeyFrameNow(droneId, new Vector3(x, 0, 0));

    // Farben setzen
    controller.addColorKeyFrameNow(droneId, new Color(
      (i * 255) / droneCount / 255,
      128 / 255,
      200 / 255
    ));
  }

  if (withGroups && droneIds.length > 0) {
    // Groups functionality may not be available in current Controller
    // This section is commented out for now
    // controller.createGroup(droneIds);
  }

  return [controller, repository];
}

/**
 * Wartet auf die Collision-Worker-Queue
 */
export async function flushAsyncQueue(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * Erzeugt eine komplexe Show mit mehreren Phasen
 */
export function createPhaseBasedShow(
  phasesCount: number = 3
): [IController, IProjectRepository] {
  const [controller, repository] = makeUndoableController();

  for (let phase = 0; phase < phasesCount; phase++) {
    const droneId = controller.addDrone();

    // Jede Phase hat unterschiedliche Positionen
    for (let step = 0; step < 3; step++) {
      const x = phase * 20 + step * 5;
      const y = Math.sin((step / 3) * Math.PI) * 10;
      controller.addPositionKeyFrameNow(droneId, new Vector3(x, y, 0));
    }
  }

  return [controller, repository];
}

/**
 * Erstellt einen Controller mit Kollisionserkennung
 */
export function createCollisionTest(
  drones: Array<{ position: Vector3; radius: number }>
): [IController, IProjectRepository] {
  const [controller, repository] = makeUndoableController();
  controller.getSettings().setCollisionRadius(5);

  drones.forEach((drone) => {
    const droneId = controller.addDrone();
    controller.addPositionKeyFrameNow(droneId, drone.position);
  });

  return [controller, repository];
}

/**
 * Assertion Helfer für Repository-Konsistenz
 */
export function assertRepositoryConsistency(
  repository: IProjectRepository
): boolean {
  const drones = repository.getAllDrones();

  return drones.every((drone: IDrone) => {
    // Jede Drohne sollte eine ID haben
    if (!drone.getId()) return false;

    // Positionen sollten in chronologischer Reihenfolge sein
    const posKeyFrames = drone.getPositionKeyFrames();
    for (let i = 1; i < posKeyFrames.length; i++) {
      if (posKeyFrames[i].getTime() < posKeyFrames[i - 1].getTime()) {
        return false;
      }
    }

    // Farben sollten auch chronologisch sein
    const colorKeyFrames = drone.getColorKeyFrames();
    for (let i = 1; i < colorKeyFrames.length; i++) {
      if (colorKeyFrames[i].getTime() < colorKeyFrames[i - 1].getTime()) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Erstellt eine Show und führt mehrere Undo/Redo-Operationen durch
 */
export async function testUndoRedoChain(
  operationCount: number
): Promise<[IController, IProjectRepository]> {
  const [controller, repository] = makeUndoableController();

  // Operationen durchführen
  for (let i = 0; i < operationCount; i++) {
    controller.addDrone();
  }

  const initialLength = controller.getDrones().length;

  // Alle Undo
  for (let i = 0; i < operationCount; i++) {
    controller.undo();
  }

  // Alle Redo
  for (let i = 0; i < operationCount; i++) {
    controller.redo();
  }

  if (controller.getDrones().length !== initialLength) {
    throw new Error("Undo/Redo chain failed - state mismatch");
  }

  return [controller, repository];
}
