import {IDrone} from "../entity/IDrone";

export interface IProjectRepository {

    getAllDrones(): Array<IDrone>
    getDroneById(id: string): IDrone
    addDrone(data: IDrone): void
    updateDrone(data: IDrone): void
    removeDrone(id: string): void

    getCollisionRadius(): number
    setCollisionRadius(radius: number): void

    getDayTime(): number
    setDayTime(day: number): void

    getMaxTime(): number
    setMaxTime(max: number): void

    export(): string
}