import React, { useState, useEffect } from 'react';
import { Form, Pagination, Button } from 'react-bootstrap';
import CommentItem from './CommentItem';

export default function CommentList() {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

  // 페이지당 아이템 수 정의
  const itemsPerPage = 5;

  useEffect(() => {
    // TODO: 실제 API 호출로 대체
    setComments([
      { id: 5, text: 'This is cool!', date: '2025-08-01', isReply: false },
      { id: 4, text: 'This is cool!', date: '2025-05-01', isReply: false },
      { id: 3, text: 'This is cool!', date: '2025-03-01', isReply: false },
      { id: 2, text: 'This is cool!', date: '2025-03-01', isReply: false },
      { id: 1, text: 'This is your comment.', date: '2025-01-01', isReply: true },
    ]);
  }, []);

  // 페이징 계산
  const totalPages = Math.ceil(comments.length / itemsPerPage);
  const paged = comments
    .slice()
    .sort((a, b) => b.id - a.id)
    .slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // 선택 토글
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // 전체 선택/해제
  const allSelected = paged.length > 0 && paged.every(c => selectedIds.includes(c.id));
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds((prev) => prev.filter(id => !paged.some(c => c.id === id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...paged.map(c => c.id)])));
    }
  };

  // 삭제 처리
  const deleteSelected = () => {
    if (selectedIds.length === 0) return;
    // TODO: API DELETE 호출
    setComments(prev => prev.filter(c => !selectedIds.includes(c.id)));
    setSelectedIds([]);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Your comment and reply</h4>
        <Form.Check
          type="checkbox"
          label="Select All"
          checked={allSelected}
          onChange={toggleSelectAll}
        />
      </div>

      {paged.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          selected={selectedIds.includes(comment.id)}
          onSelect={() => toggleSelect(comment.id)}
          onUpdate={(newText) =>
            setComments(prev => prev.map(c => c.id === comment.id ? { ...c, text: newText } : c))
          }
        />
      ))}

      <div className="d-flex align-items-center mt-3">
        <Pagination className="mb-0 me-auto">
          {Array.from({ length: totalPages }, (_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={idx + 1 === page}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
        </Pagination>
        <Button variant="danger" onClick={deleteSelected}>
          Delete
        </Button>
      </div>
    </>
  );
}