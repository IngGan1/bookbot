import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import BookRequestForm from './components/BookRequestForm';
import RequestStatus from './components/RequestStatus';
import NotFound from './pages/NotFound';
import BookDetail from './pages/BookDetail';
import Market from './pages/Market';
import { LibraryApiProvider } from "./context/LibraryApiContext";
import LibrarySelector from "./components/LibrarySelector";

function App() {
  return (
    <LibraryApiProvider>
      <Router>
        <div className="p-4">
          <LibrarySelector />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/request" element={<BookRequestForm />} />
            <Route path="/status" element={<RequestStatus />} />
            <Route path="/bookdetail" element={<BookDetail />} />
            <Route path="/market" element={<Market />} />
            <Route path="/LibrarySelector" element={<LibrarySelector />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </LibraryApiProvider>
  );
}

export default App;