import React, {useState, useEffect} from 'react';
import NavBar from "../components/header/NavBar.jsx";
import EditProfileModal from "../components/modal/EditProfileModal.jsx";
import {useParams} from 'react-router-dom';
import getTeacherData from '../data/GetTeacherByID.jsx';
import Calendar from "../components/Calendar.jsx";


function TeacherPage({username, profileImageUrl}) {
    const {id} = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        getTeacherData(id).then(data => setTeacher(data));
    }, [id]);

    const closeModal = () => {
        console.log('Closing modal...');
        setModalIsOpen(false);
    };

    if (!teacher) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavBar/>
            <div className="py-40 flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="absolute top-0 right-0 mt-4 mr-4">
                    <img className="h-64 w-64 rounded-full" src={teacher.image} alt="User profile"/>
                </div>
                <h1 className="text-4xl font-bold mb-4">{teacher.name}</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                        onClick={() => setModalIsOpen(true)}>
                    עריכת פרטים אישיים
                </button>
                <div className="bg-white p-4 rounded shadow-lg w-64">
                    {teacher.email}
                </div>
                <div>
                    <img src={teacher.image} alt="My Image" className="w-1/2 mx-auto py-20"/>
                </div>

                <div>
                    <Calendar highlightedDates={["10-10-10"]}/>
                </div>

                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    הסר חשבון
                </button>
                {/*הכנה לבקשת העריכה ממתין לבק אנד*/}
                <EditProfileModal isOpen={modalIsOpen} onClose={closeModal}/>
            </div>
            <div>
            </div>
        </>
    );
}

export default TeacherPage;