
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

export default function EditableField({
  label,
  type = 'text',
  value,
  onSave,
  readOnly = false
}) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(value);

  // 부모에서 value가 바뀔 때 내부 입력값 동기화
  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleClick = () => {
    if (editing) {
      if (typeof onSave === 'function') {
        onSave(input);
      }
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  return (
    <Row className="align-items-center mb-3">
      <Col xs={3}><strong>{label}</strong></Col>
      <Col xs={6}>
        {readOnly ? (
          <span>{value}</span>
        ) : editing ? (
          <Form.Control
            type={type}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        ) : (
          <span>{value}</span>
        )}
      </Col>
      <Col xs={3}>
        {!readOnly && (
          <Button
            variant={editing ? 'success' : 'outline-primary'}
            size="sm"
            onClick={handleClick}
          >
            {editing ? 'Save' : 'Edit'}
          </Button>
        )}
      </Col>
    </Row>
  );
}
