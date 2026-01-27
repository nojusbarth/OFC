import { DroneFrame } from "./state/DroneFrame";
import { DroneStateStore } from "./state/DroneStateStore";
import { PathStateStore } from "./state/PathStateStore";
import { LightStateStore } from "./state/LightStateStore";
import { Vector3 } from "three";
import { TimeManager } from "./subsystems/TimeManager";
import { PathFrame } from "./state/PathFrame";
import { SelectionManager } from "./subsystems/SelectionManager";
import { CollisionManager } from "./subsystems/CollisionManager";
import { LightFrame } from "./state/LightFrame";
import { ISimulationView } from "./ISimulationView";

export class SimulationView implements ISimulationView {
  private droneStore?: DroneStateStore;
  private pathStore?: PathStateStore;
  private lightStore?: LightStateStore;

  private timeManager: TimeManager;
  private selectionManager: SelectionManager;
  private collisionManager: CollisionManager;

  /**
   * Initialisiert die SimulationView mit den erforderlichen State Stores
   * und erstellt die Subsysteme (TimeManager, SelectionManager, CollisionManager).
   *
   * @param drone - Der DroneStateStore für die Verwaltung von Dronen-Positionen und -Farben
   * @param path - Der PathStateStore für die Verwaltung von Pfad-Daten
   * @param light - Der LightStateStore für die Verwaltung von Licht-Eigenschaften
   */
  constructor(
    drone: DroneStateStore,
    path: PathStateStore,
    light: LightStateStore,
  ) {
    this.droneStore = drone;
    this.pathStore = path;
    this.lightStore = light;

    this.timeManager = new TimeManager();
    this.selectionManager = new SelectionManager();
    this.collisionManager = new CollisionManager();
  }

  /**
   * Aktualisiert die Darstellung basierend auf den aktuellen Zuständen.
   *
   * Die Reihenfolge der Änderungen ist WICHTIG: Spätere Änderungen überschreiben frühere.
   * 1. Lichtsystem-Änderungen anwenden
   * 2. Auswahländerungen (SelectionManager) anwenden
   * 3. Kollisionsänderungen (CollisionManager) anwenden
   * 4. Alle State Stores aktualisieren
   *
   * @private
   */
  private drawChanges() {
    var currentDroneFrame: DroneFrame = this.requestDroneFrame(
      this.timeManager.getCurrentEditorTime(),
    );
    var allPathFrames: PathFrame = this.requestKeyFrames();
    var currentPathFrame: PathFrame = new PathFrame();
    var currentLightFrame: LightFrame = new LightFrame();

    currentLightFrame = this.timeManager.applyLightChanges(currentLightFrame);

    currentDroneFrame =
      this.selectionManager.applyDroneChanges(currentDroneFrame);
    currentPathFrame = this.selectionManager.applyPathChanges(
      currentPathFrame,
      allPathFrames,
    );

    currentDroneFrame =
      this.collisionManager.applyDroneChanges(currentDroneFrame);
    currentPathFrame = this.collisionManager.applyPathChanges(
      currentPathFrame,
      allPathFrames,
    );

    this.droneStore?.update((draft) => {
      draft.droneColors = currentDroneFrame.droneColors;
      draft.dronePositions = currentDroneFrame.dronePositions;
    });

    this.pathStore?.update((draft) => {
      draft.pathColors = currentPathFrame.pathColors;
      draft.pathPositions = currentPathFrame.pathPositions;
    });

    this.lightStore?.update((draft) => {
      draft.color = currentLightFrame.color;
      draft.intensity = currentLightFrame.intensity;
      draft.position = currentLightFrame.position;
      draft.skyTexturePath = currentLightFrame.skyTexturePath;
    });
  }

  /**
   * Benachrichtigt die SimulationView, dass sich ein Frame geändert hat
   * und triggert eine Neu-Berechnung der Darstellung.
   *
   * @public
   */
  public notifyFrameChange() {
    this.drawChanges();
  }

  /**
   * Benachrichtigt die SimulationView über Kollisionen und aktualisiert
   * die Darstellung entsprechend (betroffene Dronen/Pfade werden rot gefärbt).
   *
   * @param newCollision - Array der Dronen-IDs, die in Kollision sind
   * @public
   */
  public notifyCollisionChange(newCollision: Array<number>) {
    this.collisionManager.notifyCollisionChange(newCollision);

    this.drawChanges();
  }

  /**
   * Setzt die aktuelle Editor-Zeit und aktualisiert die Darstellung.
   * Dies beeinflusst, welche Dronen-Positionen und Lichteigenschaften angezeigt werden.
   *
   * @param time - Die neue Editor-Zeit in Sekunden
   * @public
   */
  public setEditorTime(time: number) {
    this.timeManager.setEditorTime(time);

    this.drawChanges();
  }

  /**
   * Wählt eine Drohne basierend auf ihrer ID aus.
   * Ausgewählte Drohnen werden weiß gefärbt und ihre Pfade werden angezeigt.
   *
   * @param id - Die eindeutige ID der Drohne
   * @public
   */
  public selectDrone(id: number) {
    this.selectionManager.selectDrone(id);

    this.drawChanges();
  }

  /**
   * Deselektiert eine Drohne basierend auf ihrer ID.
   * Die Drohne wird nicht mehr hervorgehoben und ihr Pfad wird ausgeblendet.
   *
   * @param id - Die eindeutige ID der Drohne
   * @public
   */
  public unselectDrone(id: number) {
    this.selectionManager.unselectDrone(id);

    this.drawChanges();
  }

  /**
   * Setzt die Simulationszeit und aktualisiert die Lichteigenschaften basierend
   * auf der Tageszeit (Morgen, Mittag, Abend, Nacht).
   *
   * @param time - Die Simulationszeit in Stunden (0-24)
   * @public
   */
  public setSimulationTime(time: number) {
    this.timeManager.setSimulationTime(time);

    this.drawChanges();
  }

  /**
   * Fordert den aktuellen Dronen-Frame für eine bestimmte Zeit an.
   *
   *
   * @param time - Die angeforderte Zeit in Sekunden
   * @returns Ein DroneFrame mit Positionen und Farben aller Drohnen
   * @private
   */
  private requestDroneFrame(time: number): DroneFrame {
    const offsetA = new Vector3(-20, 0, 0);
    const offsetB = new Vector3(-10, 0, 10);
    const offsetC = new Vector3(-20, 0, 10);

    if (time === 0) {
      return {
        dronePositions: new Map<number, Vector3>([
          /* =========================
         Block A (IDs 1–48)
      ========================= */
          [1, new Vector3().addVectors(offsetA, new Vector3(4, 1, 3))],
          [2, new Vector3().addVectors(offsetA, new Vector3(7, 1, 3))],
          [3, new Vector3().addVectors(offsetA, new Vector3(11, 1, 3))],
          [4, new Vector3().addVectors(offsetA, new Vector3(15, 1, 3))],
          [5, new Vector3().addVectors(offsetA, new Vector3(19, 1, 3))],
          [6, new Vector3().addVectors(offsetA, new Vector3(24, 1, 3))],
          [7, new Vector3().addVectors(offsetA, new Vector3(25, 1, 3))],
          [8, new Vector3().addVectors(offsetA, new Vector3(26, 1, 3))],

          [9, new Vector3().addVectors(offsetA, new Vector3(4, 1, 4))],
          [10, new Vector3().addVectors(offsetA, new Vector3(7, 1, 4))],
          [11, new Vector3().addVectors(offsetA, new Vector3(10, 1, 4))],
          [12, new Vector3().addVectors(offsetA, new Vector3(12, 1, 4))],
          [13, new Vector3().addVectors(offsetA, new Vector3(15, 1, 4))],
          [14, new Vector3().addVectors(offsetA, new Vector3(19, 1, 4))],
          [15, new Vector3().addVectors(offsetA, new Vector3(23, 1, 4))],
          [16, new Vector3().addVectors(offsetA, new Vector3(27, 1, 4))],

          [17, new Vector3().addVectors(offsetA, new Vector3(4, 1, 5))],
          [18, new Vector3().addVectors(offsetA, new Vector3(5, 1, 5))],
          [19, new Vector3().addVectors(offsetA, new Vector3(6, 1, 5))],
          [20, new Vector3().addVectors(offsetA, new Vector3(7, 1, 5))],
          [21, new Vector3().addVectors(offsetA, new Vector3(10, 1, 5))],
          [22, new Vector3().addVectors(offsetA, new Vector3(11, 1, 5))],
          [23, new Vector3().addVectors(offsetA, new Vector3(12, 1, 5))],
          [24, new Vector3().addVectors(offsetA, new Vector3(15, 1, 5))],
          [25, new Vector3().addVectors(offsetA, new Vector3(19, 1, 5))],
          [26, new Vector3().addVectors(offsetA, new Vector3(23, 1, 5))],
          [27, new Vector3().addVectors(offsetA, new Vector3(27, 1, 5))],

          [28, new Vector3().addVectors(offsetA, new Vector3(4, 1, 6))],
          [29, new Vector3().addVectors(offsetA, new Vector3(7, 1, 6))],
          [30, new Vector3().addVectors(offsetA, new Vector3(10, 1, 6))],
          [31, new Vector3().addVectors(offsetA, new Vector3(12, 1, 6))],
          [32, new Vector3().addVectors(offsetA, new Vector3(15, 1, 6))],
          [33, new Vector3().addVectors(offsetA, new Vector3(19, 1, 6))],
          [34, new Vector3().addVectors(offsetA, new Vector3(23, 1, 6))],
          [35, new Vector3().addVectors(offsetA, new Vector3(27, 1, 6))],

          [36, new Vector3().addVectors(offsetA, new Vector3(4, 1, 7))],
          [37, new Vector3().addVectors(offsetA, new Vector3(7, 1, 7))],
          [38, new Vector3().addVectors(offsetA, new Vector3(10, 1, 7))],
          [39, new Vector3().addVectors(offsetA, new Vector3(12, 1, 7))],
          [40, new Vector3().addVectors(offsetA, new Vector3(15, 1, 7))],
          [41, new Vector3().addVectors(offsetA, new Vector3(16, 1, 7))],
          [42, new Vector3().addVectors(offsetA, new Vector3(17, 1, 7))],
          [43, new Vector3().addVectors(offsetA, new Vector3(19, 1, 7))],
          [44, new Vector3().addVectors(offsetA, new Vector3(20, 1, 7))],
          [45, new Vector3().addVectors(offsetA, new Vector3(21, 1, 7))],
          [46, new Vector3().addVectors(offsetA, new Vector3(24, 1, 7))],
          [47, new Vector3().addVectors(offsetA, new Vector3(25, 1, 7))],
          [48, new Vector3().addVectors(offsetA, new Vector3(26, 1, 7))],

          /* =========================
         Block B (IDs 101–107)
      ========================= */
          [101, new Vector3().addVectors(offsetB, new Vector3(12, 1, 3))],
          [102, new Vector3().addVectors(offsetB, new Vector3(14, 1, 3))],
          [103, new Vector3().addVectors(offsetB, new Vector3(11, 1, 6))],
          [104, new Vector3().addVectors(offsetB, new Vector3(15, 1, 6))],
          [105, new Vector3().addVectors(offsetB, new Vector3(12, 1, 7))],
          [106, new Vector3().addVectors(offsetB, new Vector3(13, 1, 7))],
          [107, new Vector3().addVectors(offsetB, new Vector3(14, 1, 7))],

          /* =========================
         Block C (IDs 201–224)
      ========================= */
          [201, new Vector3().addVectors(offsetC, new Vector3(4, 1, 3))],
          [202, new Vector3().addVectors(offsetC, new Vector3(7, 1, 3))],
          [203, new Vector3().addVectors(offsetC, new Vector3(11, 1, 3))],
          [204, new Vector3().addVectors(offsetC, new Vector3(14, 1, 3))],
          [205, new Vector3().addVectors(offsetC, new Vector3(15, 1, 3))],
          [206, new Vector3().addVectors(offsetC, new Vector3(16, 1, 3))],
          [207, new Vector3().addVectors(offsetC, new Vector3(17, 1, 3))],
          [208, new Vector3().addVectors(offsetC, new Vector3(18, 1, 3))],

          [209, new Vector3().addVectors(offsetC, new Vector3(4, 1, 4))],
          [210, new Vector3().addVectors(offsetC, new Vector3(6, 1, 4))],
          [211, new Vector3().addVectors(offsetC, new Vector3(11, 1, 4))],
          [212, new Vector3().addVectors(offsetC, new Vector3(16, 1, 4))],

          [213, new Vector3().addVectors(offsetC, new Vector3(4, 1, 5))],
          [214, new Vector3().addVectors(offsetC, new Vector3(5, 1, 5))],
          [215, new Vector3().addVectors(offsetC, new Vector3(11, 1, 5))],
          [216, new Vector3().addVectors(offsetC, new Vector3(16, 1, 5))],

          [217, new Vector3().addVectors(offsetC, new Vector3(4, 1, 6))],
          [218, new Vector3().addVectors(offsetC, new Vector3(6, 1, 6))],
          [219, new Vector3().addVectors(offsetC, new Vector3(11, 1, 6))],
          [220, new Vector3().addVectors(offsetC, new Vector3(16, 1, 6))],

          [221, new Vector3().addVectors(offsetC, new Vector3(4, 1, 7))],
          [222, new Vector3().addVectors(offsetC, new Vector3(7, 1, 7))],
          [223, new Vector3().addVectors(offsetC, new Vector3(11, 1, 7))],
          [224, new Vector3().addVectors(offsetC, new Vector3(16, 1, 7))],
        ]),

        droneColors: new Map<number, string>([
          /* Block A */
          [1, "#ffff00"],
          [2, "#ffff00"],
          [3, "#ffff00"],
          [4, "#ffff00"],
          [5, "#ffff00"],
          [6, "#ffff00"],
          [7, "#ffff00"],
          [8, "#ffff00"],
          [9, "#ffff00"],
          [10, "#ffff00"],
          [11, "#ffff00"],
          [12, "#ffff00"],
          [13, "#ffff00"],
          [14, "#ffff00"],
          [15, "#ffff00"],
          [16, "#ffff00"],
          [17, "#ffff00"],
          [18, "#ffff00"],
          [19, "#ffff00"],
          [20, "#ffff00"],
          [21, "#ffff00"],
          [22, "#ffff00"],
          [23, "#ffff00"],
          [24, "#ffff00"],
          [25, "#ffff00"],
          [26, "#ffff00"],
          [27, "#ffff00"],
          [28, "#ffff00"],
          [29, "#ffff00"],
          [30, "#ffff00"],
          [31, "#ffff00"],
          [32, "#ffff00"],
          [33, "#ffff00"],
          [34, "#ffff00"],
          [35, "#ffff00"],
          [36, "#ffff00"],
          [37, "#ffff00"],
          [38, "#ffff00"],
          [39, "#ffff00"],
          [40, "#ffff00"],
          [41, "#ffff00"],
          [42, "#ffff00"],
          [43, "#ffff00"],
          [44, "#ffff00"],
          [45, "#ffff00"],
          [46, "#ffff00"],
          [47, "#ffff00"],
          [48, "#ffff00"],

          /* Block B */
          [101, "#959900"],
          [102, "#959900"],
          [103, "#959900"],
          [104, "#959900"],
          [105, "#959900"],
          [106, "#959900"],
          [107, "#959900"],

          /* Block C */
          [201, "#ff9933"],
          [202, "#ff9933"],
          [203, "#ff9933"],
          [204, "#ff9933"],
          [205, "#ffff00"],
          [206, "#ff9933"],
          [207, "#ffff00"],
          [208, "#ff9933"],
          [209, "#ffff00"],
          [210, "#ffff00"],
          /**
           * Fordert alle Keyframes (Pfade) für alle Drohnen an.
           *
           * @returns Ein PathFrame mit Positionen und Farben aller Pfade
           * @public
           */
          [211, "#ffff00"],
          [212, "#ffff00"],
          [213, "#ff9933"],
          [214, "#ffff00"],
          [215, "#ff9933"],
          [216, "#ff9933"],
          [217, "#ffff00"],
          [218, "#ffff00"],
          [219, "#ffff00"],
          [220, "#ffff00"],
          [221, "#ff9933"],
          [222, "#ff9933"],
          [223, "#ff9933"],
          [224, "#ff9933"],
        ]),
      };
    } else {
      return {
        dronePositions: new Map([]),
        droneColors: new Map([]),
      };
    }
  }

  /**
   * Fordert alle Keyframes (Pfade) für alle Drohnen an.
   *
   * @returns Ein PathFrame mit Positionen und Farben aller Pfade
   * @private
   */
  private requestKeyFrames(): PathFrame {
    return {
      pathPositions: new Map([
        [
          1,
          [
            new Vector3(4.0, 1.0, 3.0),
            new Vector3(6.0, 1.0, 3.0),
            new Vector3(6.0, 5.0, 3.0),
          ],
        ],
        [
          2,
          [
            new Vector3(7.0, 1.0, 3.0),
            new Vector3(7.0, 1.0, 1.0),
            new Vector3(7.0, 1.0, 5.0),
          ],
        ],
        [
          3,
          [
            new Vector3(11.0, 1.0, 3.0),
            new Vector3(7.0, 1.0, 3.0),
            new Vector3(4.0, 1.0, 3.0),
          ],
        ],
      ]),
      pathColors: new Map([
        [1, "#ffffff"],
        [2, "#ffff"],
        [3, "#ffff"],
      ]),
    };
  }
}
