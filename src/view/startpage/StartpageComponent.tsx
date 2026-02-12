import { useState } from "react";
import {IController} from "../../controller/interface/IController";
import PopupComponent from "./PopupComponent";
import { Result } from "../../repository/Result";
import "./StartpageComponent.css";


/**
 * Stellt die Startseite der Anwendung bereit.
 * Auf dieser können Projekte erstellt oder geöffnet werden.
 */
//Teile der HTML-Formatierung mithilfe von KI erstellt.
interface StartpageComponentProps {
  // Props
  controller: IController;
  toggleStartpage: () => void;
}

/**
 * Gibt die Startseite der Anwendung aus.
 * @param controller wird benötigt, um Befehle an den Controller weiterzuleiten
 * @param toggleStartpage ist eine Funktion, die der Startseite erlaubt, den Wechsel zum Editor auszulösen
 * @constructor
 */
export default function StartpageComponent({controller, toggleStartpage}: StartpageComponentProps) {
  // State Hooks
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<string>("");

  // click handlers
  const onCreateProject = () => {
    setShowPopup(false);
    controller.getProject().newProject();
    toggleStartpage();
  }

  const onOpenProject = () => {
    controller.getProject().loadProject(file!, (result: Result<boolean>) => {
      if (result.isSuccess()) {
        setShowPopup(false);
        toggleStartpage();
      } else {
        setMessageType("Dateifehler");
        setMessage(result.getError()?.message || "Unbekannter Fehler beim Laden der Datei.");
        setShowPopup(true);
      }
    });
  }

  const onOpenLastProject = () => {
      const result = controller.getProject().loadLastProject();
      if (result.isSuccess()) {
        setShowPopup(false);
        toggleStartpage();
      } else {
        setMessageType("Projekt konnte nicht geöffnet werden");
        setMessage(result.getError()?.message || "Versuchen Sie es stattdessen über das Öffnen einer Projektdatei.");
        setShowPopup(true);
      }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
    setShowPopup(false);
  };

  return (
      <div className="bg-gradients d-flex align-items-center justify-content-center">
        <div className="card shadow-sm" style={{ maxWidth: "500px", width: "100%" }}>
          <div className="card-body">
            <h1 className="text-center logo-ofc">
              OFC
            </h1>

            <h3 className="text-center logo-subtitle mb-3">
              Olympian Flight Control
            </h3>
            <form>

              {showPopup && (
                  <PopupComponent message={message} messageType={messageType}/>
              )}

              <div className="mb-3">
                <input className="form-control" type="file" id="fileInput" onChange={onFileChange}/>
              </div>

              <div className="d-grid gap-2 mt-3">
                <button type="button" className="btn btn-primary shadow-sm" onClick={onCreateProject}>
                  <i className="bi bi-file-earmark-plus me-2" />
                  Projekt erstellen
                </button>
                <button type="button" className="btn btn-primary shadow-sm" onClick={onOpenProject} disabled={!file}>
                  <i className="bi bi-folder me-2" />
                  Projekt öffnen
                </button>
                <button type="button" className="btn btn-primary shadow-sm" onClick={onOpenLastProject} disabled={!controller.getProject().canLoadLastProject()}>
                  <i className="bi bi-arrow-clockwise me-2" />
                  Zuletzt geöffnetes Projekt öffnen
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}