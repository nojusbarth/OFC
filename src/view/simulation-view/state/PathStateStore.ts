import { PathFrame } from "./PathFrame";
import React from "react";

export class PathStateStore {
  private setFrame: React.Dispatch<React.SetStateAction<PathFrame>> | null =
    null;

  /**
   * Bindet einen React State-Setter an den Store.
   * Dies ist notwendig, um den React State zu aktualisieren.
   *
   * @param setFrame - Der React State-Setter für den PathFrame
   * @public
   */
  bindState(setFrame: React.Dispatch<React.SetStateAction<PathFrame>>) {
    this.setFrame = setFrame;
  }

  /**
   * Aktualisiert den PathFrame durch eine Mutator-Funktion.
   * Der PathFrame wird zuvor geklont, um Immutability zu gewährleisten.
   * Wichtig: Arrays werden ebenfalls kopiert, um tiefe Änderungen zu vermeiden.
   *
   * @param mutator - Funktion, die den Draft des PathFrames verändert
   * @throws Error, wenn der Store nicht an React State gebunden ist
   * @public
   */
  update(mutator: (draft: PathFrame) => void) {
    if (!this.setFrame) {
      throw new Error("KeyFrameStateStore not bound to React state");
    }

    this.setFrame((prev) => {
      const draft: PathFrame = {
        pathPositions: new Map(
          Array.from(prev.pathPositions.entries()).map(
            ([id, points]) => [id, [...points]], // Array ebenfalls kopieren!
          ),
        ),
        pathColors: new Map(prev.pathColors),
      };

      mutator(draft);
      return draft;
    });
  }
}
