import { DroneFrame } from "./state/DroneFrame";
import { DroneStateStore } from "./state/DroneStateStore";
import { PathStateStore } from "./state/PathStateStore";
import { LightStateStore } from "./state/LightStateStore";
import { Color, Vector3 } from "three";
import { TimeManager } from "./subsystems/TimeManager";
import { PathFrame } from "./state/PathFrame";
import { SelectionManager } from "./subsystems/SelectionManager";
import { CollisionManager } from "./subsystems/CollisionManager";
import { VideoManager } from "./subsystems/VideoManager";
import { LightFrame } from "./state/LightFrame";
import { ISimulationView } from "./ISimulationView";
import { IController } from "../../controller/interface/IController";
import { DayTime } from "../../repository/entity/DayTime";
import { PositionKeyFrame } from "../../repository/entity/PositionKeyFrame";

export class SimulationView implements ISimulationView {
  private droneStore?: DroneStateStore;
  private pathStore?: PathStateStore;
  private lightStore?: LightStateStore;

  private controller: IController;

  private timeManager: TimeManager;
  private selectionManager: SelectionManager;
  private collisionManager: CollisionManager;
  private videoManager: VideoManager;

  /**
   * Initialisiert die SimulationView mit den erforderlichen State Stores
   * und erstellt die Subsysteme (TimeManager, SelectionManager, CollisionManager, VideoManager).
   *
   * @param drone - Der DroneStateStore für die Verwaltung von Dronen-Positionen und -Farben
   * @param path - Der PathStateStore für die Verwaltung von Pfad-Daten
   * @param light - Der LightStateStore für die Verwaltung von Licht-Eigenschaften
   */
  constructor(
    drone: DroneStateStore,
    path: PathStateStore,
    light: LightStateStore,
    controller: IController,
  ) {
    this.droneStore = drone;
    this.pathStore = path;
    this.lightStore = light;

    this.controller = controller;

    this.timeManager = new TimeManager();
    this.selectionManager = new SelectionManager();
    this.collisionManager = new CollisionManager();
    this.videoManager = new VideoManager(60);
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
      draft.outlineColors = currentDroneFrame.outlineColors;
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
  public selectDrones(ids: number[]) {
    this.selectionManager.selectDrone(ids);

    this.drawChanges();
  }

  /**
   * Setzt die Simulationszeit und aktualisiert die Lichteigenschaften basierend
   * auf der Tageszeit (Mittag, Abend, Nacht).
   *
   * @param time - Die Simulationszeit
   * @public
   */
  public setSimulationTime(time: DayTime) {
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
    let droneIds: number[] = this.controller.getDrones();

    let dronePositions: Map<number, Vector3> = new Map();
    let droneColors: Map<number, Color> = new Map();
    let outlineColors: Map<number, [string, string] | null> = new Map();

    droneIds.forEach((drone) => {
      let position: Vector3 = this.controller.getPositionAt(drone, time);

      let color = this.controller.getColorAt(drone, time);

      dronePositions.set(drone, position);
      droneColors.set(drone, color);
    });

    return {
      dronePositions: dronePositions,
      droneColors: droneColors,
      outlineColors: outlineColors,
    };
  }

  /**
   * Fordert alle Keyframes (Pfade) für alle Drohnen an.
   *
   * @returns Ein PathFrame mit Positionen und Farben aller Pfade
   * @private
   */
  private requestKeyFrames(): PathFrame {
    let droneIds: number[] = this.controller.getDrones();

    let pathPositions: Map<number, Vector3[]> = new Map();
    let pathColors: Map<number, string> = new Map();

    droneIds.forEach((drone) => {
      let positions: PositionKeyFrame[] =
        this.controller.getPositionKeyFrames(drone);

      let positionVectors: Vector3[] = positions.map((keyframe) =>
        keyframe.getPos(),
      );

      let color: string = "#00ff00";

      pathPositions.set(drone, positionVectors);
      pathColors.set(drone, color);
    });

    return {
      pathPositions: pathPositions,
      pathColors: pathColors,
    };
  }

  /**
   * Setzt die Canvas-Referenz für die Video-Aufzeichnung.
   * Wird von der SimulationScene aufgerufen.
   *
   * @param canvas - Das HTMLCanvasElement der Three.js-Szene
   * @public
   */
  public setCanvasForRecording(canvas: HTMLCanvasElement): void {
    this.videoManager.setCanvas(canvas);
  }

  /**
   * Startet die Aufzeichnung der Szene als Video.
   *
   * @public
   */
  public startRecording(): void {
    this.videoManager.start();
  }

  /**
   * Stoppt die Aufzeichnung und speichert das Video.
   *
   * @public
   */
  public stopRecording(): void {
    this.videoManager.stop();
  }
}
