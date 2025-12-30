import { ISimulation } from "../ISimulation";
import { LightFrame } from "../state/LightFrame";
import { LightStateStore } from "../state/LightStateStore";
import { Vector3 } from "three";

export class TimeManager {
  private simulation: ISimulation;

  private lightState: LightStateStore;
  private currentEditorTime: number;

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

  public constructor(lightState: LightStateStore, simulation: ISimulation) {
    this.currentEditorTime = 0;
    this.lightState = lightState;
    this.simulation = simulation;
  }

  public setEditorTime(time: number) {
    this.currentEditorTime = time;
  }

  public getCurrentEditorTime() {
    return this.currentEditorTime;
  }

  public setSimulationTime(time: number) {
    var chosenLight: LightFrame;

    if (time >= 5.0 && time <= 11) {
      chosenLight = this.MORNING;
    } else if (time >= 12 && time <= 17) {
      chosenLight = this.NOON;
    } else if (time >= 18 && time <= 22) {
      chosenLight = this.EVENING;
    } else {
      chosenLight = this.NIGHT;
    }

    this.lightState.update((draft) => {
      draft.color = chosenLight.color;
      draft.intensity = chosenLight.intensity;
      draft.position = chosenLight.position;
    });
  }
}
