import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function FeedbackForm() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const lessonId = queryParams.get('lessonId');

    const [formData, setFormData] = useState({
        stars: '',
        comment: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send form data to backend server using Axios
        axios.post('http://localhost:3003/api/teachers/add-review', {
            ...formData,
            lessonId, // Include lessonId in the form submission
        withCredentials: true})
            .then(response => {
                // Handle success response from backend
                console.log('Feedback submitted successfully:', response.data);
                // Optionally, display a confirmation message to the user
            })
            .catch(error => {
                // Handle error
                console.error('Error submitting feedback:', error);
                // Optionally, display an error message to the user
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 sm:px-6 lg:px-8">
            <h1 className="mb-6 text-3xl font-extrabold text-center text-gray-900">Feedback Form</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
                <div className="form-group">
                    <label htmlFor="stars" className="block text-sm font-medium text-gray-700">Stars:</label>
                    <select id="stars" name="stars" value={formData.stars} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="">Select</option>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment:</label>
                    <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange} rows="4" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit Feedback</button>
            </form>
        </div>
    );
}

export default FeedbackForm;