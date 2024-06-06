import React, { useEffect, useState } from "react";
import NavBarTeacher from "../components/forteacher/NavBarTeacher";

const TeacherPage = () => {
    let user = localStorage.getItem("userInfo")
    user = JSON.parse(user);
    console.log(user);
    const [userInfo, setUserInfo] = useState("");

    useEffect(() => {
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString) {
            const userInfoObj = JSON.parse(userInfoString);
            setUserInfo(userInfoObj);
        }
    }, []);

    // const userImage = user.image ? `http://localhost:3003/${user.image}` : profile
    // console.log(userImage);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-md flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Online Teaching Platform</h1>
                <NavBarTeacher />
            </header>
            <main className="flex-grow container mx-auto p-8 flex flex-col items-center">
                {userInfo && userInfo.image && (
                    <div className="flex flex-col items-center mb-4">
                        <img
                            // src={user.image}
                            src={`http://localhost:3003/${user.image}`}
                            alt="תמונת מורה"
                            className="w-32 h-32 rounded-full mb-4 shadow-lg object-cover"
                        />
                        <p className="text-xl font-semibold text-gray-800">{userInfo.name}</p>
                    </div>
                )}
                <div className="text-center bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-2xl font-semibold mb-2">שם המורה שהתחבר: {userInfo ? userInfo.name : 'לא נמצאו נתונים'}</p>
                    <p className="text-xl text-gray-700">מדינה: {userInfo ? userInfo.country : 'לא נמצאו נתונים'}</p>
                </div>
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
                &copy; {new Date().getFullYear()} Online Teaching Platform
            </footer>
        </div>
    );
};

export default TeacherPage;








// import React, { useEffect, useState } from "react";
// import NavBarTeacher from "../components/forteacher/NavBarTeacher";


// const TeacherPage = () => {
//     const [userInfo, setUserInfo] = useState(null);

//     useEffect(() => {
//         const userInfoString = localStorage.getItem('userInfo');
//         if (userInfoString) {
//             const userInfoObj = JSON.parse(userInfoString);
//             setUserInfo(userInfoObj);
//         }
//     }, []);

//     return (
//         <div className="min-h-screen flex flex-col bg-gray-100">
//             <header className="bg-black text-white p-4 shadow-md flex justify-between items-center">
//                 <h1 className="text-2xl font-semibold">Online Teaching Platform</h1>
//                 <NavBarTeacher/>
//             </header>
//             <main className="flex-grow container mx-auto p-4 flex justify-center items-center">
//                 {userInfo && userInfo.image && (
//                     <div className="flex flex-col items-center mr-4">
//                         <img 
//                             src={userInfo.image} 
//                             alt="תמונת מורה" 
//                             className="w-32 h-32 rounded-full mb-2 object-cover" 
//                         />
//                         <p className="text-lg font-semibold">{userInfo.name}</p>
//                     </div>
//                 )}
//                 <div className="text-center">
//                     <p className="text-2xl font-semibold">שם המורה שהתחבר: {userInfo ? userInfo.name : 'לא נמצאו נתונים'}</p>
//                     <p className="text-xl text-gray-700">מדינה: {userInfo ? userInfo.country : 'לא נמצאו נתונים'}</p>
//                 </div>
//             </main>
//             <footer className="bg-black text-white p-4 text-center">
//                 &copy; {new Date().getFullYear()} Online Teaching Platform
//             </footer>
//         </div>
//     );
// };

// export default TeacherPage;


// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";


// const TeacherPage = () => {
//     const [userInfo, setUserInfo] = useState(null);

//     useEffect(() => {
//         const userInfoString = localStorage.getItem('userInfo');
//         if (userInfoString) {
//             const userInfoObj = JSON.parse(userInfoString);
//             setUserInfo(userInfoObj);
//         }
//     }, []);

//     return (
//         <div className="min-h-screen flex flex-col bg-gray-100">
//             <header className="bg-black text-white p-4 shadow-md flex justify-between items-center">
//                 <h1 className="text-2xl font-semibold">Online Teaching Platform</h1>
//                 <nav>
//                     <ul className="flex space-x-6">
//                         <li>
//                             <NavLink 
//                                 to="/teacher-page/my-classes" 
//                                 className="text-gold hover:text-gold transition duration-300">
//                                 השיעורים שלי
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink 
//                                 to="/teacher-page/update-availability" 
//                                 className="text-gold hover:text-gold transition duration-300">
//                                 עדכון זמינות
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink 
//                                 to="/teacher-page/edit-profile" 
//                                 className="text-gold hover:text-gold transition duration-300">
//                                 עריכת פרטים אישיים
//                             </NavLink>
//                         </li>
//                     </ul>
//                 </nav>
//             </header>
//             <main className="flex-grow container mx-auto p-4 flex justify-center items-center">
//                 {userInfo && userInfo.image && (
//                     <div className="flex flex-col items-center mr-4">
//                         <img 
//                             src={userInfo.image} 
//                             alt="תמונת מורה" 
//                             className="w-32 h-32 rounded-full mb-2 object-cover" 
//                         />
//                         <p className="text-lg font-semibold">{userInfo.name}</p>
//                     </div>
//                 )}
//                 <div className="text-center">
//                     <p className="text-2xl font-semibold">שם המורה שהתחבר: {userInfo ? userInfo.name : 'לא נמצאו נתונים'}</p>
//                     <p className="text-xl text-gray-700">מדינה: {userInfo ? userInfo.country : 'לא נמצאו נתונים'}</p>
//                 </div>
//             </main>
//             <footer className="bg-black text-white p-4 text-center">
//                 &copy; {new Date().getFullYear()} Online Teaching Platform
//             </footer>
//         </div>
//     );
// };

// export default TeacherPage;
