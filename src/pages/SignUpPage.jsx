import React from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import onSubmit from "../data/PostSignupstudents.jsx";


const SignUpPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    // פונקציה שנמצאת בדאטה ועושה בקשת פוסט למאגר התלמידים
    <onSubmit/>


return (
    <>
        <div className='flex justify-center items-center h-screen bg-gray-200'>
            <form onSubmit={handleSubmit(onSubmit)}
                  className="border max-w-md mx-auto p-10 bg-white rounded shadow-xl space-y-4">
                {/* שדה של שם */}
                <input {...register("name", {required: true})} placeholder="שם" className="border p-2 rounded w-full"/>
                {errors.name && <span>שם הוא שדה חובה</span>}


                {/* שדה של מייל */}
                <input {...register("email", {
                    required: "מייל הוא שדה חובה",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "כתובת המייל אינה תקנית"
                    }
                })} placeholder="מייל" className="border p-2 rounded w-full"/>
                {errors.email && <span>{errors.email.message}</span>}

                {/* שדה של סיסמה */}
                <input {...register("password", {
                    required: "סיסמה היא שדה חובה",
                    minLength: {
                        value: 8,
                        message: "הסיסמה חייבת להכיל לפחות 8 תווים"
                    }
                })} placeholder="סיסמה" className="border p-2 rounded w-full" type="password"/>
                {errors.password && <span>{errors.password.message}</span>}

                {/* שדה של גיל */}
                <input {...register("age", {required: false})} placeholder="גיל"
                       className="border p-2 rounded w-full" type="number"/>


                {/*/!* שדה של הצגה עצמית *!/*/}
                {/*<textarea {...register("desc", { required: true })} placeholder="הצגה עצמית" className="border p-2 rounded w-full bg-red-200" />*/}
                {/*{errors.presentation && <span>הצגה עצמית היא שדה חובה</span>}*/}

                {/* שדה של מין */}
                <select {...register("gender", {required: true})} className="border p-2 rounded w-full">
                    <option value="">בחר מין</option>
                    <option value="male">זכר</option>
                    <option value="female">נקבה</option>
                </select>


                {/* כפתור שליחת הטופס */}
                <button type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded">הרשמה
                </button>
            </form>
        </div>
    </>
);
}
;

export default SignUpPage;
