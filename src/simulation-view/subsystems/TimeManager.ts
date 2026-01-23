import { LightFrame } from "../state/LightFrame";

import { lightFrames } from "../config";

export class TimeManager {
  private currentEditorTime: number;

  private chosenLight: LightFrame;

  public constructor() {
    this.currentEditorTime = 0;
    this.chosenLight = lightFrames.noon;
  }

  public setEditorTime(time: number) {
    this.currentEditorTime = time;
  }

  public getCurrentEditorTime() {
    return this.currentEditorTime;
  }

  public setSimulationTime(time: number) {
    if (time >= 5.0 && time <= 11) {
      this.chosenLight = lightFrames.morning;
    } else if (time >= 12 && time <= 17) {
      this.chosenLight = lightFrames.noon;
    } else if (time >= 18 && time <= 22) {
      this.chosenLight = lightFrames.evening;
    } else {
      this.chosenLight = lightFrames.night;
    }
  }

  public applyLightChanges(currentLight: LightFrame): LightFrame {
    return this.chosenLight;
  }
}
