import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [userMail, setuserMail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleLogin = async (e) => {
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
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">התחברות</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userMail">
                שם משתמש:
              </label>
              <input
                  type="text"
                  id="userMail"
                  autoComplete='off'
                  value={userMail}
                  onChange={(e) => setuserMail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userPassword">
                סיסמה:
              </label>
              <input
                  type="password"
                  id="userPassword"
                  autoComplete='off'
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                התחבר
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default LoginPage;
