import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Cards from 'react-credit-cards-2';
import GetOneTheacher from "../../data/GetOneTheacher.jsx";

const PaymentModal = ({ isOpen, onClose, onPayment }) => {
    const [teacherData, setTeacherData] = useState(null);
    const teacherId = JSON.parse(localStorage.getItem('teacherId'));

    useEffect(() => {
        const fetchTeacherDetails = async () => {
            const data = await GetOneTheacher(teacherId);

            setTeacherData(data);
        };

        fetchTeacherDetails();
    }, [teacherId]);

    const [cardData, setCardData] = useState({
        cvc: '',
        expiry: '',
        name: '',
        number: ''
    });

    const handleInputChange = (e) => {
        setCardData({
            ...cardData,
            [e.target.name]: e.target.value
        });
    };

    const handleInputFocus = (e) => {
        setCardData({
            ...cardData,
            focused: e.target.name
        });
    };

    const handlePayment = () => {
        onPayment();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Credit Card Modal"
            className="fixed inset-0 flex items-center justify-center z-50 outline-none focus:outline-none ml-2 "
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 ">
                <div className="flex justify-between items-center mb-4  ">
                    <h2 className="text-xl font-semibold">Payment Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 font-bold"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <Cards
                    cvc={cardData.cvc}
                    expiry={cardData.expiry}
                    focused={cardData.focused}
                    name={cardData.name}
                    number={cardData.number}
                />
                {teacherData && (
                    <div
                        style={{
                            padding: '10px',
                            margin: '10px 0',
                            backgroundColor: '#f8f8f8',
                            borderRadius: '5px',
                            textAlign: 'center',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#333'
                        }}
                    >
                        סכום לתשלום: {teacherData.price} ש"ח
                    </div>
                )}
                <form className="w-full mt-6">
                    <div className="mb-4">
                        <input
                            type="tel"
                            name="number"
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                            placeholder="Card Number"
                            value={cardData.number}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                            placeholder="Name on Card"
                            value={cardData.name}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                    </div>
                    <div className="mb-4 flex justify-between">
                        <input
                            type="tel"
                            name="expiry"
                            className="w-1/2 mr-2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                            placeholder="MM/YY"
                            value={cardData.expiry}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                        <input
                            type="tel"
                            name="cvc"
                            className="w-1/2 ml-2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                            placeholder="CVC"
                            value={cardData.cvc}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                    </div>
                    <button
                        onClick={handlePayment}
                        className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition"
                    >
                        Pay Now
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default PaymentModal;