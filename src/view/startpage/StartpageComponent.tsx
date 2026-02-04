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
  const [messageType, setMessageType] = useState<string>("");

  // click handlers
  const onCreateProject = () => {
    setShowPopup(false);
    controller.getProject().newProject();
    toggleStartpage();
  }

  const onOpenProject = () => {
    if(!file) {
      setMessage("Bitte wählen Sie zuerst eine Datei aus.");
      setMessageType("Keine Datei ausgewählt")
      setShowPopup(true);
      return
    }
    try {
      //controller.getProject().loadProject(file);
      toggleStartpage();
    }
    catch (e){
      setMessage((e as Error).message);
      setMessageType("Dateifehler")
      setShowPopup(true);
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
    setShowPopup(false);
  };

  //TODO hübsch machen
  return (
      <div>
        <h2>Olympian Flight Control</h2>
        <form>
          {showPopup && (
              <PopupComponent message={message} messageType={messageType} />
          )}
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Datei auswählen</label>
            <input className="form-control" type="file" id="fileInput" onChange={onFileChange} />
          </div>
          <button type="button"
                  className="btn btn-primary"
                  onClick={onCreateProject}>
            Projekt erstellen
          </button>
          <button type="button"
                  className="btn btn-primary"
                  onClick={onOpenProject}>
            Projekt öffnen
          </button>
        </form>
      </div>
  );
}