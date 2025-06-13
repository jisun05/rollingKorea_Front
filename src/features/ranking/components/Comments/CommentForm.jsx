// src/features/ranking/components/Comments/CommentForm.jsx
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form, Spinner, Button } from 'react-bootstrap';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
  ],
};

export default function CommentForm({ onSubmit = () => {}, isLoading = false }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const textOnly = value.replace(/<(.|\n)*?>/g, '').trim();
    if (!textOnly) return;
    onSubmit(value);
    setValue('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      {/* wrapper에 position-relative, padding-bottom으로 버튼 공간 확보 */}
      <div style={{ position: 'relative', paddingBottom: '60px' }}>
        {/* 인라인 <style> 로만 이 컴포넌트에서만 적용 */}
        <style>{`
          .comment-editor .ql-editor {
            min-height: 200px;  /* 사진10처럼 충분히 큰 높이 */
          }
        `}</style>

        <ReactQuill
          className="comment-editor"
          theme="snow"
          modules={modules}
          value={value}
          onChange={setValue}
          placeholder="Share some thoughts..."
          readOnly={isLoading}
          style={{
            maxHeight: '400px',
            overflow: 'auto'
          }}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 10,
          }}
        >
          {isLoading
            ? <Spinner as="span" animation="border" size="sm" />
            : 'Submit'
          }
        </Button>
      </div>
    </Form>
  );
}
