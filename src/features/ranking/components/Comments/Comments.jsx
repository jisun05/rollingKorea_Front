// src/features/ranking/components/Comments/Comments.jsx
import React from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { Spinner, Alert } from 'react-bootstrap';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

// 댓글 조회 API
async function fetchComments(rankingId) {
  const res = await fetch(`/api/rankings/${rankingId}/comments`);
  if (!res.ok) throw new Error('댓글을 불러올 수 없습니다.');
  const json = await res.json();
  return json.comments;
}

// 댓글 작성 API
async function postComment({ rankingId, text }) {
  const res = await fetch(`/api/rankings/${rankingId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error('댓글 작성에 실패했습니다.');
  return res.json();
}

export default function Comments({ rankingId }) {
  const queryClient = useQueryClient();

  // ★ useQuery 객체 시그니처
  const {
    data: comments = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['comments', rankingId],
    queryFn: () => fetchComments(rankingId),
    select: list => [...list].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    ),
    staleTime: 1000 * 60 * 2,
  });

  // ★ useMutation 객체 시그니처
  const { mutate: create, isLoading: isPosting } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', rankingId] });
    }
  });

  if (isLoading) return <Spinner animation="border" />;
  if (error)     return <Alert variant="danger">{error.message}</Alert>;

  return (
    <div>
      <CommentForm
        isLoading={isPosting}
        onSubmit={text => create({ rankingId, text })}
      />
      <CommentList comments={comments} />
    </div>
  );
}
