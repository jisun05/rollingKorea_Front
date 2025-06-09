// src/features/ranking/components/Comments/CommentForm.jsx
import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

export default function CommentForm({
  onSubmit = () => console.error('[CommentForm] onSubmit missing'),
  isLoading = false
}) {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    console.log('[CommentForm] handleSubmit, text=', trimmed);
    onSubmit(trimmed);
    setText('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Control
        as="textarea"
        rows={3}
        placeholder="Share some thoughts..."
        value={text}
        onChange={e => setText(e.target.value)}
        disabled={isLoading}
      />
      <div className="text-end mt-2">
        <Button type="submit" variant="purple" disabled={isLoading}>
          {isLoading
            ? <Spinner as="span" animation="border" size="sm" />
            : 'Submit'
          }
        </Button>
      </div>
    </Form>
  );
}
