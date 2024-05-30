import React, { useState, useEffect } from "react";
import { GetTeachers } from "../data/GetTeachers";
import Navbar from "../components/header/NavBar";
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const [teachers, setTeachers] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await GetTeachers();
                setTeachers(res.data.teachers);
            } catch (error) {
                console.error("Failed to fetch teachers", error);
            }
        };
        fetchTeachers();
    }, []);

    const filteredTeachers = teachers.filter((teacher) => {
        return teacher.name.toLowerCase().includes(query.toLowerCase());
    });

    const handleSetLesson = (teacherId) => {
        localStorage.setItem('teacherId', JSON.stringify(teacherId));
        navigate('/set-lesson');
    };

    return (
        <>

        <header>
            <Navbar />
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="mt-10 flex justify-center">
                <div className="relative">
                    <input
                        id="search"
                        type="text"
                        placeholder="חיפוש מורה"
                        className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onInput={(event) => setQuery(event.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM19 19a1 1 0 01-1 1H6a1 1 0 01-1-1V5a1 1 0 011-1h6m7 14V7a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2h11a2 2 0 002-2z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {filteredTeachers.map((teacher, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg flex flex-col items-center">
                        <img src={teacher.image} alt={teacher.name} className="w-full h-48 object-cover rounded-lg" />
                        <div className="px-6 py-4 text-center">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{teacher.name}</h2>
                            <p className="text-gray-600 mb-4">{teacher.phone}</p>
                            <button
                                onClick={() => handleSetLesson(teacher._id)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                קבע שיעור
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default MainPage;