import { LightFrame } from "../state/LightFrame";

import { lightFrames } from "../config";
import { DayTime } from "../../../repository/entity/DayTime";

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
   * Diese Zeit bestimmt, welche Dronen-Positionen angezeigt werden.
   *
   * @param time - Die neue Editor-Zeit in Sekunden
   * @public
   */
  public setEditorTime(time: number) {
    this.currentEditorTime = time;
  }

  /**
   * Gibt die aktuelle Editor-Zeit zurück.
   *
   * @returns Die aktuelle Editor-Zeit in Sekunden
   * @public
   */
  public getCurrentEditorTime() {
    return this.currentEditorTime;
  }

  /**
   * Setzt die Simulationszeit und wählt
   * die entsprechenden Lichteigenschaften aus.
   *
   * @param time - Die Simulationszeit
   * @public
   */
  public setSimulationTime(time: DayTime) {
    if (time == DayTime.SUNSET) {
      this.chosenLight = lightFrames.evening;
    } else if (time == DayTime.NOON) {
      this.chosenLight = lightFrames.noon;
    } else if (time == DayTime.NIGHT) {
      console.log("Setting night light frame");
      this.chosenLight = lightFrames.night;
    } else {
      throw new Error("Ungültige Tageszeit für die Simulation gesetzt.");
    }
  }

  /**
   * Wendet die aktuell gewählten Lichteigenschaften auf einen LightFrame an.
   * Dies überschreibt alle Eigenschaften des übergebenen LightFrames.
   *
   * @param currentLight - Der LightFrame, auf den die Lichteigenschaften angewendet werden
   * @returns Der aktualisierte LightFrame mit den neuen Lichteigenschaften
   * @public
   */
  public applyLightChanges(currentLight: LightFrame): LightFrame {
    return this.chosenLight;
  }
}
