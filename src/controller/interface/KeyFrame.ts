

export class KeyFrame<T> {
    value: T
    time: number

    constructor (value: T, time: number) {
        this.value = value;
        this.time = time;
    }
    getValue(): T {
        return this.value;
    }
    getTime(): number {
        return this.time;
    }
}