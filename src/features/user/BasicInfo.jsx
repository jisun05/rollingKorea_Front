// src/features/user/BasicInfo.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import EditableField from './EditableField'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const labelMap = {
  email:     'Email',
  nickName:  'Nick Name',
  mobile:    'Mobile Number',
  userName:  'User Name',
  location:  'Location',
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
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

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

  const getBirthdayString = raw => {
    if (!raw) return '';
    if (typeof raw === 'string') {
      return raw.split('T')[0];
    }
    if (typeof raw === 'number') {
      return new Date(raw).toISOString().split('T')[0];
    }
    if (raw.year && raw.month && raw.day) {
      const m = String(raw.month).padStart(2, '0');
      const d = String(raw.day).padStart(2, '0');
      return `${raw.year}-${m}-${d}`;
    }
    if (Array.isArray(raw) && raw.length >= 3) {
      const [y, m, d] = raw;
      return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    }
    return '';
  };

  const handleSave = async (apiKey, newVal) => {
    const prev = apiKey === 'birthday'
      ? getBirthdayString(user.birthday)
      : apiKey === 'nickname'
        ? user.nickName
        : apiKey === 'mobile'
          ? user.phoneNumber
          : user[apiKey];

    setUser(u => ({
      ...u,
      [apiKey === 'nickname' ? 'nickName'
        : apiKey === 'mobile'   ? 'phoneNumber'
        : apiKey]: newVal
    }));

    try {
      const res = await axios.patch(
        `${API_BASE_URL}/users/me`,
        { [apiKey]: newVal },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
    } catch (err) {
      console.error('업데이트 실패', err.response || err);
      setUser(u => ({
        ...u,
        [apiKey === 'nickname' ? 'nickName'
          : apiKey === 'mobile'   ? 'phoneNumber'
          : apiKey]: prev
      }));
    }
  };

  const handleWithdraw = async () => {
    if (!window.confirm('정말 탈퇴하시겠습니까?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      logout();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('탈퇴 실패', err.response || err);
      alert('탈퇴 도중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <EditableField
        label={labelMap.email}
        type={typeMap.email}
        value={user.loginId}
        readOnly
      />

      <EditableField
        label={labelMap.nickName}
        type="text"
        value={user.nickName || ''}
        onSave={newVal => handleSave('nickname', newVal)}
      />

      <EditableField
        label={labelMap.mobile}
        type={typeMap.mobile}
        value={user.phoneNumber || ''}
        onSave={newVal => handleSave('mobile', newVal)}
      />

      <EditableField
        label={labelMap.userName}
        type="text"
        value={user.userName || ''}
        onSave={newVal => handleSave('userName', newVal)}
      />

      <EditableField
        label={labelMap.location}
        type="text"
        value={user.location || ''}
        onSave={newVal => handleSave('location', newVal)}
      />

      <EditableField
        label={labelMap.birthday}
        type={typeMap.birthday}
        value={getBirthdayString(user.birthday)}
        onSave={newVal => handleSave('birthday', newVal)}
      />

      <div className="text-end mt-4">
        <Button variant="outline-danger" onClick={handleWithdraw}>
          Withdraw
        </Button>
      </div>
    </>
  );
}
