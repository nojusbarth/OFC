import { Color, Vector3 } from "three";
import { IController } from "../../controller/interface/IController";
import { PositionKeyFrame } from "../../repository/entity/PositionKeyFrame";
import { ColorKeyFrame } from "../../repository/entity/ColorKeyFrame";
import { makeBasicController } from "./testHelper";

describe("Controller Event Emission Tests", () => {
    let controller: IController;

    beforeEach(() => {
        [controller] = makeBasicController();
    });

    // ============================================================================
    // getDroneChangedEvent() - Emitted when a drone's keyframes change
    // ============================================================================

    describe("getDroneChangedEvent - Position KeyFrame Events", () => {
        it("should emit droneChangedEvent when adding a position keyframe", () => {
            const droneId = controller.addDrone();
            const keyFrame = new PositionKeyFrame(new Vector3(1, 2, 3), 0);
            const handler = jest.fn();

            controller.getDroneChangedEvent().register(handler);
            controller.addPositionKeyFrame(droneId, keyFrame);

            expect(handler).toHaveBeenCalledWith(droneId);
        });

        it("should emit droneChangedEvent when adding a position keyframe now", () => {
            const droneId = controller.addDrone();
            const position = new Vector3(5, 6, 7);
            const handler = jest.fn();

            controller.getDroneChangedEvent().register(handler);
            controller.addPositionKeyFrameNow(droneId, position);

            expect(handler).toHaveBeenCalledWith(droneId);
        });

        it("should emit droneChangedEvent when removing a position keyframe", () => {
            const droneId = controller.addDrone();
            const keyFrame = new PositionKeyFrame(new Vector3(1, 2, 3), 0);
            controller.addPositionKeyFrame(droneId, keyFrame);
            const handler = jest.fn();

            controller.getDroneChangedEvent().register(handler);
            controller.removePositionKeyFrame(droneId, keyFrame);

            expect(handler).toHaveBeenCalledWith(droneId);
        });

        it("should emit droneChangedEvent with correct drone ID for multiple drones", () => {
            const droneId1 = controller.addDrone();
            const droneId2 = controller.addDrone();
            const keyFrame = new PositionKeyFrame(new Vector3(1, 2, 3), 0);
            const handler = jest.fn();

            controller.getDroneChangedEvent().register(handler);
            controller.addPositionKeyFrame(droneId2, keyFrame);
            controller.addPositionKeyFrame(droneId1, keyFrame);

            expect(handler).toHaveBeenNthCalledWith(1, droneId2);
            expect(handler).toHaveBeenNthCalledWith(2, droneId1);
        });
    });

    describe("getDroneChangedEvent - Color KeyFrame Events", () => {
        it("should emit droneChangedEvent when adding a color keyframe", () => {
            const droneId = controller.addDrone();
            const keyFrame = new ColorKeyFrame(new Color(1, 0, 0), 0);
            const handler = jest.fn();

            controller.getDroneChangedEvent().register(handler);
            controller.addColorKeyFrame(droneId, keyFrame);

            expect(handler).toHaveBeenCalledWith(droneId);
        });

        it("should emit droneChangedEvent when adding a color keyframe now", () => {
            const droneId = controller.addDrone();
            const color = new Color(0, 1, 0);
            const handler = jest.fn();

            controller.getDroneChangedEvent().register(handler);
            controller.addColorKeyFrameNow(droneId, color);

            expect(handler).toHaveBeenCalledWith(droneId);
        });

        it("should emit droneChangedEvent when removing a color keyframe", () => {
            const droneId = controller.addDrone();
            const keyFrame = new ColorKeyFrame(new Color(1, 0, 0), 0);
            controller.addColorKeyFrame(droneId, keyFrame);
            const handler = jest.fn();

            controller.getDroneChangedEvent().register(handler);
            controller.removeColorKeyFrame(droneId, keyFrame);

            expect(handler).toHaveBeenCalledWith(droneId);
        });
    });

    // ============================================================================
    // getDronesEvent() - Emitted when drones are added or removed
    // ============================================================================

    describe("getDronesEvent - Drone Management Events", () => {
        it("should emit dronesEvent when a drone is added", () => {
            const handler = jest.fn();
            controller.getDronesEvent().register(handler);

            controller.addDrone();

            expect(handler).toHaveBeenCalledWith([0]);
        });

        it("should emit dronesEvent with updated drone list when multiple drones are added", () => {
            const handler = jest.fn();
            controller.getDronesEvent().register(handler);

            controller.addDrone();
            controller.addDrone();
            controller.addDrone();

            expect(handler).toHaveBeenNthCalledWith(1, [0]);
            expect(handler).toHaveBeenNthCalledWith(2, [0, 1]);
            expect(handler).toHaveBeenNthCalledWith(3, [0, 1, 2]);
        });

        it("should emit dronesEvent when a drone is removed", () => {
            const droneId = controller.addDrone();
            controller.addDrone();
            const handler = jest.fn();

            controller.getDronesEvent().register(handler);
            controller.removeDrone(droneId);

            expect(handler).toHaveBeenCalledWith([1]);
        });

        it("should emit dronesEvent with correct list after multiple additions and removals", () => {
            controller.addDrone(); // 0
            controller.addDrone(); // 1
            const drone2 = controller.addDrone(); // 2
            controller.addDrone(); // 3
            const handler = jest.fn();

            controller.getDronesEvent().register(handler);
            controller.removeDrone(drone2);
            controller.removeDrone(0);

            expect(handler).toHaveBeenNthCalledWith(1, [0, 1, 3]);
            expect(handler).toHaveBeenNthCalledWith(2, [1, 3]);
        });
    });

    // ============================================================================
    // getDroneSelectEvent() - Emitted when drones are selected/unselected
    // ============================================================================

    describe("getDroneSelectEvent - Selection Events", () => {
        it("should emit droneSelectEvent when a drone is selected", () => {
            const droneId = controller.addDrone();
            const handler = jest.fn();

            controller.getDroneSelectEvent().register(handler);
            controller.selectDrone(droneId);

            expect(handler).toHaveBeenCalledWith([droneId]);
        });

        it("should not emit droneSelectEvent when selecting an already selected drone", () => {
            const droneId = controller.addDrone();
            controller.selectDrone(droneId);
            const handler = jest.fn();

            controller.getDroneSelectEvent().register(handler);
            controller.selectDrone(droneId); // Select again

            expect(handler).not.toHaveBeenCalled();
        });

        it("should emit droneSelectEvent when multiple drones are selected", () => {
            const droneId1 = controller.addDrone();
            const droneId2 = controller.addDrone();
            const handler = jest.fn();

            controller.getDroneSelectEvent().register(handler);
            controller.selectDrone(droneId1);
            expect(handler).toHaveBeenNthCalledWith(1, [droneId1]);
            controller.selectDrone(droneId2);

            expect(handler).toHaveBeenNthCalledWith(2, [droneId1, droneId2]);
        });

        it("should emit droneSelectEvent when a drone is unselected", () => {
            const droneId1 = controller.addDrone();
            const droneId2 = controller.addDrone();
            controller.selectDrone(droneId1);
            controller.selectDrone(droneId2);
            const handler = jest.fn();

            controller.getDroneSelectEvent().register(handler);
            controller.unselectDrone(droneId1);

            expect(handler).toHaveBeenCalledWith([droneId2]);
        });

        it("should not emit droneSelectEvent when unselecting a non-selected drone", () => {
            const droneId1 = controller.addDrone();
            const droneId2 = controller.addDrone();
            controller.selectDrone(droneId1);
            const handler = jest.fn();

            controller.getDroneSelectEvent().register(handler);
            controller.unselectDrone(droneId2); // This drone is not selected

            expect(handler).not.toHaveBeenCalled();
        });

        it("should emit droneSelectEvent when selecting special -1 (deselect all)", () => {
            const droneId = controller.addDrone();
            controller.selectDrone(droneId);
            const handler = jest.fn();

            controller.getDroneSelectEvent().register(handler);
            controller.selectDrone(-1);

            expect(handler).toHaveBeenCalledWith([droneId, -1]);
        });

        it("should track selection state correctly with mixed selections and deselections", () => {
            const droneId1 = controller.addDrone();
            const droneId2 = controller.addDrone();
            const droneId3 = controller.addDrone();
            const handler = jest.fn();

            controller.getDroneSelectEvent().register(handler);
            controller.selectDrone(droneId1);
            expect(handler).toHaveBeenNthCalledWith(1, [droneId1]);
            controller.selectDrone(droneId2);
            expect(handler).toHaveBeenNthCalledWith(2, [droneId1, droneId2]);
            controller.unselectDrone(droneId1);
            expect(handler).toHaveBeenNthCalledWith(3, [droneId2]);
            controller.selectDrone(droneId3);
            expect(handler).toHaveBeenNthCalledWith(4, [droneId2, droneId3]);
        });
    });

    // ============================================================================
    // getCollisionEvent() - Emitted when collision state changes
    // ============================================================================

    describe("getCollisionEvent - Collision Detection Events", () => {
        it("should not emit collisionEvent when adding a position keyframe not causing a collision", () => {
            const droneId = controller.addDrone();
            const keyFrame = new PositionKeyFrame(new Vector3(1, 2, 3), 0);
            const handler = jest.fn();

            controller.getCollisionEvent().register(handler);
            controller.addPositionKeyFrame(droneId, keyFrame);

            expect(handler).not.toHaveBeenCalled();
        });

        it("should emit collisionEvent when collision is detected", () => {
            controller.getSettings().setDroneDistance(5);
            const droneId1 = controller.addDrone();
            const droneId2 = controller.addDrone();
            const handler = jest.fn();

            controller.getCollisionEvent().register(handler);
            controller.addPositionKeyFrame(
                droneId1,
                new PositionKeyFrame(new Vector3(0, 0, 0), 0)
            );
            controller.addPositionKeyFrame(
                droneId2,
                new PositionKeyFrame(new Vector3(1, 0, 0), 0)
            );

            expect(handler).toHaveBeenCalled();
        });

        it("should emit collisionEvent when collision is resolved", () => {
            controller.getSettings().setDroneDistance(5);
            const droneId1 = controller.addDrone();
            const droneId2 = controller.addDrone();
            controller.addPositionKeyFrame(
                droneId1,
                new PositionKeyFrame(new Vector3(0, 0, 0), 0)
            );
            controller.addPositionKeyFrame(
                droneId2,
                new PositionKeyFrame(new Vector3(1, 0, 0), 0)
            );
            const handler = jest.fn();

            controller.getCollisionEvent().register(handler);
            controller.addPositionKeyFrame(
                droneId2,
                new PositionKeyFrame(new Vector3(100, 100, 100), 1)
            );

            expect(handler).toHaveBeenCalled();
        });

        it("should not emit collisionEvent when collision state does not change", () => {
            const droneId = controller.addDrone();
            const keyFrame = new PositionKeyFrame(new Vector3(5, 5, 5), 0);
            controller.addPositionKeyFrame(droneId, keyFrame);
            const handler = jest.fn();

            controller.getCollisionEvent().register(handler);
            controller.addPositionKeyFrame(
                droneId,
                new PositionKeyFrame(new Vector3(6, 6, 6), 1)
            );

            expect(handler).not.toHaveBeenCalled();
        });
    });

    // ============================================================================
    // Integration Tests - Multiple Events in Sequence
    // ============================================================================

    describe("Event Emission Integration Tests", () => {
        it("should emit both dronesEvent and droneSelectEvent when adding and selecting a drone", () => {
            const droneHandler = jest.fn();
            const selectHandler = jest.fn();

            controller.getDronesEvent().register(droneHandler);
            controller.getDroneSelectEvent().register(selectHandler);

            const droneId = controller.addDrone();
            controller.selectDrone(droneId);

            expect(droneHandler).toHaveBeenCalled();
            expect(selectHandler).toHaveBeenCalled();
        });

        it("should emit droneChanged and collision events when modifying a drone", () => {
            controller.getSettings().setDroneDistance(5);
            const droneId1 = controller.addDrone();
            const droneId2 = controller.addDrone();
            controller.addPositionKeyFrame(
                droneId1,
                new PositionKeyFrame(new Vector3(0, 0, 0), 0)
            );
            controller.addPositionKeyFrame(
                droneId2,
                new PositionKeyFrame(new Vector3(1, 0, 0), 0)
            );

            const changedHandler = jest.fn();
            const collisionHandler = jest.fn();

            controller.getDroneChangedEvent().register(changedHandler);
            controller.getCollisionEvent().register(collisionHandler);

            controller.addPositionKeyFrame(
                droneId1,
                new PositionKeyFrame(new Vector3(100, 100, 100), 1)
            );

            expect(changedHandler).toHaveBeenCalledWith(droneId1);
            expect(collisionHandler).toHaveBeenCalled();
        });

        it("should emit dronesEvent and droneSelectEvent when removing a selected drone", () => {
            const droneId = controller.addDrone();
            controller.selectDrone(droneId);
            const droneHandler = jest.fn();
            const selectHandler = jest.fn();

            controller.getDronesEvent().register(droneHandler);
            controller.getDroneSelectEvent().register(selectHandler);

            controller.removeDrone(droneId);

            expect(droneHandler).toHaveBeenCalled();
            expect(selectHandler).toHaveBeenCalled();
            expect(controller.getSelectedDrones()).not.toContain(droneId);
        });

        it("should emit all events during complex workflow", () => {
            const droneHandler = jest.fn();
            const selectHandler = jest.fn();
            const changedHandler = jest.fn();
            const collisionHandler = jest.fn();

            controller.getDronesEvent().register(droneHandler);
            controller.getDroneSelectEvent().register(selectHandler);
            controller.getDroneChangedEvent().register(changedHandler);
            controller.getCollisionEvent().register(collisionHandler);

            const droneId1 = controller.addDrone();
            const droneId2 = controller.addDrone();

            controller.selectDrone(droneId1);
            controller.addPositionKeyFrame(
                droneId1,
                new PositionKeyFrame(new Vector3(0, 0, 0), 0)
            );

            expect(droneHandler).toHaveBeenCalled();
            expect(selectHandler).toHaveBeenCalled();
            expect(changedHandler).toHaveBeenCalled();
            expect(collisionHandler).toHaveBeenCalled();
        });
    });

    // ============================================================================
    // Event Handler Management Tests
    // ============================================================================

    describe("Event Handler Registration and Removal", () => {
        it("should allow multiple handlers to be registered on the same event", () => {
            const droneId = controller.addDrone();
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            controller.getDroneSelectEvent().register(handler1);
            controller.getDroneSelectEvent().register(handler2);
            controller.selectDrone(droneId);

            expect(handler1).toHaveBeenCalledWith([droneId]);
            expect(handler2).toHaveBeenCalledWith([droneId]);
        });

        it("should allow removing a handler without affecting others", () => {
            const droneId = controller.addDrone();
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            controller.getDroneSelectEvent().register(handler1);
            controller.getDroneSelectEvent().register(handler2);
            controller.getDroneSelectEvent().remove(handler1);

            controller.selectDrone(droneId);

            expect(handler1).not.toHaveBeenCalled();
            expect(handler2).toHaveBeenCalledWith([droneId]);
        });

        it("should handle registering the same handler multiple times", () => {
            const droneId = controller.addDrone();
            const handler = jest.fn();

            controller.getDroneSelectEvent().register(handler);
            controller.getDroneSelectEvent().register(handler);

            controller.selectDrone(droneId);

            // Handler registered twice, should be called twice
            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler).toHaveBeenNthCalledWith(1, [droneId]);
            expect(handler).toHaveBeenNthCalledWith(2, [droneId]);
        });
    });
});
