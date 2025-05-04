// src/features/ranking/components/RankingList.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ListGroup, Button, Spinner, Alert } from 'react-bootstrap';
import Comments from './Comments/Comments';

// 실제 API 호출
async function fetchRankings() {
  const res = await fetch('/api/rankings');
  if (!res.ok) throw new Error('순위 데이터를 불러올 수 없습니다.');
  return res.json();
}

export default function RankingList() {
  const [activeId, setActiveId] = useState(null);

  // ★ v5+ 단일 객체 시그니처
  const { data: items = [], isLoading, error } = useQuery({
    queryKey: ['rankings'],
    queryFn: fetchRankings,
    staleTime: 1000 * 60 * 5, // 5분 캐시
  });

  if (isLoading) return <Spinner animation="border" />;
  if (error)     return <Alert variant="danger">{error.message}</Alert>;

  return (
    <ListGroup as="ol" numbered>
      {items.map((item, idx) => (
        <ListGroup.Item
          as="li"
          key={item.id}
          className="d-flex align-items-center justify-content-between"
        >
          <div className="d-flex align-items-center flex-fill">
            <strong style={{ width: 30 }}>{idx + 1}.</strong>
            <img
              src={item.thumbnail}
              alt={item.title}
              width={80}
              height={60}
              className="me-3"
            />
            <span>{item.title}</span>
          </div>

          <Button
            variant="outline-danger"
            size="sm"
            className="me-2"
            onClick={() => console.log('like', item.id)}
          >
            ❤️ {item.likes}
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() =>
              setActiveId(activeId === item.id ? null : item.id)
            }
          >
            💬 {item.commentCount}
          </Button>

          {activeId === item.id && (
            <div className="w-100 mt-3">
              <Comments rankingId={item.id} />
            </div>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
