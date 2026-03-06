# 🧪 Integrationstests erklärt - olympian-flight-control

## 📋 Was sind Integrationstests und warum brauchst du sie?

### Das Problem: Komponenten einzeln testen reicht nicht

Stellen dir vor, du hast drei unabhängige Teile:

```
✅ Controller - "Drohne hinzufügen" funktioniert
✅ Repository - "Daten speichern" funktioniert
✅ UI - "Button klick erkennen" funktioniert

❓ Aber arbeiten sie ZUSAMMEN?
```

**Ohne Integrationstests könnten folgende Fehler unbemerkt bleiben:**

- ❌ Controller erstellt Drohne, aber speichert sie nicht ins Repository
- ❌ Undo funktioniert im Controller, aber Controller hat falsche Daten
- ❌ Keyframes werden doppelt gespeichert
- ❌ Nach Löschen einer Drohne sind noch Referenzen vorhanden

**Mit Integrationstests:** Wir prüfen, dass Daten **den kompletten Weg gehen**!

---

## 🏗️ Wie olympian-flight-control aufgebaut ist

```
┌─────────────────────────────────────┐
│  UI-Layer (React Components)        │  ← Der Nutzer interagiert damit
│  "Drohne hinzufügen Button"        │
└────────────┬────────────────────────┘
             │ Nutzer klickt Button
             ↓
┌─────────────────────────────────────┐
│  Controller-Layer (Business Logic)  │  ← Die Intelligenz des Systems
│  - UndoableController               │
│  - TimeController                   │
│  - CollisionHandler                 │
└────────────┬────────────────────────┘
             │ controller.addDrone()
             ↓
┌─────────────────────────────────────┐
│  Repository-Layer (Data Storage)    │  ← Wo Daten leben
│  - ProjectRepository                │
│  - Drohnen-Liste speichern         │
└─────────────────────────────────────┘
```

---

## ✅ Die 32 Integrationstests - Was wird geprüft?

Das Projekt hat **32 funktionierende Tests** in **3 Dateien**:

### 📁 Datei 1: `RepositoryController.integration.test.ts` (8 Tests)

**Bereich:** Controller ↔ Repository Kommunikation

**Diese Tests prüfen:**

| Nr  | Test                            | Was wird gemacht                                 | Was wird überprüft                                 |
| --- | ------------------------------- | ------------------------------------------------ | -------------------------------------------------- |
| 1   | Drohne hinzufügen               | `controller.addDrone()`                          | ✅ Drohne erscheint in `repository.getAllDrones()` |
| 2   | Drohne löschen                  | `controller.removeDrone(droneId)`                | ✅ Drohne ist weg aus Repository                   |
| 3   | Position hinzufügen             | `controller.addPositionKeyFrameNow(id, Vector3)` | ✅ Repository enthält Keyframe                     |
| 4   | Farbe hinzufügen                | `controller.addColorKeyFrameNow(id, Color)`      | ✅ Repository enthält Keyframe                     |
| 5   | Mehrere Änderungen gleichzeitig | Pos + Farbe auf verschiedene Drohnen             | ✅ Repository bleibt konsistent                    |
| 6   | Keyframes zeitlich korrekt      | Position 1, dann Position 2 setzen               | ✅ Keyframes sind chronologisch sortiert           |
| 7   | Mehrere Farb-Keyframes          | 3x Farbe hinzufügen mit Abstand                  | ✅ Alle 3 Farben sind gespeichert                  |

**Beispiel - Test 1:**

```typescript
it("should persist drone data when adding drones", () => {
    // 1. AKTION: Drohne hinzufügen
    const droneId = controller.addDrone();

    // 2. AKTION: Position setzen
    controller.addPositionKeyFrameNow(droneId, new Vector3(1, 2, 3));

    // 3. ÜBERPRÜFUNG: Ist die Drohne wirklich im Repository?
    const drones = repository.getAllDrones();
    expect(drones.length).toBe(1); // ✅ 1 Drohne existiert
    expect(drones[0].getPositionKeyFrames().length).toBeGreaterThan(0); // ✅ Hat eine Position
});
```

---

### 📁 Datei 2: `FullStack.integration.test.ts` (9 Tests)

**Bereich:** Komplette Workflows mit Undo/Redo über alle Schichten

**Diese Tests prüfen:**

| Nr  | Test                       | Was wird gemacht                          | Was wird überprüft                         |
| --- | -------------------------- | ----------------------------------------- | ------------------------------------------ |
| 1   | Kompletter Workflow        | Drohne + Position + Farbe                 | ✅ Alles ist persistiert                   |
| 2   | Multi-Drohnen-Choreografie | 5 Drohnen mit verschiedenen Eigenschaften | ✅ Alle haben Daten                        |
| 3   | Undo/Redo konsistent       | Undo 2x, Redo 2x                          | ✅ State ist nach Undo/Redo identisch      |
| 4   | Undo/Redo auf Keyframes    | Keyframe + Undo + Redo                    | ✅ Keyframe kann rückgängig gemacht werden |
| 5   | Komplexe Modifikationen    | Mehrere Keyframes mit Abständen           | ✅ Alles bleibt konsistent                 |
| 6   | Referenzielle Integrität   | Drohne löschen                            | ✅ Keine verwaisten Referenzen             |
| 7   | Collision Settings         | Radius setzen + neue Operationen          | ✅ Settings bleiben aktiv                  |
| 8   | Daten Export               | 3 Drohnen speichern                       | ✅ Drohnen sind lesbar                     |

**Beispiel - Test 3 (Undo/Redo):**

```typescript
it("should maintain consistency during undo/redo", () => {
    // 1. AKTION: 2 Drohnen hinzufügen
    controller.addDrone();
    controller.addDrone();
    expect(controller.getDrones().length).toBe(2);

    // 2. AKTION: Undo (eine Drohne wird gelöscht)
    controller.undo();

    // 3. ÜBERPRÜFUNG: Controller und Repository sind synchron
    expect(controller.getDrones().length).toBe(1);
    expect(repository.getAllDrones().length).toBe(1); // ✅ WICHTIG: Repository auch aktualisiert!

    // 4. AKTION: Redo
    controller.redo();

    // 5. ÜBERPRÜFUNG: Alles wiedhergestellt
    expect(controller.getDrones().length).toBe(2);
    expect(repository.getAllDrones().length).toBe(2);
});
```

**Warum ist dieser Test wichtig?**  
Er prüft, dass Undo/Redo **nicht nur im Controller funktioniert**, sondern auch das **Repository aktualisiert wird**. Das ist der Kerntest für die Integration!

---

### 📁 Datei 3: `UIController.integration.test.ts` (15 Tests)

**Bereich:** User-Aktionen → Controller → Repository

**Diese Tests prüfen:**

| Nr  | Test                    | Was wird gemacht                  | Was wird überprüft                          |
| --- | ----------------------- | --------------------------------- | ------------------------------------------- |
| 1   | Drohne hinzufügen       | `controller.addDrone()`           | ✅ Controller und Repository haben 1 Drohne |
| 2   | Mehrere Drohnen         | 3x `addDrone()`                   | ✅ Alle sind in Repository                  |
| 3   | Drohne löschen          | `controller.removeDrone(id)`      | ✅ Weg aus Controller und Repository        |
| 4   | Position setzen         | `addPositionKeyFrameNow()`        | ✅ In Repository gespeichert                |
| 5   | Farbe setzen            | `addColorKeyFrameNow()`           | ✅ In Repository gespeichert                |
| 6   | Mehrere Keyframes       | Position mehrfach ändern          | ✅ Alle sind persistiert                    |
| 7   | Undo Drohne             | `controller.undo()` nach addDrone | ✅ Drohne gelöscht                          |
| 8   | Redo Drohne             | `controller.redo()`               | ✅ Drohne wiederhergestellt                 |
| 9   | Mehrfach Undo/Redo      | 2x Undo, 2x Redo                  | ✅ State bleibt konsistent                  |
| 10  | Undo/Redo Keyframe      | Keyframe + Undo + Redo            | ✅ Funktioniert zusammen                    |
| 11  | Kompletter Workflow     | Drohne + Pos + Farbe              | ✅ Alles zusammen funktioniert              |
| 12  | Erstellen + Löschen     | 2 Drohnen, erste löschen          | ✅ Zweite bleibt erhalten                   |
| 13  | Mehrfaches Bearbeiten   | Nutzer ändert mehrfach            | ✅ Alle Änderungen gespeichert              |
| 14  | Controller & Repo sync  | Nach allen Ops                    | ✅ Beide haben identische Drohnen           |
| 15  | Konsistenz nach Löschen | Nach Drohnen-Löschung             | ✅ State ist stabil                         |

**Beispiel - Test 11 (Kompletter Workflow):**

```typescript
it("should handle full drone creation workflow", () => {
    // WORKFLOW: Nutzer erstellt und bearbeitet eine Drohne

    // Schritt 1: Drohne erstellen
    const droneId = controller.addDrone();
    expect(controller.getDrones()).toContain(droneId);

    // Schritt 2: Position setzen
    controller.addPositionKeyFrameNow(droneId, new Vector3(10, 0, 0));

    // Schritt 3: Farbe setzen
    controller.addColorKeyFrameNow(droneId, new Color(1, 0.5, 0));

    // ÜBERPRÜFUNG: Alles wurde korrekt gespeichert
    const drone = repository.getAllDrones()[0];
    expect(drone.getId()).toBe(droneId);
    expect(drone.getPositionKeyFrames().length).toBe(1); // ✅ 1 Position
    expect(drone.getColorKeyFrames().length).toBe(1); // ✅ 1 Farbe
});
```

---

## 🔄 Wie funktionieren die Tests technisch?

### Setup (beforeEach)

```typescript
beforeEach(() => {
    // Jeder Test startet mit FRISCHEM State
    [controller, repository] = makeUndoableController();
});
```

**Was passiert hier?**

- `makeUndoableController()` erstellt einen neuen Controller mit neuem Repository
- Kein Test beeinflusst den anderen - alles ist isoliert
- Es ist wie eine neue App-Instanz für jeden Test

### Der Test-Ablauf (3 Phasen)

```typescript
it("should do something", () => {
    // 1️⃣ ARRANGE (Vorbereitung)
    const droneId = controller.addDrone();

    // 2️⃣ ACT (Aktion)
    controller.addPositionKeyFrameNow(droneId, new Vector3(0, 0, 0));

    // 3️⃣ ASSERT (Überprüfung)
    expect(repository.getAllDrones()[0].getPositionKeyFrames().length).toBe(1);
});
```

---

## 🎯 Was ist das wichtigste Konzept?

### ✅ Datenfluss prüfen

Die Tests prüfen, dass Daten **den kompletten Weg gehen**:

```
User-Aktion
    ↓
Controller-Methode aufgerufen
    ↓
Repository-Methode aufgerufen
    ↓
Daten sind gespeichert
    ↓
Abfrage: repository.getAllDrones() zeigt die Daten ✅
```

**Wenn irgendwo etwas fehlgeschlagen wäre, würde der Test fehlschlagen!**

### ❌ Häufige Fehler, die die Tests FINDEN

1. **Nur Controller aktualisiert, nicht Repository**

    ```typescript
    // ❌ FEHLER: controller.addDrone() erstellt Drohne im Controller
    // aber speichert nicht ins Repository
    expect(repository.getAllDrones().length).toBe(1); // FEHLER!
    ```

2. **Undo funktioniert nicht überall**

    ```typescript
    // ❌ FEHLER: Undo löscht aus Controller, aber nicht aus Repository
    controller.undo();
    expect(repository.getAllDrones().length).toBe(0); // FEHLER!
    ```

3. **Daten werden doppelt gespeichert**
    ```typescript
    // ❌ FEHLER: Keyframe wird 2x statt 1x gespeichert
    controller.addPositionKeyFrameNow(droneId, new Vector3(0, 0, 0));
    expect(repository.getAllDrones()[0].getPositionKeyFrames().length).toBe(1); // FEHLER: ist 2!
    ```

---

## 🚀 Tests ausführen

```bash
# Alle Integration Tests ausführen
npm test -- src/test/integration --watchAll=false

# Nur eine Datei testen
npm test -- src/test/integration/UIController.integration.test.ts

# Watch-Mode (Tests erneut ausführen bei Datei-Änderung)
npm test -- src/test/integration --watch
```

### Output:

```
PASS src/test/integration/UIController.integration.test.ts
PASS src/test/integration/RepositoryController.integration.test.ts
PASS src/test/integration/FullStack.integration.test.ts

Test Suites: 3 passed, 3 total
Tests: 32 passed, 32 total
```

✅ **Grün = Alle Tests passen = Code ist sicher zu deployieren!**

---

## 📊 Test-Übersicht Grafik

```
32 Integrationstests gesamt
│
├─ 8 Tests: Controller ↔ Repository
│  ├─ Daten speichern ✅
│  ├─ Daten löschen ✅
│  ├─ Keyframes speichern ✅
│  └─ Konsistenz ✅
│
├─ 9 Tests: Full Stack Workflows
│  ├─ Komplette Workflows ✅
│  ├─ Undo/Redo ✅
│  └─ Einstellungen ✅
│
└─ 15 Tests: UI → Controller → Repository
   ├─ Einfache Operationen ✅
   ├─ Mehrfache Änderungen ✅
   └─ Undo/Redo ✅
```

---

## 🎓 Zusammenfassung

| Frage                                     | Antwort                                                             |
| ----------------------------------------- | ------------------------------------------------------------------- |
| **Warum brauchen wir Integrationstests?** | Um sicherzustellen, dass Controller und Repository zusammenarbeiten |
| **Was testen sie?**                       | Datenfluss vom Controller ins Repository und Undo/Redo-Konsistenz   |
| **Wie viele Tests?**                      | 32 Tests in 3 Dateien                                               |
| **Was ist der wichtigste Test?**          | Undo/Redo-Tests, die prüfen, dass ALL schichten synchron sind       |
| **Was passiert ohne Tests?**              | Bugs gehen unbemerkt live (z.B. Daten nicht gespeichert)            |
| **Wann laufen die Tests?**                | Vor jedem Commit oder manuell mit `npm test`                        |
