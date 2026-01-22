import {IDrone} from "../entity/IDrone";
import {DayTime} from "../entity/DayTime";

export interface IProjectRepository {

    getAllDrones(): Array<IDrone>
    getDroneById(id: number): IDrone
    addDrone(drone: IDrone): void
    updateDrone(drone: IDrone): void
    removeDrone(id: number): void

    getCollisionRadius(): number
    setCollisionRadius(radius: number): void

    getDayTime(): DayTime
    setDayTime(day: DayTime): void

    getMaxTime(): number
    setMaxTime(max: number): void

    export(): string
    saveProject(path: string): boolean
}