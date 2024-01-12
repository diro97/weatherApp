
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from './weather';
import Login from './Login';
import './App.css'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
       
          <Route path="/" element={<Login />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
