import {Color, Vector3} from "three";
import type {PositionKeyFrame} from "../../repository/entity/PositionKeyFrame";
import type {ColorKeyFrame} from "../../repository/entity/ColorKeyFrame";
import {IDrone} from "../../repository/entity/IDrone";

/**
 * Implementiert IDrone
 */
export class Drone implements IDrone {
    id: number
    positionKeyFrames: PositionKeyFrame[] = [];
    colorKeyFrames: ColorKeyFrame[] = [];

    constructor(id: number, positionKeyFrames: PositionKeyFrame[] = [], colorKeyFrames: ColorKeyFrame[] = []) {
        this.id = id;
        this.positionKeyFrames = positionKeyFrames;
        this.colorKeyFrames = colorKeyFrames;
    }

    getId(): number {
        return this.id;
    }

    getPositonAtTime(t: number): Vector3 {
        if (this.positionKeyFrames.length === 0) {
            return new Vector3();
        }
        if (this.positionKeyFrames[0].getTime() >= t) {
            return new Vector3().copy(this.positionKeyFrames[0].getPos());
        }
        for (let i = 1; i < this.positionKeyFrames.length; i++) {
            if (this.positionKeyFrames[i].getTime() >= t) {
                const key0 = this.positionKeyFrames[i-1];
                const key2 = this.positionKeyFrames[i];
                return new Vector3().lerpVectors(
                    key0.getPos(),
                    key2.getPos(),
                    (t - key0.getTime()) / (key2.getTime() - key0.getTime()));
            }
        }
        return new Vector3().copy(this.positionKeyFrames[this.positionKeyFrames.length-1].getPos());
    }
    
    getPositionKeyFrames(): PositionKeyFrame[] {
        return this.positionKeyFrames;
    }
    
    insertPositionKeyFrame(keyFrame: PositionKeyFrame): void {
        insert(this.positionKeyFrames, keyFrame);
    }
    
    removePositionKeyFrame(keyFrame: PositionKeyFrame): void {
        this.positionKeyFrames = this.positionKeyFrames.filter(e => e.getTime() != keyFrame.getTime() || e.getPos() != keyFrame.getPos());
    }
    
    getColorAtTime(t: number): Color {
        if (this.colorKeyFrames.length === 0) {
            return new Color();
        }
        if (this.colorKeyFrames[0].getTime() >= t) {
            return new Color().copy(this.colorKeyFrames[0].getColor());
        }
        for (let i = 1; i < this.colorKeyFrames.length; i++) {
            if (this.colorKeyFrames[i].getTime() >= t) {
                const key0 = this.colorKeyFrames[i-1];
                const key2 = this.colorKeyFrames[i];
                return new Color().copy(key0.getColor()).lerp(
                    key2.getColor(),
                    (t - key0.getTime()) / (key2.getTime() - key0.getTime()));
            }
        }
        return new Color().copy(this.colorKeyFrames[this.colorKeyFrames.length-1].getColor());
    }
    
    getColorKeyFrames(): ColorKeyFrame[] {
        return this.colorKeyFrames;
    }
    
    insertColorKeyFrame(keyFrame: ColorKeyFrame): void {
        insert(this.colorKeyFrames, keyFrame);
    }
    
    removeColorKeyFrame(keyFrame: ColorKeyFrame): void {
        this.colorKeyFrames = this.colorKeyFrames.filter(e => e.getTime() != keyFrame.getTime() || e.getColor() != keyFrame.getColor());
    }
}

function insert <T extends PositionKeyFrame|ColorKeyFrame>(keyFrames: T[], keyFrame: T) {
    for (let i = 0; i < keyFrames.length; i++) {
            if (keyFrames[i].getTime() >= keyFrame.getTime()) {
                if (keyFrames[i].getTime() == keyFrame.getTime()) {
                    // replace same time
                    keyFrames[i] = keyFrame;
                } else {
                    keyFrames.splice(i, 0, keyFrame);
                }
                return;
            }
        }
        if (keyFrames.length !== 0 && keyFrames[keyFrames.length - 1].getTime() === keyFrame.getTime()) {
            // replace same time end
            keyFrames.pop();
        }
        keyFrames.push(keyFrame);
}