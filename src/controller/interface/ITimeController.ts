import { OFCEvent } from "./OFCEvent"

/**
 * Schnittstelle zur Steuerung der Animationswiedergabe und Zeitleiste.
 * Verwaltet aktuelle Zeit, Wiedergabgeschwindigkeit und Animationszustand.
 */
export interface ITimeController {
    /**
     * Setzt die aktuelle Zeit in der Animation.
     * @param t - Die einzustellende Zeit in Sekunden
     */
    setTime(t: number): void
    
    /**
     * Ruft die aktuelle Animationszeit ab.
     * @returns Die aktuelle Zeit in Sekunden
     */
    getTime(): number
    
    /**
     * Setzt die Wiedergabgeschwindigkeit der Animation.
     * @param speed - Der Wiedergabgeschwindigkeit-Multiplikator (z.B. 1,0 = normal, 2,0 = doppelte Geschwindigkeit)
     */
    setAnimationSpeed(speed: number): void
    
    /**
     * Ruft die aktuelle Animationswiedergabgeschwindigkeit ab.
     * @returns Der Wiedergabgeschwindigkeit-Multiplikator
     */
    getAnimationSpeed(): number
    
    /**
     * Startet die Animationswiedergabe.
     */
    startAnimation(): void
    
    /**
     * Stoppt die Animationswiedergabe.
     */
    stopAnimation(): void

    /**
     * Ruft den Event-Emitter für Animationslaufzustand-Änderungen ab.
     * @returns Event-Emitter für Wiedergabezustand (true = läuft, false = gestoppt)
     */
    getAnimationRunningEvent(): OFCEvent<boolean>
    
    /**
     * Ruft den Event-Emitter für Zeitänderungen ab, der die neue Zeit bereitstellt.
     * @returns Event-Emitter für aktuelle Zeit-Updates
     */
    getTimeChangedEvent(): OFCEvent<number>
    
    /**
     * Ruft den Event-Emitter für Animationsgeschwindigkeit-Änderungen ab.
     * @returns Event-Emitter für Wiedergabgeschwindigkeit-Updates
     */
    getAnimationSpeedChangedEvent(): OFCEvent<number>
}