import React from 'react';
import Place from './components'; // 위에서 만든 카드 컴포넌트
import { Row, Col } from 'react-bootstrap';

const products = [
    {
        title: '상품 1',
        description: '상품 1에 대한 설명',
        price: 100,
        image: 'https://via.placeholder.com/150'
    },
    {
        title: '상품 2',
        description: '상품 2에 대한 설명',
        price: 150,
        image: 'https://via.placeholder.com/150'
    },
    // 더 많은 상품 추가 가능
];

function PlaceList() {
    return (
        <Row>
            {products.map((place) => (
                <Col key={place.title} sm={4}>
                    <Place place={place} />
                </Col>
            ))}
        </Row>
    );
}

export default PlaceList;