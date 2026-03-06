import { ImageImportDialog } from "./ImageImportDialog";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";

// Dieser Abschnitt ist teilweise KI generiert

interface Props {
  show: boolean;
  onClose: () => void;
  controller: IUndoableController;
}

/**
 * Diese Komponente rendert den Modal-Rahmen für den Bildimport.
 * @param show - Steuert die Sichtbarkeit des Modals.
 * @param onClose - Callback zum Schließen des Modals.
 * @param controller - Controller, der an den Bildimport-Dialog weitergereicht wird.
 * @returns JSX-Modal für den Bildimport oder `null`, wenn ausgeblendet.
 */
export function ImageImportFrame({ show, onClose, controller }: Props) {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" style={{ maxWidth: "800px" }}>
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header flex-column">
            {/* Title Row */}
            <div className="d-flex w-100 justify-content-between align-items-center">
              <h4 className="modal-title fw-semibold mb-0">
                Datei importieren
              </h4>

              <button type="button" className="btn-close" onClick={onClose} />
            </div>
          </div>

          {/* Body */}
          <div className="modal-body pt-4">
            <div className="text-muted text-center py-5">
              <ImageImportDialog controller={controller} />
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
