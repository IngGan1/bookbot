import { createContext, useContext, useState } from "react";

// API URL과 Key를 관리할 Context
const LibraryApiContext = createContext();

export const LibraryApiProvider = ({ children }) => {
  const [apiUrl, setApiUrl] = useState(""); // 기본값은 빈 문자열
  const [apiKey, setApiKey] = useState(""); // 기본값은 빈 문자열

  // API URL과 키를 설정하는 함수
  const setLibraryApi = (url, key) => {
    setApiUrl(url);
    setApiKey(key);
  };

  return (
    <LibraryApiContext.Provider value={{ apiUrl, apiKey, setLibraryApi }}>
      {children}
    </LibraryApiContext.Provider>
  );
};

export const useLibraryApi = () => useContext(LibraryApiContext);