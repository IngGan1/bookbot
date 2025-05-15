import React, { createContext, useState, useContext } from 'react';
import { supabase } from './supabaseClient';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [apiUrl, setApiUrl] = useState(localStorage.getItem('apiUrl') || '');
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '');
  const [isConfigured, setIsConfigured] = useState(!!(apiUrl && apiKey));

  const configureApi = async (url, key) => {
    setApiUrl(url);
    setApiKey(key);
    localStorage.setItem('apiUrl', url);
    localStorage.setItem('apiKey', key);
    setIsConfigured(true);

    // Supabase에 저장
    try {
      const { error } = await supabase
        .from('bookapi')
        .insert([{ URL: url, KEY: key }]);

      if (error) {
        console.error('Supabase 저장 실패:', error.message);
      } else {
        console.log('API 정보가 Supabase에 저장되었습니다.');
      }
    } catch (err) {
      console.error('Supabase 오류 발생:', err.message);
    }
  };

  const resetApi = () => {
    setApiUrl('');
    setApiKey('');
    localStorage.removeItem('apiUrl');
    localStorage.removeItem('apiKey');
    setIsConfigured(false);
  };

  return (
    <ApiContext.Provider value={{ apiUrl, apiKey, isConfigured, configureApi, resetApi }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);