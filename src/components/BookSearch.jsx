import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLibraryApi } from '../context/LibraryApiContext';

function BookSearch() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const { apiUrl, apiKey, apiName } = useLibraryApi();

  const getAuthorizationHeader = (apiKey, apiName) => {
    switch (apiName) {
      case 'kakao':
        return { Authorization: `KakaoAK ${apiKey}` };
      case 'libraryAPI':
        return { apikey: apiKey };  // 또는 { 'apikey': apiKey }
      case 'customAPI':
        return { 'X-Custom-API-Key': apiKey };
      default:
        return {};
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

      console.log("apiUrl:", apiUrl);
      console.log("apiKey:", apiKey, typeof apiKey);
      console.log("apiName:", apiName);

      const params = {
        query: keyword,
        size: 45
      };

      const authHeader = getAuthorizationHeader(apiKey, apiName);

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
      console.error("에러:", error.response?.data || error.message);
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