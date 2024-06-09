import axios from 'axios';

 const GetTeacherById = async (teacherId) => {
  try {
    const response = await axios.get("http://localhost:3003/api/teachers", { withCredentials: true });
    const teachers = response.data.teachers;
    const teacher = teachers.find(teacher => teacher._id === teacherId);
      // console.log('Teacher:', teacher);
    return teacher;
  } catch (error) {
    console.error(`Error fetching teacher with id ${teacherId}:`, error);
    return null;
  }
};

export default GetTeacherById;