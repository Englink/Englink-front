import React, { useState } from 'react';
import Modal from 'react-modal';

function SignupTeachersModal() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        console.log('Closing modal...');
        setModalIsOpen(false);
    };

    return (
        <div>
            <button
                className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => setModalIsOpen(true)}
            >
                הרשמה/התחברות מורה
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                className="fixed inset-0 flex items-center justify-center z-50 outline-none"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white p-8 rounded-lg shadow-xl md:w-1/3 w-5/6 border border-gray-200 z-50">
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
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

                    <div className="mt-8 flex flex-col items-center justify-center">
                        <a
                            href="/login-teachers"
                            onClick={closeModal}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full mb-4 text-center transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            התחבר כמורה
                        </a>
                        <a
                            href="/singup-teachers"
                            onClick={closeModal}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-center transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            הרשם כמורה
                        </a>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default SignupTeachersModal;