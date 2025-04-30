import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookSearch() {
  const [keyword, setKeyword] = useState('');
  const [book, setBooks] = useState([]);
  const navigate = useNavigate();

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
        placeholder="책 이름, ISBN를 입력하세요"
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