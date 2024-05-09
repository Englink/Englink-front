import axios from "axios";
 export const GetTeachers = async () => {
    const response = await axios.get("http://localhost:3003/api/teachers",{withCredentials:true});
     console.log(response.data.teachers)

    return response.data.teachers;
}

