import {Color, Vector3} from "three";
import {PositionKeyFrame} from "./PositionKeyFrame";
import {ColorKeyFrame} from "./ColorKeyFrame";

/**
 * Interface, um eine Drohne darzustellen.
 */
export interface IDrone {

    /**
     * Gibt die id der Drohne zurück.
     * @return id der Drohne
     */
    getId(): number;

    /**
     * Gibt die Position als `Vector3` der Drohne zum Zeitpunkt t zurück.
     * @param t Zeitpunkt in der Simulations-Timeline.
     */
    getPositonAtTime(t: number): Vector3;

    /**
     * Gibt alle `PositionKeyFrame` der Drohne zurück.
     * @return Array mit den `PositionKeyFrame`
     */
    getPositionKeyFrames(): PositionKeyFrame[];

    /**
     * Fügt ein `PositionKeyFrame` hinzu.
     * @param keyFrame
     */
    insertPositionKeyFrame(keyFrame: PositionKeyFrame): void;

    /**
     * Entfernt den `PositionKeyFrame`.
     * @param keyFrame
     */
    removePositionKeyFrame(keyFrame: PositionKeyFrame): void;

    /**
     * Gibt die Farbe als `Color` zurück zum Zeitpunkt t.
     * @param t Zeitpunkt in der Simulation.
     */
    getColorAtTime(t: number): Color;

    /**
     * Gibt alle `ColorKeyFrame` der Drohne zurück.
     * @return Array mit den `PositionKeyFrame`
     */
    getColorKeyFrames(): ColorKeyFrame[];

    /**
     * Fügt ein `ColorKeyFrame` hinzu.
     * @param keyFrame
     */
    insertColorKeyFrame(keyFrame: ColorKeyFrame): void;

    /**
     * Entfernt den `ColorKeyFrame`.
     * @param keyFrame
     */
    removeColorKeyFrame(keyFrame: ColorKeyFrame): void;
}