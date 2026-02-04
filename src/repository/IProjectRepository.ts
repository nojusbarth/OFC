import {IDrone} from "./entity/IDrone";
import {DayTime} from "./entity/DayTime";

export interface IProjectRepository {

    load(file: File|string|null): void
    loadLastProject(): boolean
    saveToLocalStorage(): void

    getNextDroneId(): number // TODO: ADD NEW METHODE
    getAllDrones(): Array<IDrone>
    getDroneById(id: number): IDrone|undefined
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
    exportConfig(): string
}