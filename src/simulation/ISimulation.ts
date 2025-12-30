import { DroneFrame } from "./state/DroneFrame";
import { DroneStateStore } from "./state/DroneStateStore";
import { KeyFrameStateStore } from "./state/KeyFrameStateStore";
import { LightStateStore } from "./state/LightStateStore";
import { Vector3 } from "three";
import { TimeManager } from "./subsystems/TimeManager";
import { PathFrame } from "./state/PathFrame";
import { SelectionManager } from "./subsystems/SelectionManager";
import { EventManager } from "./subsystems/EventManager";
import { Collision } from "../Collision";
import { CollisionManager } from "./subsystems/CollisionManager";

export class ISimulation {
  private droneStore?: DroneStateStore;
  private pathStore?: KeyFrameStateStore;
  private lightStore?: LightStateStore;

  private timeManager: TimeManager;
  private selectionManager: SelectionManager;
  private eventManager: EventManager;
  private collisionManager: CollisionManager;

  constructor(
    drone: DroneStateStore,
    path: KeyFrameStateStore,
    light: LightStateStore
  ) {
    this.droneStore = drone;
    this.pathStore = path;
    this.lightStore = light;

    this.timeManager = new TimeManager(light, this);
    this.selectionManager = new SelectionManager(drone, path, this);
    this.eventManager = new EventManager(drone, this);
    this.collisionManager = new CollisionManager(drone, path, this);
  }

  public notifyChange() {
    this.eventManager.notifyChange(this.timeManager.getCurrentEditorTime());

    //reselect because of change overwrites
    this.selectionManager.getSelected().forEach((element: number) => {
      this.selectionManager.selectDrone(element);
    });

    //redraw collisions
    this.collisionManager.notifyCollisionChange(
      this.collisionManager.getDronesInCollision(),
      this.timeManager.getCurrentEditorTime()
    );
  }

  public notifiyCollisionChange(newCollision: Collision) {
    this.collisionManager.notifyCollisionChange(
      newCollision,
      this.timeManager.getCurrentEditorTime()
    );
    this.notifyChange();
  }

  public setEditorTime(time: number) {
    this.timeManager.setEditorTime(time);

    this.notifyChange();
  }

  public selectDrone(id: number) {
    this.selectionManager.selectDrone(id);

    this.notifyChange();
  }

  public unselectDrone(id: number) {
    this.selectionManager.unselectDrone(
      id,
      this.timeManager.getCurrentEditorTime()
    );

    this.notifyChange();
  }

  public setSimulationTime(time: number) {
    this.timeManager.setSimulationTime(time);
  }

  public requestDroneFrame(time: number): DroneFrame {
    if (time == 0) {
      return {
        dronePositions: new Map<number, Vector3>([
          [1, new Vector3(4.0, 1.0, 3.0)],
          [2, new Vector3(7.0, 1.0, 3.0)],
          [3, new Vector3(11.0, 1.0, 3.0)],
          [4, new Vector3(15.0, 1.0, 3.0)],
          [5, new Vector3(19.0, 1.0, 3.0)],
          [6, new Vector3(24.0, 1.0, 3.0)],
          [7, new Vector3(25.0, 1.0, 3.0)],
          [8, new Vector3(26.0, 1.0, 3.0)],
          [9, new Vector3(4.0, 1.0, 4.0)],
          [10, new Vector3(7.0, 1.0, 4.0)],
          [11, new Vector3(10.0, 1.0, 4.0)],
          [12, new Vector3(12.0, 1.0, 4.0)],
          [13, new Vector3(15.0, 1.0, 4.0)],
          [14, new Vector3(19.0, 1.0, 4.0)],
          [15, new Vector3(23.0, 1.0, 4.0)],
          [16, new Vector3(27.0, 1.0, 4.0)],
          [17, new Vector3(4.0, 1.0, 5.0)],
          [18, new Vector3(5.0, 1.0, 5.0)],
          [19, new Vector3(6.0, 1.0, 5.0)],
          [20, new Vector3(7.0, 1.0, 5.0)],
          [21, new Vector3(10.0, 1.0, 5.0)],
          [22, new Vector3(11.0, 1.0, 5.0)],
          [23, new Vector3(12.0, 1.0, 5.0)],
          [24, new Vector3(15.0, 1.0, 5.0)],
          [25, new Vector3(19.0, 1.0, 5.0)],
          [26, new Vector3(23.0, 1.0, 5.0)],
          [27, new Vector3(27.0, 1.0, 5.0)],
          [28, new Vector3(4.0, 1.0, 6.0)],
          [29, new Vector3(7.0, 1.0, 6.0)],
          [30, new Vector3(10.0, 1.0, 6.0)],
          [31, new Vector3(12.0, 1.0, 6.0)],
          [32, new Vector3(15.0, 1.0, 6.0)],
          [33, new Vector3(19.0, 1.0, 6.0)],
          [34, new Vector3(23.0, 1.0, 6.0)],
          [35, new Vector3(27.0, 1.0, 6.0)],
          [36, new Vector3(4.0, 1.0, 7.0)],
          [37, new Vector3(7.0, 1.0, 7.0)],
          [38, new Vector3(10.0, 1.0, 7.0)],
          [39, new Vector3(12.0, 1.0, 7.0)],
          [40, new Vector3(15.0, 1.0, 7.0)],
          [41, new Vector3(16.0, 1.0, 7.0)],
          [42, new Vector3(17.0, 1.0, 7.0)],
          [43, new Vector3(19.0, 1.0, 7.0)],
          [44, new Vector3(20.0, 1.0, 7.0)],
          [45, new Vector3(21.0, 1.0, 7.0)],
          [46, new Vector3(24.0, 1.0, 7.0)],
          [47, new Vector3(25.0, 1.0, 7.0)],
          [48, new Vector3(26.0, 1.0, 7.0)],
        ]),

        droneColors: new Map<number, string>([
          [1, "#000099"],
          [2, "#000099"],
          [3, "#000099"],
          [4, "#000099"],
          [5, "#000099"],
          [6, "#000099"],
          [7, "#000099"],
          [8, "#000099"],
          [9, "#000099"],
          [10, "#000099"],
          [11, "#000099"],
          [12, "#000099"],
          [13, "#000099"],
          [14, "#000099"],
          [15, "#000099"],
          [16, "#000099"],
          [17, "#000099"],
          [18, "#000099"],
          [19, "#000099"],
          [20, "#000099"],
          [21, "#000099"],
          [22, "#000099"],
          [23, "#000099"],
          [24, "#000099"],
          [25, "#000099"],
          [26, "#000099"],
          [27, "#000099"],
          [28, "#000099"],
          [29, "#000099"],
          [30, "#000099"],
          [31, "#000099"],
          [32, "#000099"],
          [33, "#000099"],
          [34, "#000099"],
          [35, "#000099"],
          [36, "#000099"],
          [37, "#000099"],
          [38, "#000099"],
          [39, "#000099"],
          [40, "#000099"],
          [41, "#000099"],
          [42, "#000099"],
          [43, "#000099"],
          [44, "#000099"],
          [45, "#000099"],
          [46, "#000099"],
          [47, "#000099"],
          [48, "#000099"],
        ]),
      };
    } else {
      return {
        dronePositions: new Map([]),
        droneColors: new Map([]),
      };
    }
  }

  public requestKeyFrame(id: number): PathFrame {
    if (id == 1) {
      return {
        pathPositions: new Map([
          [
            1,
            [
              new Vector3(4.0, 1.0, 3.0),
              new Vector3(6.0, 1.0, 3.0),
              new Vector3(6.0, 5.0, 3.0),
            ],
          ],
        ]),
        pathColors: new Map([[1, "#ffffff"]]),
      };
    } else if (id == 2) {
      return {
        pathPositions: new Map([
          [
            2,
            [
              new Vector3(7.0, 1.0, 3.0),
              new Vector3(7.0, 1.0, 1.0),
              new Vector3(7.0, 1.0, 5.0),
            ],
          ],
        ]),
        pathColors: new Map([[2, "#ffff"]]),
      };
    } else if (id == 3) {
      return {
        pathPositions: new Map([
          [
            3,
            [
              new Vector3(11.0, 1.0, 3.0),
              new Vector3(7.0, 1.0, 3.0),
              new Vector3(4.0, 1.0, 3.0),
            ],
          ],
        ]),
        pathColors: new Map([[3, "#ffff"]]),
      };
    } else {
      return new PathFrame();
    }
  }
}
