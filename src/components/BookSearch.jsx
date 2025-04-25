function BookSearch() {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
  
    const handleSearch = async () => {
      const dummyBooks = [
        { title: '자바스크립트 완벽 가이드', author: 'David Flanagan' },
        { title: '리액트 쉽게 배우기', author: '홍길동' },
      ];
      const filtered = dummyBooks.filter(book =>
        book.title.includes(keyword)
      );
      setResults(filtered);
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="책 제목이나 ISBN번호를 입력해주세요."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          style={{ padding: '0.5rem', width: '60%' }}
        />
        <button onClick={handleSearch} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
          검색
        </button>
  
        <ul style={{ marginTop: '1rem' }}>
          {results.map((book, idx) => (
            <li key={idx}>
              <strong>{book.title}</strong> - {book.author}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  export default BookSearch;