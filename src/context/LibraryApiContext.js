import { createContext, useContext, useState } from "react";

const LibraryApiContext = createContext();

export const LibraryApiProvider = ({ children }) => {
  const [apiUrl, setApiUrl] = useState(""); // API URL 상태
  const [apiKey, setApiKey] = useState(""); // API Key 상태

  return (
    <LibraryApiContext.Provider value={{ apiUrl, apiKey, setApiUrl, setApiKey }}>
      {children}
    </LibraryApiContext.Provider>
  );
};

export const useLibraryApi = () => useContext(LibraryApiContext);