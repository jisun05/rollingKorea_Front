// src/components/MyPage/BasicInfo.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import EditableField from './EditableField';

export default function BasicInfo() {
  // 실제론 API에서 불러오시면 됩니다.
  const [user, setUser] = useState({
    firstName: 'Jisun',
    email: 'rollingKorea@gmail.com',
    nickname: 'angryCat',
    location: 'South Korea',
    gender: 'Female',
    mobile: '+82 01082341234',
    birthday: '05.05.1996',
    password: '********',
  });

  const handleSave = (field, newVal) => {
    setUser(u => ({ ...u, [field]: newVal }));
    // TODO: 동시에 서버에 PATCH/PUT 요청
  };

  return (
    <>
      {Object.entries(user).map(([key, val]) => {
        // 라벨 맵핑
        const labelMap = {
          firstName: 'First Name',
          email: 'Email',
          nickname: 'Nick Name',
          location: 'Location',
          gender: 'Gender',
          mobile: 'Mobile Number',
          birthday: 'Birthday',
          password: 'Password',
        };
        // input 타입
        const typeMap = {
          email: 'email',
          birthday: 'date',
          password: 'password',
          mobile: 'tel',
        };
        return (
          <EditableField
            key={key}
            label={labelMap[key]}
            type={typeMap[key] || 'text'}
            value={val}
            onSave={newVal => handleSave(key, newVal)}
          />
        );
      })}

      <div className="text-end mt-4">
        <Button variant="outline-danger">Withdraw</Button>
      </div>
    </>
  );
}
