import type { DayTime } from "../../repository/entity/DayTime"
import { OFCEvent } from "./OFCEvent"
// Kommentare von KI verfasst
/**
 * Schnittstelle zur Verwaltung von Anwendungseinstellungen.
 * Verwaltet Animationsdauer, Lichtverhältnisse und Parameter der Kollisionserkennung.
 */
export interface ISettings {
    /**
     * Setzt die Endzeit der Animation.
     * @param time - Die Endzeit in Sekunden
     */
    setEndTime(time: number): void

    /**
     * Ruft die aktuelle Endzeit der Animation ab.
     * @returns Die Endzeit in Sekunden
     */
    getEndTime(): number

    /**
     * Ruft den Event-Emitter für Endzeit-Änderungen ab.
     * @returns Event-Emitter für Endzeit-Updates
     */
    getEndTimeChangedEvent(): OFCEvent<number>

    /**
     * Setzt die Tageszeit für die Beleuchtung.
     * @param time - Die Tageszeit-Einstellung
     */
    setDayTime(time: DayTime): void

    /**
     * Ruft die aktuelle Tageszeit-Einstellung ab.
     * @returns Die aktuelle Tageszeit
     */
    getDayTime(): DayTime

    /**
     * Ruft den Event-Emitter für Tageszeit-Änderungen ab.
     * @returns Event-Emitter für Tageszeit-Updates
     */
    getDayTimeChangedEvent(): OFCEvent<DayTime>

    /**
     * Setzt den Kollisionsradius für die Kollisionserkennung.
     * @param radius - Der Kollisionsradius
     */
    setCollisionRadius(radius: number): void

    /**
     * Ruft den aktuellen Drohnen-Kollisionsradius ab.
     * @returns Der Kollisionsradius
     */
    getCollisionRadius(): number

    /**
     * Ruft den Event-Emitter für Kollisionsradius-Änderungen ab.
     * @returns Event-Emitter für Radius-Updates
     */
    getCollisionRadiusChangedEvent(): OFCEvent<number>
}

