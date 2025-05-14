import React, { useState } from "react";
import { useLibraryApi } from "../context/LibraryApiContext";
import supabase from "../db/supabese"; // ← 경로 주의! 오타 없음 확인!

const LibrarySelector = () => {
  const { setApiUrl, setApiKey } = useLibraryApi();
  const [url, setUrl] = useState("");
  const [key, setKey] = useState("");

  const handleSubmit = async () => {
    setApiUrl(url);
    setApiKey(key);

    // Supabase에 저장
    if (url && key) {
      const { data, error } = await supabase
        .from("API") // 테이블 이름: API
        .insert([{ URL: url, KEY: key }]); // 칼럼 이름: URL, KEY

      if (error) {
        console.error("API 설정 저장 실패:", error.message);
      } else {
        console.log("API 설정이 Supabase에 저장됨:", data);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="API URL"
      />
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="API Key"
      />
      <button onClick={handleSubmit}>설정</button>
    </div>
  );
};

export default LibrarySelector;