import React from 'react';
import { Button } from 'react-bootstrap';

function Place({ place }) {
    return (
        <Button 
        style={{ display: 'flex', alignItems: 'center', width: '31rem', height: '5rem', margin: '10px', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden', textAlign: 'left', padding: '0' }} 
        variant="light" // 버튼 색상 설정
        onClick={() => console.log("Button clicked")} // 버튼 클릭 이벤트 예시
    >
        <img 
            style={{ width: '8rem', height: '5rem', objectFit: 'cover' }} // 이미지 크기 조정
            src={place.imagePath} 
            alt={place.placeName}
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0.5rem', height: '100%' }}>
            <h5 style={{ margin: '0', fontSize: '1rem', paddingTop: '0.2rem' }}>{place.placeName}</h5> {/* 장소 이름 */}
            <div style={{ fontSize: '0.9rem', marginTop: 'auto' }}>             
            </div>
        </div>
    </Button>
    );
}

export default Place;