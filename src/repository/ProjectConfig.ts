import {DayTime} from "./entity/DayTime";
import {IDrone} from "./entity/IDrone";
import {Drone} from "../controller/logic/Drone";
import {Color, Vector3} from "three";
import {ColorKeyFrame} from "./entity/ColorKeyFrame";
import {PositionKeyFrame} from "./entity/PositionKeyFrame";

/**
 * Definiert die JSON-Struktur für die ProjectConfig.
 */
export interface ProjectConfig {
    version: string;
    settings: Settings;
    drones: JsonDrone[];
}

interface Settings {
    endTime: number;
    dayTime: DayTime;
    collisionRadius: number;
}

/**
 * Definiert die JSON-Struktur für das Waypoint-at-time-Format
 */
export interface WaypointAtTime {
    drones: JsonDrone[]
}

interface JsonDrone {
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
 * Mapped die übergebenen Drohnen in `JsonDrone` für Exporte.
 * @param drones Alle `IDrone`, die in `JsonDrone` umgewandelt werden sollen.
 */
export function mapToJsonDrones(drones: Array<IDrone>): Array<JsonDrone> {
    return drones.map((drone: IDrone) => {
            return {
                waypoints: drone.getPositionKeyFrames().map((frame) => {
                    return {
                        time: frame.getTime(),
                        position: [frame.getPos().x, frame.getPos().y, frame.getPos().z]
                    }
                }),
                colors: drone.getColorKeyFrames().map((frame) => {
                    return {
                        time: frame.getTime(),
                        color: [frame.getColor().r, frame.getColor().g, frame.getColor().b],
                    }
                })
            }
        }
    );
}

/**
 * Mapped die übergebenen `JsonDrone` in `Drone` aus einer JSON-Datei.
 * @param drones Alle `JsonDrone`, die umgewandelt werden sollen.
 */
export function parseJsonToDrones(drones: Array<JsonDrone>): Array<IDrone> {
    return drones.map((drone, index, _) => {
        const waypoints: Array<PositionKeyFrame> = drone.waypoints.map((keyframe) => {
            const vector = new Vector3(keyframe.position[0], keyframe.position[1], keyframe.position[2])
            return new PositionKeyFrame(vector, keyframe.time)
        })
        const colorKeyFrames: Array<ColorKeyFrame> = drone.colors.map((keyframe) => {
            const color = new Color(keyframe.color[0], keyframe.color[1], keyframe.color[2])
            return new ColorKeyFrame(color, keyframe.time)
        });
        return new Drone(
            index,
            waypoints,
            colorKeyFrames
        )
    })
}