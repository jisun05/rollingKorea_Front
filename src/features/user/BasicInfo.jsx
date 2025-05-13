import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import EditableField from './EditableField';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;  // .env.* 에서 정의
const editableFields = ['userName', 'nickname', 'location', 'mobile', 'birthday'];

const labelMap = {
  email:     'Email',
  userName:  'User Name',
  nickname:  'Nick Name',
  location:  'Location',
  mobile:    'Mobile Number',
  birthday:  'Birthday',
};

const typeMap = {
  email:    'email',
  birthday: 'date',
  mobile:   'tel',
};

export default function BasicInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(err => {
      console.error('프로필 조회 실패', err.response || err);
      setLoadError(true);
    })
    .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (loadError) return <div>프로필 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.</div>;

  const handleSave = async (field, newVal) => {
    const prev = user[field];
    // 1) Optimistic UI: 즉시 업데이트
    setUser(u => ({ ...u, [field]: newVal }));

    try {
      const res = await axios.patch(
        `${API_BASE_URL}/users/me`,
        { [field]: newVal },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // 2) 응답 데이터를 병합하여 다른 필드가 초기화되지 않도록 함
      setUser(u => ({ ...u, ...res.data }));
    } catch (err) {
      console.error('업데이트 실패', err.response || err);
      // 3) 롤백: 실패 시 이전 값으로 복원
      setUser(u => ({ ...u, [field]: prev }));
    }
  };

  const handleWithdraw = async () => {
    if (!window.confirm('정말 탈퇴하시겠습니까?')) return;
    try {
      await axios.delete(
        `${API_BASE_URL}/users/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = '/';
    } catch (err) {
      console.error('탈퇴 실패', err.response || err);
      alert('탈퇴 도중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      {/* Email (읽기 전용) */}
      <EditableField
        label={labelMap.email}
        type={typeMap.email}
        value={user.email}
        readOnly
      />

      {/* userName 포함, 나머지 수정 가능한 필드 */}
      {editableFields.map(key => (
        <EditableField
          key={key}
          label={labelMap[key]}
          type={typeMap[key] || 'text'}
          value={user[key] || ''}
          onSave={newVal => handleSave(key, newVal)}
        />
      ))}

      <div className="text-end mt-4">
        <Button variant="outline-danger" onClick={handleWithdraw}>
          Withdraw
        </Button>
      </div>
    </>
  );
}
