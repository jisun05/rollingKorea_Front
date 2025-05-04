import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function CommentForm() {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    // TODO: API POST /api/comments
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
      />
      <div className="text-end mt-2">
        <Button type="submit" variant="purple">Submit</Button>
      </div>
    </Form>
  );
}