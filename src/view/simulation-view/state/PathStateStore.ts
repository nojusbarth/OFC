import { PathFrame } from "./PathFrame";
import React from "react";

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

function areVectorArraysEqual(
  a: { x: number; y: number; z: number }[],
  b: { x: number; y: number; z: number }[],
): boolean {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    const aPoint = a[i];
    const bPoint = b[i];
    if (
      aPoint.x !== bPoint.x ||
      aPoint.y !== bPoint.y ||
      aPoint.z !== bPoint.z
    ) {
      return false;
    }
  }

  return true;
}

function arePathPositionMapsEqual(
  a: Map<number, { x: number; y: number; z: number }[]>,
  b: Map<number, { x: number; y: number; z: number }[]>,
): boolean {
  if (a.size !== b.size) return false;

  for (const [id, aPoints] of a) {
    const bPoints = b.get(id);
    if (!bPoints) return false;
    if (!areVectorArraysEqual(aPoints, bPoints)) return false;
  }

  return true;
}

/**
 * Kapselt den State der Pfade der Drohnen in der Simulation und bietet Methoden zum Aktualisieren dieses States.
 */
export class PathStateStore {
  private setFrame: React.Dispatch<React.SetStateAction<PathFrame>> | null =
    null;

  /**
   * Bindet einen React State-Setter an den Store.
   * Dies ist notwendig, um den React State zu aktualisieren.
   *
   * @param setFrame - Der React State-Setter für den PathFrame
   */
  bindState(setFrame: React.Dispatch<React.SetStateAction<PathFrame>>) {
    this.setFrame = setFrame;
  }

  /**
   * Aktualisiert den PathFrame durch eine Mutator-Funktion.
   *
   * @param mutator - Funktion, die den Draft des PathFrames verändert
   */
  update(mutator: (draft: PathFrame) => void) {
    if (!this.setFrame) {
      console.error("PathStateStore nicht an React State gebunden");
      return;
    }

    //Array deep copy
    this.setFrame((prev) => {
      const draft: PathFrame = {
        pathPositions: new Map(
          Array.from(prev.pathPositions.entries()).map(([id, points]) => [
            id,
            [...points],
          ]),
        ),
        pathColors: new Map(prev.pathColors),
        lineAnimated: prev.lineAnimated,
      };

      mutator(draft);

      const isSame =
        arePathPositionMapsEqual(prev.pathPositions, draft.pathPositions) &&
        areStringMapsEqual(prev.pathColors, draft.pathColors) &&
        prev.lineAnimated === draft.lineAnimated;

      return isSame ? prev : draft;
    });
  }
}
