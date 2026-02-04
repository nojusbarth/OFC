export class Result<T> {
    private result: T
    private error: Error|undefined

    constructor(data: T, error: Error|undefined = undefined) {
        this.result = data
        this.error = error
    }

    getResult(): T {
        return this.result
    }

    isSuccess(): boolean {
        return !this.error
    }

    getError(): Error|undefined {
        return this.error
    }
}