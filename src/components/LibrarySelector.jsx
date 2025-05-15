import React, { useState } from "react";
import { useLibraryApi } from "../context/LibraryApiContext";
import supabase from "../db/supabase";

const LibrarySelector = () => {
  const { setApiUrl, setApiKey, setApiName } = useLibraryApi();
  const [url, setUrl] = useState("");
  const [key, setKey] = useState("");
  const [name, setName] = useState(""); // API 이름

  const handleSubmit = async () => {
    if (!url || !key || !name) {
      alert("URL, Key, API 이름을 모두 입력해주세요.");
      return;
    }

    setApiUrl(url);
    setApiKey(key);
    setApiName(name); // 컨텍스트에 apiName 설정

    // Supabase에 저장 (옵션)
    await supabase
      .from("api")
      .insert([{ URL: url, KEY: key, NAME: name }]); // 테이블에 NAME 필드가 있어야 함
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
      <select value={name} onChange={(e) => setName(e.target.value)}>
        <option value="">API 선택</option>
        <option value="kakao">Kakao</option>
        <option value="libraryAPI">Library API</option>
        <option value="customAPI">Custom API</option>
      </select>
      <button onClick={handleSubmit}>설정</button>
    </div>
  );
};

export default LibrarySelector;