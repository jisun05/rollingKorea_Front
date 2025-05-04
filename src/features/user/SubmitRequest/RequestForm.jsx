import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function RequestForm() {
  const [subject, setSubject] = useState('');
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => setFiles([...e.target.files]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim()) return setError('제목을 입력해주세요.');
    if (!issueType) return setError('문의 타입을 선택해주세요.');
    if (description.trim().length < 10) return setError('내용은 최소 10자 이상 입력해야 합니다.');
    setError(null);

    // TODO: API POST 호출
    console.log({ subject, issueType, description, files });
    alert('문의가 정상 등록되었습니다.');
    setSubject('');
    setIssueType('');
    setDescription('');
    setFiles([]);
  };

  return (
    <>
      <h5>Submit a Request</h5>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formSubject" className="mb-3">
          <Form.Label>Subject *</Form.Label>
          <Form.Control type="text" value={subject} onChange={e => setSubject(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formType" className="mb-3">
          <Form.Label>Issue Type *</Form.Label>
          <Form.Select value={issueType} onChange={e => setIssueType(e.target.value)}>
            <option value="">-- Select Issue Type --</option>
            <option value="Account Issue">Account Issue</option>
            <option value="Feedback and Suggestions">Feedback and Suggestions</option>
            <option value="Technical Issue">Technical Issue</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formDesc" className="mb-3">
          <Form.Label>Description *</Form.Label>
          <Form.Control as="textarea" rows={6} value={description} onChange={e => setDescription(e.target.value)} />
          <Form.Text className="text-muted">최소 10자 이상 입력해주세요.</Form.Text>
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Attachments</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} />
          <Form.Text className="text-muted">파일을 추가하려면 클릭하거나 드래그하세요.</Form.Text>
        </Form.Group>

        <div className="text-end">
          <Button variant="primary" type="submit">Submit</Button>
        </div>
      </Form>
    </>
  );
}