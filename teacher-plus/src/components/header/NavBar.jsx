import React, { useState } from 'react';
import SignupTeachersModal from "../modal/SignupTeachersModal.jsx";

const SlideNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className=" top-0 left-0 right-0 z-50 bg-gray-800 text-white px-10 mt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a href="#" className="text-white font-bold text-xl">
                            ClassMeat
                        </a>
                    </div>

                    <div className="hidden md:block">
                        <div className="mr-10 flex items-baseline space-x-4 space-x-reverse">
                            <SignupTeachersModal/>


                            <a
                                href="#"
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                השיעורים שלי
                            </a>
                            <a
                                href="#"
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                פרופיל
                            </a>
                            <a
                                href="#"
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                בית
                            </a>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                                התחברות
                            </button>
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
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
            </div>

            <div
                className={`md:hidden fixed top-16 right-0 z-40 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
                } direction-rtl`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-b-lg text-right">
                    <a
                        href="#"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium rtl"
                    >
                        בית
                    </a>
                    <a
                        href="#"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium rtl"
                    >
                        פרופיל
                    </a>
                    <a
                        href="#"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium rtl"
                    >
                        השיעורים שלי
                    </a>
                    {/*מודל קופץ שבניתי בנפרד עם הפונקציה שלי*/}
                    <SignupTeachersModal/>
                </div>
            </div>
        </nav>
    );
};

export default SlideNavbar;