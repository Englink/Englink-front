import axios from 'axios';

// פונקציה אסינכרונית שמקבלת את רשימת השעות הזמינות מהשרת
const GetReviews = async (teacherid) => {
    try {

        const response = await axios.get(`http://localhost:3003/api/teachers/get-teacher-reviews/${teacherid}`, {
            withCredentials: true
        });
        // console.log(response)
        console.log(response.data.teacherReviews[0].commentDate)
        return response.data.teacherReviews// החזרת רשימת השעות הזמינות
    }
    catch (error) {
        console.error('Error fetching availabilities:', error);
        // במקרה של שגיאה, הפונקציה לא מחזירה ערך
    }
};

export default GetReviews;