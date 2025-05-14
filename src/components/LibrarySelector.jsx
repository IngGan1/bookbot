import React, { useState } from "react";
import { useLibraryApi } from "../context/LibraryApiContext";

const LibrarySelector = () => {
  const { setApiUrl, setApiKey } = useLibraryApi(); // context에서 URL과 Key 설정하는 함수 가져오기
  const [url, setUrl] = useState("");
  const [key, setKey] = useState("");

  const handleSubmit = () => {
    setApiUrl(url); // context에 URL 설정
    setApiKey(key); // context에 API 키 설정
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