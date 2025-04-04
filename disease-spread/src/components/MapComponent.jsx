import React from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ infectedLocations }) => {
  return (
    <MapContainer center={[20, 78]} zoom={4} className="w-full h-80 rounded-lg">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {infectedLocations.map((location, index) => (
        <Circle
          key={index}
          center={location}
          radius={20000}
          fillColor="red"
          color="darkred"
          fillOpacity={0.5}
        >
          <Popup>Quarantine Zone</Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
