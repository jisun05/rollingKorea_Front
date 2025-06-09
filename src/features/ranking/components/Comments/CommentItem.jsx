// src/features/ranking/components/Comments/CommentItem.jsx
import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function CommentItem({ comment }) {
  return (
    <ListGroup.Item className="mb-2">
      <p className="mb-1">{comment.content}</p>
      <small className="text-muted">
        {comment.nickname} · {new Date(comment.createdAt).toLocaleString()}
      </small>
    </ListGroup.Item>
  );
}
