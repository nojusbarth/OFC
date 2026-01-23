import { useState } from "react";

interface StartpageComponentProps {
  // Props
  // TODO
}

export default function StartpageComponent({}: StartpageComponentProps) {
  // State Hooks
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return <div>Startpage Component</div>;
}
