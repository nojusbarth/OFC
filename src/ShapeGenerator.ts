import { Vector2 } from "three";

const house = [
    new Vector2(0, 0),
    new Vector2(1, 0),
    new Vector2(1.5, 0.5),
    new Vector2(1, 1),
    new Vector2(0, 1),
    new Vector2(0, 0)
];

function generateStarPath(zacken: number, innerRadius: number, outerRadius: number, center: Vector2) {
    const star = []
    for (let i = 0; i < zacken; i++) {
        const innerAngle = (i / zacken) * 2 * Math.PI
        const outerAngle = ((i + 0.5) / zacken) * 2 * Math.PI
        star.push(new Vector2(Math.cos(innerAngle), Math.sin(innerAngle)).multiplyScalar(innerRadius).add(center))
        star.push(new Vector2(Math.cos(outerAngle), Math.sin(outerAngle)).multiplyScalar(outerRadius).add(center))
    }
    star.push(star[0]);
    return star;
}

export const exampleVecs = convertPath(generateStarPath(20, 5, 7, new Vector2(0, 10)), 15);


function convertPath(path: Vector2[], perLineCount: number) {
    // const perLineCount = Math.round(count / (path.length - 1));
    const drones: Vector2[] = []

    for (let i = 0; i < path.length - 1; i++) {
        for (let j = 0; j < perLineCount; j++) {
            console.log(j/perLineCount);
            drones.push(new Vector2().lerpVectors(path[i], path[i + 1], j / perLineCount));
        }
    }
    return drones;
}