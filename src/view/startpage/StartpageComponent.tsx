import { useState } from "react";
import {IController} from "../../controller/interface/IController";

interface StartpageComponentProps {
  // Props
  controller: IController;
  toggleStartpage: () => void;
}

export default function StartpageComponent({controller, toggleStartpage}: StartpageComponentProps) {
  // State Hooks
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  // click handlers
  const onCreateProject = () => {
    controller.getProject().newProject();
    toggleStartpage();
  }

  const onOpenProject = () => {
    if(!file) {
      //TODO popup keine datei
      return
    }
    try {
      controller.getProject().loadProject(file);
      toggleStartpage();
    }
    catch {
      //TODO Fehlerpopup
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  //TODO hübsch machen
  return (
      <div>
        <h2>Olympian Flight Control</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Dateipfad auswählen</label>
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