import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    // Bootstrap test
    <div className="container mt-5">
      <div className="alert alert-success" role="alert">
        ✅ Bootstrap funktioniert!
      </div>

      <button className="btn btn-primary me-2">Primary</button>
      <button className="btn btn-danger">Danger</button>
    </div>
  );
}

export default App;
