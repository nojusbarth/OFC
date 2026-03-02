import { Vector3, Euler, Matrix4 } from "three";

// Dieser Abschnitt ist teilweise KI generiert

/**
 * Die RotationHelper-Klasse bietet Funktionen zur Berechnung der neuen Positionen von Drohnen, wenn diese um einen gemeinsamen Mittelpunkt rotiert werden sollen.
 */
export class RotationHelper {
  /**
   * Berechnet den Mittelpunkt (Center) der gegebenen Positionen, um die Drohnen um diesen Punkt zu rotieren.
   * @param positions - Die aktuellen Positionen der Drohnen, die rotiert werden sollen.
   * @returns Der berechnete Mittelpunkt der Drohnenpositionen.
   */
  static calculateCenter(positions: Vector3[]): Vector3 {
    const center = new Vector3();

    positions.forEach((pos) => center.add(pos));

    return center.divideScalar(positions.length);
  }

  /**
   * Berechnet die neuen Positionen der Drohnen, wenn diese um einen gemeinsamen Mittelpunkt
   * @param positions - Die aktuellen Positionen der Drohnen, die rotiert werden sollen.
   * @param rotationDegrees - Die Rotationswinkel in Grad für die X-, Y- und Z-Achse, um die die Drohnen rotiert werden sollen.
   * @returns Die neuen Positionen der Drohnen nach der Rotation.
   */
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
