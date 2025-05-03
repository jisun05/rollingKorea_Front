// src/app/AppRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import RegionListPage   from '../features/region/RegionListPage';      // 홈
import RegionDetailPage from '../features/region/RegionDetailPage';    // 세부


export default function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<RegionListPage />} />
        <Route path="/details/:region" element={<RegionDetailPage />} />
      
      </Routes>
    </Layout>
  );
}
