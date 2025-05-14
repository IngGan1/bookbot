import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLibraryApi } from "../context/LibraryApiContext";

const Market = () => {
  const { apiUrl, apiKey } = useLibraryApi(); // context에서 URL과 Key 가져오기
  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState([]);

  // 책 검색 함수
  const getBooks = async () => {
    if (!apiUrl || !apiKey) return; // API URL과 Key가 없으면 검색하지 않음
    if (!keyword.trim()) return; // 검색어가 없으면 검색하지 않음

    try {
      const result = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: {
          query: keyword,
        },
      });
      setBooks(result.data.documents || []);
    } catch (error) {
      console.error("책 검색 에러:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, [keyword, apiUrl, apiKey]); // URL이나 Key가 변경될 때마다 재호출

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="책 검색"
      />
      <button onClick={getBooks}>검색</button>

      <div>
        {books.map((book, idx) => (
          <div key={idx}>
            <h3>{book.title}</h3>
            <p>{book.authors}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;