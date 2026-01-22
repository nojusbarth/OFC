import {IProjectRepository} from "./IProjectRepository";
import {IDrone} from "../entity/IDrone";
import {DayTime} from "../entity/DayTime";

class ProjectRepository implements IProjectRepository {
    private drones: Array<IDrone> = []
    private collisionRadius: number = 0
    private dayTime: DayTime = DayTime.NOON
    private maxTime: number = 0

    addDrone(drone: IDrone): void {
        this.drones.push(drone)
    }

    getAllDrones(): Array<IDrone> {
        return this.drones;
    }

    getCollisionRadius(): number {
        return this.collisionRadius;
    }

    getDayTime(): DayTime {
        return this.dayTime;
    }

    getDroneById(id: number): IDrone {
        return this.drones.find(d => d.getId() === id )!;
    }

    getMaxTime(): number {
        return this.maxTime;
    }

    removeDrone(id: number): void {
        this.drones = this.drones.filter(d => d.getId() === id)!;
    }

    setCollisionRadius(radius: number): void {
        this.collisionRadius = radius;
    }

    setDayTime(dayTime: DayTime): void {
        this.dayTime = dayTime
    }

    setMaxTime(max: number): void {
        this.maxTime = max;
    }

    updateDrone(drone: IDrone): void {
        this.removeDrone(drone.getId())
        this.drones.push(drone);
    }

    export(): string {
        // TODO create export string
        return "";
    }

    saveProject(path: string): boolean {
        // TODO save project at path
        return false
    }
}