import type { IProject } from "../interface/IProject";
import type { IProjectDataRepository } from "../../repository/IProjectDataRepository";

export class Project implements IProject {
    private repository?: IProjectDataRepository;

    constructor(repository?: IProjectDataRepository) {
        this.repository = repository;
    }

    exportVideo(): void {
        // TODO: Implement video export
        console.warn("exportVideo() not implemented");
    }
    exportWayPointData(): void {
        // TODO: Implement waypoint export
        console.warn("exportWayPointData() not implemented");
    }
    saveProject(): void {
        if (this.repository) {
            this.repository.saveProject(this);
        } else {
            console.warn("No repository configured for saveProject()");
        }
    }
}
