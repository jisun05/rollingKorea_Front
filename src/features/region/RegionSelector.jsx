// src/features/region/RegionSelector.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

const options = [
  { label: 'Seoul',     value: 'Seoul' },
  { label: 'Incheon',   value: 'Incheon' },
  { label: 'Gyeonggi',  value: 'Gyeonggi' },
  { label: 'Chungnam',  value: 'Chungnam' },
  { label: 'Chungbuk',  value: 'Chungbuk' },
  { label: 'Jeonbuk',   value: 'Jeonbuk' },
  { label: 'Jeonnam',   value: 'Jeonnam' },
  { label: 'Gyeongnam', value: 'Gyeongnam' },
  { label: 'Gyeongbuk', value: 'Gyeongbuk' },
  { label: 'Gangwon',   value: 'Gangwon' },
  { label: 'Jeju',      value: 'Jeju' },
];

export default function RegionSelector({ value, onChange }) {
  return (
    <Form.Select
      size="lg"
      value={value}
      onChange={e => onChange(e.target.value)}  // 문자열 그대로 전달
      className="mb-3"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Form.Select>
  );
}
