import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function CommentItem({ comment, selected, onSelect, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(comment.content);

  const handleSave = () => {
    onUpdate(input);
    setEditing(false);
  };

  // 날짜 포맷: YYYY-MM-DD
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  };

  return (
    <div
      className="border mb-2 p-2"
      style={editing ? { borderLeft: '4px solid #0d6efd' } : {}}
    >
      <Row className="align-items-start">
        <Col xs="auto">
          <Form.Check
            type="checkbox"
            checked={selected}
            onChange={onSelect}
          />
        </Col>
        <Col>
          {/* 날짜 · 닉네임 표시 */}
          <div className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>
            {formatDate(comment.createdAt)} · {comment.nickname}
          </div>

          {editing ? (
            <Form.Control
              as="textarea"
              rows={2}
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: comment.content }}
              className="mb-1"
            />
          )}
        </Col>
        <Col xs="auto">
          {editing ? (
            <Button size="sm" variant="success" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button size="sm" variant="outline-secondary" onClick={() => setEditing(true)}>
              Edit
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}
