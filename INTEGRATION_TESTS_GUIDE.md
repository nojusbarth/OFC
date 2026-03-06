# Integrationstests-Leitfaden für olympian-flight-control

## 📋 Was sind Integrationstests?

**Integrationstests** prüfen, ob mehrere Komponenten eines Systems **zusammen korrekt funktionieren**. Im Gegensatz zu Unit-Tests (die einzelne Funktionen testen) und E2E-Tests (die komplette Benutzer-Szenarien simulieren), testen Integrationstests die **Kommunikation zwischen Komponenten**.

### Warum Integrationstests für dieses Projekt?

In olympian-flight-control arbeiten drei Schichten zusammen:

```
UI-Aktion (z.B. "Drohne hinzufügen")
    ↓
Controller (Geschäftslogik)
    ↓
Repository (Datenspeicherung)
    ↓
Daten sind persistiert
```

**Problem ohne Integrationstests**:

- Unit-Tests für Controller passen ✅
- Unit-Tests für Repository passen ✅
- Aber: Funktioniert die Zusammenarbeit? ❓

**Lösung mit Integrationstests**:
Wir testen, ob die Daten **korrekt vom Controller ins Repository fließen** und Operationen wie Undo/Redo **konsistent über alle Schichten** funktionieren.

## 🏗️ Drei-Schichten-Architektur

```
┌─────────────────────────────────────┐
│  UI-Layer (React Components)        │  ← User interagiert
├─────────────────────────────────────┤
│  Controller-Layer                   │  ← Geschäftslogik
│  ├── UndoableController (Undo/Redo) │
│  ├── TimeController (Wiedergabe)    │
│  └── CollisionHandler (Kollisionen) │
├─────────────────────────────────────┤
│  Repository-Layer                   │  ← Datenspeicherung
│  └── ProjectRepository              │
└─────────────────────────────────────┘
```

**Datenfluss bei "Drohne hinzufügen":**

1. **UI**: Nutzer klickt "Drohne hinzufügen"
2. **Controller**: `controller.addDrone()` wird aufgerufen
3. **Repository**: Neue Drohne wird in Repository gespeichert
4. **Verifikation**: `repository.getAllDrones()` enthält die neue Drohne

## 🧪 Integrationstests-Strategien

### 1. **Repository + Controller Integration**

Tests, die überprüfen, ob der Controller korrekt mit dem Repository kommuniziert:

```typescript
// src/test/integration/RepositoryController.integration.test.ts
import { Controller } from "../../controller/logic/Controller";
import { ProjectRepository } from "../../repository/ProjectRepository";
import { Settings } from "../../controller/logic/Settings";
import { Vector3 } from "three";

describe("Controller-Repository Integration", () => {
    let controller: Controller;
    let repository: ProjectRepository;

    beforeEach(() => {
        repository = new ProjectRepository();
        const settings = new Settings(repository);
        controller = new Controller(settings, repository);
    });

    it("should persist drone data when adding drones", () => {
        const droneId = controller.addDrone();
        controller.addPositionKeyFrameNow(droneId, new Vector3(1, 2, 3));

        // Repository muss die Daten persistieren
        const drones = repository.getAllDrones();
        expect(drones.length).toBe(1);
        expect(drones[0].positions.length).toBeGreaterThan(0);
    });

    it("should sync undo/redo with repository state", () => {
        const droneId = controller.addDrone();
        const initialCount = repository.getAllDrones().length;

        // Aktion ausführen
        const groupId = controller.createGroup([droneId]);
        expect(repository.getAllDrones().length).toBe(initialCount);

        // Undo sollte State korrekt wiederherstellen
        controller.undo();
        controller.redo();
        expect(repository.getAllDrones().length).toBe(initialCount);
    });

    it("should handle concurrent modifications correctly", async () => {
        const drone1 = controller.addDrone();
        const drone2 = controller.addDrone();

        // Mehrere gleichzeitige Operationen
        controller.addPositionKeyFrameNow(drone1, new Vector3(0, 0, 0));
        controller.addColorKeyFrameNow(drone2, { r: 255, g: 0, b: 0 });

        const drones = repository.getAllDrones();
        expect(drones[0].positions.length).toBeGreaterThan(0);
        expect(drones[1].colors.length).toBeGreaterThan(0);
    });
});
```

### 2. **TimeController + Repository Integration**

Tests für Zeit- und Wiedergabefunktionalität:

```typescript
// src/test/integration/TimeRepository.integration.test.ts
import { Controller } from "../../controller/logic/Controller";
import { ProjectRepository } from "../../repository/ProjectRepository";
import { TimeController } from "../../controller/logic/TimeController";
import { Vector3 } from "three";

describe("TimeController-Repository Integration", () => {
    let controller: Controller;
    let repository: ProjectRepository;
    let timeController: TimeController;

    beforeEach(() => {
        repository = new ProjectRepository();
        const settings = new Settings(repository);
        controller = new Controller(settings, repository);
        timeController = new TimeController();
    });

    it("should load and play saved drone shows", () => {
        const droneId = controller.addDrone();

        // KeyFrames für verschiedene Zeiten setzen
        timeController.setCurrentTime(0);
        controller.addPositionKeyFrame(droneId, new Vector3(0, 0, 0));

        timeController.setCurrentTime(1000); // 1 Sekunde später
        controller.addPositionKeyFrame(droneId, new Vector3(5, 0, 0));

        // Überprüfen ob Timeline richtig aktualisiert
        const keyFrames = repository.getAllDrones()[0].positions;
        expect(keyFrames.length).toBe(2);
        expect(keyFrames[1].timestamp).toBe(1000);
    });

    it("should maintain consistency when scrubbing timeline", () => {
        const droneId = controller.addDrone();
        controller.addPositionKeyFrameNow(droneId, new Vector3(0, 0, 0));

        // Timeline vor und zurück
        timeController.setCurrentTime(2000);
        timeController.setCurrentTime(0);
        timeController.setCurrentTime(1000);

        expect(repository.getAllDrones().length).toBe(1);
    });
});
```

### 3. **UI + Controller Integration** (mit React Testing Library)

Tests für UI-Komponenten, die den Controller verwenden:

```typescript
// src/test/integration/UI.Controller.integration.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Controller } from "../../controller/logic/Controller";
import { ProjectRepository } from "../../repository/ProjectRepository";
import { Settings } from "../../controller/logic/Settings";

// Beispiel-Komponente (würde in src/view/ existieren)
interface DroneEditorProps {
  controller: Controller;
}

const DroneEditor = ({ controller }: DroneEditorProps) => {
  const [drones, setDrones] = React.useState(controller.getDrones());

  const handleAddDrone = () => {
    const droneId = controller.addDrone();
    setDrones(controller.getDrones());
  };

  return (
    <div>
      <button onClick={handleAddDrone}>Add Drone</button>
      <ul>
        {drones.map((id) => (
          <li key={id}>Drone {id}</li>
        ))}
      </ul>
    </div>
  );
};

describe("DroneEditor-Controller Integration", () => {
  it("should add drone when button is clicked", async () => {
    const repository = new ProjectRepository();
    const settings = new Settings(repository);
    const controller = new Controller(settings, repository);

    render(<DroneEditor controller={controller} />);
    const button = screen.getByText("Add Drone");

    await userEvent.click(button);

    expect(controller.getDrones().length).toBe(1);
    expect(screen.getByText("Drone 0")).toBeInTheDocument();
  });

  it("should sync UI with controller state changes", async () => {
    const repository = new ProjectRepository();
    const settings = new Settings(repository);
    const controller = new Controller(settings, repository);

    const { rerender } = render(<DroneEditor controller={controller} />);

    const button = screen.getByText("Add Drone");
    await userEvent.click(button);
    await userEvent.click(button);

    // UI sollte sich mit Controller synchronisieren
    await waitFor(() => {
      expect(controller.getDrones().length).toBe(2);
    });
  });
});
```

### 4. **Full Stack Integration** (UI → Controller → Repository)

End-to-End Workflows testen:

```typescript
// src/test/integration/FullStack.integration.test.ts
import { makeUndoableController } from "../controller/testHelper";
import { Vector3 } from "three";

describe("Full Stack Integration", () => {
    it("should handle complete drone creation workflow", () => {
        const [controller, repository] = makeUndoableController();

        // 1. Drohne erstellen
        const droneId = controller.addDrone();
        expect(controller.getDrones()).toContain(droneId);

        // 2. Position setzen
        controller.addPositionKeyFrameNow(droneId, new Vector3(0, 0, 0));

        // 3. Farbe setzen
        controller.addColorKeyFrameNow(droneId, { r: 255, g: 0, b: 0 });

        // 4. In Gruppe hinzufügen
        const groupId = controller.createGroup([droneId]);

        // 5. Verifizieren dass alles persistiert ist
        const drones = repository.getAllDrones();
        expect(drones.length).toBe(1);
        expect(drones[0].positions.length).toBeGreaterThan(0);
        expect(drones[0].colors.length).toBeGreaterThan(0);
    });

    it("should handle show save and load", () => {
        const [controller, repository] = makeUndoableController();

        // Komplexe Drohnen-Show erstellen
        for (let i = 0; i < 3; i++) {
            const droneId = controller.addDrone();
            controller.addPositionKeyFrameNow(
                droneId,
                new Vector3(i * 5, 0, 0),
            );
        }

        // Show speichern und laden
        const savedData = JSON.stringify(repository.getAllDrones());
        const loadedData = JSON.parse(savedData);

        expect(loadedData.length).toBe(3);
        expect(loadedData[1].id).toBeDefined();
    });

    it("should maintain consistency during undo/redo", () => {
        const [controller, repository] = makeUndoableController();

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

    it("should handle collision detection during playback", async () => {
        const [controller, repository] = makeUndoableController();
        controller.getSettings().setCollisionRadius(5);

        const drone1 = controller.addDrone();
        const drone2 = controller.addDrone();

        controller.addPositionKeyFrameNow(drone1, new Vector3(0, 0, 0));
        controller.addPositionKeyFrameNow(drone2, new Vector3(2, 0, 0));

        let collisionDetected = false;
        controller.getCollisionEvent().register(() => {
            collisionDetected = true;
        });

        await new Promise((resolve) => setTimeout(resolve, 10));
        expect(collisionDetected).toBe(true);
    });
});
```

## 🚀 Ausführung von Integrationstests

### Test-Struktur anlegen:

```bash
mkdir -p src/test/integration
```

### Tests ausführen:

```bash
# Nur Integrationstests
npm test -- src/test/integration

# Mit Coverage
npm test -- src/test/integration --coverage

# Watch Mode
npm test -- src/test/integration --watch
```

## 📊 Best Practices

### ✅ Dos

- **Setup mit `beforeEach`**: Frischer State für jeden Test
- **Aussagekräftige Namen**: `should_handle_X_when_Y_happens`
- **Test-Helper verwenden**: `makeBasicController()`, `makeUndoableController()`
- **Temporale Tests**: Async-Operationen mit `await` und `flushQueue()`
- **Assertions mehrschichtig**: UI → Controller → Repository

### ❌ Don'ts

- Keine Abhängigkeiten zwischen Tests
- Keine echten HTTP-Requests (mocking verwenden)
- Keine langen Timeouts (max 5000ms)
- Keine direkte DB-Manipulation außer in Tests

## 🔧 Test-Utilities erweitern

```typescript
// src/test/integration/integrationTestHelper.ts
import { IController } from "../../controller/interface/IController";
import { IProjectRepository } from "../../repository/IProjectRepository";
import { makeUndoableController } from "../controller/testHelper";
import { Vector3 } from "three";

export function createTestDroneShow(
    droneCount: number = 3,
    withCollisions: boolean = false,
): [IController, IProjectRepository] {
    const [controller, repository] = makeUndoableController();

    if (withCollisions) {
        controller.getSettings().setCollisionRadius(5);
    }

    for (let i = 0; i < droneCount; i++) {
        const droneId = controller.addDrone();
        const x = withCollisions ? i * 3 : i * 10;
        controller.addPositionKeyFrameNow(droneId, new Vector3(x, 0, 0));
    }

    return [controller, repository];
}

export async function flushAsyncQueue(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 0));
}
```

## 📈 Test-Weihnachtsbaum

```
        /\
       /  \   E2E Tests (Playwright)
      /    \  - Vollständige User Journeys
     /______\
      /    \   Integration Tests (Jest)
     /      \ - Controller + Repository
    /________\
     /      \   Unit Tests (Jest)
    /        \ - Einzelne Funktionen
   /__________\
```

## 🎯 Zu testende Szenarien

1. **CRUD Operationen**: Drohnen hinzufügen/entfernen/bearbeiten
2. **Persistierung**: Daten korrekt speichern und laden
3. **State Management**: Undo/Redo funktioniert
4. **Validierung**: Ungültige Eingaben werden abgelehnt
5. **Fehlerbehandlung**: Exceptions richtig geworfen
6. **Kollisionen**: Warnung bei Kollisionen
7. **Zeitsynchronisation**: Timeline mit Daten konsistent

## 📚 Weitere Ressourcen

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright für E2E Tests](https://playwright.dev/)
