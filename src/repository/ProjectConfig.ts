import {IDrone} from "./entity/IDrone";
import {ISettings} from "./entity/ISettings";

/**
 * Definiert die JSON-Datei für die ProjectConfig.
 */
export interface ProjectConfig {
    version: string;
    settings: ISettings;
    drones: IDrone[];
}

/**
 * Definiert die JSON-Datei für das Waypoint-at-time-Format
 */
export interface WaypointAtTime {

}