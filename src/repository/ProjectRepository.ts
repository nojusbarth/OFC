import {IProjectRepository} from "./IProjectRepository";
import {IDrone} from "./entity/IDrone";
import {DayTime} from "./entity/DayTime";
import {mapToJsonDrones, parseJsonToDrones, ProjectConfig, WaypointAtTime} from "./ProjectConfig";
import {FILE_VERSION, LAST_PROJECT_DATA_KEY} from "./RepositoryConstants";

/**
 * Implementiert das ProjectRepository.
 */
export class ProjectRepository implements IProjectRepository {
    private drones: Array<IDrone> = []
    private collisionRadius: number = 0
    private dayTime: DayTime = DayTime.NOON
    private endTime: number = 0 // TODO: ÄNDERUNG: NAME CHANGE

    load(input: File|string|null) { // TODO: ÄNDERUNG: ADD FUNCTION
        if (input == null) {
            this.drones = []
            this.collisionRadius = 0
            this.dayTime = DayTime.NOON
            this.endTime = 0
            return; // neues Projekt
        }
        if (input instanceof File) {
            let reader = new FileReader();
            reader.onloadend = (e: ProgressEvent<FileReader>) => {
                const content = e.target?.result;
                if (content && !(content instanceof ArrayBuffer)) {
                    this.parseJson(content)
                } else {
                    throw new Error(`Failed to load project: ${e}`);
                }
            }
            reader.readAsText(input);
        } else {
            this.parseJson(input);
        }
    }

    loadLastProject(): boolean {
        const data = localStorage.getItem(LAST_PROJECT_DATA_KEY)
        if (data == null) {
            return false
        }
        this.load(data)
        return true
    }

    private parseJson(content: string) {
        let data: ProjectConfig
        try {
            data = JSON.parse(content)
        } catch (e) {
            throw Error(`Failed to parse project: SyntaxError`);
        }
        if (data.version !== FILE_VERSION) {
            throw new Error(`Failed to load project: ${data.version} is not supported`);
        }
        this.drones = parseJsonToDrones(data.drones)
        this.collisionRadius = data.settings.collisionRadius
        this.dayTime = data.settings.dayTime
        this.endTime = data.settings.endTime
    }

    getNextDroneId(): number {
        let max: number = 0
        this.drones.forEach((drone) => { if(drone.getId() > max) max = drone.getId() });
        return max+1

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

    getDroneById(id: number): IDrone|undefined {
        return this.drones.find(d => d.getId() === id );
    }

    getMaxTime(): number {
        return this.endTime;
    }

    removeDrone(id: number): void {
        this.drones = this.drones.filter(d => d.getId() !== id)!;
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
        const format: WaypointAtTime = {
            drones: mapToJsonDrones(this.drones)
        }
        return JSON.stringify(format, null, 2);
    }

    exportConfig(): string { // TODO: ÄNDERUNG: METHODE ADD
        const config: ProjectConfig = {
            version: FILE_VERSION,
            settings : {
                endTime: this.endTime,
                dayTime: this.dayTime,
                collisionRadius: this.collisionRadius,
            },
            drones: mapToJsonDrones(this.drones)
        }

        return JSON.stringify(config, null, 0)
    }

    saveToLocalStorage(): void {
        localStorage.setItem(LAST_PROJECT_DATA_KEY, this.exportConfig());
    }
}