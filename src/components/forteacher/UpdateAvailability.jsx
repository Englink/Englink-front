import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './upda.css';
import Sppiner from "../Sppiner.jsx";

const UpdateAvailability = () => {
    const [dates, setDates] = useState([]);
    const [occupiedDates, setOccupiedDates] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [occupiedTimes, setOccupiedTimes] = useState([]);
    const [action, setAction] = useState(null); // 'add' or 'remove'
    const [loading, setLoading] = useState(false);


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
                    const availabilities = response.data.teacherAvailability;
                    const occupied = {};
                    availabilities.forEach(availability => {
                        const date = new Date(availability.date);
                        const dateString = date.toLocaleDateString();
                        const timeString = formatTime(date.getHours(), date.getMinutes());
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


    const formatTime = (hour, minute = 0) => {
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    };

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
                    return {
                        ...d,
                        times: [...new Set([...d.times, ...formattedDate.times])]
                    };
                }
                return d;
            })
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
            setLoading(true);
            if (action === 'add') {
                for (const dateObj of dates) {
                    for (const time of dateObj.times) {
                        const [hour, minute] = time.split(':');
                        const [day, month, year] = dateObj.date.split('.')
                        const response = await axios.post('http://localhost:3003/api/teachers/update-availability', {
                            date: {
                                year: year,
                                month: month,
                                day: day,
                                hour: hour,
                                minute: minute
                            }
                        }, { withCredentials: true });
                        console.log('Availability updated successfully for date and time:', dateObj.date, time, response.data);
                    }
                }
            } else if (action === 'remove') {
                const datess = []
                for (const dateObj of dates) {
                    const timeInDays = dateObj.times.map((time) => {
                        const [day, month, year] = dateObj.date.split('.')
                        const [hour, minute] = time.split(':');
                        const dateToDelete = new Date(year, month - 1, day, hour, minute)
                        return dateToDelete
                    })
                    datess.push(...timeInDays)
                }
                
                const response = await axios.post('http://localhost:3003/api/teachers/cancele-availability', {
                    datess
                }, { withCredentials: true });
                console.log('Availability updated successfully for dates and times:', response.data);
            }
            
            setDates([]);
            setSelectedDate(new Date());
            setSelectedTimes([]);
            setShowTimePicker(false);
            setAction(null);
            
            alert('המערכת התעדכנה בהצלחה');
        } catch (error) {
            console.error('Error updating availability:', error);
        } finally {
            setLoading(false);
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
    }

    return (
        <div className="bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen py-8">
            <Sppiner loading={loading} />
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
                                        id={`time-${formatTime(hour, 0)}`}
                                        value={formatTime(hour, 0)}
                                        checked={selectedTimes.includes(formatTime(hour, 0))}
                                        onChange={() => handleTimeChange(formatTime(hour, 0))}
                                        className={`mr-2 ${occupiedTimes.includes(formatTime(hour, 0)) ? 'bg-red-500' : ''}`}
                                    />
                                
                                    <label
                                        htmlFor={`time-${formatTime(hour, 0)}`}
                                        className={`mr-4 ${occupiedTimes.includes(formatTime(hour, 0)) ? 'text-red-500' : ''}`}
                                    >
                                        {formatTime(hour, 0)}
                                    </label>
                                    
                                    <input
                                        type="checkbox"
                                        id={`time-${formatTime(hour, 30)}`}
                                        value={formatTime(hour, 30)}
                                        checked={selectedTimes.includes(formatTime(hour, 30))}
                                        onChange={() => handleTimeChange(formatTime(hour, 30))}
                                        className={`mr-2 ${occupiedTimes.includes(formatTime(hour, 30)) ? 'bg-red-500' : ''}`}
                                    />
                                    <label
                                        htmlFor={`time-${formatTime(hour, 30)}`}
                                        className={`mr-4 ${occupiedTimes.includes(formatTime(hour, 30)) ? 'text-red-500' : ''}`}
                                    >
                                        {formatTime(hour, 30)}
                                    </label>
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


