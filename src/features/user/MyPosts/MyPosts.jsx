import React from 'react';
import CommentList from './CommentList';
import { useAuth } from '../../auth/AuthContext'; // ✅ 수정된 경로

export default function MyPosts() {
  const { user } = useAuth();

  return (
    <div style={{ padding: '1rem' }}>
      {user && <CommentList userId={user.userId} />}
    </div>
  );
}
