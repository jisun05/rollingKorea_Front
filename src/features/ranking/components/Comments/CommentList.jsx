import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';
import CommentItem from './CommentItem';

export default function CommentList({
  comments = [],     // ① 기본값으로 빈 배열 설정
  onDelete,
  onUpdate,
  onLike,
  onReply
}) {
  // ② 혹시라도 배열이 아니면 빈 배열로 대체
  const list = Array.isArray(comments) ? comments : [];

  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  // ③ slice 호출 전엔 반드시 배열임을 보장
  const paged = list.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      {paged.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onLike={onLike}
          onReply={onReply}
        />
      ))}

      {/* 페이징 */}
      <Pagination className="mt-3">
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === page}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
}