import { LightFrame } from "../state/LightFrame";

import { lightFrames } from "../config";

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
   * Setzt die Simulationszeit und wählt basierend auf der Tageszeit
   * die entsprechenden Lichteigenschaften aus.
   *
   * Tageszeiten:
   * - 5:00 - 11:00 Uhr: Morgen
   * - 12:00 - 17:00 Uhr: Mittag
   * - 18:00 - 22:00 Uhr: Abend
   * - Alle anderen Zeiten: Nacht
   *
   * @param time - Die Simulationszeit in Stunden (0-24)
   * @public
   */
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
