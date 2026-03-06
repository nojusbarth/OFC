import { Color } from "three";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import {
  KeyframeEditorComponent,
  AddKeyframeComponent,
} from "../SharedComponents";

// Dieser Abschnitt ist teilweise KI generiert

/**
 * Diese Komponente setzt für alle ausgewählten Drohnen eine Farb-Keyframe am
 * aktuellen Zeitpunkt.
 * @param color - Aktuell ausgewählte Farbe.
 * @param setColor - Setter zum Aktualisieren der Farbauswahl.
 * @param selectedDrones - IDs der aktuell ausgewählten Drohnen.
 * @param controller - Controller für das Anlegen von Farb-Keyframes.
 * @returns JSX-Bereich zur Farbauswahl und Anwendung.
 */
export function SetColorSection({
  color,
  setColor,
  selectedDrones,
  controller,
}: {
  color: Color;
  setColor: (color: Color) => void;
  selectedDrones: number[];
  controller: IUndoableController;
}) {
  const handleColorChange = (hexColor: string) => {
    setColor(new Color(hexColor));
  };

  const handleAddColorKeyframe = () => {
    controller.startBatching();
    selectedDrones.forEach((droneId) => {
      controller.addColorKeyFrameNow(droneId, color);
    });
    controller.endBatching();
  };

  return (
    <KeyframeEditorComponent title="Farbe Setzen">
      <div>
        <label className="small">LED-Farbe wählen</label>
        <input
          id="drone-color-input"
          type="color"
          value={`#${color.getHexString()}`}
          onChange={(e) => handleColorChange(e.target.value)}
          style={{
            cursor: "pointer",
            height: "40px",
            width: "100%",
          }}
        />
      </div>

      <AddKeyframeComponent onClick={handleAddColorKeyframe} />
    </KeyframeEditorComponent>
  );
}
