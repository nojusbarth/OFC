import React from "react";
import { GhostFrame } from "./GhostFrame";

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

/**
 * Kapselt den State der Drohnen in der Simulation und bietet Methoden zum Aktualisieren dieses States.
 */
export class GhostStateStore {
  private setFrame: React.Dispatch<React.SetStateAction<GhostFrame>> | null =
    null;

  /**
   * Bindet einen React State-Setter an den Store.
   * Dies ist notwendig, um den React State zu aktualisieren.
   *
   * @param setFrame - Der React State-Setter für den GhostFrame
   */
  bindState(setFrame: React.Dispatch<React.SetStateAction<GhostFrame>>) {
    this.setFrame = setFrame;
  }

  /**
   * Aktualisiert den GhostFrame durch eine Mutator-Funktion.
   *
   * @param mutator - Funktion, die den Draft des GhostFrames verändert
   */
  update(mutator: (draft: GhostFrame) => void) {
    if (!this.setFrame) {
      console.error("GhostStateStore nicht an React State gebunden");
      return;
    }

    this.setFrame((prev) => {
      const draft: GhostFrame = {
        ghostPositions: new Map(prev.ghostPositions),
        ghostColors: new Map(prev.ghostColors),
      };

      mutator(draft);

      const isSame =
        areVectorMapsEqual(prev.ghostPositions, draft.ghostPositions) &&
        areStringMapsEqual(prev.ghostColors, draft.ghostColors);

      return isSame ? prev : draft;
    });
  }
}
