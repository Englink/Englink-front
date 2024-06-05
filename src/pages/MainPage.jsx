import React, { useState, useEffect } from "react";
import { GetTeachers } from "../data/GetTeachers";
import Navbar from "../components/header/NavBar";
import { useNavigate } from 'react-router-dom';
import FullScreenImage from "../components/header/imagestudent.jsx";
import Spinner from "../components/Sppiner.jsx";
import StarRating from "../components/AvgRating.jsx";

const MainPage = () => {
    let user = localStorage.getItem("userInfo");
    user = JSON.parse(user);
    const [teachers, setTeachers] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeachers = async () => {
            setLoading(true);
            try {
                const res = await GetTeachers();
                setTeachers(res.data.teachers);
            } catch (error) {
                console.error("Failed to fetch teachers", error);
            } finally {
                setLoading(false);
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
            <Spinner loading={loading} />
            <header>
                <Navbar />
            </header>
            <FullScreenImage />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-veryLight min-h-screen">
                <div className="mt-10 flex justify-center">
                    <div className="relative">
                        <input
                            id="search"
                            type="text"
                            placeholder="חיפוש מורה"
                            className="text-center px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-medium transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            onInput={(event) => setQuery(event.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {filteredTeachers.map((teacher, index) => (
                        <div key={index} className="bg-fuchsia-300 rounded-lg shadow-lg flex flex-col items-center">
                            <img src={teacher.image} alt={teacher.name} className="w-full h-48 object-cover rounded-lg" />
                            <div className="px-6 py-4 text-center">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">{teacher.name}</h2>
                                <p className="text-gray-600 mb-4">{teacher.phone}</p>
                                <StarRating teacherId={teacher._id} />
                                <button
                                    onClick={() => handleSetLesson(teacher._id)}
                                    className=" hover:bg-medium text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-medium"
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
