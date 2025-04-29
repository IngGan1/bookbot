import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Market() {
  const location = useLocation();
  const navigate = useNavigate();
  const books = location.state || []; // BookSearch.jsx에서 넘어온 데이터 받기

  const goToDetail = (book) => {
    navigate('/book-detail', { state: book }); // 책 하나를 넘겨줌
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
            <img src={book.thumbnail || 'https://via.placeholder.com/150'} alt="책 이미지" width="100%" />
            <h3>{book.title}</h3>
            <p>{book.authors ? book.authors.join(', ') : '저자 없음'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Market;