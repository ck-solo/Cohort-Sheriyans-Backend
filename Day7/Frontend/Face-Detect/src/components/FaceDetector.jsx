import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import "./FaceExpression.css";

export default function FaceExpressionDetector() {
  const videoRef = useRef();
  const [expression, setExpression] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);


  useEffect(() => {
    startVideo();
    loadModels();
  }, []);

  // Start webcam
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  // Load face-api.js models
  const loadModels = async () => {
    const MODEL_URL = "/models"; // in public/models
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
     setModelsLoaded(true); // mark as loaded
 
  };

  // Detect expressions and show top one
  const detectExpression = async () => {
    if (!modelsLoaded) {
      console.warn("Models not loaded yet!");
      return;
    }
    
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length > 0) {
        const expObj = detections[0].expressions;
        const topExp = Object.entries(expObj).sort((a, b) => b[1] - a[1])[0][0];
        setExpression(topExp);
      } else {
        setExpression("");
      }
    }, 5000);
  };

  return (
    <div className="video-container">
      <video ref={videoRef} autoPlay muted playsInline />
      {expression && <div className="expression-overlay">{expression}</div>}

      <button onClick={detectExpression}   >Detect Mood</button>
    </div>
  );
}
