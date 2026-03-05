import { IDrone } from "../../repository/entity/IDrone";
import { checkCollisionsSerialized } from "./CollisionHandler";
import type { DroneData } from "./CollisionHandler";

interface CollisionWorkerRequest {
    requestId: number;
    drone: DroneData;
    otherDrones: DroneData[];
    collisionRadius: number;
}

interface CollisionWorkerResponse {
    requestId: number;
    collisions: Array<[number, number]>;
}

function serializeDrone(drone: IDrone): DroneData {
    return {
        id: drone.getId(),
        positionKeyFrames: drone.getPositionKeyFrames().map((keyFrame) => ({
            position: keyFrame.getPos(),
            time: keyFrame.getTime(),
        })),
    };
}

let collisionWorker: Worker | null | undefined;

let nextRequestId = 1;
const pendingRequests = new Map<number, {
    resolve: (value: Map<number, number>) => void;
    reject: (reason?: unknown) => void;
}>();

function canUseWorker(): boolean {
    return typeof window !== "undefined" && typeof Worker !== "undefined";
}

function bindWorker(worker: Worker): Worker {
    worker.onmessage = (event: MessageEvent<CollisionWorkerResponse>) => {
        const { requestId, collisions } = event.data;
        const pendingRequest = pendingRequests.get(requestId);
        if (!pendingRequest) {
            return;
        }
        pendingRequests.delete(requestId);
        pendingRequest.resolve(new Map(collisions));
    };

    worker.onerror = (error) => {
        for (const pendingRequest of pendingRequests.values()) {
            pendingRequest.reject(error);
        }
        pendingRequests.clear();
    };

    return worker;
}

async function getCollisionWorker(): Promise<Worker | null> {
    if (collisionWorker !== undefined) {
        return collisionWorker;
    }

    if (!canUseWorker()) {
        collisionWorker = null;
        return collisionWorker;
    }

    try {
        collisionWorker = bindWorker(new Worker(new URL("./CollisionHandler.worker.ts", window.location.href), { type: "module" }));
    } catch {
        collisionWorker = null;
    }
    return collisionWorker;
}



export function checkCollisions(drone: IDrone, otherDrones: IDrone[], collisionRadius: number): Promise<Map<number, number>> {
    const serializedDrone = serializeDrone(drone);
    const serializedOtherDrones = otherDrones.map(serializeDrone);

    return getCollisionWorker().then((worker) => {
        if (!worker) {
            return new Map(checkCollisionsSerialized(serializedDrone, serializedOtherDrones, collisionRadius));
        }

        const requestId = nextRequestId++;
        const message: CollisionWorkerRequest = {
            requestId,
            drone: serializedDrone,
            otherDrones: serializedOtherDrones,
            collisionRadius,
        };

        return new Promise<Map<number, number>>((resolve, reject) => {
            pendingRequests.set(requestId, { resolve, reject });
            worker.postMessage(message);
        });
    });
}