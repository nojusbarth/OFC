import {
    DroneData,
    checkCollisionsSerialized,
} from "./CollisionHandler";

export interface CollisionWorkerRequest {
    requestId: number;
    drone: DroneData;
    otherDrones: DroneData[];
    collisionRadius: number;
}

export interface CollisionWorkerResponse {
    requestId: number;
    collisions: Array<[number, number]>;
}

const workerScope = globalThis as {
    postMessage: (message: CollisionWorkerResponse) => void;
    onmessage: ((event: MessageEvent<CollisionWorkerRequest>) => void) | null;
};

if (typeof workerScope.postMessage !== "function") {
    throw new Error("This script is meant to be run as a Web Worker.");
}
workerScope.onmessage = (event: MessageEvent<CollisionWorkerRequest>) => {
    const { requestId, drone, otherDrones, collisionRadius } = event.data;
    const collisions = checkCollisionsSerialized(drone, otherDrones, collisionRadius);
    const response: CollisionWorkerResponse = { requestId, collisions };
    workerScope.postMessage(response);
};
