import { useLibraryApi } from "../context/LibraryApiContext";
import { useState } from "react";

const SearchBook = () => {
  const { selectedLibrary } = useLibraryApi();
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    const result = await selectedLibrary.fetchBooks("노인과 바다");
    setBooks(result.items || []);
  };

  return (
    <div>
      <button onClick={handleSearch}>검색</button>
      <ul>
        {books.map((book, i) => (
          <li key={i}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBook;