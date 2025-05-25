import React, { useEffect, useState } from 'react';
import { supabase } from '../context/supabaseClient'; // 실제 경로에 맞게 수정

function table({ userId }) {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeats = async () => {
      // 예: userId로 내가 앉아야 할 자리 정보만 가져오기
      const { data, error } = await supabase
        .from('Seat_Table')
        .select('*')
        .eq('user_id', userId);  // user_id 컬럼 기준 필터
      
      if (error) {
        alert('좌석 정보를 불러오지 못했습니다: ' + error.message);
      } else {
        setSeats(data);
      }
      setLoading(false);
    };

    fetchSeats();
  }, [userId]);

  if (loading) return <p className="p-4">좌석 정보를 불러오는 중입니다...</p>;

  if (seats.length === 0) return <p className="p-4">앉아야 할 자리가 없습니다.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">내가 앉아야 할 자리</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">자리 번호</th>
            <th className="border p-2">위치</th>
            <th className="border p-2">추가 정보</th>
          </tr>
        </thead>
        <tbody>
          {seats.map((seat, idx) => (
            <tr key={idx} className="text-center">
              <td className="border p-2">{seat.seat_number}</td>
              <td className="border p-2">{seat.location}</td>
              <td className="border p-2">{seat.notes || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default table;