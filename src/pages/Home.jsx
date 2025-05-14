import React from 'react';
import { Link } from 'react-router-dom'; // Link 추가
import BookSearch from '../components/BookSearch';

function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>📚 무인 책 배달</h1>

      {/* 검색창 삽입 */}
      <div style={{ marginTop: '2rem' }}>
        <BookSearch />
      </div>

      {/* 새로운 페이지로 이동하는 링크 */}
      <div style={{ marginTop: '2rem' }}>
        <Link to="/BookDetail">
          <button style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
            책 정보 보기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;