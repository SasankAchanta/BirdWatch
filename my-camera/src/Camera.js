import React, { useRef, useState, useEffect } from "react";

function Camera() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [photo, setPhoto] = useState(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      });
      setStream(mediaStream);
    } catch (err) {
      console.error("Cannot access camera:", err);
      alert("Cannot use camera. Make sure permissions are allowed.");
    }
  };

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const takePhoto = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    if (!video) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    const image = canvas.toDataURL("image/png");
    setPhoto(image);
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Bird Camera</h2>

      {!stream && (
        <button style={styles.button} onClick={startCamera}>
          Start Camera
        </button>
      )}

      {stream && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ ...styles.video }}
          />
          <div style={styles.buttonRow}>
            <button style={styles.button} onClick={takePhoto}>
              Capture
            </button>
            <button style={styles.button} onClick={stopCamera}>
              Stop
            </button>
          </div>
        </>
      )}

      {photo && (
        <div style={styles.preview}>
          <h3>Preview</h3>
          <img src={photo} alt="preview" style={styles.photo} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    width: "350px",
    margin: "20px auto",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif"
  },
  title: { marginBottom: "15px" },
  video: {
    width: "100%",
    maxWidth: "300px",
    borderRadius: "6px",
    border: "1px solid black",
    marginBottom: "10px"
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "220px",
    marginBottom: "10px"
  },
  button: {
    padding: "10px 20px",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "1px solid #17490d",
    backgroundColor: "#17490dd4",
    color: "#fff",
    transition: "background-color 0.2s"
  },
  preview: { marginTop: "15px", textAlign: "center" },
  photo: { width: "300px", borderRadius: "6px", border: "1px solid #ccc" }
};

export default Camera;