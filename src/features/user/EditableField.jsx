// src/components/EditableField.js
import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

export default function EditableField({ label, type = 'text', value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(value);

  const handleClick = () => {
    if (editing) {
      onSave(input);
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  return (
    <Row className="align-items-center mb-3">
      <Col xs={3}><strong>{label}</strong></Col>
      <Col xs={6}>
        {editing
          ? <Form.Control
              type={type}
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          : <span>{value}</span>
        }
      </Col>
      <Col xs={3}>
        <Button
          variant={editing ? 'success' : 'outline-primary'}
          size="sm"
          onClick={handleClick}
        >
          {editing ? 'Save' : 'Edit'}
        </Button>
      </Col>
    </Row>
  );
}
