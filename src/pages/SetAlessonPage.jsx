import React, {useState, useEffect} from 'react';
import GetAvailabilities from '../data/GetAvailability.jsx';
import setLesson from "../data/PutSetAlesson.jsx";
import './Calendar.css';
import NavBar from "../components/header/NavBar.jsx";
import PaymentModal from "../components/modal/PaymentModal.jsx";
import Sppiner from "../components/Sppiner.jsx";
import GetReviews from "../data/GetReviews.jsx";
import profile from "../images/profile.png";
import StarRating from "../components/AvgRating.jsx";
import GetTeacherById from "../data/GetOneTheacher.jsx";
import { useNavigate } from 'react-router-dom'
import StudentsReviews from '../components/StudentsReviews';


const SetAlessonPage = () => {

    const [loading, setLoading] = useState(false);
    const [availabilities, setAvailabilities] = useState({});
    const [selectedHour, setSelectedHour] = useState(null);
    const [bookedLessons, setBookedLessons] = useState([]);
    const [teacherData, setTeacherData] = useState({});
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
    const [reviews, setReviews] = useState([])
    const [teacherditals, setTeacherditals] = useState([])
    const navigate = useNavigate();
    let user = localStorage.getItem("userInfo");

    useEffect(() => {
        if (user)
            {
                user = JSON.parse(user);
                if(user.role !== 'student')
                    navigate('/login'); // Use navigate for programmatic navigation
            }




    

        async function fetchAvailabilities() {
            setLoading(true)
            try {
                const teacherId = JSON.parse(localStorage.getItem('teacherId'));
                const teacherditals = await GetTeacherById(teacherId);
                setTeacherditals(teacherditals);

                const data = await GetAvailabilities(teacherId);
                setTeacherData(data[0].teacherDetails);
                const review = await GetReviews(teacherId);


                setReviews(review);
                console.log(data[0].teacherDetails)


                if (data && data.length > 0) {
                    const formattedData = data.reduce((acc, item) => {
                        const date = new Date(item.date).toISOString().split('T')[0];
                        const hour = new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

                        if (!acc[date]) {
                            acc[date] = [];
                        }
                        acc[date].push({hour, id: item._id});
                        return acc;
                    }, {});

                    setAvailabilities(formattedData);
                } else {
                    setAvailabilities({});
                }
            } catch {

                console.log('error from get availabilities')
                setAvailabilities({});
            } finally {
                setLoading(false)
            }
        }


        fetchAvailabilities();
    }, []);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const teacherId = JSON.parse(localStorage.getItem('teacherId'));
                if (teacherId) {
                    const reviewsData = await GetReviews(teacherId);
                    setReviews(reviewsData);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        }

        fetchReviews();
    }, [teacherData]);


    function getCurrentWeek() {
        const now = new Date();
        const startOfWeek = now.getDate() - now.getDay();
        const startDate = new Date(now.setDate(startOfWeek));
        const week = [];


        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            week.push(date.toISOString().split('T')[0]);
        }

        return week;
    }


    // console.log(reviews)


    const handleSetLesson = async () => {
        if (!selectedHour) {
            alert('אנא בחר שעה תחילה');
            return;
        }

        setLoading(true); // מפעיל את הספינר
        try {
            const response = await setLesson(selectedHour);
            if (response.status === 200) {
                alert('שיעור הוגדר בהצלחה!');
                const selectedLesson = Object.values(availabilities).flatMap(hours => hours).find(({id}) => id === selectedHour);
                setBookedLessons([...bookedLessons, selectedLesson]);
                setSelectedHour(null);
                const updatedAvailabilities = Object.fromEntries(
                    Object.entries(availabilities).map(([date, hours]) => [
                        date,
                        hours.filter(({id}) => id !== selectedHour)
                    ])
                );
                setAvailabilities(updatedAvailabilities);
                setPaymentModalOpen(false);
            } else {
                alert('שגיאה בהגדרת השיעור');
            }
        } catch (error) {
            console.error('שגיאה:', error);
            alert('שגיאה בחיבור לשרת');
        } finally {
            setLoading(false)
        }
    };

    const handleHourClick = (hour) => {
        setSelectedHour(hour.id);
    };

    const handleWeekChange = (delta) => {
        const newDate = new Date(currentWeek[0]);
        newDate.setDate(newDate.getDate() + (delta * 7));
        setCurrentWeek(getWeekFromDate(newDate));
    };

    function getWeekFromDate(date) {
        const startOfWeek = date.getDate() - date.getDay();
        const startDate = new Date(date.setDate(startOfWeek));
        const week = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            week.push(date.toISOString().split('T')[0]);
        }

        return week;
    }

    function getDayName(date) {
        const days = ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי', 'יום שבת'];
        return days[date.getDay()];
    }

    const renderAvailableHours = (date) => {
        const hours = availabilities[date] || [];
        return (
            <div className="available-hours">
                {hours.length > 0 ? (
                    hours.map(({hour, id}) => (
                        <button
                            key={id}
                            className={selectedHour === id ? 'selected-hour' : ''}
                            onClick={() => handleHourClick({hour, id})}
                        >
                            {hour}
                        </button>
                    ))
                ) : (
                    <p className="disabled-hours">אין שעות זמינות</p>
                )}
            </div>
        );
    };

    const renderReviews = () => {
        if (!reviews) {
            return null;
        }
    
        return (
            <div className="flex justify-between items-center mt-20 rounded-lg p-4 w-full">
                <div className="flex-grow border-2 p-4 rounded-lg bg-white">
                    <h1 className="text-xl font-bold text-blue-500 border-b-2 border-blue-500 pb-2 mb-4 text-center">פידבקים על מורה:</h1>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">תמונה</th>
                                <th className="px-4 py-2">תלמיד</th>
                                <th className="px-4 py-2">תאריך</th>
                                <th className="px-4 py-2">תגובה</th>
                                <th className="px-4 py-2">דירוג</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, index) => {
                                const studentImage = review.studentId.image ? `http://localhost:3003/${review.studentId.image}` : profile;
    
                                return (
                                    <React.Fragment key={review._id}>
                                        <tr>
                                            <td className="border-r border-gray-300 px-4 py-2">
                                                <img src={studentImage} alt={review.studentId.name} className="h-12 w-12 rounded-full object-cover" />
                                            </td>
                                            <td className="border-r border-gray-300 px-4 py-2">{review.studentId.name}</td>
                                            <td className="border-r border-gray-300 px-4 py-2">{new Date(review.commentDate).toLocaleDateString('he-IL')}</td>
                                            <td className="border-r border-gray-300 px-4 py-2">{review.comment}</td>
                                            <td className="px-4 py-2">
                                                <div className="flex items-center">
                                                    <span className="mr-1">{review.stars}</span>
                                                    <svg className="h-5 w-5 fill-current text-yellow-500" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                    </svg>
                                                </div>
                                            </td>
                                        </tr>
                                        {index !== reviews.length - 1 && (
                                            <tr>
                                                <td colSpan="5" className="border-b border-gray-300 py-2"></td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
    
    return (
        <>
        <Sppiner loading={loading}/>
        <NavBar/>
        <div className="px-4 md:px-0 md:max-w-3xl md:mx-auto">
            <h1 className="text-6xl font-bold mt-8 text-center text-hnav">{teacherData.name}</h1>
            <h1 className="text-1xl font-bold mt-8 text-center text-hnav">{teacherData.email}</h1>
            {/*{console.log(teacherData.image)}*/}
<img className="h-44 w-44 rounded-full mt-5 mx-auto border-2 border-purple object-cover"
     src={teacherditals.image ? `http://localhost:3003/${teacherditals.image}` : profile} alt={profile}/>
            <div className='mt-5 mb-5'>
                <p className='text-center'>דירוג ממוצע</p>
                {teacherditals._id&&<StarRating teacherId={teacherditals._id} />}
                </div>
            <div>

                <p className='text-center'>מחיר לשיעור: {teacherditals.price} ש"ח</p>
            </div>
            <p className='text-center font-bold'>קצת עלי: </p>
            <h3 className="text-lg font-medium mb-2 text-center text-purple bg-gray-200 p-2 rounded-lg">
                {teacherditals.desc}
            </h3>

            <h1 className="text-4xl font-bold mb-4 mt-10 text-center text-hnav">לוח זמינות שיעורים</h1>
            <div className="calendar-container mx-auto max-w-lg bg-but rounded-lg p-4">
                <p className='text-center font-bold mt-5 underline  '>טווח תאריכים שבועי</p>
                <div className=" calendar-header flex justify-between items-center border-b-2 border-purple pb-2 mb-4">
                    <button className="hnav-button text-white rounded-lg px-2 py-1"
                            onClick={() => handleWeekChange(-1)}>הקודם
                    </button>
                    <h2 className="bg-purple text-xl font-bold text-hnav-button">{new Date(currentWeek[0]).toLocaleDateString('he-IL')} - {new Date(currentWeek[6]).toLocaleDateString('he-IL')}</h2>
                    <button className="hnav-button text-white rounded-lg px-2 py-1"
                            onClick={() => handleWeekChange(1)}>הבא
                    </button>
                </div>
                <div className="calendar-body">
                    <div className="calendar-grid grid grid-cols-7 gap-4">
                        {currentWeek.map(date => (
                            <div key={date} className="calendar-day border border-hnav rounded-lg p-2">
                                <div
                                    className="day-name text-sm font-bold text-purple">{getDayName(new Date(date))}</div>

                                <div
                                    className="date-header text-xs text-gray-500 mb-2">{new Date(date).toLocaleDateString('he-IL')}</div>
                                {renderAvailableHours(date)}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="booked-lessons mt-4 border-hnav ">
                    <h3 className="text-lg font-bold mb-2 text-hnav">שיעורים שנקבעו:</h3>
                    <ul className="list-disc list-inside">
                        {bookedLessons.map(({hour, id, date}) => {
                            const formattedDate = new Date(date);
                            if (isNaN(formattedDate)) {
                                return <li key={id} className="text-sm text-gray-700">השיעור נקבע בהצלחה - {hour}</li>;
                            } else {
                                return <li key={id}
                                           className="text-sm text-gray-700">{`${formattedDate.toLocaleDateString('he-IL')} - ${hour}`}</li>;
                            }
                        })}
                    </ul>
                </div>
                <button
                    className="schedule-button bg-hnav text-white rounded-lg px-4 py-2 mt-4 block mx-auto"
                    onClick={() => setPaymentModalOpen(true)}
                    disabled={!selectedHour}
                >
                    לקביעת שיעור
                </button>
                <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)}
                              onPayment={handleSetLesson}/>

                <StudentsReviews reviews={reviews} />

            </div>
        </div>
    </>
);
}

export default SetAlessonPage;