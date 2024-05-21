import axios from "axios";

export const ValidateUser = async () => {
    const response = await axios.get("http://localhost:3003/api/students/validate",{withCredentials:true});
    return response
}


