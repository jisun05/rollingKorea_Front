import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Place({ place }) {
    return (
        <div> 
            <Card style={{ width: '18rem', margin: '10px' }}>
               {/* <Card.Img variant="top" src={place.image} />  이미지 데이터 주석 처리 */}
                <Card.Body>
                    <Card.Title>{place.placeName}</Card.Title> {/* 장소 이름 */}
                
                    <Card.Text>
                        <strong>{place.region}</strong> 
                    </Card.Text> 
                    <Button variant="primary">관련사이트 이동</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Place;