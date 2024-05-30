import axios from 'axios';

// פונקציה אסינכרונית שמקבלת את רשימת השעות הזמינות מהשרת
const GetAvailabilities = async (teacherid) => {
    try {
        const response = await axios.get(`http://localhost:3003/api/teachers/get-teacher-availability/${teacherid}`, {
            withCredentials: true
        });
        return response.data.teacherAvailability; // החזרת רשימת השעות הזמינות
    } catch (error) {
        console.error('Error fetching availabilities:', error);
        // במקרה של שגיאה, הפונקציה לא מחזירה ערך
    }
};

export default GetAvailabilities;