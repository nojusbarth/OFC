import React, { useState } from "react";

import EditorComponent from "./view/editor/EditorComponent";
import StartpageComponent from "./view/startpage/StartpageComponent";

import "./App.css"; // Custom CSS

function App() {
  // State Hooks
  const [showStartpage, setShowStartpage] = useState<boolean>(false); //TODO true

  let inhalt: React.ReactNode;
  if (showStartpage) {
    inhalt = <StartpageComponent />;
  } else {
    inhalt = (
      <EditorComponent
        // controller={controller} TODO
        toggleStartpage={() => setShowStartpage(true)}
      />
    );
  }

  return inhalt;
}

export default App;
