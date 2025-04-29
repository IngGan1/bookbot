import React, { useState } from 'react';
import axios from 'axios'; // axios import 추가
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom'; // navigate 사용하려면 필요

// 1️⃣ Supabase 세팅
const supabaseUrl = 'https://gpciixncyvljjqorxqea.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2lpeG5jeXZsampxb3J4cWVhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDIyMzkwNywiZXhwIjoyMDU5Nzk5OTA3fQ.Jj1JmWWjdERE2lqjyqNhdYPAh3rHqTXcYv1fW3mBp9g";
const supabase = createClient(supabaseUrl, supabaseKey);

function BookDetail() {
    const location = useLocation();
    const { bookId } = location.state;  // 이동할 때 받은 책 id
    const [book, setBook] = useState(null);
  
    useEffect(() => {
      const fetchBook = async () => {
        const { data, error } = await supabase
          .from('Robot_Table')
          .select('*')
          .eq('id', bookId)
          .single();  // 단일 데이터만
  
        if (error) {
          console.error('책 정보 불러오기 에러:', error);
        } else {
          setBook(data);
        }
      };
  
      fetchBook();
    }, [bookId]);
  
    if (!book) return <div>로딩중...</div>;
  
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', padding: '20px' }}>
        <img
          src={book.thumbnail}
          alt={book.book_tlte}
          style={{ width: '300px', height: 'auto', marginRight: '20px' }}
        />
        <div>
          <h2>{book.book_tlte}</h2>
          <h4>저자: {book.book_author}</h4>
          <p>{book.contents}</p>
        </div>
      </div>
    );
  }
  
  export default BookDetail;