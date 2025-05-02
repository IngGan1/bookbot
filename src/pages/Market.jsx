import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Market() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialBooks = location.state || [];

  const [keyword, setKeyword] = useState('');
  const [books, setBooks] = useState(initialBooks);

  const KAKAO_KEY = "d3e907647cc7693a2b3ea28e2f3716eb";
  const Kakao = axios.create({
    baseURL: "https://dapi.kakao.com",
    headers: {
      Authorization: "KakaoAK " + KAKAO_KEY
    }
  });

  const kakaoSearch = (params) => {
    return Kakao.get("/v3/search/book", { params });
  };

  const getBooks = async () => {
    if (!keyword.trim()) return;
    try {
      const params = { query: keyword, size: 45 };
      const result = await kakaoSearch(params);
      setBooks(result.data.documents);
    } catch (error) {
      console.error("검색 에러:", error);
    }
  };

  const goToDetail = (book) => {
    navigate('/bookdetail', { state: book });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📚 책 검색</h1>

      {/* 검색창 */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="책 이름 또는 ISBN"
          style={{ padding: '10px', fontSize: '16px', width: '70%' }}
        />
        <button onClick={getBooks} style={{ padding: '10px 20px', marginLeft: '10px' }}>
          검색
        </button>
      </div>

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