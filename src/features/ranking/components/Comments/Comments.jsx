
import React from 'react';
import { useAuth } from '../../../../features/auth/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

// 댓글 목록 조회
async function fetchComments() {
  const res = await fetch('/api/comments');
  if (!res.ok) throw new Error('댓글 조회에 실패했습니다.');
  const { content } = await res.json();
  return content;
}

// 댓글 작성
async function postComment({ content, userId }) {
  const res = await fetch(`/api/comments?userId=${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error('댓글 작성에 실패했습니다.');
  return res.json();
}

export default function Comments() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  // 1) 댓글 전체 로드
  const { data: allComments = [], isLoading, error } = useQuery({
    queryKey: ['comments'],
    queryFn: fetchComments,
    staleTime: 1000 * 60, // 1분 캐시
  });

  // 2) 댓글 추가
  const createMut = useMutation({
    mutationFn: html => postComment({ content: html, userId: user.userId }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['comments'] }),
    onError: err => alert(err.message),
  });

  if (isLoading) return <Spinner animation="border" />;
  if (error)     return <Alert variant="danger">{error.message}</Alert>;

  return (
    <div>
      {isLoggedIn ? (
        <CommentForm
          isLoading={createMut.isLoading}
          onSubmit={html => createMut.mutate(html)}
        />
      ) : (
        <Alert variant="info">
          로그인 후 댓글을 남길 수 있습니다.&nbsp;
          <Button variant="link" onClick={() => navigate('/')}>
            로그인
          </Button>
        </Alert>
      )}

      {/* CommentList 내부에서 숫자 페이징을 처리합니다 */}
      <CommentList comments={allComments} />
    </div>
  );
}
