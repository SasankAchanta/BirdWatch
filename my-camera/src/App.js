import React from "react";
import Camera from "./Camera";
import PhotoUpload from "./PhotoUpload";

function App() {
  return (
    <div className="App">
      <h1>BirdWatch</h1>

      <h2>Camera</h2>
      <Camera />

      <h2>Upload Image</h2>
      <PhotoUpload />
    </div>
  );
}

export default App;