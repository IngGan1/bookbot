import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLibraryApi } from '../context/LibraryApiContext';

const BookDetail = () => {
  const { apiUrl, apiKey } = useLibraryApi(); // context에서 URL과 Key 가져오기
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 책 검색 함수
  const getBooks = async () => {
    if (!apiUrl || !apiKey) return; // API URL과 Key가 없으면 검색하지 않음

    setLoading(true);
    setError(null);

    try {
      const result = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      setBooks(result.data.documents || []); // API에서 받은 책 정보 설정
    } catch (err) {
      setError('책 정보를 가져오는 데 실패했습니다.');
      console.error('책 검색 에러:', err);
    } finally {
      setLoading(false);
    }
  };

  // 페이지가 처음 렌더링될 때 API 호출
  useEffect(() => {
    getBooks();
  }, [apiUrl, apiKey]); // apiUrl이나 apiKey가 변경되면 재호출

  return (
    <div>
      <h1>책 정보</h1>
      {loading && <p>책 정보를 불러오는 중...</p>}
      {error && <p>{error}</p>}
      <div>
        {books.length === 0 && !loading ? (
          <p>책이 없습니다.</p>
        ) : (
          books.map((book, idx) => (
            <div key={idx}>
              <h3>{book.title}</h3>
              <p>저자: {book.authors ? book.authors.join(', ') : '저자 정보 없음'}</p>
              <p>출판사: {book.publisher || '출판사 정보 없음'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookDetail;