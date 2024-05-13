import axios from "axios";

export const ValidateUser = async () => {
    const response = await axios.get("http://localhost:3003/api/students/protect",{withCredentials:true});
    // console.log(response)
     
    
    return response
}


