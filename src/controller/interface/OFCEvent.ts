// Kommentare von KI verfasst
/**
 * Beobachter-Funktionstyp für die Event-Handhabung.
 * @template T - Der Typ des Wertes, der an den Beobachter übergeben wird
 */
export type OFCObserver<T> = (value: T) => void;

export type OFCBatchUpdater<T> = (values: T[], newValue: T) => void;

export type OFCBatchPostProcessor<T> = (values: T[]) => T[];

/**
 * Event-Emitter-Klasse, die das Observer-Muster implementiert.
 * Ermöglicht das Registrieren von Handlern, die benachrichtigt werden, wenn Ereignisse auftreten.
 * @template T - Der Typ des vom Ereignis ausgegebenen Wertes
 */
export class OFCEvent<T> {
    private observers: OFCObserver<T>[] = [];
    private batchUpdater: OFCBatchUpdater<T> | undefined = undefined;
    private batchValues: T[] = [];

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
        if (this.batchUpdater) {
            this.batchUpdater(this.batchValues, value);
            return;
        }
        this.notifyObservers(value);
    }

    /**
     * Startet die Stapelverarbeitung von Ereignissen.
     */
    startBatching(batchUpdater: OFCBatchUpdater<T>): void {
        this.batchUpdater = batchUpdater;
        this.batchValues = [];
    }

    /**
     * Beendet die Stapelverarbeitung von Ereignissen und benachrichtigt alle Beobachter mit dem Stapel.
     */
    endBatching(postProcessor?: OFCBatchPostProcessor<T>) {
        this.batchUpdater = undefined;
        const values = postProcessor ? postProcessor(this.batchValues) : this.batchValues;
        for (const value of values) {
            this.notifyObservers(value);
        }
    }

    private notifyObservers(value: T): void {
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