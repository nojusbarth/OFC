import { Vector3, Color } from "three";
import { makeUndoableController } from "../controller/testHelper";
import { IUndoableController } from "../../controller/interface/IUndoableController";
import { IProjectRepository } from "../../repository/IProjectRepository";

/**
 * UI + Controller Integration Tests
 * Tests für die Integration zwischen UI-Aktionen und Controller-Logik
 */

describe("Drone Management - UI + Controller Integration", () => {
  let controller: IUndoableController;
  let repository: IProjectRepository;

  beforeEach(() => {
    // Suppress console logs during tests
    jest.spyOn(console, "log").mockImplementation(() => {});
    [controller, repository] = makeUndoableController();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

    describe("Adding and Removing Drones", () => {
        it("should add drone when user action is triggered", () => {
            const initialCount = controller.getDrones().length;
            controller.addDrone();

            expect(controller.getDrones().length).toBe(initialCount + 1);
            expect(repository.getAllDrones().length).toBe(initialCount + 1);
        });

        it("should add multiple drones in sequence", () => {
            controller.addDrone();
            controller.addDrone();
            controller.addDrone();

            expect(controller.getDrones().length).toBe(3);
            expect(repository.getAllDrones().length).toBe(3);
        });

        it("should remove drone on user request", () => {
            const droneId = controller.addDrone();
            expect(controller.getDrones()).toContain(droneId);

            controller.removeDrone(droneId);

            expect(controller.getDrones()).not.toContain(droneId);
            expect(repository.getAllDrones().length).toBe(0);
        });
    });

    describe("KeyFrame Management", () => {
        it("should add position keyframe via UI action", () => {
            const droneId = controller.addDrone();

            controller.addPositionKeyFrameNow(droneId, new Vector3(0, 0, 0));

            const drone = repository.getAllDrones()[0];
            expect(drone.getPositionKeyFrames().length).toBeGreaterThan(0);
        });

        it("should add color keyframe via UI action", () => {
            const droneId = controller.addDrone();

            controller.addColorKeyFrameNow(droneId, new Color(1, 0, 0));

            const drone = repository.getAllDrones()[0];
            expect(drone.getColorKeyFrames().length).toBeGreaterThan(0);
        });

        it("should handle multiple keyframes per drone", async () => {
            const droneId = controller.addDrone();

            controller.addPositionKeyFrameNow(droneId, new Vector3(0, 0, 0));
            // Wait a bit for different timestamps
            await new Promise((resolve) => setTimeout(resolve, 10));
            controller.addPositionKeyFrameNow(droneId, new Vector3(5, 0, 0));
            controller.addColorKeyFrameNow(droneId, new Color(1, 0, 0));

            const drone = repository.getAllDrones()[0];
            expect(drone.getPositionKeyFrames().length).toBeGreaterThanOrEqual(1);
            expect(drone.getColorKeyFrames().length).toBeGreaterThan(0);
        });
    });

    describe("Undo/Redo Integration", () => {
        it("should undo drone addition", () => {
            controller.addDrone();
            expect(controller.getDrones().length).toBe(1);

            controller.undo();

            expect(controller.getDrones().length).toBe(0);
            expect(repository.getAllDrones().length).toBe(0);
        });

        it("should redo drone addition", () => {
            controller.addDrone();
            controller.undo();

            expect(controller.getDrones().length).toBe(0);

            controller.redo();

            expect(controller.getDrones().length).toBe(1);
            expect(repository.getAllDrones().length).toBe(1);
        });

        it("should undo and redo multiple operations", () => {
            const d1 = controller.addDrone();
            const d2 = controller.addDrone();

            expect(controller.getDrones().length).toBe(2);

            // Undo both
            controller.undo();
            expect(controller.getDrones().length).toBe(1);

            controller.undo();
            expect(controller.getDrones().length).toBe(0);

            // Redo both
            controller.redo();
            expect(controller.getDrones().length).toBe(1);

            controller.redo();
            expect(controller.getDrones().length).toBe(2);
        });

        it("should undo/redo keyframe additions", () => {
            const droneId = controller.addDrone();

            controller.addPositionKeyFrameNow(droneId, new Vector3(0, 0, 0));
            expect(
                repository.getAllDrones()[0].getPositionKeyFrames().length,
            ).toBe(1);

            controller.undo();
            expect(
                repository.getAllDrones()[0].getPositionKeyFrames().length,
            ).toBe(0);

            controller.redo();
            expect(
                repository.getAllDrones()[0].getPositionKeyFrames().length,
            ).toBe(1);
        });
    });

    describe("Complex User Workflows", () => {
        it("should handle full drone creation workflow", () => {
            // User creates drone
            const droneId = controller.addDrone();
            expect(controller.getDrones()).toContain(droneId);

            // User adds position
            controller.addPositionKeyFrameNow(droneId, new Vector3(10, 0, 0));

            // User adds color
            controller.addColorKeyFrameNow(droneId, new Color(1, 0.5, 0));

            // Verify all data persisted
            const drone = repository.getAllDrones()[0];
            expect(drone.getId()).toBe(droneId);
            expect(drone.getPositionKeyFrames().length).toBe(1);
            expect(drone.getColorKeyFrames().length).toBe(1);
        });

        it("should handle drone creation and deletion workflow", () => {
            const d1 = controller.addDrone();
            const d2 = controller.addDrone();

            controller.addPositionKeyFrameNow(d1, new Vector3(0, 0, 0));
            controller.addPositionKeyFrameNow(d2, new Vector3(5, 0, 0));

            expect(controller.getDrones().length).toBe(2);

            // Delete first drone
            controller.removeDrone(d1);
            expect(controller.getDrones()).not.toContain(d1);
            expect(controller.getDrones()).toContain(d2);
            expect(repository.getAllDrones().length).toBe(1);
        });

        it("should maintain data consistency through user edits", async () => {
            const droneId = controller.addDrone();

            // Add initial keyframes
            controller.addPositionKeyFrameNow(droneId, new Vector3(0, 0, 0));
            controller.addColorKeyFrameNow(droneId, new Color(1, 0, 0));

            const drone1 = repository.getAllDrones()[0];
            expect(drone1.getPositionKeyFrames().length).toBeGreaterThan(0);
            expect(drone1.getColorKeyFrames().length).toBeGreaterThan(0);

            // User continues editing
            await new Promise((resolve) => setTimeout(resolve, 10));
            controller.addPositionKeyFrameNow(droneId, new Vector3(10, 0, 0));
            controller.addColorKeyFrameNow(droneId, new Color(0, 1, 0));

            const drone2 = repository.getAllDrones()[0];
            expect(drone2.getPositionKeyFrames().length).toBeGreaterThanOrEqual(1);
            expect(drone2.getColorKeyFrames().length).toBeGreaterThanOrEqual(1);
        });
    });

    describe("State Consistency", () => {
        it("should keep controller and repository in sync", () => {
            const d1 = controller.addDrone();
            const d2 = controller.addDrone();

            const controllerDrones = controller.getDrones();
            const repositoryDrones = repository
                .getAllDrones()
                .map((d) => d.getId());

            expect(controllerDrones.length).toBe(repositoryDrones.length);
            controllerDrones.forEach((droneId) => {
                expect(repositoryDrones).toContain(droneId);
            });
        });

        it("should maintain consistency after remove operation", () => {
            const d1 = controller.addDrone();
            const d2 = controller.addDrone();
            const d3 = controller.addDrone();

            controller.removeDrone(d2);

            const controllerDrones = controller.getDrones();
            const repositoryDrones = repository
                .getAllDrones()
                .map((d) => d.getId());

            expect(controllerDrones).toContain(d1);
            expect(controllerDrones).not.toContain(d2);
            expect(controllerDrones).toContain(d3);
            expect(repositoryDrones.length).toBe(2);
        });
    });
});
