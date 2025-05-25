import React, { useState } from 'react';
import { supabase } from '../context/supabaseClient';

const seatLayout = [
  { id: 'A1', label: 'A1' },
  { id: 'A2', label: 'A2' },
  { id: 'A3', label: 'A3' },
  { id: 'B1', label: 'B1' },
  { id: 'B2', label: 'B2' },
  { id: 'B3', label: 'B3' },
  { id: 'C1', label: 'C1' },
  { id: 'C2', label: 'C2' },
  { id: 'C3', label: 'C3' },
];

function BookTable() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async (seat) => {
    setSelectedSeat(seat.id);
    setLoading(true);

    const { data, error } = await supabase
      .from('user_table') // 실제 테이블명에 맞게 수정하세요
      .insert([{ tesk_id: seat.id, time: new Date().toISOString() }]);

    setLoading(false);

    if (error) {
      alert('좌석 저장 실패: ' + error.message);
      setSelectedSeat(null);
    } else {
      alert(`좌석 ${seat.label} 선택 완료!`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>좌석 배치도</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 80px)', // 3열 그리드
          gap: '10px',
          maxWidth: '260px',
        }}
      >
        {seatLayout.map((seat) => (
          <button
            key={seat.id}
            onClick={() => handleClick(seat)}
            style={{
              padding: '15px',
              backgroundColor: selectedSeat === seat.id ? '#4caf50' : '#ccc',
              border: '1px solid #333',
              borderRadius: '5px',
              cursor: loading ? 'wait' : 'pointer',
            }}
            disabled={loading}
          >
            {seat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BookTable;