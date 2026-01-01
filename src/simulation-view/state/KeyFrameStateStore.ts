import { PathFrame } from "./PathFrame";
import React from "react";

export class KeyFrameStateStore {
  private setFrame: React.Dispatch<React.SetStateAction<PathFrame>> | null =
    null;

  bindState(setFrame: React.Dispatch<React.SetStateAction<PathFrame>>) {
    this.setFrame = setFrame;
  }

  update(mutator: (draft: PathFrame) => void) {
    if (!this.setFrame) {
      throw new Error("KeyFrameStateStore not bound to React state");
    }

    this.setFrame((prev) => {
      const draft: PathFrame = {
        pathPositions: new Map(
          Array.from(prev.pathPositions.entries()).map(
            ([id, points]) => [id, [...points]] // Array ebenfalls kopieren!
          )
        ),
        pathColors: new Map(prev.pathColors),
      };

      mutator(draft);
      return draft;
    });
  }
}
