// src/features/user/BasicInfo.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import EditableField from './EditableField';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

// 1) 한 번만 세팅해 주세요
axios.defaults.withCredentials = true;

export default function BasicInfo() {
  const [user, setUser]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [loadError, setLoadError] = useState(false);
  const navigate                = useNavigate();
  const { logout }              = useContext(AuthContext);

  useEffect(() => {
    // 2) 상대경로로 요청 → CRA dev 서버가 http://localhost:8080 으로 프록시
    axios.get('/api/users/me')
      .then(res => setUser(res.data))
      .catch(err => {
        console.error('프로필 조회 실패', err);
        setLoadError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)   return <div>Loading...</div>;
  if (loadError) return <div>프로필 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.</div>;

  const formatDate = raw => {
    if (!raw) return '';
    if (typeof raw === 'string')      return raw.split('T')[0];
    if (typeof raw === 'number')      return new Date(raw).toISOString().split('T')[0];
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

  const handleSave = async (field, newVal) => {
    const prev = user[field];
    setUser(u => ({ ...u, [field]: newVal }));

    try {
      const res = await axios.patch(
        '/api/users/me',
        { [field]: newVal }
      );
      setUser(res.data);
    } catch (err) {
      console.error('업데이트 실패', err);
      setUser(u => ({ ...u, [field]: prev }));
    }
  };

  const handleWithdraw = async () => {
    if (!window.confirm('정말 탈퇴하시겠습니까?')) return;
    try {
      await axios.delete('/api/users/me');
      logout();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('탈퇴 실패', err);
      alert('탈퇴 도중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <EditableField label="Email"    type="email"  value={user.loginId} readOnly />

      <EditableField
        label="Nick Name"
        type="text"
        value={user.nickName||''}
        onSave={v=>handleSave('nickName',v)}
      />

      <EditableField
        label="Mobile Number"
        type="tel"
        value={user.phoneNumber||''}
        onSave={v=>handleSave('phoneNumber',v)}
      />

      <EditableField
        label="User Name"
        type="text"
        value={user.userName||''}
        onSave={v=>handleSave('userName',v)}
      />

      <EditableField
        label="Location"
        type="text"
        value={user.location||''}
        onSave={v=>handleSave('location',v)}
      />

      <EditableField
        label="Birthday"
        type="date"
        value={formatDate(user.birthday)}
        onSave={v=>handleSave('birthday',v)}
      />

      <div className="text-end mt-4">
        <Button variant="outline-danger" onClick={handleWithdraw}>
          Withdraw
        </Button>
      </div>
    </>
  );
}
