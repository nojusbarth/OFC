import { DroneFrame } from "./DroneFrame";
import React from "react";

function areVectorMapsEqual(
  a: Map<number, { x: number; y: number; z: number }>,
  b: Map<number, { x: number; y: number; z: number }>,
): boolean {
  if (a.size !== b.size) return false;

  for (const [id, aValue] of a) {
    const bValue = b.get(id);
    if (!bValue) return false;
    if (
      aValue.x !== bValue.x ||
      aValue.y !== bValue.y ||
      aValue.z !== bValue.z
    ) {
      return false;
    }
  }

  return true;
}

function areStringMapsEqual(
  a: Map<number, string>,
  b: Map<number, string>,
): boolean {
  if (a.size !== b.size) return false;

  for (const [id, aValue] of a) {
    if (b.get(id) !== aValue) return false;
  }

  return true;
}

function areOutlineMapsEqual(
  a: Map<number, [string, string] | null>,
  b: Map<number, [string, string] | null>,
): boolean {
  if (a.size !== b.size) return false;

  for (const [id, aValue] of a) {
    const bValue = b.get(id);
    if (bValue === undefined) return false;
    if (aValue === null || bValue === null) {
      if (aValue !== bValue) return false;
      continue;
    }
    if (aValue[0] !== bValue[0] || aValue[1] !== bValue[1]) {
      return false;
    }
  }

  return true;
}

/**
 * Kapselt den State der Drohnen in der Simulation und bietet Methoden zum Aktualisieren dieses States.
 */
export class DroneStateStore {
  private setFrame: React.Dispatch<React.SetStateAction<DroneFrame>> | null =
    null;

  /**
   * Bindet einen React State-Setter an den Store.
   * Dies ist notwendig, um den React State zu aktualisieren.
   *
   * @param setFrame - Der React State-Setter für den DroneFrame
   */
  bindState(setFrame: React.Dispatch<React.SetStateAction<DroneFrame>>) {
    this.setFrame = setFrame;
  }

  /**
   * Aktualisiert den DroneFrame durch eine Mutator-Funktion.
   *
   * @param mutator - Funktion, die den Draft des DroneFrames verändert
   */
  update(mutator: (draft: DroneFrame) => void) {
    if (!this.setFrame) {
      console.error("DroneStateStore nicht an React State gebunden");
      return;
    }

    this.setFrame((prev) => {
      const draft: DroneFrame = {
        dronePositions: new Map(prev.dronePositions),
        droneColors: new Map(prev.droneColors),
        outlineColors: new Map(prev.outlineColors),
      };

      mutator(draft);

      const isSame =
        areVectorMapsEqual(prev.dronePositions, draft.dronePositions) &&
        areStringMapsEqual(prev.droneColors, draft.droneColors) &&
        areOutlineMapsEqual(prev.outlineColors, draft.outlineColors);

      return isSame ? prev : draft;
    });
  }
}
