// Kommentare von KI verfasst
/**
 * Beobachter-Funktionstyp für die Event-Handhabung.
 * @template T - Der Typ des Wertes, der an den Beobachter übergeben wird
 */
export type OFCObserver<T> = (value: T) => void;

/**
 * Event-Emitter-Klasse, die das Observer-Muster implementiert.
 * Ermöglicht das Registrieren von Handlern, die benachrichtigt werden, wenn Ereignisse auftreten.
 * @template T - Der Typ des vom Ereignis ausgegebenen Wertes
 */
export class OFCEvent<T> {
    private observers: OFCObserver<T>[] = [];

    /**
     * Registriert einen Beobachter, um über Ereignisse benachrichtigt zu werden.
     * @param handler - Die zu registrierende Beobachter-Funktion
     */
    register(handler: OFCObserver<T>): void {
        this.observers.push(handler);
    }

    /**
     * Benachrichtigt alle registrierten Beobachter mit einem Wert.
     * @param value - Der an alle Beobachter zu übergebende Wert
     */
    notify(value: T): void {
        for (const observer of this.observers) {
            observer(value);
        }
    }

    /**
     * Entfernt einen Beobachter aus der Benachrichtigungsliste.
     * WICHTIG: Es muss die exakt gleiche Funktionsreferenz angegeben werden.
     * @param handler - Die zu entfernende Beobachter-Funktion
     */
    remove(handler: OFCObserver<T>): void {
        this.observers = this.observers.filter(e => e !== handler);
    }
}