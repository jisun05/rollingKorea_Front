// src/AppRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';

import RegionListPage   from '../features/region/RegionListPage';      // 홈
import RegionDetailPage from '../features/region/RegionDetailPage';    // 세부
import RankingPage      from '../features/ranking/RankingPage';        // 랭킹
import MyPage           from '../features/user/MyPage';                // 마이페이지
import RequireAuth      from '../components/RequireAuth';             // 보호용 래퍼

export default function AppRouter() {
  return (
    <Layout>
      <Routes>
        {/* 공개 페이지 */}
        <Route path="/" element={<RegionListPage />} />
        <Route path="/details/:region" element={<RegionDetailPage />} />
        <Route path="/ranking" element={<RankingPage />} />

        {/* 로그인한 사용자만 접근 가능 */}
        <Route
          path="/mypage"
          element={
            <RequireAuth>
              <MyPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Layout>
  );
}
