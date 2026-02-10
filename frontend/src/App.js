/* import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp';

function App() {
  return (
    <div className="App">
       <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;  */

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import './App.css';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import DoctorsPage from './Pages/DoctorsPage';
import PrescriptionsPage from './Pages/PrescriptionsPage';
import EasyToUsePage from './Pages/EasyToUsePage';
import MyConsultations from './Pages/MyConsultations';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/consultations" element={<MyConsultations />} />
          <Route path="/prescriptions" element={<PrescriptionsPage />} />
          <Route path="/platform" element={<EasyToUsePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;