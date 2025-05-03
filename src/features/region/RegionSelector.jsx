// src/features/region/RegionSelector.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

const options = [
  'Seoul Area','Gyeonggi Area','Chungnam Area','Chungbuk Area',
  'Jeonbuk Area','Jeonnam Area','Gyeongnam Area','Gyeongbuk Area',
  'Gangwon Area','Jeju Area'
];

export default function RegionSelector({ value, onChange }) {
  return (
    <Form.Select
      size="lg"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="mb-3"
    >
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </Form.Select>
  );
}
