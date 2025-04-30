import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import BookRequestForm from './components/BookRequestForm';
import RequestStatus from './components/RequestStatus';
import NotFound from './pages/NotFound';
import BookDetail from './pages/BookDetail';
import Market from './pages/Market';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request" element={<BookRequestForm />} />
        <Route path="/status" element={<RequestStatus />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/BookDetail" element={<BookDetail />} />
        <Route path="/Market" element={<Market />} />
      </Routes>
    </Router>
  );
}

export default App;