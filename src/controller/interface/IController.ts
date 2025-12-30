import type { Vector3, Color } from "three";
import type { PositionKeyFrame } from "./PositionKeyFrame"
import type { ColorKeyFrame } from "./ColorKeyFrame"
import type { ISettings } from "./ISettings";
import type { ITimeController } from "./ITimeController";
import type { IProject } from "./IProject";
import type { OFCEvent } from "./OFCEvent";
import type { Collision } from "./Collision";

export interface IController {
    getSettings(): ISettings;
    getTimeController(): ITimeController;
    getProject(): IProject;

    addDrone(): number;
    removeDrone(id: number): void;
    getDrones(): number[];
    selectDrone(id: number): void;
    getSelectedDrone(): number;

    getPositionKeyFrames(id: number): PositionKeyFrame[];
    getPosition(id: number): Vector3;
    getPositionAt(id: number, time: number): Vector3;
    addPositionKeyFrameNow(id: number, position: Vector3): void;
    addPositionKeyFrame(id: number, keyFrame: PositionKeyFrame): void;
    removePositionKeyFrame(id: number, keyFrame: PositionKeyFrame): void;

    getColorKeyFrames(id: number): ColorKeyFrame[];
    getColor(id: number): Color;
    getColorAt(id: number, time: number): Color;
    addColorKeyFrameNow(id: number, color: Color): void;
    addColorKeyFrame(id: number, keyFrame: ColorKeyFrame): void;
    removeColorKeyFrame(id: number, keyFrame: ColorKeyFrame): void;

    getDroneEvent(id: number): OFCEvent<number>;
    getDronesEvent(): OFCEvent<number[]>;
    getCollisionEvent(): OFCEvent<Collision>;
    getDroneSelectEvent(): OFCEvent<number>;
}

