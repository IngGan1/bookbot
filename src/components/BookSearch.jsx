import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// 1️⃣ Supabase 세팅
const supabaseUrl = 'https://gpciixncyvljjqorxqea.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2lpeG5jeXZsampxb3J4cWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjM5MDcsImV4cCI6MjA1OTc5OTkwN30.4-aRlLphU-hIT-vCiFl-kWqgUnw3WIOmX6CSC0LOXRw";
const supabase = createClient(supabaseUrl, supabaseKey);

function BookSearch() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  // 2️⃣ 검색 + Supabase 저장
  const handleSearch = async () => {
    const serviceKey = 'd3e907647cc7693a2b3ea28e2f3716eb';
    const baseUrl = 'https://dapi.kakao.com/v2/search/web';
    const url = `${baseUrl}?serviceKey=${serviceKey}&title=${encodeURIComponent(keyword)}&numOfRows=10&pageNo=1`;

    try {
      const response = await fetch(url);
      const textData = await response.text();

      // XML -> JSON 변환
      const parser = new DOMParser();
      const xml = parser.parseFromString(textData, "application/xml");
      const items = Array.from(xml.getElementsByTagName('item'));

      const books = items.map(item => ({
        book_tilte: item.getElementsByTagName('book_tilte')[0]?.textContent ?? '',
        book_author: item.getElementsByTagName('book_author')[0]?.textContent ?? '',
      }));

      setResults(books);

      if (books.length > 0) {
        // Supabase에 저장
        const { data, error } = await supabase
          .from('Robot_Table')
          .insert(books);

        if (error) {
          console.error('Supabase 저장 실패:', error.message);
        } else {
          console.log('Supabase 저장 성공:', data);
        }
      }

    } catch (error) {
      console.error('API 호출 오류:', error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="책 제목을 입력하세요."
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>검색하고 저장하기</button>

      <ul>
        {results.map((book, idx) => (
          <li key={idx}>
            {book.book_tilte} - {book.book_author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookSearch;