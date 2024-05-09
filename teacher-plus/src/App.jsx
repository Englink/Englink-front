import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/signUpPage" element={<SignUpPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}



export default App;



