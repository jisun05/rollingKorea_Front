// src/features/region/RegionSelector.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

// DB의 region 컬럼과 정확히 매칭되는 값으로만 옵션 구성
const options = [
  { label: 'Seoul', value: 'Seoul' },
  { label: 'Gyeonggi', value: 'Gyeonggi' },
  { label: 'Chungnam', value: 'Chungnam' },
  { label: 'Chungbuk', value: 'Chungbuk' },
  { label: 'Jeonbuk', value: 'Jeonbuk' },
  { label: 'Jeonnam', value: 'Jeonnam' },
  { label: 'Gyeongnam', value: 'Gyeongnam' },
  { label: 'Gyeongbuk', value: 'Gyeongbuk' },
  { label: 'Gangwon', value: 'Gangwon' },
  { label: 'Jeju', value: 'Jeju' },
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
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Form.Select>
  );
}
