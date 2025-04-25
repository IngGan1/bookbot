// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>📚 책 배달 로봇 시스템</h1>
      <p>도서 검색 후 로봇에게 배달을 요청하세요.</p>
      <Link to="/request">
        <button style={{ marginTop: '1rem', padding: '1rem 2rem' }}>
          책 검색하러 가기
        </button>
      </Link>
    </div>
  );
}

export default Home;