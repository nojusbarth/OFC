import { IController } from "../controller/interface/IController";
import { Color, Vector3 } from "three";
import { PositionKeyFrame } from "../repository/entity/PositionKeyFrame";
import { ColorKeyFrame } from "../repository/entity/ColorKeyFrame";

export function helloKitShow(ctrl: IController) {
  // Weiß
  const WHITE = new Color(1, 1, 1);

  // #ff9933
  const ORANGE = new Color(1.0, 0.6, 0.2);

  // #ffe733
  const YELLOW = new Color(1.0, 0.9, 0.2);

  ctrl.getSettings().setEndTime(30);
  ctrl.getSettings().setDroneDistance(2);

  // === AUTO-GENERATED DRONE SHOW ===
  // X-Y Plane, centered, with global offsets

  const SHOW_OFFSET_X = 0.0;
  const SHOW_OFFSET_Y = 10.0;
  const SHOW_OFFSET_Z = 0.0;

  // =====================================================
  // DRONE 1
  // =====================================================
  const drone1 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone1,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone1, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone1,
    new PositionKeyFrame(
      new Vector3(-16.0, 15.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone1,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 2
  // =====================================================
  const drone2 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone2,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone2, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone2,
    new PositionKeyFrame(
      new Vector3(-11.0, 15.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone2,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 3
  // =====================================================
  const drone3 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone3,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone3, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone3,
    new PositionKeyFrame(
      new Vector3(-10.0, 15.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone3,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 4
  // =====================================================
  const drone4 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone4,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone4, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone4,
    new PositionKeyFrame(
      new Vector3(-6.0, 15.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone4,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 5
  // =====================================================
  const drone5 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone5,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone5, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone5,
    new PositionKeyFrame(
      new Vector3(-5.0, 15.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone5,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 6
  // =====================================================
  const drone6 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone6,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone6, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone6,
    new PositionKeyFrame(
      new Vector3(-17.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone6,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 7
  // =====================================================
  const drone7 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone7,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone7, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone7,
    new PositionKeyFrame(
      new Vector3(-15.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone7,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 8
  // =====================================================
  const drone8 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone8,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone8, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone8,
    new PositionKeyFrame(
      new Vector3(-12.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone8,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 9
  // =====================================================
  const drone9 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone9,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone9, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone9,
    new PositionKeyFrame(
      new Vector3(-9.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone9,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 10
  // =====================================================
  const drone10 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone10,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone10, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone10,
    new PositionKeyFrame(
      new Vector3(-7.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone10,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 11
  // =====================================================
  const drone11 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone11,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone11, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone11,
    new PositionKeyFrame(
      new Vector3(-4.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone11,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 12
  // =====================================================
  const drone12 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone12,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone12, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone12,
    new PositionKeyFrame(
      new Vector3(3.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone12,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 13
  // =====================================================
  const drone13 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone13,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone13, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone13,
    new PositionKeyFrame(
      new Vector3(4.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone13,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 14
  // =====================================================
  const drone14 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone14,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone14, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone14,
    new PositionKeyFrame(
      new Vector3(5.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone14,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 15
  // =====================================================
  const drone15 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone15,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone15, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone15,
    new PositionKeyFrame(
      new Vector3(8.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone15,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 16
  // =====================================================
  const drone16 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone16,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone16, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone16,
    new PositionKeyFrame(
      new Vector3(11.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone16,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 17
  // =====================================================
  const drone17 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone17,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone17, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone17,
    new PositionKeyFrame(
      new Vector3(14.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone17,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 18
  // =====================================================
  const drone18 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone18,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone18, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone18,
    new PositionKeyFrame(
      new Vector3(16.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone18,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 19
  // =====================================================
  const drone19 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone19,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone19, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone19,
    new PositionKeyFrame(
      new Vector3(17.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone19,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 20
  // =====================================================
  const drone20 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone20,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone20, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone20,
    new PositionKeyFrame(
      new Vector3(20.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone20,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 21
  // =====================================================
  const drone21 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone21,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone21, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone21,
    new PositionKeyFrame(
      new Vector3(21.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone21,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 22
  // =====================================================
  const drone22 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone22,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone22, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone22,
    new PositionKeyFrame(
      new Vector3(22.0, 14.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone22,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 23
  // =====================================================
  const drone23 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone23,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone23, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone23,
    new PositionKeyFrame(
      new Vector3(-15.0, 13.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone23,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 24
  // =====================================================
  const drone24 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone24,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone24, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone24,
    new PositionKeyFrame(
      new Vector3(-12.0, 13.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone24,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 25
  // =====================================================
  const drone25 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone25,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone25, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone25,
    new PositionKeyFrame(
      new Vector3(-9.0, 13.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone25,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 26
  // =====================================================
  const drone26 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone26,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone26, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone26,
    new PositionKeyFrame(
      new Vector3(-7.0, 13.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone26,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 27
  // =====================================================
  const drone27 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone27,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone27, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone27,
    new PositionKeyFrame(
      new Vector3(-4.0, 13.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone27,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 28
  // =====================================================
  const drone28 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone28,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone28, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone28,
    new PositionKeyFrame(
      new Vector3(4.0, 13.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone28,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 29
  // =====================================================
  const drone29 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone29,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone29, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone29,
    new PositionKeyFrame(
      new Vector3(7.0, 13.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone29,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 30
  // =====================================================
  const drone30 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone30,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone30, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone30,
    new PositionKeyFrame(
      new Vector3(9.0, 13.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone30,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 31
  // =====================================================
  const drone31 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone31,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone31, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone31,
    new PositionKeyFrame(
      new Vector3(11.0, 13.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone31,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 32
  // =====================================================
  const drone32 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone32,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone32, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone32,
    new PositionKeyFrame(
      new Vector3(14.0, 13.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone32,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 33
  // =====================================================
  const drone33 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone33,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone33, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone33,
    new PositionKeyFrame(
      new Vector3(16.0, 13.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone33,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 34
  // =====================================================
  const drone34 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone34,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone34, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone34,
    new PositionKeyFrame(
      new Vector3(18.0, 13.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone34,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 35
  // =====================================================
  const drone35 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone35,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone35, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone35,
    new PositionKeyFrame(
      new Vector3(20.0, 13.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone35,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 36
  // =====================================================
  const drone36 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone36,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone36, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone36,
    new PositionKeyFrame(
      new Vector3(-16.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone36,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 37
  // =====================================================
  const drone37 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone37,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone37, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone37,
    new PositionKeyFrame(
      new Vector3(-12.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone37,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 38
  // =====================================================
  const drone38 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone38,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone38, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone38,
    new PositionKeyFrame(
      new Vector3(-9.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone38,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 39
  // =====================================================
  const drone39 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone39,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone39, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone39,
    new PositionKeyFrame(
      new Vector3(-7.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone39,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 40
  // =====================================================
  const drone40 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone40,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone40, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone40,
    new PositionKeyFrame(
      new Vector3(-4.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone40,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 41
  // =====================================================
  const drone41 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone41,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone41, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone41,
    new PositionKeyFrame(
      new Vector3(4.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone41,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 42
  // =====================================================
  const drone42 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone42,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone42, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone42,
    new PositionKeyFrame(
      new Vector3(7.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone42,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 43
  // =====================================================
  const drone43 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone43,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone43, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone43,
    new PositionKeyFrame(
      new Vector3(9.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone43,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 44
  // =====================================================
  const drone44 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone44,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone44, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone44,
    new PositionKeyFrame(
      new Vector3(11.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone44,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 45
  // =====================================================
  const drone45 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone45,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone45, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone45,
    new PositionKeyFrame(
      new Vector3(12.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone45,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 46
  // =====================================================
  const drone46 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone46,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone46, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone46,
    new PositionKeyFrame(
      new Vector3(13.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone46,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 47
  // =====================================================
  const drone47 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone47,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone47, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone47,
    new PositionKeyFrame(
      new Vector3(14.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone47,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 48
  // =====================================================
  const drone48 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone48,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone48, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone48,
    new PositionKeyFrame(
      new Vector3(16.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone48,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 49
  // =====================================================
  const drone49 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone49,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone49, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone49,
    new PositionKeyFrame(
      new Vector3(17.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone49,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 50
  // =====================================================
  const drone50 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone50,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone50, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone50,
    new PositionKeyFrame(
      new Vector3(20.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone50,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 51
  // =====================================================
  const drone51 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone51,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone51, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone51,
    new PositionKeyFrame(
      new Vector3(21.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone51,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 52
  // =====================================================
  const drone52 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone52,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone52, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone52,
    new PositionKeyFrame(
      new Vector3(22.0, 12.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone52,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 53
  // =====================================================
  const drone53 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone53,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone53, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone53,
    new PositionKeyFrame(
      new Vector3(-17.0, 11.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone53,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 54
  // =====================================================
  const drone54 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone54,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone54, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone54,
    new PositionKeyFrame(
      new Vector3(-12.0, 11.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone54,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 55
  // =====================================================
  const drone55 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone55,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone55, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone55,
    new PositionKeyFrame(
      new Vector3(-9.0, 11.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone55,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 56
  // =====================================================
  const drone56 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone56,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone56, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone56,
    new PositionKeyFrame(
      new Vector3(-7.0, 11.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone56,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 57
  // =====================================================
  const drone57 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone57,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone57, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone57,
    new PositionKeyFrame(
      new Vector3(-4.0, 11.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone57,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 58
  // =====================================================
  const drone58 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone58,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone58, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone58,
    new PositionKeyFrame(
      new Vector3(2.0, 11.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone58,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 59
  // =====================================================
  const drone59 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone59,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone59, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone59,
    new PositionKeyFrame(
      new Vector3(4.0, 11.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone59,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 60
  // =====================================================
  const drone60 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone60,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone60, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone60,
    new PositionKeyFrame(
      new Vector3(7.0, 11.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone60,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 61
  // =====================================================
  const drone61 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone61,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone61, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone61,
    new PositionKeyFrame(
      new Vector3(8.0, 11.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone61,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 62
  // =====================================================
  const drone62 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone62,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone62, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone62,
    new PositionKeyFrame(
      new Vector3(9.0, 11.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone62,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 63
  // =====================================================
  const drone63 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone63,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone63, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone63,
    new PositionKeyFrame(
      new Vector3(11.0, 11.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone63,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 64
  // =====================================================
  const drone64 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone64,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone64, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone64,
    new PositionKeyFrame(
      new Vector3(14.0, 11.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone64,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 65
  // =====================================================
  const drone65 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone65,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone65, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone65,
    new PositionKeyFrame(
      new Vector3(16.0, 11.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone65,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 66
  // =====================================================
  const drone66 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone66,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone66, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone66,
    new PositionKeyFrame(
      new Vector3(18.0, 11.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone66,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 67
  // =====================================================
  const drone67 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone67,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone67, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone67,
    new PositionKeyFrame(
      new Vector3(20.0, 11.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone67,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 68
  // =====================================================
  const drone68 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone68,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone68, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone68,
    new PositionKeyFrame(
      new Vector3(-17.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone68,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 69
  // =====================================================
  const drone69 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone69,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone69, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone69,
    new PositionKeyFrame(
      new Vector3(-16.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone69,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 70
  // =====================================================
  const drone70 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone70,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone70, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone70,
    new PositionKeyFrame(
      new Vector3(-15.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone70,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 71
  // =====================================================
  const drone71 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone71,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone71, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone71,
    new PositionKeyFrame(
      new Vector3(-11.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone71,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 72
  // =====================================================
  const drone72 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone72,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone72, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone72,
    new PositionKeyFrame(
      new Vector3(-10.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone72,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 73
  // =====================================================
  const drone73 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone73,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone73, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone73,
    new PositionKeyFrame(
      new Vector3(-6.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone73,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 74
  // =====================================================
  const drone74 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone74,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone74, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone74,
    new PositionKeyFrame(
      new Vector3(-5.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone74,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 75
  // =====================================================
  const drone75 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone75,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone75, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone75,
    new PositionKeyFrame(
      new Vector3(3.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone75,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 76
  // =====================================================
  const drone76 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone76,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone76, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone76,
    new PositionKeyFrame(
      new Vector3(4.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone76,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 77
  // =====================================================
  const drone77 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone77,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone77, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone77,
    new PositionKeyFrame(
      new Vector3(7.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone77,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 78
  // =====================================================
  const drone78 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone78,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone78, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone78,
    new PositionKeyFrame(
      new Vector3(9.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone78,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 79
  // =====================================================
  const drone79 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone79,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone79, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone79,
    new PositionKeyFrame(
      new Vector3(11.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone79,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 80
  // =====================================================
  const drone80 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone80,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone80, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone80,
    new PositionKeyFrame(
      new Vector3(14.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone80,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 81
  // =====================================================
  const drone81 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone81,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone81, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone81,
    new PositionKeyFrame(
      new Vector3(16.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone81,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 82
  // =====================================================
  const drone82 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone82,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone82, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone82,
    new PositionKeyFrame(
      new Vector3(18.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone82,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 83
  // =====================================================
  const drone83 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone83,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone83, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone83,
    new PositionKeyFrame(
      new Vector3(20.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone83,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 84
  // =====================================================
  const drone84 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone84,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone84, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone84,
    new PositionKeyFrame(
      new Vector3(21.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone84,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 85
  // =====================================================
  const drone85 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone85,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone85, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone85,
    new PositionKeyFrame(
      new Vector3(22.0, 10.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone85,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 86
  // =====================================================
  const drone86 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone86,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone86, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone86,
    new PositionKeyFrame(
      new Vector3(-12.0, 4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone86,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 87
  // =====================================================
  const drone87 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone87,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone87, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone87,
    new PositionKeyFrame(
      new Vector3(-11.0, 4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone87,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 88
  // =====================================================
  const drone88 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone88,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone88, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone88,
    new PositionKeyFrame(
      new Vector3(-8.0, 4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone88,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 89
  // =====================================================
  const drone89 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone89,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone89, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone89,
    new PositionKeyFrame(
      new Vector3(-7.0, 4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone89,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 90
  // =====================================================
  const drone90 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone90,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone90, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone90,
    new PositionKeyFrame(
      new Vector3(-1.0, 4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone90,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 91
  // =====================================================
  const drone91 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone91,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone91, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone91,
    new PositionKeyFrame(
      new Vector3(0.0, 4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone91,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 92
  // =====================================================
  const drone92 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone92,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone92, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone92,
    new PositionKeyFrame(
      new Vector3(6.0, 4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone92,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 93
  // =====================================================
  const drone93 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone93,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone93, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone93,
    new PositionKeyFrame(
      new Vector3(7.0, 4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone93,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 94
  // =====================================================
  const drone94 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone94,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone94, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone94,
    new PositionKeyFrame(
      new Vector3(8.0, 4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone94,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 95
  // =====================================================
  const drone95 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone95,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone95, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone95,
    new PositionKeyFrame(
      new Vector3(9.0, 4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone95,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 96
  // =====================================================
  const drone96 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone96,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone96, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone96,
    new PositionKeyFrame(
      new Vector3(10.0, 4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone96,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 97
  // =====================================================
  const drone97 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone97,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone97, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone97,
    new PositionKeyFrame(
      new Vector3(11.0, 4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone97,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 98
  // =====================================================
  const drone98 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone98,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone98, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone98,
    new PositionKeyFrame(
      new Vector3(12.0, 4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone98,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 99
  // =====================================================
  const drone99 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone99,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone99, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone99,
    new PositionKeyFrame(
      new Vector3(13.0, 4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone99,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 100
  // =====================================================
  const drone100 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone100,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone100, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone100,
    new PositionKeyFrame(
      new Vector3(-12.0, 3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone100,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 101
  // =====================================================
  const drone101 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone101,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone101, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone101,
    new PositionKeyFrame(
      new Vector3(-11.0, 3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone101,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 102
  // =====================================================
  const drone102 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone102,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone102, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone102,
    new PositionKeyFrame(
      new Vector3(-8.0, 3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone102,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 103
  // =====================================================
  const drone103 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone103,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone103, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone103,
    new PositionKeyFrame(
      new Vector3(-7.0, 3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone103,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 104
  // =====================================================
  const drone104 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone104,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone104, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone104,
    new PositionKeyFrame(
      new Vector3(-1.0, 3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone104,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 105
  // =====================================================
  const drone105 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone105,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone105, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone105,
    new PositionKeyFrame(
      new Vector3(0.0, 3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone105,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 106
  // =====================================================
  const drone106 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone106,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone106, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone106,
    new PositionKeyFrame(
      new Vector3(6.0, 3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone106,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 107
  // =====================================================
  const drone107 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone107,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone107, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone107,
    new PositionKeyFrame(
      new Vector3(7.0, 3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone107,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 108
  // =====================================================
  const drone108 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone108,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone108, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone108,
    new PositionKeyFrame(
      new Vector3(8.0, 3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone108,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 109
  // =====================================================
  const drone109 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone109,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone109, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone109,
    new PositionKeyFrame(
      new Vector3(9.0, 3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone109,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 110
  // =====================================================
  const drone110 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone110,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone110, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone110,
    new PositionKeyFrame(
      new Vector3(10.0, 3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone110,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 111
  // =====================================================
  const drone111 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone111,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone111, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone111,
    new PositionKeyFrame(
      new Vector3(-12.0, 2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone111,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 112
  // =====================================================
  const drone112 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone112,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone112, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone112,
    new PositionKeyFrame(
      new Vector3(-11.0, 2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone112,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 113
  // =====================================================
  const drone113 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone113,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone113, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone113,
    new PositionKeyFrame(
      new Vector3(-9.0, 2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone113,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 114
  // =====================================================
  const drone114 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone114,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone114, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone114,
    new PositionKeyFrame(
      new Vector3(-8.0, 2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone114,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 115
  // =====================================================
  const drone115 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone115,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone115, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone115,
    new PositionKeyFrame(
      new Vector3(-1.0, 2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone115,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 116
  // =====================================================
  const drone116 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone116,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone116, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone116,
    new PositionKeyFrame(
      new Vector3(0.0, 2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone116,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 117
  // =====================================================
  const drone117 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone117,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone117, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone117,
    new PositionKeyFrame(
      new Vector3(9.0, 2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone117,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 118
  // =====================================================
  const drone118 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone118,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone118, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone118,
    new PositionKeyFrame(
      new Vector3(10.0, 2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone118,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 119
  // =====================================================
  const drone119 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone119,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone119, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone119,
    new PositionKeyFrame(
      new Vector3(-12.0, 1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone119,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 120
  // =====================================================
  const drone120 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone120,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone120, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone120,
    new PositionKeyFrame(
      new Vector3(-11.0, 1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone120,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 121
  // =====================================================
  const drone121 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone121,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone121, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone121,
    new PositionKeyFrame(
      new Vector3(-10.0, 1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone121,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 122
  // =====================================================
  const drone122 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone122,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone122, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone122,
    new PositionKeyFrame(
      new Vector3(-9.0, 1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone122,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 123
  // =====================================================
  const drone123 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone123,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone123, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone123,
    new PositionKeyFrame(
      new Vector3(-1.0, 1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone123,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 124
  // =====================================================
  const drone124 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone124,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone124, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone124,
    new PositionKeyFrame(
      new Vector3(0.0, 1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone124,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 125
  // =====================================================
  const drone125 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone125,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone125, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone125,
    new PositionKeyFrame(
      new Vector3(9.0, 1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone125,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 126
  // =====================================================
  const drone126 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone126,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone126, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone126,
    new PositionKeyFrame(
      new Vector3(10.0, 1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone126,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 127
  // =====================================================
  const drone127 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone127,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone127, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone127,
    new PositionKeyFrame(
      new Vector3(-12.0, 0.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone127,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 128
  // =====================================================
  const drone128 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone128,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone128, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone128,
    new PositionKeyFrame(
      new Vector3(-11.0, 0.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone128,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 129
  // =====================================================
  const drone129 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone129,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone129, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone129,
    new PositionKeyFrame(
      new Vector3(-10.0, 0.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone129,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 130
  // =====================================================
  const drone130 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone130,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone130, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone130,
    new PositionKeyFrame(
      new Vector3(-1.0, 0.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone130,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 131
  // =====================================================
  const drone131 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone131,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone131, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone131,
    new PositionKeyFrame(
      new Vector3(0.0, 0.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone131,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 132
  // =====================================================
  const drone132 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone132,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone132, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone132,
    new PositionKeyFrame(
      new Vector3(9.0, 0.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone132,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 133
  // =====================================================
  const drone133 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone133,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone133, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone133,
    new PositionKeyFrame(
      new Vector3(10.0, 0.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone133,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 134
  // =====================================================
  const drone134 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone134,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone134, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone134,
    new PositionKeyFrame(
      new Vector3(-12.0, -1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone134,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 135
  // =====================================================
  const drone135 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone135,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone135, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone135,
    new PositionKeyFrame(
      new Vector3(-11.0, -1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone135,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 136
  // =====================================================
  const drone136 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone136,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone136, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone136,
    new PositionKeyFrame(
      new Vector3(-10.0, -1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone136,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 137
  // =====================================================
  const drone137 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone137,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone137, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone137,
    new PositionKeyFrame(
      new Vector3(-9.0, -1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone137,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 138
  // =====================================================
  const drone138 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone138,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone138, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone138,
    new PositionKeyFrame(
      new Vector3(-1.0, -1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone138,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 139
  // =====================================================
  const drone139 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone139,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone139, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone139,
    new PositionKeyFrame(
      new Vector3(0.0, -1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone139,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 140
  // =====================================================
  const drone140 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone140,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone140, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone140,
    new PositionKeyFrame(
      new Vector3(9.0, -1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone140,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 141
  // =====================================================
  const drone141 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone141,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone141, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone141,
    new PositionKeyFrame(
      new Vector3(10.0, -1.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone141,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 142
  // =====================================================
  const drone142 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone142,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone142, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone142,
    new PositionKeyFrame(
      new Vector3(-12.0, -2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone142,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 143
  // =====================================================
  const drone143 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone143,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone143, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone143,
    new PositionKeyFrame(
      new Vector3(-11.0, -2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone143,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 144
  // =====================================================
  const drone144 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone144,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone144, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone144,
    new PositionKeyFrame(
      new Vector3(-9.0, -2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone144,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 145
  // =====================================================
  const drone145 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone145,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone145, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone145,
    new PositionKeyFrame(
      new Vector3(-8.0, -2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone145,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 146
  // =====================================================
  const drone146 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone146,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone146, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone146,
    new PositionKeyFrame(
      new Vector3(-1.0, -2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone146,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 147
  // =====================================================
  const drone147 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone147,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone147, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone147,
    new PositionKeyFrame(
      new Vector3(0.0, -2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone147,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 148
  // =====================================================
  const drone148 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone148,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone148, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone148,
    new PositionKeyFrame(
      new Vector3(9.0, -2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone148,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 149
  // =====================================================
  const drone149 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone149,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone149, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone149,
    new PositionKeyFrame(
      new Vector3(10.0, -2.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone149,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 150
  // =====================================================
  const drone150 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone150,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone150, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone150,
    new PositionKeyFrame(
      new Vector3(-12.0, -3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone150,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 151
  // =====================================================
  const drone151 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone151,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone151, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone151,
    new PositionKeyFrame(
      new Vector3(-11.0, -3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone151,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 152
  // =====================================================
  const drone152 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone152,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone152, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone152,
    new PositionKeyFrame(
      new Vector3(-8.0, -3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone152,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 153
  // =====================================================
  const drone153 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone153,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone153, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone153,
    new PositionKeyFrame(
      new Vector3(-7.0, -3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone153,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 154
  // =====================================================
  const drone154 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone154,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone154, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone154,
    new PositionKeyFrame(
      new Vector3(-1.0, -3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone154,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 155
  // =====================================================
  const drone155 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone155,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone155, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone155,
    new PositionKeyFrame(
      new Vector3(0.0, -3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone155,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 156
  // =====================================================
  const drone156 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone156,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone156, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone156,
    new PositionKeyFrame(
      new Vector3(9.0, -3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone156,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 157
  // =====================================================
  const drone157 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone157,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone157, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone157,
    new PositionKeyFrame(
      new Vector3(10.0, -3.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone157,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 158
  // =====================================================
  const drone158 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone158,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone158, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone158,
    new PositionKeyFrame(
      new Vector3(-12.0, -4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone158,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 159
  // =====================================================
  const drone159 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone159,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone159, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone159,
    new PositionKeyFrame(
      new Vector3(-11.0, -4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone159,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 160
  // =====================================================
  const drone160 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone160,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone160, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone160,
    new PositionKeyFrame(
      new Vector3(-8.0, -4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone160,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 161
  // =====================================================
  const drone161 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone161,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone161, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone161,
    new PositionKeyFrame(
      new Vector3(-7.0, -4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone161,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 162
  // =====================================================
  const drone162 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone162,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone162, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone162,
    new PositionKeyFrame(
      new Vector3(-1.0, -4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone162,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 163
  // =====================================================
  const drone163 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone163,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone163, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone163,
    new PositionKeyFrame(
      new Vector3(0.0, -4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone163,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // =====================================================
  // DRONE 164
  // =====================================================
  const drone164 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone164,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone164, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone164,
    new PositionKeyFrame(
      new Vector3(9.0, -4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone164,
    new ColorKeyFrame(new Color(1.0, 0.0, 0.0), 10),
  );

  // =====================================================
  // DRONE 165
  // =====================================================
  const drone165 = ctrl.addDrone();

  ctrl.getTimeController().setTime(0);
  ctrl.addPositionKeyFrame(
    drone165,
    new PositionKeyFrame(new Vector3(0, 0, 0), 0),
  );
  ctrl.addColorKeyFrame(drone165, new ColorKeyFrame(WHITE, 0));

  ctrl.getTimeController().setTime(10);
  ctrl.addPositionKeyFrame(
    drone165,
    new PositionKeyFrame(
      new Vector3(10.0, -4.0, 10.0).add(
        new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z),
      ),
      10,
    ),
  );
  ctrl.addColorKeyFrame(
    drone165,
    new ColorKeyFrame(new Color(1.0, 0.6, 0.2), 10),
  );

  // Map um die letzte Farbe jeder Drohne zu speichern
  const droneColors = new Map<number, Color>();

  // Sammle die Farben aller Drohnen bei t=10
  ctrl.getDrones().forEach((droneId) => {
    const color = ctrl.getColorAt(droneId, 10);
    droneColors.set(droneId, color.clone());
  });

  //twinkle effect: Farbkeyframe in kurzen Abständen wechseln von Farbe zu Weiß und zurück
  //ungerade und gerade ids jeweils alternierend
  const TWINKLE_INTERVAL = 0.3; // Intervall in Sekunden für Farbwechsel
  const drones = ctrl.getDrones();

  drones.forEach((drone, index) => {
    const droneColor = droneColors.get(drone) || ORANGE;
    const isOdd = (index + 1) % 2 === 1;
    const timeOffset = isOdd ? 0 : TWINKLE_INTERVAL / 2;

    for (let t = 10 + timeOffset; t <= 15; t += TWINKLE_INTERVAL) {
      ctrl.getTimeController().setTime(t);
      // Weiß
      ctrl.addColorKeyFrame(drone, new ColorKeyFrame(WHITE, t));

      const nextT = t + TWINKLE_INTERVAL / 2;
      if (nextT <= 15) {
        ctrl.getTimeController().setTime(nextT);
        // Originale Farbe der Drohne
        ctrl.addColorKeyFrame(drone, new ColorKeyFrame(droneColor, nextT));
      }
    }

    // Stelle sicher, dass die Drohne am Ende des Glitzereffekts ihre ursprüngliche Farbe hat
    ctrl.getTimeController().setTime(16);
    ctrl.addColorKeyFrame(drone, new ColorKeyFrame(droneColor, 16));
  });

  // =====================================================
  // 0 to 1 Formation Change (t=15-20)
  // Drones forming "0": 74,73,57,56,40,39,27,26,11,10,4,5
  // =====================================================
  const zeroToOneDrones = [
    drone74,
    drone73,
    drone57,
    drone56,
    drone40,
    drone39,
    drone27,
    drone26,
    drone11,
    drone10,
    drone4,
    drone5,
  ];

  // Original "0" positions at t=10
  const originalZeroPositions = [
    new Vector3(-5.0, 10.0, 10.0), // drone74
    new Vector3(-6.0, 10.0, 10.0), // drone73
    new Vector3(-4.0, 11.0, 10.0), // drone57
    new Vector3(-7.0, 11.0, 10.0), // drone56
    new Vector3(-4.0, 12.0, 10.0), // drone40
    new Vector3(-7.0, 12.0, 10.0), // drone39
    new Vector3(-4.0, 13.0, 10.0), // drone27
    new Vector3(-7.0, 13.0, 10.0), // drone26
    new Vector3(-4.0, 14.0, 10.0), // drone11
    new Vector3(-7.0, 14.0, 10.0), // drone10
    new Vector3(-6.0, 15.0, 10.0), // drone4
    new Vector3(-5.0, 15.0, 10.0), // drone5
  ];

  // "1" formation: vertical line at center X of "0" (-5.5)
  // Spread evenly from Y=10.0 to Y=15.0
  const oneFormationPositions = [
    new Vector3(-4.0, 10.0, 10.0),
    new Vector3(-4.0, 11.0, 10.0),
    new Vector3(-4.0, 12.0, 10.0),
    new Vector3(-4.0, 13.0, 10.0),
    new Vector3(-4.0, 14.0, 10.0),
    new Vector3(-4.0, 15.0, 10.0),
    new Vector3(-5.0, 15.0, 10.0),
    new Vector3(-5.0, 15.0, 10.0),
    new Vector3(-5.0, 15.0, 10.0),
    new Vector3(-6.0, 14.0, 10.0),
    new Vector3(-6.0, 14.0, 10.0),
    new Vector3(-6.0, 14.0, 10.0),
  ];

  // Add keyframes for formation change
  for (let i = 0; i < zeroToOneDrones.length; i++) {
    const drone = zeroToOneDrones[i];

    // Move to original "0" position at t=15
    ctrl.getTimeController().setTime(15);
    ctrl.addPositionKeyFrame(
      drone,
      new PositionKeyFrame(ctrl.getPositionAt(drone, 10), 15),
    );
    // Move to "1" formation at t=20
    ctrl.getTimeController().setTime(20);
    ctrl.addPositionKeyFrame(
      drone,
      new PositionKeyFrame(
        oneFormationPositions[i]
          .clone()
          .add(new Vector3(SHOW_OFFSET_X, SHOW_OFFSET_Y, SHOW_OFFSET_Z)),
        20,
      ),
    );
  }

  //twinkle effect: Farbkeyframe in kurzen Abständen wechseln von Farbe zu Weiß und zurück
  //ungerade und gerade ids jeweils alternierend

  drones.forEach((drone, index) => {
    const droneColor = droneColors.get(drone) || ORANGE;
    const isOdd = (index + 1) % 2 === 1;
    const timeOffset = isOdd ? 0 : TWINKLE_INTERVAL / 2;

    for (let t = 20 + timeOffset; t <= 25; t += TWINKLE_INTERVAL) {
      ctrl.getTimeController().setTime(t);
      // Weiß
      ctrl.addColorKeyFrame(drone, new ColorKeyFrame(WHITE, t));

      const nextT = t + TWINKLE_INTERVAL / 2;
      if (nextT <= 25) {
        ctrl.getTimeController().setTime(nextT);
        // Originale Farbe der Drohne
        ctrl.addColorKeyFrame(drone, new ColorKeyFrame(droneColor, nextT));
      }
    }

    // Stelle sicher, dass die Drohne am Ende des Glitzereffekts ihre ursprüngliche Farbe hat
    ctrl.getTimeController().setTime(26);
    ctrl.addColorKeyFrame(drone, new ColorKeyFrame(droneColor, 26));
  });
  ctrl.getTimeController().setTime(0);
}
