import type { ITimeController } from "../interface/ITimeController";
import { OFCEvent } from "../interface/OFCEvent";

export class TimeController implements ITimeController {
    time: number = 0;
    speed: number = 1;
    animationRunningEvent: OFCEvent<boolean> = new OFCEvent();
    timeChangedEvent: OFCEvent<number> = new OFCEvent();
    animationSpeedChangedEvent: OFCEvent<number> = new OFCEvent();


    setTime(t: number): void {
        if (this.time !== t) {
            this.time = t;
            this.timeChangedEvent.notify(t);
        }
    }

    getTime(): number {
        return this.time;
    }

    setAnimationSpeed(speed: number): void {
        if (this.speed !== speed) {
            this.speed = speed;
            this.animationSpeedChangedEvent.notify(speed);
        }
    }

    getAnimationSpeed(): number {
        return this.speed;
    }

    startAnimation(): void {
        // TODO: Animation implementation
        requestAnimationFrame(() => {});
        this.animationRunningEvent.notify(true);
    }

    stopAnimation(): void {
        this.animationRunningEvent.notify(false);
    }

    getAnimationRunningEvent(): OFCEvent<boolean> {
        return this.animationRunningEvent;
    }

    getTimeChangedEvent(): OFCEvent<number> {
        return this.timeChangedEvent
    }

    getAnimationSpeedChangedEvent(): OFCEvent<number> {
        return this.animationSpeedChangedEvent;
    }

}