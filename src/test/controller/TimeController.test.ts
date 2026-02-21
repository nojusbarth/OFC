import { ISettings } from "../../controller/interface/ISettings";
import { ITimeController } from "../../controller/interface/ITimeController";
import { makeBasicController } from "./testHelper";
// Tests von KI generiert
describe("TimeController Tests", () => {
    let settings: ISettings;
    let timeController: ITimeController;

    beforeEach(() => {
        const [controller] = makeBasicController();
        settings = controller.getSettings();
        timeController = controller.getTimeController();
    });

    // ============================================================================
    // ITimeController Events
    // ============================================================================

    describe("TimeController - getTimeChangedEvent()", () => {
        beforeEach(() => {
            settings.setEndTime(100);
        });

        it("should emit timeChangedEvent when setTime is called with different value", () => {
            const handler = jest.fn();
            timeController.getTimeChangedEvent().register(handler);

            timeController.setTime(10);

            expect(handler).toHaveBeenCalledWith(10);
        });

        it("should emit timeChangedEvent with correct value for multiple different calls", () => {
            const handler = jest.fn();
            timeController.getTimeChangedEvent().register(handler);

            timeController.setTime(5);
            timeController.setTime(10);
            timeController.setTime(15);

            expect(handler).toHaveBeenNthCalledWith(1, 5);
            expect(handler).toHaveBeenNthCalledWith(2, 10);
            expect(handler).toHaveBeenNthCalledWith(3, 15);
            expect(handler).toHaveBeenCalledTimes(3);
        });

        it("should not emit timeChangedEvent when setting same time twice", () => {
            const handler = jest.fn();
            timeController.getTimeChangedEvent().register(handler);

            timeController.setTime(7);
            timeController.setTime(7);

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith(7);
        });

        it("should emit timeChangedEvent with zero", () => {
            const handler = jest.fn();
            timeController.getTimeChangedEvent().register(handler);

            timeController.setTime(10);
            handler.mockClear();
            timeController.setTime(0);

            expect(handler).toHaveBeenCalledWith(0);
        });

        it("should allow multiple handlers on timeChangedEvent", () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            timeController.getTimeChangedEvent().register(handler1);
            timeController.getTimeChangedEvent().register(handler2);

            timeController.setTime(20);

            expect(handler1).toHaveBeenCalledWith(20);
            expect(handler2).toHaveBeenCalledWith(20);
        });

        it("should allow removing handler from timeChangedEvent", () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            timeController.getTimeChangedEvent().register(handler1);
            timeController.getTimeChangedEvent().register(handler2);
            timeController.getTimeChangedEvent().remove(handler1);

            timeController.setTime(25);

            expect(handler1).not.toHaveBeenCalled();
            expect(handler2).toHaveBeenCalledWith(25);
        });
    });

    describe("TimeController - getAnimationSpeedChangedEvent()", () => {
        it("should emit animationSpeedChangedEvent when setAnimationSpeed is called with different value", () => {
            const handler = jest.fn();
            timeController.getAnimationSpeedChangedEvent().register(handler);

            timeController.setAnimationSpeed(2.0);

            expect(handler).toHaveBeenCalledWith(2.0);
        });

        it("should emit animationSpeedChangedEvent with correct value for multiple different calls", () => {
            const handler = jest.fn();
            timeController.getAnimationSpeedChangedEvent().register(handler);

            timeController.setAnimationSpeed(0.5);
            timeController.setAnimationSpeed(2.0);
            timeController.setAnimationSpeed(1.5);

            expect(handler).toHaveBeenNthCalledWith(1, 0.5);
            expect(handler).toHaveBeenNthCalledWith(2, 2.0);
            expect(handler).toHaveBeenNthCalledWith(3, 1.5);
            expect(handler).toHaveBeenCalledTimes(3);
        });

        it("should not emit animationSpeedChangedEvent when setting same speed twice", () => {
            const handler = jest.fn();
            timeController.getAnimationSpeedChangedEvent().register(handler);

            timeController.setAnimationSpeed(1.5);
            timeController.setAnimationSpeed(1.5);

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith(1.5);
        });

        it("should allow multiple handlers on animationSpeedChangedEvent", () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            timeController.getAnimationSpeedChangedEvent().register(handler1);
            timeController.getAnimationSpeedChangedEvent().register(handler2);

            timeController.setAnimationSpeed(3.0);

            expect(handler1).toHaveBeenCalledWith(3.0);
            expect(handler2).toHaveBeenCalledWith(3.0);
        });

        it("should allow removing handler from animationSpeedChangedEvent", () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            timeController.getAnimationSpeedChangedEvent().register(handler1);
            timeController.getAnimationSpeedChangedEvent().register(handler2);
            timeController.getAnimationSpeedChangedEvent().remove(handler1);

            timeController.setAnimationSpeed(2.5);

            expect(handler1).not.toHaveBeenCalled();
            expect(handler2).toHaveBeenCalledWith(2.5);
        });
    });

    describe("TimeController - getAnimationRunningEvent()", () => {
        it("should emit animationRunningEvent when startAnimation is called", () => {
            const handler = jest.fn();
            timeController.getAnimationRunningEvent().register(handler);

            timeController.startAnimation();

            expect(handler).toHaveBeenCalledWith(true);
        });

        it("should emit animationRunningEvent when stopAnimation is called", () => {
            timeController.startAnimation();
            const handler = jest.fn();
            timeController.getAnimationRunningEvent().register(handler);

            timeController.stopAnimation();

            expect(handler).toHaveBeenCalledWith(false);
        });

        it("should emit animationRunningEvent for multiple start/stop calls", () => {
            const handler = jest.fn();
            timeController.getAnimationRunningEvent().register(handler);

            timeController.startAnimation();
            timeController.stopAnimation();
            timeController.startAnimation();
            timeController.stopAnimation();

            expect(handler).toHaveBeenNthCalledWith(1, true);
            expect(handler).toHaveBeenNthCalledWith(2, false);
            expect(handler).toHaveBeenNthCalledWith(3, true);
            expect(handler).toHaveBeenNthCalledWith(4, false);
            expect(handler).toHaveBeenCalledTimes(4);
        });

        it("should allow multiple handlers on animationRunningEvent", () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            timeController.getAnimationRunningEvent().register(handler1);
            timeController.getAnimationRunningEvent().register(handler2);

            timeController.startAnimation();

            expect(handler1).toHaveBeenCalledWith(true);
            expect(handler2).toHaveBeenCalledWith(true);
        });

        it("should allow removing handler from animationRunningEvent", () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            timeController.getAnimationRunningEvent().register(handler1);
            timeController.getAnimationRunningEvent().register(handler2);
            timeController.getAnimationRunningEvent().remove(handler1);

            timeController.startAnimation();

            expect(handler1).not.toHaveBeenCalled();
            expect(handler2).toHaveBeenCalledWith(true);
        });
    });

    describe("TimeController - Multiple events integration", () => {
        it("should emit time event when setting time without animation", () => {
            settings.setEndTime(100); // Increase end time so we can set times up to 100
            const timeHandler = jest.fn();
            const speedHandler = jest.fn();
            const runningHandler = jest.fn();

            timeController.getTimeChangedEvent().register(timeHandler);
            timeController.getAnimationSpeedChangedEvent().register(speedHandler);
            timeController.getAnimationRunningEvent().register(runningHandler);

            timeController.setAnimationSpeed(1.5);
            timeController.setTime(12);
            timeController.startAnimation();

            expect(timeHandler).toHaveBeenCalledWith(12);
            expect(speedHandler).toHaveBeenCalledWith(1.5);
            expect(runningHandler).toHaveBeenCalledWith(true);
        });

        it("should emit running event when starting and stopping animation", () => {
            const runningHandler = jest.fn();
            timeController.getAnimationRunningEvent().register(runningHandler);

            timeController.startAnimation();
            timeController.stopAnimation();

            expect(runningHandler).toHaveBeenNthCalledWith(1, true);
            expect(runningHandler).toHaveBeenNthCalledWith(2, false);
            expect(runningHandler).toHaveBeenCalledTimes(2);
        });

        it("should not emit running event if already running or already stopped", () => {
            const runningHandler = jest.fn();
            timeController.getAnimationRunningEvent().register(runningHandler);

            timeController.startAnimation();
            timeController.startAnimation(); // Already running
            expect(runningHandler).toHaveBeenCalledTimes(1);

            timeController.stopAnimation();
            timeController.stopAnimation(); // Already stopped
            expect(runningHandler).toHaveBeenCalledTimes(2);
        });

        it("should track multiple time changes and speed changes", () => {
            settings.setEndTime(100); // Increase end time
            const timeHandler = jest.fn();
            const speedHandler = jest.fn();

            timeController.getTimeChangedEvent().register(timeHandler);
            timeController.getAnimationSpeedChangedEvent().register(speedHandler);

            timeController.setTime(5);
            timeController.setAnimationSpeed(2.0);
            timeController.setTime(10);
            timeController.setAnimationSpeed(0.5);

            expect(timeHandler).toHaveBeenNthCalledWith(1, 5);
            expect(timeHandler).toHaveBeenNthCalledWith(2, 10);
            expect(speedHandler).toHaveBeenNthCalledWith(1, 2.0);
            expect(speedHandler).toHaveBeenNthCalledWith(2, 0.5);
        });
    });
});
