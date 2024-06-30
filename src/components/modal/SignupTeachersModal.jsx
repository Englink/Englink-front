import React, {useState} from 'react';
import Modal from 'react-modal';

function SignupTeachersModal() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="flex justify-center">
            <button
                className="relative inline-flex items-center px-4 py-1 overflow-hidden font-bold text-white bg-gradient-to-br from-blue-600 to-blue-800 rounded-full group"
                onClick={() => setModalIsOpen(true)}
            >
                <span
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-but to-purple rounded-full blur opacity-45 group-hover:opacity-100 group-hover:blur transition duration-500 group-hover:duration-200 animate-tilt"></span>
                <span className="relative">הרשמה/התחברות מורה</span>
            </button>

            <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    shouldCloseOnOverlayClick={true}
    className="fixed inset-0 flex items-center justify-center z-50 outline-none"
    overlayClassName="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm"
>
    <div
        className="bg-but bg-opacity-45 rounded-3xl shadow-xl p-8 md:w-1/3 w-5/6  z-50 animate-modal relative">
        <button
            type="button"
            className="absolute top-5 left-4 bg-white text-red-500 hover:text-red-900 focus:outline-none transition-colors duration-300 p-2 rounded-full"
            onClick={closeModal}
        >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M10 10.707l4.646 4.647 1.414-1.414L11.414 10l4.646-4.646-1.414-1.414L10 8.586 5.354 3.939 3.94 5.354 8.586 10l-4.646 4.646 1.414 1.414L10 10.707z"
                    clipRule="evenodd"
                />
            </svg>
        </button>

        <div className="mt-6 flex flex-col items-center justify-between">
            <a
                href="/signup-teachers"
                onClick={closeModal}
                className="relative inline-flex items-center px-8 py-3 overflow-hidden font-bold text-white bg-gradient-to-br from-hnav to-but rounded-full group mb-4"
            >
                <span
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-hnav to-but rounded-full blur group-hover:opacity-100 group-hover:blur transition duration-500 group-hover:duration-200 animate-tilt"></span>
                <span className="relative">הירשם כמורה</span>
            </a>
            <a
                href="/login-teachers"
                onClick={closeModal}
                className="relative inline-flex items-center px-8 py-3 overflow-hidden font-bold text-white bg-gradient-to-br from-blue-600 to-blue-800 rounded-full group mb-4"
            >
                <span
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple to-but rounded-full blur group-hover:opacity-100 group-hover:blur transition duration-500 group-hover:duration-200 animate-tilt"></span>
                <span className="relative">התחבר כמורה</span>
            </a>
        </div>
    </div>
</Modal>


{/* 
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                className="fixed inset-0 flex items-center justify-center z-50 outline-none"
                overlayClassName="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
            >
                <div
                    className="bg-but rounded-2xl shadow-xl p-8 md:w-1/3 w-5/6 border border-gray-200 z-75 animate-modal">
                    <button
                        type="button"
                        className="sticky top-5 left-4 text-purple hover:text-gray-600 focus:outline-none transition-colors duration-300 px-4 py-2 text-lg rounded bg-but hover:bg-red-300"
                        onClick={closeModal}
                    >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm4-9H6v2h8V9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    <div className=" mt-6 flex flex-col-4 items-center justify-between">
                        <a
                            href="/signup-teachers"
                            onClick={closeModal}
                            className="relative inline-flex items-center px-8 py-3 overflow-hidden font-bold text-white bg-gradient-to-br from-hnav to-but rounded-full group mb-4"
                        >
                            <span
                                className="absolute inset-0 w-full h-full bg-gradient-to-br from-hnav to-but rounded-full blur opacity-75 group-hover:opacity-100 group-hover:blur transition duration-500 group-hover:duration-200 animate-tilt"></span>
                            <span className="relative">הירשם כמורה</span>
                        </a>
                        <a
                            href="/login-teachers"
                            onClick={closeModal}
                            className="relative inline-flex items-center px-8 py-3 overflow-hidden font-bold text-white bg-gradient-to-br from-blue-600 to-blue-800 rounded-full group mb-4"
                        >
                            <span
                                className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple to-but rounded-full blur opacity-85 group-hover:opacity-100 group-hover:blur transition duration-500 group-hover:duration-200 animate-tilt"></span>
                            <span className="relative">התחבר כמורה</span>
                        </a>
                    </div>
                </div>
            </Modal> */}
        </div>
    );
}

export default SignupTeachersModal;