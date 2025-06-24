import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function CommentItem({ comment, selected, onSelect, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(comment.content);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/comments/${comment.commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: input }),
      });

      if (!res.ok) {
        throw new Error('댓글 수정 실패');
      }

      onUpdate(input);  // 부모 상태 반영
      setEditing(false);
    } catch (err) {
      console.error('❌ 댓글 수정 실패:', err);
      alert('댓글 수정에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

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
          <div className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>
            {formatDate(comment.createdAt)} · {comment.nickname}
          </div>

          {editing ? (
            <Form.Control
              as="textarea"
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
            <Button
              size="sm"
              variant="success"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}
