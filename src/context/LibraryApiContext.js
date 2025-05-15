import { createContext, useContext, useState } from "react";

const LibraryApiContext = createContext();

export const LibraryApiProvider = ({ children }) => {
  const [apiUrl, setApiUrl] = useState(""); // API URL 상태
  const [apiKey, setApiKey] = useState(""); // API Key 상태
  const [apiName, setApiName] = useState(""); // 추가

  return (
    <LibraryApiContext.Provider value={{ apiUrl, apiKey, apiName, setApiUrl, setApiKey, setApiName}}>
      {children}
    </LibraryApiContext.Provider>
  );
};

export const useLibraryApi = () => useContext(LibraryApiContext);