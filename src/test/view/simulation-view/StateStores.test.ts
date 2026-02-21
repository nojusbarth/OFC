import { DroneStateStore } from "../../../view/simulation-view/state/DroneStateStore";
import { LightStateStore } from "../../../view/simulation-view/state/LightStateStore";
import { PathStateStore } from "../../../view/simulation-view/state/PathStateStore";
import { DroneFrame } from "../../../view/simulation-view/state/DroneFrame";
import { LightFrame } from "../../../view/simulation-view/state/LightFrame";
import { PathFrame } from "../../../view/simulation-view/state/PathFrame";
import { Vector3 } from "three";

//KI GENERIERT

describe("DroneStateStore", () => {
  it("should bind state setter correctly", () => {
    const store = new DroneStateStore();
    const mockSetter = jest.fn();

    store.bindState(mockSetter);

    // Wenn erfolgreich gebunden, sollte update funktionieren
    store.update(() => {});
    expect(mockSetter).toHaveBeenCalled();
  });

  it("should log error when updating without bound state", () => {
    const store = new DroneStateStore();
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    store.update(() => {});

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "DroneStateStore nicht an React State gebunden",
    );

    consoleErrorSpy.mockRestore();
  });

  it("should apply mutator to draft correctly", () => {
    const store = new DroneStateStore();
    let capturedUpdater: any = null;
    const mockSetter = jest.fn((updater) => {
      capturedUpdater = updater;
    });

    store.bindState(mockSetter);

    const prevFrame: DroneFrame = {
      dronePositions: new Map([[1, new Vector3(0, 0, 0)]]),
      droneColors: new Map([[1, "#ff0000"]]),
      outlineColors: new Map([[1, ["#000000", "#ffffff"]]]),
    };

    store.update((draft) => {
      draft.dronePositions.set(2, new Vector3(1, 1, 1));
      draft.droneColors.set(2, "#00ff00");
    });

    const result = capturedUpdater(prevFrame);

    expect(result.dronePositions.get(2)).toEqual(new Vector3(1, 1, 1));
    expect(result.droneColors.get(2)).toBe("#00ff00");
  });

  it("should create deep copy of maps", () => {
    const store = new DroneStateStore();
    let capturedUpdater: any = null;
    const mockSetter = jest.fn((updater) => {
      capturedUpdater = updater;
    });

    store.bindState(mockSetter);

    const prevFrame: DroneFrame = {
      dronePositions: new Map([[1, new Vector3(5, 5, 5)]]),
      droneColors: new Map([[1, "#ff0000"]]),
      outlineColors: new Map([[1, ["#000000", "#ffffff"]]]),
    };

    store.update((draft) => {
      draft.dronePositions.set(1, new Vector3(10, 10, 10));
    });

    const result = capturedUpdater(prevFrame);

    // Original sollte unverändert sein
    expect(prevFrame.dronePositions.get(1)).toEqual(new Vector3(5, 5, 5));
    // Neues sollte geändert sein
    expect(result.dronePositions.get(1)).toEqual(new Vector3(10, 10, 10));
  });

  it("should handle multiple updates", () => {
    const store = new DroneStateStore();
    const mockSetter = jest.fn();

    store.bindState(mockSetter);

    store.update(() => {});
    store.update(() => {});
    store.update(() => {});

    expect(mockSetter).toHaveBeenCalledTimes(3);
  });
});

describe("LightStateStore", () => {
  it("should bind state setter correctly", () => {
    const store = new LightStateStore();
    const mockSetter = jest.fn();

    store.bindState(mockSetter);

    store.update(() => {});
    expect(mockSetter).toHaveBeenCalled();
  });

  it("should log error when updating without bound state", () => {
    const store = new LightStateStore();
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    store.update(() => {});

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "LightStateStore nicht an React State gebunden",
    );

    consoleErrorSpy.mockRestore();
  });

  it("should apply mutator to draft correctly", () => {
    const store = new LightStateStore();
    let capturedUpdater: any = null;
    const mockSetter = jest.fn((updater) => {
      capturedUpdater = updater;
    });

    store.bindState(mockSetter);

    const prevFrame: LightFrame = {
      intensity: 1.0,
      color: "#ffffff",
      position: new Vector3(0, 10, 0),
      skyTexturePath: "./assets/sky/noon.hdr",
    };

    store.update((draft) => {
      draft.intensity = 0.5;
      draft.color = "#ff0000";
    });

    const result = capturedUpdater(prevFrame);

    expect(result.intensity).toBe(0.5);
    expect(result.color).toBe("#ff0000");
  });

  it("should return previous frame when values are unchanged (optimization)", () => {
    const store = new LightStateStore();
    let capturedUpdater: any = null;
    const mockSetter = jest.fn((updater) => {
      capturedUpdater = updater;
    });

    store.bindState(mockSetter);

    const prevFrame: LightFrame = {
      intensity: 1.0,
      color: "#ffffff",
      position: new Vector3(0, 10, 0),
      skyTexturePath: "./assets/sky/noon.hdr",
    };

    store.update(() => {
      // Keine Änderungen
    });

    const result = capturedUpdater(prevFrame);

    // Sollte dasselbe Objekt zurückgeben (nicht ein neues)
    expect(result).toBe(prevFrame);
  });

  it("should return new frame when intensity changes", () => {
    const store = new LightStateStore();
    let capturedUpdater: any = null;
    const mockSetter = jest.fn((updater) => {
      capturedUpdater = updater;
    });

    store.bindState(mockSetter);

    const prevFrame: LightFrame = {
      intensity: 1.0,
      color: "#ffffff",
      position: new Vector3(0, 10, 0),
      skyTexturePath: "./assets/sky/noon.hdr",
    };

    store.update((draft) => {
      draft.intensity = 0.8;
    });

    const result = capturedUpdater(prevFrame);

    expect(result).not.toBe(prevFrame);
    expect(result.intensity).toBe(0.8);
  });

  it("should return new frame when color changes", () => {
    const store = new LightStateStore();
    let capturedUpdater: any = null;
    const mockSetter = jest.fn((updater) => {
      capturedUpdater = updater;
    });

    store.bindState(mockSetter);

    const prevFrame: LightFrame = {
      intensity: 1.0,
      color: "#ffffff",
      position: new Vector3(0, 10, 0),
      skyTexturePath: "./assets/sky/noon.hdr",
    };

    store.update((draft) => {
      draft.color = "#ff0000";
    });

    const result = capturedUpdater(prevFrame);

    expect(result).not.toBe(prevFrame);
    expect(result.color).toBe("#ff0000");
  });

  it("should return new frame when position changes", () => {
    const store = new LightStateStore();
    let capturedUpdater: any = null;
    const mockSetter = jest.fn((updater) => {
      capturedUpdater = updater;
    });

    store.bindState(mockSetter);

    const prevFrame: LightFrame = {
      intensity: 1.0,
      color: "#ffffff",
      position: new Vector3(0, 10, 0),
      skyTexturePath: "./assets/sky/noon.hdr",
    };

    store.update((draft) => {
      draft.position.x = 5;
    });

    const result = capturedUpdater(prevFrame);

    expect(result).not.toBe(prevFrame);
    expect(result.position.x).toBe(5);
  });

  it("should return new frame when skyTexturePath changes", () => {
    const store = new LightStateStore();
    let capturedUpdater: any = null;
    const mockSetter = jest.fn((updater) => {
      capturedUpdater = updater;
    });

    store.bindState(mockSetter);

    const prevFrame: LightFrame = {
      intensity: 1.0,
      color: "#ffffff",
      position: new Vector3(0, 10, 0),
      skyTexturePath: "./assets/sky/noon.hdr",
    };

    store.update((draft) => {
      draft.skyTexturePath = "./assets/sky/night.hdr";
    });

    const result = capturedUpdater(prevFrame);

    expect(result).not.toBe(prevFrame);
    expect(result.skyTexturePath).toBe("./assets/sky/night.hdr");
  });
});

describe("PathStateStore", () => {
  it("should bind state setter correctly", () => {
    const store = new PathStateStore();
    const mockSetter = jest.fn();

    store.bindState(mockSetter);

    store.update(() => {});
    expect(mockSetter).toHaveBeenCalled();
  });

  it("should log error when updating without bound state", () => {
    const store = new PathStateStore();
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    store.update(() => {});

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "PathStateStore nicht an React State gebunden",
    );

    consoleErrorSpy.mockRestore();
  });

  it("should apply mutator to draft correctly", () => {
    const store = new PathStateStore();
    let capturedUpdater: any = null;
    const mockSetter = jest.fn((updater) => {
      capturedUpdater = updater;
    });

    store.bindState(mockSetter);

    const prevFrame: PathFrame = {
      pathPositions: new Map([[1, [new Vector3(0, 0, 0)]]]),
      pathColors: new Map([[1, "#ff0000"]]),
    };

    store.update((draft) => {
      draft.pathPositions.set(2, [new Vector3(1, 1, 1), new Vector3(2, 2, 2)]);
      draft.pathColors.set(2, "#00ff00");
    });

    const result = capturedUpdater(prevFrame);

    expect(result.pathPositions.get(2)).toEqual([
      new Vector3(1, 1, 1),
      new Vector3(2, 2, 2),
    ]);
    expect(result.pathColors.get(2)).toBe("#00ff00");
  });

  it("should handle multiple paths correctly", () => {
    const store = new PathStateStore();
    let capturedUpdater: any = null;
    const mockSetter = jest.fn((updater) => {
      capturedUpdater = updater;
    });

    store.bindState(mockSetter);

    const prevFrame: PathFrame = {
      pathPositions: new Map([
        [1, [new Vector3(0, 0, 0)]],
        [2, [new Vector3(1, 1, 1)]],
        [3, [new Vector3(2, 2, 2)]],
      ]),
      pathColors: new Map([
        [1, "#ff0000"],
        [2, "#00ff00"],
        [3, "#0000ff"],
      ]),
    };

    store.update((draft) => {
      draft.pathColors.set(2, "#ffff00");
    });

    const result = capturedUpdater(prevFrame);

    expect(result.pathColors.get(1)).toBe("#ff0000");
    expect(result.pathColors.get(2)).toBe("#ffff00");
    expect(result.pathColors.get(3)).toBe("#0000ff");
  });

  it("should handle empty maps", () => {
    const store = new PathStateStore();
    let capturedUpdater: any = null;
    const mockSetter = jest.fn((updater) => {
      capturedUpdater = updater;
    });

    store.bindState(mockSetter);

    const prevFrame: PathFrame = {
      pathPositions: new Map(),
      pathColors: new Map(),
    };

    store.update((draft) => {
      draft.pathPositions.set(1, [new Vector3(0, 0, 0)]);
      draft.pathColors.set(1, "#ff0000");
    });

    const result = capturedUpdater(prevFrame);

    expect(result.pathPositions.get(1)).toEqual([new Vector3(0, 0, 0)]);
    expect(result.pathColors.get(1)).toBe("#ff0000");
  });

  it("should handle multiple updates", () => {
    const store = new PathStateStore();
    const mockSetter = jest.fn();

    store.bindState(mockSetter);

    store.update(() => {});
    store.update(() => {});
    store.update(() => {});

    expect(mockSetter).toHaveBeenCalledTimes(3);
  });
});
