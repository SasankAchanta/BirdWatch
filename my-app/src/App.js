import React, { useState } from "react";
import api from "./api.js";

function PhotoUpload() {
  //State: stores the selected images
  const [selectedImage, setSelectedImage] = useState(null);
  //Runs when suer slects the file
  function handleImageChange(event) {
    const file = event.target.files[0]; //get the first selected file
    setSelectedImage(file); //update the state
  }
  //Runs when user clicks the button
  async function sendToAI() {
    if (!selectedImage) {
      //error if no image is selected
      alert("Please select an image first");
      return;
    }
    else{
      //object for sending images
      const formdata = new FormData();
      formdata.append("file", selectedImage);
      //post request to backend
      const response = await api.post('/PredictImage', formdata);
      //bird type and confidence
      console.log("Response from AI: ", response.data.BirdType);
      console.log("Response from AI: ", response.data.Confidence);
    }
    console.log("Image ready to send: ", selectedImage);
  }
  return (
    <div style={{ padding: "40px", fontFamily: "Arial", textAlign: "center" }}>
      <h1>Upload Photo</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && <p>Selected file: {selectedImage.name}</p>}
      <button onClick={sendToAI}>Send to AI</button>
    </div>
  );
}
export default PhotoUpload;
