import type { Color } from "three"

export class ColorKeyFrame {
    color: Color
    time: number

    constructor (color: Color, time: number) {
        this.color = color;
        this.time = time;
    }
    getColor(): Color {
        return this.color;
    }
    getTime(): number {
        return this.time;
    }
}