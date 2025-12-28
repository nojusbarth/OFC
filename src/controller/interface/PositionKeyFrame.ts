import type { Vector3 } from "three"

export class PositionKeyFrame {
    position: Vector3
    time: number

    constructor (position: Vector3, time: number) {
        this.position = position;
        this.time = time;
    }
    getPos(): Vector3 {
        return this.position;
    }
    getTime(): number {
        return this.time;
    }
}