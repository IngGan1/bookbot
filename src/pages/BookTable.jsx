import React, { useEffect, useState } from 'react';
import { supabase } from '../context/supabaseClient';

function BookTable() {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeats = async () => {
      const { data, error } = await supabase
        .from('BookTable')
        .select('*');  // userId 필터 제거

      if (error) {
        alert('좌석 정보를 불러오지 못했습니다: ' + error.message);
      } else {
        setSeats(data);
      }
      setLoading(false);
    };

    fetchSeats();
  }, []);

  if (loading) return <p className="p-4">좌석 정보를 불러오는 중입니다...</p>;

  if (seats.length === 0) return <p className="p-4">앉아야 할 자리가 없습니다.</p>;

  const maxRow = Math.max(...seats.map(seat => seat.row));
  const maxCol = Math.max(...seats.map(seat => seat.col));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">모든 좌석 배치</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${maxRow + 1}, 60px)`,
          gridTemplateColumns: `repeat(${maxCol + 1}, 80px)`,
          gap: '10px',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}
      >
        {seats.map((seat) => (
          <div
            key={seat.seat_number}
            style={{
              gridRowStart: seat.row + 1,
              gridColumnStart: seat.col + 1,
              backgroundColor: '#4ade80',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 0 5px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              userSelect: 'none',
              padding: '8px',
              color: '#064e3b',
              fontWeight: 'bold',
            }}
            title={`${seat.seat_number}\n위치: ${seat.location}\n비고: ${seat.notes || '-'}`}
          >
            <div>{seat.seat_number}</div>
            <div style={{ fontSize: '12px', fontWeight: 'normal' }}>{seat.location}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookTable;