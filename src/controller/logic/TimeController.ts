import { ISettings } from "../interface/ISettings";
import type { ITimeController } from "../interface/ITimeController";
import { OFCEvent } from "../interface/OFCEvent";

/**
 * Implementiert ITimeController
 */
export class TimeController implements ITimeController {
    settings: ISettings;

    time: number = 0;
    speed: number = 1;

    animationRunning: boolean = false;
    lastTimestamp: number = 0;

    animationRunningEvent: OFCEvent<boolean> = new OFCEvent();
    timeChangedEvent: OFCEvent<number> = new OFCEvent();
    animationSpeedChangedEvent: OFCEvent<number> = new OFCEvent();

    constructor(settings: ISettings) {
        this.settings = settings;
    }

    setTime(t: number): void {
        if (t < 0) {
            t = 0;
        }
        if (t >= this.settings.getEndTime()) {
            t = this.settings.getEndTime();
            this.stopAnimation();
        }
        if (this.time !== t) {
            this.time = t;
            this.timeChangedEvent.notify(t);
        }
    }

    getTime(): number {
        return this.time;
    }

    private animate(): void {
        if (!this.animationRunning) {
            return;
        }
        requestAnimationFrame((timestamp) => {
            const delta = (timestamp - this.lastTimestamp) / 1000 * this.speed;
            this.lastTimestamp = timestamp;
            this.setTime(this.time + delta);
            this.animate();
        })
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
        if (this.animationRunning) {
            return;
        }
        this.animationRunning = true;
        this.animationRunningEvent.notify(true);
        this.lastTimestamp = performance.now();
        this.animate();
    }

    stopAnimation(): void {
        if (!this.animationRunning) {
            return;
        }
        this.animationRunning = false;
        this.animationRunningEvent.notify(false);
    }

    getAnimationRunning(): boolean {
        return this.animationRunning;
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