import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApiProvider, useApi } from './context/ApiContext';
import Home from './pages/Home';
import BookSearch from './pages/BookSearch';
import BookDetail from './pages/BookDetail';
import table from './pages/BookDetail';

function ProtectedRoute({ children }) {
  const { isConfigured } = useApi();
  return isConfigured ? children : <Navigate to="/" replace />;
}


function App() {
  return (
    <ApiProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search"
            element={
              <ProtectedRoute>
                <BookSearch />
              </ProtectedRoute>
            }/>
          <Route path="/detail"
            element={
              <ProtectedRoute>
                <BookDetail />
              </ProtectedRoute>
            }/>
            <Route path="/table"
            element={
              <ProtectedRoute>
                <BookDetail />
              </ProtectedRoute>
            }/>
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;