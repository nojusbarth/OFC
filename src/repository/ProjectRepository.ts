import {IProjectRepository} from "./IProjectRepository";
import {IDrone} from "./entity/IDrone";
import {DayTime} from "./entity/DayTime";
import {ProjectConfig} from "./ProjectConfig";
import {FILE_VERSION} from "./RepositoryConstants";

class ProjectRepository implements IProjectRepository {
    private drones: Array<IDrone> = []
    private collisionRadius: number = 0
    private dayTime: DayTime = DayTime.NOON
    private endTime: number = 0 // TODO: ÄNDERUNG: NAME CHANGE

    constructor(file: File) { // TODO: ÄNDERUNG: ADD CONSTRUCTOR
        let reader = new FileReader();
        reader.onloadend = (e: ProgressEvent<FileReader>) => {
            const content = e.target?.result;
            if (content != null) {
                let data: ProjectConfig = JSON.parse(content as string)
                if (data.version != FILE_VERSION) {
                    throw new Error(`Failed to load project: ${data.version} is not supported`);
                }
                this.drones = data.drones;
                this.collisionRadius = data.settings.collisionRadius
                this.dayTime = data.settings.dayTime
                this.endTime = data.settings.endTime
            } else {
                throw new Error(`Failed to load project: ${e}`);
            }
        }
        reader.readAsText(file);
    }

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
        return this.drones.find(d => d.id === id )!;
    }

    getMaxTime(): number {
        return this.endTime;
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
        this.endTime = max;
    }

    updateDrone(drone: IDrone): void {
        this.removeDrone(drone.getId())
        this.drones.push(drone);
    }

    export(): string {
        // TODO create export string
        return "";
    }

    exportConfig(path: string): boolean { // TODO: ÄNDERUNG: METHODE ADD
        // TODO save project at path
        return false
    }
}