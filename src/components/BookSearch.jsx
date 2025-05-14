import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLibraryApi } from '../context/LibraryApiContext'; // context에서 apiUrl과 apiKey 가져오기

function BookSearch() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const { apiUrl, apiKey, apiName } = useLibraryApi();  // apiName을 가져옵니다.

  // 인증 헤더 생성 함수 (외부로 빼기)
  const getAuthorizationHeader = (apiKey, apiName) => {
    switch (apiName) {
      case 'kakao':
        return { Authorization: `KakaoAK ${apiKey}` };  // Kakao의 경우
      case 'libraryAPI':
        return { Authorization: `Bearer ${apiKey}` };  // 다른 라이브러리 API의 경우
      case 'customAPI':
        return { 'X-Custom-API-Key': apiKey };  // Custom API의 경우
      default:
        return {};  // 기본적으로 인증 없이 보내는 경우
    }
  };

  // 책 검색 함수
  const getBooks = async () => {
    try {
      if (keyword.trim() === "") return;

      if (!apiUrl || !apiKey) {
        alert("API URL 또는 KEY가 설정되지 않았습니다.");
        return;
      }

      const params = {
        query: keyword,
        size: 45
      };

      const authHeader = getAuthorizationHeader(apiKey, apiName);

      // 책 검색 API 호출
      const result = await axios.get(apiUrl, {
        headers: authHeader,
        params: params
      });

      if (result) {
        navigate("/market", { state: result.data.documents });
      } else {
        console.log("검색 실패");
      }
    } catch (error) {
      console.log("에러:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="책 이름, ISBN을 입력하세요"
      />
      <button onClick={getBooks}>검색</button>
    </div>
  );
}

export default BookSearch;