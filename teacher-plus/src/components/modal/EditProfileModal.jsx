import React, { useState } from 'react';

const EditProfileModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        imageUrl: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-xl w-96">
                <div className="flex justify-center items-start p-5 rounded-t border-b text-center"> {/* שימוש ב-justify-center ו-text-center */}
                    <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl justify-center">עריכת פרטים אישיים </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center justify-center" onClick={onClose}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm4-9H6v2h8V9z" clipRule="evenodd"/>
                        </svg>
                    </button>
                </div>
                <div className="p-6 space-y-6">


                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-base text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder="שם פרטי"
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-base text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder="שם משפחה"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-base text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder="הדבר את המייל שלך"
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-base text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder="הזן את מספר הנייד שלך"
                    />
                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-base text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder="URL של תמונה"
                    />
                </div>
                <div className="flex justify-center items-center p-6 space-x-2 rounded-b border-t border-gray-200 text-center"> {/* שימוש ב-justify-center ו-text-center */}
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        שלח
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;