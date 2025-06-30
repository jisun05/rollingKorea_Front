// src/features/region/RegionSelector.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

// heritage API 상의 areaCode 값 매핑
const options = [
  { label: 'Seoul',     value: 1   },
  { label: 'Incheon',   value: 2   },
  { label: 'Gyeonggi',  value: 31  },
  { label: 'Chungnam',  value: 32  },
  { label: 'Chungbuk',  value: 33  },
  { label: 'Jeonbuk',   value: 34  },
  { label: 'Jeonnam',   value: 35  },
  { label: 'Gyeongnam', value: 36  },
  { label: 'Gyeongbuk', value: 37  },
  { label: 'Gangwon',   value: 38  },
  { label: 'Jeju',      value: 39  },
];

export default function RegionSelector({ value, onChange }) {
  return (
    <Form.Select
      size="lg"
      value={value}
      onChange={e => onChange(Number(e.target.value))}
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
