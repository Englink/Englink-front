import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3003/api/students/reset-password/${token}`, { password });
            console.log('Response:', response);
            setMessage(response.data.message);
            navigate('/login'); 

        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col space-y-4">
                    <input
                        type="password"
                        placeholder="הזן סיסמה"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 font-semibold text-white bg-blue rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </div>
                {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
            </form>
        </div>
    );
};

export default ResetPassword;
