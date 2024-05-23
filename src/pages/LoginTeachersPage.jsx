import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import handleTeacherLogin from "../data/LoginTeacher.jsx";


function LoginTeacherPage() {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={(e) => handleTeacherLogin(e, userName, userPassword, navigate)}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">התחברות</h2>
                <div className="mb-4">
                    <label htmlFor="userName" className="block text-gray-700">שם משתמש:</label>
                    <input
                        type="text"
                        id="userName"
                        autoComplete="off"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="userPassword" className="block text-gray-700">סיסמה:</label>
                    <input
                        type="password"
                        id="userPassword"
                        autoComplete="on"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    התחבר
                </button>
            </form>
        </div>
    );
}

export default LoginTeacherPage
