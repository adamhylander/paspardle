import { GoogleMap, MarkerF, useLoadScript, PolylineF } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import "./styling/Map.css";
import { useNavigate } from 'react-router-dom';
import Subheader from "./Subheader";

function CorrectMap(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const navigate = useNavigate();

  function getMarkerIcon(id) {
    if (id === 1) {
      return {
        url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
        scaledSize: new window.google.maps.Size(40, 40),
      };
    } else {
      return {
        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scaledSize: new window.google.maps.Size(40, 40),
      };
    }
  };

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && props.markers.length >= 2) {
      const bounds = new window.google.maps.LatLngBounds();
      props.markers.forEach((marker) => bounds.extend(marker));
      map.fitBounds(bounds);
    }
  }, [map, props.markers]);

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  function calculateDistance() {
    const earthRadius = 6371; // Radius of the Earth in kilometers
    const latDiff = toRadians(props.markers[1].lat - props.markers[0].lat);
    const lonDiff = toRadians(props.markers[1].lng - props.markers[0].lng);

    const a =
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.cos(toRadians(props.markers[0].lat)) *
        Math.cos(toRadians(props.markers[1].lat)) *
        Math.sin(lonDiff / 2) *
        Math.sin(lonDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    if (distance > 1) {
      return "Du var " + Math.ceil(distance) + " kilometer ifrån";
    } else {
      if (Math.round(distance* 1000) < 30) {
        return "Huvudet på spiken! Helt rätt! " + Math.round(distance* 1000) + " meter ifrån"; 
      } 
      else if (Math.round(distance* 1000) > 30 && Math.round(distance* 1000) < 100) {
        return "Du gissade helt rätt! Bara " + Math.round(distance* 1000) + " meter ifrån";  
      } 
      return "Du var " + Math.round(distance * 1000) + " meter ifrån";
    }
  }

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  const handleNextGame = () => {
    props.onHandleNextGameClick();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Subheader text={"Hur gick det?"} />
      <div className="wrapper">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="mapContainer"
            zoom={2.1}
            options={{ disableDefaultUI: true, zoomControl: true }}
            onLoad={handleMapLoad}
          >
            {props.markers.map((marker, index) => (
              <MarkerF
                key={index}
                position={marker}
                icon={getMarkerIcon(marker.id)}
              />
            ))}
            {props.markers.length >= 2 && (
              <PolylineF
                path={props.markers}
                options={{
                  strokeColor: '#000000',
                  strokeOpacity: 1,
                  strokeWeight: 2,
                }}
              />
            )}
          </GoogleMap>
        )}
      </div>
      <div style={{fontSize: "20px"}}>
          <p id="resultText" style={{textAlign: "center"}}>
            {calculateDistance()}
          </p>
          <p style={{textAlign: "center"}}>
            Det du såg var: {props.place}
          </p>
        </div>
        <div>
          <button onClick={handleNextGame} id="againButton">En gång till?</button>
          <button id="homescreenButton" style={{marginLeft: "10px"}} onClick={() => {navigate('/');}}>Ta mig till huvudmenyn</button> 
        </div>
    </div>
  );
}

export default CorrectMap;