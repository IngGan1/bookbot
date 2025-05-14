import { createContext, useContext, useState } from "react";
import { libraryApis } from "../api/libraryApis";

const LibraryApiContext = createContext();

export const LibraryApiProvider = ({ children }) => {
  const [selectedLibrary, setSelectedLibrary] = useState(() => libraryApis.libA);

  return (
    <LibraryApiContext.Provider value={{ selectedLibrary, setSelectedLibrary }}>
      {children}
    </LibraryApiContext.Provider>
  );
};

export const useLibraryApi = () => useContext(LibraryApiContext);