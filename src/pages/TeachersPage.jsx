import React, { useEffect, useState } from "react";
import NavBarTeacher from "../components/forteacher/NavBarTeacher";
import UpdateAvailability from "../components/forteacher/UpdateAvailability.jsx";
import AvgRating from "../components/AvgRating.jsx";
import {useNavigate} from 'react-router-dom';
import GetReviews from "../data/GetReviews.jsx";
import profile from "../images/profile.png";
import StudentsReviews from '../components/StudentsReviews';

const TeacherPage = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([])

    // let user = localStorage.getItem("userInfo");
    // user = JSON.parse(user);
    const [userInfo, setUserInfo] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const userInfoString = localStorage.getItem('userInfo');
            if (userInfoString) {
                const userInfoObj = JSON.parse(userInfoString);
                if (userInfoObj.role !== 'teacher') {
                    navigate('/login-teachers'); // Use navigate for programmatic navigation
                }

                setUserInfo(userInfoObj);
                console.log(userInfoObj)
                const review = await GetReviews(userInfoObj._id);
                setReviews(review);
                console.log(reviews)
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <NavBarTeacher />
            <main className="flex-grow container mx-auto p-8 grid lg:grid-cols-2 gap-8 sm:grid-cols-1">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {userInfo && userInfo.image && (
                        <>
                            <img
                                src={`http://localhost:3003/${userInfo.image}`}
                                alt="תמונת מורה"
                                className="w-32 h-32 rounded-full mb-4 shadow-lg object-cover mx-auto"
                            />
                            <p className="text-xl font-semibold text-gray-800 text-center">{userInfo.name}</p>
                        </>
                    )}
                    <p className="text-2xl font-semibold mb-2 underline text-center">קצת על עצמי:</p>
                    <p className="text-xl text-gray-700 text-center">{userInfo.desc}</p>
                    <p className="text-2xl font-semibold mt-4 underline text-center">מחיר לשיעור:</p>
                    <p className="text-xl text-gray-700 text-center">{userInfo.price} ש"ח</p>
                  {reviews && <StudentsReviews reviews = {reviews}/>}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg relative flex flex-col items-center">
                    <div className="mb-6">
                        <p className="text-2xl font-semibold mb-2 underline text-center">מה הדירוג שלי:</p>
                       {userInfo && <AvgRating teacherId={userInfo._id} />}
                    </div>
                    <div className="mt-6">
                        <UpdateAvailability />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TeacherPage;





