/**
 * Wrapped ein Ergebnis mit einer möglichen Fehlermeldung
 */
export class Result<T> {
    private result: T
    private error: Error|undefined

    /**
     * Konstruiert ein Ergebnis mit den übergebenen Paramtern.
     * @param result das Ergebnis `T`
     * @param error Eine `Error`, falls ein Fehler auftritt. Ansonsten `undefined`.
     */
    constructor(result: T, error: Error|undefined = undefined) {
        this.result = result
        this.error = error
    }

    /**
     * Gibt das Ergebnis zurück. Bei Fehlermeldung wird irgendetwas übergeben.
     * @return Das übergebene Ergebnis `T`
     */
    getResult(): T {
        return this.result
    }

    /**
     * Untersucht, ob eine Fehlermeldung geworfen wurde.
     * @return `true`, wenn keine Fehlermeldung geworden wurde, ansonsten `false`
     */
    isSuccess(): boolean {
        return !this.error
    }

    /**
     * Gibt den Fehler zurück.
     * @return `Error`, falls ein Fehler auftritt, ansonsten `undefined`.
     */
    getError(): Error|undefined {
        return this.error
    }
}