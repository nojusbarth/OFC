import {ActionType} from "./ActionType";

/**
 * Beschreibt eine Nutzerinteraktion.
 */
export interface IAction {

    /**
     * Gibt die Daten zurück, um die Aktion wiederherstellen zu können.
     */
    getData(): any

    /**
     * Gibt den Zeitpunkt in der Aktion zurück.
     * @return Zeit in der Simulations-Timeline
     */
    getTime(): number

    /**
     * Gibt den `ActionType` der Aktion zurück
     * @return ActionType
     */
    getType(): ActionType
}