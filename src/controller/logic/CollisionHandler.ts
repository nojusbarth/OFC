import { Vector3 } from "three";
import { PositionKeyFrame } from "../interface/PositionKeyFrame";
import { Drone } from "./Drone";
import { Collision } from "../interface/Collision";

export function checkCollisions(drone: Drone, otherDrones: Drone[], collisionRadius: number): Collision {
    const collisionAtlas = new Map<number, number>();
    for (const otherDrone of otherDrones) {
        if (otherDrone.getId() === drone.getId()) {
            continue;
        }
        const collisionTime = checkDroneCollision(drone, otherDrone, collisionRadius);
        if (collisionTime >= 0) {
            collisionAtlas.set(otherDrone.getId(), collisionTime);
        }
    }
    return new Collision(drone.getId(), collisionAtlas);
}

function checkDroneCollision(droneA: Drone, droneB: Drone, collisionRadius: number): number {  
    // Add stationary keyframes at time 0 and end time to capture collisions before first and after last keyframe
    const endTime = Math.max(droneA.getPositionKeyFrames().slice(-1)[0]?.getTime() || 0, droneB.getPositionKeyFrames().slice(-1)[0]?.getTime() || 0);
    const keyFramesA = [new PositionKeyFrame(droneA.getPositonAtTime(0), 0) ,...droneA.getPositionKeyFrames(), new PositionKeyFrame(droneA.getPositonAtTime(endTime), endTime)];
    const keyFramesB = [new PositionKeyFrame(droneB.getPositonAtTime(0), 0) ,...droneB.getPositionKeyFrames(), new PositionKeyFrame(droneB.getPositonAtTime(endTime), endTime)];
    
    let i = 0;
    let j = 0;
    
    while (i < keyFramesA.length - 1 && j < keyFramesB.length - 1) {
        const keyA0 = keyFramesA[i];
        const keyA1 = keyFramesA[i + 1];
        const keyB0 = keyFramesB[j];
        const keyB1 = keyFramesB[j + 1];

        const tClosest = computeClosestApproach(keyA0, keyA1, keyB0, keyB1);
        const posA = droneA.getPositonAtTime(tClosest);
        const posB = droneB.getPositonAtTime(tClosest);
        const distanceSq = posA.distanceToSquared(posB);
        if (distanceSq <= 4 * collisionRadius * collisionRadius) {
            return tClosest;
        }

        if (keyA1.getTime() < keyB1.getTime()) {
            i++;
            if (i >= keyFramesA.length - 1) {
                i--;
                j++;
            }
        } else {
            j++;
            if (j >= keyFramesB.length - 1) {
                j--;
                i++;
            }
        }
    }
    return -1;
}

function computeClosestApproach(p0: PositionKeyFrame, p1: PositionKeyFrame, q0: PositionKeyFrame, q1: PositionKeyFrame): number {
    // direction vectors
    let v0;
    if (p1.getTime() === p0.getTime()) {
        v0 = new Vector3(0, 0, 0);
    } else {
        v0 = new Vector3().subVectors(p1.getPos(), p0.getPos()).multiplyScalar(1 / (p1.getTime() - p0.getTime()));
    }
    let v1;
    if (q1.getTime() === q0.getTime()) {
        v1 = new Vector3(0, 0, 0);
    } else {
        v1 = new Vector3().subVectors(q1.getPos(), q0.getPos()).multiplyScalar(1 / (q1.getTime() - q0.getTime()));
    }
    // base vectors
    const b0 = p0.getPos();
    // move b1 back so both start at the same time
    const b1 = new Vector3().subVectors(q0.getPos(), v1.clone().multiplyScalar(q0.getTime() - p0.getTime()));

    // points moving along the lines:
    // b0 + v0 * t
    // b1 + v1 * t
    // (b1 - b0) + (v1 - v0) * t  => find minimizing t, distance to 0 is now the closest approach
    const dv = new Vector3().subVectors(v1, v0);
    const db = new Vector3().subVectors(b1, b0);
    if (dv.lengthSq() === 0) {
        // parallel movement, closest approach is at start time
        return Math.max(p0.getTime(), q0.getTime());
    }
    // minimize |db + dv * t|^2
    // (db0 + dv0 * t)^2 + (db1 + dv1 * t)^2 + (db2 + dv2 * t)^2
    // = (dv0^2 + dv1^2 + dv2^2) * t^2 + 2 * (db0*dv0 + db1*dv1 + db2*dv2) * t + (db0^2 + db1^2 + db2^2)
    // derivative:
    // 2 * (dv0^2 + dv1^2 + dv2^2) * t + 2 * (db0*dv0 + db1*dv1 + db2*dv2) = 0
    // t = - (db0*dv0 + db1*dv1 + db2*dv2) / (dv0^2 + dv1^2 + dv2^2)
    const t = - db.dot(dv) / dv.lengthSq();
    const tRealAndClamped = Math.max(p0.getTime(), q0.getTime(), Math.min(p1.getTime(), q1.getTime(), t + p0.getTime()));
    return tRealAndClamped;
}