/**
 * Schnittstelle für Projektverwaltungsvorgänge.
 * Verwaltet Projektpersistierung und Import-/Export-Funktionalität.
 */
export interface IProject {
    /**
     * Exportiert die aktuelle Animation als Videodatei.
     */
    exportVideo(): void
    
    /**
     * Exportiert Wegpunktdaten für alle Drohnen.
     */
    exportWayPointData(): void
    
    /**
     * Speichert den aktuellen Projektzustand.
     */
    saveProject(): void
    
    /**
     * Lädt ein Projekt aus serialisierten Daten.
     * @param data - Serialisierter Projektdaten-String
     */
    loadProject(data: string): void
}