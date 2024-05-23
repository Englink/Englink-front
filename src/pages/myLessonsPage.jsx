import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SlideNavbar from '../components/header/NavBar';

const MyLessons = () => {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get('http://localhost:3003/api/students/get-student-lessons', { withCredentials: true });
                if (response.data.status === 'success') {
                    setLessons(response.data.lessons);
                } else {
                    console.error('Failed to fetch lessons:', response.data);
                }
            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        };

        fetchLessons();
    }, []);



    const cancelLesson = async (lessonId) => {
        try {
            const response = await axios.delete(`http://localhost:3003/api/students/cancele-lesson/${lessonId}`, { withCredentials: true });
            if (response.data.status === 'success') {
                // Remove the canceled lesson from the list
                setLessons(prevLessons => prevLessons.filter(lesson => lesson._id !== lessonId));
                console.log('Lesson canceled successfully');
            } else {
                console.error('Failed to cancel lesson:', response.data.message);
            }
        } catch (error) {
            console.error('Error canceling lesson:', error);
        }
    };

    return (
        <>
            <SlideNavbar />
            <div className="min-h-screen bg-gray-100">
                <div className="container mx-auto py-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">השיעורים שלי</h1>
                        <p className="text-lg text-gray-600">כאן תוכלו למצוא את כל השיעורים שנקבעו לכם.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessons.map(lesson => {
                            const lessonDate = new Date(lesson.date);
                            const formattedDate = lessonDate.toLocaleDateString('he-IL', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            });
                            const formattedTime = lessonDate.toLocaleTimeString('he-IL', {
                                hour: '2-digit',
                                minute: '2-digit'
                            });

                            return (
                                <div key={lesson._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <img src={lesson.teacherDetails.image} alt={lesson.teacherDetails.name} className="w-21 h-20 rounded-full mr-4" />
                                            <h2 className="text-xl font-semibold text-gray-800">{lesson.teacherDetails.name}</h2>
                                        </div>
                                        <p className="text-gray-600 mb-2">נושא: {lesson.subject || "שיעור פרטי אנגלית"}</p>
                                        <p className="text-gray-600 mb-2">תאריך: {formattedDate}</p>
                                        <p className="text-gray-600 mb-4">שעה: {formattedTime}</p>
                                        <button onClick={() => cancelLesson(lesson._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500">ביטול שיעור</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyLessons;


