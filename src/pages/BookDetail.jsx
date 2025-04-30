import React from 'react';
import { useLocation } from 'react-router-dom';

function BookDetail() {
  const location = useLocation();
  const book = location.state;  // 전체 책 정보 받기

  if (!book) return <div>책 정보가 없습니다.</div>;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', padding: '20px' }}>
      <img
        src={book.thumbnail || 'https://via.placeholder.com/300'}
        alt={book.book_tlte || book.title}
        style={{ width: '300px', height: 'auto', marginRight: '20px' }}
      />
      <div>
        <h2>{book.book_tlte || book.title}</h2>
        <h4>저자: {book.book_author || (book.authors && book.authors.join(', '))}</h4>
        <p>{book.contents || '책 설명이 없습니다.'}</p>
      </div>
    </div>
  );
}

export default BookDetail;