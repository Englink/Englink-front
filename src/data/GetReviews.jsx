import axios from 'axios';

// פונקציה אסינכרונית שמקבלת את רשימת השעות הזמינות מהשרת
const GetReviews = async (teacher) => {
    try {

        const response = await axios.get(`http://localhost:3003/api/teachers/get-teacher-reviews/${teacher}`, {
            withCredentials: true
        });
        // console.log(response.data.teacherReviews[4].stars)
        // console.log(response.data.teacherReviews[0].commentDate)
        return response.data.teacherReviews// החזרת רשימת השעות הזמינות
    }
    catch  {
        console.log("error from get reviews")
        // במקרה של שגיאה, הפונקציה לא מחזירה ערך
    }
};

export default GetReviews;