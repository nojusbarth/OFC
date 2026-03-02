import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";


// Dieser Abschnitt ist teilweise KI generiert

export function TitleComponent({ title }: { title: string }) {
    return <h6 className="fw-bold text-uppercase text-xs">{title}</h6>;
}

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


export function PositionInputComponent({
    title,
    currentValue,
    onChangePosition,
}: {
    title: string;
    currentValue: number;
    onChangePosition: (value: number) => void;
}) {
    return (
        <Form.Group>
            <Form.Label className="small">{title}</Form.Label>
            <Form.Control
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


export function AddKeyframeComponent({ onClick }: { onClick: () => void }) {
    return (
        <button
            className="btn btn-primary w-100 mb-2 text-white"
            onClick={onClick}
        >
            <i className="bi bi-pencil me-2" />
            Keyframe hinzufügen
        </button>
    );
}