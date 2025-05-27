// src/features/region/PlaceItem.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { HeartFill, Heart } from 'react-bootstrap-icons';

export default function PlaceItem({ place, onClick, onLikeClick, isLoggedIn }) {
  return (
    <Card className="mb-3" style={{ width: '100%' }}>
      {place.imageList && place.imageList.length > 0 && (
        <Card.Img
          variant="top"
          src={`data:image/jpeg;base64,${place.imageList[0].imageData}`}
          alt={place.placeName}
          style={{ maxHeight: '200px', objectFit: 'cover' }}
        />
      )}
      <Card.Body>
        <Card.Title>{place.placeName}</Card.Title>
        <Card.Text>{place.placeDescription}</Card.Text>

        <div className="d-flex justify-content-between align-items-center">
          <Button
            variant="outline-primary"
            onClick={() =>
              onClick(place.latitude, place.longitude, place.placeName)
            }
          >
            지도에서 보기
          </Button>

          <div
            style={{ cursor: 'pointer' }}
            onClick={() => onLikeClick(place.placeId)}
          >
            {place.liked ? (
              <HeartFill color="red" size={24} />
            ) : (
              <Heart size={24} />
            )}{' '}
            좋아요
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
