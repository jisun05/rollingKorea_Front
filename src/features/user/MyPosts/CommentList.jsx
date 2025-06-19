import React, { useState, useEffect } from 'react';
import { Form, Pagination, Button, Spinner, Alert } from 'react-bootstrap';
import CommentItem from './CommentItem';

export default function CommentList({ userId }) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments/user?userId=${userId}`);
        const data = await res.json();
        setComments(data.content || []);
      } catch (err) {
        console.error('댓글 조회 실패', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchComments();
  }, [userId]);

  const totalPages = Math.ceil(comments.length / itemsPerPage);
  const paged = comments
    .slice()
    .sort((a, b) => b.commentId - a.commentId)
    .slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const allSelected = paged.length > 0 && paged.every(c => selectedIds.includes(c.commentId));
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds((prev) => prev.filter(id => !paged.some(c => c.commentId === id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...paged.map(c => c.commentId)])));
    }
  };

  const deleteSelected = async () => {
    if (selectedIds.length === 0) return;
    await fetch(`/api/comments/admin?adminId=${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedIds),
    });
    setComments(prev => prev.filter(c => !selectedIds.includes(c.commentId)));
    setSelectedIds([]);
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">댓글을 불러오는 데 실패했습니다.</Alert>;

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
          key={comment.commentId}
          comment={comment}
          selected={selectedIds.includes(comment.commentId)}
          onSelect={() => toggleSelect(comment.commentId)}
          onUpdate={(newText) =>
            setComments(prev => prev.map(c =>
              c.commentId === comment.commentId ? { ...c, content: newText } : c
            ))
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
