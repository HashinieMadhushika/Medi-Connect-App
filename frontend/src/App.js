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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;