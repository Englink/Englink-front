import React, {useState} from 'react';
import SignupTeachersModal from "../modal/SignupTeachersModal.jsx";
import {useNavigate} from "react-router-dom";
import profile from "../../images/profile.png";
import SimpleDialog from "../SimpleDialog.jsx";

const NavBar = () => {



    const [dialogOpen, setDialogOpen] = useState(false);


    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        navigate("/Login");
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    let user = localStorage.getItem("userInfo");
    user = JSON.parse(user);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const userImage = user.image ? `http://localhost:3003/${user.image}` : profile;

    return (
        <nav className="bg-hnav text-but w-full z-50 shadow-md relative py-1 mb-5 m-auto p-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 relative">
                {/* לוגו למסכים קטנים - ממוקם באמצע באמצעות absolute positioning */}
                <div className="flex md:hidden justify-center flex-grow absolute left-1/2 transform -translate-x-1/2">
                    <a href="#" className="text-but font-bold text-xl animate-pulse">
                        Englink
                    </a>
                </div>

                {/* תמונת משתמש ושם משתמש - מוצגים רק במסכים גדולים */}
                <div className="hidden md:flex items-center space-x-4">
                    {user && (
                        <div className="flex items-center space-x-3 ">
                            <span className="text-but text-sm font-medium ml-10">
                                ברוכים הבאים:{user.name}
                            </span>
                            <img
                                src={userImage}
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover border-2"
                            />
                        </div>
                    )}
                </div>

                {/* קישורי ניווט - מוצגים רק במסכים גדולים */}
                <div className="hidden md:flex items-center justify-center flex-grow space-x-6">
                    <a
                        href="/Main"
                        className="text-but hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        בית
                    </a>
                    <a
                        href="/user-profile"
                        className="text-but hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        פרופיל
                    </a>
                    <a
                        href="/myLessons"
                        className="text-but hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        השיעורים שלי
                    </a>
                    <SignupTeachersModal/>
                </div>

                {/* לוגו - מוצג רק במסכים גדולים */}
                <div className="hidden md:flex items-center space-x-10">
                    <a href="#" className="text-white font-bold text-xl animate-pulse ml-10">
                        EngLink
                        <br className='text-white ml-10'/>אנגלית בקליק
                    </a>
                </div>

                {/* כפתור התנתקות - מוצג רק במסכים גדולים */}
                <div className="hidden md:flex">

                    <div className="flex justify-center items-center">
                        <button
                            onClick={handleDialogOpen}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-110 hover:shadow-lg"
                        >
                            התנתק
                        </button>
                        <SimpleDialog
                            open={dialogOpen}
                            onClose={handleDialogClose}
                            onConfirm={handleLogout}
                        />
                    </div>

                </div>

                {/* כפתור תפריט נפתח - מוצג רק במסכים קטנים */}
                <div className="flex md:hidden ml-auto relative">
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                        <span className="sr-only">פתח תפריט ראשי</span>
                        {!isMenuOpen ? (
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* תפריט נפתח - מוצג רק במסכים קטנים */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800 text-white">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a
                            href="/Main"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            בית
                        </a>
                        <a
                            href="/user-profile"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            פרופיל
                        </a>
                        <a
                            href="/myLessons"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            השיעורים שלי
                        </a>
                        <SignupTeachersModal/>
                        <button
                            onClick={() => {
                                localStorage.removeItem("userInfo");
                                navigate("/Login");
                            }}
                            className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded-full transition duration-300 transform hover:scale-110 hover:shadow-lg "
                        >
                            התנתק
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
