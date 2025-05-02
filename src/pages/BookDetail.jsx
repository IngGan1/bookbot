import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Supabase 설정
const supabaseUrl = 'https://gpciixncyvljjqorxqea.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2lpeG5jeXZsampxb3J4cWVhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDIyMzkwNywiZXhwIjoyMDU5Nzk5OTA3fQ.Jj1JmWWjdERE2lqjyqNhdYPAh3rHqTXcYv1fW3mBp9g'; // 실제 서비스에서는 환경변수로 처리
const supabase = createClient(supabaseUrl, supabaseKey);

function BookDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state;

  const saveBookToSupabase = async () => {
    if (!book) return;

    const { data, error } = await supabase
      .from("Robot_Table")
      .insert([
        {
          book_title: book.title,
          contents: book.contents,
          book_author: Array.isArray(book.authors) ? book.authors.join(", ") : "저자 정보 없음",
          book_thumbnail: book.thumbnail || "",
          task_name: "책상 번호"
        }
      ]);

    if (error) {
      console.error("Supabase 저장 에러", error.message);
      alert("저장 실패: " + error.message);
    } else {
      console.log("Supabase 저장 성공", data);
      alert("책 정보가 저장되었습니다!");
    }
  };

  if (!book) return <div>책 정보를 불러올 수 없습니다.</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
    <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
      ← 뒤로가기
    </button>
    <div style={{ display: "flex", padding: "20px" }}>
      <img src={book.thumbnail} alt="책 표지" style={{ width: "200px", marginRight: "20px" }} />
      <div>
        <h2>책 이름: {book.title}</h2>
        <h4>저자: {Array.isArray(book.authors) ? book.authors.join(", ") : "저자 정보 없음"}</h4>
        <p style={{ maxHeight: '300px', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
          개요: {book.contents}
        </p>

        <button onClick={saveBookToSupabase} style={{ marginTop: '20px' }}>
          책 선택
        </button>
      </div>
    </div>
    </div>
  );
}

export default BookDetail;