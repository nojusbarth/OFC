import { IProjectRepository } from "./IProjectRepository";
import { IDrone } from "./entity/IDrone";
import { DayTime } from "./entity/DayTime";
import { mapToJsonDrones, parseJsonToDrones, ProjectConfig, WaypointAtTime } from "./ProjectConfig";
import { FILE_VERSION, LAST_PROJECT_DATA_KEY } from "./RepositoryConstants";
import { Result } from "./Result";

/**
 * Implementiert das ProjectRepository.
 */
export class ProjectRepository implements IProjectRepository {
    private drones: Array<IDrone> = []
    private collisionRadius: number = 0
    private dayTime: DayTime = DayTime.NOON
    private endTime: number = 0

    load(input: File | string | null, onFinished: (result: Result<boolean>) => void) {
        if (input == null) {
            this.drones = []
            this.collisionRadius = 0.3
            this.dayTime = DayTime.NOON
            this.endTime = 30
            return; // neues Projekt
        }
        if (input instanceof File) {
            let reader = new FileReader();
            reader.onloadend = (e: ProgressEvent<FileReader>) => {
                const content = e.target?.result;
                if (content && !(content instanceof ArrayBuffer)) {
                    const jsonResult = this.parseJson(content)
                    const config = jsonResult.getResult();
                    if (jsonResult.isSuccess() && config != null) {
                        this.setProjectConfig(config);
                    }
                    onFinished(new Result(jsonResult.isSuccess(), jsonResult.getError()))
                } else {
                    onFinished(new Result(false, new Error(`Failed to load project: ${e}`)));
                }
            }
            reader.readAsText(input);
        } else {
            const jsonResult = this.parseJson(input)
            const config = jsonResult.getResult();
            if (jsonResult.isSuccess() && config != null) {
                this.setProjectConfig(config);
            }
            onFinished(new Result(jsonResult.isSuccess(), jsonResult.getError()))
        }
    }

    private setProjectConfig(config: ProjectConfig) {
        this.drones = parseJsonToDrones(config.drones)
        this.collisionRadius = config.settings.collisionRadius
        this.dayTime = config.settings.dayTime
        this.endTime = config.settings.endTime
    }

    loadLastProject(): Result<boolean> {
        const data = localStorage.getItem(LAST_PROJECT_DATA_KEY)
        if (data == null) {
            return new Result(false, new Error(`Projekt konnte nicht geladen werden`))
        }
        const jsonResult = this.parseJson(data)
        const config = jsonResult.getResult();
        if (config != null && jsonResult.isSuccess()) {
            this.setProjectConfig(config);
            return new Result(true)
        } else {
            return new Result(false, jsonResult.getError())
        }
    }

    private parseJson(content: string): Result<ProjectConfig | null> {
        let data: ProjectConfig
        try {
            data = JSON.parse(content)
        } catch (e) {
            return new Result(null, new Error(`Projekt kann nicht geladen werden aufgrund der fehlerhaften Syntax`))
        }
        if (data.version !== FILE_VERSION) {
            return new Result(null, new Error(`Projekt hat die falsche Version: ${data.version} wird nicht unterstützt`));
        }
        return new Result(data);
    }

    getNextDroneId(): number {
        let max: number = 0
        this.drones.forEach((drone) => { if (drone.getId() > max) max = drone.getId() });
        return max + 1

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

    getDroneById(id: number): IDrone | undefined {
        return this.drones.find(d => d.getId() === id);
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

    exportConfig(): string {
        const config: ProjectConfig = {
            version: FILE_VERSION,
            settings: {
                endTime: this.endTime,
                dayTime: this.dayTime,
                collisionRadius: this.collisionRadius,
            },
            drones: mapToJsonDrones(this.drones)
        }

        return JSON.stringify(config, null, 0)
    }

    saveToLocalStorage(): Result<boolean> {
        try {
            localStorage.setItem(LAST_PROJECT_DATA_KEY, this.exportConfig());
            return new Result(true)
        } catch (error) {
            return new Result(false, new Error(`Projekt kann nicht lokal gespeichert werden`))
        }
    }
}