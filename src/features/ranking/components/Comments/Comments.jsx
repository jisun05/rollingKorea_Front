// src/features/ranking/components/Comments/Comments.jsx
import React from 'react';
import { useAuth } from '../../../../features/auth/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

// ————————————————————————
// 1) API helper functions
// ————————————————————————
const API_BASE = process.env.REACT_APP_API_URL || '';

async function fetchComments() {
  const res = await fetch(`${API_BASE}/api/comments`);
  if (!res.ok) throw new Error('댓글 조회에 실패했습니다.');
  const { content } = await res.json();
  return content;
}

async function postComment({ userId, content }) {
  const res = await fetch(
    `${API_BASE}/api/comments?userId=${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || '댓글 작성에 실패했습니다.');
  }
  return res.json(); // { commentId, nickname, content, createdAt, … }
}

// ————————————————————————
// 2) Comments 컴포넌트
// ————————————————————————
export default function Comments() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  // 1) 댓글 목록 조회 (v5 object signature)
  const { data: comments = [], isLoading, error } = useQuery({
    queryKey: ['comments'],
    queryFn: fetchComments,
    staleTime: 1000 * 60,   // 1분간 캐시 유지
  });

  // 2) 댓글 생성, 성공 시 캐시 무효화 → 재조회
  const createMut = useMutation({
    mutationFn: ({ content }) => postComment({ userId: user.userId, content }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['comments'] }),
    onError: err => alert('댓글 작성 중 오류: ' + err.message)
  });

  if (isLoading) return <Spinner animation="border" />;
  if (error)     return <Alert variant="danger">{error.message}</Alert>;

  return (
    <div>
      {isLoggedIn ? (
        <CommentForm
          isLoading={createMut.isLoading}
          onSubmit={content => createMut.mutate({ content })}
        />
      ) : (
        <Alert variant="info">
          로그인 후 댓글을 남길 수 있습니다.{' '}
          <Button variant="link" onClick={() => navigate('/')}>
            로그인
          </Button>
        </Alert>
      )}

      <CommentList comments={comments} />
    </div>
  );
}
