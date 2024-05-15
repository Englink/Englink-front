import {React,useState, useEffect} from "react";

import { Link } from 'react-router-dom'; // נניח שאתה משתמש ב-React Router



function NotFound404() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404 - דף לא נמצא</h1>

                <p className="text-lg mb-8">מצטערים, הדף שחיפשת לא נמצא.</p>

            </div>


            <div>
                <Link className='bg-red-600 text-white rounded-full py-3 px-4 inline-block' to={'/'}>
                    חזור לדף הבית
                </Link>
            </div>
        </div>
    );
}

export default NotFound404;
