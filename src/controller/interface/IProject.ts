import { Result } from "../../repository/Result"
import { OFCEvent } from "./OFCEvent"
// Kommentare von KI verfasst
/**
 * Schnittstelle für Projektverwaltungsvorgänge.
 * Verwaltet Projektpersistierung und Import-/Export-Funktionalität.
 */
export interface IProject {

    /**
     * Exportiert Wegpunktdaten für alle Drohnen.
     */
    exportWayPointData(): void

    /**
     * Speichert den aktuellen Projektzustand.
     */
    saveProject(): void

    /**
     * Erstellt ein neues, leeres Projekt.
     */
    newProject(): void

    /**
     * Lädt ein Projekt aus serialisierten Daten.
     * @param data - Serialisierter Projektdaten-String
     * @throws wenn die Daten ungültig sind
     */
    loadProject(file: File, onCompleted: (result: Result<null>) => void): void

    /**
     * Lädt das zuletzt gespeicherte Projekt aus dem lokalen Speicher.
     */
    loadLastProject(): Result<boolean>;

    /**
     * Prüft, ob ein zuletzt gespeichertes Projekt im lokalen Speicher vorhanden ist.
     * @returns true, wenn ein letztes Projekt geladen werden kann, sonst false
     */
    canLoadLastProject(): boolean

    /**
     * Ereignis, das ausgelöst wird, wenn ein Projekt erfolgreich geladen wurde.
     * @returns Das Projekt geladen Ereignis
     */
    getProjectLoadedEvent(): OFCEvent<void>;

        /**
     * Startet die Aufzeichnung der Animation.
     */
    startRecording(): void

    /**
     * Stoppt die Aufzeichnung der Animation.
     */
    stopRecording(): void

    /**
     * Prüft, ob die Animation aktuell aufgezeichnet wird.
     * @returns true, wenn die Animation aufgezeichnet wird, sonst false
     */
    getRecordingRunning(): boolean
    
    /**
     * Ruft den Event-Emitter für Aufzeichnungszustand-Änderungen ab.
     * @returns Event-Emitter für Aufzeichnungszustand (true = aufzeichnen, false = nicht aufzeichnen)
     */
    getRecordingRunningEvent(): OFCEvent<boolean>
}