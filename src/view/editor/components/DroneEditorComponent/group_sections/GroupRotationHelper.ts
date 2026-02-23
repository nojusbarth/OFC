import { Vector3, Euler, Matrix4 } from "three";

export class GroupRotationHelper {
  static calculateCenter(positions: Vector3[]): Vector3 {
    const center = new Vector3();

    positions.forEach((pos) => center.add(pos));

    return center.divideScalar(positions.length);
  }

  static rotatePositions(
    positions: Vector3[],
    rotationDegrees: Vector3,
  ): Vector3[] {
    if (positions.length === 0) return [];

    const center = this.calculateCenter(positions);

    const rotationRadians = new Vector3(
      this.degToRad(rotationDegrees.x),
      this.degToRad(rotationDegrees.y),
      this.degToRad(rotationDegrees.z),
    );

    const euler = new Euler(
      rotationRadians.x,
      rotationRadians.y,
      rotationRadians.z,
      "XYZ",
    );

    const rotationMatrix = new Matrix4().makeRotationFromEuler(euler);

    return positions.map((pos) => {
      const relative = pos.clone().sub(center);
      const rotated = relative.applyMatrix4(rotationMatrix);
      return rotated.add(center);
    });
  }

  private static degToRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }
}
