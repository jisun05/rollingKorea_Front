import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function CommentItem({ comment, selected, onSelect, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(comment.text);

  const handleSave = () => {
    onUpdate(input);
    setEditing(false);
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
          {editing ? (
            <Form.Control
              as="textarea"
              rows={2}
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          ) : (
            <p className="mb-1">
              {comment.isReply && <strong>re)&nbsp;</strong>}
              {comment.text}
            </p>
          )}
          <small className="text-muted">{comment.date}</small>
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
