import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Spinner from "../components/Sppiner.jsx";

function LoginPage() {
  const navigate = useNavigate()
  const [userMail, setuserMail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [loading, setLoading] = useState(false);
  useEffect(()=>
  {
    setuserMail('')
    setUserPassword('')

  },[])
  
  function handleForgotPasswordClick(event) {
    event.preventDefault(); // Prevent the default link behavior
      navigate('/forget-password?role=student'); // Pass role as URL parameter
    };
    
  

  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault()
    
    

    try {
      const {data} = await axios.post('http://localhost:3003/api/students/login', {
        userDetails: {
          email: userMail,
          password: userPassword,
          role:'student'
        },
      },{withCredentials:true})
      navigate('/main')
      localStorage.setItem('userInfo', JSON.stringify(data.user))

    } catch (error) {
      alert('שגיאה במהלך התחברות: ' + error.toString())
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex flex-col h-screen font-sans">
      <div className="absolute inset-0 flex items-center justify-center">
        <img className="scale-x-[-1] w-full object-cover h-full" src="src\images\לוגין תלמיד.jpg" alt="Description of the image" />
      </div>
  
      <div className="absolute inset-0 bg-background opacity-50 md:w-1/2"></div>
  
      <div className="z-10 flex items-center justify-center text-center md:w-1/2 h-full" dir="rtl">
        <Spinner loading={loading} />
  
        <form onSubmit={handleLogin} className="w-3/4 md:w-1/2 grid gap-2">
          <div className="mb-4 text-right">
            <h2 className="text-2xl font-bold mb-4 text-dark-blue text-center">התחברות</h2>
            <input
              placeholder="אימייל"
              type="text"
              id="userMail"
              value={userMail}
              onChange={(e) => setuserMail(e.target.value)}
              className="shadow border  bg-white/0 placeholder-gray/100 rounded w-full py-2 px-3 focus:outline-none"
              />
          </div>
          <div className="mb-4 text-right">
            <input
              placeholder="סיסמה"
              type="password"
              id="userPassword"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
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

export default LoginPage;