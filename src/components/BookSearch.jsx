import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLibraryApi } from '../context/LibraryApiContext'; // LibraryApiContext에서 가져오기

function BookSearch() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const { apiUrl, apiKey } = useLibraryApi(); // context에서 apiUrl과 apiKey 가져오기

  const getBooks = async () => {
    try {
      if (keyword.trim() === "") {
        return;
      }

      // 검색할 파라미터
      const params = {
        query: keyword,
        size: 45
      };

      // API 호출 (useLibraryApi에서 받은 apiUrl과 apiKey 사용)
      const result = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`, // API 인증 헤더
        },
        params: params
      });

      if (result) {
        // 검색 결과를 /market으로 넘기기
        navigate("/market", { state: result.data.documents });
      } else {
        console.log("검색 실패");
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
    </div>
  );
}

export default BookSearch;