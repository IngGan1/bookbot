import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLibraryApi } from '../context/LibraryApiContext'; // context에서 apiUrl과 apiKey 가져오기
import supabase from '../supabase'; // supabase.js import

function BookSearch() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const { apiUrl, apiKey } = useLibraryApi();

  // Supabase에 API URL과 KEY 저장
  const saveApiSettings = async () => {
    if (!apiUrl || !apiKey) return;

    const { error } = await supabase
      .from('api')
      .insert([{ URL: apiUrl, KEY: apiKey }]);

    if (error) {
      console.error('API 설정 저장 실패:', error);
    } else {
      console.log('API 설정이 저장되었습니다.');
    }
  };

  // 책 검색 함수
  const getBooks = async () => {
    try {
      if (keyword.trim() === "") return;

      // API 설정 Supabase에 저장
      await saveApiSettings();

      const params = {
        query: keyword,
        size: 45
      };

      const result = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
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
        placeholder="책 이름, ISBN를 입력하세요"
      />
      <button onClick={getBooks}>검색</button>
    </div>
  );
}

export default BookSearch;