import { LightFrame } from "../state/LightFrame";
import { Vector3 } from "three";

export class TimeManager {
  private currentEditorTime: number;

  private chosenLight: LightFrame;

  private NIGHT: LightFrame = {
    intensity: 0.15,
    color: "#6b7cff", // kühles Mondlicht
    position: new Vector3(0, -10, 5),
  };
  private NOON: LightFrame = {
    intensity: 1.2,
    color: "#ffffff",
    position: new Vector3(0, 20, 0),
  };
  private MORNING: LightFrame = {
    intensity: 0.6,
    color: "#ffb347", // warmes Orange
    position: new Vector3(10, 5, 10),
  };

  private EVENING: LightFrame = {
    intensity: 0.5,
    color: "#ff7a18", // rötlicher Sunset
    position: new Vector3(-10, 4, -10),
  };

  public constructor() {
    this.currentEditorTime = 0;
    this.chosenLight = this.MORNING;
  }

  public setEditorTime(time: number) {
    this.currentEditorTime = time;
  }

  public getCurrentEditorTime() {
    return this.currentEditorTime;
  }

  public setSimulationTime(time: number) {
    if (time >= 5.0 && time <= 11) {
      this.chosenLight = this.MORNING;
    } else if (time >= 12 && time <= 17) {
      this.chosenLight = this.NOON;
    } else if (time >= 18 && time <= 22) {
      this.chosenLight = this.EVENING;
    } else {
      this.chosenLight = this.NIGHT;
    }
  }

  public applyLightChanges(currentLight: LightFrame): LightFrame {
    return this.chosenLight;
  }
}
