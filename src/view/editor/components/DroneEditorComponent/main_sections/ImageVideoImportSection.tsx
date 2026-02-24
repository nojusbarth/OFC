import { useState } from "react";
import { KeyframeEditorComponent } from "../SharedComponents";
import { ImageVideoImportModal } from "../file_import/ImageVideoImportModal";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";

export function ImageVideoImportSection( {
    controller,
}: {
    controller: IUndoableController;
}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <KeyframeEditorComponent title="Bild / Video Formation">
                <button
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    Datei importieren
                </button>
            </KeyframeEditorComponent>

            <ImageVideoImportModal
                controller={controller}
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}