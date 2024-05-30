import axios from "axios"

const handleTeacherLogin = async (e, userName, userPassword,navigate) => {
    
    console.log(e)
    e.preventDefault()


    try {
        const {data} = await axios.post('http://localhost:3003/api/teachers/login', {
            "userDetails":
            {"email": userName,
             "password": userPassword,
             "role": "teacher"
            }
        }, { withCredentials: true });
        localStorage.setItem('userInfo', JSON.stringify(data.user))



        navigate('/teacher-page');
        alert('נכנסת למערכת בהצלחה!');

    } catch (error) {
        alert('שגיאה במהלך התחברות: ' + error.toString());
    }
};

export default handleTeacherLogin;

