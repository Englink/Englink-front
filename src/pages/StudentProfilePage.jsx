import React, {useState} from 'react';
import updateUserDetails from "../data/EditUserDetails.jsx";
import NavBar from "../components/header/NavBar.jsx";
import profile from '../images/profile.png'
import Sppiner from "../components/Sppiner.jsx";


const ProfilePage = () => {
    let user = localStorage.getItem("userInfo");
    user = JSON.parse(user);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        image: '',
        currentPassword: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleFileChange = (e) => {
        console.log( e)
        setFormData({
            ...formData,
            image: e.target.files[0],

        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {

        if (formData.password && formData.password !== formData.currentPassword) {
            alert("הסיסמאות אינן זהות");
            return;
        }

        const dataToSend = {...formData};
        delete dataToSend.currentPassword;

        try {
            const updatedData = await updateUserDetails(dataToSend);
            console.log()
            alert("פרטיך עודכנו בהצלחה");

            localStorage.setItem('userInfo', JSON.stringify(updatedData.updatedStudent));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };
    console.log(user.image)
    const userImage = user.image ? `http://localhost:3003/${user.image}` : profile;

    return (
        <>
            <Sppiner loading={loading}/>

            <NavBar/>
            <div className="min-h-screen bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300 p-8">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col items-center justify-center mb-8">
                        <div className="text-center mb-6 animate-pulse">
                            <h1 className="text-5xl font-extrabold  transition-all duration-500 ease-in-out transform hover:scale-110">פרופיל
                                אישי</h1>
                            <h3 className="text-3xl font-semibold transition-all duration-500 ease-in-out transform hover:scale-110">ברוכים
                                הבאים, {user.name}!</h3>
                        </div>
                        <img
                            className="w-48 h-48 rounded-full object-cover mb-4 shadow-lg border-4 border-blue-500"
                            src={userImage}
                            alt='profile'
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h4 className="text-lg font-semibold mb-4 text-blue-800">פרטים אישיים</h4>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">שם
                                        פרטי</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={user.name}
                                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email"
                                           className="block text-sm font-medium text-gray-700">אימייל</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={user.email}
                                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">מספר
                                        טלפון</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder={user.phone}
                                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">העלה
                                        תמונה</label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleFileChange}
                                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h4 className="text-lg font-semibold mb-4 text-blue-800">שינוי סיסמה</h4>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="currentPassword"
                                           className="block text-sm font-medium text-gray-700">סיסמה חדשה</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="currentPassword"
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">הזן
                                        שנית סיסמה חדשה</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
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
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-center mt-10">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="relative inline-flex items-center px-12 py-5 overflow-hidden text-lg font-bold text-white rounded-3xl group bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg border-4 border-blue-500 bg-opacity-50"
                        >
        <span
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl blur opacity-75 group-hover:opacity-100 group-hover:blur transition duration-500 group-hover:duration-200 animate-tilt"
        ></span>
                            <span className="relative">שלח</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
