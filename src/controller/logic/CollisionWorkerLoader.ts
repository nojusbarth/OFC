// This file is excluded from Jest to avoid parsing import.meta.url
// @jest-environment-skip
export function loadCollisionWorker(): Worker {
    return new Worker(new URL("./CollisionHandler.worker.ts", import.meta.url), { type: "module" });
}
