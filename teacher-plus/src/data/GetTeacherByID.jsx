import axios from 'axios';

async function getTeacherData(id) {
    const url = `http://localhost:3003/api/teachers`;


    try {
        const response = await axios.get(url);
        const teachers = response.data.teachers;


        // Find the teacher that matches the id
        const teacher = teachers.find(teacher => teacher._id === id);

        if (!teacher) {
            console.error('לא נמצא מורה על פי id: ', id);
            return null;
        }

        return teacher;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

export default getTeacherData;