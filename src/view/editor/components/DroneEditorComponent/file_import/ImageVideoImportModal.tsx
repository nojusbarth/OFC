import { useState } from "react";
import { ImageImportTab } from "./ImageImportTab";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";

type ImportTab = "image" | "video";

interface Props {
    show: boolean;
    onClose: () => void;
    controller: IUndoableController;
}

export function ImageVideoImportModal({
    show,
    onClose,
    controller,
}: Props) {
    const [activeTab, setActiveTab] =
        useState<ImportTab>("image");

    if (!show) return null;

    return (
        <div
            className="modal fade show d-block"
            tabIndex={-1}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div
                className="modal-dialog"
                style={{ maxWidth: "800px" }}
            >
                <div className="modal-content">

                    {/* Header */}
                    <div className="modal-header flex-column">

                        {/* Title Row */}
                        <div className="d-flex w-100 justify-content-between align-items-center">
                            <h4 className="modal-title fw-semibold mb-0">
                                Datei importieren
                            </h4>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            />
                        </div>

                        {/* Centered Tab Switch */}
                        <div className="d-flex justify-content-center w-100 mt-4">

                            <div className="btn-group">
                                <button
                                    type="button"
                                    className={`btn px-4 py-2 ${
                                        activeTab === "image"
                                            ? "btn-primary"
                                            : "btn-outline-primary"
                                    }`}
                                    onClick={() =>
                                        setActiveTab("image")
                                    }
                                >
                                    Bild
                                </button>

                                <button
                                    type="button"
                                    className={`btn px-4 py-2 ${
                                        activeTab === "video"
                                            ? "btn-primary"
                                            : "btn-outline-primary"
                                    }`}
                                    onClick={() =>
                                        setActiveTab("video")
                                    }
                                >
                                    Video
                                </button>
                            </div>

                        </div>

                    </div>

                    {/* Body */}
                    <div className="modal-body pt-4">
                        {activeTab === "image" && (
                            <div className="text-muted text-center py-5">
                                <ImageImportTab controller={controller}/>
                            </div>
                        )}

                        {activeTab === "video" && (
                            <div className="text-muted text-center py-5">
                                Video Import UI kommt hier hin.
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Schließen
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}