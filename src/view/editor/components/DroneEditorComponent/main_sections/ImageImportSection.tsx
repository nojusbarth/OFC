import { useState } from "react";
import { KeyframeEditorComponent } from "../SharedComponents";
import { ImageImportFrame } from "../image_import/ImageImportFrame";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";

// Dieser Abschnitt ist teilweise KI generiert

/**
 * Diese Komponente kapselt den Einstieg in den Bildimport und öffnet bei Bedarf
 * das zugehörige Modal.
 * @param controller - Controller, der an den Import-Dialog weitergereicht wird.
 * @returns JSX-Bereich mit Import-Button und Modal.
 */
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