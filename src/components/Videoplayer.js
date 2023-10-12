import React from 'react';
import YouTube from 'react-youtube';
import Subheader from './Subheader';

function Videoplayer({ youtubeID, onClick }) {
  const handleClick = () => {
      onClick();
  };

  return (
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",}} >
        <Subheader text={"Vart sker detta?"} />
        <div style={{ border: "1px solid #ccc", borderRadius: "5px", overflow: "hidden" }}>
            <YouTube videoId={youtubeID} />
        </div>
        <button onClick={handleClick} style={{marginTop: "20px"}}>Jag är redo att gissa!</button>
      </div>
  );
}

export default Videoplayer;