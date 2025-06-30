import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { HeartFill, Heart } from 'react-bootstrap-icons';

export default function PlaceItem({ place, onClick, onLikeClick }) {
  // PlaceResponse.imageList[].imageUrl
  const imageUrl = place.imageList?.[0]?.imageUrl;

  return (
    <Card className="mb-3" style={{ width: '100%' }}>
      {imageUrl && (
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={place.title}
          style={{ objectFit: 'cover', height: '200px' }}
        />
      )}
      <Card.Body>
        <Card.Title>{place.title}</Card.Title>
        {/* addr1 + addr2 */}
        <Card.Text>{`${place.addr1 || ''} ${place.addr2 || ''}`.trim()}</Card.Text>

        <div className="d-flex justify-content-between align-items-center">
          <Button
            variant="outline-primary"
            onClick={() =>
              // heritage: mapY = latitude, mapX = longitude
              onClick(place.mapY, place.mapX, place.title)
            }
          >
            지도에서 보기
          </Button>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => onLikeClick(place.contentId)}
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
