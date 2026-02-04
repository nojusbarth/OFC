import { DayTime } from "../../repository/entity/DayTime";
import { OFCEvent } from "../interface/OFCEvent";
import type { ISettings } from "../interface/ISettings";
import { IProjectRepository } from "../../repository/IProjectRepository";

export class Settings implements ISettings {
    private repository: IProjectRepository;

    private endTimeChangedEvent: OFCEvent<number> = new OFCEvent();
    private dayTimeChangedEvent: OFCEvent<DayTime> = new OFCEvent();
    private droneDistanceChangedEvent: OFCEvent<number> = new OFCEvent();

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

    setCollisionDistance(distance: number): void {
        if (this.getCollisionDistance() !== distance) {
            this.repository.setCollisionRadius(distance);
            this.droneDistanceChangedEvent.notify(distance);
        }
    }
    getCollisionDistance(): number {
        return this.repository.getCollisionRadius();
    }
    getCollisionDistanceChangedEvent(): OFCEvent<number> {
        return this.droneDistanceChangedEvent;
    }
}
