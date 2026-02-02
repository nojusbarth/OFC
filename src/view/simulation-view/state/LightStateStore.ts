import { LightFrame } from "./LightFrame";
import React from "react";

export class LightStateStore {
  private setFrame: React.Dispatch<React.SetStateAction<LightFrame>> | null =
    null;

  /**
   * Bindet einen React State-Setter an den Store.
   * Dies ist notwendig, um den React State zu aktualisieren.
   *
   * @param setFrame - Der React State-Setter für den LightFrame
   * @public
   */
  bindState(setFrame: React.Dispatch<React.SetStateAction<LightFrame>>) {
    this.setFrame = setFrame;
  }

  /**
   * Aktualisiert den LightFrame durch eine Mutator-Funktion.
   * Der LightFrame wird zuvor geklont, um Immutability zu gewährleisten.
   * Die Position wird durch Vector3.clone() kopiert.
   *
   * @param mutator - Funktion, die den Draft des LightFrames verändert
   * @throws Error, wenn der Store nicht an React State gebunden ist
   * @public
   */
  update(mutator: (draft: LightFrame) => void) {
    if (!this.setFrame) {
      throw new Error("LightStateStore not bound to React state");
    }

    this.setFrame((prev) => {
      const draft: LightFrame = {
        intensity: prev.intensity,
        color: prev.color,
        position: prev.position.clone(),
        skyTexturePath: prev.skyTexturePath,
      };

      mutator(draft);

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
