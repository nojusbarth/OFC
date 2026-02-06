import { LightFrame } from "../state/LightFrame";

import { lightFrames } from "../config";
import { DayTime } from "../../../repository/entity/DayTime";

/**
 * Der TimeManager ist verantwortlich für die Verwaltung der aktuellen Simulationszeit und der entsprechenden Lichteigenschaften in der Simulation.
 */
export class TimeManager {
  private currentEditorTime: number;

  private chosenLight: LightFrame;

  /**
   * Initialisiert den TimeManager mit Standard-Werten.
   * Die Standard-Tageszeit ist Mittag (noon).
   */
  public constructor() {
    this.currentEditorTime = 0;
    this.chosenLight = lightFrames.noon;
  }

  /**
   * Setzt die aktuelle Editor-Zeit.
   *
   * @param time - Die neue Editor-Zeit in Sekunden
   */
  public setEditorTime(time: number) {
    this.currentEditorTime = time;
  }

  /**
   * Gibt die aktuelle Editor-Zeit zurück.
   *
   * @returns Die aktuelle Editor-Zeit in Sekunden
   */
  public getCurrentEditorTime() {
    return this.currentEditorTime;
  }

  /**
   * Setzt die Simulationszeit und wählt
   * die entsprechenden Lichteigenschaften aus.
   *
   * @param time - Die Simulationszeit
   */
  public setSimulationTime(time: DayTime) {
    if (time == DayTime.SUNSET) {
      this.chosenLight = lightFrames.sunset;
    } else if (time == DayTime.NOON) {
      this.chosenLight = lightFrames.noon;
    } else if (time == DayTime.NIGHT) {
      this.chosenLight = lightFrames.night;
    } else {
      console.error("Ungültige Tageszeit für die Simulation gesetzt.");
    }
  }

  /**
   * Wendet die aktuell gewählten Lichteigenschaften auf einen LightFrame an.
   *
   * @param currentLight - Der LightFrame, auf den die Lichteigenschaften angewendet werden
   * @returns Der aktualisierte LightFrame mit den neuen Lichteigenschaften
   */
  public applyLightChanges(currentLight: LightFrame): LightFrame {
    return this.chosenLight;
  }
}
