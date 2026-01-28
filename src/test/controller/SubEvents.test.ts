import { ISettings } from "../../controller/interface/ISettings";
import { ITimeController } from "../../controller/interface/ITimeController";
import { DayTime } from "../../repository/entity/DayTime";
import { makeBasicController } from "./testHelper";

describe("Subcontroller Event Emission Tests", () => {
    let settings: ISettings;
    let timeController: ITimeController;

    beforeEach(() => {
        const [controller] = makeBasicController();
        settings = controller.getSettings();
        timeController = controller.getTimeController();
    });

    // ============================================================================
    // ISettings Events
    // ============================================================================

    describe("Settings - getEndTimeChangedEvent()", () => {
        it("should emit endTimeChangedEvent when setEndTime is called with different value", () => {
            const handler = jest.fn();
            settings.getEndTimeChangedEvent().register(handler);

            settings.setEndTime(60);

            expect(handler).toHaveBeenCalledWith(60);
        });

        it("should emit endTimeChangedEvent with correct value for multiple calls", () => {
            const handler = jest.fn();
            settings.getEndTimeChangedEvent().register(handler);

            settings.setEndTime(30);
            settings.setEndTime(60);
            settings.setEndTime(120);

            expect(handler).toHaveBeenNthCalledWith(1, 30);
            expect(handler).toHaveBeenNthCalledWith(2, 60);
            expect(handler).toHaveBeenNthCalledWith(3, 120);
            expect(handler).toHaveBeenCalledTimes(3);
        });

        it("should not emit endTimeChangedEvent when setting same value twice", () => {
            const handler = jest.fn();
            settings.getEndTimeChangedEvent().register(handler);

            settings.setEndTime(45);
            settings.setEndTime(45);

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith(45);
        });

        it("should allow multiple handlers on endTimeChangedEvent", () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            settings.getEndTimeChangedEvent().register(handler1);
            settings.getEndTimeChangedEvent().register(handler2);

            settings.setEndTime(75);

            expect(handler1).toHaveBeenCalledWith(75);
            expect(handler2).toHaveBeenCalledWith(75);
        });

        it("should allow removing handler from endTimeChangedEvent", () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            settings.getEndTimeChangedEvent().register(handler1);
            settings.getEndTimeChangedEvent().register(handler2);
            settings.getEndTimeChangedEvent().remove(handler1);

            settings.setEndTime(90);

            expect(handler1).not.toHaveBeenCalled();
            expect(handler2).toHaveBeenCalledWith(90);
        });
    });

    describe("Settings - getDayTimeChangedEvent()", () => {
        it("should emit dayTimeChangedEvent when setDayTime is called with different value", () => {
            const handler = jest.fn();
            settings.getDayTimeChangedEvent().register(handler);

            settings.setDayTime(DayTime.SUNSET);

            expect(handler).toHaveBeenCalledWith(DayTime.SUNSET);
        });

        it("should emit dayTimeChangedEvent for all DayTime values", () => {
            const handler = jest.fn();
            settings.getDayTimeChangedEvent().register(handler);

            settings.setDayTime(DayTime.SUNSET);
            settings.setDayTime(DayTime.NIGHT);
            settings.setDayTime(DayTime.NOON);
            settings.setDayTime(DayTime.SUNSET);

            expect(handler).toHaveBeenNthCalledWith(1, DayTime.SUNSET);
            expect(handler).toHaveBeenNthCalledWith(2, DayTime.NIGHT);
            expect(handler).toHaveBeenNthCalledWith(3, DayTime.NOON);
            expect(handler).toHaveBeenNthCalledWith(4, DayTime.SUNSET);
            expect(handler).toHaveBeenCalledTimes(4);
        });

        it("should not emit dayTimeChangedEvent when setting same value twice", () => {
            const handler = jest.fn();
            settings.getDayTimeChangedEvent().register(handler);

            settings.setDayTime(DayTime.SUNSET);
            settings.setDayTime(DayTime.SUNSET);

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith(DayTime.SUNSET);
        });

        it("should allow multiple handlers on dayTimeChangedEvent", () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            settings.getDayTimeChangedEvent().register(handler1);
            settings.getDayTimeChangedEvent().register(handler2);

            settings.setDayTime(DayTime.SUNSET);

            expect(handler1).toHaveBeenCalledWith(DayTime.SUNSET);
            expect(handler2).toHaveBeenCalledWith(DayTime.SUNSET);
        });

        it("should allow removing handler from dayTimeChangedEvent", () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            settings.getDayTimeChangedEvent().register(handler1);
            settings.getDayTimeChangedEvent().register(handler2);
            settings.getDayTimeChangedEvent().remove(handler1);

            settings.setDayTime(DayTime.SUNSET);

            expect(handler1).not.toHaveBeenCalled();
            expect(handler2).toHaveBeenCalledWith(DayTime.SUNSET);
        });
    });

    describe("Settings - getDroneDistanceChangedEvent()", () => {
        it("should emit droneDistanceChangedEvent when setDroneDistance is called with different value", () => {
            const handler = jest.fn();
            settings.getDroneDistanceChangedEvent().register(handler);

            settings.setDroneDistance(10);

            expect(handler).toHaveBeenCalledWith(10);
        });

        it("should emit droneDistanceChangedEvent with correct value for multiple calls", () => {
            const handler = jest.fn();
            settings.getDroneDistanceChangedEvent().register(handler);

            settings.setDroneDistance(5);
            settings.setDroneDistance(10);
            settings.setDroneDistance(20);

            expect(handler).toHaveBeenNthCalledWith(1, 5);
            expect(handler).toHaveBeenNthCalledWith(2, 10);
            expect(handler).toHaveBeenNthCalledWith(3, 20);
            expect(handler).toHaveBeenCalledTimes(3);
        });

        it("should not emit droneDistanceChangedEvent when setting same value twice", () => {
            const handler = jest.fn();
            settings.getDroneDistanceChangedEvent().register(handler);

            settings.setDroneDistance(15);
            settings.setDroneDistance(15);

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith(15);
        });

        it("should allow multiple handlers on droneDistanceChangedEvent", () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            settings.getDroneDistanceChangedEvent().register(handler1);
            settings.getDroneDistanceChangedEvent().register(handler2);

            settings.setDroneDistance(8);

            expect(handler1).toHaveBeenCalledWith(8);
            expect(handler2).toHaveBeenCalledWith(8);
        });

        it("should allow removing handler from droneDistanceChangedEvent", () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            settings.getDroneDistanceChangedEvent().register(handler1);
            settings.getDroneDistanceChangedEvent().register(handler2);
            settings.getDroneDistanceChangedEvent().remove(handler1);

            settings.setDroneDistance(12);

            expect(handler1).not.toHaveBeenCalled();
            expect(handler2).toHaveBeenCalledWith(12);
        });
    });

    describe("Settings - Multiple events integration", () => {
        it("should emit all three events independently", () => {
            const endTimeHandler = jest.fn();
            const dayTimeHandler = jest.fn();
            const distanceHandler = jest.fn();

            settings.getEndTimeChangedEvent().register(endTimeHandler);
            settings.getDayTimeChangedEvent().register(dayTimeHandler);
            settings.getDroneDistanceChangedEvent().register(distanceHandler);

            settings.setEndTime(50);
            settings.setDayTime(DayTime.SUNSET);
            settings.setDroneDistance(7);

            expect(endTimeHandler).toHaveBeenCalledWith(50);
            expect(dayTimeHandler).toHaveBeenCalledWith(DayTime.SUNSET);
            expect(distanceHandler).toHaveBeenCalledWith(7);
        });

        it("should emit events correctly when settings are changed in sequence", () => {
            const endTimeHandler = jest.fn();
            const dayTimeHandler = jest.fn();

            settings.getEndTimeChangedEvent().register(endTimeHandler);
            settings.getDayTimeChangedEvent().register(dayTimeHandler);

            settings.setEndTime(30);
            settings.setDayTime(DayTime.SUNSET);
            settings.setEndTime(45);
            settings.setDayTime(DayTime.NIGHT);

            expect(endTimeHandler).toHaveBeenNthCalledWith(1, 30);
            expect(endTimeHandler).toHaveBeenNthCalledWith(2, 45);
            expect(dayTimeHandler).toHaveBeenNthCalledWith(1, DayTime.SUNSET);
            expect(dayTimeHandler).toHaveBeenNthCalledWith(2, DayTime.NIGHT);
        });
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
