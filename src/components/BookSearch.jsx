import React, { useState } from 'react';
import axios from 'axios'; // axios import 추가
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom'; // navigate 사용하려면 필요

// 1️⃣ Supabase 세팅
const supabaseUrl = 'https://gpciixncyvljjqorxqea.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2lpeG5jeXZsampxb3J4cWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjM5MDcsImV4cCI6MjA1OTc5OTkwN30.4-aRlLphU-hIT-vCiFl-kWqgUnw3WIOmX6CSC0LOXRw";
const supabase = createClient(supabaseUrl, supabaseKey);

function BookSearch() {
  const [keyword, setKeyword] = useState('');
  const [book, setBooks] = useState([]);
  const navigate = useNavigate();

  // 2️⃣ Kakao API 설정
  const KAKAO_KEY = "d3e907647cc7693a2b3ea28e2f3716eb";
  const Kakao = axios.create({
    baseURL: "https://dapi.kakao.com",
    headers: {
      Authorization: "KakaoAK " + KAKAO_KEY
    }
  });

  const kakaoSearch = (params) => {
    return Kakao.get("/v3/search/book", { params });
  };

  // 3️⃣ 책 검색 함수
  const getBooks = async () => {
    try {
      if (keyword.trim() === "") {
        setBooks([]);
      } else {
        const params = {
          query: keyword,
          size: 45
        };
        const result = await kakaoSearch(params);

        if (result) {
          setBooks(result.data.documents);

          // Supabase에 저장하고 싶으면 여기서 저장할 수 있음
          // 예시로 첫 번째 결과만 저장한다고 해봄
          const firstBook = result.data.documents[0];
          const { data, error } = await supabase
            .from('Robot_Table') // 테이블명
            .insert([{ 
              book_tlte: firstBook.title, book_author: firstBook.authors.join(", ")
             }]);

          if (error) {
            console.error('Supabase 저장 에러', error);
          } else {
            console.log('Supabase 저장 성공', data);
          }

          // 페이지 이동
          navigate("/market", { state: result.data.documents });
        } else {
          console.log("검색 실패");
        }
      }
    } catch (error) {
      console.log("에러", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어 입력"
      />
      <button onClick={getBooks}>검색</button>
      <ul>
        {book.map((b, idx) => (
          <li key={idx}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookSearch;