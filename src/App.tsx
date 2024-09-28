import React from 'react';
import Home from './pages/Home';
import ViewPage from './pages/ViewPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:id" element={<ViewPage />} />
      </Routes>
    </Router>
  );
};

export default App;