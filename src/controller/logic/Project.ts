import type { IProject } from "../interface/IProject";
import { IController } from "../interface/IController";
import { IProjectRepository } from "../../repository/IProjectRepository";

export class Project implements IProject {
    private repository: IProjectRepository;
    private controller: IController;

    constructor(repository: IProjectRepository, controller: IController) {
        this.repository = repository;
        this.controller = controller;
    }

    exportVideo(): void {
        throw new Error("Method not implemented.");
    }
    exportWayPointData(): void {
        throw new Error("Method not implemented.");
    }
    saveProject(): void {
        throw new Error("Method not implemented.");
    }
    loadProject(data: string): void {
        throw new Error("Method not implemented.");
    }
}
