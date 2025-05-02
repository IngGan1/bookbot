import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Market() {
  const location = useLocation();
  const navigate = useNavigate();
  const books = location.state || [];

  const [searchQuery, setSearchQuery] = useState("");

  const goToDetail = (book) => {
    navigate('/BookDetail', { state: book });
  };

  // 검색어로 책 제목 또는 저자 필터링
  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const authorMatch = book.authors?.join(", ").toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || authorMatch;
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>📚 검색 결과</h1>

      {/* 🔍 검색창 */}
      <input
        type="text"
        placeholder="책 제목 또는 저자 검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px', fontSize: '16px' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {filteredBooks.map((book, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '10px',
              cursor: 'pointer',
              textAlign: 'center'
            }}
            onClick={() => goToDetail(book)}
          >
            <img
              src={book.thumbnail || 'https://via.placeholder.com/150'}
              alt="책 이미지"
              width="100%"
            />
            <h3>{book.title}</h3>
            <p>{Array.isArray(book.authors) ? book.authors.join(', ') : '저자 없음'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Market;