import React, { useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

export default function Comments() {
  const [showCount, setShowCount] = useState(5);

  return (
    <div>
      <h3>Comments</h3>
      <CommentForm />   {/* ② 입력창 + ③ 등록 */}
      <CommentList showCount={showCount} />  {/* ④ 정렬 + ⑤/⑥ 버튼 활성화 */}
      <div className="text-center mt-3">
        <button
          className="btn btn-primary"
          onClick={() => setShowCount(c => c + 5)}
        >
          Show More
        </button>
      </div>
    </div>
  );
}