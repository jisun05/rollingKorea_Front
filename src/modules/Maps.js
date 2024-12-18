import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Maps = ({ position, placeName  }) => {
    return (
        <MapContainer 
            center={position} 
            zoom={10} 
            style={{ 
                border: '2px solid black', 
                height: '80vh', 
                width: '60vw', 
                boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)' 
            }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

            />
            <Marker position={position}>
                <Popup>        
                    {placeName}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Maps; 
