import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApiProvider, useApi } from './context/ApiContext';
import Home from './Home';
import BookSearch from './BookSearch';

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
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <BookSearch />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;