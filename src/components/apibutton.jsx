import { useLibraryApi } from "../context/LibraryApiContext";
import { libraryApis } from "../api/libraryApis";

const LibrarySelector = () => {
  const { setSelectedLibrary } = useLibraryApi();

  return (
    <div className="flex gap-2">
      <button onClick={() => setSelectedLibrary(libraryApis.libA)}>
        도서관 A
      </button>
      <button onClick={() => setSelectedLibrary(libraryApis.libB)}>
        도서관 B
      </button>
    </div>
  );
};

export default LibrarySelector;