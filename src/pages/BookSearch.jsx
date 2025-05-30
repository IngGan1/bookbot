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
    // supabase REST API용 헤더
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      // apikey 헤더는 중복일 수 있으니 생략 가능
    };

    if (apiUrl.includes('kakao')) {
      headers['Authorization'] = `KakaoAK ${apiKey}`;
      const queryParam = 'query';
      const url = `${apiUrl}?${queryParam}=${encodeURIComponent(query.trim())}`;

      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setResults(data.documents || []);
      return;
    }

    const baseUrl = apiUrl.replace(/\/+$/, '');
    const endpoint = '/rest/v1/mybookapi';
    const trimmedQuery = query.trim();

    const columns = ['book.title', 'book.author', 'book.authors', 'book.description'];

    const filterParts = columns.map(col => {
      const encodedCol = encodeURIComponent(`"${col}"`);
      const encodedLike = encodeURIComponent(`'%${trimmedQuery}%'`);
      return `${encodedCol}.ilike.${encodedLike}`;
    });

    const filterQuery = `or=(${filterParts.join(',')})`;

    // ★ 여기서 apikey를 쿼리 파라미터로 추가 ★
    const url = `${baseUrl}${endpoint}?select=*&${filterQuery}&apikey=${apiKey}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    setResults(Array.isArray(data) ? data : []);
  } catch (error) {
    alert('검색 중 오류 발생');
    console.error('Supabase 응답 오류:', error);
    setResults([]);
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
            <div className="w-32 h-44 flex-shrink-0 bg-gray-100 overflow-hidden mr-4">
              {book.thumbnail ? (
                <img src={book.thumbnail} alt="책 이미지" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  이미지 없음
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <p className="text-lg font-semibold mb-1">📕 제목: {book.title || '알 수 없음'}</p>
                <p className="text-sm text-gray-700 mb-1">
                  👤 저자:{' '}
                  {(book.authors && book.authors.join(', ')) || book.author || '알 수 없음'}
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-2">📝 개요: {book.description || '설명이 없습니다.'}</p>
              <HorizonLine />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;