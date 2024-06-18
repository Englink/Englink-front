import React, { useEffect, useState } from "react";
import NavBarTeacher from "../components/forteacher/NavBarTeacher";
import UpdateAvailability from "../components/forteacher/UpdateAvailability.jsx";
import AvgRating from "../components/AvgRating.jsx";

const TeacherPage = () => {
    let user = localStorage.getItem("userInfo");
    user = JSON.parse(user);
    const [userInfo, setUserInfo] = useState("");

    useEffect(() => {
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString) {
            const userInfoObj = JSON.parse(userInfoString);
            setUserInfo(userInfoObj);
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <NavBarTeacher />
            <main className="flex-grow container mx-auto p-8 grid grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {userInfo && userInfo.image && (
                        <>
                            <img
                                src={`http://localhost:3003/${user.image}`}
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
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg relative flex flex-col justify-center items-center">
                    <div className="mb-6">
                        <p className="text-2xl font-semibold mb-2 underline text-center">מה הדירוג שלי:</p>
                        <AvgRating teacherId={userInfo._id} />
                    </div>
                    <div className="mt-6">
                        <p className="text-xl font-semibold text-gray-800">עדכון זמינות</p>
                        <UpdateAvailability />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TeacherPage;





