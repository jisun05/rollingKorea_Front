import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Maps = () => {
    const position = [51.505, -0.09]; // 초기 위치 설정

    return (
        <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
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
