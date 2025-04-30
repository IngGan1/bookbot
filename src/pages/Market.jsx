import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Market() {
  const location = useLocation();
  const navigate = useNavigate();
  const books = location.state || [];

  const goToDetail = (book) => {
    // Supabase 저장은 하지 않고 BookDetail로 이동만
    navigate('/book-detail', { state: book });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📚 검색 결과</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {books.map((book, idx) => (
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