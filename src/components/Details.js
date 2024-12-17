import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Place from './Place';
import apiClient from '../utils/Log';
import Maps from '../modules/Maps';
import ErrorBoundary from '../utils/ErrorBoundary';

function Details() {
    const { region } = useParams();
    const [selectedRegion, setSelectedRegion] = useState(region);
    const [places, setPlaces] = useState([]); // 장소 데이터를 저장할 상태
    const navigate = useNavigate();

    const options = [
        'Gyeonggi-do',
        'Chungcheongnam-do',
        'Chungcheongbuk-do',
        'Jeollabuk-do',
        'Jeollanam-do',
        'Gyeongsangnam-do',
        'Gyeongsangbuk-do',
        'Gangwon-do',
        'Jeju'
    ];

    useEffect(() => {
        setSelectedRegion(region);
        fetchPlaces(region); // API 호출
    }, [region]);

    // API 호출 함수
    const fetchPlaces = async (region) => {
        try {
            const response = await apiClient.get(`http://localhost:8080/api/place?region=${region}`);
            setPlaces(response.data); // 가져온 데이터 설정
            console.log(response.data); 
        } catch (error) {
            console.error("Error fetching places:", error.response ? error.response.data : error.message);
        }
    };

    const handleSelectChange = (e) => {
        const newRegion = e.target.value;
        setSelectedRegion(newRegion);
        navigate(`/details/${newRegion}`);
    };

    return ( 
        <div style={{ display: 'flex', marginLeft: '30px', marginTop: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <p style={{ marginRight: '10px', fontSize: '20px', marginBottom: '10px' }}>Your Choice</p>
                <Form.Select size="lg" value={selectedRegion} onChange={handleSelectChange} style={{ width: '31rem', marginBottom: '20px' }}>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Form.Select>
                <Tabs defaultActiveKey="DAY1" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="DAY1" title="DAY1">
                        {places.filter(place => place.whichDay === 'DAY1').length > 0 ? (
                            places.filter(place => place.whichDay === 'DAY1').map((place) => (
                                <Place key={place.id} place={place} />
                            ))
                        ) : (
                            <p>DAY1 Loading place information...</p>
                        )}
                    </Tab>
                    <Tab eventKey="DAY2" title="DAY2">
                        {places.filter(place => place.whichDay === 'DAY2').length > 0 ? (
                            places.filter(place => place.whichDay === 'DAY2').map((place) => (
                                <Place key={place.id} place={place} />
                            ))
                        ) : (
                            <p>DAY2 Loading place information...</p>
                        )}
                    </Tab>
                    <Tab eventKey="DAY3" title="DAY3">
                        {places.filter(place => place.whichDay === 'DAY3').length > 0 ? (
                            places.filter(place => place.whichDay === 'DAY3').map((place) => (
                                <Place key={place.id} place={place} />
                            ))
                        ) : (
                            <p>DAY3 Loading place information...</p>
                        )}
                    </Tab>
                </Tabs>
            </div>
            <div style={{ 
                width: '60vw',      
                height: '90vh',     
                border: '2px solid black', 
                backgroundColor: 'white', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)', 
                fontSize: '20px',     
                marginLeft: '5vw'    //  between Tabs and div 
            }}>
              {/* <Maps/>          */}
            </div>
        </div>
    );
}

export default Details;
