import { IDrone } from "../../repository/entity/IDrone";

/**
 * Prüft Kollisionen einer Drohnen mit den anderen Drohnen.
 * @param drone die Drohne für deren Pfad Kollisionen geprüft werden sollen.
 * @param otherDrones die gesamt Menge der Drohnen
 * @param collisionRadius der Radius einer Drohne (2 * collisionRadius ist der Mindestabstand um keine Kollision zu haben)
 * @returns Eine Map der Drohnen Ids zur Zeit der Kollision mit der gegebenen Drohne. Es werden nur die Drohnen zurückgegeben, mit denen eine Kollision stattfindet.
 */
export interface Vec3 {
    x: number;
    y: number;
    z: number;
}

export interface PositionKeyFrameData {
    position: Vec3;
    time: number;
}

export interface DroneData {
    id: number;
    positionKeyFrames: PositionKeyFrameData[];
}

/**
 * Prüft Kollisionen auf serialisierbaren Daten und kann direkt in einem WebWorker verwendet werden.
 * @param drone die Drohne für deren Pfad Kollisionen geprüft werden sollen.
 * @param otherDrones die gesamt Menge der Drohnen
 * @param collisionRadius der Radius einer Drohne (2 * collisionRadius ist der Mindestabstand um keine Kollision zu haben)
 * @returns Eine Liste aus [DrohnenId, Kollisionszeit].
 */
export function checkCollisionsSerialized(drone: DroneData, otherDrones: DroneData[], collisionRadius: number): Array<[number, number]> {
    const collisionAtlas: Array<[number, number]> = [];
    for (const otherDrone of otherDrones) {
        if (otherDrone.id === drone.id) {
            continue;
        }
        const collisionTime = checkDroneCollision(drone, otherDrone, collisionRadius);
        if (collisionTime >= 0) {
            collisionAtlas.push([otherDrone.id, collisionTime]);
        }
    }
    return collisionAtlas;
}

function vector(vector: { x: number; y: number; z: number }): Vec3 {
    return {
        x: vector.x,
        y: vector.y,
        z: vector.z,
    };
}

function checkDroneCollision(droneA: DroneData, droneB: DroneData, collisionRadius: number): number {
    const keyFramesA = sortedKeyFrames(droneA.positionKeyFrames);
    const keyFramesB = sortedKeyFrames(droneB.positionKeyFrames);

    const endTime = Math.max(getEndTime(keyFramesA), getEndTime(keyFramesB));
    const fullKeyFramesA = withBoundaryKeyFrames(keyFramesA, endTime);
    const fullKeyFramesB = withBoundaryKeyFrames(keyFramesB, endTime);

    let i = 0;
    let j = 0;

    while (i < fullKeyFramesA.length - 1 && j < fullKeyFramesB.length - 1) {
        const keyA0 = fullKeyFramesA[i];
        const keyA1 = fullKeyFramesA[i + 1];
        const keyB0 = fullKeyFramesB[j];
        const keyB1 = fullKeyFramesB[j + 1];

        const tClosest = computeClosestApproach(keyA0, keyA1, keyB0, keyB1);
        const posA = getPositionAtTime(fullKeyFramesA, tClosest);
        const posB = getPositionAtTime(fullKeyFramesB, tClosest);
        const distanceSq = distanceSquared(posA, posB);
        if (distanceSq <= 4 * collisionRadius * collisionRadius) {
            return tClosest;
        }

        if (keyA1.time < keyB1.time) {
            i++;
            if (i >= fullKeyFramesA.length - 1) {
                i--;
                j++;
            }
        } else {
            j++;
            if (j >= fullKeyFramesB.length - 1) {
                j--;
                i++;
            }
        }
    }
    return -1;
}

function withBoundaryKeyFrames(keyFrames: PositionKeyFrameData[], endTime: number): PositionKeyFrameData[] {
    return [
        {
            position: getPositionAtTime(keyFrames, 0),
            time: 0,
        },
        ...keyFrames,
        {
            position: getPositionAtTime(keyFrames, endTime),
            time: endTime,
        },
    ];
}

function getEndTime(keyFrames: PositionKeyFrameData[]): number {
    return keyFrames.at(-1)?.time ?? 0;
}

function sortedKeyFrames(keyFrames: PositionKeyFrameData[]): PositionKeyFrameData[] {
    return [...keyFrames].sort((a, b) => a.time - b.time);
}

function getPositionAtTime(keyFrames: PositionKeyFrameData[], t: number): Vec3 {
    if (keyFrames.length === 0) {
        return { x: 0, y: 0, z: 0 };
    }
    if (keyFrames[0].time >= t) {
        return vector(keyFrames[0].position);
    }
    for (let i = 1; i < keyFrames.length; i++) {
        if (keyFrames[i].time >= t) {
            const key0 = keyFrames[i - 1];
            const key1 = keyFrames[i];
            const interpolationFactor = (t - key0.time) / (key1.time - key0.time);
            return lerpPosition(key0.position, key1.position, interpolationFactor);
        }
    }
    return vector(keyFrames[keyFrames.length - 1].position);
}

function lerpPosition(from: Vec3, to: Vec3, alpha: number): Vec3 {
    return {
        x: from.x + (to.x - from.x) * alpha,
        y: from.y + (to.y - from.y) * alpha,
        z: from.z + (to.z - from.z) * alpha,
    };
}

function subtract(a: Vec3, b: Vec3): Vec3 {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
        z: a.z - b.z,
    };
}

function multiply(position: Vec3, scalar: number): Vec3 {
    return {
        x: position.x * scalar,
        y: position.y * scalar,
        z: position.z * scalar,
    };
}

function dot(a: Vec3, b: Vec3): number {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

function lengthSquared(position: Vec3): number {
    return dot(position, position);
}

function distanceSquared(a: Vec3, b: Vec3): number {
    return lengthSquared(subtract(a, b));
}

function velocity(from: PositionKeyFrameData, to: PositionKeyFrameData): Vec3 {
    if (to.time === from.time) {
        return { x: 0, y: 0, z: 0 };
    }
    return multiply(subtract(to.position, from.position), 1 / (to.time - from.time));
}

function computeClosestApproach(p0: PositionKeyFrameData, p1: PositionKeyFrameData, q0: PositionKeyFrameData, q1: PositionKeyFrameData): number {
    const v0 = velocity(p0, p1);
    const v1 = velocity(q0, q1);

    // base vectors
    const b0 = p0.position;
    // move b1 back so both start at the same time
    const b1 = subtract(q0.position, multiply(v1, q0.time - p0.time));
    // points moving along the lines:
    // b0 + v0 * t
    // b1 + v1 * t
    // (b1 - b0) + (v1 - v0) * t  => find minimizing t, distance to 0 is now the closest approach
    const dv = subtract(v1, v0);
    const db = subtract(b1, b0);
    if (lengthSquared(dv) === 0) {
        return Math.max(p0.time, q0.time);
    }
    // minimize |db + dv * t|^2
    // (db0 + dv0 * t)^2 + (db1 + dv1 * t)^2 + (db2 + dv2 * t)^2
    // = (dv0^2 + dv1^2 + dv2^2) * t^2 + 2 * (db0*dv0 + db1*dv1 + db2*dv2) * t + (db0^2 + db1^2 + db2^2)
    // derivative:
    // 2 * (dv0^2 + dv1^2 + dv2^2) * t + 2 * (db0*dv0 + db1*dv1 + db2*dv2) = 0
    // t = - (db0*dv0 + db1*dv1 + db2*dv2) / (dv0^2 + dv1^2 + dv2^2)
    const t = -dot(db, dv) / lengthSquared(dv);
    return Math.max(p0.time, q0.time, Math.min(p1.time, q1.time, t + p0.time));
}