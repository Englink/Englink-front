import React, {useEffect, useState} from "react";
import {GetTeachers} from "../data/GetTeachers.jsx";
import Navbar from "../components/header/NavBar.jsx";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
    const navigate = useNavigate()
    const [teachers, setTeacherss] = useState([]);
    
    useEffect(() => {
        GetTeachers()
            .then((data) => setTeacherss(data))
            .catch(err=> {
            if (err.response.status == 403) {
                navigate('/')
            }
            })
    }, []);

    // טיפול בשורת החיפוש
    const [query, set_query] = useState('')

    const filterDate = teachers.filter((item) => {
        return item.name && item.name.toLowerCase().startsWith(query.toLowerCase())
    })

    return (
        <>
            <Navbar/>
            <div>
                <form className="flex justify-center items-center mt-10">
                    <label htmlFor="search" className="mr-2 text-xl font-bold text-gray-700 rtl-true">:חיפוש
                        מורה:</label>
                    <input id={'search_inp'} type="text" placeholder="חיפוש מורה"
                           className="w-1/3 h-10 rounded-lg border-2 border-gray-300 px-2 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                           onInput={event => set_query(event.target.value)}/>
                </form>
            </div>
            {/*שורת חיפוש כרגע רצה על אימייל בגלל שהדאטה לא מתוקן*/}

            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 content-around bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-10 py-10 ">

                {filterDate.map((teacher, index) => {
                    return (
                        <div key={index}
                             className="flex flex-col bg-white rounded-lg p-4 shadow-2xl items-center space-y-4 w-72 h-auto">
                            <img src={teacher.image} alt="" className="w-full h-64 object-cover rounded-lg"/>
                            <h2 className="font-bold text-xl mb-2 text-gray-800">{teacher.name}</h2>
                            <p className="text-gray-600">{teacher.phone}</p>
                            <div className="flex space-x-4">
                                <button
                                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-4 rounded-md shadow-md">
                                    קבע שיעור
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
}