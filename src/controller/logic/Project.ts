import type { IProject } from "../interface/IProject";
import { IController } from "../interface/IController";
import { IProjectRepository } from "../../repository/IProjectRepository";
import { saveAs } from 'file-saver';
import { LAST_PROJECT_DATA_KEY } from "../../repository/RepositoryConstants";
import { OFCEvent } from "../interface/OFCEvent";
import { Result } from "../../repository/Result";

/**
 * Implementiert IProject
 */
export class Project implements IProject {
    private repository: IProjectRepository;
    private projectLoadedEvent: OFCEvent<void> = new OFCEvent<void>();
    private recording: boolean = false;
    private recordingRunningEvent: OFCEvent<boolean> = new OFCEvent<boolean>();

    constructor(repository: IProjectRepository) {
        this.repository = repository;
    }

    exportWayPointData(): void {
        const data = this.repository.export();
        saveAs(new Blob([data], { type: 'application/json' }), 'waypoint-export.json');
    }

    saveProject(): void {
        this.repository.saveToLocalStorage();
        const data = this.repository.exportConfig();
        saveAs(new Blob([data], { type: 'application/json' }), 'project.json');
    }

    newProject(): void {
        this.repository.load(null, () => {});
        this.onLoad();
    }

    loadProject(file: File, onCompleted: (result: Result<null>) => void): void {
        this.repository.load(file, (result) => {
            this.onLoad();
            onCompleted(result);
        });
    }

    loadLastProject(): Result<boolean> {
        const result = this.repository.loadLastProject();
        if (result.isSuccess()) {
            this.onLoad();
        }
        return result;
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

    startRecording(): void {
        this.recording = true;
        this.recordingRunningEvent.notify(true);
    }

    stopRecording(): void {
        this.recording = false;
        this.recordingRunningEvent.notify(false);
    }

    getRecordingRunning(): boolean {
        return this.recording;
    }

    getRecordingRunningEvent(): OFCEvent<boolean> {
        return this.recordingRunningEvent;
    }
}
