import { DayTime } from "../../repository/entity/DayTime";
import { OFCEvent } from "../interface/OFCEvent";
import type { ISettings } from "../interface/ISettings";
import { IProjectRepository } from "../../repository/IProjectRepository";


/**
 * Implementiert ISettings
 */
export class Settings implements ISettings {
    private repository: IProjectRepository;

    private endTimeChangedEvent: OFCEvent<number> = new OFCEvent();
    private dayTimeChangedEvent: OFCEvent<DayTime> = new OFCEvent();
    private collisionRadiusChangedEvent: OFCEvent<number> = new OFCEvent();

    constructor(repository: IProjectRepository) {
        this.repository = repository;
    }

    setEndTime(time: number): void {
        if (this.getEndTime() !== time) {
            this.repository.setMaxTime(time);
            this.endTimeChangedEvent.notify(time);
        }
    }
    getEndTime(): number {
        return this.repository.getMaxTime();
    }
    getEndTimeChangedEvent(): OFCEvent<number> {
        return this.endTimeChangedEvent;
    }

    setDayTime(time: DayTime): void {
        if (this.getDayTime() !== time) {
            this.repository.setDayTime(time);
            this.dayTimeChangedEvent.notify(time);
        }
    }
    getDayTime(): DayTime {
        return this.repository.getDayTime();
    }
    getDayTimeChangedEvent(): OFCEvent<DayTime> {
        return this.dayTimeChangedEvent;
    }

    setCollisionRadius(radius: number): void {
        if (this.getCollisionRadius() !== radius) {
            this.repository.setCollisionRadius(radius);
            this.collisionRadiusChangedEvent.notify(radius);
        }
    }
    getCollisionRadius(): number {
        return this.repository.getCollisionRadius();
    }
    getCollisionRadiusChangedEvent(): OFCEvent<number> {
        return this.collisionRadiusChangedEvent;
    }
}
