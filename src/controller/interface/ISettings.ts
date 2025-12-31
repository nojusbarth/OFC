import type { DayTime } from "./DayTime"
import { OFCEvent } from "./OFCEvent"

export interface ISettings {
    setEndTime(time: number): void
    getEndTime(): number
    getEndTimeChangedEvent(): OFCEvent<number>

    setDayTime(time: DayTime): void
    getDayTime(): DayTime
    getDayTimeChangedEvent(): OFCEvent<DayTime>

    setDroneDistance(distance: number): void
    getDroneDistance(): number
    getDroneDistanceChangedEvent(): OFCEvent<number>
}

