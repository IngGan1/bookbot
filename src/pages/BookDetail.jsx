import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../context/supabaseClient';
import HorizonLine from '../components/HorizonLine';

function BookDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state;

  if (!book) {
    return <p>책 정보가 없습니다.</p>;
  }

  const handleSaveToSupabase = async () => {
    // 1. 책 정보 저장
    const { error: bookError } = await supabase.from('Book_Table').insert([
      {
        book_title: book.title || null,
        book_author: Array.isArray(book.authors)
          ? book.authors.join(', ')
          : book.authors || book.author || null,
        book_isbn: book.isbn || null,
        book_description: book.description || null,
        book_thumbnail: book.thumbnail || null,
      },
    ]);

    if (bookError) {
      alert('책 정보 저장 실패: ' + bookError.message);
      return;
    }

    // 2. 좌표 정보가 있을 경우 robot_xy 테이블에 저장
    if (book.x !== undefined && book.y !== undefined) {
      const { error: xyError } = await supabase.from('robot_xy').insert([
        {
          x: book.x,
          y: book.y,
        },
      ]);

      if (xyError) {
        alert('위치 정보 저장 실패: ' + xyError.message);
        return;
      }
    } else {
      alert('x, y 좌표 정보가 없어 위치 저장을 건너뜁니다.');
    }

    alert('책 정보와 위치가 저장되었습니다!');
    navigate('/Table');
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
          <div className="border p-4 rounded shadow-sm mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              📚 제목: {book.title || '제목 없음'}
            </h2>
          </div>

          <div className="border p-4 rounded shadow-sm mb-4">
            <p className="text-gray-700">
              👤 <strong>저자:</strong>{' '}
              {Array.isArray(book.authors)
                ? book.authors.join(', ')
                : book.authors || book.author || '알 수 없음'}
            </p>
          </div>

          <div className="border p-4 rounded shadow-sm mb-4">
            <p className="text-gray-700">
              🆔 <strong>ISBN:</strong> {book.isbn || '정보 없음'}
            </p>
          </div>

          <div className="border p-4 rounded shadow-sm mb-4">
            <p className="text-gray-700">
              📝 <strong>개요:</strong> {book.description || '설명이 없습니다.'}
            </p>
          </div>

          <button
            onClick={handleSaveToSupabase}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded shadow"
          >
            📥 책 선택
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;