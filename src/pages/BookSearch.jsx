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
      const response = await fetch(`${apiUrl}?q=${query}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      const data = await response.json();
      setResults(data.items || []);
    } catch (error) {
      alert("검색 중 오류 발생");
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
        onChange={e => setQuery(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleSearch} className="bg-green-500 text-white px-4 py-2 rounded">검색</button>

      <div className="mt-4">
        {results.map((book, index) => (
          <div key={index} className="border p-2 mb-2">
            <p><strong>제목:</strong> {book.title || '알 수 없음'}</p>
            <p><strong>저자:</strong> {book.author || '알 수 없음'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;