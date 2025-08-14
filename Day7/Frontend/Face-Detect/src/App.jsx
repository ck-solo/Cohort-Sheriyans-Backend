import { useState } from 'react'
import './App.css'
import FaceExpressionDetector from './components/FaceDetector'
import MoodSong from './components/Songs'

function App() { 

  return (
    <>     
      <FaceExpressionDetector/>
      <MoodSong />
    </>
  )
}

export default App
