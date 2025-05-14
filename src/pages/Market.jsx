import React from "react";
import { useLocation } from "react-router-dom";

const Market = () => {
  const location = useLocation();
  const books = location.state || [];  // state로 전달된 책 정보 받기, 없으면 빈 배열로 기본값 설정

  return (
    <div>
      <h1>책 검색 결과</h1>
      <div>
        {books.length === 0 ? (
          <p>검색된 책이 없습니다.</p>
        ) : (
          books.map((book, idx) => (
            <div key={idx}>
              <h3>{book.title}</h3>
              <p>{book.authors}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Market;