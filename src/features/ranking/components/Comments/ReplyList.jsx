import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function ReplyList({ replies = [] }) {
  return (
    <div className="ms-4 mt-2">
      {replies.map(r => (
        <ListGroup.Item key={r.id} className="mb-1">
          <p className="mb-1"><strong>Reply:</strong> {r.text}</p>
          <small className="text-muted">{new Date(r.date).toLocaleString()}</small>
        </ListGroup.Item>
      ))}
    </div>
  );
}
