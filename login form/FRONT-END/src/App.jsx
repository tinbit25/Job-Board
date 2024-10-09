import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FloatingShape from "./components/FloatingShape";
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import EmailVerificationPage from './pages/EmailVerificationPage';

function App() {
  return (
    <>
      <div className='min-h-screen bg-green-700 flex items-center justify-center relative overflow-hidden'>
        <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" zIndex={1} />
        <FloatingShape color="bg-green-500" size="w-44 h-44" top="70%" left="80%" zIndex={2} />
        <FloatingShape color="bg-green-500" size="w-64 h-64" top="40%" left="-10%" zIndex={3} /> 
        
        <Routes>
          <Route path='/' element={"Home"} />
          <Route path='/signup' element={
           
            <SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/verify-email' element={<EmailVerificationPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
