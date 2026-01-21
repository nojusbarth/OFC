import {IDrone} from "../entity/Drone";

export interface IProjectRepository {

    getAllDrones(): Array<IDrone>
    getDroneById(id: number): IDrone
    addDrone(data: IDrone): void
    updateDrone(data: IDrone): void
    removeDrone(id: number): void

    getCollisionRadius(): number
    setCollisionRadius(radius: number): void

    getDayTime(): number
    setDayTime(day: number): void

    getMaxTime(): number
    setMaxTime(max: number): void

    export(): string
}