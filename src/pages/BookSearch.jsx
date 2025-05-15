import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../context/ApiContext';

function BookSearch() {
  const { apiUrl, apiKey, resetApi } = useApi();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const headers = {};

      // 카카오 API일 경우 KakaoAK, 그 외는 Bearer
      if (apiUrl.includes('kakao')) {
        headers['Authorization'] = `KakaoAK ${apiKey}`;
      } else {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }

      // 쿼리 파라미터 이름도 Kakao일 경우 다르게 설정
      const queryParam = apiUrl.includes('kakao') ? 'query' : 'q';
      const response = await fetch(`${apiUrl}?${queryParam}=${encodeURIComponent(query)}`, {
        headers,
      });

      const data = await response.json();
      const books = data.documents || data.items || [];
      setResults(books);
    } catch (error) {
      alert('검색 중 오류 발생');
    }
  };

  const handleReset = () => {
    resetApi();
    navigate('/');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">📚 책 검색</h1>
        <button onClick={handleReset} className="bg-red-500 text-white px-4 py-1 rounded">
          API 재설정
        </button>
      </div>
      <input
        type="text"
        placeholder="검색어 입력"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleSearch} className="bg-green-500 text-white px-4 py-2 rounded">
        검색
      </button>

      <div className="mt-4">
        {results.map((book, index) => (
          <div key={index} className="border p-2 mb-2">
            <p><strong>제목:</strong> {book.title || '알 수 없음'}</p>
            <p><strong>저자:</strong> {(book.authors && book.authors.join(', ')) || book.author || '알 수 없음'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;