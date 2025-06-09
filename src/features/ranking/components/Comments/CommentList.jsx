// src/features/ranking/components/Comments/CommentList.jsx
import React, { useState } from 'react';
import { ListGroup, Pagination } from 'react-bootstrap';
import CommentItem from './CommentItem';

export default function CommentList({ comments = [] }) {
  const [page, setPage] = useState(1);
  const perPage = 5;
  const total = Math.ceil(comments.length / perPage);
  const paged = comments.slice((page-1)*perPage, page*perPage);

  return (
    <>
      <ListGroup>
        {paged.map(c => (
          <CommentItem key={c.commentId} comment={c} />
        ))}
      </ListGroup>

      {total > 1 && (
        <Pagination className="mt-3 justify-content-center">
          {[...Array(total)].map((_, i) => (
            <Pagination.Item
              key={i+1}
              active={i+1===page}
              onClick={()=>setPage(i+1)}
            >
              {i+1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </>
  );
}
