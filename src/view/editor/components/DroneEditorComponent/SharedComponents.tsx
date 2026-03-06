import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";

// Dieser Abschnitt ist teilweise KI generiert

/**
 * Einfache Komponente zur Darstellung von Abschnittstiteln in Großbuchstaben und kleiner Schrift.
 * @param title - Der anzuzeigende Titeltext.
 * @returns JSX-Element mit formatiertem Titel.
 */
export function TitleComponent({ title }: { title: string }) {
  return <h6 className="fw-bold text-uppercase text-xs">{title}</h6>;
}

/**
 * Generische Komponente, die einen Titel und beliebige Kinder in einer Karte darstellt.
 * @param title - Überschrift des Abschnitts.
 * @param children - Inhalt, der innerhalb der Karte angezeigt wird.
 * @returns JSX-Element mit formatierter Karte.
 */
export function KeyframeEditorComponent({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Card>
        <Card.Body className="d-flex flex-column gap-3">
          <TitleComponent title={title} />
          {children}
        </Card.Body>
      </Card>
    </div>
  );
}

/**
 * Komponente für die Eingabe einer einzelnen Positionskomponente (X, Y oder Z) mit Beschriftung.
 * @param title - Achsenbezeichnung (z.B. "X").
 * @param currentValue - Aktueller Wert der Position auf dieser Achse.
 * @param onChangePosition - Callback, der bei Änderung des Eingabefelds aufgerufen wird.
 * @returns JSX-Element mit beschriftetem Eingabefeld für die Position.
 */
export function PositionInputComponent({
    title,
    currentValue,
    onChangePosition,
}: {
    title: string;
    currentValue: number;
    onChangePosition: (value: number) => void;
}) {
    const axis = title.toLowerCase();
    return (
        <Form.Group>
            <Form.Label className="small">{title}</Form.Label>
            <Form.Control
                id={`drone-position-${axis}-input`}
                type="number"
                step="0.1"
                size="sm"
                value={currentValue}
                onChange={(e) =>
                    onChangePosition(parseFloat(e.target.value) || 0)
                }
                className="border-secondary"
            />
        </Form.Group>
    );
}

/**
 * Komponente für den "Keyframe hinzufügen"-Button, der in verschiedenen Abschnitten verwendet wird.
 * @param onClick - Callback, der aufgerufen wird, wenn der Button geklickt wird.
 * @returns JSX-Button mit einheitlichem Stil und Funktionalität.
 */
export function AddKeyframeComponent({ onClick }: { onClick: () => void }) {
  return (
    <button className="btn btn-primary w-100 mb-2 text-white" onClick={onClick}>
      <i className="bi bi-pencil me-2" />
      Keyframe hinzufügen
    </button>
  );
}
