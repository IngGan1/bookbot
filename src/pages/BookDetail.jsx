import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Supabase 세팅
const supabaseUrl = 'https://gpciixncyvljjqorxqea.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2lpeG5jeXZsampxb3J4cWVhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDIyMzkwNywiZXhwIjoyMDU5Nzk5OTA3fQ.Jj1JmWWjdERE2lqjyqNhdYPAh3rHqTXcYv1fW3mBp9g'; // ⚠️ 실제 키로 유지
const supabase = createClient(supabaseUrl, supabaseKey);

function BookDetail() {
  const location = useLocation();
  const book = location.state;

  useEffect(() => {
    const saveBookToSupabase = async () => {
      const { data, error } = await supabase
        .from("Robot_Table")
        .insert([
          {
            book_tlte: book.title,
            book_author: Array.isArray(book.authors) ? book.authors.join(", ") : "저자 정보 없음",
            task_name: "book_selected"
          }
        ]);
      if (error) {
        console.error("Supabase 저장 에러", error);
      } else {
        console.log("Supabase 저장 성공", data);
      }
    };

    if (book) saveBookToSupabase();
  }, [book]);

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <img src={book.thumbnail} alt="책 표지" style={{ width: "200px", marginRight: "20px" }} />
      <div>
        <h2>{book.title}</h2>
        <h4>{book.authors.join(", ")}</h4>
        <p>{book.contents}</p>
      </div>
    </div>
  );
}

export default BookDetail;