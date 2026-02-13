import React, {useState} from "react";
import {IController} from "../../controller/interface/IController";
import PopupComponent from "./PopupComponent";
import {Result} from "../../repository/Result";
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

            <h2 className="text-center logo-subtitle mb-3">
              Olympian Flight Control
            </h2>
            <form>
              <hr/>
              <div className="mb-3">
                <input className="form-control" type="file" id="fileInput" onChange={onFileChange}/>
              </div>
              {showPopup && (
                  <PopupComponent message={message} messageType={messageType}/>
              )}

                <button type="button" className="btn btn-primary shadow-sm w-100 mb-2" onClick={onOpenProject}
                        disabled={!file}>
                  <i className="bi bi-folder me-2"/>
                  Projekt öffnen
                </button>
                <button type="button" className="btn btn-outline-primary shadow-sm w-100" onClick={onOpenLastProject}
                        disabled={!controller.getProject().canLoadLastProject()}>
                  <i className="bi bi-arrow-clockwise me-2"/>
                  Zuletzt geöffnetes Projekt öffnen
                </button>

              <hr/>
              <button type="button" className="btn btn-primary shadow-sm w-100" onClick={onCreateProject}>
              <i className="bi bi-file-earmark-plus me-2" />
              Projekt erstellen
            </button>
            </form>
          </div>
        </div>
      </div>
  );
}