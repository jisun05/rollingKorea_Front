// src/App.jsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';

import HomePage from './features/home/HomePage';
import RegionDetailPage from './features/region/RegionDetailPage';
import RankingPage from './features/ranking/RankingPage';
import MyPage from './features/user/MyPage';

function App() {
  const { pathname } = useLocation();
  // /region/:region 일 때 key를 region 이름으로 지정해서
  // 컴포넌트가 완전 재마운트되도록 합니다.
  const match = pathname.match(/^\/region\/(.+)$/);
  const regionKey = match ? match[1] : 'Seoul';

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* /region → /region/Seoul */}
        <Route
          path="/region"
          element={<Navigate to="/region/Seoul" replace />}
        />

        {/* /region/:region 만 매핑 */}
        <Route
          path="/region/:region"
          element={<RegionDetailPage key={regionKey} />}
        />

        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/myPage" element={<MyPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
