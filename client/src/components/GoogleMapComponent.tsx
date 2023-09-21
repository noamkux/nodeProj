import { GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";

interface GoogleMapComponentProps {
  city: string;
  street: string;
  houseNumber: string;
  apiKey: string;
}

const GoogleMapComponent: FunctionComponent<GoogleMapComponentProps> = ({
  city,
  street,
  houseNumber,
  apiKey,
}) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  const [coordinates, setCoordinates] = useState({ lat: 10, lng: 8 });
  const [isLoaded, setIsLoaded] = useState(false);

  const address = `${houseNumber} ${street} ${city}`;
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  useEffect(() => {
    axios
      .get(geocodeUrl)
      .then((response) => {
        const location = response.data.results[0]?.geometry?.location;

        if (location) {
          setCoordinates({ lat: location.lat, lng: location.lng });
          setIsLoaded(true);
      
        } 
      })
      .catch((error) => {
        console.error("Error fetching geocoding data:", error);
      })
      
  }, [city, street, houseNumber, apiKey, geocodeUrl]);

  return (
    <>
        {isLoaded && (
          <GoogleMap
        
            mapContainerStyle={containerStyle}
            center={coordinates}
            zoom={15}
          >
            <Marker position={coordinates} />
          </GoogleMap>
        )}
    </>
  );
};

export default GoogleMapComponent;
