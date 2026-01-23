import { LightFrame } from "./LightFrame";
import React from "react";

export class LightStateStore {
  private setFrame: React.Dispatch<React.SetStateAction<LightFrame>> | null =
    null;

  bindState(setFrame: React.Dispatch<React.SetStateAction<LightFrame>>) {
    this.setFrame = setFrame;
  }

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

      return draft;
    });
  }
}
