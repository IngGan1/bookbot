import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../context/supabaseClient'; // 클라이언트 import

function BookDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state;

  if (!book) {
    return <p>책 정보가 없습니다.</p>;
  }

    const handleSaveToSupabase = async () => {
    const { error } = await supabase.from('Book_Table').insert([
      {
        book_title: book.title || null,
        book_author: book.authors?.join(', ') || book.author || null,
        book_isbn: book.isbn || null,
        book_description: book.description || null,
        book_thumbnail: book.thumbnail || null,
      },
    ]);

    if (error) {
      alert('저장이 실패했습니다. 사유: ' + error.message);
    } else {
      alert('책 정보가 저장되었습니다!');
    }
  };


  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500 underline">
        ← 뒤로가기
      </button>

      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* 책 표지 */}
        <div className="w-48 h-64 bg-gray-100 flex-shrink-0 overflow-hidden">
          {book.thumbnail ? (
            <img src={book.thumbnail} alt="책 표지" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              이미지 없음
            </div>
          )}
        </div>

        {/* 책 정보 */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{book.title || '제목 없음'}</h2>
          <p className="text-gray-700 mb-2">
            👤 <strong>저자:</strong> {(book.authors && book.authors.join(', ')) || book.author || '알 수 없음'}
          </p>
          <p className="text-gray-700 mb-2">
            🆔 <strong>ISBN:</strong> {book.isbn || '정보 없음'}
          </p>
          <p className="text-gray-700">
            📝 <strong>개요:</strong> {book.description || '설명이 없습니다.'}
          </p>

          <button onClick = {handleSaveToSupabase}
                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
                 📥 책 선택
                </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;