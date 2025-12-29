import type { IProject } from "../interface/IProject";
import type { IProjectDataRepository } from "../../repository/IProjectDataRepository";
import { IController } from "../interface/IController";

export class Project implements IProject {
    private repository: IProjectDataRepository;
    private controller: IController;

    constructor(repository: IProjectDataRepository, controller: IController) {
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
}
