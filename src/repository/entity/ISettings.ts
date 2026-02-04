import {DayTime} from "./DayTime";

/**
 * Interface für die Projekteinstellungen.
 */
export interface ISettings {
    endTime: number;
    dayTime: DayTime;
    collisionRadius: number;
}