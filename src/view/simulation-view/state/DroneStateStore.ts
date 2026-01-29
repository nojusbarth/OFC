import { DroneFrame } from "./DroneFrame";
import React from "react";

export class DroneStateStore {
  private setFrame: React.Dispatch<React.SetStateAction<DroneFrame>> | null =
    null;

  /**
   * Bindet einen React State-Setter an den Store.
   * Dies ist notwendig, um den React State zu aktualisieren.
   *
   * @param setFrame - Der React State-Setter für den DroneFrame
   * @public
   */
  bindState(setFrame: React.Dispatch<React.SetStateAction<DroneFrame>>) {
    this.setFrame = setFrame;
  }

  /**
   * Aktualisiert den DroneFrame durch eine Mutator-Funktion.
   * Der DroneFrame wird zuvor geklont, um Immutability zu gewährleisten.
   *
   * @param mutator - Funktion, die den Draft des DroneFrames verändert
   * @throws Error, wenn der Store nicht an React State gebunden ist
   * @public
   */
  update(mutator: (draft: DroneFrame) => void) {
    if (!this.setFrame) {
      throw new Error("DroneStateStore not bound to React state");
    }

    this.setFrame((prev) => {
      const draft: DroneFrame = {
        dronePositions: new Map(prev.dronePositions),
        droneColors: new Map(prev.droneColors),
      };

      mutator(draft);

      return draft;
    });
  }
}
