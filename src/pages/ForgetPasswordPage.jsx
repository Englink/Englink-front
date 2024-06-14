// forgot-password.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const role = params.get('role');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3003/api/students/forgot-password', { email, role });
            setMessage('reset messege sent to your email');

        } catch (error) {
            setMessage('An error occurred: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="flex items-center justify-center h-screen background">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="הזן אימייל"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    אישור
                </button>
                {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
