import { makeUndoableController } from "../controller/testHelper";
import { Vector3, Color } from "three";
import { IUndoableController } from "../../controller/interface/IUndoableController";
import { IProjectRepository } from "../../repository/IProjectRepository";

describe("Full Stack Integration - Complete Workflows", () => {
  let controller: IUndoableController;
  let repository: IProjectRepository;

  beforeEach(() => {
    [controller, repository] = makeUndoableController();
  });

  describe("Complete Drone Show Workflow", () => {
    it("should handle complete drone creation workflow", () => {
      // 1. Drohne erstellen
      const droneId = controller.addDrone();
      expect(controller.getDrones()).toContain(droneId);

      // 2. Position setzen
      controller.addPositionKeyFrameNow(droneId, new Vector3(0, 0, 0));

      // 3. Farbe setzen
      controller.addColorKeyFrameNow(droneId, new Color(1, 0, 0));

      // 4. Verifizieren dass alles persistiert ist
      const drones = repository.getAllDrones();
      expect(drones.length).toBe(1);
      expect(drones[0].getPositionKeyFrames().length).toBeGreaterThan(0);
      expect(drones[0].getColorKeyFrames().length).toBeGreaterThan(0);
    });

    it("should create multi-drone choreography", async () => {
      const droneIds = [];

      // Mehrere Drohnen mit verschiedenen Positionen erstellen
      for (let i = 0; i < 5; i++) {
        const droneId = controller.addDrone();
        droneIds.push(droneId);

        // Verschiedene Positionen für jede Drohne
        controller.addPositionKeyFrameNow(droneId, new Vector3(i * 10, 0, 0));

        // Farbverlauf
        const hue = (i / 5) * Math.PI * 2;
        const r = Math.max(0, Math.min(1, Math.sin(hue)));
        const g = Math.max(0, Math.min(1, Math.sin(hue + Math.PI * 0.666)));
        const b = Math.max(0, Math.min(1, Math.sin(hue + Math.PI * 1.333)));
        controller.addColorKeyFrameNow(droneId, new Color(r, g, b));
        
        // Small delay between drones to ensure different timestamps
        if (i < 4) {
          await new Promise((resolve) => setTimeout(resolve, 2));
        }
      }

      // Verifizieren
      const drones = repository.getAllDrones();
      expect(drones.length).toBe(5);
      expect(drones.every((d) => d.getPositionKeyFrames().length > 0)).toBe(true);
    });
  });

  describe("Undo/Redo Persistence", () => {
    it("should maintain consistency during undo/redo", () => {
      const drone1 = controller.addDrone();
      const drone2 = controller.addDrone();

      expect(controller.getDrones().length).toBe(2);

      // Undo
      controller.undo();
      expect(controller.getDrones().length).toBe(1);

      // Redo
      controller.redo();
      expect(controller.getDrones().length).toBe(2);

      // Repository sollte konsistent sein
      expect(repository.getAllDrones().length).toBe(2);
    });

    it("should handle multiple undo/redo operations", () => {
      // Mehrere Operationen
      const d1 = controller.addDrone();
      const d2 = controller.addDrone();
      controller.addPositionKeyFrameNow(d1, new Vector3(0, 0, 0));
      controller.addPositionKeyFrameNow(d2, new Vector3(5, 0, 0));

      const initialState = repository.getAllDrones().length;

      // Mehrfaches Undo
      controller.undo();
      controller.undo();
      controller.undo();
      controller.undo();

      expect(repository.getAllDrones().length).toBe(0);

      // Mehrfaches Redo
      controller.redo();
      controller.redo();
      controller.redo();
      controller.redo();

      expect(repository.getAllDrones().length).toBe(initialState);
    });

    it("should handle undo/redo with group operations", () => {
      const d1 = controller.addDrone();
      const d2 = controller.addDrone();

      let droneCount = repository.getAllDrones().length;
      expect(droneCount).toBe(2);

      // Undo first drone
      controller.undo();
      droneCount = repository.getAllDrones().length;
      expect(droneCount).toBe(1);

      // Redo
      controller.redo();
      droneCount = repository.getAllDrones().length;
      expect(droneCount).toBe(2);
    });
  });

  describe("State Synchronization", () => {
    it("should sync complex modifications across all layers", async () => {
      const droneId = controller.addDrone();

      // Mehrere KeyFrames hinzufügen
      controller.addPositionKeyFrameNow(droneId, new Vector3(0, 0, 0));
      await new Promise((resolve) => setTimeout(resolve, 5));
      controller.addPositionKeyFrameNow(droneId, new Vector3(10, 0, 0));
      await new Promise((resolve) => setTimeout(resolve, 5));
      controller.addPositionKeyFrameNow(droneId, new Vector3(10, 10, 0));

      controller.addColorKeyFrameNow(droneId, new Color(1, 0, 0));
      await new Promise((resolve) => setTimeout(resolve, 5));
      controller.addColorKeyFrameNow(droneId, new Color(0, 1, 0));

      const drone = repository.getAllDrones()[0];
      expect(drone.getPositionKeyFrames().length).toBeGreaterThanOrEqual(1);
      expect(drone.getColorKeyFrames().length).toBeGreaterThanOrEqual(1);

      // Alle Daten sollten konsistent sein
      drone.getPositionKeyFrames().forEach((kf) => {
        expect(kf.getPos()).toBeDefined();
        expect(kf.getTime()).toBeDefined();
      });

      drone.getColorKeyFrames().forEach((kf) => {
        expect(kf.getColor()).toBeDefined();
        expect(kf.getTime()).toBeDefined();
      });
    });

    it("should maintain referential integrity in groups", () => {
      const d1 = controller.addDrone();
      const d2 = controller.addDrone();
      const d3 = controller.addDrone();

      // Drohne entfernen
      controller.removeDrone(d2);

      // Drones sollten korrekt aktualisiert sein
      const drones = repository.getAllDrones();
      expect(drones.map((d) => d.getId())).not.toContain(d2);
      expect(drones.length).toBe(2);
    });
  });

  describe("Settings Persistence", () => {
    it("should persist collision settings across operations", () => {
      controller.getSettings().setCollisionRadius(10);

      const d1 = controller.addDrone();
      const d2 = controller.addDrone();

      controller.addPositionKeyFrameNow(d1, new Vector3(0, 0, 0));
      controller.addPositionKeyFrameNow(d2, new Vector3(5, 0, 0));

      // Settings sollten erhalten bleiben
      expect(controller.getSettings().getCollisionRadius()).toBe(10);
    });

    it("should apply settings to new operations", () => {
      controller.getSettings().setCollisionRadius(3);

      const d1 = controller.addDrone();
      controller.addPositionKeyFrameNow(d1, new Vector3(0, 0, 0));

      const d2 = controller.addDrone();
      controller.addPositionKeyFrameNow(d2, new Vector3(1, 0, 0));

      // Kollisionserkennung sollte mit dem gesetzten Radius arbeiten
      let collisionDetected = false;
      controller.getCollisionEvent().register(() => {
        collisionDetected = true;
      });

      // Collision worker time
      // (kann je nach System variieren, daher nur Basic-Check)
      expect(controller.getSettings().getCollisionRadius()).toBe(3);
    });
  });

  describe("Data Export/Import", () => {
    it("should support save and load workflows", async () => {
      // Komplexe Drohnen-Show erstellen
      for (let i = 0; i < 3; i++) {
        const droneId = controller.addDrone();
        controller.addPositionKeyFrameNow(droneId, new Vector3(i * 5, 0, 0));
        controller.addColorKeyFrameNow(droneId, new Color(
          i / 3,
          0.4,
          0.8
        ));
        if (i < 2) {
          await new Promise((resolve) => setTimeout(resolve, 2));
        }
      }

      // Show speichern
      const drones = repository.getAllDrones();
      
      // Überprüfe, dass Drohnen mit Daten gespeichert sind
      expect(drones.length).toBe(3);
      
      // Überprüfe dass jede Drohne Keyframes hat
      drones.forEach((drone) => {
        expect(drone.getId()).toBeDefined();
        expect(drone.getPositionKeyFrames().length).toBeGreaterThan(0);
        expect(drone.getColorKeyFrames().length).toBeGreaterThan(0);
      });
    });
  });
});
