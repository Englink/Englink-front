import React, { useState } from 'react'
import axios from 'axios'
import './loginPage.css'
import MainPage from './mainPage'

function LoginPage() {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3003/api/students/login', {
        userDetails: {
          email: userName,
          password: userPassword
        },
        isStudent: true
      });

      alert('נכנסת למערכת בהצלחה!')
      console.log(response.data.token)

      setUserName('')
      setUserPassword('')
      

      setLoggedIn(true)
    } catch (error) {
      alert('שגיאה במהלך התחברות: ' + error.toString());
    }
  };

  // ניתן להציג את הקומפוננטה של MainPage אם המשתמש מחובר
  if (loggedIn) {
    return <MainPage />;
  }

  // נוסיף את הפונקציונאליות של התחברות רק אם המשתמש לא מחובר
  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="userName">שם משתמש:</label>
      <input type="text" id="userName" autoComplete='false' value={userName} onChange={(e) => setUserName(e.target.value)} />

      <label htmlFor="userPassword">סיסמה:</label>
      <input type="password" id="userPassword" autoComplete='false' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />

      <button type="submit">התחבר</button>
    </form>
  );
}

export default LoginPage;










