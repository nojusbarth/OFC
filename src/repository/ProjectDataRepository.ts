import type { IProjectDataRepository } from "./IProjectDataRepository";
import type { Drone } from "../controller/logic/Drone";
import { DayTime } from "../controller/interface/DayTime";

export class ProjectDataRepository implements IProjectDataRepository {
    drones: Map<number, Drone> = new Map();
    collisionRadius: number = 0;
    dayTime: DayTime = 0 as unknown as DayTime;
    maxTime: number = 0;

    getAllDrones(): Drone[] {
        return Array.from(this.drones.values());
    }
    getDroneById(id: number): Drone | null {
        return this.drones.get(id) ?? null;
    }
    addDrone(drone: Drone): boolean {
        if (this.getDroneById(drone.getId()) != null) return false;
        this.drones.set(drone.getId(), drone);
        return true;
    }
    removeDrone(id: number): boolean {
        return this.drones.delete(id);
    }

    getCollisionRadius(): number {
        return this.collisionRadius;
    }
    setCollisionRadius(radius: number): boolean {
        if (radius < 0) return false;
        this.collisionRadius = radius;
        return true;
    }

    getDayTime(): DayTime {
        return this.dayTime;
    }
    setDayTime(dayTime: DayTime): boolean {
        this.dayTime = dayTime;
        return true;
    }

    getMaxTime(): number {
        return this.maxTime;
    }
    setMaxTimelineTime(time: number): boolean {
        if (time < 0) return false;
        this.maxTime = time;
        return true;
    }
}
