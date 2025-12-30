import { Vector3, Color } from "three";
import { Collision } from "../interface/Collision";
import { ColorKeyFrame } from "../interface/ColorKeyFrame";
import type { IController } from "../interface/IController";
import type { IProject } from "../interface/IProject";
import type { ISettings } from "../interface/ISettings";
import type { ITimeController } from "../interface/ITimeController";
import { OFCEvent } from "../interface/OFCEvent";
import { PositionKeyFrame } from "../interface/PositionKeyFrame";
import { TimeController } from "./TimeController";
import { Drone } from "./Drone";
import type { IProjectDataRepository } from "../../repository/IProjectDataRepository";
import { checkCollisions } from "./CollisionHandler";
import { Project } from "./Project";

export class Controller implements IController {
    private settings: ISettings
    private timeController: ITimeController
    private project: IProject
    private repository: IProjectDataRepository;
    // private drones: Map<number, Drone>
    private droneIdCounter: number = 0;
    private selectedDrone: number = -1;
    private droneEvents: Map<number, OFCEvent<number>> = new Map();
    private dronesEvent: OFCEvent<number[]> = new OFCEvent();
    private collisionEvent: OFCEvent<Collision> = new OFCEvent();
    private droneSelectEvent: OFCEvent<number> = new OFCEvent();
    constructor( settings: ISettings, repository: IProjectDataRepository) {
        this.settings = settings;
        this.project = new Project(repository, this);
        this.repository = repository;
        this.timeController = new TimeController(settings);
        // this.drones = new Map();
    }

    getSettings(): ISettings {
        return this.settings
    }

    getTimeController(): ITimeController {
        return this.timeController;
    }

    getProject(): IProject {
        return this.project;
    }

    addDrone(): number {
        const id = this.droneIdCounter++;
        const drone = new Drone(id);
        this.repository.addDrone(drone);
        this.droneEvents.set(id, new OFCEvent());
        this.dronesEvent.notify(this.getDrones());
        this._checkCollisions(drone);
        return id;
    }

    removeDrone(id: number): void {
        this._getDrone(id); // validate id
        this.repository.removeDrone(id);
        this.droneEvents.delete(id);
        if (this.selectedDrone === id) {
            this.selectDrone(-1);
        }
        this.dronesEvent.notify(this.getDrones());
    }

    getDrones(): number[] {
        return this.repository.getAllDrones().map(drone => drone.getId());
    }

    selectDrone(id: number): void {
        if (id === this.selectedDrone) {
            return;
        }
        if (id !== -1) {
            this._getDrone(id); // validate id
        }
        this.selectedDrone = id;
        this.droneSelectEvent.notify(this.selectedDrone);
    }

    getSelectedDrone(): number {
        return this.selectedDrone;
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
        this.addPositionKeyFrame(id, new PositionKeyFrame(position, this.timeController.getTime()));
    }

    addPositionKeyFrame(id: number, keyFrame: PositionKeyFrame): void {
        const drone = this._getDrone(id);
        drone.insertPositionKeyFrame(keyFrame);
        this.getDroneEvent(id).notify(id);
        this._checkCollisions(drone);
    }

    removePositionKeyFrame(id: number, keyFrame: PositionKeyFrame): void {
        const drone = this._getDrone(id);
        drone.removePositionKeyFrame(keyFrame);
        this.getDroneEvent(id).notify(id);
        this._checkCollisions(drone);
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
        this.addColorKeyFrame(id, new ColorKeyFrame(color, this.timeController.getTime()));
    }

    addColorKeyFrame(id: number, keyFrame: ColorKeyFrame): void {
        const drone = this._getDrone(id);
        drone.insertColorKeyFrame(keyFrame);
        this.getDroneEvent(id).notify(id);
    }

    removeColorKeyFrame(id: number, keyFrame: ColorKeyFrame): void {
        const drone = this._getDrone(id);
        drone.removeColorKeyFrame(keyFrame);
        this.getDroneEvent(id).notify(id);
    }

    private _checkCollisions(drone: Drone): void {
        // TODO: properly update other drones as well
        const collision = checkCollisions(drone, this.repository.getAllDrones(), this.settings.getDroneDistance());
        this.collisionEvent.notify(collision);
    }

    private _getDrone(id: number) {
        const drone = this.repository.getDroneById(id);
        if (drone) {
            return drone;
        }
        throw new Error(`Invalid drone id (${id})!`);
    }

    getDroneEvent(id: number): OFCEvent<number> {
        const event = this.droneEvents.get(id);
        if (!event) {
            throw new Error(`Invalid drone id (${id})!`);
        }
        return event;
    }

    getDronesEvent(): OFCEvent<number[]> {
        return this.dronesEvent;
    }

    getCollisionEvent(): OFCEvent<Collision> {
        return this.collisionEvent;
    }

    getDroneSelectEvent(): OFCEvent<number> {
        return this.droneSelectEvent;
    }

}