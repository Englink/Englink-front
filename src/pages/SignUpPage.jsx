import React from 'react';
import {useForm} from 'react-hook-form';
import onSubmit from "../data/PostSignupstudents.jsx";


const SignUpPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    // פונקציה שנמצאת בדאטה ועושה בקשת פוסט למאגר התלמידים
    <onSubmit/>


return (
    <>
        <div className="flex flex-col md:flex-row h-screen font-sans">
            <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-10">

                <form onSubmit={handleSubmit(onSubmit)}
                      className="w-full max-w-md p-8 bg-ivory border-2 border-blue-400 rounded-lg shadow-md space-y-4">
                    <h2 className='text-2xl font-bold mb-4 text-dark-blue text-center'>הרשמה</h2>
                    {/* שדה של שם */}
                    <input {...register("name", {required: true})} placeholder="שם"
                           className="border p-2 rounded w-full"/>
                    {errors.name && <span>שם הוא שדה חובה</span>}


                    {/* שדה של מייל */}
                    <input {...register("email", {
                        required: "מייל הוא שדה חובה",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "כתובת המייל אינה תקנית"
                        }
                    })} placeholder="מייל - user@example.com" className="border p-2 rounded w-full"/>
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


                    {/* שדה של מין */}
                    <select {...register("gender", {required: true})} className="border p-2 rounded w-full">
                        <option value="">בחר מין</option>
                        <option value="male">זכר</option>
                        <option value="female">נקבה</option>
                    </select>


                    {/* כפתור שליחת הטופס */}
                    <button type="submit"
                            className="bg-purple text-white font-bold py-2 px-4 w-full rounded">הרשמה
                    </button>
                </form>
            </div>
            <div className="w-full md:w-1/2 h-1/2 md:h-full">
                <img src="src\images\plash.jpg" alt="תיאור תמונה" className="w-full h-full object-cover opacity-80"/>
            </div>
        </div>

    </>
);
    }
;

export default SignUpPage;
