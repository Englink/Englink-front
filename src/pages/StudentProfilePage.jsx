import React, { useState } from 'react';
import updateUserDetails from "../data/EditUserDetails.jsx";
import NavBar from "../components/header/NavBar.jsx";


const ProfilePage = () => {
    let user = localStorage.getItem("userInfo");
    user = JSON.parse(user);

    const [formData, setFormData] = useState({
        userDetails: {
            name: '',
            email: '',
            phone: '',
            image: '',
            currentPassword: '',
            password: ''
        }
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            userDetails: {
                ...prevState.userDetails,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async () => {
        if (formData.userDetails.password && formData.userDetails.password !== formData.userDetails.currentPassword) {
            alert("הסיסמאות אינן זהות");
            return;
        }

        const dataToSend = { ...formData.userDetails };
        delete dataToSend.currentPassword;

        try {
            const updatedData = await updateUserDetails(dataToSend);
            alert("פרטיך עודכנו בהצלחה");
            console.log(updatedData);
            localStorage.setItem('userInfo', JSON.stringify(updatedData.updatedStudent));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <NavBar/>
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <img
                            className="w-24 h-24 rounded-full object-cover"
                            src={formData.userDetails.image || user.image}
                            alt="Profile"
                        />
                        <div>
                            <h2 className="text-4xl font-extrabold text-white">פרופיל אישי</h2>
                            <h3 className="text-2xl font-semibold text-white">ברוכים הבאים, {user.name}!</h3>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h4 className="text-lg font-semibold mb-4">פרטים אישיים</h4>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">שם פרטי</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.userDetails.name}
                                    onChange={handleChange}
                                    placeholder={user.name}
                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">אימייל</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.userDetails.email}
                                    onChange={handleChange}
                                    placeholder={user.email}
                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">מספר טלפון</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.userDetails.phone}
                                    onChange={handleChange}
                                    placeholder={user.phone}
                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL של תמונה</label>
                                <input
                                    type="url"
                                    id="imageUrl"
                                    name="image"
                                    value={formData.userDetails.image}
                                    onChange={handleChange}
                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h4 className="text-lg font-semibold mb-4">שינוי סיסמה</h4>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">סיסמה חדשה</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={formData.userDetails.currentPassword}
                                    onChange={handleChange}
                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">הזן שנית סיסמה חדשה</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.userDetails.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-sm text-blue-500 hover:text-blue-700 mt-2"
                                >
                                    {showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                            >
                                שלח
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ProfilePage;
