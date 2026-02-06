import { LightFrame } from "./LightFrame";
import React from "react";

/**
 * Kapselt den State der Lichtquelle in der Simulation und bietet Methoden zum Aktualisieren dieses States.
 */
export class LightStateStore {
  private setFrame: React.Dispatch<React.SetStateAction<LightFrame>> | null =
    null;

  /**
   * Bindet einen React State-Setter an den Store.
   * Dies ist notwendig, um den React State zu aktualisieren.
   *
   * @param setFrame - Der React State-Setter für den LightFrame
   */
  bindState(setFrame: React.Dispatch<React.SetStateAction<LightFrame>>) {
    this.setFrame = setFrame;
  }

  /**
   * Aktualisiert den LightFrame durch eine Mutator-Funktion.
   *
   * @param mutator - Funktion, die den Draft des LightFrames verändert
   */
  update(mutator: (draft: LightFrame) => void) {
    if (!this.setFrame) {
      console.error("LightStateStore nicht an React State gebunden");
      return;
    }

    this.setFrame((prev) => {
      const draft: LightFrame = {
        intensity: prev.intensity,
        color: prev.color,
        position: prev.position.clone(),
        skyTexturePath: prev.skyTexturePath,
      };

      mutator(draft);

      //um teures neurendern der Umgebungstextur zu vermeiden, wird geprüft, ob sich die relevanten Werte tatsächlich geändert haben.
      //wenn nicht, wird der vorherige Frame zurückgegeben, um unnötige Re-Renders zu vermeiden.
      const isSame =
        draft.intensity === prev.intensity &&
        draft.color === prev.color &&
        draft.skyTexturePath === prev.skyTexturePath &&
        draft.position.x === prev.position.x &&
        draft.position.y === prev.position.y &&
        draft.position.z === prev.position.z;

      return isSame ? prev : draft;
    });
  }
}
