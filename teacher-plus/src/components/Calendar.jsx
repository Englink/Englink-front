import React, { useState } from 'react';
import axios from 'axios';

const Calendar = ({ highlightedDates, teacher }) => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const daysShort = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
    const months = [
        'ינואר',
        'פברואר',
        'מרץ',
        'אפריל',
        'מאי',
        'יוני',
        'יולי',
        'אוגוסט',
        'ספטמבר',
        'אוקטובר',
        'נובמבר',
        'דצמבר',
    ];

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
        setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear);
    };

    const handleNextMonth = () => {
        setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
        setCurrentYear(currentMonth === 11 ? currentYear + 1 : currentYear);
    };

    const isHighlighted = (date) => {
        const formattedDate = `${currentYear}-${currentMonth + 1}-${date}`;
        return highlightedDates.includes(formattedDate);
    };

    const isToday = (date) => {
        const today = new Date();
        const currentDate = new Date(currentYear, currentMonth, date);
        return today.toDateString() === currentDate.toDateString();
    };

    const handleDateClick = (date) => {
        const formattedDate = new Date(currentYear, currentMonth, date);
        const dayOfWeek = formattedDate.toLocaleString('en-US', { weekday: 'long' });

        const requestBody = {
            _id: teacher._id,
            availability: [
                ...teacher.availability,
                {
                    date: formattedDate,
                    day: dayOfWeek,
                    slots: [],
                },
            ],
        };

        axios
            .post('http://localhost:3003/api/teachers', requestBody)
            .then((response) => {
                console.log('התאריך נוסף בהצלחה:', response.data);
            })
            .catch((error) => {
                console.error('ארעה שגיאה בהוספת התאריך:', error);
            });
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);

        const calendarDays = [];
        let day = 1;

        // הוספת ריבועים ריקים עבור הימים לפני היום הראשון של החודש
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(
                <div key={`empty-${i}`} className="w-10 h-10 border border-gray-200"></div>
            );
        }

        // הוספת ריבועים עבור כל יום בחודש
        for (let i = 1; i <= daysInMonth; i++) {
            calendarDays.push(
                <div
                    key={`day-${i}`}
                    onClick={() => handleDateClick(i)}
                    className={`w-10 h-10 border border-gray-200 flex items-center justify-center cursor-pointer ${
                        isHighlighted(i) ? 'bg-green-500 text-white' : ''
                    } ${isToday(i) ? 'bg-blue-500 text-white' : ''}`}
                >
                    {i}
                </div>
            );
            day++;
        }

        // הוספת ריבועים ריקים עבור הימים אחרי היום האחרון של החודש
        for (let i = day; i <= 42; i++) {
            calendarDays.push(
                <div key={`empty-${i}`} className="w-10 h-10 border border-gray-200"></div>
            );
        }

        return calendarDays;
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <button
                        onClick={handlePrevMonth}
                        className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        &lt;
                    </button>
                    <h2 className="text-lg font-semibold text-blue-700">
                        {months[currentMonth]} {currentYear}
                    </h2>
                </div>
                <button
                    onClick={handleNextMonth}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    &gt;
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {daysShort.map((day, index) => (
                    <div
                        key={index}
                        className="text-xs font-semibold text-gray-500 text-center"
                    >
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1 mt-2">{renderCalendarDays()}</div>
        </div>
    );
};

export default Calendar;