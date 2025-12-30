import { PathFrame } from "./PathFrame";
import React from "react";

export class KeyFrameStateStore {
  private setFrame: React.Dispatch<React.SetStateAction<PathFrame>> | null = null;

  bindState(
    setFrame: React.Dispatch<React.SetStateAction<PathFrame>>
  ) {
    this.setFrame = setFrame;
  }

  update(mutator: (draft: PathFrame) => void) {
    if (!this.setFrame) {
      throw new Error("KeyFrameStateStore not bound to React state");
    }

    this.setFrame(prev => {
      const draft: PathFrame = {
        pathPositions: [...prev.pathPositions],
        pathColor: prev.pathColor,
      };

      mutator(draft);
      return draft;
    });
  }
}