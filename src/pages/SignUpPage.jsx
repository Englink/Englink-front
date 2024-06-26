import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import onSubmit from "../data/PostSignupstudents.jsx";
import Sppiner from "../components/Sppiner.jsx";
// import Spinner from "../components/Sppiner.jsx";




const SignUpPage = () => {
        const [loading, setLoading] = useState(false);


        const {register, handleSubmit, formState: {errors}} = useForm();
    // פונקציה שנמצאת בדאטה ועושה בקשת פוסט למאגר התלמידים
    <onSubmit/>


return (
    <>
<Sppiner loading={loading} />
          <div className="relative flex flex-col h-screen font-sans">
                {/* תמונת הרקע */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                        src="src/images/plash.jpg" 
                        alt="תיאור תמונה" 
                        className="w-full object-cover h-full"
                    />
                </div>
                {/* שכבת הכהות מתחת לטופס */}
                <div className="absolute inset-0 bg-background opacity-50 md:w-1/2"></div>
                <div className="z-10 flex items-center justify-center text-center md:w-1/2 h-full" >

                <form onSubmit={handleSubmit(onSubmit)}
              
                      className="w-full max-w-md p-8 bg-ivory  rounded-lg shadow-md space-y-4">
                    <h2 className='text-2xl font-bold mb-4 text-dark-blue text-center'>הרשמה</h2>  
                    <h1 className="text-center  text-red-600 ">  * שדות חובה   </h1>
            

        {/* שדה של שם */}
        <div className="input-container relative flex items-center w-full">
            <span className="text-red-600">*</span>
            <input 
                {...register("name", { required: true })} 
                placeholder="שם" 
                className={`shadow border border-gray-300 bg-white/0 placeholder-gray/100 rounded w-full py-2 px-3 focus:outline-none ${errors.name ? 'bg-[#f9dadb]' : ''}`}
            />
        </div>
        {errors.name && <span className="text-red-600">שם הוא שדה חובה</span>}



                
                    {/* שדה של מייל */}
                    <div className="input-container relative flex items-center w-full">
                    <span className="text-red-600">*</span>
                    <input {...register("email", {
                        required: "מייל הוא שדה חובה",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "כתובת המייל אינה תקנית"
                        }
                    })} placeholder="מייל - user@example.com "    
                    className={`shadow border border-gray-300 bg-white/0 placeholder-gray/100 rounded w-full py-2 px-3 focus:outline-none ${errors.email ? 'bg-[#f9dadb]' : ''}`}/>
                    </div>
                    {errors.email && <span  className="text-red-600">{errors.email.message}</span>}

                    {/* שדה של סיסמה */}
                    <div className='input-container relative flex items-center w-full'>
                    <span className="text-red-600">*</span>
                    <input {...register("password", {
                        required: "סיסמה היא שדה חובה",
                        minLength: {
                            value: 8,
                            message: "הסיסמה חייבת להכיל לפחות 8 תווים"
                        }
                    })} placeholder="סיסמה" 
                    className={`shadow border border-gray-300 bg-white/0 placeholder-gray/100 rounded w-full py-2 px-3 focus:outline-none ${errors.password ? 'bg-[#f9dadb]' : ''}`}type="password"/>
                
                    </div>
                    {errors.password && <span  className="text-red-600">{errors.password.message}</span>}

                    {/* שדה של שנת לידה */}
                    <div className='mr-1'>
                    <input {...register("age", {required: false})} placeholder="שנת לידה"
                         className="shadow border  bg-white/0 placeholder-gray/100 rounded w-full py-2 px-3 focus:outline-none" type="taxt"/>
                    </div>

                    {/* שדה של מגדר */}
                    <div className='mr-1'>
                    <select {...register("gender", {required: false})} className="shadow border  bg-white/0 placeholder-gray/100 rounded w-full py-2 px-3 focus:outline-none">
                        <option value=""> מגדר</option>
                        <option value="male">זכר</option>
                        <option value="female">נקבה</option>
                    </select>
                    </div>

                    {/* כפתור שליחת הטופס */}
                    <div className='mr-1'>
                    <button type="submit"
                            onClick={() => setLoading(true)}
                            className="bg-purple text-white font-bold py-2 px-4 w-full rounded">הרשמה

                    </button>
                    </div>
                </form>
            </div>
           
        </div>

    </>
);
    }
;


export default SignUpPage;
