import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Load all face-api models
  const loadModels = async () => {
    const MODEL_URL = process.env.PUBLIC_URL + '/models';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
    startVideo();
  };

  // Access webcam
  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  // Detect faces and expressions
  const handleVideoPlay = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight,
    };

    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      if (resizedDetections.length > 0) {
        const expressions = resizedDetections[0].expressions;
        const maxExp = Object.entries(expressions).reduce((a, b) => a[1] > b[1] ? a : b);
        console.log('Detected Expression:', maxExp[0]); // happy, sad, etc.
      }
    }, 100);
  };

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>🧠 Face Expressions Detector with React</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="720"
        height="560"
        onPlay={handleVideoPlay}
        style={{ borderRadius: '10px' }}
      />
      <canvas
        ref={canvasRef}
        width="720"
        height="560"
        style={{
          position: 'absolute',
          top: '130px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      />
    </div>
  );
}

export default App;
