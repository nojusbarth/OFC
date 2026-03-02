import { useState } from "react";
import { KeyframeEditorComponent } from "../SharedComponents";
import { ImageImportFrame } from "../image_import/ImageImportFrame";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";

// Dieser Abschnitt ist teilweise KI generiert

export function ImageImportSection( {
    controller,
}: {
    controller: IUndoableController;
}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <KeyframeEditorComponent title="Bild Formation">
                <button
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    Datei importieren
                </button>
            </KeyframeEditorComponent>

            <ImageImportFrame
                controller={controller}
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}