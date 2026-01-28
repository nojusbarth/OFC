import { useState } from "react";
import {IController} from "../../controller/interface/IController";

interface StartpageComponentProps {
  // Props
  controller: IController;
  // TODO
  toggleStartpage: () => void;
  showPopup: boolean;
}

export default function StartpageComponent({}: StartpageComponentProps) {
  // State Hooks
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return <div>Startpage Component</div>;
}
