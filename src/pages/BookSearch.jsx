import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../context/ApiContext';
import HorizonLine from '../components/HorizonLine';

function BookSearch() {
  const { apiUrl, apiKey, resetApi } = useApi();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const headers = {};

      if (apiUrl.includes('kakao')) {
        headers['Authorization'] = `KakaoAK ${apiKey}`;
      } else {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }

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
          <div
            key={index}
            onClick={() => navigate('/detail', { state: book })}
            className="flex border rounded-lg p-4 mb-4 shadow-md cursor-pointer hover:bg-gray-100"
          >
            {/* 책 이미지 */}
            <div className="w-32 h-44 flex-shrink-0 bg-gray-100 overflow-hidden mr-4">
              {book.thumbnail ? (
                <img
                  src={book.thumbnail}
                  alt="책 이미지"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  이미지 없음
                </div>
              )}
            </div>

            {/* 책 정보 */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-lg font-semibold mb-1">
                  📕 제목: {book.title || '알 수 없음'}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  👤 저자:{' '}
                  {(book.authors && book.authors.join(', ')) || book.author || '알 수 없음'}
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                📝 개요: {book.description || '설명이 없습니다.'}
              </p>
              <HorizonLine />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;