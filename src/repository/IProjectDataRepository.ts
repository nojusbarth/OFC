import type { Drone } from "../controller/logic/Drone";
import { DayTime } from "../controller/interface/DayTime";

export interface IProjectDataRepository {
	getAllDrones(): Drone[];
	getDroneById(id: number): Drone | null;
	addDrone(drone: Drone): boolean;
	removeDrone(id: number): boolean;

	getCollisionRadius(): number;
	setCollisionRadius(radius: number): boolean;

	getDayTime(): DayTime;
	setDayTime(dayTime: DayTime): boolean;

	getMaxTime(): number;
	setMaxTimelineTime(time: number): boolean;
}
