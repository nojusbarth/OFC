import {DayTime} from "./entity/DayTime";

/**
 * Definiert die JSON-Datei für die ProjectConfig.
 */
export interface ProjectConfig {
    version: string;
    settings: Settings;
    drones: Drone[];
}

interface Settings {
    endTime: number;
    collisionRadius: number;
    dayTime: DayTime;
}

interface Drone {
    id: number; // TODO: ÄNDERUNG: ADD
    waypoints: PositionKeyframe[]
    colors: ColorKeyframe[]
}

interface PositionKeyframe {
    time: number;
    position: [number, number, number]
}

interface ColorKeyframe {
    time: number;
    color: [number, number, number];
}

/**
 * Definiert die JSON-Datei für das Waypoint-at-time-Format
 */
export interface WaypointAtTime {
    waypoints: PositionKeyframe[];
}