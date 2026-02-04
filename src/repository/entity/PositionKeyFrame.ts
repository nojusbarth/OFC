import type {Vector3} from "three"

/**
 * Keyframe mit einer Position als `Vector3` und dem Zeitpunkt in der Simulation.
 */
export class PositionKeyFrame {
    private position: Vector3
    private time: number

    /**
     * Konstruiert einen `PositionKeyFrame` mit dem übergebenen Parameter.
     * @param position die Position als `Vector3`
     * @param time der Zeitpunkt in der Simulation
     */
    constructor (position: Vector3, time: number) {
        this.position = position;
        this.time = time;
    }

    /**
     * Gibt die Position als `Vector3` zurück.
     * @return Vector3
     */
    getPos(): Vector3 {
        return this.position;
    }

    /**
     * Gibt den Zeitpunkt in der Simulation zurück.
     * @return number
     */
    getTime(): number {
        return this.time;
    }
}