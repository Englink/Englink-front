import Modal from 'react-modal'
import React, { useState } from 'react';

function SignupTeachersModal(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        console.log('Closing modal...');
        setModalIsOpen(false);
    };

    return (
        <div>
            <button className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium rtl' onClick={() => setModalIsOpen(true)}>הרשמה/התחברות מורה</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                className="fixed inset-0 flex items-center justify-center z-50 outline-none"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white p-5 rounded shadow-lg w-1/3 border border-gray-200 z-50">
                    <button type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            onClick={closeModal}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm4-9H6v2h8V9z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4"
                    >
                        התחבר כמורה
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        הרשם כמורה
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default SignupTeachersModal;