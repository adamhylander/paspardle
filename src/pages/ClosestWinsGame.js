import { useState, useEffect } from 'react';
import GuessMap from '../components/GuessMap';
import CorrectMap from '../components/CorrectMap';
import Videoplayer from '../components/Videoplayer';
import { shuffle } from 'lodash';
import IsLoading from '../components/IsLoading';

function ClosestWinsGame() {

  const [isLoading, setLoading] = useState(true);
  const [narmastVinner, setNarmastVinner] = useState([]);
  const [currentNarmastVinner, setCurrentNarmastVinner] = useState({});
  const [showGuessMap, setShowGuessMap] = useState(true);
  const [ShowVideoPlayer, setShowVideoPlayer] = useState(true);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    getNarmastVinner();
  },[]);

  async function getNarmastVinner(){
    const response = await fetch("/get_narmastvinner")
    .then((response) => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch((error) => console.log(error));
    const shuffled_response = shuffle(response);
    setNarmastVinner(shuffled_response);
    setCurrentNarmastVinner(shuffled_response[0]);
    setMarkers([{id: 1, lat: Number(shuffled_response[0].Latitud), lng: Number(shuffled_response[0].Longitud)}]);
    setLoading(false);
  }

  const handleMarkerClick = (marker) => {
    setShowGuessMap(false);
    setMarkers((prevMarkers) => [...prevMarkers, {id: 2, lat: Number(marker.lat), lng: Number(marker.lng)}]);
  };

  function handleClick() {
    setShowVideoPlayer(false);
  }

  function handleNextGame()  {
    // get next Narmast Vinner
    setCurrentNarmastVinner(narmastVinner[(narmastVinner.indexOf(currentNarmastVinner) + 1) % narmastVinner.length]);
  }

  useEffect(() => {
    setMarkers([{id: 1, lat: Number(currentNarmastVinner.Latitud), lng: Number(currentNarmastVinner.Longitud)}]);
    setShowVideoPlayer(true);
    setShowGuessMap(true);
  }, [currentNarmastVinner]);

  if (isLoading || !currentNarmastVinner) {
    return  <IsLoading />;
  }
  else if (ShowVideoPlayer){
    return <Videoplayer youtubeID={currentNarmastVinner.VideoID} onClick={handleClick} />;
  }
  else {
    return (
      <div>
        {showGuessMap ? (
          <GuessMap 
            onMarkerClick={handleMarkerClick} 
            startLatitude={Number(currentNarmastVinner.StartLatitud)} 
            startLongitude={Number(currentNarmastVinner.StartLongitud)}
            startZoom={Number(currentNarmastVinner.StartZoom)} 
          />
        ) : (
          <CorrectMap 
            markers={markers} 
            onHandleNextGameClick={handleNextGame}
            place={currentNarmastVinner.Plats}
          />
        )}
      </div>
    );
  }
  
}

export default ClosestWinsGame;