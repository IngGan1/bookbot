import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../context/ApiContext';

function Home() {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const { configureApi } = useApi();
  const navigate = useNavigate();

  const handleSave = () => {
    if (!url || !key) {
      alert("API URL과 KEY를 입력하세요.");
      return;
    }

    configureApi(url, key);
    navigate('/search'); // 설정 완료 후 검색 페이지로 이동
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🔧 API 설정</h1>
      <input type="text" placeholder="API URL" value={url} onChange={e => setUrl(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="text" placeholder="API KEY" value={key} onChange={e => setKey(e.target.value)} className="border p-2 w-full mb-4" />
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">저장</button>
    </div>
  );
}

export default Home;