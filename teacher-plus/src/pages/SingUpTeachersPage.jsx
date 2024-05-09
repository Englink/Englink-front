
import {useForm} from 'react-hook-form';
import React from "react";
import onSubmit from "../data/PostSignUpTeachers.jsx";


// יצירת קומפוננטת הטופס
const SingUpTeachersPage = () => {
    // השתמש ב- useForm ליצירת מנגנון לניהול הטופס
    const {register, handleSubmit, formState: {errors}} = useForm();


    // פונקציה שמתבצעת כאשר הטופס מוגש הפוקנציה יושבת בתקיית דאטה ועושה פוסט לפרטי המורה
    <onSubmit/>

    // החזרת JSX שמייצג את הטופס
    return (
        <>
            <div className='flex justify-center items-center h-screen bg-gray-200'>
                <form onSubmit={handleSubmit(onSubmit)}
                      className="border max-w-md mx-auto p-10 bg-white rounded shadow-xl space-y-4">
                    {/* שדה של שם */}
                    <input {...register("name", {required: true})} placeholder="שם"
                           className="border p-2 rounded w-full"/>
                    {errors.name && <span>שם הוא שדה חובה</span>}

                    {/* שדה של טלפון */}
                    <input {...register("phone", { required: true })} placeholder="טלפון" className="border p-2 rounded w-full" />
                    {errors.phone && <span>טלפון הוא שדה חובה</span>}


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
                    <input {...register("age", {required: false})} placeholder="שנות נסיון"
                           className="border p-2 rounded w-full" type="number"/>


                    {/* שדה של מין */}
                    <select {...register("gender", {required: true})} className="border p-2 rounded w-full">
                        <option value="">בחר מין</option>
                        <option value="male">זכר</option>
                        <option value="female">נקבה</option>
                    </select>


                    {/* שדה של העלאת תמונה */}
                    <input {...register("image", {required: false})} placeholder="תמונה "
                           className="border p-2 rounded w-full" type="text"/>

                    {/* כפתור שליחת הטופס */}
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded">הרשמה
                    </button>
                </form>
            </div>
        </>
    )
};

// ייצוא הקומפוננטה
export default SingUpTeachersPage;