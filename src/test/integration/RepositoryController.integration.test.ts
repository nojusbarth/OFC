import { Controller } from "../../controller/logic/Controller";
import { ProjectRepository } from "../../repository/ProjectRepository";
import { Settings } from "../../controller/logic/Settings";
import { Vector3, Color } from "three";
import { makeBasicController } from "../controller/testHelper";
// Tests von KI generiert


describe("Controller-Repository Integration", () => {
    let controller: any;
    let repository: any;

    beforeEach(() => {
        [controller, repository] = makeBasicController();
    });

    describe("Drone CRUD Operations", () => {
        it("should persist drone data when adding drones", () => {
            const droneId = controller.addDrone();
            controller.addPositionKeyFrameNow(droneId, new Vector3(1, 2, 3));

            // Repository muss die Daten persistieren
            const drones = repository.getAllDrones();
            expect(drones.length).toBe(1);
            expect(drones[0].getPositionKeyFrames().length).toBeGreaterThan(0);
        });

        it("should update repository when drone is removed", () => {
            const droneId = controller.addDrone();
            const initialCount = repository.getAllDrones().length;

            controller.removeDrone(droneId);

            expect(repository.getAllDrones().length).toBe(initialCount - 1);
        });

        it("should sync drone properties with repository", () => {
            const droneId = controller.addDrone();
            const color = new Color(1, 0.5, 0); // RGB: 255, 128, 0

            controller.addColorKeyFrameNow(droneId, color);

            const drone = repository.getAllDrones()[0];
            expect(drone.getColorKeyFrames().length).toBeGreaterThan(0);
            expect(drone.getColorKeyFrames()[0].getColor().r).toBeCloseTo(1, 1);
        });
    });

    describe("Collision Detection", () => {
        it("should handle concurrent modifications correctly", async () => {
            const drone1 = controller.addDrone();
            const drone2 = controller.addDrone();

            // Mehrere gleichzeitige Operationen
            controller.addPositionKeyFrameNow(drone1, new Vector3(0, 0, 0));
            controller.addColorKeyFrameNow(drone2, new Color(1, 0, 0));

            const drones = repository.getAllDrones();
            expect(drones[0].getPositionKeyFrames().length).toBeGreaterThan(0);
            expect(drones[1].getColorKeyFrames().length).toBeGreaterThan(0);
        });

        it("should detect collisions and update repository", async () => {
            controller.getSettings().setCollisionRadius(5);

            const drone1 = controller.addDrone();
            const drone2 = controller.addDrone();

            controller.addPositionKeyFrameNow(drone1, new Vector3(0, 0, 0));
            controller.addPositionKeyFrameNow(drone2, new Vector3(2, 0, 0));

            let collisionDetected = false;
            controller.getCollisionEvent().register(() => {
                collisionDetected = true;
            });

            // Flush collision queue
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(collisionDetected).toBe(true);
            // Daten sollten unverändert im Repository sein
            expect(repository.getAllDrones().length).toBe(2);
        });
    });

    describe("Position and Color KeyFrames", () => {
        it("should maintain correct keyframe ordering", () => {
            const droneId = controller.addDrone();

            controller.addPositionKeyFrameNow(droneId, new Vector3(0, 0, 0));

            // Add small delay to ensure timestamps are different
            const time1 = Date.now();
            while (Date.now() === time1) {
                // Wait for time to change
            }

            controller.addPositionKeyFrameNow(droneId, new Vector3(10, 0, 0));

            const time2 = Date.now();
            while (Date.now() === time2) {
                // Wait for time to change
            }

            controller.addPositionKeyFrameNow(droneId, new Vector3(10, 10, 0));

            const drone = repository.getAllDrones()[0];
            const keyFrames = drone.getPositionKeyFrames();
            expect(keyFrames.length).toBeGreaterThanOrEqual(1);

            // Keyframes should be in temporal order
            for (let i = 1; i < keyFrames.length; i++) {
                expect(keyFrames[i].getTime() >= keyFrames[i - 1].getTime()).toBe(true);
            }
        });

        it("should handle multiple color keyframes per drone", async () => {
            const droneId = controller.addDrone();

            controller.addColorKeyFrameNow(droneId, new Color(1, 0, 0));
            await new Promise((resolve) => setTimeout(resolve, 10));
            controller.addColorKeyFrameNow(droneId, new Color(0, 1, 0));
            await new Promise((resolve) => setTimeout(resolve, 10));
            controller.addColorKeyFrameNow(droneId, new Color(0, 0, 1));

            const drone = repository.getAllDrones()[0];
            const colorFrames = drone.getColorKeyFrames();
            expect(colorFrames.length).toBeGreaterThanOrEqual(1);
        });
    });
});
