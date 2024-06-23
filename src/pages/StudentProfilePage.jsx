import { useState, useEffect } from 'react';
import updateUserDetails from "../data/EditUserDetails.jsx";
import NavBar from "../components/header/NavBar.jsx";
import profile from '../images/profile.png';
import editprifilepic from '../images/editprifilepic.jpg';
import Sppiner from "../components/Sppiner.jsx";
import RemoveDialog from "../components/modal/RemoveDialog.jsx";
import deleteStudentUser from "../data/DeleteStudent.jsx";
import { json, useNavigate } from 'react-router-dom';
import DeleteUserImage from '../data/DeleteUserImage.jsx';
import UpdateImage from '../data/UpdateImage.jsx';
import EditImageProfile from '../components/EditImageProfile.jsx';
const ProfilePage = () => {
    
    const navigate = useNavigate();
    
    let user = localStorage.getItem("userInfo");
    useEffect(() => {
        if (user) {
            user = JSON.parse(user);
            setUserImage(user.image ? `http://localhost:3003/${user.image}` : profile);
            if (user.role !== 'student') {
                navigate('/login'); // Use navigate for programmatic navigation
            }
        } else {
            navigate('/login'); // Redirect if user info is not found
        }
    }, []);
    
    const [userImage, setUserImage] = useState(profile);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        currentPassword: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                currentPassword: '',
                password: ''
            });
        }
    }, []);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const handleSubmit = async () => {
        setLoading(true);
        
        if (formData.password && formData.password !== formData.currentPassword) {
            alert("הסיסמאות אינן זהות");
            setLoading(false);
            return;
        }
        
        const dataToSend = { ...formData };
        delete dataToSend.currentPassword;
        
        try {
            console.log(dataToSend)
            const updatedData = await updateUserDetails(dataToSend);
            alert("פרטיך עודכנו בהצלחה");
            localStorage.setItem('userInfo', JSON.stringify(updatedData.updatedStudent));
            user = localStorage.getItem("userInfo");
            user = JSON.parse(user);
            
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const handleDeleteImage = async () => {
        
        const success = await DeleteUserImage();
        user =  JSON.parse(user);
        console.log(user)
        if (success && user.image) {
            console.log(userImage)
            user.image = ''
            localStorage.setItem('userInfo', JSON.stringify(user));
            setUserImage(profile)
        }
    };
    const handleFileChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0]
        if(!file)
            return

        const response = await UpdateImage(file);
        user = JSON.parse(user)

        if (response.status === 200) {
            user.image = response.data.imagePath
            localStorage.setItem('userInfo', JSON.stringify(user));
            setUserImage(`http://localhost:3003/${response.data.imagePath}`)
        }
    };
            


    
    return (
        <>
            <Sppiner loading={loading} />
            <NavBar />
            <div className="fixed inset-y-0 left-0 w-1/3 bg-cover bg-center opacity-20 z-negative" style={{ backgroundImage: `url(${editprifilepic})` }}></div>
            <div className="min-h-screen from-blue-600 via-blue-400 to-blue-300 p-8">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col items-center justify-center mb-8">
                        <div className="text-center mb-6 animate-pulse">
                            <h1 className="text-5xl font-extrabold transition-all duration-500 ease-in-out transform hover:scale-110">פרופיל אישי</h1>
                            <h3 className="text-3xl font-semibold transition-all duration-500 ease-in-out transform hover:scale-110">ברוכים הבאים {user.name}!</h3>
                        </div>
                        <EditImageProfile userImage={userImage} handleDeleteImage={handleDeleteImage} handleFileChange={handleFileChange}/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
                            <h4 className="text-lg font-semibold mb-4 text-purple">פרטים אישיים</h4>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">שם פרטי</label>
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
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">אימייל</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">מספר טלפון</label>
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
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-1">
                            <h4 className="text-lg font-semibold mb-4 text-purple">שינוי סיסמה</h4>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">סיסמה חדשה</label>
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
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">הזן שנית סיסמה חדשה</label>
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
                                        className="font-bold text-sm text-blue-500 hover:text-blue-700 mt-2 bg-white border border-blue-500 hover:border-blue-700 rounded-lg py-2 px-4 shadow-sm transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
                            className="relative inline-flex items-center px-12 py-5 overflow-hidden text-lg font-bold text-but rounded-3xl group purple shadow-lg border-4 border-but"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br but rounded-3xl blur opacity-75 group-hover:opacity-100 group-hover:blur transition duration-500 group-hover:duration-200 animate-tilt"></span>
                            <span className="relative">שלח</span>
                        </button>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button
                        onClick={handleDialogOpen}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-110 hover:shadow-lg"
                    >
                        הסר חשבון
                    </button>
                    <RemoveDialog
                        open={dialogOpen}
                        onClose={handleDialogClose}
                        onConfirm={() => deleteStudentUser().then(() => {
                            localStorage.removeItem('userInfo');
                            window.location.replace('/login');
                        })}
                    />
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
