// src/App.jsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

import HomePage from './features/home/HomePage';
import RegionDetailPage from './features/region/RegionDetailPage';
import RankingPage from './features/ranking/RankingPage';
import MyPage from './features/user/MyPage';

function App() {
  return (
    <Layout>
      <Routes>
        {/* 홈 */}
        <Route path="/" element={<HomePage />} />

           {/* /region/:region 하나만 남기고 /details 리다이렉트는 제거 */}
        <Route path="/region/:region" element={<RegionDetailPage />} />

        {/* /region만 입력하면 기본값(Seoul)으로 */}
        <Route
          path="/region"
          element={<Navigate to="/region/Seoul" replace />}
        />

        {/* 랭킹, 마이페이지 */}
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/myPage" element={<MyPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
