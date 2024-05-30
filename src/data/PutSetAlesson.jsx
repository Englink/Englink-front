import axios from 'axios';

// פונקציה אסינכרונית שמבצעת בקשת פוט לקביעת השיעור
const setLesson = async (selectedHour) => {
    try {
        const response = await axios.put(`http://localhost:3003/api/students/set-lesson/${selectedHour}`, {}, { withCredentials: true });
        return response; // החזרת תגובת השרת
    } catch (error) {
        console.error('Error:', error);
        throw new Error('שגיאה בחיבור לשרת'); // זריקת שגיאה במקרה של תקלה
    }
};

export default setLesson;