# Übersicht über Änderungen in der Implementierungsphase

## View

### Startpage

### Editor

- **Generell**: Den Komponenten wird zur übersicht und erweiterbarkeit der gesamte Controller übergeben
- **Generell**: Hinzufügen eines SettingsButtonComponent welcher zwischen DroneEditor und Settings switcht

- **SettingsComponent**: _droneDistance_ geändert zu _collisionRadius_
- **EditorComponent**: simulation-view szene im Interface hinzugefügt


### Simulation View

## Controller

### IController

- **addPositionKeyFrame**: umbenannt zu `addPositionKeyFrameNow(id, position)` - erstellt KeyFrame zur aktuellen Zeit. Neue Methode `addPositionKeyFrame(id, keyFrame)` hinzugefügt, die ein vollständiges KeyFrame-Objekt akzeptiert
- **addColorKeyFrame**: umbenannt zu `addColorKeyFrameNow(id, color)` - erstellt KeyFrame zur aktuellen Zeit. Neue Methode `addColorKeyFrame(id, keyFrame)` hinzugefügt, die ein vollständiges KeyFrame-Objekt akzeptiert
- **getDroneEvent**: umbenannt zu `getDroneChangedEvent()`, gibt jetzt ein Event und nicht für jede einzelne Drohne eins
- **getDroneSelectEvent**: Rückgabetyp geändert von `OFCEvent<number>` zu `OFCEvent<number[]>` (gibt alle ausgewählten Drohnen zurück statt nur eine)
- **getCollisions**: Neue Methode hinzugefügt, die die aktuellen Kollisionen zurückgibt

### ISettings

- **setDroneDistance**: umbenannt zu `setCollisionRadius()`
- **getDroneDistance**: umbenannt zu `getCollisionRadius()`
- **getDroneDistanceChangedEvent**: umbenannt zu `getCollisionRadiusChangedEvent()`

### ITimeController

- **getAnimationRunning**: Neue Methode hinzugefügt, die den aktuellen Animationsstatus zurückgibt

### IProject

- **loadProject**: Signatur geändert von `loadProject(data: string): boolean` zu `loadProject(file: File, onCompleted: (result: Result<null>) => void): void` - asynchrone Verarbeitung mit Callback
- **newProject**: Neue Methode zum Erstellen eines neuen, leeren Projekts hinzugefügt
- **loadLastProject**: Neue Methode zum Laden des zuletzt gespeicherten Projekts aus dem lokalen Speicher hinzugefügt
- **canLoadLastProject**: Neue Methode zum Prüfen, ob ein zuletzt gespeichertes Projekt vorhanden ist, hinzugefügt
- **getProjectLoadedEvent**: Neues Event hinzugefügt, das beim erfolgreichen Laden eines Projekts ausgelöst wird

### Event System

- **Event\<T\>**: umbenannt zu `OFCEvent<T>` (Namenskonfilkt mit Bibliothek)

## Repository
**Pakete**\
Ein neues Paket `entity` wurde hinzugefügt, um projektübergreifenden Klassen unterzubringen.

**IProjectRepository**:
- `maxTime` geändert zu `endTime` (auch in den Funktionen)

*Funktionen*
- `load(input: File|string|null, onFinished: (result: Result<boolean>) => void): void`: hinzugefügt, um das Repository laden zu können.
- `loadLastProject(): Result<boolean>`: Lädt das letzte hinterlegte Projekt aus dem LocalStorage des Browsers.
- `getNextDroneId(): number`: Hinzugefügt, um dem Controller die nächste Drohnen-Id rückmelden zu können.
- `exportConfig(): string`: Hinzugefügt, um die Projektkonfiguration als Json-String ausgeben zu können.
- `saveToLocalStorage(): void`: Hinzugefügt, um ein Projekt in den LocalStorage des Browsers zu speichern.

**RepositoryConstants**:
- `FILE_VERSION`: Hinzugefügt, um die aktuelle Dateienversion global festzulegen.
- `LAST_PROJECT_DATA_KEY`: Hinzugefügt, um den Schlüssel für den LocalStorage des letzten Projekts global bereitzustellen.

**Result\<T>**:
Neue Klasse hinzugefügt, um einen Rückgabewert mit einer Aussage zu verknüpfen.

**ProjectConfig**:\
Neues Interface für den JSON-Parser der die Projekt Konfiguration definiert. 

*Funktionen*:
- `mapToJsonDrones(drones: Array<IDrone>): Array<JsonDrone>`: Wandelt die Drohnen in JSON-Drohnen um.
- `parseJsonToDrones(drones: Array<JsonDrone>): Array<IDrone>`: Wandelt JSON-Drohnen in Drohnen um.

Diese Funktionen sind notwendig durch die direkte Verwendung der JsonDrone als Interface für die Definition der JSON-Formate im Projekt.

**WaypointAtTime**:
Neues Interface für den JSON-Parser der das WaypointAtTime Format definiert.
