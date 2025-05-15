import { createContext, useState, useContext } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [apiUrl, setApiUrl] = useState(localStorage.getItem('apiUrl') || '');
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '');
  const [isConfigured, setIsConfigured] = useState(!!(apiUrl && apiKey));

  const configureApi = (url, key) => {
    setApiUrl(url);
    setApiKey(key);
    localStorage.setItem('apiUrl', url);
    localStorage.setItem('apiKey', key);
    setIsConfigured(true);
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