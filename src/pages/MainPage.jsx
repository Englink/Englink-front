import React, {useState, useEffect} from "react";
import {GetTeachers} from "../data/GetTeachers";
import Navbar from "../components/header/NavBar";
import {useNavigate} from 'react-router-dom';
import FullScreenImage from "../components/header/imagestudent.jsx";
import Spinner from "../components/Sppiner.jsx";
import StarRating from "../components/AvgRating.jsx";
import profile from "../images/profile.png";

const MainPage = () => {
    let user = localStorage.getItem("userInfo");
    user = JSON.parse(user);

    const [teachers, setTeachers] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [expandedStates, setExpandedStates] = useState({});

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

    const handleExpand = (id) => {
        setExpandedStates(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <>
            <Spinner loading={loading}/>
            <header>
                <Navbar/>
            </header>
            <FullScreenImage/>

           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
                <div className="search-container r">
                    <div className="relative">
                        <input
                            id="search"
                            type="text"
                            placeholder="חיפוש מורה"
                            className="search-container text-hnav "
                            onInput={(event) => setQuery(event.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {filteredTeachers.map((teacher, index) => (
                    <div key={index} className="glass-effect rounded-lg shadow-lg flex flex-col items-center">
                            <img src={`http://localhost:3003/${teacher.image}`} alt={profile}
                                 className="w-full h-48 object-cover rounded-lg"/>
                            <div className="px-6 py-4 text-center">
                                <h2 className="text-xl font-bold text-hnav mb-2">{teacher.name}</h2>
                                <p
                                    className="text-parag mb-4 cursor-pointer"
                                    onClick={() => handleExpand(teacher._id)}
                                >
                                    {expandedStates[teacher._id] || !teacher.desc ? teacher.desc : `${teacher.desc.substring(0, 100)}...`}
                                </p>
                                <button
                                    onClick={() => handleExpand(teacher._id)}
                                    className="text-hnav hover:text-purple bg-transparent font-bold"
                                >
                                    {expandedStates[teacher._id] ? 'הצג פחות' : 'הצג עוד'}
                                </button>
                                <StarRating teacherId={teacher._id}/>
                                <div className='mb-4'>
                                    <p className="text-hnav">מחיר לשיעור: {teacher.price} ש"ח</p>
                                </div>

                                <button
                                    onClick={() => handleSetLesson(teacher._id)}
                                    className="btn relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-medium tracking-wide text-white bg-purple rounded-full focus:outline-none focus:ring transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400"
                                >
                                    <span
                                        className="animate-ping absolute inline-flex h-full w-full rounded-full  opacity-75"></span>
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