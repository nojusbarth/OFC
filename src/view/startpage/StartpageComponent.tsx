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
  }

  const onOpenProject = (path: string) => {
    //TODO
  }


  //TODO
  return <div>Startpage Component</div>;
}
