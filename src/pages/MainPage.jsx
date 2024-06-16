// MainPage.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from "react";
import {GetTeachers} from "../data/GetTeachers";
import Navbar from "../components/header/NavBar";
import {useNavigate} from 'react-router-dom';
import FullScreenImage from "../components/header/imagestudent.jsx";
import Spinner from "../components/Sppiner.jsx";
import StarRating from "../components/AvgRating.jsx";
import profile from "../images/profile.png";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons'



const MainPage = () => {
    let user = localStorage.getItem("userInfo");
    user = JSON.parse(user);

    const [teachers, setTeachers] = useState([]);
    const [query, setQuery] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [priceRange, setPriceRange] = useState([20, 100]);
    const [ratingRange, setRatingRange] = useState([0, 5]); // משתנה חדש לסינון לפי דירוג כוכבים
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [expandedStates, setExpandedStates] = useState({});

    useEffect(() => {
        const fetchTeachers = async () => {
            setLoading(true);
            try {
                const res = await GetTeachers();
                const teachersWithRatings = res.data.teachers.map(teacher => ({...teacher, averageRating: 0}));
                setTeachers(teachersWithRatings);
            } catch (error) {
                console.error("Failed to fetch teachers", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeachers();
    }, []);

    const handleAverageRating = (teacherId, averageRating) => {
        setTeachers(prevTeachers =>
            prevTeachers.map(teacher =>
                teacher._id === teacherId ? {...teacher, averageRating} : teacher
            )
        );
    };

    const filteredTeachers = teachers
        .filter((teacher) => {
            const matchesName = teacher.name.toLowerCase().includes(query.toLowerCase());
            const matchesPrice = teacher.price >= priceRange[0] && teacher.price <= priceRange[1];
            const matchesRating = teacher.averageRating >= ratingRange[0] && teacher.averageRating <= ratingRange[1];
            return matchesName && matchesPrice && matchesRating;
        })
        .filter((teacher) => {
            if (genderFilter === 'male') {
                return teacher.gender === 'male';
            } else if (genderFilter === 'female') {
                return teacher.gender === 'female';
            } else {
                return true; // אם לא נבחר מגדר ספציפי, החזר את כל המורים
            }
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

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleRatingChange = (event, newValue) => {
        setRatingRange(newValue);
    };

    return (
        <>
            <Spinner loading={loading}/>
            <header>
                <Navbar/>
            </header>
            <FullScreenImage/>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
                <div className="search-container mb-8 bg-hnav rounded-full">
                    <div className="relative mb-4 ">
                        <input
                            id="search"
                            type="text"
                            placeholder="חיפוש מורה לפי שם"
                            className="search-container text-white mb-4"
                            style={{width: '70%'}} // Custom width
                            onInput={(event) => setQuery(event.target.value)}
                        />
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-center text-white">בחר טווח מחירים:</p>
                        <Box sx={{width: 300, margin: '0 auto'}}>
                            <Slider
                                value={priceRange}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                min={20}
                                max={100}
                                step={10}
                                sx={{
                                    direction: 'ltr',
                                    width: '200px', // Change the width here
                                }}
                            />
                        </Box>
                        <div className="flex justify-between mt-2 text-white">
                            <span>{priceRange[1]} ש"ח</span>
                            <span>{priceRange[0]} ש"ח</span>
                        </div>
                    </div>
                    <div className="mt-4 mr-16 text-center">
                        <p className="text-center text-white">בחר ממוצע דירוגים:</p>
                        <Box sx={{width: 300, margin: '0 auto'}}>
                            <Slider
                                value={ratingRange}
                                onChange={handleRatingChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                                step={0.5}
                                sx={{
                                    direction: 'ltr',
                                    width: '200px', // Change the width here
                                    color: '#ffd701',
                                    '& .MuiSlider-thumb': {
                                        backgroundColor: '#ffd701',
                                    },
                                    '& .MuiSlider-track': {
                                        backgroundColor: '#ffd701',
                                    },
                                    '& .MuiSlider-rail': {
                                        backgroundColor: 'lightgray',
                                    },
                                }}
                            />
                        </Box>
                        <div className="flex justify-between mt-2 text-white">
                            <span>{ratingRange[1]} &#9733;</span> {/* &#9733; is the Unicode for a star */}
                            <span>{ratingRange[0]} &#9733;</span> {/* &#9733; is the Unicode for a star */}
                        </div>
                    </div>

                    <div className="mt-4 mr-10 text-center">
                        <p className="text-center text-white mb-2">בחר מגדר:</p>
                        <div className="flex justify-center text-sm"> {/* Removed space-x-4 */}
                            <button
                                className={`mx-2 px-2 py-2 rounded-full ${
                                    genderFilter === 'male' ? 'bg-cyan-800 text-white' : 'bg-cyan-400 text-purple-500'
                                }`}
                                onClick={() => setGenderFilter(genderFilter === 'male' ? '' : 'male')}
                            >
                                <FontAwesomeIcon icon={faMale} size="2x"/> {/* FontAwesome icon for man */}
                            </button>
                            <button
                                className={`mx-2 px-2 py-2 rounded-full ${
                                    genderFilter === 'female' ? 'bg-pink-700 text-white' : 'bg-pink-300 text-purple-500'
                                }`}
                                onClick={() => setGenderFilter(genderFilter === 'female' ? '' : 'female')}
                            >
                                <FontAwesomeIcon icon={faFemale} size="2x"/> {/* FontAwesome icon for woman */}
                            </button>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {filteredTeachers.map((teacher, index) => (
                        <div key={index} className="glass-effect rounded-lg shadow-lg flex flex-col items-center">
                            {/*הדיב של התמונה*/}
                            <div className="relative">
                                <div className="glass-effect rounded-lg shadow-lg overflow-hidden">
                                    <img
                                        src={teacher.image ? `http://localhost:3003/${teacher.image}` : profile}
                                        alt="profile"
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                                <div
                                    className="absolute inset-0 rounded-lg border-4 border-purple-500 glass-border"></div>
                            </div>
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
                                <StarRating teacherId={teacher._id}
                                            onAverageCalculated={(rating) => handleAverageRating(teacher._id, rating)}/>
                                <div className='mb-4'>
                                    <p className="text-hnav">מחיר לשיעור: {teacher.price} ש"ח</p>
                                </div>

                                <button
                                    onClick={() => handleSetLesson(teacher._id)}
                                    className="btn relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-medium tracking-wide text-white bg-purple rounded-full focus:outline-none focus:ring transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400"
                                >
                                    <span
                                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"></span>
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
