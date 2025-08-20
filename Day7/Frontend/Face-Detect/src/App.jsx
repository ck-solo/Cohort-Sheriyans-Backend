import { useState } from 'react'
import './App.css'
import FaceExpressionDetector from './components/FaceDetector'
import MoodSong from './components/Songs'

function App() { 
  const [ Songs, setSongs] = useState([
    {
      title: "text_title",
      artist: "text_artist",
      url: "text_url",
    },
     {
      title: "text_title",
      artist: "text_artist",
      url: "text_url",
    },{
      title: "text_title",
      artist: "text_artist",
      url: "text_url",
    },{
      title: "text_title",
      artist: "text_artist",
      url: "text_url",
    },
  ]);

  return (
    <>     
      <FaceExpressionDetector setSongs={setSongs}/>
      <MoodSong Songs={Songs}/>
    </>
  )
}

export default App
