import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Supabase 세팅
const supabaseUrl = 'https://gpciixncyvljjqorxqea.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2lpeG5jeXZsampxb3J4cWVhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDIyMzkwNywiZXhwIjoyMDU5Nzk5OTA3fQ.Jj1JmWWjdERE2lqjyqNhdYPAh3rHqTXcYv1fW3mBp9g'; // ⚠️ 실제 키로 유지
const supabase = createClient(supabaseUrl, supabaseKey);
function Market() {
  const location = useLocation();
  const navigate = useNavigate();
  const books = location.state || []; // BookSearch.jsx에서 넘어온 데이터 받기

  const goToDetail = async (book) => {
    await supabase.from("Robot_Table").insert([{
      book_tlte: book.title,
      book_author: Array.isArray(book.authors) ? book.authors.join(", ") : "저자 정보 없음",
      task_name: "book_selected"
    }]);
  
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