import React, {useState} from 'react'
import updateUserDetails from '../../data/EditUserDetails.jsx'
import NavBarTeacher from './NavBarTeacher.jsx'
import profile from '../../images/profile.png'
import Spinner from "../Sppiner.jsx"
import RemoveDialog from "../modal/RemoveDialog.jsx";
import deleteStudentUser from "../../data/DeleteStudent.jsx";



const ProfilePage = () => {
    let user = localStorage.getItem("userInfo")
    user = JSON.parse(user);
    console.log(user);

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        desc:'',
        image: '',
        currentPassword: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        setFormData({
            ...formData,
            image: e.target.files[0],
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }


    const handleSubmit = async () => {

        if (formData.password && formData.password !== formData.currentPassword) {
            alert("הסיסמאות אינן זהות");
            return;
        }

        const dataToSend = {...formData};
        delete dataToSend.currentPassword;

        try {
            const updatedData = await updateUserDetails(dataToSend)
            console.log()
            alert("פרטיך עודכנו בהצלחה")

            localStorage.setItem('userInfo', JSON.stringify(updatedData.updatedStudent))
            window.location.reload();
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    };
    console.log(user);
    const userImage = user.image ? `http://localhost:3003/${user.image}` : profile

    return (
        <>
            <Spinner loading={loading}/>

            <NavBarTeacher/>
            <div className="min-h-screen bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300 p-8">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col items-center justify-center mb-8">
                        <div className="text-center mb-6 animate-pulse">
                            <h1 className="text-5xl font-extrabold underline mb-5 transition-all duration-500 ease-in-out transform hover:scale-110">פרופיל
                                אישי</h1>
                            <h2 className="text-3xl font-semibold transition-all duration-500 ease-in-out transform hover:scale-110">ברוכים
                                הבאים, {user.name}!</h2>
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
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        שם פרטי</label>
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
                                    <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                                        קצת על עצמך</label>
                                    <input
                                        type="text"
                                        id="desc"
                                        name="desc"
                                        value={formData.desc}
                                        onChange={handleChange}
                                        placeholder={user.desc}
                                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <label htmlFor="image-upload"
                                           className="block text-sm font-medium text-gray-700 mb-2 ">העלה תמונה</label>
                                    <input type="file" id="image-upload" name="image" onChange={handleFileChange}
                                           className="hidden"/>
                                    <label htmlFor="image-upload"
                                           className="cursor-pointer bg-purple hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                                        בחר תמונה
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h4 className="text-lg font-semibold mb-4 text-blue-800">שינוי סיסמה</h4>
                            <div className="space-y-4 ">
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
                                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 "
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="  font-bold text-sm text-blue-500 hover:text-blue-700 mt-2 bg-but border border-blue-500 hover:border-blue-700 rounded-lg py-2 px-4 shadow-sm transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 "
                                    >
                                        {showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                                    </button>
                                </div>
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
                            localStorage.removeItem('teacherId');
                            window.location.replace('/login');
                        })}
                    />
                </div>

            </div>
        </>
    );
};

export default ProfilePage;


