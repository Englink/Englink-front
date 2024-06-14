import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import handleTeacherLogin from "../data/LoginTeacher.jsx";


function LoginTeacherPage() {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    function handleForgotPasswordClick(event) {
      event.preventDefault(); // Prevent the default link behavior
        navigate('/forget-password?role=teacher'); // Pass role as URL parameter
      };
  
    

    return (
        <div className="relative flex flex-col h-screen font-sans">
          {/* Image and background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img className="w-full object-cover object-bottom h-full" src="src/images/לוגין מורה.jpg" alt="Description of the image" />
          </div>
      
          {/* Overlay to provide background opacity without affecting form */}
          <div className="absolute inset-0 bg-background opacity-70 md:w-1/2"></div>
      
          {/* Form container */}
          <div className="z-10 flex items-center justify-center text-center md:w-1/2 h-full" dir="rtl">
            <form onSubmit={(e) => handleTeacherLogin(e, userName, userPassword, navigate)} className="w-3/4 md:w-1/2 grid gap-2">
              <div className="mb-4 text-right">
                <h2 className="text-2xl font-bold mb-4 text-dark-blue">התחברות</h2>
                <input
                  placeholder="אימייל"
                  type="text"
                  id="userName"
                  autoComplete="off"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="shadow border bg-white/0 placeholder-gray/100 rounded w-full py-2 px-3 focus:outline-none"
                />
                            <a
                href="#"
                className="block text-sm text-gray hover:text-bluedark text-right py-1"
                onClick={handleForgotPasswordClick}
            >
                שכחת סיסמה?
            </a>

              </div>
              <div className="mb-4 text-right">
                <input
                  placeholder="סיסמה"
                  type="password"
                  id="userPassword"
                  autoComplete="on"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="shadow border bg-white/0 placeholder-gray/100 rounded w-full py-2 px-3 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="block w-full bg-blue hover:bg-gray text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"

              >
                התחבר
              </button>
            </form>
          </div>
        </div>
      );
      
}

export default LoginTeacherPage

