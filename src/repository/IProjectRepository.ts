import {IDrone} from "./entity/IDrone";
import {DayTime} from "./entity/DayTime";
import {Result} from "./Result";

/**
 * Das ProjectRepository verwaltet den gesamten Zustand des aktuellen Projekts.
 * Sie fungiert als "Single Source of Truth" für die Drohnen-Daten und Projekt-Einstellungen
 * und kümmert sich um Import (Laden) und Export (Speichern) der Daten.
 */
export interface IProjectRepository {

    /**
     * Lädt Projektdaten oder setzt das Projekt zurück.
     * @param input - Die Eingabequelle:
     * - `null`: Setzt das Projekt komplett zurück (Neues Projekt).
     * - `File`: Liest eine Datei ein und parst den Inhalt.
     * - `string`: Ein JSON-String.
     * @param onFinished gibt das Ergebnis als `Result<boolean>` zurück, sobald das Projekt geladen wurde oder ein Fehler auftritt.
     * @throws Error Bei einem Fehler beim Einlesen der Eingabe.
     */
    load(input: File|string|null, onFinished: (result: Result<boolean>) => void): void

    /**
     * Versucht, das zuletzt bearbeitete Projekt aus dem LocalStorage des Browsers wiederherzustellen.
     * @returns Result `true`, wenn Daten gefunden und geladen wurden, sonst `false` und gibt eine Fehlermeldung.
     */
    loadLastProject(): Result<boolean>

    /**
     * Speichert die Projektkonfiguration ins LocalStorage des Browsers.
     */
    saveToLocalStorage(): void

    /**
     * Ermittelt die nächste verfügbare ID für eine neue Drohne.
     * Sucht die aktuell höchste ID und addiert 1.
     * @returns Die nächste freie ID (Integer).
     */
    getNextDroneId(): number

    /**
     * Gibt eine Liste aller Drohnen des Projekts zurück.
     * @returns Alle Drohnen.
     */
    getAllDrones(): Array<IDrone>

    /**
     * Sucht eine Drohne anhand ihrer ID.
     * @param id Die ID der gesuchten Drohne.
     * @returns Die Drohne oder `undefined`, wenn nicht gefunden.
     */
    getDroneById(id: number): IDrone|undefined

    /**
     * Fügt eine neue Drohne zur Liste hinzu.
     * @param drone Das hinzuzufügende Drohnen-Objekt.
     */
    addDrone(drone: IDrone): void

    /**
     * Überschreibt die Drohne mit derselben id.
     * Falls die Drohne nicht existiert, wird die Drone einfach hinzugefügt.
     * @param drone Die aktualisierte Drohnen-Instanz.
     */
    updateDrone(drone: IDrone): void

    /**
     * Entfernt eine Drohne aus dem Repository.
     * @param id - ID der zu löschenden Drohne.
     */
    removeDrone(id: number): void

    /**
     * Gibt den globalen Kollisionsradius zurück.
     */
    getCollisionRadius(): number

    /**
     * Setzt den globalen Kollisionsradius für die Simulation.
     * @param radius - Der Radius
     */
    setCollisionRadius(radius: number): void

    /**
     * Die Tageszeit der Simulation.
     */
    getDayTime(): DayTime

    /**
     * Setzt die Tageszeit für die Simulation.
     * @param dayTime die Tageszeit
     */
    setDayTime(dayTime: DayTime): void

    /**
     * Gibt die maximale Simulationsdauer zurück.
     */
    getMaxTime(): number

    /**
     * Setzt die maximale Laufzeit der Simulation.
     * @param max der Zeitwert.
     */
    setMaxTime(max: number): void

    /**
     * Exportiert die Drohnen als Waypoint-at-Time-Format.
     * @returns JSON-String im Waypoint-at-Time-Format Format.
     */
    export(): string

    /**
     * Exportiert die vollständige Projektkonfiguration.
     * Beinhaltet Version, Einstellungen (Zeit, Radius) und alle Drohnen.
     * Geeignet zum Speichern in Dateien (.json).
     * @returns Kompletter JSON-String des Projekts.
     */
    exportConfig(): string
}