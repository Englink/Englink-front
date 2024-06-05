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


const SetAlessonPage = () => {
    const [loading, setLoading] = useState(false);
    const [availabilities, setAvailabilities] = useState({});
    const [selectedHour, setSelectedHour] = useState(null);
    const [bookedLessons, setBookedLessons] = useState([]);
    const [teacherData, setTeacherData] = useState({});
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
    const [reviews, setReviews] = useState([])

    useEffect(() => {

        async function fetchAvailabilities() {
            setLoading(true)
            try {
                const teacherId = JSON.parse(localStorage.getItem('teacherId'));

                const data = await GetAvailabilities(teacherId);

                const review = await GetReviews(teacherId);

                setReviews(review);


                setTeacherData(data[0].teacherDetails);
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
    }, []);


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


    console.log(reviews)


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
            <div className="grid gap-4">
                {reviews.map((review) => {
                    const studentImage = review.studentId.image ? `http://localhost:3003/${review.studentId.image}` : profile;

                    return (
                        <div key={review._id}
                             className="bg-white rounded-lg shadow-md p-4 grid grid-cols-4 gap-4 items-center">
                            <div className="col-span-1 text-gray-500">
                                תמונה: <img src={studentImage} alt={review.studentId.name}
                                            className="h-12 w-12 rounded-full"/>
                            </div>
                            <div className="col-span-1 text-gray-500">תלמיד: {review.studentId.name}</div>
                            <div
                                className="col-span-1 text-gray-500">תאריך: {new Date(review.commentDate).toLocaleDateString('he-IL')}</div>
                            <div className="col-span-2 text-gray-700">{review.comment}</div>
                            <div className="col-span-1 text-yellow-500 flex justify-end items-center">
                                <span className="mr-1">{review.stars}</span>
                                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };


return (
    <>
        <Sppiner loading={loading}/>
        <NavBar/>
        <div className="px-4 md:px-0 md:max-w-3xl md:mx-auto">
            <h1 className="text-6xl font-bold mb-4 text-center text-blue-500">{teacherData.name}</h1>
            <img className="h-44 w-44 rounded-full mt-20 mx-auto border-2 border-blue-500 "
                 src={teacherData.image} alt="User profile"/>
            <div className='mt-5 mb-5'>
                <StarRating teacherId={teacherData._id}/>
            </div>
            <h3 className="text-lg font-medium mb-2 text-center text-blue-400 bg-gray-100 p-2 rounded-lg">
                {teacherData.desc}
            </h3>

            <h1 className="text-4xl font-bold mb-4 text-center text-blue-500">לוח זמינות שיעורים</h1>
            <div className="calendar-container mx-auto max-w-lg bg-white rounded-lg p-4">
                <div className="calendar-header flex justify-between items-center border-b-2 border-blue-500 pb-2 mb-4">
                    <button className="bg-blue-500 text-white rounded-lg px-2 py-1" onClick={() => handleWeekChange(-1)}>הקודם</button>
                    <h2 className="text-xl font-bold text-blue-500">{new Date(currentWeek[0]).toLocaleDateString('he-IL')} - {new Date(currentWeek[6]).toLocaleDateString('he-IL')}</h2>
                    <button className="bg-blue-500 text-white rounded-lg px-2 py-1" onClick={() => handleWeekChange(1)}>הבא</button>
                </div>
                <div className="calendar-body">
                    <div className="calendar-grid grid grid-cols-7 gap-4">
                        {currentWeek.map(date => (
                            <div key={date} className="calendar-day border border-blue-500 rounded-lg p-2">
                                <div className="day-name text-sm font-bold text-blue-500">{getDayName(new Date(date))}</div>
                                <div className="date-header text-xs text-gray-500 mb-2">{new Date(date).toLocaleDateString('he-IL')}</div>
                                {renderAvailableHours(date)}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="booked-lessons mt-4">
                    <h3 className="text-lg font-bold text-blue-500 mb-2">שיעורים שנקבעו:</h3>
                    <ul className="list-disc list-inside">
                        {bookedLessons.map(({hour, id, date}) => {
                            const formattedDate = new Date(date);
                            if (isNaN(formattedDate)) {
                                return <li key={id} className="text-sm text-gray-700">השיעור נקבע בהצלחה - {hour}</li>;
                            } else {
                                return <li key={id} className="text-sm text-gray-700">{`${formattedDate.toLocaleDateString('he-IL')} - ${hour}`}</li>;
                            }
                        })}
                    </ul>
                </div>
                <button
                    className="schedule-button bg-blue-500 text-white rounded-lg px-4 py-2 mt-4 block mx-auto"
                    onClick={() => setPaymentModalOpen(true)}
                    disabled={!selectedHour}
                >
                    לקביעת שיעור
                </button>
                <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)}
                              onPayment={handleSetLesson}/>
                <div className="flex justify-between items-center mt-20 rounded-lg p-4 bg-blue-100">
                    <div className="flex-grow border-2 border-blue-500 p-4 rounded-lg bg-white">
                        <h1 className="text-xl font-bold text-blue-500 border-b-2 border-blue-500 pb-2 mb-4">פידבקים
                            על מורה:</h1>
                        {renderReviews()}
                    </div>
                </div>
            </div>
        </div>
    </>
);
}

export default SetAlessonPage;