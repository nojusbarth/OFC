
export type OFCObserver<T> = (value: T) => void;

export class OFCEvent<T> {
    private observers: OFCObserver<T>[] = [];
    
    register(handler: OFCObserver<T>): void {
        this.observers.push(handler);
    }

    notify(value: T): void {
        for (const observer of this.observers) {
            observer(value);
        }
    }

    remove(handler: OFCObserver<T>): void {
        this.observers = this.observers.filter(e => e !== handler);
    }
}