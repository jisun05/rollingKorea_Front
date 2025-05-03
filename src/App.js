// src/App.jsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import HomePage from './features/home/HomePage';
import RegionDetailPage from './features/region/RegionDetailPage';
import RankingPage from './features/ranking/RankingPage';
import MyPage from './features/user/MyPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:region" element={<RegionDetailPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
