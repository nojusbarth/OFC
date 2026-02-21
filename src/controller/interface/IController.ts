import type { Vector3, Color } from "three";
import type { PositionKeyFrame } from "../../repository/entity/PositionKeyFrame";
import type { ColorKeyFrame } from "../../repository/entity/ColorKeyFrame";
import type { ISettings } from "./ISettings";
import type { ITimeController } from "./ITimeController";
import type { IProject } from "./IProject";
import type { OFCEvent } from "./OFCEvent";
import { DroneGroupManager } from "../logic/GroupManager";
import { DroneGroup } from "../../repository/grouping/DroneGroup";
// Kommentare von KI verfasst
/**
 * Hauptcontroller-Schnittstelle zur Verwaltung von Drohnenvorgängen.
 * Bietet Zugriff auf Einstellungen, Zeitkontrolle, Projektverwaltung und Drohnenbearbeitung.
 */
export interface IController {
  /**
   * Ruft den Controller für die Anwendungseinstellungen ab.
   * @returns Die Einstellungsinstanz
   */
  getSettings(): ISettings;

  /**
   * Ruft den Zeitkontroller für die Wiedergabekontrolle ab.
   * @returns Die Zeitkontroller-Instanz
   */
  getTimeController(): ITimeController;

  /**
   * Ruft den Projektcontroller ab.
   * @returns Die Projektinstanz
   */
  getProject(): IProject;

  /**
   * Fügt eine neue Drohne zum System hinzu.
   * @returns Die eindeutige ID der neu erstellten Drohne
   */
  addDrone(): number;

  /**
   * Entfernt eine Drohne aus dem System.
   * @param id - Die eindeutige ID der zu entfernenden Drohne
   */
  removeDrone(id: number): void;

  /**
   * Ruft alle Drohnen-IDs im System in aufsteigender Reihenfolge ab.
   * @returns Array von Drohnen-IDs
   */
  getDrones(): number[];

  /**
   * Wählt eine Drohne zur Bearbeitung oder Manipulation aus.
   * @param id - Die eindeutige ID der auszuwählenden Drohne
   */
  selectDrone(id: number): void;

  /**
   * Hebt die Auswahl einer zuvor ausgewählten Drohne auf.
   * @param id - Die eindeutige ID der abzuwählenden Drohne
   */
  unselectDrone(id: number): void;

  /**
   * Ruft alle aktuell ausgewählten Drohnen-IDs ab.
   * @returns Array von ausgewählten Drohnen-IDs
   */
  getSelectedDrones(): number[];

  /**
   * Ruft alle Positions Keyframes für eine bestimmte Drohne ab.
   * @param id - Die eindeutige ID der Drohne
   * @returns Array von Positions Keyframes
   */
  getPositionKeyFrames(id: number): PositionKeyFrame[];

  /**
   * Ruft die Position einer Drohne zur aktuellen Zeit ab.
   * @param id - Die eindeutige ID der Drohne
   * @returns Aktueller 3D-Positionsvektor
   */
  getPosition(id: number): Vector3;

  /**
   * Ruft die interpolierte Position einer Drohne zu einem bestimmten Zeitpunkt ab.
   * @param id - Die eindeutige ID der Drohne
   * @param time - Der abzufragende Zeitpunkt
   * @returns Interpolierter 3D-Positionsvektor zum angegebenen Zeitpunkt
   */
  getPositionAt(id: number, time: number): Vector3;

  /**
   * Fügt ein Positions Keyframe zum Pfad der Drohne zur aktuellen Zeit hinzu.
   * @param id - Die eindeutige ID der Drohne
   * @param position - Der 3D-Positionsvektor der Drohne
   */
  addPositionKeyFrameNow(id: number, position: Vector3): void;

  /**
   * Fügt ein Positions Keyframe zum Pfad einer Drohne hinzu.
   * @param id - Die eindeutige ID der Drohne
   * @param keyFrame - Das hinzuzufügende Positions Keyframe
   */
  addPositionKeyFrame(id: number, keyFrame: PositionKeyFrame): void;

  /**
   * Entfernt ein Positions Keyframe aus dem Pfad einer Drohne.
   * @param id - Die eindeutige ID der Drohne
   * @param keyFrame - Das zu entfernende Positions Keyframe
   */
  removePositionKeyFrame(id: number, keyFrame: PositionKeyFrame): void;

  /**
   * Ruft alle Farb Keyframes für eine bestimmte Drohne ab.
   * @param id - Die eindeutige ID der Drohne
   * @returns Array von Farb Keyframes
   */
  getColorKeyFrames(id: number): ColorKeyFrame[];

  /**
   * Ruft die aktuelle Farbe einer Drohne ab.
   * @param id - Die eindeutige ID der Drohne
   * @returns Aktuelle Farbe
   */
  getColor(id: number): Color;

  /**
   * Ruft die interpolierte Farbe einer Drohne zu einem bestimmten Zeitpunkt ab.
   * @param id - Die eindeutige ID der Drohne
   * @param time - Der abzufragende Zeitpunkt
   * @returns Interpolierte Farbe zum angegebenen Zeitpunkt
   */
  getColorAt(id: number, time: number): Color;

  /**
   * Fügt ein Farb Keyframe zur Animation der Drohne zur aktuellen Zeit hinzu.
   * @param id - Die eindeutige ID der Drohne
   * @param color - Die einzustellende Farbe
   */
  addColorKeyFrameNow(id: number, color: Color): void;

  /**
   * Fügt ein Farb Keyframe zur Animation einer Drohne hinzu.
   * @param id - Die eindeutige ID der Drohne
   * @param keyFrame - Das hinzuzufügende Farb Keyframe
   */
  addColorKeyFrame(id: number, keyFrame: ColorKeyFrame): void;

  /**
   * Entfernt ein Farb Keyframe aus der Animation einer Drohne.
   * @param id - Die eindeutige ID der Drohne
   * @param keyFrame - Das zu entfernende Farb Keyframe
   */
  removeColorKeyFrame(id: number, keyFrame: ColorKeyFrame): void;

  /**
   * Ruft den aktuellen Kollisionszustand ab.
   * @returns Eine Zuordnung von Drohnen-IDs zu ihren Kollisionspartnern und -zeiten
   */
  getCollisions(): Map<number, Map<number, number>>;

  /**
   * Ruft den Event-Emitter für Drohneneigenschaftsänderungen ab.
   * Wird ausgelöst, wenn Keyframes einer Drohne geändert werden, stellt die ID der geänderten Drohne bereit.
   * @returns Event-Emitter, der ausgelöst wird, wenn sich eine Drohneneigenschaft ändert
   */
  getDroneChangedEvent(): OFCEvent<number>;

  /**
   * Ruft den Event-Emitter für Änderungen an der Drohnenliste ab.
   * Wird ausgelöst, wenn Drohnen hinzugefügt oder entfernt werden, stellt die aktualisierte Drohnenliste bereit.
   * @returns Event-Emitter für Drohnenlisten-Änderungen (hinzufügen/entfernen)
   */
  getDronesEvent(): OFCEvent<number[]>;

  /**
   * Ruft den Event-Emitter für die Kollisionserkennung ab.
   * Wird ausgelöst, wenn sich der Kollisionszustand ändert, mit einer Zuordnung von Drohnen zu ihren Kollisionspartnern und -zeiten.
   * @returns Event-Emitter für die Kollisionszuordnung
   */
  getCollisionEvent(): OFCEvent<Map<number, Map<number, number>>>;

  /**
   * Ruft den Event-Emitter für Drohnenauswahländerungen ab.
   * Wird ausgelöst, wenn eine Drohne ausgewählt oder abgewählt wird, stellt eine Liste der aktuell ausgewählten Drohnen-IDs bereit.
   * @returns Event-Emitter für ausgewählte Drohnen-IDs
   */
  getDroneSelectEvent(): OFCEvent<number[]>;

  getGroupEvent(): OFCEvent<DroneGroup[]>;

  getGroupManager(): DroneGroupManager;
}
