import { useState } from "react";
import { KeyframeEditorComponent } from "../SharedComponents";
import { ImageImportFrame } from "../image_import/ImageImportFrame";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <KeyframeEditorComponent title={t("editor.imageImport.formationTitle")}>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    {t("editor.imageImport.importFile")}
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