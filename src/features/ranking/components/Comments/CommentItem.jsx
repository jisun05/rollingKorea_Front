import React, { useState } from 'react';
import { ListGroup, Button, Form, Badge } from 'react-bootstrap';
import ReplyList from './ReplyList';

export default function CommentItem({
  comment,
  onDelete,
  onUpdate,
  onLike,
  onReply
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  const handleSave = () => {
    onUpdate(comment.id, text);
    setEditing(false);
  };

  return (
    <ListGroup.Item className="mb-2">
      <div className="d-flex justify-content-between align-items-start">
        {editing ? (
          <Form.Control
            as="textarea"
            rows={2}
            value={text}
            onChange={e => setText(e.target.value)}
          />
        ) : (
          <div>
            <strong>{comment.author}</strong>{' '}
            <small className="text-muted">{comment.date}</small>
            <p className="mb-1">{comment.text}</p>
          </div>
        )}

        <div>
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => onLike(comment.id)}
          >
            👍 {comment.likes}
          </Button>{' '}
          {!editing && comment.replies && comment.replies.length > 0 && (
            <Badge bg="secondary" className="me-2">
              💬 {comment.replies.length}
            </Badge>
          )}
          {comment.isOwn && (
            <>
              {editing ? (
                <Button size="sm" variant="success" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </Button>
              )}{' '}
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => onDelete(comment.id)}
              >
                Delete
              </Button>{' '}
            </>
          )}
          {comment.canReply && !editing && (
            <Button
              size="sm"
              variant="outline-info"
              onClick={() => onReply(comment.id)}
            >
              Reply
            </Button>
          )}
        </div>
      </div>

      {/* 답글이 있으면 렌더 */}
      {comment.replies && (
        <div className="mt-2 ps-4">
          <ReplyList replies={comment.replies} />
        </div>
      )}
    </ListGroup.Item>
  );
}