import React from 'react';
import { Button } from 'react-bootstrap';

function Place({ place, onPlaceClick }) {
    const handleClick = () => {
        const { placeName,latitude, longitude } = place; 
        onPlaceClick(latitude, longitude, placeName);
    };

    return (
        <Button 
            style={{ display: 'flex', alignItems: 'center', width: '31rem', height: '5rem', margin: '10px', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden', textAlign: 'left', padding: '0' }} 
            variant="light"
            onClick={handleClick}
        >
            <img 
                style={{ width: '8rem', height: '5rem', objectFit: 'cover' }} 
                src={place.imagePath} 
                alt={place.placeName}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0.5rem', height: '100%' }}>
                <h5 style={{ margin: '0', fontSize: '1rem', paddingTop: '0.2rem' }}>{place.placeName}</h5>
                <div style={{ fontSize: '0.9rem', marginTop: 'auto' }}>             
                </div>
            </div>
        </Button>
    );
}
export default Place;
