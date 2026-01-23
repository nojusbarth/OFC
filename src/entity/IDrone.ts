import { Color, Vector3 } from "three";
import type { PositionKeyFrame } from "../controller/interface/PositionKeyFrame";
import type { ColorKeyFrame } from "../controller/interface/ColorKeyFrame";

export interface IDrone {
    getId(): number;
    getPositonAtTime(t: number): Vector3;
    getPositionKeyFrames(): PositionKeyFrame[];
    insertPositionKeyFrame(keyFrame: PositionKeyFrame): void;
    removePositionKeyFrame(keyFrame: PositionKeyFrame): void;
    getColorAtTime(t: number): Color;
    getColorKeyFrames(): ColorKeyFrame[];
    insertColorKeyFrame(keyFrame: ColorKeyFrame): void;
    removeColorKeyFrame(keyFrame: ColorKeyFrame): void;
}