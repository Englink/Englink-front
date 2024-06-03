import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './upda.css';

const UpdateAvailability = () => {
    const [dates, setDates] = useState([]);
    const [occupiedDates, setOccupiedDates] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [occupiedTimes, setOccupiedTimes] = useState([]);
    const [action, setAction] = useState(null); // 'add' or 'remove'

    useEffect(() => {
        const fetchOccupiedDates = async () => {
            try {
                const userInfoString = localStorage.getItem('userInfo');
                let userInfoObj = null;
                if (userInfoString) {
                    userInfoObj = JSON.parse(userInfoString);
                }

                const response = await axios.get(`http://localhost:3003/api/teachers/get-teacher-availability/${userInfoObj._id}`, { withCredentials: true });
                if (response.data.status === 'success') {
                    const lessons = response.data.teacherAvailability;
                    const occupied = {};
                    lessons.forEach(lesson => {
                        const date = new Date(lesson.date);
                        const dateString = date.toLocaleDateString();
                        const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        if (!occupied[dateString]) {
                            occupied[dateString] = [];
                        }
                        occupied[dateString].push(timeString);
                    });
                    setOccupiedDates(occupied);
                }
            } catch (error) {
                console.error('Error fetching occupied dates:', error);
            }
        };

        fetchOccupiedDates();
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const dateString = date.toLocaleDateString();
        setOccupiedTimes(occupiedDates[dateString] || []);
        setShowTimePicker(true);
    };

    const handleAddDateTime = () => {
        setAction('add');
        const formattedDate = {
            date: selectedDate.toLocaleDateString(),
            times: selectedTimes
        };

        if (!dates.some(d => d.date === formattedDate.date)) {
            setDates([...dates, formattedDate]);
        } else {
            const updatedDates = dates.map(d => {
                if (d.date === formattedDate.date) {
                    return {
                        ...d,
                        times: [...new Set([...d.times, ...formattedDate.times])]
                    };
                }
                return d;
            });
            setDates(updatedDates);
        }
        setSelectedTimes([]);
        setShowTimePicker(false);
    };

    const handleRemoveDateTime = () => {
        setAction('remove');
        const formattedDate = {
            date: selectedDate.toLocaleDateString(),
            times: selectedTimes
        };

        if (!dates.some(d => d.date === formattedDate.date)) {
            setDates([...dates, formattedDate]);
        } else {
            const updatedDates = dates.map(d => {
                if (d.date === formattedDate.date) {
                    const newTimes = d.times.filter(t => !formattedDate.times.includes(t));
                    return {
                        ...d,
                        times: newTimes
                    };
                }
                return d;
            }).filter(d => d.times.length > 0);
            setDates(updatedDates);
        }
        setSelectedTimes([]);
        setShowTimePicker(false);
    };

    const handleTimeChange = (time) => {
        if (!selectedTimes.includes(time)) {
            setSelectedTimes([...selectedTimes, time]);
        } else {
            setSelectedTimes(selectedTimes.filter(t => t !== time));
        }
    };

    const handleSubmit = async () => {
        try {
            if (action === 'add') {
                for (const date of dates) {
                    for (const time of date.times) {
                        const [hour, minute] = time.split(':');
                        const response = await axios.post('http://localhost:3003/api/teachers/update-availability', {
                            date: {
                                year: selectedDate.getFullYear(),
                                month: selectedDate.getMonth() + 1,
                                day: selectedDate.getDate(),
                                hour: parseInt(hour, 10),
                                minute: parseInt(minute, 10)
                            }
                        }, { withCredentials: true });
                        console.log('Availability updated successfully for date and time:', date.date, time, response.data);
                    }
                }
            } else if (action === 'remove') {
                for (const date of dates) {
                    const timesToDelete = date.times.map(time => {
                        const [hour, minute] = time.split(':');
                        return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), parseInt(hour, 10), parseInt(minute, 10)).toISOString();
                    });

                    const userInfoString = localStorage.getItem('userInfo');
                    let userInfoObj = null;
                    if (userInfoString) {
                        userInfoObj = JSON.parse(userInfoString);
                    }

                    await axios.delete('http://localhost:3003/api/teachers/cancele-availability', {
                        data: { dates: timesToDelete, teacherId: userInfoObj._id },
                        withCredentials: true
                    });

                    console.log('Availability cancelled successfully for dates:', timesToDelete);
                }
            }

            setDates([]);
            setSelectedDate(new Date());
            setSelectedTimes([]);
            setShowTimePicker(false);
            setAction(null);
        } catch (error) {
            console.error('Error updating availability:', error);
        }
    };

    const handleCancelSelection = (index) => {
        const newDates = dates.filter((_, i) => i !== index);
        setDates(newDates);
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toLocaleDateString();
            if (occupiedDates[dateString]) {
                const lessonCount = occupiedDates[dateString].length;
                return `occupied-date occupied-date-${Math.min(lessonCount, 10)}`;
            }
            if (dates.some(d => new Date(d.date).getTime() === date.getTime())) {
                return 'selected-date';
            }
        }
        return null;
    };

    return (
        <div className="bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen py-8">
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">עדכון זמינות</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="datePicker">
                        בחר תאריך:
                    </label>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        tileClassName={tileClassName}
                        className="shadow-lg rounded-lg"
                    />
                </div>
                {showTimePicker && (
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">בחר שעות:</label>
                        {occupiedTimes.length > 0 && (
                            <div className="mb-4">
                                <h2 className="text-gray-700 text-sm font-bold mb-2">שעות תפוסות:</h2>
                                <div className="flex flex-wrap gap-2">
                                    {occupiedTimes.map((time, index) => (
                                        <span key={index} className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">{time}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            {[...Array(24).keys()].map(hour => (
                                <div key={hour} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`time-${hour}:00`}
                                        value={`${hour}:00`}
                                        checked={selectedTimes.includes(`${hour}:00`)}
                                        onChange={() => handleTimeChange(`${hour}:00`)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`time-${hour}:00`} className="mr-4">{`${hour}:00`}</label>
                                    <input
                                        type="checkbox"
                                        id={`time-${hour}:30`}
                                        value={`${hour}:30`}
                                        checked={selectedTimes.includes(`${hour}:30`)}
                                        onChange={() => handleTimeChange(`${hour}:30`)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`time-${hour}:30`} className="mr-4">{`${hour}:30`}</label>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleAddDateTime}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                עדכן כזמין
                            </button>
                            <button
                                onClick={handleRemoveDateTime}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                בטל זמינות
                            </button>
                        </div>
                    </div>
                )}
                <div className="mt-4">
                    {dates.map((date, index) => (
                        <div key={index} className="flex items-center justify-between mb-2">
                            <p>{date.date}: {date.times.join(', ')}</p>
                            <button
                                onClick={() => handleCancelSelection(index)}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                בטל
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    עדכן זמינות
                </button>
            </div>
        </div>
    );
};

export default UpdateAvailability;

