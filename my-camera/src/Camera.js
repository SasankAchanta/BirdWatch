import React, { useRef, useState, useEffect } from "react";

function Camera() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [photo, setPhoto] = useState(null);

  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
      });
      setStream(mediaStream);
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  // Attach stream to video element
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((err) => console.error(err));
    }
  }, [stream]);

  // Capture photo
  const takePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/png");
    setPhoto(image);
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>Bird Camera</h2>

      {!stream && <button onClick={startCamera}>Start Camera</button>}

      {stream && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: "400px",
              height: "300px",
              objectFit: "cover",
              border: "2px solid black",
              background: "#000",
            }}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={takePhoto}>Capture</button>
            <button onClick={stopCamera}>Stop</button>
          </div>
        </>
      )}

      {photo && (
        <div>
          <h3>Preview</h3>
          <img
            src={photo}
            alt="preview"
            style={{
              width: "400px",
              height: "300px",
              objectFit: "cover",
              border: "2px solid black",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Camera;