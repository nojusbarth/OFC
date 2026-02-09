import { DroneFrame } from "./DroneFrame";
import React from "react";

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

      return draft;
    });
  }
}
