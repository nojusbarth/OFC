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

  // click handlers
  const onCreateProject = () => {
    //TODO
    //controller.getProject().newProject();
    toggleStartpage();
  }

  const onOpenProject = (path: string) => {
    //TODO
    controller.getProject().loadProject("");
    toggleStartpage();
  }


  //TODO
  return <div>Startpage Component</div>;
}
