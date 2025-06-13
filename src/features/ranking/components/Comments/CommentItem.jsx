import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { parseISO, format } from 'date-fns';

export default function CommentItem({ comment }) {
  // ISO → Date → format
  let dateStr = '';
  try {
    const dt = parseISO(comment.createdAt);
    dateStr = format(dt, 'dd-MM-yyyy');
  } catch {
    dateStr = '';
  }

  return (
    <ListGroup.Item className="mb-2">
      <div style={{ marginBottom: 8 }}>
        <strong>{comment.nickname}</strong>{' '}
        <small className="text-muted">{dateStr}</small>
      </div>
      {/* HTML 렌더링 */}
      <div
        dangerouslySetInnerHTML={{ __html: comment.content }}
        style={{ marginBottom: 8 }}
      />
      <div className="text-muted">
        {/* 좋아요/답글/에딧/딜리트 버튼 자리 (추가 구현 가능) */}
      </div>
    </ListGroup.Item>
  );
}
