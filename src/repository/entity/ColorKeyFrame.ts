import type {Color} from "three"

/**
 * Repräsentiert einen Key Frame für eine Farbe.
 */
export class ColorKeyFrame {
    color: Color
    time: number

    /**
     * Konstruiert einen `ColorKeyFrame` aus den übergebenen Parametern.
     * @param color Farbe als `Color`
     * @param time Zeitpunkt in der Simulations-Timeline
     */
    constructor (color: Color, time: number) {
        this.color = color;
        this.time = time;
    }

    /**
     * Gibt die Farbe des Keyframes zurück.
     * @return Color die Farbe als `Color`
     */
    getColor(): Color {
        return this.color;
    }

    /**
     * Gibt den Zeitpunkt des Keyframes zurück.
     * @return Zeitpunkt in der Simulation-Timeline
     */
    getTime(): number {
        return this.time;
    }
}