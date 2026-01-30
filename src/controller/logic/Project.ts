import type { IProject } from "../interface/IProject";
import { IController } from "../interface/IController";
import { IProjectRepository } from "../../repository/IProjectRepository";
import { saveAs } from 'file-saver';
import { LAST_PROJECT_DATA_KEY } from "../../repository/RepositoryConstants";
import { OFCEvent } from "../interface/OFCEvent";

export class Project implements IProject {
    private repository: IProjectRepository;
    private controller: IController;
    private projectLoadedEvent: OFCEvent<void> = new OFCEvent<void>();

    constructor(repository: IProjectRepository, controller: IController) {
        this.repository = repository;
        this.controller = controller;
    }

    exportVideo(): void {
        throw new Error("Method not implemented.");
    }

    exportWayPointData(): void {
        const data = this.repository.export();
        saveAs(data, 'waypoint-export.json');
    }

    saveProject(): void {
        this.repository.saveToLocalStorage();
        const data = this.repository.exportConfig();
        saveAs(data, 'project.json');
    }

    newProject(): void {
        this.repository.load(null);
        this.onLoad();
    }

    loadProject(file: File): void {
        this.repository.load(file);
        this.onLoad();
    }

    loadLastProject(): void {
        const success = this.repository.loadLastProject();
        if (success) {
            this.onLoad();
        }
    }

    canLoadLastProject(): boolean {
        return localStorage.getItem(LAST_PROJECT_DATA_KEY) !== null;
    }

    private onLoad(): void {
        this.projectLoadedEvent.notify(undefined);
    }

    getProjectLoadedEvent(): OFCEvent<void> {
        return this.projectLoadedEvent;
    }
}
