import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SurveyForm from './pages/SurveyForm';
import SurveyResponses from './pages/SurveyResponses';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Survey Form</Link>
          <Link to="/responses">Responses</Link>
        </nav>
        <Routes>
          <Route path="/" element={<SurveyForm />} />
          <Route path="/responses" element={<SurveyResponses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
