
import { DroneFrame } from "./DroneFrame";
import React from "react";

export class DroneStateStore {
  private setFrame:
    React.Dispatch<React.SetStateAction<DroneFrame>> | null = null;

  bindState(
    setFrame: React.Dispatch<React.SetStateAction<DroneFrame>>
  ) {
    this.setFrame = setFrame;
  }

  update(mutator: (draft: DroneFrame) => void) {
    if (!this.setFrame) {
      throw new Error("DroneStateStore not bound to React state");
    }

    this.setFrame(prev => {
      const draft: DroneFrame = {
        dronePositions: new Map(prev.dronePositions),
        droneColors: new Map(prev.droneColors),
      };

      mutator(draft);
      return draft;
    });
  }
}
