// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>😢 페이지를 찾을 수 없습니다</h2>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
}

export default NotFound;