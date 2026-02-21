import { IController } from "../../controller/interface/IController"
import { IProject } from "../../controller/interface/IProject";
import { Result } from "../../repository/Result";
import { makeBasicController } from "./testHelper";
import { saveAs } from "file-saver";

describe("ProjectController", () => {
    let controller: IController;
    let project: IProject;
    let saveAsMock: jest.SpyInstance;

    beforeEach(() => {
        localStorage.clear();
        const [ctrl] = makeBasicController();
        controller = ctrl;
        project = controller.getProject();
        saveAsMock = jest.spyOn(saveAs, "saveAs").mockImplementation(() => { });
    });

    afterEach(() => {
        saveAsMock.mockRestore();
    });

    it("recording state emits correct values", () => {
        const recordingStateHandler = jest.fn();
        project.getRecordingRunningEvent().register(recordingStateHandler);

        expect(project.getRecordingRunning()).toBe(false);
        expect(recordingStateHandler).not.toHaveBeenCalled();

        project.startRecording();
        expect(project.getRecordingRunning()).toBe(true);
        expect(recordingStateHandler).toHaveBeenCalledWith(true);

        project.stopRecording();
        expect(project.getRecordingRunning()).toBe(false);
        expect(recordingStateHandler).toHaveBeenCalledWith(false);
        expect(recordingStateHandler).toHaveBeenCalledTimes(2);
    });

    it("exportWayPointData should call saveAs with correct parameters", () => {

        project.exportWayPointData();
        expect(saveAsMock).toHaveBeenCalledTimes(1);
        const callArgs = saveAsMock.mock.calls[0];
        expect(callArgs[0]).toBeInstanceOf(Blob);
        expect(callArgs[1]).toEqual("waypoint-export.json");

        saveAsMock.mockRestore();
    });

    it("canLoadLastProject should return false when no project is saved locally", () => {
        expect(project.canLoadLastProject()).toBe(false);
    });

    it("canLoadLastProject should return true when a project is saved locally", () => {
        project.saveProjectLocally();
        expect(project.canLoadLastProject()).toBe(true);
    });

    it("last Project should be loaded correctly", () => {
        controller.getSettings().setEndTime(123);
        controller.addDrone();
        project.saveProjectLocally();

        // Create a new instance to ensure we are loading from localStorage
        const [newController] = makeBasicController();
        const newProject = newController.getProject();

        const projectLoadedHandler = jest.fn();
        newProject.getProjectLoadedEvent().register(projectLoadedHandler);

        const loadResult = newProject.loadLastProject();
        expect(loadResult.isSuccess()).toBe(true);
        expect(newController.getSettings().getEndTime()).toBe(123);
        expect(newController.getDrones().length).toBe(1);

        expect(projectLoadedHandler).toHaveBeenCalledTimes(1);
    });

    it("should load project from file correctly", async () => {
        controller.getSettings().setEndTime(123);
        controller.addDrone();
        project.saveProject();
        expect(saveAsMock).toHaveBeenCalledTimes(1);

        const savedBlob = saveAsMock.mock.calls[0][0];
        const file = new File([savedBlob], "project.json", { type: "application/json" });

        // Create a new instance to ensure we are actually loading from the file
        const [newController] = makeBasicController();
        const newProject = newController.getProject();

        const projectLoadedHandler = jest.fn();
        newProject.getProjectLoadedEvent().register(projectLoadedHandler);

        const loadResult: Result<boolean>
            = await new Promise((resolve) => newProject.loadProject(file, resolve));

        expect(loadResult.isSuccess()).toBe(true);
        expect(newController.getSettings().getEndTime()).toBe(123);
        expect(newController.getDrones().length).toBe(1);

        expect(projectLoadedHandler).toHaveBeenCalledTimes(1);
    }, 10000);

    it("should properly initialize a new project", () => {
        project.newProject();
        const defaultEndTime = controller.getSettings().getEndTime();
        const defaultCollisionRadius = controller.getSettings().getCollisionRadius();

        controller.getSettings().setEndTime(123);
        controller.getSettings().setCollisionRadius(7);
        const id = controller.addDrone();
        controller.selectDrone(id);

        project.newProject();

        expect(controller.getSettings().getEndTime()).toBe(defaultEndTime);
        expect(controller.getSettings().getCollisionRadius()).toBe(defaultCollisionRadius);
        expect(controller.getDrones().length).toBe(0);
        expect(controller.getSelectedDrones()).toEqual([]);
    });
});