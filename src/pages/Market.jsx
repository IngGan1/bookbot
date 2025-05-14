const { selectedLibrary } = useLibraryApi(); // 선택된 도서관 (Kakao 포함)

const getBooks = async () => {
  if (!keyword.trim()) return;
  try {
    const results = await selectedLibrary.fetchBooks(keyword); // 이 한 줄로 끝!
    setBooks(results);
  } catch (error) {
    console.error("검색 에러:", error);
  }
};