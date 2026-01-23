import { OFCEvent } from "./OFCEvent"

export interface ITimeController {
    setTime(t: number): void
    getTime(): number
    setAnimationSpeed(speed: number): void
    getAnimationSpeed(): number
    startAnimation(): void
    stopAnimation(): void

    getAnimationRunningEvent(): OFCEvent<boolean>
    getTimeChangedEvent(): OFCEvent<number>
    getAnimationSpeedChangedEvent(): OFCEvent<number>
}