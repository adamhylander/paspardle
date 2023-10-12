import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect, useMemo } from "react";
import "./styling/Map.css";
import Subheader from "./Subheader";

function GuessMap({ onMarkerClick, startLongitude, startLatitude, startZoom }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const center = useMemo(() => ({ lat: startLatitude, lng: startLongitude }), [startLatitude, startLongitude]);
  const [marker, setMarker] = useState(null);
  const [showButton, setShowButton] = useState(false);

  const handleMarkerClick = () => {
    if (marker) {
      onMarkerClick(marker);
    }
  };

  const mapStyles = [
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'road',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'landscape',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'administrative',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'water',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ];

  const onMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarker(newMarker);
  };

  useEffect(() => {
    if (isLoaded) {
      setShowButton(true);
    }
  }, [isLoaded]);


  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
      <Subheader text={"Placera en nål på kartan där du tror att videon ägde rum"} />
      <div className="wrapper">
        {isLoaded && (
          <GoogleMap
            mapContainerClassName="mapContainer"
            center={center}
            zoom={startZoom}
            onClick={onMapClick}
            options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
          >
            {marker && <Marker 
                        position={{ lat: marker.lat, lng: marker.lng }} 
                        icon={{
                          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", 
                          scaledSize: new window.google.maps.Size(40, 40)
                          }} 
                        />
            }
          </GoogleMap>
        )}
      </div>
      {showButton && <button onClick={handleMarkerClick} id="markerButton">Här är det!</button>}
    </div>
  );
}

export default GuessMap;