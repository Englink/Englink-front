import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBarTeacher from './NavBarTeacher';

const MyClasses = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get('http://localhost:3003/api/teachers/get-teacher-lessons', { withCredentials: true });
                
                console.log(response.data.lessons);
                setLessons(response.data.lessons);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching lessons:', error);
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    const cancelLesson = async (lessonId) => {
        try {
            const response = await axios.delete(`http://localhost:3003/api/students/cancele-lesson/${lessonId}`, { withCredentials: true })
            if (response.data.status === 'success') {
                setLessons(prevLessons => prevLessons.filter(lesson => lesson._id !== lessonId));
                console.log('Lesson canceled successfully');
            } else {
                console.log('Failed to cancel lesson:', response.data.message);
            }
        } catch (error) {
            console.error('Error canceling lesson:', error);
        }
    };

    const filteredLessons = lessons.filter(lesson =>
        lesson.studentDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // const userImage = user.image ? `http://localhost:3003/${user.image}` : profile

    return (
        <div className="max-w-4xl mx-auto py-8">
            <NavBarTeacher />
            <h1 className="text-4xl font-bold mb-8 text-center">השיעורים שלי</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="חיפוש לפי שם התלמיד"
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            {loading ? (
                <p className="text-center">טוען...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredLessons.map(lesson => (
                        <div key={lesson._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                            <img src={`http://localhost:3003/${lesson.studentDetails.image}`} alt={lesson.studentDetails.name} className="w-full h-48 object-cover rounded-t-lg" />
                            <div className="p-4 text-center">
                                <h2 className="text-2xl font-semibold mb-2">{lesson.name}</h2>
                                <p className="mb-2 text-gray-700">תיאור: שיעור אנגלית</p>
                                <p className="mb-2 text-gray-700">תאריך: {new Date(lesson.date).toLocaleDateString()}</p>
                                <p className="mb-2 text-gray-700">שעה: {new Date(lesson.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                                <p className="mb-2 text-gray-700">אורך השיעור : 30 דקות</p>
                                <p className="mb-2 text-gray-700">שם התלמיד: {lesson.studentDetails.name}</p>
                                <button className="mb-2 bg-blue-200 p-2 rounded-md" onClick={() => cancelLesson(lesson._id)}>ביטול השיעור</button>
                            </div>                                                   
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyClasses;






// מןחק את כל השיעורים 
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import NavBarTeacher from './NavBarTeacher';

// const MyClasses = () => {
//     const [lessons, setLessons] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         const fetchLessons = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3003/api/teachers/get-teacher-lessons', { withCredentials: true });
//                 console.log(response.data.lessons);
//                 setLessons(response.data.lessons);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching lessons:', error);
//                 setLoading(false);
//             }
//         };

//         fetchLessons();
//     }, []);

//     const canceleClass = async (lessonId) => {
//         try {
//             const response = await axios.delete(`http://localhost:3003/api/students/cancele-lesson/${lessonId}`, { withCredentials: true })
//             if (response.data.status === 'success') {
//                 setLessons(prevLessons => prevLessons.filter(lesson => lesson._id !== lessonId))
//                 console.log('lesson canceled successfuly');
//             } else {
//                 console.log('faild to cancel lesson:' , raspones.data. massage);
//             }
//         } catch (error) {
//             console.error('Error canceling lesson:', error)
//         }}


//     const filteredLessons = lessons.filter(lesson =>
//         lesson.studentDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
        
//         <div className="max-w-4xl mx-auto py-8">
//             <NavBarTeacher/>
//             <h1 className="text-4xl font-bold mb-8 text-center">השיעורים שלי</h1>
//             <div className="mb-4">
//                 <input
//                     type="text"
//                     placeholder="חיפוש לפי שם התלמיד"
//                     className="px-4 py-2 border border-gray-300 rounded-md"
//                     value={searchTerm}
//                     onChange={e => setSearchTerm(e.target.value)}
//                 />
//             </div>
//             {loading ? (
//                 <p className="text-center">טוען...</p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {filteredLessons.map(lesson => (
//                         <div key={lesson._id} className="bg-white rounded-lg overflow-hidden shadow-md">
//                             <img src={lesson.studentDetails.image} alt={lesson.studentDetails.name} className="w-full h-48 object-cover rounded-t-lg" />
//                             <div className="p-4 text-center">
//                                 <h2 className="text-2xl font-semibold mb-2">{lesson.name}</h2>
//                                 <p className="mb-2 text-gray-700">תיאור: שיעור אנגלית</p>
//                                 <p className="mb-2 text-gray-700">תאריך: {new Date(lesson.date).toLocaleDateString()}</p>
//                                 <p className="mb-2 text-gray-700">שעה: {new Date(lesson.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
//                                 <p className="mb-2 text-gray-700">שם התלמיד: {lesson.studentDetails.name}</p>
//                                 <button className="mb-2 bg-blue-200 p-2 rounded-md" onClick={canceleClass(lesson._id)}>ביטול השיעור </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
    
// }    

// export default MyClasses;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import NavBarTeacher from './NavBarTeacher';

// const MyClasses = () => {
//     const [lessons, setLessons] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         const fetchLessons = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3003/api/teachers/get-teacher-lessons', { withCredentials: true });
//                 console.log(response.data.lessons);
//                 setLessons(response.data.lessons);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching lessons:', error);
//                 setLoading(false);
//             }
//         };

//         fetchLessons();
//     }, []);

//     const filteredLessons = lessons.filter(lesson =>
//         lesson.studentDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
        
//         <div className="max-w-4xl mx-auto py-8">
//             <NavBarTeacher/>
//             <h1 className="text-4xl font-bold mb-8 text-center">השיעורים שלי</h1>
//             <div className="mb-4">
//                 <input
//                     type="text"
//                     placeholder="חיפוש לפי שם התלמיד"
//                     className="px-4 py-2 border border-gray-300 rounded-md"
//                     value={searchTerm}
//                     onChange={e => setSearchTerm(e.target.value)}
//                 />
//             </div>
//             {loading ? (
//                 <p className="text-center">טוען...</p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {filteredLessons.map(lesson => (
//                         <div key={lesson._id} className="bg-white rounded-lg overflow-hidden shadow-md">
//                             <img src={lesson.teacherDetails.image} alt={lesson.teacherDetails.name} className="w-full h-48 object-cover rounded-t-lg" />
//                             <div className="p-4 text-center">
//                                 <h2 className="text-2xl font-semibold mb-2">{lesson.name}</h2>
//                                 <p className="mb-2 text-gray-700">תיאור: שיעור אנגלית</p>
//                                 <p className="mb-2 text-gray-700">תאריך: {new Date(lesson.date).toLocaleDateString()}</p>
//                                 <p className="mb-2 text-gray-700">שעה: {new Date(lesson.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
//                                 <p className="mb-2 bg-blue-200 p-2 rounded-md">שם התלמיד: {lesson.studentDetails.name}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
    
// }    

// export default MyClasses;





