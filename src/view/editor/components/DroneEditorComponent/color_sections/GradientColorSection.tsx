import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { KeyframeEditorComponent } from "../SharedComponents";

import { Color } from "three";
import { useState, useEffect } from "react";
import { AddKeyframeComponent } from "../SharedComponents";
import { Form } from "react-bootstrap";
import { ColorKeyFrame } from "../../../../../repository/entity/ColorKeyFrame";
import { useTranslation } from "react-i18next";



export function GradientColorSection({
  selectedDrones,
  controller,
}: {
  selectedDrones: number[];
  controller: IUndoableController;
}) {
  const { t } = useTranslation();
  const [baseColor, setBaseColor] = useState<Color>(new Color(0xffffff));
  const [targetColor, setTargetColor] = useState<Color>(new Color(0x000000));
  const [duration, setDuration] = useState<number>(1);
  const [granularity, setGranularity] = useState<number>(0.2);

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

  const handleTargetColorChange = (hexColor: string) => {
    setTargetColor(new Color(hexColor));
  };

  const handleAddColorKeyframe = () => {
    const safeDuration = Math.max(0.1, duration);
    const safeGranularity = Math.max(0.05, granularity);
    // Begrenzte Keyframe-Menge: genug fuer einen sichtbaren Verlauf, aber ohne Explosion.
    const steps = Math.min(40, Math.max(2, Math.ceil(safeDuration / safeGranularity)));
    const currentTime = controller.getTimeController().getTime();

    controller.startBatching();
    selectedDrones.forEach((droneId) => {
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const time = currentTime + t * safeDuration;
        const colorToUse = baseColor.clone().lerp(targetColor, t);
        controller.addColorKeyFrame(droneId, new ColorKeyFrame(colorToUse, time));
      }
    });
    controller.endBatching();
  };

  return (
    <KeyframeEditorComponent title={t("editor.color.gradient.title")}>
      {/* Base Color */}
      <div>
        <label className="small">{t("editor.color.gradient.startColor")}</label>
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

      {/* Target Color */}
      <div>
        <label className="small">{t("editor.color.gradient.endColor")}</label>
        <input
          id="drone-gradient-target-color-input"
          type="color"
          value={`#${targetColor.getHexString()}`}
          onInput={(e) => handleTargetColorChange((e.target as HTMLInputElement).value)}
          onChange={(e) => handleTargetColorChange(e.target.value)}
          style={{
            cursor: "pointer",
            height: "40px",
            width: "100%",
          }}
        />
      </div>

      {/* Duration */}
      <Form.Group>
        <Form.Label className="small">{t("editor.color.gradient.duration")}</Form.Label>
        <Form.Control
          type="number"
          size="sm"
          min={0.1}
          step={0.1}
          value={duration}
          onChange={(e) => setDuration(parseFloat(e.target.value) || 1)}
          className="border-secondary"
        />
        <Form.Text className="text-muted">{t("editor.color.gradient.durationHelp")}</Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label className="small">{t("editor.color.gradient.granularity")}</Form.Label>
        <Form.Control
          type="number"
          size="sm"
          min={0.05}
          max={1}
          step={0.05}
          value={granularity}
          onChange={(e) => setGranularity(parseFloat(e.target.value) || 0.2)}
          className="border-secondary"
        />
        <Form.Text className="text-muted">
          {t("editor.color.gradient.granularityHelp")}
        </Form.Text>
      </Form.Group>

      <AddKeyframeComponent onClick={handleAddColorKeyframe} />
    </KeyframeEditorComponent>
  );
}