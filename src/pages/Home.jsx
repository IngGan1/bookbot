import React from 'react';
import BookSearch from '../components/BookSearch'; // 검색창 컴포넌트 import

function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>📚 무인 책 배달</h1>


      {/* 검색창 삽입 */}
      <div style={{ marginTop: '2rem' }}>
        <BookSearch />
      </div>
    </div>
  );
}

export default Home;
