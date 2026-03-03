import { Color, Vector3 } from "three";
import { ColorKeyFrame } from "../../repository/entity/ColorKeyFrame";
import type { IController } from "../interface/IController";
import type { IProject } from "../interface/IProject";
import type { ISettings } from "../interface/ISettings";
import type { ITimeController } from "../interface/ITimeController";
import { OFCEvent } from "../interface/OFCEvent";
import { PositionKeyFrame } from "../../repository/entity/PositionKeyFrame";
import { TimeController } from "./TimeController";
import { Drone } from "./Drone";
import { Project } from "./Project";
import { IProjectRepository } from "../../repository/IProjectRepository";
import { IDrone } from "../../repository/entity/IDrone";
import { DroneGroupManager } from "./GroupManager";
import { checkCollisions } from "./CollisionHandlerInterface";

/**
 * Implementiert IController
 */
export class Controller implements IController {
  private settings: ISettings;
  private timeController: ITimeController;
  private project: IProject;
  private repository: IProjectRepository;
  private groupManager: DroneGroupManager = new DroneGroupManager();
  private selectedDrones: number[] = [];
  private droneChangedEvent: OFCEvent<number> = new OFCEvent();
  private dronesEvent: OFCEvent<number[]> = new OFCEvent();
  private collisionEvent: OFCEvent<Map<number, Map<number, number>>> =
    new OFCEvent();
  private droneSelectEvent: OFCEvent<number[]> = new OFCEvent();
  private collisionState: Map<number, Map<number, number>> = new Map();
  private batching: boolean = false;
  private preBatchDronesSnapshot: number[] = [];
  private collisionQueue: IDrone[] = [];

  constructor(settings: ISettings, repository: IProjectRepository) {
    this.settings = settings;
    this.project = new Project(repository);
    this.repository = repository;
    this.timeController = new TimeController(settings);
    this.project.getProjectLoadedEvent().register(() => {
      this.selectedDrones = [];
      this.recalculateCollisions();
      this.timeController.stopAnimation();
      this.timeController.setTime(0);
      this.timeController.setAnimationSpeed(1);
    });
    this.settings.getCollisionRadiusChangedEvent().register(() => {
      this.recalculateCollisions();
      this.collisionEvent.notify(new Map(this.collisionState));
    });
  }

  private queueCollisionCheck(drone: IDrone): void {
    if (this.collisionQueue.includes(drone)) {
      return;
    }
    this.collisionQueue.push(drone);
    if (this.collisionQueue.length === 1 && !this.batching) {
      this._checkCollisions();
    }
  }

  startBatching(): void {
    if (this.batching) {
      throw new Error("Already batching!");
    }
    this.batching = true;
    const noDuplicates = <T>(list: T[], value: T) => {
      if (!list.includes(value)) {
        list.push(value);
      }
    };
    const last = <T>(list: T[], value: T) => list[0] = value;
    this.droneChangedEvent.startBatching(noDuplicates);
    this.dronesEvent.startBatching(last);
    this.collisionEvent.startBatching(last);
    this.droneSelectEvent.startBatching(last);
    this.preBatchDronesSnapshot = this.getDrones();
  }

  endBatching(): void {
    if (!this.batching) {
      throw new Error("Not batching!");
    }
    this.dronesEvent.endBatching();
    this.droneChangedEvent.endBatching((ids) => {
      const changeableDrones = new Set(this.preBatchDronesSnapshot).intersection(new Set(this.getDrones()));
      return ids.filter(id => changeableDrones.has(id));
    });
    this.collisionEvent.endBatching();
    this._checkCollisions();
    this.droneSelectEvent.endBatching();
    this.batching = false;
  }

  getSettings(): ISettings {
    return this.settings;
  }

  getTimeController(): ITimeController {
    return this.timeController;
  }

  getProject(): IProject {
    return this.project;
  }

  private recalculateCollisions(): void {
    this.collisionQueue = Array.from(this.repository.getAllDrones());
    if (!this.batching) {
      this._checkCollisions();
    }
  }

  addDrone(): number {
    const id = this.repository.getNextDroneId();
    const drone = new Drone(id);
    this.repository.addDrone(drone);
    this.dronesEvent.notify(this.getDrones());
    this.queueCollisionCheck(drone);
    return id;
  }

  removeDrone(id: number): void {
    this._getDrone(id); // validate id
    this.repository.removeDrone(id);
    this.groupManager.removeDronesFromGroup([id]);
    this.unselectDrone(id);
    this._mergeCollisions(id, new Map()); // remove collisions
    this.dronesEvent.notify(this.getDrones());
  }

  getDrones(): number[] {
    return this.repository
      .getAllDrones()
      .map((drone) => drone.getId())
      .sort((a, b) => a - b);
  }

  selectDrone(id: number): void {
    if (this.selectedDrones.includes(id)) {
      return;
    }
    if (id !== -1) {
      this._getDrone(id); // validate id
    }
    this.selectedDrones.push(id);
    this.droneSelectEvent.notify(Array.from(this.selectedDrones));
  }

  unselectDrone(id: number): void {
    if (this.selectedDrones.includes(id)) {
      this.selectedDrones = this.selectedDrones.filter((e) => e !== id);
      this.droneSelectEvent.notify(Array.from(this.selectedDrones));
    }
  }

  getSelectedDrones(): number[] {
    return this.selectedDrones;
  }

  getPositionKeyFrames(id: number): PositionKeyFrame[] {
    const drone = this._getDrone(id);
    return drone.getPositionKeyFrames();
  }

  getPosition(id: number): Vector3 {
    return this.getPositionAt(id, this.timeController.getTime());
  }

  getPositionAt(id: number, time: number): Vector3 {
    const drone = this._getDrone(id);
    return drone.getPositonAtTime(time);
  }

  addPositionKeyFrameNow(id: number, position: Vector3): void {
    this.addPositionKeyFrame(
      id,
      new PositionKeyFrame(position, this.timeController.getTime()),
    );
  }

  addPositionKeyFrame(id: number, keyFrame: PositionKeyFrame): void {
    const drone = this._getDrone(id);
    drone.insertPositionKeyFrame(keyFrame);
    this.droneChangedEvent.notify(id);
    this.queueCollisionCheck(drone);
  }

  removePositionKeyFrame(id: number, keyFrame: PositionKeyFrame): void {
    const drone = this._getDrone(id);
    drone.removePositionKeyFrame(keyFrame);
    this.droneChangedEvent.notify(id);
    this.queueCollisionCheck(drone);
  }

  getColorKeyFrames(id: number): ColorKeyFrame[] {
    const drone = this._getDrone(id);
    return drone.getColorKeyFrames();
  }

  getColor(id: number): Color {
    return this.getColorAt(id, this.timeController.getTime());
  }

  getColorAt(id: number, time: number): Color {
    const drone = this._getDrone(id);
    return drone.getColorAtTime(time);
  }

  addColorKeyFrameNow(id: number, color: Color): void {
    this.addColorKeyFrame(
      id,
      new ColorKeyFrame(color, this.timeController.getTime()),
    );
  }

  addColorKeyFrame(id: number, keyFrame: ColorKeyFrame): void {
    const drone = this._getDrone(id);
    drone.insertColorKeyFrame(keyFrame);
    this.droneChangedEvent.notify(id);
  }

  removeColorKeyFrame(id: number, keyFrame: ColorKeyFrame): void {
    const drone = this._getDrone(id);
    drone.removeColorKeyFrame(keyFrame);
    this.droneChangedEvent.notify(id);
  }

  getCollisions(): Map<number, Map<number, number>> {
    return this.collisionState;
  }

  private async _checkCollisions(): Promise<void> {
    this.collisionEvent.startBatching((l, v) => l[0] = v);
    while (this.collisionQueue.length > 0) {
      console.log(`Checking collisions... (${this.collisionQueue.length} drones left)`);
      const drone = this.collisionQueue.shift()!;
      const collisions = await checkCollisions(
        drone,
        this.repository.getAllDrones(),
        this.settings.getCollisionRadius(),
      );
      this._mergeCollisions(drone.getId(), collisions);
    }
    this.collisionEvent.endBatching();
  }

  private _mergeCollisions(drone: number, collisions: Map<number, number>) {
    if (collisions.size === 0 && !this.collisionState.has(drone)) {
      return;
    }
    const allDrones = new Set(this.getDrones());
    if (!allDrones.has(drone)) {
      // Drone was removed while we were calculating, ignore results
      return;
    }

    if (collisions.size === 0) {
      this.collisionState.delete(drone);
    } else {
      this.collisionState.set(drone, collisions);
    }
    for (const id of this.getDrones()) {
      if (id !== drone && allDrones.has(id)) {
        const state = this.collisionState.get(id) ?? new Map();
        if (collisions.has(id)) {
          state.set(drone, collisions.get(id)!);
        } else {
          state.delete(drone);
        }
        if (state.size === 0) {
          this.collisionState.delete(id);
        } else {
          this.collisionState.set(id, state);
        }
      }
    }
    this.collisionEvent.notify(new Map(this.collisionState));
  }

  private _getDrone(id: number) {
    const drone = this.repository.getDroneById(id);
    if (drone) {
      return drone;
    }
    throw new Error(`Invalid drone id (${id})!`);
  }

  getDroneChangedEvent(): OFCEvent<number> {
    return this.droneChangedEvent;
  }

  getDronesEvent(): OFCEvent<number[]> {
    return this.dronesEvent;
  }

  getCollisionEvent(): OFCEvent<Map<number, Map<number, number>>> {
    return this.collisionEvent;
  }

  getDroneSelectEvent(): OFCEvent<number[]> {
    return this.droneSelectEvent;
  }

  getGroupManager(): DroneGroupManager {
    return this.groupManager;
  }
}
