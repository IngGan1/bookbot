import React, { useState } from 'react';
import { supabase } from '../context/supabaseClient';

const seatLayout = [
  { id: 'A1', label: 'A1', x: 5, y: 0 },
  { id: 'A2', label: 'A2', x: 5, y: 1 },
  { id: 'A3', label: 'A3', x: 5, y: 2 },
  { id: 'B1', label: 'B1', x: 5, y: 3 },
  { id: 'B2', label: 'B2', x: 5, y: 4 },
  { id: 'B3', label: 'B3', x: 5, y: 5 },
  { id: 'C1', label: 'C1', x: 5, y: 6 },
  { id: 'C2', label: 'C2', x: 5, y: 7 },
  { id: 'C3', label: 'C3', x: 5, y: 8 },
];

function BookTable() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async (seat) => {
    setSelectedSeat(seat.id);
    setLoading(true);

    // 첫 번째 테이블에 task_id 저장
    const { error: taskError } = await supabase
      .from('user_table') // 실제 테이블명
      .insert([{ task_id: seat.id }]);

    // 두 번째 테이블에 x, y 좌표 저장
    const { error: xyError } = await supabase
      .from('table_xy') // 실제 테이블명
      .insert([{ tablex: seat.x, tabley: seat.y }]);

    setLoading(false);

    if (taskError || xyError) {
      alert(
        '저장 실패: ' +
          (taskError?.message || '') +
          ' ' +
          (xyError?.message || '')
      );
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
          gridTemplateColumns: 'repeat(3, 80px)',
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