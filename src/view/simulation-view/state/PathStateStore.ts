import { PathFrame } from "./PathFrame";
import React from "react";

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
      };

      mutator(draft);
      return draft;
    });
  }
}
