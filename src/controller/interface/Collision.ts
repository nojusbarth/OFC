export class Collision {
    drone: number;
    colliders: Map<number, number>;

    constructor(drone: number, colliders: Map<number, number>) {
        this.drone = drone;
        this.colliders = colliders;
    }
}
