import React, {useState} from 'react';
import NavBar from "../components/header/NavBar.jsx";
import EditProfileModal from "../components/modal/EditProfileModal.jsx";
import myImage from '../photos/Loz.png';
import Calendar from "../components/Calendar.jsx";


function StudentProfilePage({ username, profileImageUrl }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        console.log('Closing modal...');
        setModalIsOpen(false);
    };

 const Url = 'https://meshek8.co.il/wp-content/uploads/2021/02/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%A4%D7%A8%D7%95%D7%A4%D7%99%D7%9C_1.jpg';
    return (
        <>

            <NavBar/>
            <div className="py-40 flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="absolute top-0 right-0 mt-4 mr-4">
                    <img className="h-64 w-64 rounded-full" src={Url} alt="User profile"/>
                </div>
                <h1 className="text-4xl font-bold mb-4">{username}</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={() => setModalIsOpen(true)}>
                    עריכת פרטים אישיים
                </button>

                <div className="w-1/2 mx-auto py-10 text-center">
                   < h1 className="text-2xl font-bold mb-4">לוז תאריכים < /h1>
                    <Calendar highlightedDates={["10-10-10"]}/>
                </div>

            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                הסר חשבון
            </button>

                <EditProfileModal isOpen={modalIsOpen} onClose={closeModal}/>
            </div>
            <div>
            </div>
        </>
    );
}

export default StudentProfilePage;