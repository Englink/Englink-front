import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Spinner from "../components/Sppiner.jsx";

function LoginPage() {
  const navigate = useNavigate()
  const [userMail, setuserMail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [loading, setLoading] = useState(false);

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
    <div className="flex flex-col sm:flex-row h-screen font-sans">
      <div className="relative flex items-center justify-center shadow-md text-center md:w-1/2 w-full" dir="rtl">
        <Spinner loading={loading} />
  
        <form onSubmit={handleLogin} className='w-full sm:w-1/2 grid gap-2'>
          <div className="mb-4 text-right">
            <h2 className="text-2xl font-bold mb-4 text-dark-blue">התחברות</h2>
            <input
              placeholder='שם משתמש'
              type="text"
              id="userMail"
              autoComplete="off"
              value={userMail}
              onChange={(e) => setuserMail(e.target.value)}
              className="shadow rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 text-right">
            <input
              placeholder='סיסמה'
              type="password"
              id="userPassword"
              autoComplete="off"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="shadow bg-white  rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
            />
            <a href="#" className="block text-sm text-gray hover:text-bluedark text-right py-1">
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
      <div className="relative flex items-center justify-center font-sans w-full sm:w-1/2 h-screen">
        <img  className="w-full object-cover object-top max-h-full opacity-80" src="src\images\priscilla-du-preez-NjirplnVra8-unsplash.jpg" alt="Description of the image" />
        {/* <div className="absolute inset-0 opacity-50"></div> */}
      </div>
    </div>
  );
  }

export default LoginPage;
