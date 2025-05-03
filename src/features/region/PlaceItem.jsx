// src/features/region/PlaceItem.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function PlaceItem({ place, onClick }) {
  return (
    <Card className="mb-2" style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title>{place.name}</Card.Title>
        <Button
          variant="outline-primary"
          onClick={() => onClick(place.latitude, place.longitude, place.name)}
        >
          지도에서 보기
        </Button>
      </Card.Body>
    </Card>
  );
}
