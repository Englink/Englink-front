import React, {useState, useEffect} from 'react';
import GetAvailabilities from '../data/GetAvailability.jsx';
import setLesson from "../data/PutSetAlesson.jsx";
import './Calendar.css';
import NavBar from "../components/header/NavBar.jsx";
import PaymentModal from "../components/modal/PaymentModal.jsx";

const SetAlessonPage = () => {
    const [availabilities, setAvailabilities] = useState({});
    const [selectedHour, setSelectedHour] = useState(null);
    const [bookedLessons, setBookedLessons] = useState([]);
    const [teacherData, setTeacherData] = useState({});
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

    useEffect(() => {
        async function fetchAvailabilities() {
            try {
                const teacherId = JSON.parse(localStorage.getItem('teacherId'));
                const data = await GetAvailabilities(teacherId);
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
            } catch (error) {
                console.error('Error fetching availabilities:', error);
                setAvailabilities({});
            }
        }

        fetchAvailabilities();
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

    const handleSetLesson = async () => {
        if (!selectedHour) {
            alert('אנא בחר שעה תחילה');
            return;
        }

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
    return (
        <>
            <NavBar/>
            <div className="px-4 md:px-0 md:max-w-3xl md:mx-auto">
                <h1 className="text-6xl font-bold mb-4 text-center text-blue-500 shadow-lg">{teacherData.name}</h1>
                <img className="h-44 w-44 rounded-full mt-20 mx-auto shadow-lg border-2 border-blue-500" src={teacherData.image} alt="User profile"/>
                <h3 className="text-2xl font-bold mb-4 text-center text-blue-500 shadow-lg"> {teacherData.desc}</h3>

                <h1 className="title">לוח זמינות שיעורים</h1>
                <div className="calendar-container mx-auto max-w-lg">
                    <div className="calendar-header flex justify-between">
                        <button onClick={() => handleWeekChange(-1)}>הקודם</button>
                        <h2>{new Date(currentWeek[0]).toLocaleDateString('he-IL')} - {new Date(currentWeek[6]).toLocaleDateString('he-IL')}</h2>
                        <button onClick={() => handleWeekChange(1)}>הבא</button>
                    </div>
                    <div className="calendar-body">
                        <div className="calendar-grid">
                            {currentWeek.map(date => (
                                <div key={date} className="calendar-day">
                                    <div className="day-name">{getDayName(new Date(date))}</div>
                                    <div className="date-header">{new Date(date).toLocaleDateString('he-IL')}</div>
                                    {renderAvailableHours(date)}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="booked-lessons">
                        <h3>שיעורים שנקבעו:</h3>
                        <ul>
                            {bookedLessons.map(({hour, id, date}) => {
                                const formattedDate = new Date(date);
                                if (isNaN(formattedDate)) {
                                    return <li key={id}>השיעור נקבע בהצלחה - {hour}</li>;
                                } else {
                                    return <li key={id}>{`${formattedDate.toLocaleDateString('he-IL')} - ${hour}`}</li>;
                                }
                            })}
                        </ul>
                    </div>
                    <button
                        className="schedule-button"
                        onClick={() => setPaymentModalOpen(true)}
                        disabled={!selectedHour}
                    >
                        לקביעת שיעור
                    </button>
                    <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)}
                                  onPayment={handleSetLesson}/>
                </div>
            </div>
        </>
    );


};

export default SetAlessonPage;
