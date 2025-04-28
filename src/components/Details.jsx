import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Place from './Place';
import apiClient from '../utils/Log';
import Maps from '../modules/Maps';

function Details() {
    const { region } = useParams();
    const [selectedRegion, setSelectedRegion] = useState(region);
    const [places, setPlaces] = useState([]); 
    const [mapPosition, setMapPosition] = useState([37.62591, 126.8981]); 
    const [placeName, setPlaceName] = useState('');
    const navigate = useNavigate();

    const options = [
        'Seoul Area',
        'Gyeonggi Area',
        'Chungnam Area',
        'Chungbuk Area',
        'Jeonbuk Area',
        'Jeonnam Area',
        'Gyeongnam Area',
        'Gyeongbuk Area',
        'Gangwon Area',
        'Jeju Area'
    ];

    useEffect(() => {
        setSelectedRegion(region);
        fetchPlaces(region); 
    }, [region]);

   
    const fetchPlaces = async (region) => {
        try {
            const response = await apiClient.get(`http://localhost:8080/api/place?region=${region}`);
            setPlaces(response.data); 
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

    const handlePlaceClick = (latitude, longitude , name) => {
        setMapPosition([latitude, longitude]); // move to click location
        setPlaceName(name);
    };

    return ( 
        <div style={{ display: 'flex', marginLeft: '30px', marginTop: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '4rem' }}>
                <p style={{ marginRight: '10px', fontSize: '20px', marginBottom: '10px' }}>Your Choice</p>
                <Form.Select size="lg" value={selectedRegion} onChange={handleSelectChange} style={{ width: '31rem', marginBottom: '20px' }}>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Form.Select>
                <Tabs defaultActiveKey="DAY1" id="uncontrolled-tab-example" className="mb-3">
                    {['DAY1', 'DAY2', 'DAY3'].map(day => (
                        <Tab eventKey={day} title={day} key={day}>
                            {places.filter(place => place.whichDay === day).length > 0 ? (
                                places.filter(place => place.whichDay === day).map((place) => (
                                    <Place 
                                        key={place.id} 
                                        place={place} 
                                        onPlaceClick={handlePlaceClick} // 클릭 이벤트 핸들러 전달
                                    />
                                ))
                            ) : (
                                <p>{day} Loading place information...</p>
                            )}
                        </Tab>
                    ))}
                </Tabs>
            </div>           
            <div style={{ flexGrow: 1 }}>
                <Maps position={mapPosition} placeName={placeName} /> 
            </div>
        </div>
    );
}

export default Details;
