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
import { GhostStateStore } from "./state/GhostStateStore";
import { GhostFrame } from "./state/GhostFrame";

export class SimulationView implements ISimulationView {
  private droneStore?: DroneStateStore;
  private pathStore?: PathStateStore;
  private lightStore?: LightStateStore;
  private ghostStore?: GhostStateStore;
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
    ghost: GhostStateStore,
    path: PathStateStore,
    light: LightStateStore,
    controller: IController,
  ) {
    this.droneStore = drone;
    this.ghostStore = ghost;
    this.pathStore = path;
    this.lightStore = light;

    this.controller = controller;

    this.timeManager = new TimeManager();
    this.selectionManager = new SelectionManager();
    this.collisionManager = new CollisionManager();
    this.videoManager = new VideoManager();
  }

  private drawChanges() {
    var currentDroneFrame: DroneFrame = this.requestDroneFrame(
      this.timeManager.getCurrentEditorTime(),
    );
    var currentGhostFrame: GhostFrame = this.requestGhostFrame();
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

    this.ghostStore?.update((draft) => {
      draft.ghostPositions = currentGhostFrame.ghostPositions;
      draft.ghostColors = currentGhostFrame.ghostColors;
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

  public notifyFrameChange() {
    this.drawChanges();
  }

  public notifyCollisionChange(newCollision: Array<number>) {
    this.collisionManager.notifyCollisionChange(newCollision);

    this.drawChanges();
  }

  public setEditorTime(time: number) {
    this.timeManager.setEditorTime(time);

    this.drawChanges();
  }

  public selectDrones(ids: number[]) {
    this.selectionManager.selectDrone(ids);

    this.drawChanges();
  }

  public setSimulationTime(time: DayTime) {
    this.timeManager.setSimulationTime(time);

    this.drawChanges();
  }

  private requestGhostFrame(): GhostFrame {
    let ghostPositions: Map<number, Vector3> = this.controller
      .getGhostController()
      .getGhosts();
    let ghostColors: Map<number, string> = new Map();

    ghostPositions.keys().forEach((ghostId) => {
      if (this.controller.getDrones().includes(ghostId)) {
        ghostColors.set(
          ghostId,
          `#${this.controller.getColor(ghostId).getHexString()}`,
        );
      }
    });

    return {
      ghostPositions: this.controller.getGhostController().getGhosts(),
      ghostColors: ghostColors,
    };
  }

  private requestDroneFrame(time: number): DroneFrame {
    let droneIds: number[] = this.controller.getDrones();

    let dronePositions: Map<number, Vector3> = new Map();
    let droneColors: Map<number, string> = new Map();
    let outlineColors: Map<number, [string, string] | null> = new Map();

    droneIds.forEach((drone) => {
      let position: Vector3 = this.controller.getPositionAt(drone, time);

      const color = `#${this.controller.getColorAt(drone, time).getHexString()}`;
      dronePositions.set(drone, position);
      droneColors.set(drone, color);
    });

    return {
      dronePositions: dronePositions,
      droneColors: droneColors,
      outlineColors: outlineColors,
    };
  }

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

  public setCanvasForRecording(canvas: HTMLCanvasElement): void {
    this.videoManager.setCanvas(canvas);
  }

  public startRecording(): void {
    this.videoManager.start();
  }

  public stopRecording(): void {
    this.videoManager.stop();
  }
}
