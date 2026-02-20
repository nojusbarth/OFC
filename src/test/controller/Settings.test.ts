import { ISettings } from "../../controller/interface/ISettings";
import { DayTime } from "../../repository/entity/DayTime";
import { makeBasicController } from "./testHelper";
// Tests von KI generiert
describe("Subcontroller Event Emission Tests", () => {
    let settings: ISettings;

    beforeEach(() => {
        const [controller] = makeBasicController();
        settings = controller.getSettings();
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

    describe("Settings - getCollisionRadiusChangedEvent()", () => {
        it("should emit collisionRadiusChangedEvent when setCollisionRadius is called with different value", () => {
            const handler = jest.fn();
            settings.getCollisionRadiusChangedEvent().register(handler);

            settings.setCollisionRadius(10);

            expect(handler).toHaveBeenCalledWith(10);
        });

        it("should emit collisionRadiusChangedEvent with correct value for multiple calls", () => {
            const handler = jest.fn();
            settings.getCollisionRadiusChangedEvent().register(handler);

            settings.setCollisionRadius(5);
            settings.setCollisionRadius(10);
            settings.setCollisionRadius(20);

            expect(handler).toHaveBeenNthCalledWith(1, 5);
            expect(handler).toHaveBeenNthCalledWith(2, 10);
            expect(handler).toHaveBeenNthCalledWith(3, 20);
            expect(handler).toHaveBeenCalledTimes(3);
        });

        it("should not emit collisionRadiusChangedEvent when setting same value twice", () => {
            const handler = jest.fn();
            settings.getCollisionRadiusChangedEvent().register(handler);

            settings.setCollisionRadius(15);
            settings.setCollisionRadius(15);

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith(15);
        });

        it("should allow multiple handlers on collisionRadiusChangedEvent", () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            settings.getCollisionRadiusChangedEvent().register(handler1);
            settings.getCollisionRadiusChangedEvent().register(handler2);

            settings.setCollisionRadius(8);

            expect(handler1).toHaveBeenCalledWith(8);
            expect(handler2).toHaveBeenCalledWith(8);
        });

        it("should allow removing handler from collisionRadiusChangedEvent", () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            settings.getCollisionRadiusChangedEvent().register(handler1);
            settings.getCollisionRadiusChangedEvent().register(handler2);
            settings.getCollisionRadiusChangedEvent().remove(handler1);

            settings.setCollisionRadius(12);

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
            settings.getCollisionRadiusChangedEvent().register(distanceHandler);

            settings.setEndTime(50);
            settings.setDayTime(DayTime.SUNSET);
            settings.setCollisionRadius(7);

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
});
