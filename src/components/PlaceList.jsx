// src/features/place/PlaceList.jsx
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import PlaceItem from '../region/PlaceItem'

export default function PlaceList({ places, onPlaceClick, onLikeClick }) {
  return (
    <Row>
      {places.map(place => (
        <Col key={place.contentId} sm={12}>
          <PlaceItem
            place={place}
            onClick={onPlaceClick}
            onLikeClick={onLikeClick}
          />
        </Col>
      ))}
    </Row>
  )
}
