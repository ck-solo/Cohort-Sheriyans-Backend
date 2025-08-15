import React, { useState } from "react";
useState;

import './songs.css'

const MoodSong = () => {
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
    <div className="mood-songs">
      <h2>Recommended Songs</h2>

        {Songs.map((song, index) => (
          <div className="song" key={index}>
            <div className="title">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
            <div className="play-pause-button">
              <i className="ri-pause-line"></i>
              <i className="ri-play-circle-fill"></i>
            </div>
          </div>
        ))} 
    </div>
  );
};

export default MoodSong;
