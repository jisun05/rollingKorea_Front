import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Maps = () => {
    const position = [37.6301561, 126.9002100]; 

    return (
        <MapContainer 
            center={position} 
            zoom={13} 
            style={{ 
                border: '2px solid black', 
                height: '80vh', 
                width: '60vw', 
                boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)' 
            }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            <Marker position={position}>
                <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Maps;
