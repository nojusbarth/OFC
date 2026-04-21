import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { KeyframeEditorComponent } from "../SharedComponents";

import { Color } from "three";
import { useState, useEffect } from "react";
import { AddKeyframeComponent } from "../SharedComponents";
import { Form } from "react-bootstrap";
import { ColorKeyFrame } from "../../../../../repository/entity/ColorKeyFrame";
import { useTranslation } from "react-i18next";

export function FlickerColorSection({
  selectedDrones,
  controller,
}: {
  selectedDrones: number[];
  controller: IUndoableController;
}) {
  const { t } = useTranslation();
  const [baseColor, setBaseColor] = useState<Color>(new Color(0xffffff));
  const [flickerColor, setFlickerColor] = useState<Color>(new Color(0x000000));
  const [frequency, setFrequency] = useState<number>(2);
  const [duration, setDuration] = useState<number>(1);

  // Lade aktuelle Drohnenfarbe als Base-Farbe, wenn Drohnen ausgewählt wurden
  useEffect(() => {
    if (selectedDrones.length > 0) {
      const currentColor = controller.getColor(selectedDrones[0]);
      setBaseColor(new Color(currentColor));
    }
  }, [selectedDrones, controller]);

  const handleBaseColorChange = (hexColor: string) => {
    setBaseColor(new Color(hexColor));
  };

  const handleFlickerColorChange = (hexColor: string) => {
    setFlickerColor(new Color(hexColor));
  };

  const handleAddColorKeyframe = () => {
    const totalFrames = Math.max(2, Math.ceil(frequency * duration * 2)); // 2 Farben pro Zyklus
    const timeStep = duration / totalFrames;
    const currentTime = controller.getTimeController().getTime();

    controller.startBatching();
    selectedDrones.forEach((droneId) => {
      // Erzeuge Flicker-Effekt durch abwechselnde Keyframes
      for (let i = 1; i < totalFrames; i++) {
        const time = currentTime + i * timeStep;
        // Wechsel zwischen Base und Flicker
        const colorToUse = i % 2 === 0 ? flickerColor : baseColor;

        controller.addColorKeyFrame(droneId, new ColorKeyFrame(colorToUse, time));
      }
    });
    controller.endBatching();
  };

  return (
    <KeyframeEditorComponent title={t("editor.color.flicker.title")}>
      {/* Base Color */}
      <div>
        <label className="small">{t("editor.color.flicker.baseColor")}</label>
        <input
          id="drone-base-color-input"
          type="color"
          value={`#${baseColor.getHexString()}`}
          onInput={(e) => handleBaseColorChange((e.target as HTMLInputElement).value)}
          onChange={(e) => handleBaseColorChange(e.target.value)}
          style={{
            cursor: "pointer",
            height: "40px",
            width: "100%",
          }}
        />
      </div>

      {/* Flicker Color */}
      <div>
        <label className="small">{t("editor.color.flicker.flickerColor")}</label>
        <input
          id="drone-flicker-color-input"
          type="color"
          value={`#${flickerColor.getHexString()}`}
          onInput={(e) => handleFlickerColorChange((e.target as HTMLInputElement).value)}
          onChange={(e) => handleFlickerColorChange(e.target.value)}
          style={{
            cursor: "pointer",
            height: "40px",
            width: "100%",
          }}
        />
      </div>

      {/* Frequency */}
      <Form.Group>
        <Form.Label className="small">{t("editor.color.flicker.frequency")}</Form.Label>
        <Form.Control
          type="number"
          size="sm"
          min={0.1}
          max={5}
          step={0.1}
          value={frequency}
          onChange={(e) => setFrequency(parseFloat(e.target.value) || 1)}
          className="border-secondary"
        />
        <Form.Text className="text-muted">{t("editor.color.flicker.frequencyHelp")}</Form.Text>
      </Form.Group>

      {/* Duration */}
      <Form.Group>
        <Form.Label className="small">{t("editor.color.flicker.duration")}</Form.Label>
        <Form.Control
          type="number"
          size="sm"
          min={0.1}
          step={0.1}
          value={duration}
          onChange={(e) => setDuration(parseFloat(e.target.value) || 1)}
          className="border-secondary"
        />
        <Form.Text className="text-muted">{t("editor.color.flicker.durationHelp")}</Form.Text>
      </Form.Group>

      <AddKeyframeComponent onClick={handleAddColorKeyframe} />
    </KeyframeEditorComponent>
  );
}