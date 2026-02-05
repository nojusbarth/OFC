import { useState } from "react";
import {IController} from "../../controller/interface/IController";
import PopupComponent from "./PopupComponent";

interface StartpageComponentProps {
  // Props
  controller: IController;
  toggleStartpage: () => void;
}

export default function StartpageComponent({controller, toggleStartpage}: StartpageComponentProps) {
  // State Hooks
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  // click handlers
  const onCreateProject = () => {
    setShowPopup(false);
    controller.getProject().newProject();
    toggleStartpage();
  }

  const onOpenProject = () => {
    try {
      controller.getProject().loadProject(file);
      toggleStartpage();
    } catch (e) {
      setMessage((e as Error).message);
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
      <div className="bg-primary-subtle vh-100 d-flex align-items-center justify-content-center">
        <div className="card shadow-sm" style={{ maxWidth: "500px", width: "100%" }}>
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Olympian Flight Control</h2>
            <form>

              {showPopup && (
                  <PopupComponent message={message} messageType={"Dateifehler"}/>
              )}

              <div className="mb-3">
                <label htmlFor="fileInput" className="form-label">
                  Datei auswählen
                </label>
                <input className="form-control" type="file" id="fileInput" onChange={onFileChange}/>
              </div>

              <div className="d-grid gap-2 mt-3">
                <button type="button" className="btn btn-primary" onClick={onCreateProject}>
                  Projekt erstellen
                </button>
                <button type="button" className="btn btn-primary" onClick={onOpenProject} disabled={!file}>
                  Projekt öffnen
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}