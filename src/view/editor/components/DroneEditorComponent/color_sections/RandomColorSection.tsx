import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { KeyframeEditorComponent } from "../SharedComponents";

import { Color } from "three";
import { useState } from "react";
import { AddKeyframeComponent } from "../SharedComponents";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export function RandomColorSection({
  selectedDrones,
  controller,
}: {
  selectedDrones: number[];
  controller: IUndoableController;
}) {
  const { t } = useTranslation();
  const [color, setColor] = useState<Color>(new Color(0xffffff));
  const [variationStrength, setVariationStrength] = useState<number>(50);

  const handleColorChange = (hexColor: string) => {
    setColor(new Color(hexColor));
  };

  const generateRandomColor = (baseColor: Color, variation: number): Color => {
    // Normalisiere Variation auf 0-1
    const varFactor = Math.max(0, Math.min(100, variation)) / 100;
    
    // Generiere pro RGB-Kanal eine Zufallsabweichung
    const r = Math.max(0, Math.min(1, baseColor.r + (Math.random() - 0.5) * 2 * varFactor));
    const g = Math.max(0, Math.min(1, baseColor.g + (Math.random() - 0.5) * 2 * varFactor));
    const b = Math.max(0, Math.min(1, baseColor.b + (Math.random() - 0.5) * 2 * varFactor));
    
    return new Color(r, g, b);
  };

  const handleAddColorKeyframe = () => {
    controller.startBatching();
    selectedDrones.forEach((droneId) => {
      // Pro Drohne unterschiedliche Farbvariation generieren
      const randomColor = generateRandomColor(color, variationStrength);
      controller.addColorKeyFrameNow(droneId, randomColor);
    });
    controller.endBatching();
  };

  return ( 
    <KeyframeEditorComponent title={t("editor.color.random.title")}>

      <div>
        <label className="small">{t("editor.color.common.pickLedColor")}</label>
        <input
          id="drone-color-input"
          type="color"
          value={`#${color.getHexString()}`}
          onInput={(e) => handleColorChange((e.target as HTMLInputElement).value)}
          onChange={(e) => handleColorChange(e.target.value)}
          style={{
            cursor: "pointer",
            height: "40px",
            width: "100%",
          }}
        />
      </div>

      <Form.Group>
        <Form.Label className="small">{t("editor.color.random.variationStrength")}</Form.Label>
        <Form.Control
          type="number"
          size="sm"
          min={0}
          max={100}
          step={5}
          value={variationStrength}
          onChange={(e) => setVariationStrength(parseFloat(e.target.value) || 0)}
          className="border-secondary"
        />
        <Form.Text className="text-muted">{t("editor.color.random.variationHelp")}</Form.Text>
      </Form.Group>

      <AddKeyframeComponent onClick={handleAddColorKeyframe} />
    </KeyframeEditorComponent>
  );
}